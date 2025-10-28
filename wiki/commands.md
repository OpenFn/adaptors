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
