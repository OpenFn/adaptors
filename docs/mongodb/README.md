# Language MongoDB

Language Pack for building expressions and operations for use with MongoDB.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/mongodb-configuration-schema/)
definition.

### insertDocuments

```js
insertDocuments({
  database: 'yourDb',
  collection: 'yourCollection',
  documents: state => {
    return state.data.map(item => {
      return { name: item.name, age: item.age };
    });
  },
  // callback: (state) => state, // optional
});
```

### findDocuments

```js
findDocuments({
  database: 'yourDb',
  collection: 'yourCollection',
  query: state => {
    return { name: 'stu' };
  },
  // callback: (state) => state, // optional
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
