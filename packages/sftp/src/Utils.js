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
