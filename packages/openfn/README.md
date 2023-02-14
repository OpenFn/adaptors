# Language OpenFn

Adaptor for building expressions and operations to interact with the OpenFn v1
API.

## Documentation

## request

```js
request({
  method: 'get',
  path: 'jobs',
  params: {
    project_id: 490,
  },
});
request(
  {
    method: 'post',
    path: 'jobs',
    data: {
      trigger_id: 1,
      expression: 'steps()',
    },
  },
  state => {
    console.log('cool callback!');
    return state;
  }
);
```

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/openfn-configuration-schema/)
definition.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
