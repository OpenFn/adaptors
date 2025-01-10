import axios from 'axios';
import Qs from 'qs';

/**
 * The request client takes configuration from state and an axios request object
 * then (1) logs the method and URL, (2) applies standard headers and auth
 * before spreading the rest of the axios configuration, and (3) executes an
 * axios request.
 * @function
 * @param {object} configuration - configuration can either be a username and password OR a personal access token
 * @param {object} axiosRequest - the axiosRequest contains valid axios params: https://axios-http.com/docs/req_config
 * @returns {Promise} a promise that will resolve to either a response object or an error object.
 */
export function request({ username, password, personalAccessToken }, axiosRequest) {
  const { method, url, params } = axiosRequest;

  console.log(`Sending ${method} request to ${url}`);
  if (params) console.log(` with params:`, params);

  // NOTE: We don't follow redirects for unsafe methods: https://github.com/axios/axios/issues/2460
  const safeRedirect = ['get', 'head', 'options', 'trace'].includes(
    method.toLowerCase()
  );

  // Declare auth property and headers dynamically
  const headers = { 'Content-Type': 'application/json'}
  let auth;

  if(personalAccessToken){
    headers.Authorization = `ApiToken ${personalAccessToken}`
  } else {
    auth = { username, password }
  }


  return axios(
    {
      headers,
      responseType: 'json',
      auth,
      maxRedirects: safeRedirect ? 5 : 0,
      paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'repeat' }),
      // Note that providing headers or auth in the request object will overwrite.
      ...axiosRequest,
    }
  );
}
