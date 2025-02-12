# language-cht <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the cht API.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/cht-docs)
for full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/cht-configuration-schema/)
for required and optional `configuration` properties.

### A example expression using the `post` function

```js
post("/api/v1/people", {  
  "name": "Hannah",
  "phone": "+254712345678",
  "type": "contact",
  "contact_type": "patient", });
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
