import { expect } from 'chai';
import metadata from '../../src/meta/metadata';

describe('metadata function', () => {
  let model;

  before(async () => {
    model = await metadata({}, true);
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
    expect(first.name).eql('y4kDUliaw7e');
    expect(first.label).eql('30101-OVC-0001');
    expect(first.datatype).eql('string');
  });

  // TODO other model parts
});
