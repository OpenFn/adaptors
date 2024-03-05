# New Stuff Tutorial

A nice clean presentation about how I'm thinking about next gen adaptors.

## TODO

Immediate short-term todos, ideally before nairobi

- examples as tests

## Features

Here's what I've introduced

* Operation factories
* operation/implementation split
* real runtime/job tests
* A pattern for mocking (probably better than demanding docker containers?)

## Motivations

Here are the problems I'm trying to solve

* Some sort of capacity for useful unit tests
  * They're good for development, maintenance and preventing regressions
* Clarity over what an operation is, and why it matters
* Encouraging good documetnation _in the right place_
  * I see lots of problems of devs documenting the wrong functions, wasting time and energy

## Examples

I've started implementing this stuff in `msgraph` (and common) to see how it all comes together

I should really push this further and will try and spend some time on it before I fly.

Maybe `salesforce`, `dhis2` or `http` would be better examples?

## Issues

Here's what's not right yet:

* Basically I think this adds formality and complication. Does any of this acutally make adaptor writing easier?
* Expanding references. I'd really like to standardise and simplify this further
  - jsdoc path vs dataValue() vs open function
  - I am sure that you can just make expand references read '$a.b.c' as a jsonpath

## Operation Factories

Here's an operation factory
```
export const get = operation((state, url, auth, callback) => {
   // code goes here
   return state
})
```

Why is this good?
- There's less complicated nesting of arrow functions
- It's clear and explicit that this is an Operation

## Seperate the implementation

This makes it really easy to write unit tests against an implementation. You just pass a mock client in your tests.

```js
// operation.js
import { operation } from '@openfn/language-common'
import * as impl from './impl';

export const create = operation((state, resource, data, callback) => {
  return impl.create(state, request, resource, data, callback)
})
```

Note the extra `request` argument!

I can now unit test the implementation:

```js
describe('getDrive', () => {

  it('should get a drive by id and set it to state', async () => {
    const state = {
      configuration: {},
      drives: {}
    };
    
    // We could add test assertions in the mock if we wanted
    const mockRequest = async () => fixtures.driveResponse;

    // Call the implementation with the mock
    const result = await impl.getDrive(state, mockRequest, { id: 'b!YXzpkoLwR06bxC8tNdg71m_' })

    expect(result.drives).to.eql({ default: fixtures.driveResponse });
  });
});
```

## Real runtime tests

## Future Work & Gripes

Here's some other stuff we need to look at

* A really good way to "record" a "curl" to the datasource
  - I almost see a CLI command `openfn record` which will run a job (probably written against common.http) and save the final `state.data` (or something) to a json file in the right format to be used by the mock. maybe there's a map of `'path.json': data` So you write a job to populate your mock data, then just run it to save the data into the monorepo, then run the unit tests which should run against the mock data.

* Can unit tests also be examples?
  - My feeling is that if you save the job code to a file like "get-transactions.js", and that file is a fully runnable job (run it from the cli with state!), you can also load that into the website (somehow) as an example
  - I am not sure how you setup the mock - I guess that happens in the test file. We can append a magic string or something, do something to prep the client for mocking
  - I am also not sure where documentation goes - I guess in a comment at the top

* Logging
  - Well I've already hooked up and adaptor logger. So console.log should be fine right? Adaptor logging should already be better
  - console.success should also be available

* Replace the export { fn } from 'common' pattern
  - Maybe automate it in the build?

* Reusable functions
  - A much broader concern. How do I define a function in my workflow which can be re-used in multiple jobs?

* Seperate config out
  - God I'd love to do this
  - `await execute(state, config)`
  - `init(config)`

* What is a breaking change for us?
  - Or, a clear policy for what constitutes a major version bump
  - Configuration schema is a big sticking point here

## Documentation

This is probably a different consideration. But basically I want to rip the doc site up and start again.

I want a really good, clear, concise, easy to find reference

I want a few really good, clear, concise, easy to find tutorials

I want some clear best practice to be outlined. We have this, but it quickly runs stale and isn't  very good: https://github.com/OpenFn/adaptors/wiki/Adaptor-Wrting-Best-Practice. It needs to be immediate and obvious.

