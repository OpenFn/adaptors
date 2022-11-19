# language-rapidpro

An OpenFn **_adaptor_** for building integration jobs for use with the
[RapidPro API](https://rapidpro.io/api/v2/).

## Documentation

- View the documentation at https://openfn.github.io/language-rapidpro/ [In
  Progress]
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
  text: 'Hello world',
  urns: ['twitter:sirmixalot'],
  contacts: ['a052b00c-15b3-48e6-9771-edbaa277a353'],
});
```

**startFlow(...) to trigger an automation flow in RapidPro**

```js
startFlow({
  flow: 'f5901b62-ba76-4003-9c62-72fdacc1b7b7',
  restart_participants: false,
  contacts: ['a052b00c-15b3-48e6-9771-edbaa277a353'],
});
```

**upsertContact(...) to update/insert a Contact (and check if exists using
external identifiers)**

```js
upsertContact({
  name: 'Mamadou',
  language: 'ENG',
  urns: ['tel:+250788123123'],
});
```

**addContact(...) to insert a Contact**

```js
addContact({
  name: 'Mamadou',
  language: 'ENG',
  urns: ['tel:+250788123123'],
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
