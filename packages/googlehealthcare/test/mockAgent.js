import { MockAgent } from 'undici';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('https://healthcare.googleapis.com');

mockPool
  .intercept({
    path: '/v1/projects/test-007/locations/us-east7/datasets/fhir-007/fhirStores/testing-fhir-007/fhir/Patient',
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
  });

mockPool
  .intercept({
    path: '/v1/projects/test-007/locations/us-east7/datasets/fhir-007/fhirStores/testing-fhir-007/fhir/noAccess',
    method: 'POST',
  })
  .reply(400, {
    message: 'unsupported resource type: noAccess',
    status: 'error',
    code: 400,
  });

mockPool
  .intercept({
    path: '/v1/projects/test-007/locations/us-east7/datasets/fhir-007/fhirStores/testing-fhir-007/fhir/Patient',
    method: 'POST',
    headers: {
      'content-type': 'application/fhir+json',
      Authorization: 'Bearer aGVsbG86dGhlcmU=a',
    },
  })
  .reply(401, {
    message: 'Unauthorized',
    status: 'error',
    code: 401,
  });

export default mockAgent;
