# Language Nexmo

Language Pack for building expressions and operations to interact with the Nexmo
API.

## Documentation

## sendSMS

#### sample configuration

```json
{
  "apiKey": "mYaP1K3y",
  "apiSecret": "supersecret"
}
```

#### sample expression

```js
sendSMS('OpenFn', '0123456789', 'HelloWorld!');
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
