import { composeNextState } from '@openfn/language-common';
import { request as commonRequest } from '@openfn/language-common/util';
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

export async function login(state) {
  const { configuration = {} } = state;
  const { baseUrl, password, email } = configuration;

  const url = `${baseUrl}/`;
  const body = {
    email,
    password,
  };
  const headers = {
    'content-type': 'application/json',
  };

  const response = await request(
    state.configuration,
    'POST',
    'core/api/v1/auth/login',
    { headers, body },
  );
  const auth = { Authorization: `Bearer ${response.body.accessToken}` };
  return { ...state, configuration: { ...configuration, auth } };
}

// This helper function will call out to the backend service
// and add authorisation headers
// Refer to the common request function for options and details
export const request = (configuration = {}, method, path, options) => {
  // You might want to check that the path is not an absolute URL before
  // appending credentials commonRequest will do this for you if you
  // pass a baseURL to it and you don't need to build a path here
  // assertRelativeUrl(path);

  const { auth, baseUrl } = configuration;

  const headers =
    typeof auth === 'object' && !!auth.Authorization ? { ...auth } : {};

  const errors = {
    404: 'Page not found',
  };

  const opts = {
    // Force the response to be parsed as JSON
    parseAs: 'json',

    // Include the error map
    errors,

    // Set the baseUrl from the config object
    baseUrl,

    ...options,

    // You can add extra headers here if you want to
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  };

  // TODO you may want to add a prefix to the path
  // use path.join to build the path safely
  const safePath = nodepath.join(path);

  // Make the actual request
  return commonRequest(method, safePath, opts);
};
