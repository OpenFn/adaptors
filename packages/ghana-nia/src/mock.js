import { MockAgent } from 'undici';
import { validateRequestBody } from './util';

// import Ajv from 'ajv';
// // Generated from sample with https://www.jsongenerator.io/schema
// // But!! I had to replace $schema with $id
// // Note: use import() or ele src build breaks
// const reqSchemaString = import('./schema/request.json');
// const reqSchema = JSON.parse(reqSchemaString);
// const validate = new Ajv().compile(reqSchema);

const sampleRequestBody = {
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
    const body = JSON.parse(req.body);

    if (validateRequestBody(body, sampleRequestBody)) {
      return {
        statusCode: 200,
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: JSON.stringify(nationalIdSampleResponse),
      };
    } else {
      // console.log('Validation errors:', validate.errors);
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
