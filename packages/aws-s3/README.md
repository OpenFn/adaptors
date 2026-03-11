# language-aws-s3 <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the
aws-s3 API.

## Documentation

View the
[docs site](https://docs.openfn.org/adaptors/packages/aws-s3-docs) for
full technical documentation.

# aws-s3 — Minimal API

This document describes the minimal public API for the `@openfn/language-aws-s3` adaptor.
It focuses only on three simple, commonly-used operations: `put`, `get`, and `list`.

Usage principles
- Keep jobs small and explicit. Use the camelCase public API (`bucket`, `key`, `body`, `contentType`).
- The adaptor uses the AWS SDK v3 `S3Client` under the hood and the default credential provider chain unless credentials are provided in `state.configuration`.

Operations

- `put(params)` — Put an object into a bucket.
  - Params: `{ bucket, key, body, contentType?, acl?, serverSideEncryption? }`
  - Writes the given `body` to S3.
  - Returns an operation that merges metadata (bucket, key, etag) into the job `state`.

- `get(params)` — Retrieve an object from a bucket.
  - Params: `{ bucket, key }`
  - If the object is JSON (Content-Type `application/json`) the adaptor attempts to parse it and sets `state.data` to the parsed value.
  - Otherwise the binary body is returned as base64 at `state.data.base64`, with `state.data.contentType` and `state.data.contentLength` set when available.

- `list(params)` — List objects in a bucket.
  - Params: `{ bucket, prefix?, maxKeys?, continuationToken? }`
  - Returns an array of S3 `Contents` in `state.data` (each item contains at least `Key` and other S3 metadata).

Examples

```javascript
put({ bucket: 'openfn-test', key: 'patients/1.json', body: JSON.stringify({ id: 1, name: 'A' }), contentType: 'application/json' })
get({ bucket: 'openfn-test', key: 'patients/1.json' })
list({ bucket: 'openfn-test', prefix: 'patients/' })
```

Notes
- Do not commit real AWS credentials into source control. Use environment variables, CI secrets, or the default provider chain.
- The adaptor reads objects into memory for parsing/base64 conversion; avoid very large objects or implement streaming outside this adaptor.
- Unit tests use `aws-sdk-client-mock` so they run without network access.


-- OpenFn


## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
