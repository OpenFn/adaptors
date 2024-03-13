import { setGlobalDispatcher, MockAgent } from 'undici';
import { fixtures } from './fixtures';

/**
 *  This provides a mock interface to the msgraph client
 * 
 * each function should be overridable through a common setMock API
 * 
 * We need to document this in a way that the playground can use
 */

let mockAgent;
let mockPool;

// To make custom overrides easier, export some stanadard patterns
export const patterns = {
  // TODO the regex might be a bit hard here, as we
  // need to distinguish the get drive patterns
  drives: /\/drives\//
}

// name: { pattern, data, options }
const defaultRoutes = {
  'drives': { pattern: patterns.drives, data: fixtures.driveResponse }
}

export const enable = (state, routes = {}) => {
  // TODO if an agent already exists, should we destroy it?

  // set the global dispacher on undici
  mockAgent = new MockAgent();
  
  // Don't let the agentcall out to the real internet
  mockAgent.disableNetConnect();

  setGlobalDispatcher(mockAgent);

  mockPool = mockAgent.get('https://graph.microsoft.com');

  const mockRoutes = {
    ...defaultRoutes,
    ...routes
  }

  // Set up all the mock routes
  for (const name in mockRoutes) {
    const { pattern, data, options } = mockRoutes[name];
    mockRoute(pattern, data, options)
  }
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