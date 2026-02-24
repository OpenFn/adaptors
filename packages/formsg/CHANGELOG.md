# @openfn/language-formsg

## 1.0.6 - 24 February 2026

### Patch Changes

- Updated dependencies \[856f85c]
  - @openfn/language-common@3.2.3

## 1.0.5 - 09 February 2026

### Patch Changes

- Updated dependencies \[8ad6b98]
- Updated dependencies \[8ad6b98]
  - @openfn/language-common@3.2.2

## 1.0.4 - 28 November 2025

### Patch Changes

- Updated dependencies \[cfc66df]
  - @openfn/language-common@3.2.1

## 1.0.3 - 12 November 2025

### Patch Changes

- Updated dependencies \[4d7a833]
  - @openfn/language-common@3.2.0

## 1.0.2 - 04 November 2025

### Patch Changes

- Updated dependencies
  - @openfn/language-common@3.1.2

## 1.0.1

### Patch Changes

- Updated dependencies \[408a3a2]
  - @openfn/language-common@3.1.1

## 1.0.0

Initial release.

### Features

- `decryptSubmission()` - Decrypt FormSG end-to-end encrypted submissions
- `verifyWebhook()` - Verify FormSG webhook signatures
- `processWebhook()` - Verify and decrypt in one step
- Support for `production`, `staging`, and `development` modes
- TypeScript implementation with full type safety
- Integration with @opengovsg/formsg-sdk v0.15.0

### Known Limitations

- Webhook signature verification only works with official FormSG deployments or
  dev/test mode (the FormSG SDK uses hardcoded signing keys for verification)
- Form decryption works with any FormSG deployment (uses form-specific secret
  keys)
