# Language SMPP

Language Pack for building expressions and operations to make calls to an OpenFn
SMPP client API.

## Documentation

#### sample configuration

```json
{
  "systemId": "some_smpp_client_name",
  "password": "password",
  "clientHost": "http://localhost:4000",
  "inboxId": "1c908151-8273-431c-b1d4-blah"
}
```

#### sample send expression

```js
send({
  text: dataValue('text'),
  smsId: dataValue('messageId'),
  recipient: dataValue('to'),
  sender: dataValue('from'),
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
