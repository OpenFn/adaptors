import FormData from 'form-data';
import _ from 'lodash/fp';
import safeStringify from 'fast-safe-stringify';

const { isEmpty } = _;

export function setUrl(configuration, path) {
  const baseUrl = configuration?.baseUrl;

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

export function mapToAxiosConfig(reqConfig) {
  let form = null;

  let requestConfig = reqConfig;
  const formData = requestConfig?.formData || requestConfig?.form;

  let headers = requestConfig?.headers;

  if (requestConfig?.gzip === true) {
    headers = { ...headers, 'Accept-Encoding': 'gzip, deflate' };
  }
  if (!isEmpty(formData)) {
    form = new FormData();
    Object.entries(formData).forEach(element => {
      form.append(element[0], element[1]);
    });

    const formHeaders = form.getHeaders();

    headers = { ...headers, ...formHeaders };
  }

  if (requestConfig?.json) {
    headers = { ...headers, 'Content-type': 'application/json' };
    if (typeof requestConfig?.json === 'object') {
      requestConfig = { ...requestConfig, body: requestConfig?.json };
    }
  }

  const finalConfig = {
    ...requestConfig,
    url: requestConfig?.url ?? requestConfig?.uri,
    // https:
    //   requestConfig?.https ??
    //   (requestConfig?.strictSSL &&
    //     new https.Agent({ rejectUnauthorized: false })),
    // method,
    // baseURL,
    // transformRequest,
    // transformResponse,
    headers,
    params: {
      ...requestConfig?.params,
      ...requestConfig?.qs,
      ...requestConfig?.query,
    },
    // paramsSerializer,
    data: requestConfig?.data ?? (requestConfig?.body || form),
    // timeouts,
    // withCredentials,
    // adapter,
    auth: requestConfig?.auth ?? requestConfig?.authentication,
    responseType: requestConfig?.responseType ?? 'json',
    responseEncoding:
      requestConfig?.responseEncoding ?? requestConfig?.encoding,
    // xsrfCookieName,
    // xsrfHeaderName,
    // onUploadProgress,
    // onDownloadProgress,
    // maxContentLength,
    // maxBodyLength,
    validateStatus: status => {
      const customCodes = requestConfig?.options?.successCodes;
      if (customCodes) return customCodes.includes(status);
      return status >= 200 && status < 300;
    },
    maxRedirects:
      requestConfig?.maxRedirects ??
      (requestConfig?.followAllRedirects === false ? 0 : 5),
    // socketPath,
    // httpAgent: requestConfig?.httpAgent ?? requestConfig?.agent,
    // httpsAgent,
    // proxy,
    // cancelToken,
    // decompress,
  };
  return finalConfig;
}
