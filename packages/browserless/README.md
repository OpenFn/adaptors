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

Examples below show the small set of helpers provided by this adaptor:

- `convertHtmlToPdf(html)` — converts an HTML string and returns the service response.
- `convertUrlToPdf(url)` — converts a publicly-accessible URL to PDF.
- `generatePdfFromHtml(html)` — uses Browserless `/pdf` endpoint and supports passing a `token` in configuration.
- `generatePdfFromUrl(url)` — same as above but accepts a URL.

Example job snippet:

```javascript
import { generatePdfFromHtml } from '@openfn/language-browserless';

export default generatePdfFromHtml('<p>Hello PDF</p>');
```

Example with configuration (token-based `/pdf`):

```javascript
const state = {
	configuration: {
		baseUrl: 'https://production-sfo.browserless.io',
		token: process.env.BROWSERLESS_TOKEN,
	},
};

const result = await generatePdfFromHtml('<p>Hello</p>')(state);

Normalization note:

- When using the `/pdf` endpoint, this adaptor normalizes binary PDF responses to a base64 string and returns `{ pdf: '<base64>' }` by default. This ensures a consistent return shape across Browserless REST `/pdf`, BrowserQL, and Function APIs. If you prefer raw bytes or the original response, call the lower-level `request()` helper with `forcePdfBase64: false`.

```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
