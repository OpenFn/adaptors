```markdown
---
"@openfn/language-common": patch
"@openfn/adaptor-apis": patch
---

fix: compatibility with Windows for build tools and documentation generation
fix(common): resolve invalid URL scheme error on Windows

Note: Use `pathToFileURL` for dynamic imports to avoid `ERR_UNSUPPORTED_ESM_URL_SCHEME` on Windows; build tooling entry paths were normalized and now handle missing `build.config.js` gracefully.

```

---
"@openfn/language-common": patch
"@openfn/adaptor-apis": patch
---

fix: compatibility with Windows for build tools and documentation generation
fix(common): resolve invalid URL scheme error on Windows
