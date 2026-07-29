---
'@openfn/language-gmail': minor
---

Added a `fetchAttachments` option (default `true`) to `getContentsFromMessages`
and `getMessageById` to control whether file and archive attachments are
downloaded. When `false`, matched attachments are returned as `{ filename }` /
`{ archiveFilename }` objects without content instead of being omitted.
