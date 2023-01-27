import chai from 'chai';
import createHelper from '../../src/meta/helper';
import { createMock } from '@openfn/metadata';

const { expect } = chai;
let helper;

// These tests run against data pre-loaded and saved to src/meta/data
// These helper tests don't really test very much because the mock overrides
// and the helpers are actually super thin
before(async () => {
  const impl = createHelper();
  helper = createMock(impl);
});

describe('Dhis2 helper', () => {
  it('loads orgUnits', async () => {
    const data = await helper.getOrgUnits();
    expect(data).to.be.ok;

    expect(data.organisationUnits.length).to.be.greaterThan(0);
    const [adonkia] = data.organisationUnits;
    expect(adonkia.displayName).eq('30101-OVC-0001');
    expect(adonkia.id).eq('y4kDUliaw7e');
  });
});
