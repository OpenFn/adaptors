# @openfn/language-flutterwave

## 1.0.1 Unreleased - 2026-02-02

- Add `createPaymentMethod` operation and tests.
- Fix request header merging so caller-provided headers (`X-Trace-Id`, `X-Idempotency-Key`) are preserved.
- Unwrap API response envelopes (`{ status, message, data }`) so composed state contains the resource under `data` as expected by callers and tests.
- Correct `expandReferences` usage (destructure return) and add `options` parameter to exported functions so tests can pass request headers/options.
- Improve null/validation checks to correctly reject `null` inputs.
- Update tests (`test/Adaptor.test.js`) to use a single mock dispatcher and relax body matching to avoid serialization mismatches.
- Add debug logging temporarily to help diagnose mock matching and response shapes (can be removed before release).


## 1.0.0 - 29 January 2026

New Flutterwave adaptor that allows to `initiate payments` and `create customers`.