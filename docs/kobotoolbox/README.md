# Language KoboToolbox

Language Pack for building expressions and operations to interact with the
[TEMPLATE] API.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/kobotoolbox-configuration-schema/)
definition.

#### Get the list of forms

```js
getForms({}, state => {
  console.log(state.data);
  return state;
});
```

### Get submissions for a specific form

A query can be used to filter results.

```js
getSubmissions(
  { formId: 'aXecHjmbATuF6iGFmvBLBX', query: { end: { $gte: '2020-11-20' } } },
  state => {
    console.log(state.data);
    return state;
  }
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
