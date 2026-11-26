import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { prompt, chat, request } from '../src/index.js';

const API_KEY = 'test-api-key';

// The default base URL is https://backend.thaura.ai/v1. The mock client
// refuses any request that no interceptor matches, so no test reaches the
// network.
const testServer = enableMockClient('https://backend.thaura.ai');

const completion = {
  id: 'chatcmpl-123',
  object: 'chat.completion',
  created: 1764000000,
  model: 'thaura',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content: 'Clinic visits rose by 12% this month.',
        refusal: null,
      },
      finish_reason: 'stop',
    },
  ],
  usage: { prompt_tokens: 25, completion_tokens: 9, total_tokens: 34 },
};

const rateLimited = {
  error: {
    message:
      'Rate limit reached for this API key. Please slow down and retry shortly.',
    type: 'rate_limit_error',
    code: 'rate_limit_exceeded',
  },
};

// Records the JSON body the adaptor sent, and matches any JSON body
const captureBody = sent => body => {
  if (typeof body !== 'string') {
    return false;
  }
  sent.body = JSON.parse(body);
  return true;
};

describe('prompt', () => {
  it('sends the prompt as a user message to the default model', async () => {
    const sent = {};
    testServer
      .intercept({
        path: '/v1/chat/completions',
        method: 'POST',
        headers: { authorization: `Bearer ${API_KEY}` },
        body: captureBody(sent),
      })
      .reply(200, completion);

    const state = { configuration: { apiKey: API_KEY } };

    await prompt('Summarize the monthly report.')(state);

    expect(sent.body).to.eql({
      model: 'thaura',
      messages: [{ role: 'user', content: 'Summarize the monthly report.' }],
      stream: false,
    });
  });

  it('writes the chat completion to state.data', async () => {
    testServer
      .intercept({ path: '/v1/chat/completions', method: 'POST' })
      .reply(200, completion);

    const state = { configuration: { apiKey: API_KEY } };

    const finalState = await prompt('Summarize the monthly report.')(state);

    expect(finalState.data).to.eql(completion);
    expect(finalState.response.statusCode).to.equal(200);
    expect(finalState.response).not.to.have.property('body');
  });

  it('sends the system prompt before the user message', async () => {
    const sent = {};
    testServer
      .intercept({
        path: '/v1/chat/completions',
        method: 'POST',
        body: captureBody(sent),
      })
      .reply(200, completion);

    const state = { configuration: { apiKey: API_KEY } };

    await prompt('What is a cold chain?', {
      system: 'Answer in one sentence.',
    })(state);

    expect(sent.body.messages).to.eql([
      { role: 'system', content: 'Answer in one sentence.' },
      { role: 'user', content: 'What is a cold chain?' },
    ]);
    expect(sent.body).not.to.have.property('system');
  });

  it('passes chat parameters through to the API', async () => {
    const sent = {};
    testServer
      .intercept({
        path: '/v1/chat/completions',
        method: 'POST',
        body: captureBody(sent),
      })
      .reply(200, completion);

    const state = { configuration: { apiKey: API_KEY } };

    await prompt('Write a short reminder.', {
      max_tokens: 200,
      temperature: 0.5,
      seed: 42,
    })(state);

    expect(sent.body).to.include({
      max_tokens: 200,
      temperature: 0.5,
      seed: 42,
    });
  });

  it('always sends the prompt, even if params include messages', async () => {
    const sent = {};
    testServer
      .intercept({
        path: '/v1/chat/completions',
        method: 'POST',
        body: captureBody(sent),
      })
      .reply(200, completion);

    const state = { configuration: { apiKey: API_KEY } };

    await prompt('The real prompt', {
      messages: [{ role: 'user', content: 'Something else' }],
    })(state);

    expect(sent.body.messages).to.eql([
      { role: 'user', content: 'The real prompt' },
    ]);
  });

  it('reads the prompt from state', async () => {
    const sent = {};
    testServer
      .intercept({
        path: '/v1/chat/completions',
        method: 'POST',
        body: captureBody(sent),
      })
      .reply(200, completion);

    const state = {
      configuration: { apiKey: API_KEY },
      data: { question: 'How many doses are left?' },
    };

    await prompt(s => s.data.question)(state);

    expect(sent.body.messages).to.eql([
      { role: 'user', content: 'How many doses are left?' },
    ]);
  });

  it('uses the baseUrl from the configuration', async () => {
    const customBase = enableMockClient('https://ai.example.org');
    customBase
      .intercept({ path: '/thaura/v1/chat/completions', method: 'POST' })
      .reply(200, completion);

    const state = {
      configuration: {
        apiKey: API_KEY,
        baseUrl: 'https://ai.example.org/thaura/v1',
      },
    };

    const finalState = await prompt('Hello')(state);

    expect(finalState.data).to.eql(completion);
  });

  it('throws if the message is empty', async () => {
    const state = { configuration: { apiKey: API_KEY } };

    const error = await prompt('  ')(state).catch(e => e);

    expect(error.message).to.equal('message must be a non-empty string.');
  });

  it('throws if streaming is requested', async () => {
    const state = { configuration: { apiKey: API_KEY } };

    const error = await prompt('Hello', { stream: true })(state).catch(e => e);

    expect(error.message).to.match(/^Streaming is not supported/);
  });

  it('throws if the configuration has no apiKey', async () => {
    const state = { configuration: {} };

    const error = await prompt('Hello')(state).catch(e => e);

    expect(error.message).to.equal('apiKey missing from configuration.');
  });

  it('retries after a rate limit, waiting as long as the API asks', async () => {
    testServer
      .intercept({ path: '/v1/chat/completions', method: 'POST' })
      .reply(429, rateLimited, { headers: { 'retry-after': '0' } });
    testServer
      .intercept({ path: '/v1/chat/completions', method: 'POST' })
      .reply(200, completion);

    const state = { configuration: { apiKey: API_KEY } };

    const finalState = await prompt('Hello')(state);

    expect(finalState.data).to.eql(completion);
  });

  it("throws with the API's error message and code when the rate limit persists", async () => {
    testServer
      .intercept({ path: '/v1/chat/completions', method: 'POST' })
      .reply(429, rateLimited, { headers: { 'retry-after': '0' } })
      .times(3);

    const state = { configuration: { apiKey: API_KEY } };

    const error = await prompt('Hello')(state).catch(e => e);

    expect(error.statusCode).to.equal(429);
    expect(error.code).to.equal('rate_limit_exceeded');
    expect(error.message).to.equal(
      'POST to https://backend.thaura.ai/v1/chat/completions returned 429: Too Many Requests: Rate limit reached for this API key. Please slow down and retry shortly.'
    );
  });

  it('explains how to avoid a timeout without suggesting streaming', async () => {
    testServer
      .intercept({ path: '/v1/chat/completions', method: 'POST' })
      .reply(504, {
        error: {
          message:
            'The answer took longer than a request without streaming can wait (315 s). Ask again with "stream": true for a long answer. Nothing was billed.',
          type: 'server_error',
          code: 'upstream_timeout',
        },
      });

    const state = { configuration: { apiKey: API_KEY } };

    const error = await prompt('Write a long report.')(state).catch(e => e);

    expect(error.code).to.equal('upstream_timeout');
    expect(error.message).to.include('lower max_tokens');
    expect(error.message).not.to.include('stream');
  });
});

