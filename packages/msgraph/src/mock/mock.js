import { setGlobalDispatcher, MockAgent } from 'undici';
import { fixtures } from './fixtures';

/**
 *  This provides a mock interface to the msgraph client
 * 
 * each function should be overridable through a common setMock API
 * 
 * We need to document this in a way that the playground can use
 */

// first step: mock with default data each msgraph function

// ok that's fun, it's a http client

// So this DOES use undici. So I think I can just write interceptors, rght?

let mockAgent;
let mockPool;

// TODO this was copied out of util but it should be a common helper
// actually we don't need this
// export function getBaseUrl(state) {
//   const{ resource, apiVersion} = state.configuration
//   // if (isValidHttpUrl(resource)) return resource;

//   const pathSuffix = apiVersion
//     ? `${apiVersion}/${resource}`
//     : `v1.0/${resource}`;
//   return `https://graph.microsoft.com/${pathSuffix}`;
// }

// To make custom overrides easier, export some stanadard patterns
export const patterns = {
  // TODO the regex might be a bit hard here, as we
  // need to distinguish the get drive patterns
  drives: /\/drives\//
}

export const enable = (state) => {
  // set the global dispacher on undici
  mockAgent = new MockAgent();
  
  // Don't let the agentcall out to the real internet
  mockAgent.disableNetConnect();

  setGlobalDispatcher(mockAgent);

  mockPool = mockAgent.get('https://graph.microsoft.com');

  enableDefaultRoutes();
}

// export const reset = (state) => {
//   return enable(state)
// }

export const disable = () => {
  throw "unimplemented"
}

/**
 * The problems with this are:
 * 1) When I register a persistent route, there's no way
 *    to disable it
 * 2) The first route to bind will always win, so custom
 *    overrides basically don't work.
 * Bugger.
 */
export const enableDefaultRoutes = () => {
  mockRoute(patterns.drives, fixtures.driveResponse)
}

// API to enable a particular path to be mocked
export const mockRoute = (path, data, options = {}) => {

const jsonResponse = {
  headers: {
    'Content-Type': 'application/json',
  },
};

  const { method = 'GET', headers, once = false } = options
  const scope = mockPool.intercept({
    path,
    method,
    headers,
  }).reply(200, JSON.stringify(data),jsonResponse)

  if (!once) {
    scope.persist()
  }
}