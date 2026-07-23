---
'@openfn/language-commcare': major
---

Add support for CommCare's [Case Data API v2](https://commcare-hq.readthedocs.io/api/cases-v2.html) and make the API version configurable.

**Breaking change:** The URL pattern used by `get()`, `post()`, and `fetchReportData()` has changed from `/api/v0.5/<resource>` to `/api/<resource>/<apiVersion>`. Existing jobs are unaffected as long as the CommCare v1 API is still available — the default `apiVersion` is `"v1"`.

**`get()` now correctly handles individual resource fetches**, placing the ID after the API version in the URL (e.g. `get("case/12345")` resolves to `/api/case/v1/12345`).

**New: configurable API version**

Set `apiVersion` in `state.configuration` to target a specific CommCare API version (defaults to `"v1"`):

```json
{
  "configuration": {
    "hostUrl": "https://www.commcarehq.org",
    "username": "...",
    "password": "...",
    "domain": "my-domain",
    "apiVersion": "v2"
  }
}
```

**New: Case Data API v2 (`apiVersion: "v2"`)**

The v2 case API introduces JSON-based case creation and updates (no XForm construction required), filtering by project-specific case properties, bulk operations, and a new response envelope. See the [v2 docs](https://commcare-hq.readthedocs.io/api/cases-v2.html) for full details.

Note: auto-pagination is v1-only (uses `meta.next`). The v2 API uses cursor-based pagination via a top-level `next` field — follow it manually using `request()` if needed.
