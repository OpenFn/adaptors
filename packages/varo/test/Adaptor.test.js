import path from 'path';
import fs from 'node:fs/promises';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { parseFridgeTagToReport, parseFridgeTag } from '../src/FridgeTagUtils';
import { applyDurationToDate, extractDeviceData } from '../src/VaroEmsUtils';
import { parseFlatRecordsToReports } from '../src/StreamingUtils';
import { convertToEms } from '../src';

describe('parseFridgeTagToReport', () => {
  it('converts raw fridgetag data into ems report', async () => {
    const rawMetadata = await getFixture('metadata.json');
    const rawData = await getFixture('fridgeTagData.txt');

    const metadata = JSON.parse(rawMetadata);
    const data = parseFridgeTag(rawData);

    const report = parseFridgeTagToReport(metadata, data);

    const firstDataMinTemp = parseFloat(data['Hist']['1']['Min T']);
    const firstEmsRecord = report.records[0];
    const firstEmsZReport = report.zReports[0];

    expect(firstDataMinTemp).to.eql(18.5);
    expect(firstEmsRecord.TVC).to.eql(firstDataMinTemp);
    expect(firstEmsZReport.alarms[0].conditionMinutes).to.eql(840);
    expect(firstEmsZReport.aggregates[0].average).to.eql(19.2);
    expect(report.LAT).to.eql(metadata.location.used.latitude);
  });

  it('handles empty fridgeTagData gracefully', () => {
    const metadata = {};
    const data = parseFridgeTag('');

    const report = parseFridgeTagToReport(metadata, data);

    expect(report.records).to.be.an('array').that.is.empty;
  });
});

describe('convertToEms', () => {
  it('converts Varo EMS contents to an EMS report (happy path, first content)', async () => {
    const rawMessageContents = await getFixture('varoEmsMessageContents.json');
    const messageContents = JSON.parse(rawMessageContents).contents;
    const firstContent = messageContents[0];

    // Ensure the fixture is what we think it is
    expect(messageContents).to.be.an('array').that.is.not.empty;
    expect(firstContent)
      .to.have.nested.property('data.filename')
      .that.matches(/_20250701T000000Z\.json$/);

    // 1) filename-derived data
    const { deviceId, deviceDate, finalRtcw } = extractDeviceData(firstContent);
    expect(deviceId).to.eql('000000000000000000000000');
    expect(deviceDate.toISOString()).to.eql('2025-06-30T23:00:00.000Z'); // filename ts minus 1h
    expect(finalRtcw).to.eql('PT0S');

    // 2) raw content record sanity
    const contentDataContent = firstContent.data.content; // should already be an object
    expect(contentDataContent).to.be.an('object');
    expect(contentDataContent.records)
      .to.be.an('array')
      .with.length.greaterThan(0);

    const srcRec = contentDataContent.records[0];
    expect(srcRec).to.include({ TVC: 10, RELT: 'P0DT0H1M0S', RTCW: 'PT0S' });

    // 3) absolute date addition
    const absoluteDate = applyDurationToDate(deviceDate, srcRec.RELT);
    expect(absoluteDate.toISOString()).to.eql('2025-06-30T23:01:00.000Z');

    // 4) result shape + mapped fields
    const state = {};
    const result = await convertToEms(messageContents)(state);

    // minimal structural checks
    expect(result).to.be.an('object');
    expect(result)
      .to.have.property('data')
      .that.is.an('array')
      .with.length(messageContents.length);

    const firstOut = result.data[0];
    expect(firstOut)
      .to.have.property('records')
      .that.is.an('array')
      .with.length(1);

    const outRec = firstOut.records[0];
    expect(outRec).to.have.property('ABST', '20250630T230100Z'); // 2025-06-30 23:01:00Z
    expect(outRec).to.have.property('TVC', srcRec.TVC);

    // check ABST formatting is YYYYMMDDTHHmmssZ
    expect(outRec.ABST).to.match(/^\d{8}T\d{6}Z$/);

    // confirm metadata survived
    if (firstOut.metadata) {
      expect(firstOut.metadata).to.have.nested.property(
        'location.used.latitude'
      );
      expect(firstOut.metadata).to.have.nested.property(
        'location.used.longitude'
      );
    }
  });
});

describe('parseFlatRecordsToReports', () => {
  let report, record;

  before(async () => {
    const rawData = await getFixture('emsCollection.json');
    const data = JSON.parse(rawData);
    const collection = data.map(i => i.value);
    collection[0].HAMB = false;

    report = parseFlatRecordsToReports(collection, 'FAKE_TEST')[0];
    record = report?.records?.[0];
  });

  it('includes expected report properties', () => {
    expect(report.ESER).to.eql('004800265547501820383131'); // ESER should be copied from LSER.
    expect(report).to.not.have.property('EERR');
  });

  it('includes expected record properties', () => {
    expect(report).to.have.property('FAKE_TEST'); // indicated as required.
    expect(report.FAKE_TEST).to.eql(null);
    expect(record.HAMB).to.eql(false); // explicitly 'false', not truthy.
    expect(record).to.have.property('TAMB');
  });

  it('excludes unexpected or null record properties', () => {
    expect(report).to.not.have.property('TAMB'); // found on record, not report.
    expect(record).to.not.have.property('RELT'); // should not be included on record.
    expect(record).to.not.have.property('AMFR'); // found on report, not record.
  });

  it('does not return null or empty record', () => {
    expect(record).to.not.be.null;
    expect(Object.keys(record)).to.have.length.above(0);
  });
});

async function getFixture(filename) {
  try {
    return await fs.readFile(path.resolve('test/fixtures', filename), 'utf-8');
  } catch (err) {
    throw new Error(
      `Failed to load fixture: ${filename}. Error: ${err.message}`
    );
  }
}
