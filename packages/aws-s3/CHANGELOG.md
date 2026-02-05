# @openfn/language-aws-s3

### 1.0.1 (unreleased)

- Simplify public API to a minimal surface: `put`, `get`, and `list`.
	- `put`: upload an object using camelCase params (`bucket`, `key`, `body`, `contentType`).
	- `get`: retrieve an object; attempts to parse JSON into `state.data`, otherwise returns base64 in `state.data.base64`.
	- `list`: list objects under a bucket/prefix and return S3 `Contents` in `state.data`.
- Update unit tests and QA job to use the minimal API (no live network calls; mocking via `aws-sdk-client-mock`).
- Update `README.md` and added `README_MINIMAL.md` to document the reduced API and usage examples.

## 1.0.0

Initial release.