---
'@openfn/language-gmail': minor
---

Added a `messageIds` option to `getContentsFromMessages` to fetch specific
messages by Gmail API message id instead of searching with `query`. Errors
from `messages.get` now include the message id.
