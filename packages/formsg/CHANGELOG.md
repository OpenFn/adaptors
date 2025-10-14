# @openfn/language-formsg

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

- Webhook signature verification only works with official FormSG deployments or dev/test mode (the FormSG SDK uses hardcoded signing keys for verification)
- Form decryption works with any FormSG deployment (uses form-specific secret keys)
