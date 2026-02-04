# @openfn/language-aws-s3

### 1.0.1 (unreleased)

- Add S3 client helpers and operations: `upload`, `download`, `list`, `remove`.
- Add `get` and `search` operations: `get` returns parsed JSON when available, `search` lists objects and optionally fetches/parses each object.
- Add unit tests that mock `@aws-sdk/client-s3` using `aws-sdk-client-mock` (no network calls required).
- Normalize downloaded object bodies to base64 in `download`, and attempt to parse JSON bodies automatically in `get`/`download` when possible.
- Add `tmp/qa-aws-s3.js` QA job demonstrating upload → get → delete against LocalStack/MinIO.
- Update `README.md` with credentials, LocalStack/MinIO quickstarts, example job snippets, and resource links.

## 1.0.0

Initial release.