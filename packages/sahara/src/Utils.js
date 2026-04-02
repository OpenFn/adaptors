import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
} from '@openfn/language-common/util';
import nodepath from 'node:path';
import { FormData } from 'undici';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};

/**
 * Authenticated request with retries (undici via language-common).
 * @param {object} configuration - apiKey, baseUrl, optional tls
 * @param {string} method - HTTP method
 * @param {string} path - API path
 * @param {object} [options] - Request options; maxRetries (3), retryDelay (1000), retryOn429 (true)
 */
export const request = async (
  configuration = {},
  method,
  path,
  options = {}
) => {
  const { 
    baseUrl = 'https://infer.voice.intron.io', 
    apiKey,
    tls = {}
  } = configuration;

  if (!apiKey) {
    throw new Error('apiKey is required in configuration');
  }

  const {
    maxRetries = 3,
    retryDelay = 1000,
    retryOn429 = true,
    ...requestOptions
  } = options;

  const authHeader = {
    Authorization: `Bearer ${apiKey}`,
  };

  const errors = {
    400: 'Bad Request - Invalid parameters',
    401: 'Unauthorized - Invalid API key',
    404: 'Resource not found',
    429: 'Rate limit exceeded - Please retry after a delay',
    500: 'Internal server error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };

  const opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...requestOptions,
    headers: {
      ...authHeader,
      ...requestOptions.headers,
    },
  };
  
  if (tls && Object.keys(tls).length > 0) {
    opts.tls = tls;
  }

  const safePath = nodepath.join(path);

  // Retry logic
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await commonRequest(method, safePath, opts);
      
      if (attempt > 0) {
        console.log(`✓ Request succeeded after ${attempt} retry attempt(s)`);
      }
      
      return response;
    } catch (error) {
      lastError = error;
      const shouldRetry =
        attempt < maxRetries &&
        ((error.statusCode === 429 && retryOn429) ||
          error.statusCode >= 500 ||
          error.code === 'ECONNRESET' ||
          error.code === 'ETIMEDOUT' ||
          error.code === 'ENOTFOUND');

      if (shouldRetry) {
        const delay = retryDelay * Math.pow(2, attempt);
        console.warn(
          `Request failed (${error.statusCode || error.code}). Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`
        );
        await sleep(delay);
      } else {
        throw error;
      }
    }
  }

  throw lastError;
};

/**
 * Upload form (multipart) to Sahara; audio_file_blob is sent as URL string. Uses undici via language-common.
 * @param {object} configuration - apiKey, baseUrl, optional tls
 * @param {string} path - e.g. /file/v1/upload
 * @param {object} formData - audio_file_name, audio_file_blob (URL), other post-processing fields
 * @param {object} [options] - maxRetries (3), retryDelay (2000), retryOn429 (true)
 */
export const uploadFile = async (
  configuration = {},
  path,
  formData,
  options = {}
) => {
  const {
    baseUrl = 'https://infer.voice.intron.io',
    apiKey,
    tls = {},
  } = configuration;

  if (!apiKey) {
    throw new Error('apiKey is required in configuration');
  }

  const {
    maxRetries = 3,
    retryDelay = 2000,
    retryOn429 = true,
  } = options;

  const errorMessages = {
    400: 'Bad Request - Invalid file or parameters',
    401: 'Unauthorized - Invalid API key',
    413: 'File too large - Maximum 100MB',
    429: 'Rate limit exceeded - Maximum 30 requests per minute',
    500: 'Internal server error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };

  const form = new FormData();

  if (!formData.audio_file_name) {
    throw new Error('audio_file_name is required');
  }
  form.append('audio_file_name', formData.audio_file_name);

  if (formData.audio_file_blob) {
    const urlString = formData.audio_file_blob;
    if (
      typeof urlString !== 'string' ||
      (!urlString.startsWith('http://') && !urlString.startsWith('https://'))
    ) {
      throw new Error(
        'audio_file_blob must be a URL string (http:// or https://). File paths and Buffers are not supported.'
      );
    }
    form.append('audio_file_blob', urlString);
  } else {
    throw new Error('audio_file_blob is required');
  }

  // Add other optional post-processing fields
  for (const [key, value] of Object.entries(formData)) {
    if (key !== 'audio_file_name' && key !== 'audio_file_blob') {
      form.append(key, value);
    }
  }

  const url = `${baseUrl}${path}`;
  const startTime = Date.now();

  const requestOptions = {
    baseUrl,
    body: form,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    errors: errorMessages,
    timeout: 300000, // 5 minutes
    parseAs: 'json',
  };
  if (tls && Object.keys(tls).length > 0) {
    requestOptions.tls = tls;
  }

  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await commonRequest('POST', path, requestOptions);
      const duration = Date.now() - startTime;
      if (attempt > 0) {
        console.log(`✓ File upload succeeded after ${attempt} retry attempt(s)`);
      }
      console.log(`POST ${url} - ${response.statusCode} in ${duration}ms`);
      return {
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
        headers: response.headers,
        body: response.body,
        url,
        method: 'POST',
        duration,
      };
    } catch (error) {
      lastError = error;
      const statusCode = error.statusCode;
      const shouldRetry =
        attempt < maxRetries &&
        ((statusCode === 429 && retryOn429) ||
          (statusCode >= 500) ||
          error.code === 'ECONNRESET' ||
          error.code === 'ETIMEDOUT' ||
          error.code === 'ENOTFOUND');

      if (shouldRetry) {
        const delay = retryDelay * Math.pow(2, attempt);
        console.warn(
          `File upload failed (${statusCode ?? error.code}). Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`
        );
        await sleep(delay);
      } else {
        throw error;
      }
    }
  }

  throw lastError;
};

