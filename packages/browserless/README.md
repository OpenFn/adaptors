# language-browserless <img src='./assets/square.png' width="30" height="30"/>

An OpenFn adaptor for interacting with the Browserless API (PDF generation and related endpoints).

Documentation: https://docs.openfn.org/adaptors/packages/browserless-docs

**Exports**
- `createPDF(input, options)` — Operation that calls the `/pdf` endpoint and returns a state with `data: { pdf: '<base64>' }` for binary responses.
- `request(method, path, options)` — Generic Browserless-authenticated HTTP operation.

Both functions return an OpenFn operation: a function that accepts `state` and returns a new state (or a Promise resolving to it).

Configuration
- `state.configuration.baseUrl` (optional) — base URL for Browserless (default: `https://production-sfo.browserless.io`).
- `state.configuration.token` (optional) — Browserless API token; when present it is appended as a `token` query parameter.

Examples

- create a PDF from HTML:

```javascript
import { createPDF } from '@openfn/language-browserless';

const op = createPDF('<p>Hello PDF</p>');

const state = { configuration: { baseUrl: 'https://production-sfo.browserless.io', token: process.env.BROWSERLESS_TOKEN } };
const result = await op(state);

```

- call an arbitrary Browserless endpoint:

```javascript
import { request } from '@openfn/language-browserless';

const op = request('POST', 'convert', { body: { html: '<p>Hi</p>' } });
const result = await op({ configuration: { baseUrl: 'https://production-sfo.browserless.io' } });

```

PDF normalization details
- `createPDF` requests `/pdf` with `parseAs: 'base64'` (so binary responses are returned safely) and the adaptor normalizes PDF responses into `{ pdf: '<base64>' }`.
- If you need the raw response or different parsing, call `request()` and pass options such as `parseAs: 'buffer'` or `forcePdfBase64: false` depending on what you need.

Testing & development
- Run this package tests from repository root:

```bash
pnpm --filter @openfn/language-browserless test
```

- Or from the package folder:

```bash
cd packages/browserless
pnpm test
```

Mocking in tests
- Tests use the mock client helper from `@openfn/language-common/util` (`enableMockClient`) to intercept requests for the configured `baseUrl`.



