import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import * as Adaptor from '../src/Adaptor.js';
const { read, create, update, request, builders } = Adaptor;

const testServer = enableMockClient('https://fake.fhir-opensrp.com');


const baseState = {
  configuration: {
    baseUrl: 'https://fake.fhir-opensrp.com',
    access_token: 'test-token-abc123',
  },
};


describe('read', () => {
  it('reads server metadata (non-Bundle response returned as-is)', async () => {
    testServer
      .intercept({ path: '/gateway/fhir/metadata', method: 'GET' })
      .reply(200, { resourceType: 'CapabilityStatement', status: 'active' });

    const finalState = await read('metadata')(baseState);

    expect(finalState.data.resourceType).to.equal('CapabilityStatement');
    expect(finalState.data.status).to.equal('active');
  });

  it('returns resources as an array if no pagination is needed', async () => {
    testServer
      .intercept({
        path: '/gateway/fhir/Patient',
        method: 'GET',
        query: { '_count': '50' },
      })
      .reply(200, {
        resourceType: 'Bundle',
        total: 2,
        link: [],
        entry: [
          { resource: { resourceType: 'Patient', id: 'p-001' } },
          { resource: { resourceType: 'Patient', id: 'p-002' } },
        ],
      });

    const finalState = await read('Patient', {
      query: { '_count': 50 },
    })(baseState);

    expect(finalState.data).to.eql([
      { resourceType: 'Patient', id: 'p-001' },
      { resourceType: 'Patient', id: 'p-002' },
    ]);
    expect(finalState.data).to.have.length(2);
  });

  it('auto-paginates across multiple pages and resources returned as an array in state.data', async () => {
    // Page 1 — has a next link
    testServer
      .intercept({
        path: '/gateway/fhir/Patient',
        method: 'GET',
        query: { '_count': '2' },
      })
      .reply(200, {
        resourceType: 'Bundle',
        total: 4,
        link: [
          {
            relation: 'next',
            url: 'https://fake.fhir-opensrp.com/gateway/fhir/Patient?_getpagesoffset=2&_count=2',
          },
        ],
        entry: [
          { resource: { resourceType: 'Patient', id: 'p-001' } },
          { resource: { resourceType: 'Patient', id: 'p-002' } },
        ],
      });

    // Page 2 — no next link
    testServer
      .intercept({
        path: '/gateway/fhir/Patient',
        method: 'GET',
        query: { '_count': '2', '_getpagesoffset': '2' },
      })
      .reply(200, {
        resourceType: 'Bundle',
        total: 4,
        link: [],
        entry: [
          { resource: { resourceType: 'Patient', id: 'p-003' } },
          { resource: { resourceType: 'Patient', id: 'p-004' } },
        ],
      });

    const finalState = await read('Patient', {
      query: { '_count': 2 },
    })(baseState);

    expect(finalState.data).to.have.length(4);
    expect(finalState.data.map(p => p.id)).to.eql(['p-001', 'p-002', 'p-003', 'p-004']);
  });

  it('fetches only one page when _getpagesoffset is set', async () => {
    testServer
      .intercept({
        path: '/gateway/fhir/Patient',
        method: 'GET',
        query: { '_getpagesoffset': '50', '_count': '50' },
      })
      .reply(200, {
        resourceType: 'Bundle',
        total: 200,
        link: [
          {
            relation: 'next',
            url: 'https://fake.fhir-opensrp.com/gateway/fhir/Patient?_getpagesoffset=100&_count=50',
          },
        ],
        entry: [
          { resource: { resourceType: 'Patient', id: 'p-051' } },
          { resource: { resourceType: 'Patient', id: 'p-052' } },
        ],
      });

    const finalState = await read('Patient', {
      query: { '_getpagesoffset': 50, '_count': 50 },
    })(baseState);

    expect(finalState.data).to.have.length(2);
    expect(finalState.data[0].id).to.equal('p-051');
  });
});


