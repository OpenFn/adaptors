This is a living document for best practice guidelines for how to create
adaptors.

It includes advice and guidance on how to design the adaptor API (in other
words, what functions do you expose to users, and what parameters to they
take?), as well how to actually implement the API.

## What is an adaptor?

An adaptor sits between the OpenFn platform (ie, app.openfn.org) and some
backing service or system (le, Salesforce, Primero).

It's job is to provide a clean, high-level JavaScript interface to uses writing
workflows in OpenFn.

Users who write OpenFn job code are usually inexperienced programmers, and
rarely experts in all the systems that a workflow has to connect with. A good
adaptor will make that user's journey easier.

## API Design

When creating an adaptor you have two choices: you can either
wrap/mirror/reproduce the destination datasource (usually a REST API or an npm
library), or you can build out an opinionated API for OpenFn users.

For example: at the time of writing our
[openlmis adaptor](https://docs.openfn.org/adaptors/packages/openlmis-docs) just
exposes `get`, `post`, `put` and `request` functions which allow you to easily
access the REST API, with minimal URL construction. This makes the whole
openlmis API available to implementations - although job code may need to work
hard to prepare and parse data. An for users who don't know openlmis very well,
this might not be a very easy interface to use.

On the other hand, our
[msgraph adaptor](https://docs.openfn.org/adaptors/packages/msgraph-docs)
provides a more opinionated API, with `getDrive()`, `getFile()` and
`uploadFile()` functions which allow content to be easily retrieved from remote
sharepoint drives. They're designed specifically to be more accessible to users.

A good approach is usually to implement the adaptor in two phases:

- A first pass, which is a light wrapper around the destination API.
- When you know more about how the adaptor is to be used, start phasing in
  higher-level convenience functions.

A good API design is concise, focused, and has as few parameters as possible.
It's good to consider who is going to use the function and what mindset they'll
have, and scope/name/document the function internally. Some tips for this:

- Use terminology and nomenclature from the destination system where
  appropriate, so that the OpenFn signature and docs align with the destination
  docs.
- Use semantics appropriate to the function (and this might change across
  functions within the same adaptor). For example, a HTTP wrapper should use the
  language of HTTP - methods and query parameters and URLs and such. But a
  domain specific function shouldn't use these concepts - it should mask the
  HTTP layer and only expose domain semantics. For example, a `getUser` function
  probably shouldn't expose HTTP semantics like `method` or `url`

Adaptor design is usually tactical - we design and implement the smallest
surface area to satisfy the needs of our workflow/implementation needs.

Adaptors rarely sit still: we encourage rapid releases and fast iteration.
Sometimes you just don't know what you need until you're half-way through a
workflow implementation, and requirements often change. This is fine.

## Get One vs Get Many

Its common to have an API where you have one function to fetch a single item,
and another function to fetch multiple items. For example, get one patient by
id, versus get a bunch of patients with a query.

There are several ways to implement this - some are better than others

❌ `getPatients({ patientId })`

It is tempting to squash get one and get many into a single function with an
optional id. If the id is present it'll just return that one item, otherwise
it'll return a bunch. We've used this pattern. But most options on the object
parameter only apply to the list API, so the docs get confusing. And do you
expect `state.data` to be a single object, or an array of objects?

❌ `getPatient(id)` / `getPatients(options)`

You see this a lot in APIs, where a singleton and plural function have different
signatures but only a single letter difference. This is kind of OK but the names
are so similar it can cause confusion.

✅ `getPatient(id)` / `listPatients(options)`

Many REST APIs use the semantics of "Get" versus "list" to handle one or many
options - and this is a great way to structure the API. It's less subtle than
`getPatient/getPatients`, and the `list` verb probably gives you a better idea
of what to expect.

`search()` is probably a good alterantive to `list()`, but our APIs should
generally prefer one or the other across adaptors

## Operations vs Utility Functions

It's important to understand the difference between an operation and a function
(or utility function) in OpenFn.

Operations are the main functions of your adaptor . An operation sits at the top
level of your code and cannot be called inside a promise or callback. It does
not return anything (this is handled by compiler magic).

An operation is written as a factory function - it's actually an operation
factory. An operation is a function that returns a function/promise that takes
and returns state, ie,
`(userArg1, userArg2) => (state) => Promise<State> | State`.

See
[docs.openfn.org](https://docs.openfn.org/documentation/jobs/job-writing-guide#operations-run-at-the-top-level)
for more details about operations.

A util function is just a regular javascript function. In OpenFn it can only be
used inside a callback or promise (not at the top level). Functions are usually
namespaced, ie, `util.parseDate()` or `util.uuid()`.

These utils can be used in job code, but they're also helpful in adaptor
implementations.

## Handling State

Most operations will "return" the result or side effect of their actions to the
state object. What that means is that an operation doesn't return directly - job
code doesn't do `const data = await get(state.data.url)`. The operation is an
asynchronous unit of code which runs serially in the pipeline at runtime. That
pipeline uses the state object to transfer data.

Basically, if an operation generates some data that the user might want to use,
they should return that result to `state.data`.

Some adaptors use other state properties, like `state.references` (used to store
a copy of every `state.data` created throughout the job), `state.response` (used
by HTTP functions to write http response metadata) and `state.cursor` (used by
the common `cursor` operation).

If your adaptor mutates the state object, you should document this with the
`@state` JSdoc annotation (search the repo for `@state` for examples).

## Namespacing

Occasionally you'll want to write code that doesn't appear at the top level of
an adaptor. Like using `http.get()` instead of `get()`. This is particularly
useful for utility functions which are not operations, which should generally be
namespaced under `util.helper()`.

By default, all functions not found in Adaptor.js will be namespaced under their
filename. So if you create `util.js`, all functions inside it will be
automatically namespaced under `util` (this is how `collections` works).

You can override the namespace by setting the `@namespace foo` JSDoc on the
function documentation. You need to do this for every public function in the
file (sorry, maybe one day someone will find a nice way to namespace a file
automatically).

If you want to write a function in another file but remove its namespace, you
can set `@namespace global`

Remember that you may need to export namespaced functions from index.ts if it
exists (see common)

See common/util for reference

## Documentation

JSDoc comments from an adaptor are automatically compiled into markdown files by
the build process. This markdown will be hosted on docs.openfn.org when your
branch is merged to main. So having good JSDoc is super important.

For an operation to appear in public documentation, it must be annotated with
`@public` and `@function`.

See the `http` adaptor for good documentation examples. You might also want to
look at the
[Documentation Guide Wiki](https://github.com/OpenFn/adaptors/wiki/Documentation-Guide).

You can preview the generated documentation by building the adaptor and looking
at `docs/index.md`. This markdown file contains all the docs that will be loaded
to docs.openfn.org.

To test your docs locally, see
[How to test docs changes](https://github.com/OpenFn/adaptors/wiki/How-to-test-docs-changes)

## Handling Clients

Some adaptors require a client object, which is usually an npm library which
must be instantiated into memory. The client instance must be made available to
the adaptor.

Some older adaptors write the client instance to state, ie `state.client`. But
this causes problems if the user returns a custom state object in their job
code, because they can accidentally remove the client and break the adaptor.

Instead, we prefer to save the client in a closure variable in the adaptor. This
client will be re-instantiated for every job that is run. See the `redis`
adaptor for an example.

To add setup and teardown hooks to manage a client, you should declare an
`execute` function to override the default execute pipeline. You'll see
different examples of this in different examples, but you can copy, paste and
modify this simple example:

```
export function execute(...operations) {
  return state => commonExecute(
    connect,
    ...operations,
    disconnect)
  (state);

}
```

## Security Considerations

Adaptors are responsible for processing highly sensitive personal data, and
through their credentials can be used to access critical datasets and major
organisations.

Don't panic, but there are a few things we should keep in mind:

- We should generally avoid passing values from straight from state into SQL
  queries, because they could be vectors for injection attacks. Where possible,
  use SQL builder functions rather than creating raw strings. If strings are
  being constructed in the adaptor, use as much structure as possible and don't
  allow arbitrary strings to be passed.
- When using client objects from npm, consider whether they are safe to expose
  or export directly. If I console.log the client, will it expose credentials?
  Or PII? Generally clients should be wrapped, rather than directly exposed.
- When using REST and HTTP APIs, be mindful of exposing sensitive headers -
  especially in error handling and logging.
- Avoid logging data directly from the adaptor. Don't say "fetched object <id>:
  { ...json here }", say "fetched 1 object". If the id is not sensitive you can
  log that. If it is, just log part of it (the first/last characters). The aim
  of logging is to inform developers what's going on inside an operation. But
  let job code decide when actual data gets logged to the console.

## Credentials

TODO: document oath requirements, configuration usage, basic auth in http

## Version Numbers and Semver

TODO

## Callback functions

Many adaptor functions provide a callback. There are two uses for this:

1. As an iterator, as in `each`, where the callback is called for each item
1. As a way to intercept the result of an operation
1. To chain operations together

The second case and third cases are the most typical. For example, here's some
job code which gets some data and transforms it before returning it to state:

```
get('www', {}, (state) => {
   const { data, response } = state;
   // do something with the result
   return state
})
```

We can also write this job like this:

```
get('www')
fn((state) => {
   const { data, response } = state;
   // do something with the result
   return state
})
```

However! As of mid-2024, callbacks are increasingly being phased out of adaptor
design. For adaptors which run on platform v2 (lightning), all operations behave
like promises. So instead of this:

```
get('www', {}, (state) => {
   const { data, response } = state;
   // do something with the result
   return state
})
```

Users can do this:

```
get('www').then(state) => {
   const { data, response } = state;
   // do something with the result
   return state
})
```

With no change to your code.

The benefit of this is that adaptor APIs don't need to have optional `optiosn`
AND `callback` arguments, which can result in awkward signatures like this:

```
get('www', undefined, (state) => state)
```

## Common Patterns

While it's not necessary for our adaptors to have similar APIs, it is generally
helpful for OpenFn implementors if adaptors _feel_ similar.

To this end, there are some patterns and conventions you may wish to adopt in
your API design.

TODO

## Error handling

Standard practice with adaptors is to throw an error when something goes wrong.
Thrown errors will be written by the runtime to `state.errors`.

NOTE: A util helper will soon be added to common to build better errors.

It's usually considered appropriate to have a workflow fail on an error, which
will show up in a FAILED state on Lightning and prompt further investigation. It
can also help workflow logic if a step fails and reports an error on state.

## Testing

Testing adaptors is often difficult - but it's also important. Unit tests in the
adaptor itself can be useful to:

1. Show how the adaptor is designed to work
1. Validate that the implementation actually works as designed
1. Catch regressions when the next developer works on the adaptor and
   accidentally breaks something.

See the
[Unit Testing Wiki](https://github.com/OpenFn/adaptors/wiki/Unit-Testing-Guide)
for more insight.

## Other Guidance

Assorted tips and tricks

- The common adaptor exposes a `request` function in `src/util/http.js`. You
  should use this where possible as a HTTP library, rather than importing third
  party libraries or using native node ones. This helps ensure a consistent user
  experience, and also allows for easy mocking of HTTP functions.
- If you really can't use `request` or the supporting functions on common, we
  prefer use of the `unidici` library in new adaptors
- Try to minimise the number of parameters in your function. Required arguments
  should be a parameter, everything else basically goes into a config object
- It is probably good practice for every Operation to log what it is doing. Be
  careful about logging sensitive data - try using summaries to keep the user
  informed, like `console.log("Query completed with ${result.length} records!"`.
- You should wrap almost all parameters in `expandReferences()` calls (this
  ensures that arguments can be lazily evaluated against state). For example:

```
export function get(path, options) {
  return (state) => {
    const [resolvedPath, resolvedOptioos] = expandReferences(state, path, options);
   //  Do stuff with the resolved options

    return state
  };
}
```
