/**
 * Helper function to execute job source in unit tests
 */
import compile from '@openfn/compiler';
import execute from '@openfn/runtime';

export default (job, adaptor, state = {}) => {
  // Compile without an adaptor, so there's no import statements
  let compiledJob = compile(job)

  // BUT we do need to export the execute function, if present
  if (adaptor.execute) {
    compiledJob = `export const execute = globalThis.execute;
${compiledJob}`
  }
  
  return execute(compiledJob, state, {
    globals: {
      ...adaptor,
    }
  })
}