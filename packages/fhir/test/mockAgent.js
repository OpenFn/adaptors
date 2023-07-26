import { MockAgent } from 'undici';
import { fixtures } from './ClientFixtures';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('http://hapi.fhir.org/baseR4');

mockPool
  .intercept({
    path: '/Patient',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, fixtures.patientBundle);

mockPool
  .intercept({
    path: '/Patient/592442',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, fixtures.patient);

mockPool
  .intercept({
    path: '/Patient/invalid-patient-id',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, fixtures.invalidPatient);

mockPool
  .intercept({
    path: '/Claim',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, fixtures.claimBundle);

mockPool
  .intercept({
    path: '/Claim/49023',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, fixtures.claim);

mockPool
  .intercept({
    path: '/api/noAccess',
    method: 'POST',
  })
  .reply(404, {
    message: 'Not found',
    status: 'error',
    code: 404,
  });

mockPool
  .intercept({
    path: '/api/!@#$%^&*',
    method: 'POST',
  })
  .reply(500, {
    message: 'Server error',
    status: 'error',
    code: 500,
  });

export default mockAgent;
