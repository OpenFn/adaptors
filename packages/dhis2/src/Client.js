import axios from 'axios';
import Qs from 'qs';

/**
 * The request client takes configuration from state and an axios request object
 * then (1) logs the method and URL, (2) applies standard headers and auth
 * before spreading the rest of the axios configuration, and (3) executes an
 * axios request.
 * @function
 * @param {object} configuration - configuration must have a username and password
 * @param {object} axiosRequest - the axiosRequest contains valid axios params: https://axios-http.com/docs/req_config
 * @returns {Promise} a promise that will resolve to either a response object or an error object.
 */
export function request({ username, password }, axiosRequest) {
  const { method, url, params } = axiosRequest;

  console.log(`Sending ${method} request to ${url}`);
  if (params) console.log(` with params:`, params);

  // NOTE: We don't follow redirects for unsafe methods: https://github.com/axios/axios/issues/2460
  const safeRedirect = ['get', 'head', 'options', 'trace'].includes(
    method.toLowerCase()
  );

  return axios({
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json',
    maxRedirects: safeRedirect ? 5 : 0,
    auth: { username, password },
    paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'repeat' }),
    // Note that providing headers or auth in the request object will overwrite.
    ...axiosRequest,
  });
}
