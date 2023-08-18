import { composeNextState } from '@openfn/language-common';
import { Client, MockAgent } from 'undici';

const clients = new Map();

export const getClient = baseUrl => {
  if (!clients.has(baseUrl)) {
    clients.set(baseUrl, new Client(baseUrl));
  }
  return clients.get(baseUrl);
};

export const enableMockClient = baseUrl => {
  const mockAgent = new MockAgent({ connections: 1 });
  const client = mockAgent.get(baseUrl);
  clients.set(baseUrl, client);
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
