```markdown
---
"@openfn/language-collections": patch
---

fix: use posix path joining for url paths to support windows

Note: Updated tests and URL construction to use `path.posix.join` to avoid `MockNotMatchedError` caused by backslashes on Windows.

```
---
"@openfn/language-collections": patch
---

fix: use posix path joining for url paths to support windows