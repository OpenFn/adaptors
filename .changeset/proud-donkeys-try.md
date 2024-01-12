---
'@openfn/language-common': minor
---

New HTTP helper functions have been added to common in `src/util/http.js`

These are based on the `undici` library. They are functions, not operations, so
they do not get and return state, and do not expand references.

They are designed to be used by other adaptors to make HTTP requests easier.

## Usage

```
// Import the helper function
import { get } from '@openfn/language-common/util'

// This is an example operation
export function get(id, callback) {
  return async (state) => {
    const [resolvedId] = expandReferences(
      state,
      id,
    );

    // Call the new common helper to fetch some json
    const response = await get(`www.example.com/resource/{$resolvedId}`, { parseAs: 'json' });

    // Return the response body as data, and also include the response object as a convenience
    return {
      ...state,
      response,
      data: response.body
    }
  }
}
```

See the http adaptor for a reference implementation.

## Deprecation notice

The existing http operations in `src/http.js` have been deprecated, and adaptors
should migrate to the new helpers.
