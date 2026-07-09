import { enableMockClient } from '@openfn/language-common/util';
import { tokenResponse, birthCreationResponse } from './fixtures.js';

/**
 * Build a function-reply payload with a json content-type header.
 * (enableMockClient only auto-adds the header for non-function replies.)
 */
export const jsonReply = (data, statusCode = 200) => ({
  statusCode,
  data,
  responseOptions: { headers: { 'content-type': 'application/json' } },
});

/**
 * Set up a mock BDR server using language-common's enableMockClient.
 * All requests made through language-common's request helper for this
 * origin will be intercepted for the lifetime of the test process, so
 * call this once at module load.
 * BDR data endpoints return single-encoded JSON (standard JSON objects).
 *
 * Every intercepted request is recorded in the returned `requests` array
 * ({ method, path, headers, data }) so tests can assert on exactly what
 * the adaptor sent.
 *
 * @param {string} baseUrl - The base URL to mock
 * @returns {{pool: MockPool, requests: Array}} The mock pool and the
 *   recorded requests
 */
export function setupMockServer(baseUrl = 'https://bdr.npontu.com') {
  const pool = enableMockClient(baseUrl);
  const requests = [];

  const record = req => {
    requests.push({
      method: req.method,
      path: req.path,
      headers: req.headers,
      data: req.body ? JSON.parse(req.body) : undefined,
    });
  };

  // Token endpoint
  pool
    .intercept({
      method: 'POST',
      path: /\/api\/v1\/UserManagementService\/integrations\/auth\/token/,
    })
    .reply(req => {
      record(req);
      return jsonReply(tokenResponse);
    })
    .persist();

  // Birth creation endpoint
  pool
    .intercept({
      method: 'POST',
      path: /\/api\/v1\/UserManagementService\/integrations\/registrations\/birth(\/.*)?/,
    })
    .reply(req => {
      record(req);
      return jsonReply(birthCreationResponse);
    })
    .persist();

  // Birth retrieval endpoint (GET)
  pool
    .intercept({
      method: 'GET',
      path: /\/api\/v1\/UserManagementService\/integrations\/registrations\/birth\/.+/,
    })
    .reply(req => {
      record(req);
      return jsonReply(birthCreationResponse);
    })
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
    .reply(req => {
      record(req);
      return jsonReply(utilityResponse);
    })
    .persist();

  return { pool, requests };
}
