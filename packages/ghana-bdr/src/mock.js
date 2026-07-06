import { MockAgent } from 'undici';
import { validateRequestBody } from './Utils.js';

// Sample request body for the new API format (flattened structure)
const sampleRequestBody = {
  status: 'COMPLETE',
  region_id: 1,
  district_id: 1,
  type_of_birth: 'SINGLETON',
  informant_type: 'MOTHER',
  informant_national_id_type: 'GHANA CARD',
  informant_national_id_number: '34454344',
  informant_first_name: 'David',
  informant_middle_name: '',
  informant_last_name: 'Godson',
  informant_region_id: 1,
  informant_district_id: 1,
  informant_residential_address: 'Dansoman',
  informant_phone_number: '2335648498309',
  child_first_name: 'Francis',
  child_middle_name: '',
  child_last_name: 'Benzoic',
  child_gender: 'MALE',
  child_dob: '2026-07-01',
  child_place_of_birth: 'HOSPITAL',
  child_birth_attendant: 'MID-WIFE',
  child_birth_institution: 'Ludra Hospital',
  child_town: 'Ashaiman',
  child_house_no: 'H/F286',
  child_street_name: 'Ashaiman Newtown',
  mother_national_id_type: 'GHANA CARD',
  mother_national_id_number: '32432423433',
  mother_phone_number: '2335456823893',
  mother_first_name: 'Adwoa',
  mother_middle_name: '',
  mother_last_name: 'Godson',
  mother_age: 30,
  mother_marital_status: 'MARRIED',
  mother_previous_birth_no: 50,
  mother_occupation: 'teacher',
  mother_educational_level: 'DIPLOMA',
  mother_region_id: 1,
  mother_district_id: 1,
  mother_town: 'Accra',
  mother_religion: 'CHRISTIANITY',
  mother_residence: 'Tamale',
  mother_nationality: 'GHANA',
  doubtful_maternity: 0,
  father_national_id_type: 'GHANA CARD',
  father_national_id_number: '32432423433',
  father_phone_number: '233548791223',
  father_first_name: 'David',
  father_middle_name: '',
  father_last_name: 'Godson',
  father_age: 33,
  father_marital_status: 'MARRIED',
  father_children_no: 5,
  father_occupation: 'Doctor',
  father_educational_level: 'DIPLOMA',
  father_region_id: 1,
  father_district_id: 1,
  father_town: 'Tema',
  father_residence: 'Tema',
  father_nationality: 'GHANA',
  father_religion: 'CHRISTIANITY',
  doubtful_paternity: 0,
  child_file_birth_evidence_name: ['Physics.jpg'],
  child_file_birth_evidence_data: ['data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QOJaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI=']
};

// Sample response from the birth creation endpoint
const birthCreationResponse = {
  api_code: 200,
  api_status: 'success',
  api_message: 'Your action has been processed.',
  api_data: {
    document_number: 'BIRTH-121234-2026-0000002',
    status: 'PENDING',
    type_of_birth: 'SINGLETON',
    informant_type: 'MOTHER',
    informant_national_id_type: 'GHANA CARD',
    informant_national_id_number: '34454344',
    informant_first_name: 'DAVID',
    informant_middle_name: null,
    informant_last_name: 'GODSON',
    informant_region_id: 1,
    informant_district_id: 1,
    informant_town: null,
    informant_residential_address: 'DANSOMAN',
    informant_phone_number: '2335648498309',
    child_first_name: 'FRANCIS',
    child_middle_name: null,
    child_last_name: 'BENZOIC',
    child_gender: 'MALE',
    child_dob: '2025-06-26',
    child_national_id_type: null,
    child_national_id_number: null,
    child_place_of_birth: 'HOSPITAL',
    child_birth_attendant: 'MID-WIFE',
    child_birth_institution: 'LUDRA HOSPITAL',
    child_region_id: 1,
    child_district_id: 1,
    child_town: 'ASHAIMAN',
    child_house_no: 'H/F286',
    child_street_name: 'ASHAIMAN NEWTOWN',
    mother_first_name: 'ADWOA',
    mother_middle_name: null,
    mother_last_name: 'GODSON',
    mother_age: 30,
    mother_marital_status: 'MARRIED',
    mother_religion: 'CHRISTIANITY',
    mother_occupation: 'TEACHER',
    mother_nationality: 'GHANA',
    mother_national_id_type: 'GHANA CARD',
    mother_national_id_number: '32432423433',
    mother_phone_number: '2335456823893',
    mother_region_id: 1,
    mother_district_id: 1,
    mother_town: 'ACCRA',
    mother_residence: 'TAMALE',
    doubtful_maternity: false,
    father_first_name: 'DAVID',
    father_middle_name: null,
    father_last_name: 'GODSON',
    father_national_id_type: 'GHANA CARD',
    father_national_id_number: '32432423433',
    father_phone_number: '233548791223',
    father_region_id: 1,
    father_district_id: 1,
    father_town: 'TEMA',
    father_residence: 'TEMA',
    father_age: 33,
    father_marital_status: 'MARRIED',
    father_religion: 'CHRISTIANITY',
    father_occupation: 'DOCTOR',
    father_nationality: "GHANA",
    father_children_no: 5,
    doubtful_paternity: false,
    region_id: 1,
    district_id: 1,
    registry_id: 1,
    evidence_content: [
      'Physics.jpg'
    ],
    evidence_url: [
      'https://bdrbeta.npontu.com/api/v1/EarlyBirthService/storage/third-party-integrations/early-birth-evidences/FRANCIS-BENZOIC-18/file/Physics.jpg'
    ],
    created_at: '2026-01-27 12:14:35',
    updated_at: '2026-01-27 12:14:36',
    completed_at: null
  }
};

