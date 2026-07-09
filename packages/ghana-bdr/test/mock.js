import { enableMockClient } from '@openfn/language-common/util';
import { tokenResponse, birthCreationResponse } from './fixtures.js';

/**
 * Set up a mock BDR server using language-common's enableMockClient.
 * All requests made through language-common's request helper for this
 * origin will be intercepted for the lifetime of the test process, so
 * call this once at module load.
 * BDR data endpoints return single-encoded JSON (standard JSON objects).
 *
 * @param {string} baseUrl - The base URL to mock
 * @returns {MockPool} The mock pool, for registering extra intercepts
 */
export function setupMockServer(baseUrl = 'https://bdr.npontu.com') {
  const pool = enableMockClient(baseUrl);

  // Token endpoint
  pool
    .intercept({
      method: 'POST',
      path: /\/api\/v1\/UserManagementService\/integrations\/auth\/token/,
    })
    .reply(200, tokenResponse)
    .persist();

  // Birth creation endpoint
  pool
    .intercept({
      method: 'POST',
      path: /\/api\/v1\/UserManagementService\/integrations\/registrations\/birth(\/.*)?/,
    })
    .reply(200, birthCreationResponse)
    .persist();

  // Birth retrieval endpoint (GET)
  pool
    .intercept({
      method: 'GET',
      path: /\/api\/v1\/UserManagementService\/integrations\/registrations\/birth\/.+/,
    })
    .reply(200, birthCreationResponse)
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
    .reply(200, utilityResponse)
    .persist();

  return pool;
}
