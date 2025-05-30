---
'@openfn/language-kobotoolbox': major
---

Add automatic pagination to `getSubmissions()`.

`getSubmissions()` will now download all submissions, up to the requested limit,
over multiple requests. Note that by default, a maximum of 30,000 items will be
downloaded (pass a higher number of `Infinity` to download more).

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
   - Default limit is `30000` unless otherwise specified

   ```js
   // Fetch submissions with default limit (30000)
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
