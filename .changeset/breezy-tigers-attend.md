---
'@openfn/language-dhis2': major
---

Migrates the adaptor to the new Tracker API (v36+) for `trackedEntities`,
`enrollments`, `events` and `relationships`.

This release is designed for compatibility with DHIS2 v42, which drops support
for a number of endpoints.

The `create`, `update`, `upsert` and `destroy` functions will automatically map
affected resources to the new tracker API endpoint.

Workflows using these functions should be able to migrate to this new adaptor
version, but note that the payloads and parameters on the new tracker endpoints
may change. See the
[DHIS2 Tracker Migration Guide](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker-deprecated.html#webapi_tracker_migration)
for details.

The HTTP APIs `get()` and `patch()`, are _not_ affected by these changes: there
is no automatic mapping in `get('trackedEntityInstances')` to
`get('tracker/trackedEntities')`. Workflows which use the DHIS2 REST interface
will need to be migrated.
