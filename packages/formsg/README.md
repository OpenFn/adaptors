# language-formsg <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for decrypting and verifying FormSG webhook submissions.

## Overview

This adaptor wraps the [@opengovsg/formsg-sdk](https://github.com/opengovsg/formsg-javascript-sdk) to provide easy decryption and verification of FormSG form submissions in OpenFn workflows.

**Key Features:**
- Decrypt end-to-end encrypted FormSG submissions
- Verify webhook signatures (for official FormSG deployments)
- Support for multiple FormSG environments (production, staging, development)

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/formsg-docs) for full technical documentation.

### Configuration

View the [configuration-schema](https://docs.openfn.org/adaptors/packages/formsg-configuration-schema/) for required and optional `configuration` properties.

**Sample configuration:**
```json
{
  "formSecretKey": "your-form-secret-key-from-formsg",
  "mode": "development",
  "webhookEndpoint": "https://your-domain.com/webhook"
}
```

## Usage Examples

### Decrypt a submission (without signature verification)

```js
decryptSubmission(state.data);
```

### Decrypt with signature verification

```js
decryptSubmission(state.data, {
  verifySignature: true,
  signatureHeader: state.headers['x-formsg-signature']
});
```

### Process webhook (verify and decrypt in one step)

```js
processWebhook(state.data, state.headers['x-formsg-signature']);
```

## Important Limitations

### Webhook Signature Verification

The FormSG SDK uses **hardcoded public signing keys** for webhook signature verification. This means:

✅ **Signature verification works with:**
- Official FormSG production
- Official FormSG staging
- FormSG deployed in `development` mode
- FormSG deployed in `test` mode

❌ **Signature verification does NOT work with:**
- Custom FormSG deployments using different signing keys

### Why This Limitation Exists

The signing keys in the SDK (see [signing-keys.ts](https://github.com/opengovsg/formsg-javascript-sdk/blob/develop/src/resource/signing-keys.ts)) are used to verify that webhooks genuinely come from official FormSG servers. Custom deployments use different signing keys that aren't in the SDK.

### Decryption Always Works

**Form submission decryption works with ANY FormSG deployment** (official or custom), as long as you have the form's secret key. The limitation only applies to webhook signature verification.

### Workarounds for Custom Deployments

If you're running a custom FormSG deployment:

1. **Use development/test mode** - Deploy your FormSG instance using the public `development` or `test` signing keys from the SDK
2. **Skip signature verification** - Use `decryptSubmission()` without the `verifySignature` option
3. **Fork the SDK** - Modify the SDK to inject your custom public signing key (or contribute back via PR!)

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the "Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.

### Testing Locally

See `LOCAL_TEST.md` for instructions on testing this adaptor locally with the OpenFn CLI.

## Resources

- [FormSG JavaScript SDK](https://github.com/opengovsg/formsg-javascript-sdk)
- [FormSG Documentation](https://form.gov.sg)
- [FormSG Self-hosting Documentation](https://international.open.gov.sg/self-hosting/formsg)
- [OpenFn Documentation](https://docs.openfn.org)
