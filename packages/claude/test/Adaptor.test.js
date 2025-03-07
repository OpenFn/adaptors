import { expect } from 'chai';
import { prompt, setMockClient } from '../src/Adaptor.js';

// This creates a mock client which acts like a fake server.
// It enables pattern-matching on the request object and custom responses
// For the full mock API see
// https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions
// const testServer = enableMockClient('https://api.anthropic.com');

describe('prompt', () => {
  it('sends a post request to Claude', async () => {
    const mock = {
      messages: {
        create: ({ model, max_tokens, messages }) => {
          expect(model).to.eql('claude-3-7-sonnet-20250219');
          expect(max_tokens).to.eql(1024);
          expect(messages).to.eql([
            { role: 'user', content: 'Write a poem about surfing.' },
          ]);

          return {
            id: 'msg_01UQMuLDXwzgrkUtfWG7X5Ep',
            type: 'message',
            role: 'assistant',
            model: 'claude-3-7-sonnet-20250219',
            content: [
              {
                type: 'text',
                text: 'Waves crest and tumble\nBalanced on liquid blue silk\nSalt kisses the soul',
              },
            ],
            stop_reason: 'end_turn',
            stop_sequence: null,
            usage: {
              input_tokens: 15,
              cache_creation_input_tokens: 0,
              cache_read_input_tokens: 0,
              output_tokens: 23,
            },
          };
        },
      },
    };
    setMockClient(mock);

    const state = {
      configuration: {
        apiKey: 'secret',
      },
    };

    const finalState = await prompt('Write a poem about surfing.')(state);

    expect(finalState.data).to.eql({
      id: 'msg_01UQMuLDXwzgrkUtfWG7X5Ep',
      type: 'message',
      role: 'assistant',
      model: 'claude-3-7-sonnet-20250219',
      content: [
        {
          type: 'text',
          text: 'Waves crest and tumble\nBalanced on liquid blue silk\nSalt kisses the soul',
        },
      ],
      stop_reason: 'end_turn',
      stop_sequence: null,
      usage: {
        input_tokens: 15,
        cache_creation_input_tokens: 0,
        cache_read_input_tokens: 0,
        output_tokens: 23,
      },
    });
  });
});
