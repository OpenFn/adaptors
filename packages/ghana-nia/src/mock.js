import { MockAgent } from 'undici';

// Generated from sample with https://www.jsongenerator.io/schema
// But!! I had to replace $schema with $id
import reqSchema from './schema/request.json' assert { type: 'json' };
import Ajv from 'ajv';

const validate = new Ajv().compile(reqSchema);

const nationalIdSampleResponse = {
  data: {
    babyPin: 'GHA-000000000-1',
    voucherPin: 'GHA-000000000-4',
    etrackerLightwaveId: '00000000/24-03',
    lightwaveEtrackerId: null,
  },
  success: true,
  code: '00',
  msg: 'Saved Successfully',
};

// This creates a mock NIA server
export function createServer(url = 'https://selfie.imsgh.org:2035') {
  const agent = new MockAgent();
  agent.disableNetConnect();

  const mockPool = agent.get(url);

  const sendNiaData = req => {
    if (validate(JSON.parse(req.body))) {
      return {
        statusCode: 200,
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: JSON.stringify(nationalIdSampleResponse),
      };
    } else {
      console.log('Validation errors:', validate.errors);
      return {
        // Why is this a 404 coming from NIA?
        statusCode: 404,
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: {
          success: false,
          code: '05',
          data: null,
          // sic
          msg: 'Error in Verifiation Process',
          // from the mock:
          _errors: validate.errors,
        },
      };
    }
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
          // Note that BDR does not appear to accept basic auth headers.
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
