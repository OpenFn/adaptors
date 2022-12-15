import chai from 'chai';
import createBackend from '../../src/meta/backend';

const { expect } = chai;
let backend;

beforeEach(async () => {
  backend = await createBackend({}, true);
});

describe('Salesforce backend', () => {
  it('loads mock globals', async () => {
    const data = await backend.getGlobals();
    expect(data).ok;

    expect(data.length).to.equal(404);
  });

  it('includes the Asset sobject', async () => {
    const data = await backend.getGlobals();
    const asset = data.find(({ name }) => name === 'Asset');
    expect(asset).to.be.ok;
    expect(asset.updateable).to.be.true;
    expect(asset.searchable).to.be.true;
    expect(asset.label).to.eql('Asset');
  });

  it('filter to only include the Asset sobject', async () => {
    backend = await createBackend(
      {
        filter: ['Asset'],
      },
      true
    );
    const data = await backend.getGlobals();
    expect(data.length).to.eql(1);

    const asset = data[0];
    expect(asset.label).to.eql('Asset');
  });

  it('loads mock fields', async () => {
    const data = await backend.getFields('Asset');

    expect(data).to.not.be.undefined;
    expect(data.length).to.eql(25);
  });

  it('loads the SerialNumber field', async () => {
    const data = await backend.getFields('Asset');
    const sn = data.find(({ name }) => name === 'SerialNumber');

    expect(sn).to.not.be.undefined;
    expect(sn.type).to.eql('string');
    expect(sn.label).to.eql('Serial Number');
  });
});
