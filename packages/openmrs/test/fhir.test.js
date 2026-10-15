import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import testData from './fixtures.json' with { type: 'json' };
import { fhir } from '../src/index.js';

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
              url: 'https://fhir-tests.openmrs.org/ws/fhir2/R4?_getpages=c24e0803-e3b6-411f-ac28-190997d4c31a&_getpagesoffset=2&_count=1&_bundletype=searchset',
            },
          ],
        },
        { ...jsonHeaders }
      );
    testServer
      .intercept({
        path: '/ws/fhir2/R4?_getpages=c24e0803-e3b6-411f-ac28-190997d4c31a&_getpagesoffset=2&_count=1&_bundletype=searchset',
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

  describe('next-page links', () => {
    const nextQuery =
      '_getpages=7f6c1d3e-0b1a-4f43-9d5e-2a6b8c9d0e1f&_getpagesoffset=1&_count=1&_bundletype=searchset';

    const mockFirstPage = (path, nextUrl) =>
      testServer
        .intercept({ path, query: { _count: 1 }, method: 'GET' })
        .reply(
          200,
          {
            entry: [{ display: 'Page 1' }],
            link: [{ relation: 'next', url: nextUrl }],
          },
          { ...jsonHeaders }
        );

    const mockNextPage = path =>
      testServer
        .intercept({ path: `${path}?${nextQuery}`, method: 'GET' })
        .reply(200, { entry: [{ display: 'Page 2' }] }, { ...jsonHeaders });

    it('should request the next page from the FHIR base path, without the resource type', async () => {
      mockFirstPage(
        '/ws/fhir2/R4/Location',
        `https://fhir-tests.openmrs.org/ws/fhir2/R4/Location?${nextQuery}`
      );
      mockNextPage('/ws/fhir2/R4');

      const { data } = await fhir.get('Location', { count: 1 })(state);
      expect(data.entry.map(e => e.display)).to.eql(['Page 1', 'Page 2']);
    });

    it('should request the next page from the instanceUrl origin, not the next link origin', async () => {
      mockFirstPage(
        '/ws/fhir2/R4/Location',
        `http://internal-openmrs:8080/ws/fhir2/R4?${nextQuery}`
      );
      mockNextPage('/ws/fhir2/R4');

      const { data } = await fhir.get('Location', { count: 1 })(state);
      expect(data.entry.map(e => e.display)).to.eql(['Page 1', 'Page 2']);
    });

    it('should request the next page when the next link has a malformed host', async () => {
      mockFirstPage(
        '/ws/fhir2/R4/Location',
        `http://fhir-tests.openmrs.org, fhir-tests.openmrs.org/ws/fhir2/R4?${nextQuery}`
      );
      mockNextPage('/ws/fhir2/R4');

      const { data } = await fhir.get('Location', { count: 1 })(state);
      expect(data.entry.map(e => e.display)).to.eql(['Page 1', 'Page 2']);
    });

    it('should ignore the host in a next link without a scheme', async () => {
      mockFirstPage(
        '/ws/fhir2/R4/Location',
        `//other-host.example/ws/fhir2/R4?${nextQuery}`
      );
      mockNextPage('/ws/fhir2/R4');

      const { data } = await fhir.get('Location', { count: 1 })(state);
      expect(data.entry.map(e => e.display)).to.eql(['Page 1', 'Page 2']);
    });

    it('should keep the instanceUrl context path in the next page request', async () => {
      const contextState = {
        configuration: {
          ...configuration,
          instanceUrl: 'https://fhir-tests.openmrs.org/openmrs',
        },
      };
      mockFirstPage(
        '/openmrs/ws/fhir2/R4/Patient',
        `https://fhir-tests.openmrs.org/ws/fhir2/R4?${nextQuery}`
      );
      mockNextPage('/openmrs/ws/fhir2/R4');

      const { data } = await fhir.get('Patient', { count: 1 })(contextState);
      expect(data.entry.map(e => e.display)).to.eql(['Page 1', 'Page 2']);
    });
  });
});
