# language-progres

An OpenFn **_adaptor_** for building integration jobs for use with the UNHCR
ProGres v4 API.

## Design notes

- Integration must run through UNHCR's DTP, a middleware layer that provides a
  public API for UNHCR internal software.
- An API token _and_ a self-signed certificate must be provided for
  communication with UNHCR's DTP.
- Two-way sync must be possible between Primero and ProGres
- Teams still in discussion about whether the most common use-case will be a
  timed sync or real-time/event-based sync.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/progres-docs) for
full technical documentation.

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/progres-configuration-schema/)
definition.

### Posting data to an endpoint with SSL cert authentication

```js
postData({
  url: urlDTP,
  body: { a: 1 },
  headers: {
    'Subscription-Key': configuration['token'],
  },
  agentOptions: {
    key,
    cert,
  },
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
