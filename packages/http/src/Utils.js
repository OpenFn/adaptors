import safeStringify from 'fast-safe-stringify';

// TODO call this something like addBasicAuth
// TODO add support for tls on config
export function basicAuth(configuration, headers) {
  const username = configuration?.username;
  const password = configuration?.password;
  if (username && password) {
    const base64Encode = btoa(`${username}:${password}`);
    headers['Authorization'] = `Basic ${base64Encode}`;

    return headers;
  }
  return null;
}

// TODO do we still need this ?
export function assembleError({ response, error, params }) {
  if (response) {
    const customCodes = params?.options?.successCodes;
    const status = response?.status || response?.statusCode;

    if ((customCodes || [200, 201, 202]).indexOf(status) > -1) {
      return false;
    }
  }

  if (error) return error;

  // NOTE: we provide a smaller error output here for readability.
  // Power users can still access the http functions or axios for debugging.
  delete response.request;
  delete response.connection;
  return new Error(safeStringify(response, null, 2));
}

// TODO, remove this
export function tryJson(data) {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return { body: data };
    }
  }
  return data;
}
