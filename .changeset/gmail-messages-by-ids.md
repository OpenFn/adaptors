---
'@openfn/language-gmail': minor
---

Added a `getMessagesByIds` function to fetch specific messages by Gmail API
message id instead of searching with `query`. Errors from `messages.get` now
include the message id.