describe('chat', () => {
  it('sends the conversation as given', async () => {
    const sent = {};
    testServer
      .intercept({
        path: '/v1/chat/completions',
        method: 'POST',
        headers: { authorization: `Bearer ${API_KEY}` },
        body: captureBody(sent),
      })
      .reply(200, completion);

    const messages = [
      { role: 'system', content: 'You are a concise assistant.' },
      { role: 'user', content: 'What is 2+2?' },
      { role: 'assistant', content: '4' },
      { role: 'user', content: 'And in binary?' },
    ];
    const state = { configuration: { apiKey: API_KEY } };

    await chat(messages)(state);

    expect(sent.body).to.eql({ model: 'thaura', messages, stream: false });
  });

  it('writes the chat completion to state.data', async () => {
    testServer
      .intercept({ path: '/v1/chat/completions', method: 'POST' })
      .reply(200, completion);

    const state = { configuration: { apiKey: API_KEY } };

    const finalState = await chat([{ role: 'user', content: 'Hi' }])(state);

    expect(finalState.data).to.eql(completion);
  });

  it('passes chat parameters through to the API', async () => {
    const sent = {};
    testServer
      .intercept({
        path: '/v1/chat/completions',
        method: 'POST',
        body: captureBody(sent),
      })
      .reply(200, completion);

    const state = { configuration: { apiKey: API_KEY } };

    await chat([{ role: 'user', content: 'Extract the name: Amina, 34' }], {
      response_format: { type: 'json_object' },
      max_tokens: 100,
    })(state);

    expect(sent.body.response_format).to.eql({ type: 'json_object' });
    expect(sent.body.max_tokens).to.equal(100);
  });

  it('reads the messages from state', async () => {
    const sent = {};
    testServer
      .intercept({
        path: '/v1/chat/completions',
        method: 'POST',
        body: captureBody(sent),
      })
      .reply(200, completion);

    const state = {
      configuration: { apiKey: API_KEY },
      data: { conversation: [{ role: 'user', content: 'Hello' }] },
    };

    await chat(s => s.data.conversation)(state);

    expect(sent.body.messages).to.eql([{ role: 'user', content: 'Hello' }]);
  });

  it('throws if there are no messages', async () => {
    const state = { configuration: { apiKey: API_KEY } };

    const error = await chat([])(state).catch(e => e);

    expect(error.message).to.equal('messages must be a non-empty array.');
  });
});

