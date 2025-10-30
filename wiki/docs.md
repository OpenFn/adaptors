A reference for public adaptor API documentation.

Following these rules ensures consistency across the doc site and a better
experience for everyone.

A good model for docs is Commcare (ignoring `fetchReportData`):
https://docs.openfn.org/adaptors/packages/commcare-docs

## Detail

Generally speaking, our documentation should give a broad but shallow
explanation of how the adaptor works.

It should not get stuck in implementation details, although it should explain
enough to understand what the adaptor is actually doing.

Low-level functions, which map directly to endpoints, should avoid explaining
too much about what the endpoint does, and link to external documentation where
possible. For example, it's not really the Salesforce adaptor's job to explain
what an sObject is.

Where the adaptor is opinionated - if it's a high level abstraction, or includes
automation, or covers multiple endpoints - those opinionated bits should be
explained.

Where an adaptor exposes options which control the adaptor behaviour, rather
than the backend behaviour, those options should be clearly documented.

## Language

- Try to be mindful of what sort of language to use when describing an
  Operation. For example, when documenting a HTTP helper, the language should
  relate to HTTP concepts. It's about fetching resources, not fetching lists of
  sObjects. When documenting something of a higher order, like submitting a
  form, try to use the language familiar to the backend service.
- Usually `options` are things that you pass into an adaptor to change the
  adaptor's behaviour (like which HTTP method to use)
- Usually `parameters` or `params` are things you pass through to the backing
  service or endpoint (like url queries)

## Examples

- Every public Operation should have at least one example
- Each example caption should be concise and tell a single story, like "Upload
  some data" or "Parse multiple records".
- Any syntax or options which do not directly support the story should be
  removed
- Examples should be reasonably realistic
- Examples should generally return data from state rather than define it inline

## Types

- If a property or parameter supports multiple types (including
  `object or array of objects`), how should they be styled? Using formal JS doc
  notation that no-one can understand? Using natural language? Typescript?
- An object with multiple properties should use a typedef rather than adding
  `options.thingy` lines to the jsdoc
- Types that are not owned by us (eg, lists of URL query parameters, or options
  passed to third party lirary) should link to third party documentation. We
  should avoid duplicating documentation that is better captured elsewhere.

## Capitalisation

- capitalisation of types: primitives MUST be lower case (`string`, `boolean`,
  `number`, `function`), any complex type should be uppercase, like in
  Typescript (`Array`, `Operation`, `RequestOptions`, `State`). Object is a
  funny one but I suggest a plain `object` should be lowercase (but it's more
  important to be consistent within an adaptor)
- Any non-standard type like `Options` or `Response` SHOULD have a corresponding
  `@typedef` declaration

## Spelling & Grammar

- All documentation should be written in American English.
- Sentences should generally end with a full stop

## Changesets and release notes

- Changesets are targeted at users of the adaptor, not other developers
- Focus on API and behavioral changes, not internal/implementation details
- Should we even both to include changesets for documentation?
- A changeset should be a short, concise and specific mention of a change
- Take care to mention any breaking changes and workarounds or migrations
- You do not need to justify, sell or promote any changes in a changeset. Stick
  to the facts.
