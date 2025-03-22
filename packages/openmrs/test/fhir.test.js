import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import testData from './fixtures.json' assert { type: 'json' };
import { fhir } from '../src';

const testServer = enableMockClient('https://fhir-tests.openmrs.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configuration = {
  username: 'test',
  password: 'strongpassword',
  instanceUrl: 'https://fhir-tests.openmrs.org',
};

const state = {
  configuration,
  patient: testData.patient,
  encounter: testData.encounter,
};

describe('fhir', () => {
  it('should GET with a query', async () => {
    testServer
      .intercept({
        path: '/ws/fhir2/R4/Patient',
        query: { q: 'Sarah 1' },
        method: 'GET',
      })
      .reply(200, { entry: [{ display: 'Sarah 1' }] }, { ...jsonHeaders });

    const { data } = await fhir.get('Patient', { q: 'Sarah 1' })(state);
    expect(data.entry[0].display).to.eql('Sarah 1');
  });
  it('should auto-fetch with a query', async () => {
    testServer
      .intercept({
        path: '/ws/fhir2/R4/Practitioner',
        query: { _count: 1 },
        method: 'GET',
      })
      .reply(
        200,
        {
          entry: [
            {
              display: 'Sarah 1',
            },
          ],
          link: [
            {
              relation: 'next',
              url: 'https://fhir-tests.openmrs.org/ws/fhir2/R4/Practitioner?_getpages=c24e0803-e3b6-411f-ac28-190997d4c31a&_getpagesoffset=2&_count=1&_bundletype=searchset',
            },
          ],
        },
        { ...jsonHeaders }
      );
    testServer
      .intercept({
        path: '/ws/fhir2/R4/Practitioner?_getpages=c24e0803-e3b6-411f-ac28-190997d4c31a&_getpagesoffset=2&_count=1&_bundletype=searchset',
        method: 'GET',
      })
      .reply(
        200,
        {
          entry: [{ display: 'Sarah 2' }],
        },
        { ...jsonHeaders }
      );

    const { data } = await fhir.get('Practitioner', { count: 1 })(state);
    expect(data.entry[0].display).to.eql('Sarah 1');
    expect(data.entry[1].display).to.eql('Sarah 2');
  });
});
