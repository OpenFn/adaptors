import { composeNextState } from '@openfn/language-common';
import nodepath from 'node:path';
import {
  request as commonRequest,
  logResponse,
  assertRelativeUrl,
} from '@openfn/language-common/util';

const generateUserAgent = () => {
  return `nodejs/${process.version} @openfn/language-satusehat`;
};

export const authorize = state => {
  const auth = state.configuration;
  if (auth.access_token) {
    return state;
  }
  const clientId = auth.clientId;
  const clientSecret = auth.clientSecret;
  const headers = {};

  if (clientId && clientSecret) {
    Object.assign(headers, {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': generateUserAgent(),
    });

    const body = new URLSearchParams();
    body.append('client_id', clientId);
    body.append('client_secret', clientSecret);

    const options = {
      body: body.toString(),
      headers,
      method: 'POST',
      parseAs: 'json',
      baseUrl: auth.baseUrl,
      query: {
        grant_type: 'client_credentials',
      },
      maxRedirections: 1,
    };

    return commonRequest('POST', '/oauth2/v1/accesstoken', options).then(
      response => {
        return {
          ...state,
          configuration: {
            ...state.configuration,
            access_token: response.body.access_token,
          },
        };
      }
    );
  } else {
    throw new Error(
      'Invalid authorization credentials. Include clientId and clientSecret in state.configuration'
    );
  }
};

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export async function request(configuration, path, opts) {
  const { baseUrl, access_token } = configuration;

  const {
    method,
    data,
    params = {},
    parseAs = 'json',
    contentType = 'application/json',
  } = opts;

  const headers = {
    Authorization: `Bearer ${access_token}`,
    'User-Agent': generateUserAgent(),
    'content-type': contentType,
  };

  assertRelativeUrl(path);

  const safePath = nodepath.join('fhir-r4/v1', path);

  const options = {
    body: data,
    headers,
    query: params,
    parseAs,
    maxRedirections: 1,
    baseUrl,
  };

  return commonRequest(method, safePath, options).then(logResponse);
}
