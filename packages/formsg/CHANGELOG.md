# @openfn/language-formsg

## 1.0.0 (TBD)

### Added

- Initial release
- `decryptSubmission()` - Decrypt FormSG end-to-end encrypted submissions
- `verifyWebhook()` - Verify FormSG webhook signatures
- `processWebhook()` - Verify and decrypt in one step
- Support for `production`, `staging`, and `development` modes
- TypeScript implementation with full type safety
- Integration with @opengovsg/formsg-sdk v0.15.0

### Notes

- Webhook signature verification only works with official FormSG deployments or dev/test mode
- Form decryption works with any FormSG deployment
