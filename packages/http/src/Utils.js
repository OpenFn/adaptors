import safeStringify from 'fast-safe-stringify';

export function setUrl(baseUrl, path) {
  if (isValidHttpUrl(path)) return path;

  if (baseUrl)
    return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\/+/g, '')}`;

  return path;
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

export function basicAuth(username, password, headers) {
  if (username && password) {
    const base64Encode = btoa(`${username}:${password}`);
    headers['Authorization'] = `Basic ${base64Encode}`;

    return headers;
  }
  return null;
}

export function setAuth(configuration, manualAuth) {
  if (manualAuth) return manualAuth;
  else if (configuration && configuration.username)
    return {
      username: configuration.username,
      password: configuration.password,
    };
  else return null;
}

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
