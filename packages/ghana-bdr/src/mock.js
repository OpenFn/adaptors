import { MockAgent } from 'undici';

const sampleRequestBody = {
  child: {
    first_name: 'Nana',
    middle_name: 'Nana',
    Surname: 'Kumasi',
    birth_date: '2023/10/22',
    national_id_number: '90282901892',
    place_of_delivery_code: '2',
    place_of_delivery_other: null,
    birth_type_code: '1',
    gender_code: '2',
    attendant_at_birth_code: '1',
    attendant_at_birth_other: null,
    bith_attendant_full_name: 'Dr Lawrence Kwame',
    bith_attendant_phone: '0556969609',
  },
  mother: {
    first_name: 'Nana',
    middle_name: 'Nana',
    maiden_name: 'Nana',
    surname_or_marriage_name: 'Nana',
    phone: '05673673673',
    age: 35,
    national_id_number: '90-030-003',
    nationality_code: '131',
    house_number: 'No 4536',
    street_name: 'Accra city Ghana',
    district_code: '10',
    region_code: '10',
    town_or_village: 'Ajiringanor',
    number_of_children_ever_born_alive: 5,
    born_alive_are_living: 5,
    live_birth_order: 5,
    born_alive_are_dead: 0,
    education_level_code: '6',
    education_level_other: null,
    occupation_code: '13',
    occupation_other: null,
  },
  father: {
    first_name: 'Kufor',
    middle_name: 'Kufor',
    surname: 'Mensa',
    nationality_code: '131',
    national_id_number: '88-9292-92092',
    phone: '05673673737',
    age: 38,
    education_level_code: '13',
    occupation_code: '13',
    religion_code: '1',
    education_level_other: null,
    occupation_other: null,
    religion_other: null,
    is_gainfully_employed_code: '1',
  },
  health_facility: {
    name: 'Korlebu General Hospital',
    house_number: 'No 4536',
    street_name: 'Adjiringano',
    town_code: '12',
    town_other: null,
    district_code: '11',
    region_code: '12',
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

  const validateRequestBody = (request, sample) => {
    // Check top-level keys
    const sampleKeys = Object.keys(sample);
    const requestKeys = Object.keys(request);

    for (const key of sampleKeys) {
      // make sure all keys are present
      if (!requestKeys.includes(key)) {
        console.log('Key missing:', key);
        return false;
      }

      // make sure all the value of all keys have the same value type
      if (typeof sample[key] != typeof request[key]) {
        console.log('Key with wrong value type:', key);
        return false;
      }

      // If the value is an object, recursively validate
      // can we check the keys of each key (assuming it's an object)
      if (typeof sample[key] === 'object' && sample[key] !== null) {
        if (!validateRequestBody(request[key], sample[key])) {
          console.log('Failed check at:', key);
          return false;
        }
      }
    }

    return true;
  };

  const sendBirthNotification = req => {
    if (validateRequestBody(JSON.parse(req.body), sampleRequestBody)) {
      return {
        statusCode: 200,
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: JSON.stringify(birthNotificationResponse),
      };
    } else {
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
