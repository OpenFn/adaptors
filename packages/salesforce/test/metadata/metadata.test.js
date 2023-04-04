import { expect } from 'chai';
import metadata from '../../src/meta/metadata.js';
import salesforceHelper from '../../src/meta/helper.js';
import { createMock } from '@openfn/metadata';

let mockHelper;

before(async () => {
  const impl = await salesforceHelper();
  mockHelper = createMock(impl, { path: 'test/fixtures' });
});

describe('metadata function', () => {
  it('should build a model for salesforce', async () => {
    const model = await metadata({}, mockHelper);
    expect(model).to.be.ok;
    expect(model.name).to.eql('salesforce');
    expect(model.children.length).to.eql(2);
  });

  it('should build an entity for salesforce Asset, with filtering', async () => {
    const model = await metadata(
      {
        filter: ['Asset'],
      },
      mockHelper
    );

    const asset = model.children.find(({ name }) => name === 'Asset');
    expect(asset.name).to.eql('Asset');
    expect(asset.type).to.eql('sobject');
    expect(asset.meta?.system).to.be.true;
  });

  it('should build an entity for salesforce vera__Attendance__c, with filtering', async () => {
    const model = await metadata(
      {
        filter: ['vera__Attendance__c'],
      },
      mockHelper
    );

    const vera = model.children.find(
      ({ name }) => name === 'vera__Attendance__c'
    );
    expect(vera.name).to.eql('vera__Attendance__c');
    expect(vera.type).to.eql('sobject');
    expect(vera.meta?.system).to.not.be.ok;
  });

  it('should build fields for salesforce Asset', async () => {
    const model = await metadata(
      {
        filter: ['Asset'],
      },
      mockHelper
    );

    const asset = model.children.find(({ name }) => name === 'Asset');
    const fields = asset.children;
    expect(fields).to.be.ok;
    expect(fields.length).to.eql(2);
  });

  it('should build a SerialNumber field for salesforce Asset', async () => {
    const model = await metadata(
      {
        filter: ['Asset'],
      },
      mockHelper
    );

    const asset = model.children.find(({ name }) => name === 'Asset');
    const sn = asset.children.find(({ name }) => name === 'SerialNumber');
    expect(sn).to.be.ok;
    expect(sn.type, 'field');
    expect(sn.datatype, 'string');
    expect(sn.label, 'Serial Number');
  });
});
