# Language MSSQL

Language Pack for connecting to Azure SQL Server via OpenFn.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/mssql-configuration-schema/)
definition.

### Sample expression

## sql query

```js
sql({
  query: `
    SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_TYPE = 'BASE TABLE'
    AND TABLE_CATALOG='my-demo'
  `,
});

sql({
  query: `SELECT * FROM Household`,
  options: {
    writeSql: true, // Keep to true to log query (otherwise make it false).
    execute: true, // keep to false to not alter DB
  },
});
```

## Find a single value for a table

This helper function allows to build a specific query where `sql` would not be
best suited. It returns a single value and not a promise. An example of usage
would be in building a mapping object with a value from a lookup table.

```js
fn(async state => {
  const user = {
    id: 1,
    name: 'Mamadou',
    user_id: await findValue({
      uuid: 'id',
      relation: 'users',
      where: { first_name: 'Mama%' },
      operator: { first_name: 'like' }, // operator is optional. "=" is used by default.
    })(state),
  };

  return upsert(...)(state);
});
```

## Insert one single record

```js
insert(
  'SomeDB.dbo.SupplierTest',
  {
    SupplierNumber: 1,
    Name: dataValue('name'),
    Address: 'Nunya Bihz-Nash',
  },
  {
    // The optional `options` argument allows for global string replacement with
    // NULL. This is useful if you want to map an undefined value (e.g., x.name)
    // to NULL. It can be a single string or an array of strings.
    // It DEFAULTS to "'undefined'", and can be turned off w/ `false`.
    setNull: "'undefined'",
    logValues: true,
  }
);
```

## Insert or Update using a unique column as a key

This function insert or update depending on the existence of a record in the
database.

```js
upsert(
  'SomeDB.dbo.Supplier',
  'SupplierNumber',
  {
    SupplierNumber: 1,
    Name: dataValue('name'),
    Address: 'Now I can tell!',
  },
  // Do NOT replace any instances of 'undefined' in the final SQL statement.
  { setNull: false, logValues: true }
);
```

## Insert or Update if a value exist in the record

This function will upsert a record only if the logical given is true. In this
case we check if `dataValue('name')` exists.

```js
upsertIf(
  dataValue('name'),
  'users',
  'user_id',
  {
    name: 'Elodie',
    id: 7,
  },
  // Replace any occurence of '' and 'undefined' to NULL
  {
    setNull: ["''", "'undefined'"],
    writeSql: true,
    execute: false,
    logValues: true,
  }
);
```

## Insert Many records

This function allows the insert of a set of records inside a table all at once.
Pass `logQuery` option to `true` to display the query.

```js
// Note that insertMany takes a function which returns an array—this helps
// enforce that each item in the array has the same keys.
insertMany(
  'SomeDB.dbo.Supplier',
  state =>
    state.data.supplierArray.map(s => {
      return {
        SupplierNumber: s.id,
        Name: s.name,
        Address: s.address,
      };
    }),
  { writeSql: true, logValues: true }
);
```

## Insert or Update Many records

This function inserts or updates many records all at once depending on their
existence in the database.

```js
// Note that insertMany takes a function which returns an array—this helps
// enforce that each item in the array has the same keys.
upsertMany(
  'SomeDB.dbo.Supplier',
  'SupplierNumber',
  state =>
    state.data.supplierArray.map(s => {
      return {
        SupplierNumber: s.id,
        Name: s.name,
        Address: s.address,
      };
    }),
  { writeSql: true, execute: false, logValues: true }
);
```

In case we need to check on multiple columns before upserting, we can have an
array of `uuids`.

```js
upsertMany(
  'SomeDB.dbo.Supplier',
  ['SupplierNumber', 'SupplierCode'],
  state =>
    state.data.supplierArray.map(s => {
      return {
        SupplierNumber: s.id,
        Name: s.name,
        Address: s.address,
        SupplierCode: s.code,
      };
    }),
  { writeSql: true, execute: false, logValues: true }
);
```

## Describe a table from mssql

This function is used to fetch the list of columns of a given table in the
database.

```js
describeTable('users', { writeSql: false, execute: true });
```

## Create a table in the database

This function allows to create a table in a database from a given array of
columns. The key `identity` can be use for a column to auto-generate a value.

```js
insertTable('users', state =>
  state.data.map(column => ({
    name: column.name,
    type: column.type,
    required: true, // optional
    unique: false, // optional - set to true for unique constraint
  }))
);
```

## Alter a table in the database

This function allows to add new columns to a table. Beware of the fact that you
cannot add new columns with names that already exist in the table.

```js
modifyTable(
  'users',
  state =>
    state.data.map(newColumn => ({
      name: newColumn.name,
      type: newColumn.type,
      required: true, // optional
      unique: false, // optional - set to true for unique constraint
    })),
  { writeSql: false, execute: true }
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
