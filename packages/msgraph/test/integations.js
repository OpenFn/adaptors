// Integation testing

// Load a test source script from examples

// Inject the mock

// run it

// Check the result

import * as Operations from './operations'

// load a mock request handler here
// this should match urls
const mocks = {
  'www': someFilePayload
}

// Hang on, what if I setup the mock fro here, before execute?
// I can prime the adaptor scope
Operations._setMocks(mocks)

const job = `
getDrive('some-id')
getFile('some-file')
`

// execute with custom globals
// https://github.com/OpenFn/adaptors/pull/296/files#diff-9a88bc922d602321be848d9b9251be018a4b801387034c2fc1cfda54ef554ff5
const finalState = await execute(job, {
  Adaptor
  mock: mocks // this sets the mock object inside the job
})