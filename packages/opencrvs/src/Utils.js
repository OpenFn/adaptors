import { composeNextState } from '@openfn/language-common';
import nodepath from 'node:path';
import {
  request as commonRequest,
  logResponse,
  assertRelativeUrl,
} from '@openfn/language-common/util';



export const authorize = async state => {
  
  const auth = state.configuration;
  if (auth.access_token) {
    return state;
  }
  
  const clientId = auth.clientId;
  const clientSecret = auth.clientSecret;
  const headers = {
    "Accept": "*/*",
    'Content-type': 'application/json',
  };

  if (clientId && clientSecret) {
   

    const body = new URLSearchParams();
    body.append('client_id', clientId);
    body.append('client_secret', clientSecret);
    body.append('grant_type', 'client_credentials');

    const options = {
      // body: body.toString(),
      headers,
      // method: 'POST',
      parseAs: 'text',
      baseUrl: `https://auth.${auth.domain}`,
      query: {
        grant_type: 'client_credentials',
        'client_secret': clientSecret,
        'client_id': clientId
      },
    };
return await fetch(options.baseUrl + '/token?' + body.toString(), {
      method: 'POST',
      headers: options.headers,
     
    }).then(async response => {

      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return {
        ...state,
        configuration: {
          ...state.configuration,
          access_token: result.access_token,
        },
      }
    })

    // return commonRequest('POST', '/token', options).then(
    //   response => {
    //     // console.log({ response });
        
    //     return {
    //       ...state,
    //       configuration: {
    //         ...state.configuration,
    //         access_token: response.body.access_token,
    //       },
    //     };
    //   }
    // );
  } else {
    throw new Error(
      'Invalid authorization credentials. Include clientId and clientSecret in state.configuration'
    );
  }
};

export const prepareNextState = (state, response, callback = s => s) => {
  console.log({response});
  
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export async function request(configuration, method, path, opts) {
  const { domain, access_token } = configuration;
  console.log({access_token});
  
  const {
    body = {},
    params = {},
    parseAs = 'json',
  } = opts;



  assertRelativeUrl(path);


  const options = {
    body,
    headers:{
      Authorization: `Bearer ${access_token}`,
      'Content-type': 'application/json',
    },
    query: params,
    parseAs,
    baseUrl: `https://gateway.${domain}`,
  };


  return commonRequest(method, path, options).then(logResponse);
}
