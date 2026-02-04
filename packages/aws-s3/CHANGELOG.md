# @openfn/language-aws-s3

## 1.0.0

Initial release.

### 1.0.1 (unreleased)

- Add S3 client helpers and operations: `upload`, `download`, `list`, `remove`.
- Add unit tests that mock `@aws-sdk/client-s3` using `aws-sdk-client-mock`.
- Normalize downloaded object bodies to base64 in `download`.
