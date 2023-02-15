# Language HTTP

Language Pack for building expressions and operations to make HTTP calls.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/http-configuration-schema/)
definition.

### Get data

This helper function allows the use of a get method to fetch data. You can
specify a query string for filter.

```js
get(
  '/myendpoint',
  {
    query: { foo: 'bar', a: 1 },
    headers: { 'content-type': 'application/json' },
    authentication: { username: 'taylor', password: 'somethingsecret' },
  },
  state => {
    return state;
  }
);
```

### Post existing data

Send some data to an existing endpoint.

```js
post('/endpoint', {
  body: state => {
    return {
      field_1: 'some_data',
      field_2: 'some_more_data',
      field_id: dataValue('Some.Json.Object.Id')(state),
    };
  },
  headers: {
    Authorization: 'AUTH_KEY',
    'Content-Type': 'application/json',
  },
});
```

### Update existing data with PUT or PATCH

```js
put(
  '/myendpoint',
  {
    body: { firstname: 'taylor', lastname: 'downs' },
    headers: { 'content-type': 'application/json' },
    authentication: { username: 'user', password: 'pass' },
  },
  state => {
    return state;
  }
);
```

```js
patch(
  '/myendpoint',
  {
    body: { firstname: 'taylor', lastname: 'downs' },
    headers: { 'content-type': 'application/json' },
    authentication: { username: 'user', password: 'pass' },
  },
  state => {
    return state;
  }
);
```

### Delete data

```js
del(
  '/myendpoint',
  {
    query: { id: 'someId' },
    headers: { 'content-type': 'application/json' },
    authentication: { username: 'user', password: 'pass' },
  },
  state => {
    return state;
  }
);
```

### Parse XML

This function allows you to parse some xml data. A callback function can be use
to store in a table.

```js
parseXML(body, function ($) {
  return $('table[class=your_table]').parsetable(true, true, true);
});
```

### Parse CSV

```js
parseCSV('someData.csv', {
  quoteChar: '"',
  header: false,
});
```

### Sample parse local CSV file

```js
parseCSV('PatientsJan2009.csv', {
  quoteChar: '"',
  header: false,
  columns: true,
  skip_empty_lines: true,
  trim: true,
  bom: true,
});
```

## Development

Clone the repo, run `pnpm install`.

Run tests using `pnpm run test` or `pnpm run test:watch`.

To build the docs for this repo, run `pnpm build:docs`.
