import { MockAgent } from 'undici';

// Generated from sample with https://www.jsongenerator.io/schema
// But!! I had to replace $schema with $id
import reqSchema from './schema/request.json' assert { type: 'json' };
import Ajv from 'ajv';

const validate = new Ajv().compile(reqSchema);

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
    if (validate(JSON.parse(req.body))) {
      return {
        statusCode: 200,
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: JSON.stringify(birthNotificationResponse),
      };
    } else {
      console.log('Validation errors:', validate.errors);
      return {
        statusCode: 417,
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: {
          Message:
            '{"issuccessful":false,"message":"Record failed to save with this error -->  Modify the clause to make sure that a column is updated only once. If this statement updates or inserts columns into a view, column aliasing can conceal the duplication in your code.","messagecode":"210"} (Note that this is just a sample error from a mock endpoint.)',
          // from the mock:
          _errors: validate.errors,
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
