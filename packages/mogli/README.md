Language Mogli [![Build Status](https://travis-ci.org/OpenFn/language-mogli.svg?branch=master)](https://travis-ci.org/OpenFn/language-mogli)
==============

Language Pack for building expressions and operations to interact with Mogli SMS.

Documentation
-------------

#### sample configuration

```json
{
  "username": "taylor@openfn.org",
  "password": "supersecret",
  "loginUrl": "https://instance_name.mogli.com",
  "securityToken": "xxx123",
  "secret": "abc456"
}
```

### Create inbound SMS
```js
createSMS(
  fields(
    field("sender", dataValue("from_number")),
    field("receivedAt", dataValue("timestamp")),
    field("message", dataValue("message"))
  )
);
```

<!-- TODO: determine update process -->
<!-- ### Update SMS status
```js
updateSMS(
  fields(
    field("Id", dataValue("externalId")),
    field("status", dataValue("status"))
  )
);
``` -->

[Docs](docs/index)

Development
-----------

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
