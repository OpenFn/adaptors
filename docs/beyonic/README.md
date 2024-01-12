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
    field('phonenumber', '+256773712831'),
    field('first_name', 'Gideon'),
    field('last_name', 'Zelalem'),
    field('amount', 100.2),
    field('currency', 'USD'),
    field('account', 1),
    field('description', 'Long-term contract for Arseal'),
    field('payment_type', 'money'),
    field('callback_url', 'https://my.website/payments/callback')
  )
);
```

## Collection Requests API

#### `createCollectionRequest(...)`

```js
createCollectionRequest(
  fields(
    field('instructions', 'Send me some money, please!'),
    field('phonenumber', '+256773712831'),
    field('amount', 5.0),
    field('currency', 'USD')
  )
);
```

## Contacts API

#### `createContact(...)`

```js
createContact(
  fields(
    field('first_name', 'Granit'),
    field('last_name', 'Xhaka'),
    field('phone_number', '+256773712831'),
    field('email', 'granit@arsenal.com')
  )
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
