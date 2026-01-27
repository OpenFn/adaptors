import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  assertRelativeUrl,
} from '@openfn/language-common/util';
import nodepath from 'node:path';
import fs from 'node:fs';
import https from 'node:https';
import axios from 'axios';
import FormData from 'form-data';

/**
 * Sleep helper for retry delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
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
 * Helper function to make authenticated requests to Sahara API with automatic retries
 * Uses undici via language-common (works well for JSON requests)
 * @param {object} configuration - The configuration object containing apiKey and baseUrl
 * @param {string} method - HTTP method (GET, POST, etc)
 * @param {string} path - API endpoint path
 * @param {object} options - Additional request options
 * @param {number} options.maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} options.retryDelay - Initial retry delay in ms (default: 1000)
 * @param {boolean} options.retryOn429 - Retry on rate limit errors (default: true)
 * @returns {Promise} - Response from the API
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
 * Helper function to upload files to Sahara API using axios
 * 
 * Note: Uses axios instead of undici due to FormData compatibility issues in undici v6 and v7.
 * 
 * @param {object} configuration - The configuration object
 * @param {string} path - API endpoint path
 * @param {object} formData - Form data to send
 * @param {object} options - Additional options (maxRetries, retryDelay, retryOn429)
 * @returns {Promise} - Response in common request format
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
    tls = {}
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

  // Build multipart form data
  const form = new FormData();

  if (!formData.audio_file_name) {
    throw new Error('audio_file_name is required');
  }
  form.append('audio_file_name', formData.audio_file_name);

  // Add audio file
  if (formData.audio_file_blob) {
    const fileValue = formData.audio_file_blob;
    
    if (typeof fileValue === 'string') {
      // File path - use stream for efficiency
      const absPath = nodepath.resolve(fileValue);
      const fileName = nodepath.basename(absPath);
      form.append('audio_file_blob', fs.createReadStream(absPath), fileName);
    } else if (fileValue.path) {
      // Object with path property
      const absPath = nodepath.resolve(fileValue.path);
      const fileName = nodepath.basename(absPath);
      form.append('audio_file_blob', fs.createReadStream(absPath), fileName);
    } else if (fileValue.url) {
      // URL reference
      form.append('audio_file_blob', fileValue.url);
    } else if (Buffer.isBuffer(fileValue)) {
      // Buffer
      form.append('audio_file_blob', fileValue, {
        filename: 'audio.wav',
        contentType: 'audio/wav',
      });
    } else {
      throw new Error(
        'audio_file_blob must be a file path string, object with path/url, or Buffer'
      );
    }
  } else {
    throw new Error('audio_file_blob is required');
  }

  // Add other optional post-processing fields
  for (const [key, value] of Object.entries(formData)) {
    if (key !== 'audio_file_name' && key !== 'audio_file_blob') {
      form.append(key, value);
    }
  }

  console.log('Uploading file with axios...');

  const url = `${baseUrl}${path}`;
  const startTime = Date.now();

  // Axios configuration
  const axiosConfig = {
    method: 'POST',
    url,
    data: form,
    headers: {
      ...form.getHeaders(),
      'Authorization': `Bearer ${apiKey}`,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: 300000, // 5 minutes
  };

  // Handle TLS configuration
  if (tls && Object.keys(tls).length > 0) {
    axiosConfig.httpsAgent = new https.Agent(tls);
  }

  // Retry logic
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios(axiosConfig);
      const duration = Date.now() - startTime;
      
      if (attempt > 0) {
        console.log(`✓ File upload succeeded after ${attempt} retry attempt(s)`);
      }
      
      console.log(`POST ${url} - ${response.status} in ${duration}ms`);
      
      // Return in common request format for compatibility
      return {
        statusCode: response.status,
        statusMessage: response.statusText,
        headers: response.headers,
        body: response.data,
        url,
        method: 'POST',
        duration,
      };
    } catch (error) {
      lastError = error;
      const statusCode = error.response?.status;
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
          `File upload failed (${statusCode || error.code}). Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`
        );
        await sleep(delay);
      } else {
        const duration = Date.now() - startTime;
        const err = new Error(
          error.response?.data?.message || 
          errorMessages[statusCode] || 
          error.message
        );
        err.statusCode = statusCode;
        err.statusMessage = error.response?.statusText;
        err.url = url;
        err.duration = duration;
        err.method = 'POST';
        err.body = error.response?.data;
        err.headers = error.response?.headers;
        throw err;
      }
    }
  }

  // Final error
  const statusCode = lastError.response?.status;
  const duration = Date.now() - startTime;
  const err = new Error(
    lastError.response?.data?.message || 
    errorMessages[statusCode] || 
    lastError.message
  );
  err.statusCode = statusCode;
  err.statusMessage = lastError.response?.statusText;
  err.url = url;
  err.duration = duration;
  err.method = 'POST';
  err.body = lastError.response?.data;
  err.headers = lastError.response?.headers;
  throw err;
};

