import { composeNextState } from '@openfn/language-common';

export function tryJson(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return { body: data };
  }
}

export function isObjectEmpty(objectName) {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
}

export function handleResponse(response, state, callback) {
  if (callback) return callback(composeNextState(state, response));
  return composeNextState(state, response);
}

export function handleLog(message, state) {
  console.log(`✓ Success at ${new Date()}:\n∟`, message);
  return state;
}

export function handleError(error, throwError = false) {
  const errorString = `✗ Error at ${new Date()}:\n∟ ${error}`;
  if (throwError) throw new Error(errorString);
  return console.log(errorString);
}
