import { expect } from 'chai';
import deepEqual from 'deep-eql';
import { enableMockClient } from '@openfn/language-common/util';

/**
 * Creates a mock OpenSPP server with `enableMockClient`, which logs one
 * "Creating mock client for key" line. The line is captured and asserted so
 * that test output stays clean.
 */
export const createMockServer = baseUrl => {
  const logs = [];
  const log = console.log;
  console.log = (...args) => logs.push(args.join(' '));
  try {
    return enableMockClient(baseUrl);
  } finally {
    console.log = log;
    expect(logs).to.have.length(1);
    expect(logs[0]).to.match(/^Creating mock client for key:/);
  }
};

/**
 * Fails if any interceptor registered on a mock server was not used, so a
 * test can't pass when an expected request was never sent.
 * `enableMockClient` returns the MockPool, and undici keeps the MockAgent
 * that tracks interceptors under an internal symbol.
 * Called from `afterEach`: a failure stops the remaining tests in the file,
 * which is intended, since unused interceptors would leak into later tests.
 */
export const assertAllMocksUsed = mockServer => {
  const agentSymbol = Object.getOwnPropertySymbols(mockServer).find(
    symbol => symbol.description === 'mock agent'
  );
  if (!agentSymbol) {
    throw new Error(
      'Cannot find the MockAgent behind the mock server: check the undici version'
    );
  }
  mockServer[agentSymbol].assertNoPendingInterceptors();
};

/**
 * Awaits a promise that must reject and passes the error to `check`.
 */
export const expectRejection = async (promise, check) => {
  let error;
  try {
    await promise;
  } catch (e) {
    error = e;
  }
  expect(error, 'expected the promise to reject').to.exist;
  check(error);
};

/**
 * Interceptor body matcher: the request body must be JSON equal to `expected`.
 * undici also calls matchers for requests to other paths, so this returns
 * false instead of throwing. A request that matches nothing fails with
 * MockNotMatchedError.
 */
export const jsonBody = expected => body => {
  try {
    return deepEqual(JSON.parse(body), expected);
  } catch {
    return false;
  }
};
