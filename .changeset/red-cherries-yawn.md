---
'@openfn/language-http': major
---

The axios library has been removed and the operation API simplified.

### New features

- Error mapping. Provide custom errors to response status codes, eg, Eg:
  `{errors: {404: "You don't have access"}}`
- parseAs option. Overrides the default response type. Eg: `{parseAs: "json"}`
- Request logging. All requests are now logged to stdout.
- tls options. Pass SSL certificates using the `tls` option on any request.

### Breaking changes

- Removed `axios` export
- Axios options on `get`, `post`, `put`, `patch`, and `del` are no longer
  supported (unless otherwise stated). This includes `gzip`,`qs`, `formData`,
  `successCodes` and `keepCookie`
- Option params `json` and `agentOptions` have been deprecated. They still work,
  but you should use `body` and `tls` instead (the behaviour should be the same)
