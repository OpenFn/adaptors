# Language Medic Mobile

Language Pack for building expressions and operations to make calls to the Medic
Mobile API.  
**For an overview of Medic's database, check out
[Medic's DB Schema v2](https://github.com/medic/medic-docs/blob/master/development/db-schema.md)**  
The exported functions in this language package can be executed by
[OpenFn/core](https://github.com/OpenFn/core):

```sh
../core/lib/cli.js execute -l ./lib/Adaptor -s ./tmp/state.json -e ./tmp/expression.js
```

For quick-start help, clone
[OpenFn/openfn-devtools](https://github.com/OpenFn/openfn-devtools) and follow
the README.md

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/medicmobile-configuration-schema/)
definition.

#### sample fetchSubmissions expression

```js
fetchSubmissions(
  'pregnancy', // formId
  { 'last-event-id': 334 }, // params, last-event-id will be replaced by cursor
  'http://localhost:4000/inbox/abc-123-xyz' // postUrl
);
```

#### sample changesApi and pickFormData usage

```js
// get all the changes...
changesApi({
  include_docs: true,
  // This only gets used the first time the job is run.
  // Subsequent runs take the lastSeq value as their cursor.
  // "last-event-id": 789,
});

// Picks out the field data for a given formId.
pickFormData('pregnancy');
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
