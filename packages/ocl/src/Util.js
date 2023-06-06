import { composeNextState } from '@openfn/language-common';

export const Log = (() => {
  const timestamp = new Date();

  const log = (type, message) => {
    let logType = '';
    switch (type) {
      case 'success':
        logType = '✓ Success';
        break;
      case 'warn':
        logType = '⚠ Warning';
        break;
      case 'error':
        logType = '✗ Error';
        break;
      default:
        logType = 'ℹ Info';
    }

    console.log(`${logType} at ${timestamp}:\n∟`, message);
  };

  const logMessage = message => log('default', message);

  const logWrapper = (...args) => {
    if (args.length === 1) {
      logMessage(args[0]);
    } else {
      log(...args);
    }
  };

  return Object.assign(logWrapper, {
    info: message => log('info', message),
    success: message => log('success', message),
    warn: message => log('warn', message),
    error: message => log('error', message),
  });
})();

export function buildUrl(configuration, options) {
  const {
    owner,
    owner_type,
    repository,
    repositoryId,
    version,
    content,
    ...query
  } = options;

  const { baseUrl } = configuration;

  const urlParts = [
    baseUrl,
    owner_type,
    owner,
    repository,
    repositoryId,
    version,
    content,
  ].filter(urlPart => urlPart);
  const url = urlParts.join('/');

  return { url, query: query };
}

export function handleResponse(response, state, callback) {
  const { status, request, data } = response;
  const { method, path } = request;

  const responseString = [
    `Request: ${method} "${path}"`,
    `Got: ${status}`,
    `Retrieved "${data.length}" data`,
  ].join('\n∟ ');

  Log.success(responseString);

  const nextState = {
    ...composeNextState(state, response.data),
    response,
  };
  if (callback) return callback(nextState);
  return nextState;
}

export function handleError(error) {
  if (error.response) {
    const { method, path } = error.response.request;
    const { status } = error.response;
    if (Object.keys(error.response.data).length === 0) {
      throw new Error(
        `Server responded with:  \n${JSON.stringify(error.response, null, 2)}`
      );
    }

    const errorString = [
      `Request: ${method} ${path}`,
      `Got: ${status}`,
      `Body: ${JSON.stringify(error.response.data, null, 2).replace(
        /\n/g,
        '\n\t  '
      )}`,
    ].join('\n\t∟ ');

    throw new Error(errorString);
  } else {
    throw error;
  }
}
