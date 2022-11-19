# Language Salesforce

Salesforce Language Pack for OpenFn. **See the main docs site:
http://openfn.github.io/language-salesforce/ **

## Release notes and deprecated CHANGELOG.md

See [releases](https://github.com/OpenFn/language-salesforce/releases) for all
changes.

## Sample configuration

```json
{
  "loginUrl": "https://somesalesforcelogin.url/",
  "username": "someusername",
  "password": "somesupersecretpassword",
  "securityToken": "salesforcesecuritytoken"
}
```

## Intent

---

Allow communication with Salesforce using a set of Lisp compatible expressions.

Using simple functions we can create a simplified API, simple enough to generate
code from data.

## Expressions

---

Expressions are a simplified set of function calls. Outlining the operations
needed to be performed.

An uncompiled expression has no knowledge of the internals of the adaptor,
credentials or runtime environment.

It's the responsibility of the build process to provide a wrapper that will
inject the functions in.

For example:

```javascript
describe('vera__Test_Event__c'),
  create('vera__Test_Event__c', {
    vera__Test_Event_Name_Unique__c: 'hello from jsforce',
  }),
  create('vera__Boat__c', {
    Name: 'Catatafish redux!',
    vera__Test_Event__c: reference(0),
  });
```

## ## API

`field("key","value")` Returns `{ "key": "value" }`

[`relationship("relationship_name__r", "externalID", dataSource("path"))`](https://github.com/OpenFn/language-salesforce/blob/master/src/Adaptor.js#L23-L44)

[`describe("obj_name")`](https://github.com/OpenFn/language-salesforce/blob/master/src/Adaptor.js#L46-L71)

[`query('queryString')`](https://github.com/OpenFn/language-salesforce/blob/master/src/Adaptor.js#L107-L136)

[`bulk('obj_name', 'operation', 'options', arrayOfFields)`](https://github.com/OpenFn/language-salesforce/blob/master/src/Adaptor.js#L138-L210)

[`create('obj_name', fields())`](https://github.com/OpenFn/language-salesforce/blob/master/src/Adaptor.js#L212-L238)

[`destroy('obj_name', fields())`](https://github.com/OpenFn/language-salesforce/blob/master/src/Adaptor.js#225-259)

[`createIf(logical, 'obj_name', fields())`](https://github.com/OpenFn/language-salesforce/blob/master/src/Adaptor.js#L240-L279)

[`upsert(sObject, 'externalID', fields())`](https://github.com/OpenFn/language-salesforce/blob/master/src/Adaptor.js#L281-L315)

[`upsertIf(logical, 'obj_name', 'externalID', fields())`](https://github.com/OpenFn/language-salesforce/blob/master/src/Adaptor.js#L317-L370)

[`update('obj_name', fields())`](https://github.com/OpenFn/language-salesforce/blob/master/src/Adaptor.js#L372-L398)

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`

## ## Other

Create SOAP session

```sh
curl https://test.salesforce.com/services/Soap/u/47.0 -H "Content-Type: text/xml; charset=UTF-8" -H "SOAPAction: login" -d @tmp/login.txt | xmllint --format -
```

Close jobs

```sh
curl
https://openfn.my.salesforce.com/services/async/47.0/job/some_id -H 'X-SFDC-Session: abc123sessionID456xyz' -H "Content-Type: application/xml; charset=UTF-8" -d @tmp/close_job.txt | xmllint --format -
```
