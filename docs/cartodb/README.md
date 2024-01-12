# Language cartodb

Language Pack for sending messages using the
[cartodb API](http://docs.cartodb.com/cartodb-platform/sql-api/).

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/cartodb-configuration-schema/)
definition.

## Examples

```js
addRow(
  'your_table',
  fields(
    field('name', 'taylor'),
    field('lat', dataValue('lat')),
    field('long', dataValue('long')),
    field('mookie', dataValue('form.blaylock')),
    field('description', dataValue('type_description')),
    field('date', dataValue('SubmissionDate'))
  )
);
```

```js
sql(function (state) {
  return (
    `INSERT INTO untitled_table (name, the_geom) VALUES ('` +
    dataValue('form.first_name')(state) +
    `', ST_SetSRID(ST_Point(` +
    dataValue('lat')(state) +
    `, ` +
    dataValue('long')(state) +
    `),4326))`
  );
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
