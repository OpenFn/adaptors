/**
 * General-purpose utility functions
 *
 * These are designed more for use in adaptor code than job code
 * (but we could choose to export util from common)
 *
 * None of these functions are operation factories
 */

// import { fetch } from 'undici';
// import https from 'https';

// export function handleResponseError(response, data, method) {
//   const { status, statusText, url } = response;

//   if (isEmpty(data)) {
//     const responseString = [
//       `Message: 0 results returned`,
//       `Request: ${method} ${url}`,
//       `Status: ${status}`,
//     ].join('\n\t∟ ');

//     console.log(`Info at ${new Date()}\n${responseString}`);
//   }
//   if (!response.ok) {
//     const errorString = [
//       `Message: ${statusText}`,
//       `Request: ${method} ${url}`,
//       `Status: ${status}`,
//       `Body: ${JSON.stringify(data, null, 2).replace(/\n/g, '\n\t  ')}`,
//     ].join('\n\t∟ ');
//     throw new Error(errorString);
//   }
// }
// /**
//  * Creates an https agent for fetch from the agentOptions key passed in params.
//  * @function
//  * @param {object} params - data
//  * @returns {Operation}
//  */
// function withAgent(params) {
//   const { agentOptions } = params;
//   return {
//     ...params,
//     httpsAgent: agentOptions && new https.Agent(agentOptions),
//   };
// }

// function buildRequest(url, params) {
//   const { method, headers, body, query, ...otherParams } = params;

//   const initialOptions = {
//     method,
//     headers,
//     dispatcher: new https.Agent({ keepAlive: true }),
//     otherParams,
//   };

//   switch (method) {
//     case 'GET':
//       return new Request(
//         `${url}?${new URLSearchParams(query).toString()}`,
//         ...withAgent(initialOptions)
//       );
//     case 'HEAD':
//       return new Request(url, ...withAgent(initialOptions));
//     default:
//       return new Request(url, {
//         ...withAgent(initialOptions),
//         body: body ? JSON.stringify(body) : body,
//       });
//   }
// }

// // Wrapper for all requests, handles errors and logs
// export async function request(method, url, options) {
//   // method: 'GET', // POST, PUT, DELETE, HEAD, etc.
//   const defaultOptions = {
//     headers: {
//       // the content type header value is usually auto-set
//       // depending on the request body
//     },
//     body: undefined, //Blob, ArrayBuffer, TypedArray, Dataview, URLSearchParms, ReadableStream >> GET or HEAD method cannot have body,
//     mode: 'cors', // cors, no-cors, same-origin
//     credentials: 'same-origin', // omit, same-origin, include
//     cache: 'default', // default, no-store, reload, no-cache, force-cache and only-if-cached
//     redirect: 'follow', // follow, error, manual
//     referrer: 'about:client', // A string specifying the referrer of the request. This can be a same-origin URL, about:client, or an empty string.,
//     referrerPolicy: 'strict-origin-when-cross-origin', // no-referrer-when-downgrade, no-referrer, origin, same-origin...
//     integrity: '', //a hash, like "sha256-abcdef1234567890"
//     keepAlive: true,
//     signal: undefined, // AbortController to abort request
//     priority: 'auto', //Specifies the priority of the fetch request relative to other requests of the same. Must be one of the following strings: high, low, auto
//     query: {}, // An object implementing `URLSearchParams.string()` which returns a string containing a query string suitable for use in a URL.
//   };

//   const { data, headers, ...otherOptions } = {
//     ...defaultOptions,
//     ...options,
//   };

//   const request = buildRequest(url, method, otherOptions, data, headers);

//   const response = await fetch(request);
//   // const response = await fetch(resolvedUrl, options);
//   const results = await response.json();

//   handleResponseError(response, results, method);

//   return results;
// }

import { fetch } from 'undici';

export async function request(method, url, options = {}) {
  const headers = { ...options.headers };

  if (!headers['Content-Type'] && options.body) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const responseBody = await readResponseBody(response);

  if (response.statusCode >= 400) {
    const error = new Error(
      `Request to ${url} failed with status: ${response.statusCode}`
    );
    error.status = response.statusCode;
    error.body = responseBody;
    error.url = url;
    error.message = `Request to ${url} failed with status: ${response.statusCode}`;
    throw error;
  }

  return {
    status: response.statusCode,
    headers: response.headers,
    body: responseBody,
  };
}

async function readResponseBody(response) {
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    const chunks = [];
    for await (const chunk of response.body) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString();
  }
}

// Functions for different HTTP methods
export async function get(url, options = {}) {
  return request('GET', url, options);
}

export async function post(url, options = {}) {
  return request('POST', url, options);
}

export async function put(url, options = {}) {
  return request('PUT', url, options);
}

export async function del(url, options = {}) {
  return request('DELETE', url, options);
}

// Example usage
(async () => {
  try {
    const getUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    const nonExistentUrl = 'https://jsonplaceholder.typicode.com/nonexistent';

    const getResult = await get(getUrl);
    console.log('GET Result:', getResult);

    const nonexistentResult = await get(nonExistentUrl);
    console.log('Nonexistent GET Result:', nonexistentResult);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
