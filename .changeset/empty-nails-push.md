---
'@openfn/language-common': major
---

### Key Changes

**`logResponse` function:**

- **Simplified API**: Removed the need to pass `query` parameters as a separate
  argument
- **Enhanced functionality**: Now automatically extracts `query` parameters from
  the response object

**`request` function:**

- **Enhanced response structure**: Now includes `query` parameters in the
  response object
- **Better tracking**: Query parameters are attached to the response for
  consistent logging

### Breaking Changes

- **API signature change**: `logResponse(response, query)` →
  `logResponse(response)`
