# Sahara Adaptor Tests

## Summary
- `pnpm test` runs 9 unit tests that exercise the `uploadAudioFile` happy path, category options, and error handling, plus parameter guards for `getFileStatus` and `get`/`post`. All are mocked with `nock` and currently pass.
- End-to-end coverage for polling and transcript retrieval lives in `examples/integration/`, which ships runnable jobs that call the real Sahara API once you add your credentials and audio samples.

## Mocking Strategy
- `axios` uploads: mocked via `nock` to cover success and common failure responses without hitting the network.
- `undici` helpers: not mocked in unit tests because `nock` does not intercept undici’s HTTP client reliably. Instead, they are verified through the real API scripts (`examples/integration/2-test-file-status.js`, `examples/integration/3-test-telehealth-full.js`, etc.).

## Test Output

```
pnpm test
# ⇒ 9 passing (≈40 ms)
```

When you need full-system assurance, run the category-specific scripts in `examples/integration/` after supplying valid credentials and audio files. We recommend keeping your local state/output files under `tmp/` (ignored by git) so secrets never end up in commits.
