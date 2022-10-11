# Adaptors Monorepo

## Running scripts

Every repo provides a commen set of npm scripts:

To run them for all scripts, call `pnpm <script>` from the root abd add `-r`. Ie:

```
pnpm -r build:src
pnpm -r test
```

## Migration checklist

If moving an adaptor into this repo, run through the following steps:

- Copy the adaptor into `packages/name` (ignoring `language-`)
- Run the migration script `pnpm migrate packages/name` to update package.json [TODO not implemented yet]
- Remove the `docs` and `lib` dirs
- Ensure `prettierrc` matches the root rc file. You should be able to remove the adaptor's file completely. If the adaptor has any rules the parent does not, and you absolutely want to keep them, then preserve the child file.
- Remove any references to `babel` and `esdoc`.
- Remove the .gitignore file, update the top level ignore if neccessary

TODO: travis

## Future Work

- Support TypeScript adaptors
- Unify documentation
- Migrate tests to ava (?)
