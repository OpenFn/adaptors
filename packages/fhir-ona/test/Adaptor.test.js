import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  read,
  create,
  update,
  _delete,
  request,
  builders,
} from '../src/Adaptor.js';

const testServer = enableMockClient('https://fake.fhir-ona.com');


const baseState = {
  configuration: {
    baseUrl: 'https://fake.fhir-ona.com',
    access_token: 'test-token-abc123',
  },
};


describe('read', () => {
  it('reads server metadata', async () => {
    testServer
      .intercept({ path: '/gateway/fhir/metadata', method: 'GET' })
      .reply(200, { resourceType: 'CapabilityStatement', status: 'active' });

    const finalState = await read('metadata')(baseState);

    expect(finalState.data.resourceType).to.equal('CapabilityStatement');
  });

  it('searches for recently updated Patients with query parameters', async () => {
    testServer
      .intercept({
        path: '/gateway/fhir/Patient',
        method: 'GET',
        query: {
          '_lastUpdated': 'gt2026-07-01T00:00:00Z',
          '_sort': '_lastUpdated',
          '_count': '200',
        },
      })
      .reply(200, {
        resourceType: 'Bundle',
        total: 2,
        entry: [
          { resource: { resourceType: 'Patient', id: 'p-001' } },
          { resource: { resourceType: 'Patient', id: 'p-002' } },
        ],
      });

    const finalState = await read('Patient', {
      query: {
        '_lastUpdated': 'gt2026-07-01T00:00:00Z',
        '_sort': '_lastUpdated',
        '_count': 200,
      },
    })(baseState);

    expect(finalState.data.resourceType).to.equal('Bundle');
    expect(finalState.data.total).to.equal(2);
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


describe('_delete', () => {
  it('deletes a Patient by ID', async () => {
    testServer
      .intercept({ path: '/gateway/fhir/Patient/97597', method: 'DELETE' })
      .reply(204, {});

    const finalState = await _delete('Patient/97597')(baseState);

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

