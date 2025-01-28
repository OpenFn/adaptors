import { MockAgent } from 'undici';

const niaResponseSample = {
  data: {
    babyPin: 'GH-6326223626-3'
  }
};

// This creates a mock NIA server
export function createServer(url = 'https://selfie.imsgh.org:2035') {
  const agent = new MockAgent();
  agent.disableNetConnect();

  const mockPool = agent.get(url);

  const sendNiaData = req => {
    return {
      statusCode: 200,
      responseOptions: {
        headers: { 'Content-Type': 'application/json' },
      },
      data: JSON.stringify(niaResponseSample),
    };
  };

  mockPool
    .intercept({ method: 'post', path: /awopa\/api\/v1\/baby\/registration/ })
    .reply(sendNiaData)
    .persist();

  return {
    agent,

    request: ({ method, path, data, ...rest }) => {
      const opts = {
        method,
        path,
        origin: url,
        headers: {
          // TODO this maybe needs to be base 64 encoded
          // Authorization: `Basic dW5kZWZpbmVkOnVuZGVmaW5lZA==`,
        },
        ...rest,
      };

      if (data) {
        opts.body = JSON.stringify(data);
      }
      return mockPool.request(opts);
    },
  };
}
