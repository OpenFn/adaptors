# Language Beyonic

Language Pack for building expressions and operations for working with the
[beyonic API](http://apidocs.beyonic.com/).

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/beyonic-configuration-schema/)
definition.

## Payments API

#### `createPayment(...)`

```js
createPayment(
  fields(
    util.field('phonenumber', '+256773712831'),
    util.field('first_name', 'Gideon'),
    util.field('last_name', 'Zelalem'),
    util.field('amount', 100.2),
    util.field('currency', 'USD'),
    util.field('account', 1),
    util.field('description', 'Long-term contract for Arseal'),
    util.field('payment_type', 'money'),
    util.field('callback_url', 'https://my.website/payments/callback')
  )
);
```

## Collection Requests API

#### `createCollectionRequest(...)`

```js
createCollectionRequest(
  fields(
    util.field('instructions', 'Send me some money, please!'),
    util.field('phonenumber', '+256773712831'),
    util.field('amount', 5.0),
    util.field('currency', 'USD')
  )
);
```

## Contacts API

#### `createContact(...)`

```js
createContact(
  fields(
    util.field('first_name', 'Granit'),
    util.field('last_name', 'Xhaka'),
    util.field('phone_number', '+256773712831'),
    util.field('email', 'granit@arsenal.com')
  )
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
