# Adaptor doc generation (JSDoc → markdown)

How JSDoc comments in `packages/*/src` become `docs/index.md`, `docs/<name>.json`
and the docs site content. Verified by running `build-adaptor http docs`.

For *writing* good JSDoc, see `wiki/docs.md`. This file is about the machinery.

## Pipeline at a glance

```
packages/<x>/src/**/*.{js,ts}
   │  (1) jsdoc parse  — tools/adaptor-apis  (jsdoc2md.getTemplateData + custom config)
   ▼
 templateData[]  (JSDoc doclets, filtered/annotated)   ──►  docs/raw.json
   │  (2) handlebars render — tools/build  (jsdoc2md.render + our template/partials/helpers)
   ▼
 docs/index.md
   │  (3) bundle with README, CHANGELOG, ast.json, configuration-schema.json
   ▼
 docs/<name>.json
   │  (4) root scripts: flatten all packages into one tmp/docs.json + tmp/<pkg>/*.md
   ▼
 `docs` branch  ──►  openfn/docs site rebuild
```

`docs/` is git-ignored in every package; it is purely a build artefact.

## Entry points

| Command | What it does |
| --- | --- |
| `pnpm build` in a package | `pnpm clean && build-adaptor <name>` — runs tasks `src dts docs ast` |
| `pnpm exec build-adaptor <name> docs` | docs step only (add `--watch` to rebuild on src change) |
| `pnpm build:adaptors docs` (root) | docs step for every adaptor (used in CI) |
| `pnpm docs:build` (root) | `scripts/build-docs.sh`: collates all packages' output into `tmp/` |
| `pnpm docs:publish` (root) | `scripts/publish-docs.sh`: copies `tmp/*` onto the `docs` branch and pushes |

`build-adaptor` is `tools/build/src/cli.ts`; tasks are dispatched through
`tools/build/src/pipeline.ts` to `tools/build/src/commands/{src,dts,docs,ast}.ts`.
Build the tools first (`pnpm build:tools`) or `@openfn/adaptor-apis` will not resolve.

## Step 1: JSDoc → doclets (`tools/adaptor-apis/src/parse.ts`)

`docs.ts` does `import parse from '@openfn/adaptor-apis'`. That default export is
`gen()` in `tools/adaptor-apis/src/gen.ts`, which:

1. Calls `parse(root)`:
   - `jsdoc2md.getTemplateData({ files: '<root>/src/**/*.(js|ts)', configure: tools/adaptor-apis/jsdoc/config.json, 'no-cache': true })`
   - The jsdoc config loads two plugins:
     - `jsdoc-babel` — lets jsdoc read TypeScript (via `@babel/preset-typescript`)
     - `custom-tags.cjs` — defines our extra tags (see below)
   - **Keeps only** doclets where `kind === 'typedef'` or `access === 'public'`.
     Anything without `@public` is dropped from the docs. (Typedefs are always kept.)
   - Sorts by `longname` (case-insensitive).
   - Annotates every doclet: `source` (package name), `version`, and `scope`:
     - `@namespace foo` → `scope = 'foo'` (so `http.get`-style grouping)
     - typedefs → `scope = 'global'`
     - otherwise, if the file is not `Adaptor.*`, `scope` = file name without extension
       (so `src/util.js` functions land in the `util` scope)
     - otherwise left as whatever jsdoc set (`global`)
   - Adds `signature: ["name(param1, param2)"]` for functions
     (`util/generate-signature.ts`; dotted params like `options.foo` are skipped).
2. Finds functions re-exported from `@openfn/language-common`
   (`findExternalFunctions`): scans `src/**/*.js` with acorn for
   `export { ... } from '@openfn/language-common'`, then looks each name up in common's
   own parsed docs (it parses `node_modules/@openfn/language-common` if not supplied).
   Matches are copied in with `kind: 'external'`, `common: true`, `name: 'fn()'`;
   non-matches (e.g. `dateFns`, namespace re-exports) get a stub entry with only a name.
   `.ts` sources are **not** scanned for common exports.
   Skipped entirely when the package *is* common.
3. Returns the combined array.

`gen()` can also fetch adaptor source from GitHub and write `docs/raw.json` itself
(`installAndGen`, used by the standalone `@openfn/adaptor-apis` CLI/npm API) —
the monorepo build does not use that path.

### Custom tags (`tools/adaptor-apis/jsdoc/custom-tags.cjs`)

- `@state {type} name description` — appends to `doclet.state[]`. If no description is
  given, falls back to `state-defaults.cjs` (`references`, `data`). Rendered as the
  "This operation writes the following keys to state" table.
  A `@state {SomeTypedef}` with no name means "all properties of that typedef" and is
  expanded by the `flattenState` helper.
