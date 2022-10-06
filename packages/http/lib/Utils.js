"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUrl = setUrl;
exports.setAuth = setAuth;
exports.assembleError = assembleError;
exports.tryJson = tryJson;
exports.mapToAxiosConfig = mapToAxiosConfig;

var _formData = _interopRequireDefault(require("form-data"));

var _fp = require("lodash/fp");

var _fastSafeStringify = _interopRequireDefault(require("fast-safe-stringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setUrl(configuration, path) {
  const baseUrl = configuration === null || configuration === void 0 ? void 0 : configuration.baseUrl;
  if (isValidHttpUrl(path)) return path;
  if (baseUrl) return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\/+/g, '')}`;
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

function setAuth(configuration, manualAuth) {
  if (manualAuth) return manualAuth;else if (configuration && configuration.username) return {
    username: configuration.username,
    password: configuration.password
  };else return null;
}

function assembleError({
  response,
  error,
  params
}) {
  if (response) {
    var _params$options;

    const customCodes = params === null || params === void 0 ? void 0 : (_params$options = params.options) === null || _params$options === void 0 ? void 0 : _params$options.successCodes;
    const status = (response === null || response === void 0 ? void 0 : response.status) || (response === null || response === void 0 ? void 0 : response.statusCode);

    if ((customCodes || [200, 201, 202]).indexOf(status) > -1) {
      return false;
    }
  }

  if (error) return error; // NOTE: we provide a smaller error output here for readability.
  // Power users can still access the http functions or axios for debugging.

  delete response.request;
  delete response.connection;
  return new Error((0, _fastSafeStringify.default)(response, null, 2));
}

function tryJson(data) {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return {
        body: data
      };
    }
  }

  return data;
}

function mapToAxiosConfig(requestConfig) {
  var _requestConfig, _requestConfig2, _requestConfig3, _requestConfig4, _requestConfig5, _requestConfig8, _requestConfig9, _requestConfig10, _requestConfig11, _requestConfig12, _requestConfig13, _requestConfig14, _requestConfig15, _requestConfig16, _requestConfig17, _requestConfig18, _requestConfig19, _requestConfig21, _requestConfig22;

  let form = null;
  const formData = ((_requestConfig = requestConfig) === null || _requestConfig === void 0 ? void 0 : _requestConfig.formData) || ((_requestConfig2 = requestConfig) === null || _requestConfig2 === void 0 ? void 0 : _requestConfig2.form);
  let headers = (_requestConfig3 = requestConfig) === null || _requestConfig3 === void 0 ? void 0 : _requestConfig3.headers;

  if (((_requestConfig4 = requestConfig) === null || _requestConfig4 === void 0 ? void 0 : _requestConfig4.gzip) === true) {
    headers = { ...headers,
      'Accept-Encoding': 'gzip, deflate'
    };
  }

  if (!(0, _fp.isEmpty)(formData)) {
    form = new _formData.default();
    Object.entries(formData).forEach(element => {
      form.append(element[0], element[1]);
    });
    const formHeaders = form.getHeaders();
    headers = { ...headers,
      ...formHeaders
    };
  }

  if ((_requestConfig5 = requestConfig) === null || _requestConfig5 === void 0 ? void 0 : _requestConfig5.json) {
    var _requestConfig6;

    headers = { ...headers,
      'Content-type': 'application/json'
    };

    if (typeof ((_requestConfig6 = requestConfig) === null || _requestConfig6 === void 0 ? void 0 : _requestConfig6.json) === 'object') {
      var _requestConfig7;

      requestConfig = { ...requestConfig,
        body: (_requestConfig7 = requestConfig) === null || _requestConfig7 === void 0 ? void 0 : _requestConfig7.json
      };
    }
  }

  const finalConfig = { ...requestConfig,
    url: ((_requestConfig8 = requestConfig) === null || _requestConfig8 === void 0 ? void 0 : _requestConfig8.url) ?? ((_requestConfig9 = requestConfig) === null || _requestConfig9 === void 0 ? void 0 : _requestConfig9.uri),
    // https:
    //   requestConfig?.https ??
    //   (requestConfig?.strictSSL &&
    //     new https.Agent({ rejectUnauthorized: false })),
    // method,
    // baseURL,
    // transformRequest,
    // transformResponse,
    headers,
    params: { ...((_requestConfig10 = requestConfig) === null || _requestConfig10 === void 0 ? void 0 : _requestConfig10.params),
      ...((_requestConfig11 = requestConfig) === null || _requestConfig11 === void 0 ? void 0 : _requestConfig11.qs),
      ...((_requestConfig12 = requestConfig) === null || _requestConfig12 === void 0 ? void 0 : _requestConfig12.query)
    },
    // paramsSerializer,
    data: ((_requestConfig13 = requestConfig) === null || _requestConfig13 === void 0 ? void 0 : _requestConfig13.data) ?? (((_requestConfig14 = requestConfig) === null || _requestConfig14 === void 0 ? void 0 : _requestConfig14.body) || form),
    // timeouts,
    // withCredentials,
    // adapter,
    auth: ((_requestConfig15 = requestConfig) === null || _requestConfig15 === void 0 ? void 0 : _requestConfig15.auth) ?? ((_requestConfig16 = requestConfig) === null || _requestConfig16 === void 0 ? void 0 : _requestConfig16.authentication),
    responseType: ((_requestConfig17 = requestConfig) === null || _requestConfig17 === void 0 ? void 0 : _requestConfig17.responseType) ?? 'json',
    responseEncoding: ((_requestConfig18 = requestConfig) === null || _requestConfig18 === void 0 ? void 0 : _requestConfig18.responseEncoding) ?? ((_requestConfig19 = requestConfig) === null || _requestConfig19 === void 0 ? void 0 : _requestConfig19.encoding),
    // xsrfCookieName,
    // xsrfHeaderName,
    // onUploadProgress,
    // onDownloadProgress,
    // maxContentLength,
    // maxBodyLength,
    validateStatus: status => {
      var _requestConfig20, _requestConfig20$opti;

      const customCodes = (_requestConfig20 = requestConfig) === null || _requestConfig20 === void 0 ? void 0 : (_requestConfig20$opti = _requestConfig20.options) === null || _requestConfig20$opti === void 0 ? void 0 : _requestConfig20$opti.successCodes;
      if (customCodes) return customCodes.includes(status);
      return status >= 200 && status < 300;
    },
    maxRedirects: ((_requestConfig21 = requestConfig) === null || _requestConfig21 === void 0 ? void 0 : _requestConfig21.maxRedirects) ?? (((_requestConfig22 = requestConfig) === null || _requestConfig22 === void 0 ? void 0 : _requestConfig22.followAllRedirects) === false ? 0 : 5) // socketPath,
    // httpAgent: requestConfig?.httpAgent ?? requestConfig?.agent,
    // httpsAgent,
    // proxy,
    // cancelToken,
    // decompress,

  };
  return finalConfig;
}