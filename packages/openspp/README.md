# language-openspp <img src='assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the
[OpenSPP2](https://github.com/OpenSPP/OpenSPP2) REST API v2.

Version 4 and later target OpenSPP2 (Odoo 19) through its REST API v2
(`/api/v2/spp`). For OpenSPP v1 servers (JSON-RPC), use version 3.x.

OpenSPP2 REST API v2 reference:

- [OpenSPP API V2 developer guide](https://docs.openspp.org/developer_guide/api_v2/overview)
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
```

`state.response.page.next` is set when OpenSPP reports another page. OpenSPP
leaves out records the API client may not see (for example without consent).

`searchIndividual`, `searchGroup`, `getGroupMembers` and `searchServicePoint`
page with `count` (1-100) and `offset`; `getPrograms` pages with `count` and
`lastId`. The adaptor logs a warning for options OpenSPP ignores, such as
`sort` on groups. See the
[OpenSPP search docs](https://docs.openspp.org/developer_guide/api_v2/search)
for search parameters.

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

For API clients that require consent (the default), OpenSPP returns 403
`Access denied` both when an individual or group doesn't exist and when it has
no consent, so don't create a record just because this example returns
`null`. A 403 with `Missing required scope` means the API client lacks a
scope. See the
[OpenSPP error docs](https://docs.openspp.org/developer_guide/api_v2/errors)
and [consent docs](https://docs.openspp.org/developer_guide/api_v2/consent).

`enroll` and `unenroll` throw rather than change an existing membership when
the beneficiary is also in other programs, because the adaptor can't be sure
OpenSPP would update the membership for that program. Change those memberships
in OpenSPP instead.

### Any other endpoint

Use `request` for endpoints without a dedicated function:

```js
request('GET', '/Vocabulary', null, { query: { _count: 10 } });
```

For known server issues, see the
[OpenSPP2 issue tracker](https://github.com/OpenSPP/OpenSPP2/issues).

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
