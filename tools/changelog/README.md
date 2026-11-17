# @openfn/changelog

A utility for maintaining and updating changelogs across all OpenFn language adaptors.

This package supports two key use cases:

- ✅ **Inserting the current release date** for new versions.
- 📦 **Fetching historical versions from the NPM registry** and updating each version entry in the `CHANGELOG.md` file with its actual release date.

---

## Tests

Run the changelog regression tests with `pnpm --filter @openfn/changelog test`.
Already-dated changelogs are preserved byte-for-byte unless a release date changes.
Tests copy package fixtures into a temporary directory, leaving repository files
unchanged. `updateChangelog(adaptor, versions, packagesDir)` accepts an optional
packages directory; existing callers default to `../../packages` as before.

## 📅 Commands

### 1. `update-latest-versions`

Adds today’s date to the most recent version heading in each adaptor’s `CHANGELOG.md`.

```bash
pnpm update-latest-versions

```

### 2. `update-historical-versions`

Fetches release versions and dates from the NPM registry for each adaptor (e.g., `@openfn/language-dhis2`) and adds release dates next to each version in the changelog.

```bash
pnpm update-historical-versions

```
