import { expect } from 'chai';
import { createMock } from '@openfn/metadata';
import metadata from '../../src/meta/metadata';
import dhis2Helper from '../../src/meta/helper';

let mockHelper;

before(async () => {
  const impl = await dhis2Helper();
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
    expect(orgUnits.length).to.be.greaterThan(1);

    const [first] = orgUnits;
    expect(first.type).eql('orgUnit');
    expect(first.name).eql('Rp268JB6Ne4');
    expect(first.label).eql('Adonkia CHP');
    expect(first.datatype).eql('string');
  });

  // TODO other model parts
});
