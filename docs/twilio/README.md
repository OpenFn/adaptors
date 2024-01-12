# Language twilio

Language Pack for building expressions and operations to interact with the
twilio API.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/twilio-configuration-schema/)
definition.

### sendSMS

#### sample expression, sending an sms

```js
sendSMS({
  body: dataValue('text'),
  from: '+15005550006',
  to: dataValue('recipient'),
});
```

## local usage

```sh
~/devtools/core/bin/core execute \
  -l ~/devtools/adaptors/language-twilio \
  -s ./tmp/state.json \
  -o ./tmp/output.json \
  -e ./tmp/expression.js
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
