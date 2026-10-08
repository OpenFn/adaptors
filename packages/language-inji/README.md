# language-inji <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **adaptor** for [Inji Verify](https://docs.mosip.io/inji/inji-verify/overview):
server-side verification of Verifiable Credentials (JSON-LD, SD-JWT, CWT).

Use it as **step 3** of a typical verification workflow:

1. Receive an issued credential over HTTP (another step / adaptor).
2. Validate the request body in job code.
3. Call Inji Verify with `verifyCredential` (this adaptor).
4. Process the result (e.g. log `allChecksSuccessful`).

## Documentation

View the
[docs site](https://docs.openfn.org/adaptors/packages/language-inji-docs) for
full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/language-inji-configuration-schema/)
for required and optional `configuration` properties.

`baseUrl` must include the Inji Verify context path, for example:

```json
{
  "baseUrl": "https://verify.example.org/v1/verify"
}
```

The configuration schema uses
[JSON Schema draft-07](https://json-schema.org/draft-07/json-schema-release-notes).
Run `pnpm validate:schemas` from the adaptors repo root after editing it.

### Example job

```javascript
// Steps 1–2: credential already received and validated into state.data
verifyCredential($.data, {
  skipStatusChecks: false,
  statusCheckFilters: ['revocation'],
  includeClaims: false,
});

// Step 4: process / log the verification result
fn(state => {
  console.log(state.data.allChecksSuccessful);
  return state;
});
```

`verifyCredential` posts to `{baseUrl}/v2/vc-verification` and writes the
detailed V2 result to `state.data` (`allChecksSuccessful`,
`schemaAndSignatureCheck`, `expiryCheck`, `statusCheck`, `claims`).

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

```bash
cd packages/language-inji
pnpm install
pnpm test
pnpm build
```

To build _only_ the docs run `pnpm build docs`.
