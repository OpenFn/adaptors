# language-rapidpro [<img src="https://avatars2.githubusercontent.com/u/9555108?s=200&v=4)" alt="alt text" height="20">](https://www.openfn.org) [![Build Status](https://travis-ci.org/OpenFn/language-rapidpro.svg?branch=master)](https://travis-ci.org/OpenFn/language-rapidpro)

An OpenFn **_adaptor_** for building integration jobs for use with the
[RapidPro API](https://rapidpro.io/api/v2/).

## Documentation

- View the documentation at https://openfn.github.io/language-rapidpro/ [In Progress]
- To update the documentation site, run:
  `./node_modules/.bin/jsdoc --readme ./README.md ./lib -d docs`

## Usage

#### sample configuration

```json
{
  "host": "https://app.rapidpro.io/",
  "token": "super-secret-token-123"
}
```

#### sample job expression using operation

```js
sendBroadcast({
  "text": "Hello friends.",
  "urns": [],
  "contacts": [],
  "groups", [],
});
```

### Key helper functions 

**sendBroadcast(...) to send broadcast message to multiple contacts**
```js
sendBroadcast({
  text: "Hello world",
  urns: ["twitter:sirmixalot"],
  contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
});
```

**startFlow(...) to trigger an automation flow in RapidPro**
```js
startFlow({
  flow: "f5901b62-ba76-4003-9c62-72fdacc1b7b7",
  restart_participants: false,
  contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
});
```
**upsertContact(...) to update/insert a Contact (and check if exists using external identifiers)**
```js
upsertContact({
  name: "Mamadou",
  language: "ENG",
  urns: ["tel:+250788123123"]
});
```

**addContact(...) to insert a Contact**
```js
addContact({
  name: "Mamadou",
  language: "ENG",
  urns: ["tel:+250788123123"]
});
```

## Development

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `npm run build`.
