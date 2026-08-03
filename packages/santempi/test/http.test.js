import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import * as http from '../src/http.js';
import { builders } from '../src/Adaptor.js';

const testServer = enableMockClient('https://fake.santempi.com');


const baseState = {
  configuration: {
    baseUrl: 'https://fake.santempi.com',
    access_token: 'test-token-abc123',
  },
};


describe('http.get', () => {
  it('fetches a FHIR resource bundle with the correct Accept header', async () => {
    testServer
      .intercept({
        path: '/empi/fhir/Patient',
        method: 'GET',
        headers: { Accept: 'application/fhir+json' },
      })
      .reply(200, {
        resourceType: 'Bundle',
        total: 1,
        entry: [{ resource: { resourceType: 'Patient', id: 'p-001' } }],
      });

    const finalState = await http.get('/fhir/Patient', {
      headers: { Accept: 'application/fhir+json' },
    })(baseState);

    expect(finalState.data.resourceType).to.equal('Bundle');
    expect(finalState.data.entry[0].resource.id).to.equal('p-001');
  });

  it('fetches a HDSI resource list', async () => {
    testServer
      .intercept({ path: '/empi/hdsi/AssigningAuthority', method: 'GET' })
      .reply(200, {
        $type: 'AmiCollection',
        resource: [{ domainName: 'TEST-NIN' }],
      });

    const finalState = await http.get('/hdsi/AssigningAuthority')(baseState);

    expect(finalState.data.$type).to.equal('AmiCollection');
    expect(finalState.data.resource[0].domainName).to.equal('TEST-NIN');
  });

  it('passes query parameters to the request', async () => {
    testServer
      .intercept({
        path: '/empi/fhir/Patient',
        method: 'GET',
        query: { identifier: 'http://ohie.org/National_Id|NIN-001-TEST' },
      })
      .reply(200, {
        resourceType: 'Bundle',
        total: 1,
        entry: [{ resource: { resourceType: 'Patient', id: 'p-002' } }],
      });

    const finalState = await http.get('/fhir/Patient', {
      headers: { Accept: 'application/fhir+json' },
      query: { identifier: 'http://ohie.org/National_Id|NIN-001-TEST' },
    })(baseState);

    expect(finalState.data.total).to.equal(1);
    expect(finalState.data.entry[0].resource.id).to.equal('p-002');
  });

  it('fetches a single FHIR Patient by ID', async () => {
    testServer
      .intercept({ path: '/empi/fhir/Patient/p-003', method: 'GET' })
      .reply(200, {
        resourceType: 'Patient',
        id: 'p-003',
        name: [{ family: 'Nakamura', given: ['Aiko'] }],
      });

    const finalState = await http.get('/fhir/Patient/p-003', {
      headers: { Accept: 'application/fhir+json' },
    })(baseState);

    expect(finalState.data.resourceType).to.equal('Patient');
    expect(finalState.data.id).to.equal('p-003');
    expect(finalState.data.name[0].family).to.equal('Nakamura');
  });
});


describe('http.post', () => {
  it('creates an AMI resource', async () => {
    testServer
      .intercept({ path: '/empi/ami/AssigningAuthority', method: 'POST' })
      .reply(201, {
        $type: 'AssigningAuthority',
        id: 'aa-001',
        domainName: 'TEST-NIN',
      });

    const finalState = await http.post('/ami/AssigningAuthority', {
      $type: 'AssigningAuthority',
      name: 'Test National ID Authority',
      domainName: 'TEST-NIN',
      oid: '2.16.800.1.113883.3.9999.5.1',
      url: 'http://test.ohie.org/National_Id',
      isUnique: false,
    })(baseState);

    expect(finalState.data.$type).to.equal('AssigningAuthority');
    expect(finalState.data.id).to.equal('aa-001');
  });

  it('create a FHIR patient without builders', async () => {
    testServer
      .intercept({
        path: '/empi/fhir/Patient',
        method: 'POST',
        headers: {
          Accept: 'application/fhir+json',
          'Content-Type': 'application/fhir+json',
        },
      })
      .reply(201, {
        resourceType: 'Patient',
        id: 'p-004',
        name: [{ family: 'Nakamura', given: ['Aiko'] }],
        gender: 'female',
        birthDate: '1992-04-10',
      });

    const finalState = await http.post(
      '/fhir/Patient',
      {
        resourceType: 'Patient',
        identifier: [
          {
            use: 'official',
            system: 'http://ohie.org/National_Id',
            value: 'NIN-001-TEST',
          },
        ],
        name: [{ use: 'official', family: 'Nakamura', given: ['Aiko'] }],
        gender: 'female',
        birthDate: '1992-04-10',
        active: true,
      },
      {
        headers: {
          Accept: 'application/fhir+json',
          'Content-Type': 'application/fhir+json',
        },
      }
    )(baseState);

    expect(finalState.data.resourceType).to.equal('Patient');
    expect(finalState.data.id).to.equal('p-004');
    expect(finalState.data.name[0].family).to.equal('Nakamura');
  });

  it('registers a FHIR Patient built with builders', async () => {
    testServer
      .intercept({
        path: '/empi/fhir/Patient',
        method: 'POST',
        headers: {
          Accept: 'application/fhir+json',
          'Content-Type': 'application/fhir+json',
        },
      })
      .reply(201, {
        resourceType: 'Patient',
        id: 'p-005',
        name: [{ family: 'Nakamura', given: ['Aiko'] }],
      });

    const patient = builders.patient({
      identifier: [
        builders.identifier({
          use: 'official',
          system: 'http://ohie.org/National_Id',
          value: 'NIN-001-TEST',
        }),
      ],
      name: [{ use: 'official', family: 'Nakamura', given: ['Aiko'] }],
      gender: 'female',
      birthDate: '1992-04-10',
    });

    const finalState = await http.post('/fhir/Patient', patient, {
      headers: {
        Accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json',
      },
    })(baseState);

    expect(finalState.data.resourceType).to.equal('Patient');
    expect(finalState.data.id).to.equal('p-005');
    expect(finalState.data.name[0].family).to.equal('Nakamura');
  });
});


describe('http.request', () => {
  it('makes a generic GET request', async () => {
    testServer
      .intercept({ path: '/empi/ami/MatchConfiguration', method: 'GET' })
      .reply(200, {
        $type: 'AmiCollection',
        resource: [{ id: 'mc-001', name: 'Default Match Config' }],
      });

    const finalState = await http.request(
      'GET',
      '/ami/MatchConfiguration'
    )(baseState);

    expect(finalState.data.$type).to.equal('AmiCollection');
    expect(finalState.data.resource[0].id).to.equal('mc-001');
  });

  it('makes a generic POST request', async () => {
    testServer
      .intercept({ path: '/empi/hdsi/Patient/$merge', method: 'POST' })
      .reply(200, {
        resourceType: 'Patient',
        id: 'p-001',
      });

    const finalState = await http.request(
      'POST',
      '/hdsi/Patient/$merge',
      {
        resourceType: 'Parameters',
        parameter: [
          { name: 'source', valueReference: { reference: 'Patient/p-old' } },
          { name: 'target', valueReference: { reference: 'Patient/p-001' } },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/fhir+json',
          Accept: 'application/fhir+json',
        },
      }
    )(baseState);

    expect(finalState.data.id).to.equal('p-001');
  });
});
