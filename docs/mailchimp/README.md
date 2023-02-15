# Language Mailchimp

An OpenFn **_adaptor_** for building integration jobs for use with the Mailchimp
marketing API.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/mailchimp-configuration-schema/)
definition.

#### sample expression with multiple operations

```js
upsertMembers({
  listId: 'someId',
  users: state =>
    state.response.body.rows.map(u => ({
      email: u.email,
      status: u.allow_other_emails ? 'subscribed' : 'unsubscribed',
      mergeFields: { FNAME: u.first_name, LNAME: u.last_name },
    })),
  options: {},
});

tagMembers({
  listId: 'someId', // All Subscribers
  tagId: 'someTag', // User
  members: state => state.response.body.rows.map(u => u.email),
});

tagMembers({
  listId: 'someId', // All Subscribers
  tagId: 'someTag', // Other Emails Allowed
  members: state =>
    state.response.body.rows
      .filter(u => u.allow_other_emails)
      .map(u => u.email),
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
