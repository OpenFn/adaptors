# Language MySQL

Language Pack for building expressions and operations to run MySQL queries.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/mysql-docs) for
full technical documentation.

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/mysql-configuration-schema/)
definition.

## Execute a query

Execute an sql query with the node mysql package.

```js
query({
  sql: state => {
    return `select * from ${state.data.table} where id = ?;`;
  },
  timeout: 4000,
  values: ['007'],
});
```

## Execute a sql query

This function takes either a `string` or a `function` that takes states and
returns a string.

```js
sqlString(state => {
  return (
    `INSERT INTO untitled_table (name, the_geom) VALUES ('` +
    state.data.version +
    `', ` +
    dataValue('form.Choix_tache')(state) +
    `)`
  );
});
```

## Insert a single record

This function is used to insert a single record in a MySQL database.

```js
insert(
  'some_table',
  fields(
    field('firstname', dataValue('form.patient_firstname')),
    field('lastname', dataValue('form.patient_lastname'))
  )
);
```

## Insert or update a single record

This function is used to insert a single record in a MySQL database or update it
if there is a match.

```js
upsert(
  'some_table',
  fields(
    field('firstname', dataValue('form.patient_firstname')),
    field('lastname', dataValue('form.patient_lastname'))
  )
);
```

## Upsert many records

This function allows the upsert of a set of records inside a table all at once.

```js
upsertMany(
  'users', // the DB table
  [
    { name: 'one', email: 'one@openfn.org' },
    { name: 'two', email: 'two@openfn.org' },
  ]
);
```

or

```js
upsertMany('users', state =>
  state.data.users.map(user => {
    name: user['name'],
    email: user['email']
  })
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
