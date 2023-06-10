import { MockAgent } from 'undici';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('https://fake.server.com');

mockPool
  .intercept({
    path: '/api/patients',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Basic aGVsbG86dGhlcmU=',
    },
  })
  .reply(200, {
    data: { id: 7, fullName: 'Mamadou', gender: 'M' },
    status: 'success',
  });

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
    path: '/api/differentError',
    method: 'POST',
  })
  .reply(500, {
    message: 'Server error',
    status: 'error',
    code: 500,
  });

export default mockAgent;
