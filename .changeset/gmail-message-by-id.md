---
'@openfn/language-gmail': minor
---

Added a `getMessageById` function to fetch a single message by its Gmail API
message id instead of searching with `query`. Errors from `messages.get` now
include the message id.
