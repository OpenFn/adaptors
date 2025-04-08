import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

let defaultBaseUrl = 'https://api.safaricom.co.ke';
let access_token;

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

const pad = num => (num < 10 ? String(num).padStart(2, '0') : num)

export const getTimestamp = () => {
  const date = new Date();

  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  )
}

export const getAccessToken = async (configuration) => {

  const { consumer_key, consumer_secret, baseUrl = defaultBaseUrl } = configuration;

  const auth_header = makeBasicAuthHeader(consumer_key, consumer_secret);


  const { body: { access_token } } = await commonRequest('GET', '/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      ...auth_header,
      'Content-Type': 'application/json'
    },
    baseUrl,
  });

  return access_token;
}


export const request = async (state, method, path, options) => {

  const { baseUrl = defaultBaseUrl } = state.configuration;

  const errors = {
    404: 'Page not found',
  };

  if (!access_token && (!options.headers?.Authorization)) {
    access_token = await getAccessToken(state.configuration);
  }


  let opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...options,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
      ...options.headers,
    },
  };



  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};
