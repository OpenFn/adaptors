# Common Commands

## Build

**`pnpm build`** - Builds all tools and adaptors in the monorepo.

```bash
pnpm build
```

## Build One Adaptor

`cd` into that adaptor's folder and run

```bash
pnpm build
```

To watch changes, do:

```bash
pnpm build --watch
```

## Testing

**`pnpm test`** - Runs linting, all package tests, and import tests.

```bash
pnpm test
```

**`pnpm lint`** - Runs ESLint on all packages.

```bash
pnpm lint
```

## Code Generation

**`pnpm generate`** - Generates a new adaptor scaffold

```bash
pnpm generate
```

## Documentation

**`pnpm docs:build`** - Builds documentation from JSDoc comments in adaptor
source files.

```bash
pnpm docs:build
```

## Code Review

**`/code-review`** - An AI code review command that reviews the current
branch's changes against the [Code Review Guidelines](code-review.md).

Run it from chat after making changes and before opening a PR:

```
/code-review
```

It reads [wiki/code-review.md](code-review.md) — the single source of truth for
review rules — and reports Blocking / Recommended / NitPicks findings for the diff.
The same guidelines back the automated Claude review on pull requests, so running
`/code-review` locally should surface the same issues before CI does.

