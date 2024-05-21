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
  '/a/your-domain/api/v0.5/form/'
);
fn(state => {
  console.log(state);
});
