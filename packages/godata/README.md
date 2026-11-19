# language-godata <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the WHO
Go.Data API.

[Go.Data](https://www.who.int/godata) is an outbreak investigation tool for
field data collection during public health emergencies. The tool includes
functionality for case investigation, contact follow-up, visualization of chains
of transmission including secure data exchange and is designed for flexibility
in the field, to adapt to the wide range of outbreak scenarios.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/godata-docs) for
full technical documentation.

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/godata-configuration-schema/)
definition.

## Helper Functions

Full function docs live on the
[docs site](https://docs.openfn.org/adaptors/packages/godata-docs). Every
operation writes the response body to `state.data` and the rest of the
response (status code, headers, url) to `state.response`. A failed request
fails the run.

### Outbreaks, cases, contacts, locations and reference data

```js
listOutbreaks();
getCase('343d-dc3e', { where: { visualId: 'CA00000001' } });
upsertContact('343d-dc3e', 'visualId', {
  visualId: 'CON-0001',
  firstName: 'Luca',
});
```

The `upsert*` functions look for an existing record whose match field (e.g.
`visualId`) equals the value in the payload. They create the record if none
match, update it if one matches, and throw if more than one matches. On update,
send only the fields you want to change.

### Any other GoData endpoint

Use `get`, `post`, `put`, `patch`, `del` or `request` with a path
relative to `apiUrl`. A `filter` object in the query is JSON-encoded for you.

```js
get('/outbreaks/343d-dc3e/follow-ups', {
  filter: { where: { date: { gt: '2026-01-01' } }, limit: 100 },
});
post('/teams', { name: 'Team A', userIds: [] });
```

### Access

The GoData user in the credential must have access to every outbreak the job
reads or writes. Operations always name the outbreak explicitly and do not rely
on the user's active outbreak.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
