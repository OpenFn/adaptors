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
  registry_code: '011803',
  child: {
    first_name: 'Test',
    middle_name: '',
    Surname: 'Testerson',
    birth_date: '2024/03/04',
    birth_type_code: '1',
    gender_code: '2',
    place_of_delivery_code: '7',
    attendant_at_birth_code: '1',
    bith_attendant_full_name: 'Helen',
    bith_attendant_phone: '0248403076',
  },
  mother: {
    national_id_number: 'GHA-000000000-2',
    first_name: 'fake',
    middle_name: '',
    maiden_name: 'fakerson',
    phone: '0248403076',
    occupation_code: '29',
    age: 25,
  },
  father: {
    national_id_number: '',
    first_name: 'john',
    middle_name: '',
    Surname: 'doe',
    phone: '0248403076',
    occupation_code: '115',
    age: 39,
  },
};

const birthNotificationResponse = {
  birth_certificate_number: '000000-00-2024',
  first_name: 'Test',
  middle_name: '',
  Surname: 'sample surname',
  birth_date: '04 Mar 2024',
  national_id_number: '',
  place_of_delivery: 'MATERNITY HOME',
  Health_facility: '',
  birth_type: null,
  gender: 'MALE',
  house_number: '',
  street_name: '',
  district: '',
  region: '',
  town_or_village: '',
  m_first_name: 'sample mom',
  m_middle_name: '',
  m_maiden_name: 'sample surname',
  m_surname: '',
  m_national_id_number: 'GHA-000000000-0',
  m_nationality: '',
  f_first_name: 'father fname',
  f_middle_name: '',
  f_Surname: 'father sur',
  f_nationality: '',
  f_national_id_number: '',
  reference_id: 'abc123de-1995',
  document_number: '1995/000000/XX0000000A1B2C3',
  created_at: '05 Mar 2024',
  last_updated_at: null,
  issuccessful: true,
  message: 'record reference_id : abc123de-1995 , created successfully',
  messagecode: '200',
};

// This creates a mock bdr server
// It should present the same rest API as BDR-MOH-GHS
export function createServer(url = 'http://tracker.chimgh.org') {
  const agent = new MockAgent();
  agent.disableNetConnect();

  const mockPool = agent.get(url);

  const sendBirthNotification = req => {
    const body = JSON.parse(req.body);
    if (validateRequestBody(body, sampleRequestBody)) {
      return {
        statusCode: 200,
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
        // Note the double stringification from BDR
        data: JSON.stringify(JSON.stringify(birthNotificationResponse)),
      };
    } else {
      // console.log('Validation errors:', validate.errors);
      return {
        statusCode: 417,
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: {
          Message:
            '{"issuccessful":false,"message":"Record failed to save with this error -->  Modify the clause to make sure that a column is updated only once. If this statement updates or inserts columns into a view, column aliasing can conceal the duplication in your code.","messagecode":"210"} (Note that this is just a sample error from a mock endpoint.)',
        },
      };
    }
  };

  mockPool
    .intercept({ method: 'post', path: /api\/notification/ })
    .reply(sendBirthNotification)
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
