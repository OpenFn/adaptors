import { expect } from 'chai';
import { prompt, setMockClient } from '../src/Adaptor.js';
import testData from "./fixtures/fixture.json" assert {type: 'json'};


describe('prompt', () => {
  it('sends a post request to OpenAI', async () => {
    // Setup a mock endpoint

    const mock = {
      chat: {
        completions: {
          create: ({ model, messages }) => {
            expect(model).to.eql('o3-mini-2025-01-31');
            expect(messages).to.eql([
              { role: 'user', content: 'Write a poem about surfing.' },
            ]);

            return testData.response
          }
        }

      }
    };

    const state = {
      configuration: {
        apiKey: 'secret',
      },
    };

    setMockClient(mock)

    const finalState = await prompt('Write a poem about surfing.')(state);

    expect(finalState.data).to.eql(testData.response);
  });
});