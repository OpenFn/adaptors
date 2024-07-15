import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

export const authorize = state => {
  const {
    baseUrl,
    access_token,
    username,
    password,
    clientId = 'user-client',
    clientSecrete = 'changeme',
  } = state.configuration;

  const headers = makeBasicAuthHeader(clientId, clientSecrete);

  if (access_token) return state;

  if (username && password) {
    if (clientId === 'user-client')
      console.warn('Using default client id:', clientId);
    if (clientSecrete === 'changeme')
      console.warn('Using default client secrete:', clientSecrete);

    const options = {
      query: { grant_type: 'password', username, password },
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      baseUrl,
      parseAs: 'json',
      maxRedirections: 1,
    };
    return commonRequest('POST', '/api/oauth/token', options)
      .then(response => {
        return {
          ...state,
          configuration: {
            ...state.configuration,
            access_token: response.body.access_token,
          },
        };
      })
      .catch(err => {
        console.error('Error authenticating with OpenLMIS');
        console.log(err.body);
        throw err;
      });
  }

  // warn if no auth found
  console.warn(
    `WARNING: no authentication properties found on congfiguration schema!`
  );
  console.warn(
    'Make sure to either set an access_token or username & password'
  );
};

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export const request = (configuration = {}, method, path, options) => {
  const { baseUrl, access_token } = configuration;
  const { headers = {}, ...otherOptions } = options;

  const opts = {
    parseAs: 'json',
    baseUrl: `${baseUrl}/api`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      ...headers,
    },
    ...otherOptions,
  };

  return commonRequest(method, path, opts).catch(e => {
    logResponse(e);
    throw e;
  });
};
