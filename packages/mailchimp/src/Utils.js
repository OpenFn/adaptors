import { composeNextState } from '@openfn/language-common';
import { Client, MockAgent } from 'undici';

let client;

export const getClient = baseUrl => {
  if (client) {
    return client;
  }
  return new Client(baseUrl);
};

export const enableMockClient = baseUrl => {
  const mockAgent = new MockAgent({ connections: 1 });
  client = mockAgent.get(baseUrl);
  return client;
};

export function handleResponse(response, state, callback) {
  const nextState = {
    ...composeNextState(state, response),
    response,
  };
  if (callback) return callback(nextState);
  return nextState;
}
