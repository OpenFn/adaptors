import chai, { expect } from 'chai';
import metadata from '../../src/meta/metadata';

describe('metadata function', () => {
  it('should build a model for salesforce', async () => {
    const model = await metadata(
      {
        filter: ['Asset'],
      },
      true
    );
    expect(model).to.be.ok;
    expect(model.datasource).to.eql('salesforce');
    expect(model.entities.length).to.eql(1);
  });

  it('should build an entity for salesforce Asset', async () => {
    const model = await metadata(
      {
        filter: ['Asset'],
      },
      true
    );

    const [asset] = model.entities;
    expect(asset.name).to.eql('Asset');
    expect(asset.type).to.eql('sobject');
  });

  it('should build fields for salesforce Asset', async () => {
    const model = await metadata(
      {
        filter: ['Asset'],
      },
      true
    );

    const [asset] = model.entities;
    const fields = asset.entities;
    expect(fields).to.be.ok;
    expect(fields.length).to.eql(25);
  });

  it('should build a SerialNumber field for salesforce Asset', async () => {
    const model = await metadata(
      {
        filter: ['Asset'],
      },
      true
    );

    const [asset] = model.entities;
    const sn = asset.entities.find(({ name }) => name === 'SerialNumber');
    expect(sn).to.be.ok;
    expect(sn.type, 'field');
    expect(sn.datatype, 'string');
    expect(sn.label, 'Serial Number');
  });
});
