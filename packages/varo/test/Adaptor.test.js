import path from 'path';
import fs from 'node:fs/promises';
import { expect } from 'chai';
import { parseFridgeTagToEms, parseFridgeTag } from '../src/FridgeTagUtils';
import { parseVaroEmsToEms } from '../src/VaroEmsUtils';
import { mapEmsProperties } from '../src/Utils';
import { describe, it } from 'node:test';

describe('parseFridgeTagToEms', () => {
  it('converts raw fridgetag data into ems data', async () => {
    const rawMetadata = await getFixture('metadata.json');
    const rawData = await getFixture('fridgeTagData.txt');

    const metadata = JSON.parse(rawMetadata);
    const data = parseFridgeTag(rawData);

    const ems = parseFridgeTagToEms(metadata, data);
    const firstDataMinTemp = parseFloat(data['Hist']['1']['Min T']);
    const firstEmsRecord = ems.records[0];
    const firstEmsReport = ems.reports[0];

    expect(firstDataMinTemp).to.eql(18.5);
    expect(firstEmsRecord.TVC).to.eql(firstDataMinTemp);
    expect(firstEmsReport.alarms[0].conditionMinutes).to.eql(840);
    expect(firstEmsReport.aggregates[0].average).to.eql(19.2);
    expect(ems.LAT).to.eql(metadata.location.used.latitude);
  });

  it('handles empty fridgeTagData gracefully', () => {
    const metadata = {};
    const data = parseFridgeTag('');

    const ems = parseFridgeTagToEms(metadata, data);

    expect(ems.records).to.be.an('array').that.is.empty;
  });
});

describe('parseVaroEmsToEms', () => {
  it('converts varo ems data to ems data', async () => {
    const rawMetadata = await getFixture('metadata.json');
    const rawData = await getFixture('varoEmsData.json');

    const metadata = JSON.parse(rawMetadata);
    const data = JSON.parse(rawData);
    const dataPath =
      '345923483459456034592348_CURRENT_DATA_P100DT9H45M46S_20241115T102926Z.json';

    const ems = parseVaroEmsToEms(metadata, data, dataPath);
    const firstDataRecord = data.records[0];
    const firstEmsRecord = ems.records[0];

    expect(firstDataRecord.TVC).to.eql(4.1);
    expect(firstEmsRecord.TVC).to.eql(firstDataRecord.TVC);
    expect(firstEmsRecord.ABST).to.eql('20241115T094554Z');
    expect(ems.LAT).to.eql(metadata.location.used.latitude);
  });
});

describe('mapEmsProperties', () => {
  const root = { LSER: 'one', EMOD: null };
  const records = [{ TAMB: false, EERR: null }];

  const result = mapEmsProperties(root, records, null, 'FAKE_TEST');
  const record = result?.records?.[0];

  it('includes expected root properties', () => {
    expect(result.LSER).to.eql('one');
    expect(result).to.not.have.property('EMOD'); // explicitly null, not required
  });

  it('includes expected record properties', () => {
    expect(record).to.have.property('TAMB');
    expect(record.TAMB).to.eql(false);
    expect(record).to.have.property('FAKE_TEST'); // required field
  });

  it('excludes unexpected or null record properties', () => {
    expect(record).to.not.have.property('EERR'); // explicitly null, not required
    expect(record).to.not.have.property('ABST'); // not present in input
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
