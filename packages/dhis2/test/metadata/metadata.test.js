import { expect } from 'chai';
import { createMock } from '@openfn/metadata';
import metadata from '../../src/meta/metadata';
import dhis2Helper from '../../src/meta/helper';

let mockHelper;

before(async () => {
  const impl = await dhis2Helper();
  // These tests run against the mock data saved to test/fixtures
  // (ie, we build a model based on that raw data)
  mockHelper = createMock(impl, { path: 'test/fixtures' });
});

describe('metadata function', () => {
  let model;

  before(async () => {
    model = await metadata({}, mockHelper);
  });

  it('should build a model for dhis2', async () => {
    expect(model).to.be.ok;
    expect(model.name).eql('dhis2');
    expect(model.type).eql('model');
  });

  it('should contain org units', async () => {
    const orgUnits = model.children.orgUnits;
    expect(orgUnits).to.be.ok;
    expect(orgUnits.length).to.eql(2);

    const [first] = orgUnits;
    expect(first.type).eql('orgUnit');
    expect(first.name).eql('Rp268JB6Ne4');
    expect(first.label).eql('Adonkia CHP');
    expect(first.datatype).eql('string');
  });

  it('should contain attributes', async () => {
    const attributes = model.children.attributes;
    expect(attributes).to.be.ok;
    expect(attributes.length).to.eql(1);

    const [first] = attributes;
    expect(first.type).eql('attribute');
    expect(first.name).eql('DnrLSdo4hMl');
    expect(first.label).eql('Alternative name');
    expect(first.datatype).eql('string');
  });

  it('should contain trackedEntityTypes', async () => {
    const trackedEntityTypes = model.children.trackedEntityTypes;
    expect(trackedEntityTypes).to.be.ok;
    expect(trackedEntityTypes.length).to.eql(1);

    const [first] = trackedEntityTypes;
    expect(first.type).eql('trackedEntityType');
    expect(first.name).eql('bVkFYAvoUCP');
    expect(first.label).eql('ARV commodity');
    expect(first.datatype).eql('string');
  });
});
