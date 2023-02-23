# Language CommCare

Language Pack for interacting with the CommCare API.

https://confluence.dimagi.com/display/commcarepublic/Download+Report+Data

https://confluence.dimagi.com/display/commcarepublic/Submission+API

https://bitbucket.org/javarosa/javarosa/wiki/FormSubmissionAPI

Accepted X-Form Spec from Dimagi: http://dimagi.github.io/xform-spec Accepted
X-Form Spec for Cases from Dimagi:
https://github.com/dimagi/commcare/wiki/casexml20

## Documentation

## Configuration

View all the required and optional properties for `state.configuration` in the official [configuration-schema](https://docs.openfn.org/adaptors/packages/commcare-configuration-schema/) definition.

- The "appId" is the UUID which designates your commcare project as different from
everyone elses. It can be found in the URL of your application when you first
enter it from the project screen. I.e., the last part of this url:
`https://www.commcarehq.org/a/YOUR_PROJECT/apps/view/YOUR_APP_ID/`

- Note that the username is your full email address.

## `fetchReportData` to pull aggregate data from CommCare

It takes 3 arguments: reportId, params, and postUrl.

```js
fetchReportData(
  'reportId',
  { limit: 10, offset: 2, state: 'Vermont' },
  'http://www.openfn.org/inbox/secret-uuid'
);
```

simple body target:

```xml
<data xmlns="http://openrosa.org/formdesigner/39A2CA97-2EB8-4A9C-A0D1-6AA666666A66">
    <firstname>Something</firstname>
    <lastname>Else</lastname>
    <age>29</age>
</data>
```

complex body target:

```xml
<?xml version='1.0' ?>
<data uiVersion="1" version="17" name="New Form" xmlns:jrm="http://dev.commcarehq.org/jr/xforms" xmlns="http://openrosa.org/formdesigner/1DFD8610-91E3-4409-BF8B-02D3B4FF3530">
    <foo>bar</foo>
    <n0:case case_id="ddb8e2b3-7ce0-43e4-ad45-d7a2eebe9169" user_id="user-xxx-eve" date_modified="2013-04-19T16:53:02.799-04" xmlns:n0="http://commcarehq.org/case/transaction/v2">
        <n0:create>
            <n0:case_name>bar</n0:case_name>
            <n0:owner_id>user-xxx-eve</n0:owner_id>
            <n0:case_type>member</n0:case_type>
        </n0:create>
    </n0:case>
    <n1:meta xmlns:n1="http://openrosa.org/jr/xforms">
        <n1:deviceID>A00000245706EE</n1:deviceID>
        <n1:timeStart>2013-04-19T16:52:41.000-04</n1:timeStart>
        <n1:timeEnd>2013-04-19T16:53:02.799-04</n1:timeEnd>
        <n1:username>eve</n1:username>
        <n1:userID>user-xxx-eve</n1:userID>
        <n1:instanceID>b58df19c-efd5-4ecf-9581-65dda8b8787c</n1:instanceID>
        <n2:appVersion xmlns:n2="http://commcarehq.org/xforms">CommCare ODK, version "2.4.1"(10083). App v19. CommCare Version 2.4. Build 10083, built on: March-12-2013</n2:appVersion>
    </n1:meta>
</data>
```

## Submitting data to CommCare HQ

### Submit an XLS file

This function bulk submit a JSON object as xls file to CommCare HQ

```js
submitXls([{ name: 'Mamadou', phone: '000000' }], {
  case_type: 'student',
  search_field: 'external_id',
  create_new_cases: 'on',
});
```

### submit

Here we're just building the most basic JSON object, that will be converted to
an XML object and posted as the <data /> element.

```js
submit(
  fields(
    field('@', function (state) {
      return {
        xmlns:
          'http://openrosa.org/formdesigner/2BCC3E88-2D0D-4C07-8D4A-6B372F3799D9',
      };
    }),
    field('paitent_namentosh', dataValue('first_name')),
    field('question2', 'Some answer here.'),
    field('question3', 'HKS'),
    field('question4', 'item1'),
    field('question5', 69855),
    field('question6', 12)
  )
);
```

An open rosa form submission body should look like this:

```xml
<?xml version="1.0" ?>
<data name="Patient Registration" uiVersion="1" version="9" xmlns="http://openrosa.org/formdesigner/2BCC3E88-2D0D-4C07-8D4A-6B372F3799D9" xmlns:jrm="http://dev.commcarehq.org/jr/xforms">
  <paitent_namentosh>Taylor</paitent_namentosh>
  <question2>Moruki</question2>
  <question3>Hks</question3>
  <question4>item1</question4>
  <question5>69855</question5>
  <question6>12</question6>
  <n0:meta xmlns:n0="http://openrosa.org/jr/xforms">
    <n0:deviceID>358239055789384</n0:deviceID>
    <n0:timeStart>2015-08-21T16:21:59.807+02</n0:timeStart>
    <n0:timeEnd>2015-08-21T16:22:15.987+02</n0:timeEnd>
    <n0:username>openfn</n0:username>
    <n0:userID>5fe615b3af2834cb5dca59f7466d6174</n0:userID>
    <n0:instanceID>195e79eb-d823-46fe-9e4f-59b8327d5db2</n0:instanceID>
    <n1:appVersion xmlns:n1="http://commcarehq.org/xforms">CommCare ODK, version &quot;2.22.0&quot;(370023). App v9. CommCare Version 2.22. Build 370023, built on: July-22-2015</n1:appVersion>
  </n0:meta>
</data>
```

So the JSON emitted by your expression should look like this:

```json
{
  "data": {
    "name": "Patient Registration",
    "uiVersion": "1",
    "version": "9",
    "xmlns": "http://openrosa.org/formdesigner/2BCC3E88-2D0D-4C07-8D4A-6B372F3799D9",
    "xmlns:jrm": "http://dev.commcarehq.org/jr/xforms",
    "paitent_namentosh": "Taylor",
    "question2": " Moruki",
    "question3": "Hks",
    "question4": "item1",
    "question5": "69855",
    "question6": "12",
    "n0:meta": {
      "xmlns:n0": "http://openrosa.org/jr/xforms",
      "n0:deviceID": "358239055789384",
      "n0:timeStart": "2015-08-21T16:21:59.807+02",
      "n0:timeEnd": "2015-08-21T16:22:15.987+02",
      "n0:username": "openfn",
      "n0:userID": "5fe615b3af2834cb5dca59f7466d6174",
      "n0:instanceID": "195e79eb-d823-46fe-9e4f-59b8327d5db2",
      "n1:appVersion": {
        "xmlns:n1": "http://commcarehq.org/xforms",
        "$t": "CommCare ODK, version \"2.22.0\"(370023). App v9. CommCare Version 2.22. Build 370023, built on: July-22-2015"
      }
    }
  }
}
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
