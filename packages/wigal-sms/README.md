# language-wigal-sms <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the Wigal SMS
API.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/wigal-sms-docs)
for full technical documentation. Bulk SMS APIs are documented
[here](https://frogdocs.wigal.com.gh/introduction).

### Example

```js
sendSMS({
  senderid: 'Stevkky',
  destinations: [
    {
      destination: '0552825710',
    },
  ],
  message: 'This is a sample message for SMS sending via Wigal FROG API.',
  smstype: 'text',
});
```

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/wigal-sms-configuration-schema/)
for required and optional `configuration` properties.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.

```

```
