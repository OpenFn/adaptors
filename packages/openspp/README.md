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
| `getIndividual` | `individual:read` | `spp_api_v2` |
| `searchIndividual` | `individual:read`, plus `group:read` when filtering by `group` | `spp_api_v2` |
| `createIndividual` | `individual:create` | `spp_api_v2` |
| `updateIndividual` | `individual:update` | `spp_api_v2` |
| `getGroup`, `searchGroup` | `group:read` | `spp_api_v2` |
| `createGroup` | `group:create` | `spp_api_v2` |
| `updateGroup`, `addToGroup`, `removeFromGroup` | `group:update` | `spp_api_v2` |
| `getGroupMembers` | `individual:read` and `group:read` | `spp_api_v2` |
| `getProgram` | `program:read` | `spp_api_v2_programs` |
| `getPrograms` | `program:read` or `program:search` | `spp_api_v2_programs` |
| `getEnrolledPrograms` | `program_membership:read` or `program_membership:search` | `spp_api_v2_programs` |
| `enroll` | `program_membership:read` (or `:search`), `program_membership:create` and `program_membership:update` | `spp_api_v2_programs` |
| `unenroll` | `program_membership:read` (or `:search`) and `program_membership:update` | `spp_api_v2_programs` |
| `getServicePoint`, `searchServicePoint` | `service_point:read` | `spp_api_v2_service_points` |

An `…:all` scope, eg `group:all`, covers every action on that resource.
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
  console.log(state.response.page.next); // null when there are no more pages
  return state;
});
```

OpenSPP leaves out records the API client may not see (for example without
consent). When that happens `state.response.page.total` is only the page size,
so check `state.response.page.next` to see whether there are more pages. A
full last page still has a `next` link; the page after it is empty.

#### Paging and options

- `searchIndividual`, `searchGroup`, `getGroupMembers` and
  `searchServicePoint` page with `count` (1-100, default 20) and `offset`.
- `getPrograms` pages with a cursor: `count` and `lastId`.
- `sort` works for individuals only (`searchIndividual`, `getGroupMembers`),
  on `name`, `birthDate` or `lastUpdated`. Prefix with `-` for descending, eg
  `{ sort: '-birthDate' }`. Any other value throws, since OpenSPP would sort
  by `name` instead.
- `elements` and `extensions` work for individuals and groups.
- Options OpenSPP would silently ignore throw instead:
  - `limit` and `order` (v3 names) on every search
  - `sort` and `lastId` on `searchGroup`
  - `lastId` on `searchIndividual` and `getGroupMembers`
  - `sort`, `lastId`, `elements` and `extensions` on `searchServicePoint`
  - `offset` on `getPrograms`

  Other options are passed on unchecked. For example, `getPrograms` sends
  unknown options as filters, and OpenSPP ignores ones it doesn't know, eg
  `sort`.

#### Reading every page

Step `offset` by `count` until `state.response.page.next` is null, and drop
records you have already seen:

```js
fn(async state => {
  const count = 100;
  const byId = new Map();
  let offset = 0;
  do {
    state = await searchIndividual({ name: 'Santos' }, { count, offset })(state);
    for (const record of state.data) {
      const [id] = record.identifier;
      byId.set(`${id.system}|${id.value}`, record);
    }
    offset += count;
  } while (state.response.page.next);
  return { ...state, data: [...byId.values()] };
});
```

Don't jump to the `_offset` in the `next` link instead. On OpenSPP2 up to
2026.09, when consent filtering hides records, that offset can pass records
the client may see, which are then never returned. Stepping by `count` can
return a record twice instead, which the `Map` removes. Either way, when
about half or more of the matching records are hidden, OpenSPP can return a
short page with no `next` before the end of the results. Use the largest
`count` (100) to make this less likely.

Don't use this loop with `searchGroup` on OpenSPP2 releases up to 2026.09:
they ignore `offset` for groups, so every page is the first page, and when at
least `count` groups match the loop never ends (see Known OpenSPP2
limitations). `getPrograms` pages with a cursor instead: pass the `_lastId`
value from `state.response.page.next` as `lastId`.

### Errors

Operations throw when OpenSPP returns an error, so a failed step fails the
job. The error message includes the status, method, path and OpenSPP's
`detail`, and the error has `statusCode`, `body` and `headers`:

```js
getIndividual('urn:openspp:vocab:id-type#national_id|PH-123').catch(
  (error, state) => {
    const notFound =
      error.statusCode === 404 ||
      (error.statusCode === 403 && error.body?.detail === 'Access denied');
    if (notFound) {
      return { ...state, data: null };
    }
    throw error;
  }
);
```

- 403 with `Missing required scope '…'` (for service points, `Client does not
  have permission to …`) means the API client lacks a scope.
- For individuals and groups, API clients that require consent (the default)
  get 403 `Access denied` both when the record doesn't exist and when it has
  no consent, so records can't be enumerated. API clients that don't require
  consent get 404 for a missing record. Programs, program memberships and
  service points always return 404 when not found.
- 429 means OpenSPP is rate limiting, and the message includes the
  `Retry-After` delay. On OpenSPP2 up to 2026.09 only the token endpoint is
  limited: 5 requests per minute and 50 per day per IP. The adaptor gets one
  token per run, but many runs a day from the same IP can still reach the
  daily limit.
- 409 on an update with `ifMatch` means the record changed since you read it.
- OpenSPP2 up to 2026.09 doesn't check identifiers on create: `createIndividual`
  or `createGroup` with an identifier another record already has creates a
  duplicate (open PR OpenSPP2 #555 makes this a 409). Search by `identifier`
  first if you need to avoid duplicates.

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
  every page returns the first page again. Open PR OpenSPP2 #555 fixes this.
- The `type` filter of `searchGroup` is passed on but not yet applied by
  OpenSPP2 (#565).

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
