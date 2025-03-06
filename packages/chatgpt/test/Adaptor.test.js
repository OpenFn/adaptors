import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { prompt, createClient, execute } from '../src/Adaptor.js';
import testData from "./fixtures/fixture.json" assert {type: 'json'};


// This creates a mock client which acts like a fake server.
// It enables pattern-matching on the request object and custom responses
// For the full mock API see
// https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions
const testServer = enableMockClient('https://api.openai.com');

describe('prompt', () => {
  it('sends a post request to OpenAI', async () => {
    // Setup a mock endpoint
    testServer.intercept({
      path: '/v1/chat/completions',
      method:'POST'
    }).reply(200, {...testData.response});

    const state = {
      configuration: {
        apiKey: 'secret',
      },
    };

    let client = createClient(state);

    const finalState = await execute(prompt('Write a poem about surfing.'))(state);

    expect(finalState.data).to.eql(testData.response);
  });
});