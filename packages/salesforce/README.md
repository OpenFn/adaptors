# Language Salesforce

An OpenFn **_adaptor_** for building integration jobs for use with the
Salesforce API.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/salesforce-docs)
for full technical documentation.

## Release notes and deprecated CHANGELOG.md

See [releases](https://docs.openfn.org/adaptors/packages/salesforce-changelog)
for all changes.

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/saleforce-configuration-schema/)
definition.

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

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`

## Other

Create SOAP session

```sh
curl https://test.salesforce.com/services/Soap/u/47.0 -H "Content-Type: text/xml; charset=UTF-8" -H "SOAPAction: login" -d @tmp/login.txt | xmllint --format -
```

Close jobs

```sh
curl
https://openfn.my.salesforce.com/services/async/47.0/job/some_id -H 'X-SFDC-Session: abc123sessionID456xyz' -H "Content-Type: application/xml; charset=UTF-8" -d @tmp/close_job.txt | xmllint --format -
```
