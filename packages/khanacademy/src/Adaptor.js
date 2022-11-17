import { execute as commonExecute, expandReferences } from 'language-common';
import { resolve as resolveUrl } from 'url';
import request from 'request';
import qs from 'qs';

/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for khanacademy.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @constructor
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null
  }

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state })
  };

}

/**
 * Fetch data from the Khan Academy API
 * @example
 * execute(
 *   fetch(params)
 * )(state)
 * @constructor
 * @param {object} params - data to make the query
 * @returns {Operation}
 */
export function fetch(params) {

  function assembleError({ response, error }) {
    if (response && ([200,201,202].indexOf(response.statusCode) > -1)) return false;
    if (error) return error;
    return new Error(`Server responded with ${response.statusCode}`)
  }

  return state => {

    const {
      email,
      password,
      consumerKey,
      secretKey
    } = state.configuration;

    const { getEndpoint, queryParams, postUrl } = expandReferences(params)(state);

    const query = qs.stringify(queryParams)

    const getUrl = resolveUrl('https://www.khanacademy.org/api/v1' + '/', getEndpoint + '?' + query)

    console.log("Fetching data from URL: " + getUrl);

    var getTokenURL = 'https://www.khanacademy.org/api/auth2/request_token';
    var authorizeURL  = 'https://www.khanacademy.org/api/auth2/authorize';
    var accessTokenUrl = 'https://www.khanacademy.org/api/auth2/access_token';

    var nativeOAuthOptions = {
        consumer_key: consumerKey,
        consumer_secret: secretKey
    }

    return new Promise((resolve, reject) => {
      request.post({
        url: getTokenURL,
        oauth: nativeOAuthOptions
      }, function (error, response, body) {
        error = assembleError({error, response})
        if (error) {
          console.error("Token request failed.... KHAAAAAAN!")
          reject(error);
        } else {
          console.log("Token request successful.")
          resolve(qs.parse(body))
        }
      })
    })

    .then((body) => {
      // save for later!
      var auth = {
        oauth_token: body.oauth_token,
        oauth_token_secret: body.oauth_token_secret
      };

      // pull out the oauth_token and use it in the next post to authorize
      var bodyParams = {
          oauth_token: body.oauth_token,
          identifier: email,
          password: password
      };

      // authorize the token
      return new Promise((resolve, reject) => {
        request.post({
          followAllRedirects: true,
          url: authorizeURL,
          form: bodyParams
        }, function (error, response, body) {
          error = assembleError({error, response})
          if (error) {
            console.error("Token authorization failed... KHAAAAAAN!")
            reject(error);
          } else {
            console.log("Token auhorization successful.")
            resolve(auth)
          }
        })
      })
    })

    .then((auth) => {
      // configure authorized request for oauth
      var hasToken = {
          consumer_key: consumerKey,
          consumer_secret: secretKey,
          token: auth.oauth_token,
          token_secret: auth.oauth_token_secret
      }

      // exchange for an access token
      return new Promise((resolve, reject) => {
        request.get({
          url: accessTokenUrl,
          oauth: hasToken
        }, function (error, response, body) {
          error = assembleError({error, response})
          if (error) {
            console.error("Token exchange failed.... KHAAAAAAN!")
            reject(error);
          } else {
            console.log("Token exchange successful.")
            resolve(qs.parse(body))
          }
        })
      })
    })

    .then((body) => {
      // confiure request with shiny new access token
      var hasAccess = {
          consumer_key: consumerKey,
          consumer_secret: secretKey,
          token: body.oauth_token,
          token_secret: body.oauth_token_secret
      }

      // make authenticated GET from Khan!
      return new Promise((resolve, reject) => {
        request.get({
          url: getUrl,
          oauth: hasAccess
        }, function (error, response, body) {
          error = assembleError({error, response})
          if (error) {
            console.error("GET failed.... KHAAAAAAN!")
            reject(error);
          } else {
            console.log("GET succeeded.")
            console.log(body)
            resolve(body)
          }
        })
      })
    })

    // post it somewhere else
    .then((body) => {
      return new Promise((resolve, reject) => {
        request.post ({
          url: postUrl,
          json: JSON.parse(body)
        }, function(error, response, body){
          error = assembleError({error, response})
          if (error) {
            console.error("POST failed.... KHAAAAAAN!")
            reject(error);
          } else {
            console.log("POST succeeded.")
            resolve(body)
          }
        })
      })
    })

  }
}

export {
  field, fields, sourceValue, fields, alterState,
  merge, dataPath, dataValue, lastReferenceValue
} from 'language-common';
