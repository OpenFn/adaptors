import { expect } from 'chai';

import { createBirthRecord, get } from '../src/Adaptor.js';

// ─── Configuration ───────────────────────────────────────────────
// Replace these values with your real BDR credentials before running.
// Run with: pnpm test test/integration.test.js
// ─────────────────────────────────────────────────────────────────

const CONFIG = {
  token: '8oS3T6p68qiQNPsor57qFvV+9Oy9nDoF0t4De5E8HfghAD/tXAbnjY+rSSvlnZG7JpVCbk5Mk2R9s9/g5pe9v8mf6YXlDGPPNxh83JrVI1XF70CuyIJdcvYTz08GcDNTRAahyQ1JQXtxZf/MAMb7VD8oK78tDXC9hgRgCxg3GMqdW1M1qqQqrGbb2jZ24+czFqvsGjwecEiGwB0xt/kYyjeUI9ywq58YtSJ47XaWtPVpa4L01FfBQALbCeXhFl3XBF5cEY7jUxJ4cSml/4EWnt/oo44AZvir8kLr3OG8KuFWCfPGiDok7uCUBPcOhZP54MRTnlORGcolYtBp/UUG9C98QuleWEwSNFQJb5GD76auXraKd1u87mCxUPOWyTRMPC+uAf1Ul3bXcjcR8ZpFKSX5PmTDlnETtSY6Hfju+ar/EO2/k0/MwWMK',
  baseUrl: 'https://bdrbeta.npontu.com',
};

const testBirthData = {
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

describe('Integration — createBirthRecord', function() {
  this.timeout(60000);

  it('creates a birth record - Integration.test', async () => {
    const state = {
      configuration: CONFIG,
      data: testBirthData,
    };

    const finalState = await createBirthRecord(state => state.data)(state);

    expect(finalState).to.exist;
    expect(finalState.data).to.exist;
    expect(finalState.data.api_status).to.equal('success');
    expect(finalState.data.api_data.document_number).to.exist;
  });
});

describe('Integration — get', function() {
  this.timeout(60000);

  it('retrieves a birth record via GET - Integration.test', async () => {
    // First create a record to get a document_number
    const createState = {
      configuration: CONFIG,
      data: testBirthData,
    };

    const created = await createBirthRecord(state => state.data)(createState);
    const documentNumber = created.data.api_data.document_number;

    expect(documentNumber).to.exist;

    // Now fetch it back via GET
    const getState = {
      configuration: CONFIG,
    };

    const finalState = await get(
      `/api/v1/UserManagementService/integrations/registrations/birth/${documentNumber}`
    )(getState);

    expect(finalState).to.exist;
    expect(finalState.data).to.exist;
    expect(finalState.data.api_data.document_number).to.equal(documentNumber);
  });
});
