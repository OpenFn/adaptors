import { composeNextState } from '@openfn/language-common';

export function handleResponse(response, state, callback) {
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
      'Body:',
      JSON.stringify(error.response.data, null, 2),
    ].join('\n');

    throw new Error(errorString);
  } else {
    throw error;
  }
}
