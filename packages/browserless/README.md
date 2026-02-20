# @openfn/language-browserless <img src='./assets/square.png' width="30" height="30"/>

An OpenFn adaptor for interacting with the Browserless API (PDF generation and related endpoints).

Documentation: [https://docs.openfn.org/adaptors/packages/browserless-docs](https://docs.openfn.org/adaptors/packages/browserless-docs)

---

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/cht-docs)
for full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/cht-configuration-schema/)
for required and optional `configuration` properties.


## Exports

- `createPDF(input, options)` — Operation that calls the `/pdf` endpoint and returns a state with `data: { pdf: '<base64>' }` for binary responses.
- `request(method, path, options)` — Generic Browserless-authenticated HTTP operation.

## browserless Configuration

- `state.configuration.baseUrl` (optional) — Base URL for Browserless (default: `https://production-sfo.browserless.io`).
- `state.configuration.token` (required) — Browserless API token for authentication.

---

## Examples

### Create a PDF from HTML

```javascript
import { createPDF } from '@openfn/language-browserless';

const state = {
  configuration: {
    baseUrl: 'https://production-sfo.browserless.io',
    token: process.env.BROWSERLESS_TOKEN
  }
};

```
## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
