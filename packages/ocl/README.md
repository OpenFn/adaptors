# Language OCL

Language Pack for building expressions and operations for working with the
[OCL API](http://ocl.github.io/ocl-docs/master/en/developer/html/ocl_developer_manual.html).

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/ocl-configuration-schema/)
definition.

## Mapping source concepts to destination API

#### Recieve form data from source application and convert data element keys to destination application.

```js
map(  "data": {
    "a": 1,
    "b": 2},
  {users:"haftamuk", sources: "eCHIS-CODES", concepts: "fp_new_at_10_to_14" }
  );
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
