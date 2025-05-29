import { MockAgent } from 'undici';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('https://onasreteam.blob.core.windows.net');

const mockBase64 =
  '-aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWdBQUFBSUFDQVlBQUFEMGVOVDZBQUFBQVhOU1IwSUE=';

mockPool
  .intercept({
    path: '/image/sample',
    method: 'GET',
  })
  .reply(200, Buffer.from(mockBase64));


  export default mockAgent;
