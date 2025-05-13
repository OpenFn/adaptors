import { execute as commonExecute } from '@openfn/language-common';
import { resolve as resolveUrl } from 'url';
import { expandReferences } from '@openfn/language-common/util';
import request from 'request';
import qs from 'qs';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for khanacademy.
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Fetch data from the Khan Academy API
 * @example <caption>Fetch data from the Khan Academy API</caption>
 * fetch({ getEndpoint: "topictree", queryParams: { subject: "math" } });
 * @public
 * @function
 * @param {object} params - data to make the query
 * @returns {Operation}
 */
export function fetch(params) {
  function assembleError({ response, error }) {
    if (response && [200, 201, 202].indexOf(response.statusCode) > -1)
      return false;
    if (error) return error;
    return new Error(`Server responded with ${response.statusCode}`);
  }

  return state => {
    const { email, password, consumerKey, secretKey } = state.configuration;

    const [resolvedParams] = expandReferences(state, params);
    const {getEndpoint, queryParams, postUrl} = resolvedParams;

    const query = qs.stringify(queryParams);

    const getUrl = resolveUrl(
      'https://www.khanacademy.org/api/v1' + '/',
      getEndpoint + '?' + query
    );

    console.log('Fetching data from URL: ' + getUrl);

    var getTokenURL = 'https://www.khanacademy.org/api/auth2/request_token';
    var authorizeURL = 'https://www.khanacademy.org/api/auth2/authorize';
    var accessTokenUrl = 'https://www.khanacademy.org/api/auth2/access_token';

    var nativeOAuthOptions = {
      consumer_key: consumerKey,
      consumer_secret: secretKey,
    };

    return (
      new Promise((resolve, reject) => {
        request.post(
          {
            url: getTokenURL,
            oauth: nativeOAuthOptions,
          },
          function (err, response, body) {
            const error = assembleError({ error: err, response });
            if (error) {
              console.error('Token request failed.... KHAAAAAAN!');
              reject(error);
            } else {
              console.log('Token request successful.');
              resolve(qs.parse(body));
            }
          }
        );
      })

        .then(body => {
          // save for later!
          var auth = {
            oauth_token: body.oauth_token,
            oauth_token_secret: body.oauth_token_secret,
          };

          // pull out the oauth_token and use it in the next post to authorize
          var bodyParams = {
            oauth_token: body.oauth_token,
            identifier: email,
            password: password,
          };

          // authorize the token
          return new Promise((resolve, reject) => {
            request.post(
              {
                followAllRedirects: true,
                url: authorizeURL,
                form: bodyParams,
              },
              function (err, response, body) {
                const error = assembleError({ error: err, response });
                if (error) {
                  console.error('Token authorization failed... KHAAAAAAN!');
                  reject(error);
                } else {
                  console.log('Token auhorization successful.');
                  resolve(auth);
                }
              }
            );
          });
        })

        .then(auth => {
          // configure authorized request for oauth
          var hasToken = {
            consumer_key: consumerKey,
            consumer_secret: secretKey,
            token: auth.oauth_token,
            token_secret: auth.oauth_token_secret,
          };

          // exchange for an access token
          return new Promise((resolve, reject) => {
            request.get(
              {
                url: accessTokenUrl,
                oauth: hasToken,
              },
              function (err, response, body) {
                const error = assembleError({ error: err, response });
                if (error) {
                  console.error('Token exchange failed.... KHAAAAAAN!');
                  reject(error);
                } else {
                  console.log('Token exchange successful.');
                  resolve(qs.parse(body));
                }
              }
            );
          });
        })

        .then(body => {
          // confiure request with shiny new access token
          var hasAccess = {
            consumer_key: consumerKey,
            consumer_secret: secretKey,
            token: body.oauth_token,
            token_secret: body.oauth_token_secret,
          };

          // make authenticated GET from Khan!
          return new Promise((resolve, reject) => {
            request.get(
              {
                url: getUrl,
                oauth: hasAccess,
              },
              function (err, response, body) {
                const error = assembleError({ error: err, response });
                if (error) {
                  console.error('GET failed.... KHAAAAAAN!');
                  reject(error);
                } else {
                  console.log('GET succeeded.');
                  console.log(body);
                  resolve(body);
                }
              }
            );
          });
        })

        // post it somewhere else
        .then(body => {
          return new Promise((resolve, reject) => {
            request.post(
              {
                url: postUrl,
                json: JSON.parse(body),
              },
              function (err, response, body) {
                const error = assembleError({ error: err, response });
                if (error) {
                  console.error('POST failed.... KHAAAAAAN!');
                  reject(error);
                } else {
                  console.log('POST succeeded.');
                  resolve(body);
                }
              }
            );
          });
        })
    );
  };
}

export {
  fn,
  fnIf,
  field,
  sourceValue,
  fields,
  alterState,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';
