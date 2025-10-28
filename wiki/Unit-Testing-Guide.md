## Why do we unit test

* Catch regressions
* Prove that the function works
* Document HOW a function should be used
* Document a functions's behavior (especially quirky stuff)

## When to use Unit Tests

* Fixing a bug - reproduce it in a unit test first
* Creating a new function

## Unit test theory

Every function has an input and an output. Every single one.

The idea of a unit test is to ensure that, for a given input, the function returns an expect output.

When we are testing a function, we call that function "the function under test"

A suite of unit tests should explore every path through that function, to demonstrate and validate the function's behaviour in all cases.

Every inner branch should be followed, every expression evaluated

Some libraries will report test coverage, as in how much expressions are tested by the function. But 100% coverage does not neccearily mean a good test.

Consider:
```
function greaterThanOne(x) {
   return x == 2
}

it('should return false if x is 1, () => {
    expect(greaterThanOne(2)).to.equal(false)
})

it('should return true if x is 2, () => {
    expect(greaterThanOne(2)).to.equal(true)
})
```
That's 100% coverage. Do you think these are good tests?

Where this gets a bit more complicated is that functions call other functions, perhaps in other libraries. When function A is dependent on functions X, Y and Z, testing gets a bit harder. But you have to try and focus on the behaviour of A - not of X Y and Z.

## Good test principles

Focused: should only test one specific thing. When that thing breaks and the test fails, it should be immediately obvious how to fix it. A good test is easy to fix, a bad test might take hours to work out what's up.

## A bad unit test

Show a unit test which isn't good

- assertions on random things
- no clear sense of story
- doesn't really exercise the function very well
- Bad name

## A good unit test

* Narrative style
* Focused assertions
* Should only fail if that one behaviour changes
## Mocking HTTP requests

Use undici!
## Mocking libraries

Use a setter, or add a secret argument

## Fixtures

Save real data from endpoints, maybe anonymise or simplify it, and re-use it across tests
## Testing tips

* When you've finished your test, go into the function under test and comment out a key line of code, something related to your test (if your test is `should send query paramters`, comment out the `query` option in the undici options). The test should fail (and fail in the expected way)
* Every test tells a story. Given A, B should happen. Make sure everything in the test is focused on the story