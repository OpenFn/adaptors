# Language Nexmo

Language Pack for building expressions and operations to interact with the Nexmo
API.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/nexmo-configuration-schema/)
definition.

### sendSMS

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
