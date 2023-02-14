# Language Facebook

Language Pack for building expressions and operations to interact with the
Facebook Messenger API.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/facebook-configuration-schema/)
definition.

### postMessage

#### sample expression using operation

```js
postMessage({
  recipient: {
    id: '<PSID>',
  },
  message: {
    text: '<YOUR MESSAGE GOES HERE>',
  },
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
