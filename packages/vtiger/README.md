# Language Vtiger

Language Pack for building expressions and operations to make calls to the
Vtiger API.

## Documentation

#### sample configuration

```json
{
  "hostUrl": "https://openfunction.od2.vtiger.com",
  "username": "taylor@openfn.org",
  "accessToken": "blahBlahBlah"
}
```

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
