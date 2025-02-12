# language-mojatax <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the mojatax
API.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/mojatax-docs) for
full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/mojatax-configuration-schema/)
for required and optional `configuration` properties.

### A example expression using the `post` function

```js
post('CreateInvoice', {
  customerId: '102',
  invoice_id: 'PID092',
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
