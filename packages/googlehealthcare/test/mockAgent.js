import { MockAgent } from 'undici';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('https://fake.server.com');

mockPool
  .intercept({
    path: '/fhir/Patient',
    method: 'POST',
    headers: {
      'content-type': 'application/fhir+json',
      Authorization: 'Bearer aGVsbG86dGhlcmU=',
    },
  })
  .reply(200, {
    data: {
      birthDate: '1970-01-01',
      gender: 'female',
      id: '08ab7dd6-4271-45b2-a6a7-0ecd5ddce29d',
      meta: {
        lastUpdated: '2023-06-23T16:40:46.202757+00:00',
        versionId: 'MTY4NzUzODQ0NjIwMjc1NzAwMA',
      },
      name: [
        {
          family: 'Smith',
          given: ['Darcy'],
          use: 'official',
        },
      ],
      resourceType: 'Patient',
    },
    status: 'success',
  });

mockPool
  .intercept({
    path: '/fhir/noAccess',
    method: 'POST',
  })
  .reply(404, {
    message: 'Not found',
    status: 'error',
    code: 404,
  });

mockPool
  .intercept({
    path: '/fhir/!@#$%^&*',
    method: 'POST',
  })
  .reply(500, {
    message: 'Server error',
    status: 'error',
    code: 500,
  });

export default mockAgent;