// Sample token response
const tokenResponse = {
  api_code: 200,
  api_status: 'success',
  api_message: 'Token issued successfully',
  api_data: {
    access_token: 'sample-access-token-12345',
    refresh_token: 'sample-refresh-token-12345',
    token_type: 'Bearer',
    expires_in: 3600
  }
};

// Mock response headers used across all endpoints
const mockHeaders = { 'Content-Type': 'application/json' };

// This creates a mock bdr server
// It should present the same rest API as BDR-MOH-GHS
export function createServer(url = 'https://bdrbeta.npontu.com') {
  const agent = new MockAgent();
  agent.disableNetConnect();

  const mockPool = agent.get(url);

  // Note: BDR data endpoints return double-encoded JSON (JSON string inside JSON string)
  // The token/refresh endpoints return plain JSON

  // Mock the token endpoint
  mockPool
    .intercept({
      method: 'POST',
      path: /\/api\/v1\/UserManagementService\/integrations\/auth\/token/,
    })
    .reply(200, tokenResponse, { headers: mockHeaders })
    .persist();

  // Mock the token refresh endpoint
  mockPool
    .intercept({
      method: 'POST',
      path: /\/api\/v1\/UserManagementService\/integrations\/auth\/refresh/,
    })
    .reply(200, tokenResponse, { headers: mockHeaders })
    .persist();

  // Mock the birth creation endpoint (double-encoded JSON)
  mockPool
    .intercept({
      method: 'POST',
      path: /\/api\/v1\/UserManagementService\/integrations\/registrations\/birth(\/.*)?/,
    })
    .reply(200, birthCreationResponse, { headers: mockHeaders })
    .persist();

  // Mock the birth retrieval endpoint (GET, double-encoded JSON)
  mockPool
    .intercept({
      method: 'GET',
      path: /\/api\/v1\/UserManagementService\/integrations\/registrations\/birth\/.+/
    })
    .reply(200, birthCreationResponse, { headers: mockHeaders })
    .persist();

  // Mock the utility endpoint
  const utilityResponse = {
    ...tokenResponse,
    api_data: [
      { id: 1, country_id: 1, name: 'Ashanti', code: '05' },
      { id: 2, country_id: 1, name: 'Bono', code: 'BO' }
    ]
  };
  mockPool
    .intercept({
      method: 'POST',
      path: /\/api\/v1\/UserManagementService\/integrations\/utility/
    })
    .reply(200, utilityResponse, { headers: mockHeaders })
    .persist();

  return {
    agent,

    request: ({ method, path, data, ...rest }) => {
      const opts = {
        method,
        path,
        origin: url,
        headers: {
          ...rest.headers,
        },
      };

      if (data) {
        opts.body = JSON.stringify(data);
      }
      return mockPool.request(opts);
    },
  };
}
