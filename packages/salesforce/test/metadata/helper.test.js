import chai from 'chai';
import createHelper from '../../src/meta/helper';
import { createMock } from '@openfn/metadata';

const { expect } = chai;
let helper;

// These tests run against data pre-loaded and saved to src/meta/data

before(async () => {
  // bit of a wierd API now because the mock creator is generic
  const impl = await createHelper();
  helper = createMock(impl, { path: 'test/fixtures' });
});

describe('Salesforce helper', () => {
  it('loads mock globals', async () => {
    const data = await helper.getGlobals();
    expect(data).ok;

    expect(data.length).to.equal(3);
  });

  it('includes the Asset sobject', async () => {
    const data = await helper.getGlobals();
    const asset = data.find(({ name }) => name === 'Asset');
    expect(asset).to.be.ok;
    expect(asset.updateable).to.be.true;
    expect(asset.searchable).to.be.true;
    expect(asset.label).to.eql('Asset');
  });

  // TODO do we even want the filter stuff? If wedo, is it in the right place?
  // It should be an argument to getGlobals, no?
  it.skip('filter to only include the Asset sobject', async () => {
    helper = await createBackend(
      {
        filter: ['Asset'],
      },
      true
    );
    const data = await helper.getGlobals();
    expect(data.length).to.eql(1);

    const asset = data[0];
    expect(asset.label).to.eql('Asset');
  });

  it('loads mock fields', async () => {
    const data = await helper.getFields('Asset');

    expect(data).to.not.be.undefined;
    expect(data.length).to.eql(2);
  });

  it('loads the SerialNumber field', async () => {
    const data = await helper.getFields('Asset');
    const sn = data.find(({ name }) => name === 'SerialNumber');

    expect(sn).to.not.be.undefined;
    expect(sn.type).to.eql('string');
    expect(sn.label).to.eql('Serial Number');
  });
});
