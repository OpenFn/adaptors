# language-ghana-nia <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the ghana-nia API.

There is no public documentation for the Ghana NIA system, but the the NIA itself can be reached at https://nia.gov.gh/

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/ghana-nia-docs)
for full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/ghana-nia-configuration-schema/)
for required and optional `configuration` properties.

### A example expression using the `create` function

```js
post('patient', { name: 'Bukayo' });
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
