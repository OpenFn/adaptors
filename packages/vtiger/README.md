# Language Vtiger

Language Pack for building expressions and operations to make calls to the
Vtiger API.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/vtiger-configuration-schema/)
definition.

#### sample listTypes expression

```js
listTypes();
```

#### sample postElement expression

```js
postElement({
  operation: "create"
  elementType: "leads",
  element: {
    "name": dataValue("name")(state),
    "surname": dataValue("surname")(state),
    "email": dataValue("email")(state)
  }
});


```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
