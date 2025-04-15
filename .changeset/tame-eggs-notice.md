---
'@openfn/language-kobotoolbox': major
---

Improved pagination support in `getSubmissions`

### Changed

- Updated `getSubmission` pagination behavior:
  - Removed `paginate` option
  - Added new pagination options:
    - `limit`: Controls number of results returned
    - `max`: Maximum number of results to fetch
    - `pageSize`: Number of items per page

### Examples

```js
// Fetch all submissions (no limit)
getSubmission('form-id', { limit: Infinity });

// Fetch submissions with default limit (10000)
getSubmission('form-id');

// Fetch submissions with max results
getSubmission('form-id', { max: 500 }); // Returns up to 500 submissions
```
