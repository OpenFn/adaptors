explain the basic structure of how to create an adaptor

explain the adaptor/impl pattern

## Folder structure

In order to make it easier for developers to create and maintain adaptors, we adopt strong conventions around style and structure.

An adaptor should have the following file structure:
```
src
  +- operations.js
  +- impl.js
  +- util.js
  +- index.js
  +- mock.js
```

`operations.js` is the most important file and every adaptor should have one. It's where your operations will live, along with your documentation. Anything you expect users to call from job code should live here. Keeping your operations in one place makes it easy for other developers and maintainers to see where the user-facing code is.

`impl.js` is not required but encouraged. A useful pattern is to declare the interface to your operations in `operations.js`, but to add the actual implementation, the actual logic, in `impl.js`. Splitting each operation into two parts makes it easier to define unit tests (see the testing doc)

`util.js` is another optional file. If you have helper functions to support your implementation, you can add them here. If you think they might be of use to job writers, you can export them in index (see below)

`mock.js` contains mock code and data for your unit and integration tests. This is excluded from the release build and not published to npm.

`index.js` declares the exports used by the final npm module.

## Defining operations

The common adaptor exposes a helper function to make it easier to define adaptors.

Call the `operation` function with a single function argument. The function takes state as its first argument and whatever else you need. Assign the function to an exported const.

```
export const getPatient = operation((state, name, country, options) => {
    // Implement the operation here
})
```

If you prefer, you can stll define operations the "old" way, by creating your own factory wrapper. 
```
export function getPatient(name, country, options) {
  return (state) => {
    // Implement the operation here
  }
}
```
You'll still see this pattern used across the repo.

## Implementing Operations

Testing OpenFn adaptors has traditionally been a very hard problem. The factory pattern and the nature of the backend service makes it very hard to test code in isolation.

The impl pattern helps this.

You can cut the body of each operation out into an impl. The impl has almost the same structure, but it also accepts a library, client or exectutor function as an argument. This makes the implementation mockable.

For example:

```
// operations.js
import client from 'my-library';
import impl from './impl';

export const getPatient = operation((state, name, country, options) => {
    impl.getPatient(state, client, name, country, options)
})
```

This operation is really just a signature and declaration which calls out to an implementation function. Look closely at the impl signature though and you'll notice an extra argument: `client`.

Our implementation might look like ths:
```
// impl.js
export const getPatient = (state, client, name, country, options) => {
  const result = await client.findPatient(name, { country, ...options })
  state.data = result.patients[0];
  return state;
}
```

Default values should be set in the outer operation wrapper.

The implementation is easy to unit test because we can pass in a mock client object or function. Different adaptors have different needs but they ultimately will either call out to a webservice or another npm module.

## Exports

In order for anyone to use your adaptor, you need to export the correct functions in the index.

Usually this is as simple as:
```
export * from './operations`
```
Which will make all operations available to user jobs.

You may also want to export util functions to job code. It's good practice to namespace these so that it's clear to users what is an operation and what is a function.
```
export * as util from './utils'
```
Users can then do `util.convertPatient(patient)` in their job code.