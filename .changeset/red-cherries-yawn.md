---
'@openfn/language-http': major
---

**Rewrite of HTTP Adaptor**

**Overview:**

This release marks a major milestone in the development of the HTTP Adaptor. The
codebase has undergone a comprehensive rewrite, resulting in significant
improvements. This changelog highlights the major changes and new features
introduced in this version.

**Major Changes:**

1. **Codebase Rewrite:**

   The HTTP Adaptor has been rewritten to use the new helper functions from
   `common`. The code is now more modular, efficient, and maintainable.

**New Features and Improvements:**

1. **Error Map Support:**

   We have added support for `errors` option param. You can pass an error map
   which will allow custom messaging to be added to errors. Eg:
   `{errors: {404: "You don't have access"}}`

2. **TLS Support:**

   We have added support for `tls` option param. The `tls` option params is a
   replacement of `agentOptions` param. This option is used for client
   certificate authentication. Eg: `{tls: {ca: state.configuration.cert}}`

3. **Parse-As Support:**

   We have added support for `parseAs` option param. This option is used for
   overriding the default response type. Eg: `{parseAs: "json"}`

4. **Set timeout Option:**

   We have added support for the `timeout` option param. This option is used for
   setting the timeout after which a request will time out, in milliseconds. Eg:
   `{timeout: 300e3}`

5. **HTTP Logging:**

   Improve logging with better insights about the HTTP request

6. **Form Data Handling:**

   We have improved the API for `form` option param.

**Deprecations and Removals:**

1. **Obsolete APIs:**

   Several outdated and redundant Options and features have been removed to
   streamline the codebase and improve maintainability.

   - Removed `axios` export and `axios` APIs
   - Removed `form-data` dependency
   - Removed `tough-cookie` dependency and `handleCookies` function
   - Removed `request` dependency
   - Removed `fast-safe-stringify` dependency and `assembleError` function
   - Removed support for `gzip`,`qs`, `formData`, `successCodes` and
     `keepCookie` option params

2. **Legacy Option Params:**

   Legacy options have been deprecated, and users are encouraged to update their
   jobs to the new format.

   - Deprecated `json` and `agentOptions` option params

**Upgrade Considerations:**

- Users of the previous version will need to update their jobs to align with the
  new `options` parameters.
- Ensure that your job does not use or depend on any of the removed `options`
  params