- `@namespace name` — sets `doclet.namespace` (jsdoc's built-in tag is overridden), which
  `parse.ts` turns into `scope`.

## Step 2: doclets → markdown (`tools/build/src/commands/docs.ts`)

- Deletes `version` from each doclet (adaptor-apis adds it; the template doesn't want it).
- Calls `jsdoc2md.render({ data, template, helper, partial: [...], ... })`. Note that
  `data` is passed in, so **jsdoc is not re-run here** — this is only handlebars (via
  `dmd`, the engine underneath jsdoc-to-markdown).
- Inputs, all in `tools/build/src/`:
  - `util/docs-template.hbs` — the top-level template. In order: a function index
    (`<dl>` of links), a namespaced-function index, a "from common" index linking to
    `/adaptors/packages/common-docs#<anchor>`, then `## Functions`, one `### name` per
    global function, `## <scope>` sections per namespace, and `### Interfaces` for typedefs.
  - `partials/*.hbs` — override dmd's partials: `body` (which sections appear and in what
    order), `description`, `examples`, `link`, `sig-name`, `state`. Any partial *not*
    in this list (e.g. `params`, `returns`, `separator`) falls back to dmd's default.
    **New partials must be added to the `partial:` array in `docs.ts` by hand.**
  - `util/hbs-helpers.js` — helpers: `toLowerCase`, `inlineLinks` (lowercases in-page
    anchors to match Docusaurus heading ids), `namespacedHeader`
    (`### ns.name {#ns_name}`), `commonFns`, `externalName`, `namespaces`, `flattenState`.
- Render options: `separators: true`, `name-format: false`, `example-lang: js`,
  `member-index-format: list`.

Non-function exports (e.g. lodash `_`) can be documented with `@kind namespace` and `@name _` (no `@function`). They get no signature and render in a `## Namespaces` section plus an index list, via the `{{#globals kind="namespace"}}` blocks in the template. Note that `@namespace foo` (our custom tag) means something different: membership of namespace `foo` for a function.

Result is written to `packages/<x>/docs/index.md`.

## Step 3: bundle to JSON (still `docs.ts`)

Writes alongside `index.md` in `packages/<x>/docs/`:

- `<name>.json` — `{ name, badge, adaptor, version, docs (the markdown), readme,
  changelog, functions (sorted op names from ast.json), configuration-schema }`.
  `docs`/`readme`/`changelog` are JSON-stringified markdown strings.
  `badge` comes from `package.json`; `configuration-schema` from
  `configuration-schema.json` in the package (else the string `'No Configuration Schema'`).
  `functions` needs `ast.json` — which is produced by the `ast` task, so run `ast`
  before `docs` (the default task order is `src dts docs ast`, so on a clean build
  `functions` is `[]` on the first pass; CI runs `build:adaptors docs` after an earlier build).
- `raw.json` — the post-filter doclet array from step 1 (best file for debugging).

## Step 4: aggregation and publish (root scripts + CI)

`.github/workflows/docs.yaml` (on push to `main` and after the Publish workflow):
`build:tools` → `build:adaptors docs` → `docs:build` → `docs:publish` → POST to
openfn/docs `workflow_dispatch` to rebuild the site.

- `scripts/build-docs.sh`: clears `tmp/`, rsyncs only `*.md` files from `packages/` into
  `tmp/`, hoists `docs/*.md` up one level (`tmp/<pkg>/index.md`, plus README/CHANGELOG),
  and concatenates every `packages/*/docs/*.json` into one JSON array at `tmp/docs.json`.
- `scripts/publish-docs.sh`: switches to the `docs` branch, `rsync tmp/* docs/`,
  force-adds, commits, pushes. The openfn/docs site reads from that branch.

## Debugging recipes

```bash
# run just docs for one adaptor
cd packages/http && pnpm exec build-adaptor http docs

# was a function dropped?  Check raw.json — missing means filtered (no @public?)
jq '.[] | {name, kind, scope, access}' packages/http/docs/raw.json

# check how a single function rendered
grep -n '^### get' -A30 packages/http/docs/index.md
```

Common causes of "my function isn't in the docs":

- Missing `@public` tag (only typedefs bypass the filter).
- JSDoc block not directly above the declaration, or malformed so jsdoc can't parse it
  (jsdoc fails quietly on many errors; also check `raw.json`).
- File outside `src/**/*.(js|ts)`, or a `.test.ts` (ignored by the babel config).
- Re-export from common in a `.ts` file (not scanned).

## Known quirks / cleanup candidates

- `tools/build/jsdoc/` is a near-duplicate of `tools/adaptor-apis/jsdoc/` and appears to be
  unused by the current build (only adaptor-apis' copy is loaded). Edit the adaptor-apis one.
- `docs.ts` imports `FileSet`, `pathToFileURL`, `extractExports` and the `ast`-style
  extractor but does not use them; `tools/build/src/util/extract-exports.ts` is duplicated
  in `tools/adaptor-apis/src/util/`.
- `pipeline.ts` chains tasks with `reduce` but doesn't `await` or return the chain, so
  errors in a task are unhandled promise rejections rather than a non-zero exit code.
- A "TODO" in `docs.ts` notes that partials should be auto-discovered rather than listed.
- Output paths and templates assume Docusaurus heading-id behaviour (lowercased anchors).
