"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUrl = setUrl;
exports.setAuth = setAuth;
exports.assembleError = assembleError;
exports.tryJson = tryJson;

function setUrl(configuration, path) {
  if (configuration && configuration.baseUrl) return configuration.baseUrl + path;else return path;
}

function setAuth(configuration, manualAuth) {
  if (manualAuth) return manualAuth;else if (configuration && configuration.username) return {
    username: configuration.username,
    password: configuration.password,
    sendImmediately: configuration.authType != 'digest'
  };else return null;
}

function assembleError(_ref) {
  var response = _ref.response,
      error = _ref.error,
      params = _ref.params;

  if (response) {
    var customCodes = params && params.options && params.options.successCodes;
    if ((customCodes || [200, 201, 202]).indexOf(response.statusCode) > -1) return false;
  }

  if (error) return error;
  return new Error("Server responded with:  \n".concat(JSON.stringify(response, null, 2)));
}

function tryJson(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return {
      body: data
    };
  }
}