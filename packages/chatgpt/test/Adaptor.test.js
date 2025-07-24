import { expect } from 'chai';
import { prompt, setMockClient, deepResearch } from '../src/Adaptor.js';
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

describe('deep research', () => {
  it('sends a deep research post request to OpenAI', async () => {
    // Setup a mock endpoint

    const mock = {
 
        responses: {
          create: ({ model, input , tools}) => {
            expect(model).to.eql('o3-deep-research');
            expect(input).to.eql('Give a list of all newly registered healthcare facilities in the last 30 days.');
            expect(tools).to.eql([{ type: 'web_search_preview' }]);

            return testData.deep_research_response
          }
        }
    };

    const state = {
      configuration: {
        apiKey: 'secret',
      },
    };

    setMockClient(mock)

    const finalState = await deepResearch('Give a list of all newly registered healthcare facilities in the last 30 days.')(state);

    expect(finalState.data).to.eql(testData.deep_research_response);
  });
});