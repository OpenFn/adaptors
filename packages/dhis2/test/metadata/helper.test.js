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
  helper = createMock(impl, { path: 'test/fixtures' });
});

describe('Dhis2 helper', () => {
  it('loads orgUnits', async () => {
    const data = await helper.getOrgUnits();
    expect(data).to.be.ok;

    expect(data.organisationUnits.length).to.equal(2);
  });

  it('loads Adonkia CHOP', async () => {
    const data = await helper.getOrgUnits();
    const [adonkia] = data.organisationUnits;
    expect(adonkia.displayName).eq('Adonkia CHP');
    expect(adonkia.id).eq('Rp268JB6Ne4');
  });
});
