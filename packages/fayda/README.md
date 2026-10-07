# language-fayda <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the fayda
API.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/fayda-docs) for
full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/fayda-configuration-schema/)
for required and optional `configuration` properties.

The configuration schema uses
[JSON Schema draft-07](https://json-schema.org/draft-07/json-schema-release-notes).
Run `pnpm validate:schemas` from the adaptors repo root after editing it.

Authentication is OAuth 2.0 / OIDC via eSignet, using a JWK-signed client
assertion (`private_key_jwt`) rather than a client secret.
`configuration.privateKey` is the base64-encoded JWK private key issued
alongside your `clientId` when you register with eSignet.

`configuration.tokenExpirationTime` (optional, default `5m`) controls how long
the signed client assertion is valid for. It should be left short, as the
assertion is single-use.

### The flow

This adaptor exposes a single operation, `getUserInfo`. The relying-party app
builds the eSignet authorization URL, generates the PKCE `codeVerifier`, drives
user consent, and handles the redirect/callback. It then delivers the resulting
authorization `code` (and `codeVerifier`) to OpenFn, typically via a webhook.

Inside the workflow, `getUserInfo` exchanges that code for an access token using
the signed client assertion, calls the userinfo endpoint, and writes the decoded
identity claims to `state.data`. The access token is used only for the exchange.

### Example: verify a user from a webhook payload

```js
// `code` and `codeVerifier` arrive on state from the webhook that the
// relying-party app called after the user consented.
getUserInfo($.code, { codeVerifier: $.codeVerifier });
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
