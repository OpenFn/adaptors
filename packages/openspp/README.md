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
once per workflow step (the OpenFn runtime removes `configuration`, and so the
token, after each step).

### OpenSPP2 modules and scopes

Individuals and groups are served by the `spp_api_v2` module. The other
functions need an extra OpenSPP2 module; without it they return 404. These
modules are set to install automatically with `spp_api_v2` and the matching
OpenSPP module (eg `spp_api_v2_programs` with `spp_programs`), but check they
are installed: some setups need them installed by hand.

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
`spp_api_v2_gis` for `/gis/…`. `spp_api_v2_gis` does not install
automatically.

### Identifiers

OpenSPP2 identifies records by external identifiers, not database ids (the
one exception is the `_lastId` cursor used to page programs). Identifiers are
written as `system|value`; service points are identified by their name instead:

```js
getIndividual('urn:openspp:vocab:id-type#national_id|PH-123456789');
getProgram('urn:openspp:program|universal-child-grant');
```

The `system` of an individual or group identifier is an ID type from
OpenSPP's `urn:openspp:vocab:id-type` vocabulary. OpenSPP2's default ID types
are `national_id`, `passport`, `tax_id` and `birth_certificate`; others, like
the `household_id` used in these examples, must be configured on the server.

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
  console.log(state.response.page.next); // the next page's URL, or null (see below)
  return state;
});
```

OpenSPP leaves out records the API client may not see (for example without
consent). When that happens `state.response.page.total` is only the number
of records on the page (with open PR OpenSPP2 #555, on every page for API
clients whose legal basis requires consent), so check
`state.response.page.next` to see whether there are more pages. A full last
page can still have a `next` link, and the page after it is then empty
(`searchServicePoint`'s `next` is always null on the last page).

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

  Other options are not checked: `searchIndividual`, `searchGroup`,
  `getGroupMembers` and `searchServicePoint` drop options they don't know, and
  `getPrograms` sends them to OpenSPP as filters, which OpenSPP ignores if it
  doesn't know them (eg `sort`).

#### Reading every page

Step `offset` by `count` until `state.response.page.next` is null, and drop
records you have already seen:

```js
fn(async state => {
  const count = 50;
  const byId = new Map();
  let offset = 0;
  do {
    state = await searchIndividual({ name: 'Santos' }, { count, offset })(state);
    for (const record of state.data) {
      const [id] = record.identifier ?? [];
      if (id) {
        byId.set(`${id.system}|${id.value}`, record);
      }
    }
    offset += count;
  } while (state.response.page.next);
  return { ...state, data: [...byId.values()] };
});
```

Stepping by `count` never skips a record on any OpenSPP2 version, but
OpenSPP2 up to 2026.09 has the caveats below. On OpenSPP2 up to 2026.09, don't
jump to the `_offset` in the `next` link instead: when consent filtering
hides records, that offset can pass records the client may see, which are
then never returned. Stepping by `count` can return a record twice instead,
which the `Map` removes.

On OpenSPP2 up to 2026.09, a page can also come back short, with no `next`,
before the end of the results. OpenSPP reads at most 100 records per query:
with a `count` of 50 or less it reads up to 3 × `count` records for a page,
and the page ends early when more than two thirds of them are hidden. With a
larger `count` it reads only 100, so at `count: 100` a single hidden record
ends the paging. Use `count: 50` when consent filtering applies.

Open PR OpenSPP2 #555 fixes both: `next` no longer passes records, and a
short (or empty) page keeps its `next` link while records remain. With it,
following `next` until it is null is also safe.

Don't use this loop with `searchGroup` on OpenSPP2 releases up to 2026.09:
they ignore `offset` for groups, so every page is the first page, and when that
page has a `next` link the loop never ends (see Known OpenSPP2
limitations). `getPrograms` pages with a cursor instead: pass the `_lastId`
value from `state.response.page.next` as `lastId`.

### Errors

Operations throw when OpenSPP returns an error, so a failed step fails the
job. The error message includes the status, method, path and OpenSPP's
`detail`, and the error has `statusCode`, `body` and `headers`:

```js
getIndividual('urn:openspp:vocab:id-type#national_id|PH-123').catch(
  (error, state) => {
    const notAvailable =
      error.statusCode === 404 ||
      (error.statusCode === 403 && error.body?.detail === 'Access denied');
    if (notAvailable) {
      return { ...state, data: null };
    }
    throw error;
  }
);
```

For API clients that require consent, a 403 `Access denied` can also mean the
record exists without consent, so don't create a record just because this
returns `null`.

- 403 with `Missing required scope '…'` (for service points, `Client does not
  have permission to …`) means the API client lacks a scope.
- For individuals and groups, API clients that require consent (the default)
  get 403 `Access denied` both when the record doesn't exist and when it has
  no consent, so records can't be enumerated. API clients that don't require
  consent get 404 for a missing record. Programs, program memberships and
  service points return 404 when not found; `enroll` with an unknown program
  or beneficiary fails with 422.
- 429 means OpenSPP is rate limiting, and the message includes the
  `Retry-After` delay. On OpenSPP2 up to 2026.09 only the token endpoint is
  limited: 5 requests per minute and 50 per day per IP, counted in memory by
  each OpenSPP (Odoo) worker process. The adaptor gets one
  token per workflow step, so more than 5 steps starting within a minute, or
  more than 50 within 24 hours, from the same IP reach the limit.
- 409 from `updateIndividual` or `updateGroup` with `ifMatch` means the record
  changed since you read it.
- `enroll` fails when OpenSPP has a membership the API client can't see (eg
  the beneficiary has no consent): 422 on OpenSPP2 up to 2026.09, 409
  "Beneficiary is already a member of this program" with open PR OpenSPP2
  #555.
- `addToGroup` fails with 422 when the group already has a `head` (on OpenSPP2
  up to 2026.09 the message is only "Failed to add member").
- OpenSPP2 up to 2026.09 doesn't check identifiers on create: `createIndividual`
  or `createGroup` with an identifier another record already has creates a
  duplicate, and later lookups by that identifier can pick either record. Open
  PR OpenSPP2 #555 refuses the create with 409 (two creates at the same moment
  can still both succeed), and makes a read or update by a shared identifier
  return 409 (or 403 `Access denied` to clients that may not read every
  match). Where a shared identifier is a search filter (`searchGroup`'s
  `member`, or the beneficiary in `getEnrolledPrograms`, `enroll` and
  `unenroll`), those clients get no records instead of 403. A search by
  `identifier` still returns every record that has it. Search by `identifier`
  first if you need to avoid duplicates, but API clients that require consent
  can't see records without consent, so the search can miss an existing
  record.

### Any other endpoint

Use `request` for endpoints without a dedicated function:

```js
request('GET', '/Vocabulary', null, { query: { _count: 10 } });
```

### Known OpenSPP2 limitations

- `enroll` and `unenroll` refuse to change an existing membership when the
  beneficiary is in more than one program, because OpenSPP2 can't yet address a
  membership per program through the API. Creating new memberships is not
  affected. Open PR OpenSPP2 #555 adds a way to address one membership per
  program; the adaptor doesn't use it yet, so this refusal remains.
- After `removeFromGroup`, OpenSPP2 may report the membership as `active` until
  its scheduled membership repair runs. Open PR OpenSPP2 #555 fixes this.
- On OpenSPP2 releases up to 2026.09, `offset` is ignored by `searchGroup`:
  every page returns the first page again. Open PR OpenSPP2 #555 fixes this.
- The `type` filter of `searchGroup` is passed on but not yet applied by
  OpenSPP2 (#565).
- On OpenSPP2 up to 2026.09, `searchIndividual`'s `group` filter (and so
  `getGroupMembers`) matches any of the individual's memberships, so results
  can include former members who are still active in another group. Open PR
  OpenSPP2 #555 fixes this.
- On OpenSPP2 up to 2026.09, `membership-role` (and `getGroupMembers`'
  `role`) is matched separately from `group`, so it can match a role the
  individual holds in a different group, or in a group they have left. Open PR
  OpenSPP2 #555 fixes this: the role must be on the membership of that group.
- On OpenSPP2 up to 2026.09, `searchGroup`'s `member` also matches groups the
  individual has left. Open PR OpenSPP2 #555 fixes this.
- OpenSPP2 up to 2026.09 ignores filters it can't resolve and returns every
  record matching the rest of the query: an unknown `membership-role` or
  `role` code, a `searchGroup` `member` that isn't `Individual/system|value` or
  doesn't exist, a malformed or unknown `gender`, or a malformed date. Open PR
  OpenSPP2 #555 makes unknown values match nothing and malformed ones return
  400.
- On OpenSPP2 up to 2026.09, `addToGroup` ignores a role code OpenSPP doesn't
  know: a new member is added without a role, and an existing member keeps
  their current roles. Open PR OpenSPP2 #555 rejects it with 422 instead.
- On OpenSPP2 up to 2026.09, `updateIndividual` can't change `gender`: OpenSPP
  returns 422 "Failed to patch individual". Open PR OpenSPP2 #555 fixes this,
  and rejects gender codes outside ISO 5218 (`urn:iso:std:iso:5218`) with 422
  on create and update.
- On OpenSPP2 up to 2026.09, `getPrograms` returns 500 instead of 403 when
  the API client lacks the program scope. Open PR OpenSPP2 #555 fixes this.
- A member removed with `removeFromGroup` can't be added back with
  `addToGroup` (OpenSPP2 #570). With open PR OpenSPP2 #555 this fails with 422
  "Duplication of Member is not allowed". On OpenSPP2 up to 2026.09 it doesn't
  fail: `addToGroup` returns the removed membership, with its `endedDate`, and
  the individual isn't added back.
- On OpenSPP2 up to 2026.09, references in `addToGroup` and `removeFromGroup`
  results, and in `getIndividual`'s `groupMembership[].group.reference`, can't
  be used to read the group or individual (as with `getGroup`'s members). Open
  PR OpenSPP2 #555 fixes this.
- On OpenSPP2 up to 2026.09, the `identifier` search filter can match a
  registrant whose ID type comes from one of their IDs and whose value comes
  from another, and `getIndividual` with a group's identifier returns the
  group. Open PR OpenSPP2 #555 fixes both.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
