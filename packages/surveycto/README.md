# Language SurveyCTO

Language Pack for building expressions and operations to make HTTP calls to
SurveyCTO.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/surveycto-configuration-schema/)
definition.

## fetchSubmissions

`fetchSubmissions(1,2,3)` takes three arguments:

1. the `formId` of the form on SurveyCTO

2. the `initialAfterDate`, a date string or UNIX timestamp which instructs the
   job to only fetch submissions after a certain date. After the first run of
   the job, subsequent runs will only fetch _NEW_ submissions.

3. the `postUrl` is where the wide-format JSON representation of each form
   submission should be sent. Note that a `formId` key will be added to each
   form submission for later filtering/routing.

### sample `fetchSubmissions` expression

```js
fetchSubmissions(
  // formId on SurveyCTO server
  'household_survey',
  // initialAfterDate: this will only be accessed if "lastSubmissionDate" is empty in your job_state".
  // After the initial run of the job, OpenFn will only pull new submissions from SurveyCTO.
  'Aug 29, 2016 4:44:26 PM',
  // postUrl is where you want to send the JSON submissions, appended with a new "formId" key
  'https://www.openfn.org/inbox/secret-inbox-uuid'
);
```

## Development

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
