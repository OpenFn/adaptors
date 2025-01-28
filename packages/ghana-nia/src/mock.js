import { MockAgent } from 'undici';
import { validateRequestBody } from '../../../tools/mock-validator.js';

const sampleRequestBody = {
  merchantKey: '89487284-9083-4015-9128-91d8db7e023e',
  babyData: {
    dateOfBirth: '2024-03-05',
    fatherName: 'Nyarkoa Osei-Akoto',
    forenames: 'Kharis',
    gender: 'Female',
    lightwaveETrackerID: '00313180/24-03',
    motherName: 'Gifty Osei-Akoto',
    noSiblingsInDelivery: '0',
    placeOfBirth: 'New Market Health Centre',
    surname: 'Osei',
    timeOfbirth: '09:34',
    weightAtBirth: '2.7',
    birthCertificateNumber: '011803-48-2024',
    babyPicture: '...base64 encoded image goes here...',
  },
  personVouching: {
    etrackerLightwaveID: '00313180/24-03',
    ghanaCardPIN: 'GHA-001097272-4',
    relationToBaby: 'Mother',
    relativePhone: '0248403076',
    relativePicture: '...base64 encoded image goes here...',
  },
};

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
    if (validateRequestBody(JSON.parse(req.body), sampleRequestBody)) {
      return {
        statusCode: 200,
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: JSON.stringify(nationalIdSampleResponse),
      };
    } else {
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
