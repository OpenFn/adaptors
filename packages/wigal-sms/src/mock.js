import { MockAgent } from 'undici';

const wigalSmsResponse = {
  status: 'ACCEPTED',
  message: 'Message Accepted For Processing',
};

// This creates a mock Wigal SMS server
export function createServer(url = 'https://frogapi.wigal.com.gh') {
  const agent = new MockAgent();
  //agent.disableNetConnect();

  const mockPool = agent.get(url);

  const sendSms = req => {
    return {
      statusCode: 200,
      responseOptions: {
        headers: { 'Content-Type': 'application/json' },
      },
      data: JSON.stringify(wigalSmsResponse),
    };
  };

  mockPool
    .intercept({ method: 'post', path: '/api/v3/sms/send' })
    .reply(sendSms)
    .persist();

  return {
    agent,

    request: ({ method, path, data, ...rest }) => {
      const opts = {
        method,
        path,
        origin: url,
        ...rest,
      };

      if (data) {
        opts.body = JSON.stringify(data);
      }

      return mockPool.request(opts);
    },
  };
}
