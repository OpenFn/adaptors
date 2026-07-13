# language-fayda <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the
fayda API.

## Documentation

View the
[docs site](https://docs.openfn.org/adaptors/packages/fayda-docs) for
full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/fayda-configuration-schema/)
for required and optional `configuration` properties.

The configuration schema uses
[JSON Schema draft-07](https://json-schema.org/draft-07/json-schema-release-notes).
Run `pnpm validate:schemas` from the adaptors repo root after editing it.

Authentication is OAuth 2.0 / OIDC via eSignet, using a JWK-signed
client assertion (`private_key_jwt`) rather than a client secret.
`configuration.privateKey` is the base64-encoded JWK private key
issued alongside your `clientId` when you register with eSignet.

### Example: the authorize -> token -> userinfo sequence

```js
// Step 1: build the authorization URL and redirect the user to it.
// Consent happens outside of OpenFn. `getAuthorizationUrl` also returns
// a PKCE `codeVerifier` on state.data — capture it for step 2.
getAuthorizationUrl();

// Step 2: exchange the `code` returned to your redirectUri for tokens,
// passing back the PKCE verifier from step 1. This also saves
// access_token to state.configuration for the next step.
getToken(state => state.data.code, {
  codeVerifier: state => state.data.codeVerifier,
});

// Step 3: fetch and decode the user's verified identity claims.
getUserInfo();
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
