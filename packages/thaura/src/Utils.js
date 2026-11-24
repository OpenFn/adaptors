import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  assertRelativeUrl,
  parseUrl,
} from '@openfn/language-common/util';

export const DEFAULT_BASE_URL = 'https://backend.thaura.ai/v1';

export const DEFAULT_MODEL = 'thaura';

// A request without streaming waits up to about 315 seconds for the whole
// answer before the API gives up with a 504 upstream_timeout, and the API's
// proxy closes the connection at 360 seconds. Waiting as long as the proxy
// lets the API's own error reach the job instead of a client timeout.
export const DEFAULT_TIMEOUT_MS = 360e3;

// A 429 (60 requests a minute, or 8 at once, per key) is retried this many
// times, after the wait the API asks for in Retry-After
export const MAX_RETRIES = 2;
const MAX_RETRY_WAIT_SECONDS = 60;
const DEFAULT_RETRY_WAIT_SECONDS = 1;

const UPSTREAM_TIMEOUT_MESSAGE =
  'The answer took longer than the API waits for a whole answer (about 5 minutes). Ask for a shorter answer, for example with a lower max_tokens.';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const retryWaitSeconds = headers => {
  const seconds = Number(headers?.['retry-after']);
  if (!Number.isFinite(seconds) || seconds < 0) {
    return DEFAULT_RETRY_WAIT_SECONDS;
  }
  return Math.min(seconds, MAX_RETRY_WAIT_SECONDS);
};

// The API key is added by the adaptor, and a header from job code must
// never replace it or be sent beside it
const withoutAuthorization = (headers = {}) =>
  Object.fromEntries(
    Object.entries(headers).filter(
      ([name]) => name.toLowerCase() !== 'authorization'
    )
  );

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

export const request = async (
  configuration = {},
  method,
  path,
  options = {}
) => {
  const { apiKey } = configuration;
  const baseUrl = configuration.baseUrl || DEFAULT_BASE_URL;

  if (!apiKey) {
    throw new Error('apiKey missing from configuration.');
  }

  // The API key must only ever be sent to the host of baseUrl. A relative
  // path can still leave it (eg '../../example.com/x'), so check where the
  // path really resolves to.
  assertRelativeUrl(path);
  if (parseUrl(path, baseUrl).baseUrl !== new URL(baseUrl).origin) {
    const e = new Error('UNEXPECTED_HOST');
    e.code = 'UNEXPECTED_HOST';
    e.description = `The path ${path} leads away from ${baseUrl}`;
    e.fix = 'Use a path under the base URL, like models or chat/completions.';
    throw e;
  }

  const { headers, ...rest } = options;

  const send = () =>
    commonRequest(method, path, {
      parseAs: 'json',
      timeout: DEFAULT_TIMEOUT_MS,
      ...rest,
      baseUrl,
      headers: {
        'content-type': 'application/json',
        ...withoutAuthorization(headers),
        authorization: `Bearer ${apiKey}`,
      },
    });

  for (let attempt = 0; ; attempt++) {
    try {
      return await send();
    } catch (e) {
      if (e.statusCode === 429 && attempt < MAX_RETRIES) {
        const seconds = retryWaitSeconds(e.headers);
        console.log(
          `Thaura rate limit reached, retrying in ${seconds}s (retry ${
            attempt + 1
          } of ${MAX_RETRIES})`
        );
        await sleep(seconds * 1000);
        continue;
      }

      // Thaura returns OpenAI-style errors: { error: { message, type, code } }
      const details = e.body?.error;
      if (details?.code === 'upstream_timeout' && e.statusCode === 504) {
        // The API's own message advises streaming, which this adaptor
        // doesn't do
        e.message = `${e.message}: ${UPSTREAM_TIMEOUT_MESSAGE}`;
      } else if (details?.message) {
        e.message = `${e.message}: ${details.message}`;
      }
      if (details?.code) {
        e.code = details.code;
      }
      throw e;
    }
  }
};

export const createChatCompletion = async (
  configuration,
  messages,
  params = {}
) => {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('messages must be a non-empty array.');
  }

  if (params.stream) {
    throw new Error(
      'Streaming is not supported by this adaptor. Remove the stream option: the whole answer is written to state.data.'
    );
  }

  const response = await request(configuration, 'POST', 'chat/completions', {
    body: {
      model: DEFAULT_MODEL,
      ...params,
      messages,
      stream: false,
    },
  });

  const choices = response.body?.choices?.length ?? 0;
  const tokens = response.body?.usage?.total_tokens;
  console.log(
    `√ Chat completion returned ${choices} choice(s)${
      tokens === undefined ? '' : ` using ${tokens} tokens`
    }`
  );

  return response;
};
