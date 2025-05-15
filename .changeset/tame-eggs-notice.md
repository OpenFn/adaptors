---
'@openfn/language-kobotoolbox': major
---

### Changes

- Updated `getSubmission` pagination behavior:

  - Removed `paginate` option
  - Added new pagination options:
    - `limit`: Controls number of results returned
    - `pageSize`: Number of items per page

- Remove export of `http` methods from `@openfn/language-common`
- Add support for `maxRedirections` option in `HTTPRequestOptions`

### Migration Guide

1. Pagination Changes:

   - Replace `paginate: true/false` with `limit` and `pageSize` options
   - Default limit is `10000` if not specified

   ```js
   // Fetch submissions with default limit (10000)
   getSubmission('form-id');

   // Fetch all submissions (no limit)
   getSubmission('form-id', { limit: Infinity });

   // Fetch submissions with max results
   getSubmission('form-id', { limit: 500 }); // Returns up to 500 submissions
   ```

2. HTTP Changes:

- Support for `maxRedirections` option in `HTTPRequestOptions`
  ```js
  // Auto follow redirects
  http.get('assets/aXecHjmbATuF6iGFmvBLBX/data', { maxRedirections: 5 });
  ```
