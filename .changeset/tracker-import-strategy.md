---
'@openfn/language-dhis2': patch
---

Fix `tracker.import()` not sending its `strategy` argument. The resolved value
was passed to `prefixVersionToPath`, which ignores it, so the import ran with
the DHIS2 default instead of the requested strategy. It is now sent as the
`importStrategy` query parameter. An explicit `options.importStrategy` still
takes precedence, so existing workarounds are unaffected.
