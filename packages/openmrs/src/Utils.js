import { composeNextState } from '@openfn/language-common';

export const Log = {
  success: message => console.log(`✓ Success at ${new Date()}:\n∟ ${message}`),
  warn: message => console.log(`⚠ Warning at ${new Date()}:\n∟ ${message}`),
  error: message => console.log(`✗ Error at ${new Date()}:\n∟ ${message}`),
  info: message => console.log(`ℹ Info at ${new Date()}:\n∟ ${message}`),
};

export function handleError(error) {
  if (error.response) {
    const { method, path } = error.response.req;
    const { status } = error.response;
    if (Object.keys(error.response.body).length === 0) {
      throw new Error(
        `Server responded with:  \n${JSON.stringify(error.response, null, 2)}`
      );
    }

    const errorString = [
      `Request: ${method} ${path}`,
      `Got: ${status}`,
      'Body:',
      JSON.stringify(error.response.body, null, 2),
    ].join('\n');

    throw new Error(errorString);
  } else {
    throw error;
  }
}

export function handleResponse(response, state, callback) {
  const { body } = response;
  const nextState = composeNextState(state, { body });
  if (callback) return callback(nextState);
  return nextState;
}

const isArray = variable => !!variable && variable.constructor === Array;

export function nestArray(data, key) {
  return isArray(data) ? { [key]: data } : data;
}
