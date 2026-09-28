# language-openspp <img src='assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the
[OpenSPP2](https://github.com/OpenSPP/OpenSPP2) REST API v2.

Version 4 and later target OpenSPP2 (Odoo 19) through its REST API v2
(`/api/v2/spp`). For OpenSPP v1 servers (JSON-RPC), use version 3.x.

OpenSPP2 REST API v2 reference:

- [`spp_api_v2` module](https://github.com/OpenSPP/OpenSPP2/tree/19.0/spp_api_v2)
- Interactive API docs on your server at `{baseUrl}/api/v2/spp/docs`

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
need (see below). The adaptor gets an OAuth token with the client credentials
once per run.

### OpenSPP2 modules and scopes

Individuals and groups are served by the `spp_api_v2` module. The other
functions need an extra OpenSPP2 module; without it they return 404.

| Function | Scopes | Module |
|---|---|---|
| `getIndividual`, `searchIndividual` | `individual:read` | `spp_api_v2` |
| `createIndividual` | `individual:create` | `spp_api_v2` |
| `updateIndividual` | `individual:update` | `spp_api_v2` |
| `getGroup`, `searchGroup` | `group:read` | `spp_api_v2` |
| `createGroup` | `group:create` | `spp_api_v2` |
| `updateGroup`, `addToGroup`, `removeFromGroup` | `group:update` | `spp_api_v2` |
| `getGroupMembers` | `individual:read` and `group:read` | `spp_api_v2` |
| `getProgram`, `getPrograms` | `program:read` | `spp_api_v2_programs` |
| `getEnrolledPrograms` | `program_membership:read` | `spp_api_v2_programs` |
| `enroll` | `program_membership:read`, `program_membership:create` and `program_membership:update` | `spp_api_v2_programs` |
| `unenroll` | `program_membership:read` and `program_membership:update` | `spp_api_v2_programs` |
| `getServicePoint`, `searchServicePoint` | `service_point:read` | `spp_api_v2_service_points` |

`enroll` needs `program_membership:update` only to re-enroll an existing
membership (eg an exited one). Other endpoints used through `request` have
their own modules, eg `spp_api_v2_vocabulary` for `/Vocabulary` and
`spp_api_v2_gis` for `/gis/…`.

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

#### Paging and options

- `searchIndividual`, `searchGroup`, `getGroupMembers` and
  `searchServicePoint` page with `count` (1-100, default 20) and `offset`.
- `getPrograms` pages with a cursor: `count` and `lastId`.
- `sort` works for individuals only (`searchIndividual`, `getGroupMembers`),
  on `name`, `birthDate` or `lastUpdated`. Prefix with `-` for descending, eg
  `{ sort: '-birthDate' }`. OpenSPP sorts by `name` for any other value.
- `elements` and `extensions` work for individuals and groups.
- Options OpenSPP would silently ignore throw instead: `limit` and `order`
  (v3 names) everywhere, `sort` and `lastId` on `searchGroup`, `lastId` on
  `searchIndividual` and `getGroupMembers`, and `offset` on `getPrograms`.

#### Reading every page

Follow the `_offset` in `state.response.page.next` rather than adding `count`
to the offset yourself: with consent filtering, OpenSPP may skip records
between pages.

```js
fn(async state => {
  const all = [];
  let offset = 0;
  while (offset !== null) {
    state = await searchIndividual(
      { name: 'Santos' },
      { count: 100, offset }
    )(state);
    all.push(...state.data);
    const next = state.response.page.next?.match(/[?&]_offset=(\d+)/);
    offset = next ? Number(next[1]) : null;
  }
  return { ...state, data: all };
});
```

Don't use this loop with `searchGroup` on OpenSPP2 releases up to 2026.09:
they ignore `offset` for groups, so every page is the first page and the loop
never ends (see Known OpenSPP2 limitations). For `getPrograms`, follow
`_lastId` in the same way and pass it as `lastId`.

### Errors

Operations throw when OpenSPP returns an error, so a failed step fails the
job. The error message includes the status, method, path and OpenSPP's
`detail`, and the error has `statusCode`, `body` and `headers`:

```js
getIndividual('urn:openspp:vocab:id-type#national_id|PH-123').catch(
  (error, state) => {
    if (error.statusCode === 404) {
      return { ...state, data: null };
    }
    throw error;
  }
);
```

- 403 can mean the record doesn't exist, has no consent, or the API client
  lacks a scope. The message says so.
- 429 means OpenSPP is rate limiting. The message includes the `Retry-After`
  delay. The token endpoint allows 5 requests per minute per IP, which is why
  the adaptor gets one token per run.
- 409 on `createIndividual` or `createGroup` means another record already
  has the identifier. On an update with `ifMatch`, it means the record changed
  since you read it.

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
- On OpenSPP2 releases up to 2026.09, `offset` is ignored by `searchGroup`:
  every page returns the first page again. OpenSPP2 #555 fixes this.
- The `type` filter of `searchGroup` is passed on but not yet applied by
  OpenSPP2 (#565).

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
