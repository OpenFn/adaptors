---
'@openfn/language-dhis2': major
---

Migrates the adaptor to the new Tracker API (v36+) for `trackedEntities`,
`enrollments`, `events` and `relationships`. Note that `trackedEntities` is no
longer used.

This release is designed for compatibility with DHIS2 v42, which drops support
for a number of endpoints.

The `create`, `update`, `upsert` and `destroy` functions will automatically map
affected resources to the new tracker API endpoint.

If you have an existing workflow which uses these functions with
`trackedEntities`, `enrollments`, `events` or `relationships`, the data and
options you pass may be incompatible with the new tracker API. You should review
your code carefully against the
[DHIS2 Tracker Migration Guide](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker-deprecated.html#webapi_tracker_migration)
to see what's changed.

For example, if you used to do:

```js
create('trackedEntityInstances', {
  /*...*/
});
```

You should now do:

```js
create('trackedEntities', {
  /*...*/
});
```

The payloads have also changed shape, so for example if you used to:

```js
create('events', {
  trackedEntityInstance: 'eBAyeGv0exc',
  eventDate: '2024-01-01',
  /* ... */
});
```

You should now do:

```js
create('events', {
  trackedEntity: 'eBAyeGv0exc',
  occurredAt: '2024-01-01',
  /* ... */
});
```

The HTTP APIs `get()`, `patch()`, and `post()` do not automatically map to the
new tracker: they continue to call the URL you provide with the data you send.
You can use this to continue to call the old tracker API directly.
