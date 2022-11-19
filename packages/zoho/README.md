# Language Zoho

Language Pack for sending messages using the Zoho API.

## Documentation

### Sample configuration

```json
{
  "account": "yourzohoaccount",
  "authToken": "secretauthtoken",
  "apiVersion": "v2"
}
```

### addRow

To add a row to the "Customers" table in the "testing_openfn" database, use the
following `addRow` function.

```js
addRow(
  'testing_openfn',
  'Customers',
  fields(field('Subject', dataValue('formId')), field('Status', 'Closed'))
);
```

### updateRow

Coming soon. Want to help?
https://zohoreportsapi.wiki.zoho.com/Updating-Data.html

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
