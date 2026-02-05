# language-browserless <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the
browserless API.

## Documentation

View the
[docs site](https://docs.openfn.org/adaptors/packages/browserless-docs) for
full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/browserless-configuration-schema/)
for required and optional `configuration` properties.

### Usage

This adaptor exposes two public features:

- `http.request(method, path, options)` — a generic Browserless-authenticated HTTP request operation. Use this for arbitrary Browserless endpoints (for example `/convert`).
- `createPDF(input, options)` — PDF generation helper. `input` may be an HTML string or an object `{ html }` / `{ url }`. This calls the `/pdf` endpoint and normalizes PDF responses to `{ pdf: '<base64>' }` by default.

Example job using `http.request`:

```javascript
import { http } from '@openfn/language-browserless';

export default http.request('POST', 'convert', { html: '<p>Hello</p>' });
```

Example job using `createPDF`:

```javascript
import { createPDF } from '@openfn/language-browserless';

export default createPDF('<p>Hello PDF</p>');
```

Configuration example (token-based `/pdf`):

```javascript
const state = {
	configuration: {
		baseUrl: 'https://production-sfo.browserless.io',
		token: process.env.BROWSERLESS_TOKEN,
	},
};

const result = await createPDF('<p>Hello</p>')(state);
```

Normalization note:

- When using the `/pdf` endpoint, this adaptor normalizes binary PDF responses to a base64 string and returns `{ pdf: '<base64>' }` by default. If you prefer raw bytes or the original response, call the lower-level `http.request()` with `forcePdfBase64: false`.

Example: using `http.request` and controlling `forcePdfBase64`:

```javascript
import { http } from '@openfn/language-browserless';

// request raw bytes from /pdf (do not coerce to base64 wrapper)
export default http.request('POST', 'pdf', { html: '<p>Raw</p>', forcePdfBase64: false });
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
