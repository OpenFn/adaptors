import { MockAgent } from 'undici';
import { fixtures } from './ClientFixtures';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('https://hapi.fhir.org');

const jsonResponse = {
  headers: {
    'Content-Type': 'application/json',
  },
};

mockPool
  .intercept({
    path: '/baseR4/Patient',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, fixtures.patientBundle, jsonResponse);

mockPool
  .intercept({
    path: '/baseR4/Patient?_count=1&_pretty=true',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, fixtures.patientBundle, jsonResponse);

mockPool
  .intercept({
    path: '/baseR4/Patient/592442',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, fixtures.patient, jsonResponse);

mockPool
  .intercept({
    path: '/baseR4/Patient/invalid-patient-id',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, fixtures.invalidPatient, jsonResponse);

mockPool
  .intercept({
    path: '/baseR4/Claim',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, fixtures.claimBundle);

mockPool
  .intercept({
    path: '/baseR4/Claim/49023',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, fixtures.claim);

mockPool
  .intercept({
    path: '/baseR4/noAccess',
    method: 'POST',
  })
  .reply(404, {
    message: 'Not found',
    status: 'error',
    code: 404,
  });

mockPool
  .intercept({
    path: '/baseR4/!@#$%^&*',
    method: 'POST',
  })
  .reply(500, {
    message: 'Server error',
    status: 'error',
    code: 500,
  });

export default mockAgent;
