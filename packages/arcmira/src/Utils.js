import { composeNextState } from '@openfn/language-common';
import { request as commonRequest } from '@openfn/language-common/util';

export const request = async (configuration = {}, path, query = {}) => {
  const { apiKey } = configuration;
  if (typeof apiKey !== 'string' || !apiKey.trim()) {
    throw new Error('Arcmira apiKey is required in configuration.');
  }

  let response;
  try {
    response = await commonRequest('GET', path, {
      baseUrl: 'https://api.arcmira.com',
      headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' },
      query,
      parseAs: 'json',
      timeout: 30000,
      maxRedirections: 0,
      errors: false,
    });
  } catch {
    throw new Error('Arcmira request failed before a valid JSON response. Check connectivity and retry the workflow manually.');
  }

  if (response.statusCode < 200 || response.statusCode >= 300) {
    const error = new Error(`Arcmira request failed with HTTP ${response.statusCode}. Check account access and usage at https://arcmira.com/docs.`);
    error.statusCode = response.statusCode;
    const code = response.body?.error?.code;
    if (typeof code === 'string' && !code.includes(apiKey) && /^[a-z][a-z0-9_]{0,63}$/.test(code)) {
      error.code = code;
      error.message = `Arcmira ${code} (HTTP ${response.statusCode}). Check account access and usage at https://arcmira.com/docs.`;
    }
    throw error;
  }
  return response;
};

export const prepareNextState = (state, response) => ({
  ...composeNextState(state, response.body),
  response: { statusCode: response.statusCode },
});
