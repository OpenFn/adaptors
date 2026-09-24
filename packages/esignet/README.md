# language-esignet <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with
[eSignet](https://docs.esignet.io/) — MOSIP's identity verification and
consent-based data sharing gateway.

## Overview

eSignet provides an OpenID Connect (OIDC) interface for external relying parties
to access citizen identity data from MOSIP, after the citizen has approved access
via eSignet's consent flow.

This adaptor is designed for backend workflows that run **after** the citizen has
approved data sharing. Lightning handles the OAuth2 token exchange, and the
adaptor uses the resulting access token to fetch citizen data from the UserInfo
endpoint.

### Typical job code

```js
getUserInfo();
```

This returns citizen claims (name, gender, birthdate, email, phone, etc.) in
`state.data`.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/esignet-docs) for
full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/esignet-configuration-schema/)
for required and optional `configuration` properties.

| Property       | Required | Description                |
| -------------- | -------- | -------------------------- |
| `baseUrl`      | Yes      | eSignet server URL         |
| `access_token` | Yes      | OAuth2 access token        |

### Testing endpoints

- **Mock ID:** `https://esignet-mock.collab.mosip.net`
- **MOSIP ID:** `https://esignet-mosipid.collab.mosip.net`

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
