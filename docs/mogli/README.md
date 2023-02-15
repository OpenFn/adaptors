# Language Mogli

Language Pack for building expressions and operations to interact with Mogli
SMS.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/mogli-configuration-schema/)
definition.

### Create inbound SMS

```js
createSMS(
  fields(
    field('sender', dataValue('from_number')),
    field('receivedAt', dataValue('timestamp')),
    field('message', dataValue('message'))
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

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
