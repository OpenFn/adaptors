/*
helper function to execute job source in unit tests

We need to basucally inject the adaptor api at runtime

Is this going to handle execute overrides properly though? I don't think the runtime will see them
*/

import compile from '@openfn/compiler';
import execute from '@openfn/runtime';

export default (job, adaptor, state = {}) => {
  // Compile without an adaptor, so there's no import statements
  const compiledJob = compile(job)
  try {
    return execute(compiledJob, state, {
      globals: {
        ...adaptor,
      },
      strict: false
    })
  } catch(e) {
    console.error(e)
  }
}