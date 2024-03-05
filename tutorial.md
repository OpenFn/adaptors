# New Stuff Tutorial

A nice clean presentation about how I'm thinking about next gen adaptors.

## Features

Here's what I've introduced

* Operation factories
* Operation/implementation split
* Real runtime/job tests
* A pattern for mocking (probably better than demanding docker containers?)

## Motivations

Here are the problems I'm trying to solve

* Some sort of capacity for useful unit tests
  * They're good for development, maintenance and preventing regressions
* Clarity over what an operation is, and why it matters
* Encouraging good documentation _in the right place_
  * I see lots of problems of devs documenting the wrong functions, wasting time and energy

## Examples

I've started implementing this stuff in `msgraph` (and common) to see how it all comes together

I should really push this further and will try and spend some time on it before I fly.

Maybe `salesforce`, `dhis2` or `http` would be better examples?

## Issues

Here's what's not right yet:

* I worry that this adds formality and complication. Does any of this acutally make adaptor writing easier?
* Expanding references. I'd really like to standardise and simplify this further
  - jsdoc path vs dataValue() vs open function
  - I am sure that you can just make expand references read '$a.b.c' as a jsonpath
* I'm not totally sold on some parts of the mocking pattern
  - Getting mock data feels a bit hard (although there may be an answer to that here somewhere)
  - The setclient function on the adaptor is a bit awkward
  - Can we exclude the setClient function from the final build?

## Operation Factories

Here's an operation factory
```js
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

The ability to mock the implementation like this also enables real runtime testing

## Real runtime tests

I really hate the existing test syntax we use right now. What I actually want to do is write a job and pass it to the actual run time so execution.

So I've implemented this!


First, we create an example job in a source file

```js
// examples.get-drive.js
/**
 * A simple test job which gets a drive
 */
getDrive((
  state) => ({ id: state.id }), // get the drive id from state
  "default", // drive name
  (state) => ({ ...state, savedDrives: state.drives }) // alias savedDrives onto state (it gets removed by the adaptor)
)

```

(we can also do this inline in a unit test in a string)

In a unit test, we can:
* Load this example source
* Load the adaptor module
* Set a mock client/request object in the adaptor
* Pass the source, input state and adaptor into the actual runtime and compiler

That gives us a test that looks like this:
```js
describe('examples', () => {
  it('get-drive', async () => {
    // Load our example code
    const source = loadExample('get-drive')

    // Set up some input state
    const state = {
      id: 'xxx',
    };

    // Set up the mock
    Adaptor.setRequestHandler(async (url) => {
      // Return some mock data (perhaps as a pre-saved fixture, or we define it in-line)
      return { ... }
    })

    // Compile and run the job against this adaptor
    const finalState = await execute(source, Adaptor, state)

    // Assert on the result state
    expect(finalState).to.eql({ ...});
  })
});
```
What's nice about this pattern is that we can run test assertions on the mock handler function as well on the result state

Note: there is an alternative to all this for real runtime tests. It should be possible to mock out the http requests with undici. I think?  Surely at some level of abstraction we can do it.

I think it's a lot harder to map and mock the different request URLs, but it may be a viable option.

## Examples

There's one other benefit of this approach.

The files in examples.js are just jobs. Regular jobs which you can run through the CLI (given the correct input state and credentials).

But we should also be able to load these in docusaurus and present them in docs. They're real, runnable, testable execution examples.

Surley we can take advantage of this?

## Future Work & Gripes

Here's some other stuff we need to look at

* A really good way to "record" a "curl" to the datasource
  - I almost see a CLI command `openfn record` which will run a job (probably written against common.http) and save the final `state.data` (or something) to a json file in the right format to be used by the mock. maybe there's a map of `'path.json': data` So you write a job to populate your mock data, then just run it to save the data into the monorepo, then run the unit tests which should run against the mock data.

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

