# Language Dynamics

Language Pack for building expressions and operations to make calls to the
Microsoft Dynamics API.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/dynamics-configuration-schema/)
definition.

- _Dynamics uses oauth2. The language-package will expect to be given a valid
  oauth token. If a valid token is not provided, it will fail. On OpenFn.org,
  the `CredentialService` is responsible for making sure the the oauth token is
  valid each time it assembles state to hand to `execute`._

#### sample createEntity expression

```js
createEntity({
  entityName: 'accounts',
  body: {
    name: 'Open Function',
    creditonhold: false,
    address1_latitude: 47.639583,
    description: 'This is the description of the sample account',
    revenue: 5000000,
    accountcategorycode: 1,
  },
});
```

#### sample query expression

_Can be used to retrieve or query a specific Entity if an entityId is declared
in the expression. Otherwise it will perform a query on all data with the
defined Entity Name_

```js
query({
  entityName: 'contacts',
  entityId: '51a0e5b9-88df-e311-b8e5-6c3be5a8b200',
  query: {
    fields: ['fullname', 'birthdate'],
    limit: 10,
    orderBy: {
      field: 'lastname',
      direction: 'asc',
    },
    filter: "firstname eq 'Cat'",
  },
});
```

#### sample update expression

```js
updateEntity({
  entityName: 'accounts',
  entityId: 'f4301865-c64a-e711-80f3-e0071b6fd061',
  body: {
    name: 'wilder 2',
    creditonhold: true,
    address1_latitude: 47.639583,
    description: 'This is the description of the sample account',
    revenue: 5000000,
    accountcategorycode: 1,
  },
});
```

#### sample delete expression

```js
deleteEntity({
  entityName: 'accounts',
  entityId: 'aeef941b-254a-e711-80f1-e0071b685921',
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
