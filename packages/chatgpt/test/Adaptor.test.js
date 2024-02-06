import { expect } from 'chai';
import { promptChatGpt } from '../src/Adaptor.js';

import MockAgent from './mockAgent.js';
import { setGlobalDispatcher } from 'undici';

setGlobalDispatcher(MockAgent);

describe('Prompt OpenAI Model', () => {
  it('Should produce AI generated content.', async () => {
    const finalState = await promptChatGpt('generate nodejs hello world app!');
    finalState().then(e =>
      expect(e[0].message.content).to.contains('console.log')
    );
  });
});
