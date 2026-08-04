import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';
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

export const authorize = async state => {
  const { baseUrl = 'https://echis-ref.dataforimplementation.org', access_token, clientId, clientSecret } = state.configuration;
  if (access_token) {
    return state;
  }

  if (clientId && clientSecret) {
    const formBody = new URLSearchParams();
    formBody.append('grant_type', 'client_credentials');
    formBody.append('client_id', clientId);
    formBody.append('client_secret', clientSecret);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      parseAs: 'json',
      baseUrl,
      body: formBody.toString(),
    };

    return commonRequest(
      'POST',
      '/keycloak/realms/opensrp/protocol/openid-connect/token',
      options,
    ).then(response => {
      return {
        ...state,
        configuration: {
          ...state.configuration,
          access_token: response.body.access_token,
        },
      };
    });
  } else {
    throw new Error(
      'Invalid authorization credentials. Include clientId and clientSecret in state.configuration',
    );
  }
};

export const request = (configuration = {}, method, path, options) => {
  const { baseUrl = 'https://echis-ref.dataforimplementation.org', access_token } = configuration;

  if (options.query) console.log(`with params: `, options.query);

  const { headers, ...rest } = options;

  const opts = {
    parseAs: 'json',
    baseUrl,

    ...rest,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      ...headers,
    },
  };

  const safePath = nodepath.join('/gateway/fhir', path);
  return commonRequest(method, safePath, opts).then(logResponse);
};
