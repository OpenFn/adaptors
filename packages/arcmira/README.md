# Arcmira: YouTube Transcript Search

[Arcmira](https://arcmira.com) · [API docs](https://arcmira.com/docs)

Search spoken passages across indexed YouTube videos and livestreams from an
OpenFn workflow. Use timestamped source material in a research pipeline, then
review each original source before quoting or editing it.

## Configuration

Store your Arcmira API key in an OpenFn credential as `apiKey`. Do not put the
key in job code. The adaptor sends it as a bearer credential only to
`https://api.arcmira.com`. It does not follow redirects.

The [configuration schema](./configuration-schema.json) uses JSON Schema draft-07.
OpenFn supplies the credential under `state.configuration`; keep exported state
and local credential files private.

## Check account context

```js
getAccountContext();
```

This calls `GET /v1/me` and writes the full account-context response to
`state.data`, including scopes, plan, usage and transcript settings. It does not
change the account or reset usage.

## Search a publication window

Given input `state.data` with `topic`, `after` and `before`:

```js
searchTranscripts($.data.topic, {
  after: $.data.after,
  before: $.data.before,
  limit: 3,
});
```

Each operation makes one request. The default limit is 5, and the supported
range is 1–20. Optional filters are `after`, `before`, `channel_ids` and `source`.
Dates apply to media publication, with `after` inclusive and `before` exclusive.
Channel filters use comma-separated YouTube channel IDs, not names. Source
values are `arcmira_premium`, `creator_captions` and `third_party_quick`.
Account plan and date-window rules still apply. An explicit Premium source
request is not silently replaced with captions.

The first five returned search chunks do not use credits under the current API
contract. Reads beyond the free result allowance are metered under configured account budgets.
This adaptor makes no transcript-generation or account-management requests.

## Use the response

`state.data` is the complete API response. `state.data.chunks` contains spoken
text, timestamps, source links, publication dates and transcript types. Keep
`window`, `partial`, `failed_batches`, `search_index` and any `note` alongside
results so downstream steps retain coverage limitations. A successful empty
`chunks` array means no matches in the indexed scope, not no discussion anywhere.
A returned source link does not grant permission to reuse footage or audio.

Each successful operation replaces `state.data`, adds the prior value to
`state.references`, and sets `state.response.statusCode`. HTTP and transport
failures stop the workflow without automatic retries. HTTP errors expose the
status and a safe API error code when available; raw error bodies and headers
are not copied to errors or logs. Consult the API docs and account dashboard
for access or usage limits.

## Development

Follow the [OpenFn contribution guide](../../README.md#contributing).
From the repository root:

```sh
pnpm --filter @openfn/buildtools... build
pnpm --filter @openfn/language-common build
pnpm --filter @openfn/language-arcmira build
pnpm --filter @openfn/language-arcmira test
pnpm --filter @openfn/language-arcmira lint
pnpm validate:schemas
```

Tests use synthetic Undici responses and do not call Arcmira. Generated docs
are in `docs/index.md` after building. The adaptor code follows this repository's
LGPL-3.0-or-later license; the hosted Arcmira service is separate.