describe('request', () => {
  it('sends an authenticated request to a path under the base URL', async () => {
    const models = {
      object: 'list',
      data: [{ id: 'thaura', object: 'model', owned_by: 'thaura' }],
    };
    testServer
      .intercept({
        path: '/v1/models',
        method: 'GET',
        headers: { authorization: `Bearer ${API_KEY}` },
      })
      .reply(200, models);

    const state = { configuration: { apiKey: API_KEY } };

    const finalState = await request('GET', 'models')(state);

    expect(finalState.data).to.eql(models);
  });

  it('sends the body, query and headers', async () => {
    const sent = {};
    testServer
      .intercept({
        path: '/v1/audio/transcriptions?language=en',
        method: 'POST',
        headers: {
          authorization: `Bearer ${API_KEY}`,
          'content-type': 'application/json',
          'x-request-id': 'job-42',
        },
        body: captureBody(sent),
      })
      .reply(200, { text: 'Hello' });

    const state = { configuration: { apiKey: API_KEY } };

    const finalState = await request(
      'POST',
      'audio/transcriptions',
      { model: 'thaura-whisper' },
      { query: { language: 'en' }, headers: { 'x-request-id': 'job-42' } }
    )(state);

    expect(sent.body).to.eql({ model: 'thaura-whisper' });
    expect(finalState.data).to.eql({ text: 'Hello' });
  });

  it('never lets a header from job code replace the API key', async () => {
    let sentHeaders;
    testServer
      .intercept({
        path: '/v1/models',
        method: 'GET',
        headers: h => {
          sentHeaders = h;
          return true;
        },
      })
      .reply(200, { object: 'list', data: [] });

    const state = { configuration: { apiKey: API_KEY } };

    await request('GET', 'models', undefined, {
      headers: { Authorization: 'Bearer someone-else' },
    })(state);

    const auth = Object.entries(sentHeaders)
      .filter(([name]) => name.toLowerCase() === 'authorization')
      .map(([, value]) => value);
    expect(auth).to.eql([`Bearer ${API_KEY}`]);
  });

  it('refuses an absolute URL, so the API key is never sent elsewhere', async () => {
    const state = { configuration: { apiKey: API_KEY } };

    const error = await request(
      'GET',
      'https://example.com/steal'
    )(state).catch(e => e);

    expect(error.code).to.equal('UNEXPECTED_ABSOLUTE_URL');
  });

  it('refuses a path that leads to another host', async () => {
    const state = { configuration: { apiKey: API_KEY } };

    const error = await request(
      'GET',
      '../../example.com/steal'
    )(state).catch(e => e);

    expect(error.code).to.equal('UNEXPECTED_HOST');
  });
});
