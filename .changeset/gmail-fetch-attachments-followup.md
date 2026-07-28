---
'@openfn/language-gmail': patch
---

When `fetchAttachments` is false, matched file and archive attachments are now
returned as `{ filename }` / `{ archiveFilename }` objects without content
instead of being omitted. Message bodies are no longer downloaded when only
header contents (from, date, subject) are requested.
