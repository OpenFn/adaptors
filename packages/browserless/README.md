# language-browserless <img src='./assets/square.png' width="30" height="30"/>

An OpenFn adaptor for interacting with the Browserless API (PDF generation and related endpoints).
Documentation: https://docs.openfn.org/adaptors/packages/browserless-docs
Exports
- `createPDF(input, options)` — Operation that calls the `/pdf` endpoint and returns a state with `data: { pdf: '<base64>' }` for binary responses.
- `request(method, path, options)` — Generic Browserless-authenticated HTTP operation.
Both functions return an OpenFn operation: a function that accepts `state` and returns a new state (or a Promise resolving to it).
Configuration
- `state.configuration.baseUrl` (optional) — Base URL for Browserless (default: `https://production-sfo.browserless.io`).
- `state.configuration.token` (required) — Browserless API token for authentication.

const result = await createPDF('https://example.com')(state);

console.log(result.data.pdf); 
```
Call an arbitrary Browserless endpoint
```javascript
import { request } from '@openfn/language-browserless';

const state = {
  configuration: { 
    baseUrl: 'https://production-sfo.browserless.io', 
    token: process.env.BROWSERLESS_TOKEN 
  }
};


pnpm --filter @openfn/language-browserless test

cd packages/browserless
pnpm test
```
Mocking in Tests
- Tests use the mock client helper from `@openfn/language-common/util` (`enableMockClient`) to intercept requests for the configured `baseUrl`.

