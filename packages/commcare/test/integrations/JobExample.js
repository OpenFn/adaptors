/* eslint-disable no-undef */

// Create a state.json for credentials to the demo environment. Docs "https://docs.openfn.org/adaptors/packages/commcare-configuration-schema"
submit(
  fields(
    field('@', function () {
      return {
        xmlns: 'http://openrosa.org/formdesigner/form-id-here',
      };
    }),
    field('question1', dataValue('answer1')),
    field('question2', 'Write some answer here.')
  )
);
fn(state => {
  console.log(state);
});

submitXls([{ name: 'Mamadou', phone: '000000' }], {
  case_type: 'student',
  search_field: 'external_id',
  create_new_cases: 'on',
});
fn(state => {
  console.log(state);
});

fetchReportData(
  'report-id-here',
  {
    offset: 20,
    limit: 10,
  },
  '/a/your-domain/api/form/v1/'
);
fn(state => {
  console.log(state);
});

// --- Case Data API v2 examples ---
// https://commcare-hq.readthedocs.io/api/cases-v2.html
// Requires apiVersion: "v2" in state.configuration

// List cases (with optional filters)
get('case', { case_type: 'patient', closed: false });
fn(state => {
  console.log('matching_records:', state.data.matching_records);
  console.log('cases:', state.data.cases);
});

// Get a single case by ID
request('GET', '/a/your-domain/api/case/v2/your-case-id/');
fn(state => {
  console.log(state.data);
});

// Create a case
post('case', {
  case_type: 'patient',
  case_name: 'Elizabeth Harmon',
  owner_id: 'your-owner-id',
  properties: { dob: '1948-11-02' },
});
fn(state => {
  console.log('xform_id:', state.data.xform_id);
  console.log('created case:', state.data.case);
});

// Bulk create/update cases (each must include create: true/false)
// https://commcare-hq.readthedocs.io/api/cases-v2.html#bulk-create-update-cases
post('case', [
  {
    create: true,
    case_type: 'mother',
    case_name: 'Cersei Lannister',
    owner_id: 'your-owner-id',
    temporary_id: '1',
    properties: { dob: '1988-11-02' },
  },
  {
    create: true,
    case_type: 'baby',
    case_name: 'Tommen Baratheon',
    owner_id: 'your-owner-id',
    properties: { dob: '2008-03-01' },
    indices: {
      parent: { temporary_id: '1', case_type: 'mother', relationship: 'child' },
    },
  },
]);
fn(state => {
  console.log('xform_id:', state.data.xform_id);
  console.log('cases:', state.data.cases);
});
