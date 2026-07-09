import { MockAgent } from 'undici';
import { tokenResponse, birthCreationResponse } from './fixtures.js';

// Mock response headers used across all endpoints
const mockHeaders = { 'Content-Type': 'application/json' };

/**
 * Creates a MockAgent configured to respond to BDR endpoints.
 * BDR data endpoints return single-encoded JSON (standard JSON objects).
 *
 * @param {string} baseUrl - The base URL to mock (defaults to BDR beta URL)
 * @returns {MockAgent} The mock agent to pass to setMockClient()
 */
export function createMockAgent(baseUrl = 'https://bdr.npontu.com') {
  const agent = new MockAgent();
  agent.disableNetConnect();

  const pool = agent.get(baseUrl);

  // Token endpoint
  pool
    .intercept({
      method: 'POST',
      path: /\/api\/v1\/UserManagementService\/integrations\/auth\/token/,
    })
    .reply(200, tokenResponse, { headers: mockHeaders })
    .persist();

  // Birth creation endpoint
  pool
    .intercept({
      method: 'POST',
      path: /\/api\/v1\/UserManagementService\/integrations\/registrations\/birth(\/.*)?/,
    })
    .reply(200, birthCreationResponse, { headers: mockHeaders })
    .persist();

  // Birth retrieval endpoint (GET)
  pool
    .intercept({
      method: 'GET',
      path: /\/api\/v1\/UserManagementService\/integrations\/registrations\/birth\/.+/
    })
    .reply(200, birthCreationResponse, { headers: mockHeaders })
    .persist();

  // Utility endpoint
  const utilityResponse = {
    ...tokenResponse,
    api_data: [
      { id: 1, country_id: 1, name: 'Ashanti', code: '05' },
      { id: 2, country_id: 1, name: 'Bono', code: 'BO' },
    ],
  };
  pool
    .intercept({
      method: 'POST',
      path: /\/api\/v1\/UserManagementService\/integrations\/utility/,
    })
    .reply(200, utilityResponse, { headers: mockHeaders })
    .persist();

  return agent;
}
