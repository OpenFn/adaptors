---
'@openfn/language-openspp': major
---

Rebuild the adaptor on the OpenSPP2 REST API v2 (`/api/v2/spp`) with OAuth2
client credentials. Odoo JSON-RPC and the `odoo-await` dependency are removed.

### Migration Guide

Version 4 only works with OpenSPP2 (Odoo 19). Keep using `3.x` for OpenSPP v1
servers.

**Configuration**: replace `username`, `password` and `database` with
`clientId` and `clientSecret` from an OpenSPP API client. `baseUrl` is
unchanged (the server root, without `/api/v2/spp`).

**Identifiers**: v1 `spp_id` values (`IND_…`, `GRP_…`) and program ids
(`PROG_…`) no longer exist. Use external identifiers as `system|value`, eg
`urn:openspp:vocab:id-type#national_id|PH-123`. Program membership functions
take a typed beneficiary, eg `Group/urn:…|HH-1`.

**Errors**: operations now throw when OpenSPP returns an error or a record
isn't found. In v3 errors were logged and the job carried on.

**Callbacks**: operations no longer take a callback. Use `.then()` or `fn()`.

| v3 | v4 |
|---|---|
| `getIndividual(spp_id, cb)` | `getIndividual(id, options)` |
| `searchIndividual(domain, options, cb)` | `searchIndividual(query, options)`: OpenSPP search parameters instead of Odoo domains |
| `createIndividual(data, cb)` | `createIndividual(data)`: OpenSPP Individual resource, `identifier` required; returns the created record |
| `updateIndividual(spp_id, data)` | `updateIndividual(id, data, options)`: partial update |
| `getGroup`, `searchGroup`, `createGroup`, `updateGroup` | same changes as the individual functions |
| `getGroupMembers(spp_id, options, cb)` | `getGroupMembers(groupId, options)`: returns Individual records; `options.role` filters by role |
| `addToGroup(group_id, individual_id, role)` | same arguments; `role` is a code such as `head`. Existing roles are no longer cleared, and unknown roles are no longer created |
| `removeFromGroup(group_id, individual_id)` | `removeFromGroup(groupId, individualId, options)`: `reason`, `endedDate` |
| `getProgram(program_id, cb)` | `getProgram(id)` |
| `getPrograms(options, cb)` | `getPrograms(query, options)` |
| `getEnrolledPrograms(spp_id, cb)` | `getEnrolledPrograms(beneficiary)`: enrolled memberships only |
| `enroll(spp_id, program_id)` | `enroll(beneficiary, programId, options)` |
| `unenroll(spp_id, program_id)` | `unenroll(beneficiary, programId, options)`: sets `exited` (was `not_eligible`) |
| `getServicePoint(spp_id, cb)` | `getServicePoint(name)`: returns an object (was an array) |
| `searchServicePoint(domain, options, cb)` | `searchServicePoint(query, options)` |
| `getArea`, `searchArea` | removed: OpenSPP2 has no Area resource. Use `request('GET', '/gis/ogc/collections/…')` with the GIS module |
| (new) | `request(method, path, body, options)` for any REST API v2 endpoint |
