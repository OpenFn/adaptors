---
'@openfn/language-dhis2': major
---

- Remove axios from `dhis2`.
- Remove interceptor.
- Allow users to pass in their own `headers` and `parseAs`.
- Support `base64` format in the `get` function

### Migration Guide

- The `get` function has major changes in the parameters accepted.

If you used to do this:

```
get('programs', { orgUnit: 'TSyzvBiovKh', fields: '*' });

```

Do this instead:

```
get('programs', { query: { orgUnit: 'TSyzvBiovKh', fields: '*' } });

```
