import { composeNextState } from '@openfn/language-common';
import { request as commonRequest} from '@openfn/language-common/util';
import nodepath from 'node:path';

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


export const request = (configuration = {}, method, path, options = {}) => {

  const { apiToken, apiVersion = 'v1', baseUrl = 'https://ebm.zata.rw/api' } = configuration;
  const { headers = {} } = options;


  const errors = {
    404: 'Page not found',
  };

  const opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...options,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${apiToken}`,
      ...headers,
    },
  };

  const safePath = nodepath.join(apiVersion, path);

  return commonRequest(method, safePath, opts);
};
