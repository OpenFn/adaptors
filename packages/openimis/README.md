# language-template

An OpenFn **_adaptor_** for building integration jobs for use with the \_\_\_\_
API.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/template-docs)
for full technical documentation.

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/template-configuration-schema/)
definition.

#### sample expression using operation

```js
post({
  "url": "api/v1/forms/data/wide/json/formId",
  "body": {"a":1}
  "headers": {}
})
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
