```markdown
---
"@openfn/language-common": patch
---

fix: correct url construction on windows to prevent protocol normalization issues

Note: Replace `path.join` with `path.posix.join` or manual posix-style concatenation when constructing URLs to avoid backslashes on Windows.

```
---
"@openfn/language-common": patch
---

fix: correct url construction on windows to prevent protocol normalization issues