describe('create', () => {
  it('creates a Patient using builders', async () => {
    testServer
      .intercept({ path: '/gateway/fhir/Patient', method: 'POST' })
      .reply(201, {
        resourceType: 'Patient',
        id: 'p-003',
        name: [{ family: 'Nakamura', given: ['Aiko'] }],
      });

    const patient = builders.patient({
      identifier: [
        builders.identifier({
          use: 'official',
          system: 'http://ohie.org/National_Id',
          value: 'NIN-TEST-001',
        }),
      ],
      name: [{ use: 'official', family: 'Nakamura', given: ['Aiko'], text: 'Aiko Nakamura' }],
      gender: 'female',
      birthDate: '1992-04-10',
      active: true,
    });

    const finalState = await create('Patient', patient)(baseState);

    expect(finalState.data.resourceType).to.equal('Patient');
    expect(finalState.data.id).to.equal('p-003');
    expect(finalState.data.name[0].family).to.equal('Nakamura');
  });

  it('creates a Patient without builders', async () => {
    testServer
      .intercept({ path: '/gateway/fhir/Patient', method: 'POST' })
      .reply(201, {
        resourceType: 'Patient',
        id: 'p-004',
        name: [{ family: 'Mathenge', given: ['Monica'] }],
      });

    const finalState = await create('Patient', {
      resourceType: 'Patient',
      active: true,
      identifier: [
        { use: 'official', system: 'http://ohie.org/National_Id', value: 'NIN-TEST-002' },
      ],
      name: [{ use: 'official', family: 'Mathenge', given: ['Monica'] }],
      gender: 'female',
      birthDate: '1990-07-07',
      telecom: [{ system: 'phone', value: '0712010203' }],
    })(baseState);

    expect(finalState.data.resourceType).to.equal('Patient');
    expect(finalState.data.id).to.equal('p-004');
    expect(finalState.data.name[0].family).to.equal('Mathenge');
  });
});


describe('update', () => {
  it('updates a Patient by ID', async () => {
    testServer
      .intercept({
        path: '/gateway/fhir/Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7',
        method: 'PUT',
      })
      .reply(200, {
        resourceType: 'Patient',
        id: '0181038e-682b-4c7c-a946-e3757d2fa2f7',
        active: true,
        name: [{ family: 'Mathenge', given: ['Monica'] }],
      });

    const finalState = await update(
      'Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7',
      {
        resourceType: 'Patient',
        id: '0181038e-682b-4c7c-a946-e3757d2fa2f7',
        active: true,
        name: [{ use: 'official', family: 'Mathenge', given: ['Monica'] }],
        gender: 'female',
        birthDate: '1990-07-07',
        telecom: [{ system: 'phone', value: '0712010203' }],
      }
    )(baseState);

    expect(finalState.data.id).to.equal('0181038e-682b-4c7c-a946-e3757d2fa2f7');
    expect(finalState.data.name[0].family).to.equal('Mathenge');
  });

  it('deactivates a Patient with PUT', async () => {
    testServer
      .intercept({
        path: '/gateway/fhir/Patient/p-005',
        method: 'PUT',
      })
      .reply(200, {
        resourceType: 'Patient',
        id: 'p-005',
        active: false,
      });

    const finalState = await update('Patient/p-005', {
      resourceType: 'Patient',
      id: 'p-005',
      active: false,
      name: [{ use: 'official', family: 'Nakamura', given: ['Aiko'] }],
      gender: 'female',
      birthDate: '1992-04-10',
    })(baseState);

    expect(finalState.data.active).to.equal(false);
  });
});


describe('delete', () => {
  it('deletes a Patient by ID', async () => {
    testServer
      .intercept({ path: '/gateway/fhir/Patient/97597', method: 'DELETE' })
      .reply(204, {});

    const finalState = await Adaptor.delete('Patient/97597')(baseState);

    expect(finalState.response.statusCode).to.equal(204);
  });
});


describe('request', () => {
  it('makes a GET request for Observations for a specific patient', async () => {
    testServer
      .intercept({
        path: '/gateway/fhir/Observation',
        method: 'GET',
        query: { subject: 'Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7' },
      })
      .reply(200, {
        resourceType: 'Bundle',
        total: 1,
        entry: [{ resource: { resourceType: 'Observation', id: 'obs-001' } }],
      });

    const finalState = await request('GET', 'Observation', null, {
      query: { subject: 'Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7' },
    })(baseState);

    expect(finalState.data.resourceType).to.equal('Bundle');
    expect(finalState.data.entry[0].resource.id).to.equal('obs-001');
  });

  it('makes a PUT request via request()', async () => {
    testServer
      .intercept({
        path: '/gateway/fhir/Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7',
        method: 'PUT',
      })
      .reply(200, {
        resourceType: 'Patient',
        id: '0181038e-682b-4c7c-a946-e3757d2fa2f7',
        active: false,
      });

    const finalState = await request(
      'PUT',
      'Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7',
      {
        resourceType: 'Patient',
        id: '0181038e-682b-4c7c-a946-e3757d2fa2f7',
        active: false,
        name: [{ use: 'official', family: 'Mathenge', given: ['Monica'] }],
        gender: 'female',
        birthDate: '1990-07-07',
      }
    )(baseState);

    expect(finalState.data.active).to.equal(false);
  });
});

