# language-openspp <img src='assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the
[OpenSPP2](https://github.com/OpenSPP/OpenSPP2) REST API v2.

Version 4 and later target OpenSPP2 (Odoo 19) through its REST API v2
(`/api/v2/spp`). For OpenSPP v1 servers (JSON-RPC), use version 3.x.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/openspp-docs)
for full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/openspp-configuration-schema/)
for required and optional `configuration` properties.

```json
{
  "baseUrl": "https://openspp.example.org",
  "clientId": "client_AbC123dEf456",
  "clientSecret": "..."
}
```

Create an API client in OpenSPP (API clients menu) with the scopes your jobs
need, for example `individual:read`, `group:search` or
`program_membership:create`. The adaptor gets an OAuth token with the client
credentials once per run.

### Identifiers

OpenSPP2 never exposes database ids. Records are identified by an external
identifier written as `system|value`:

```js
getIndividual('urn:openspp:vocab:id-type#national_id|PH-123456789');
getProgram('urn:openspp:program|universal-child-grant');
```

Program membership functions take a typed reference to say whether the
beneficiary is an individual or a group:

```js
enroll(
  'Group/urn:openspp:vocab:id-type#household_id|HH-1',
  'urn:openspp:program|cash-transfer-program'
);
```

### Searching

Search functions take OpenSPP's search parameters and paging options, and
write the list of records to `state.data`:

```js
searchIndividual({ name: 'Santos', birthdate: 'ge2010-01-01' }, { count: 50 });
fn(state => {
  console.log(state.response.page.next); // null on the last page
  return state;
});
```

OpenSPP leaves out records the API client may not see (for example without
consent). When that happens `state.response.page.total` is only the page size,
so check `state.response.page.next` to see whether there are more pages.

### Any other endpoint

Use `request` for endpoints without a dedicated function:

```js
request('GET', '/Vocabulary', null, { query: { _count: 10 } });
```

### Known OpenSPP2 limitations

- `enroll` and `unenroll` refuse to change an existing membership when the
  beneficiary is in more than one program, because OpenSPP2 can't yet address a
  membership per program through the API. Creating new memberships is not
  affected.
- After `removeFromGroup`, OpenSPP2 may report the membership as `active` until
  its scheduled membership repair runs.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
