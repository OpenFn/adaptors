# Language Telerivet

Language Pack for sending messages using the
[telerivet API](https://telerivet.com/api/rest/curl).

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/telerivet-configuration-schema/)
definition.

## Send message

#### Current `send` expression:

```js
send(
  fields(
    field('to_number', dataValue('recipient_number')),
    field('content', dataValue('recipient_text')),
    // Lots of optional parameters...
    field('message_type', 'sms'),
    field('route_id', dataValue('some_route'))
  )
);
```

## sendBulk messages - WIP

#### Current `sendBulk` expression:

```js
send(fields(
  field("content", dataValue("recipient_text")),
  field("to_numbers", [
        "+14155550123",
        "+14255550234",
        "+16505550345"
    ]
  // Lots of optional parameters...
  field("message_type", "sms"),
  field("route_id", dataValue("some_route"))
))
```

Note that "recipient_text" may be a concatenation like this:

```js
field('content', function (state) {
  return dataValue('salutation')(state).concat(
    '. ',
    dataValue('last_name')(state),
    ', )'
  );
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
