# Sahara Adaptor Tests

## Summary
- `pnpm test` runs 30 unit tests that cover URL-based uploads, URL validation, error handling, and parameter guards for `getFileStatus` and `get`/`post`. All currently pass.
- End-to-end coverage for polling and transcript retrieval lives in `examples/integration/`, which ships runnable jobs that call the real Sahara API once you add your credentials and audio samples.

## Mocking Strategy
- Upload and other HTTP requests are mocked via `enableMockClient` (undici) to cover success and common failure responses without hitting the network.
- Integration examples (`examples/integration/`) verify behaviour against the real Sahara API.

## Test Output

```
pnpm test
# ⇒ 30 passing (≈14 ms)
```

When you need full-system assurance, run the category-specific scripts in `examples/integration/` after supplying valid credentials and audio files. We recommend keeping your local state/output files under `tmp/` (ignored by git) so secrets never end up in commits.
