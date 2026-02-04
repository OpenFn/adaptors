# @openfn/language-browserless

## 1.0.1 - 2026-02-04

### Patch Changes

- Initial release: add `convertHtmlToPdf`, `convertUrlToPdf`,
  `generatePdfFromHtml`, and `generatePdfFromUrl` operations. (2026-02-04)

## 1.0.2 - 2026-02-04

### Patch Changes

- Normalize `/pdf` responses to base64 by default (`generatePdfFromHtml` and `generatePdfFromUrl` now return `{ pdf: '<base64>' }` when applicable).


## 1.0.0

Scaffolded package.
