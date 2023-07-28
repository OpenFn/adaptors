import { MockAgent } from 'undici';
import { fixtures } from './ClientFixtures';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('https://hapi.fhir.org');

const jsonResponse = {
  headers: {
    'Content-Type': 'application/fhir+json',
  },
};

mockPool
  .intercept({
    path: '/baseR4/noAccess',
    method: 'POST',
    headers: {
      'content-type': 'application/fhir+json',
    },
  })
  .reply(404, fixtures.noAccessResponse);

mockPool
  .intercept({
    path: '/baseR4/Patient',
    method: 'GET',
    headers: {
      'content-type': 'application/fhir+json',
    },
  })
  .reply(200, fixtures.patientBundle, jsonResponse);

mockPool
  .intercept({
    path: '/baseR4/Patient?_count=1&_pretty=true',
    method: 'GET',
    headers: {
      'content-type': 'application/fhir+json',
    },
  })
  .reply(200, fixtures.patientBundle, jsonResponse);

mockPool
  .intercept({
    path: '/baseR4/Patient/592442',
    method: 'GET',
    headers: {
      'content-type': 'application/fhir+json',
    },
  })
  .reply(200, fixtures.patient, jsonResponse);

mockPool
  .intercept({
    path: '/baseR4/Patient/invalid-patient-id',
    method: 'GET',
    headers: {
      'content-type': 'application/fhir+json',
    },
  })
  .reply(200, fixtures.invalidPatient, jsonResponse);

mockPool
  .intercept({
    path: '/baseR4/Claim',
    method: 'GET',
    headers: {
      'content-type': 'application/fhir+json',
    },
  })
  .reply(200, fixtures.claimBundle, jsonResponse);

mockPool
  .intercept({
    path: '/baseR4/Claim/49023',
    method: 'GET',
    headers: {
      'content-type': 'application/fhir+json',
    },
  })
  .reply(200, fixtures.claim, jsonResponse);

mockPool
  .intercept({
    path: '/baseR4/Bundle',
    method: 'POST',
  })
  .reply(200, fixtures.patientBundleCreateResponse, jsonResponse);

mockPool
  .intercept({
    path: '/baseR4',
    method: 'POST',
  })
  .reply(200, fixtures.patientTransactionBundleResponse, jsonResponse);

export default mockAgent;
