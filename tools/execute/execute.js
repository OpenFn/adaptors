/**
 * Helper function to execute job source in unit tests
 */

import compile from '@openfn/compiler';
import execute from '@openfn/runtime';

export default (job, adaptor, state = {}) => {
  // Compile without an adaptor, so there's no import statements
  const compiledJob = compile(job)
  return execute(compiledJob, state, {
    globals: {
      ...adaptor,
    },
    strict: false
  })
}