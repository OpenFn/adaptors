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

#### sample configuration

```json
{
  "host": "https://www.openfn.org",
  "username": "someone@ngo.org",
  "password": "supersecret",
  "projectId": "ID"
}
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
