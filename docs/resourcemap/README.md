# Language ResourceMap

Language Pack for building expressions and operations for working with the
[resourcemap API](https://github.com/instedd/resourcemap/wiki/REST_API).

## Documentation

We are working towards this to start:
https://github.com/instedd/resourcemap/wiki/REST_API#create-site

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/resourcemap-configuration-schema/)
definition.

## Expressions

## `submitSite(collectionId, fields)`

```js
submitSite(
  303,
  fields(
    field('name', dataValue('sampleText')),
    field('lat', 48.86),
    field('lon', 2.35),
    field('properties', function (state) {
      return {
        Comment: state.data.sampleText,
        phone: '85512345678',
      };
    })
  )
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
