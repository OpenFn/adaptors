# Language KhanAcademy

Language Pack for building expressions and operations to make HTTP calls.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/khanacademy-configuration-schema/)
definition.

## fetch

#### sample usage

```js
fetch({
  getEndpoint: 'user',
  queryParams: {
    email: 'thisoneuser@something.org',
  },
  postUrl: 'https://www.openfn.org/inbox/your-uuid',
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
