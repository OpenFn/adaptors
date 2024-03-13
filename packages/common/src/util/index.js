export * from './http';
export * from './references';

// operation creates a new operation factory
// It accepts a function which takes user arguments AND state
// It returns a function which acccepts user args
// Which in turn returns a function which accepts state
// and then triggers the original function
// It's complex BUT the end user code should be way way simpler
export const operation = (fn) => {
  return (...args) => {
    return (state) => {
      return fn(state, ...args)
    }
  }
}