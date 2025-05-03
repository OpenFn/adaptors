import path from 'path';
import fs from 'node:fs/promises';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { parseFridgeTagToReport, parseFridgeTag } from '../src/FridgeTagUtils';
import { parseVaroEmsToReport } from '../src/VaroEmsUtils';
import { parseRecordsToReport } from '../src/StreamingUtils';

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

describe('parseVaroEmsToReport', () => {
  it('converts varo ems data to ems report', async () => {
    const rawMetadata = await getFixture('metadata.json');
    const rawData = await getFixture('varoEmsData.json');

    const metadata = JSON.parse(rawMetadata);
    const data = JSON.parse(rawData);
    const dataPath =
      '345923483459456034592348_CURRENT_DATA_P100DT9H45M46S_20241115T102926Z.json';

    const report = parseVaroEmsToReport(metadata, data, dataPath);
    const firstDataRecord = data.records[0];
    const firstEmsRecord = report.records[0];

    expect(firstDataRecord.TVC).to.eql(4.1);
    expect(firstEmsRecord.TVC).to.eql(firstDataRecord.TVC);
    expect(firstEmsRecord.ABST).to.eql('20241115T094554Z');
    expect(report.LAT).to.eql(metadata.location.used.latitude);
  });
});

describe('parseRecordsToReport', () => {
  let report, record;

  before(async () => {
    const rawData = await getFixture('emsCollection.json');
    const data = JSON.parse(rawData);
    const collection = data.map(i => i.value);
    collection[0].HAMB = false;

    report = parseRecordsToReport(collection, 'FAKE_TEST');
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
