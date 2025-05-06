import chai from 'chai';
const { expect } = chai
import Adaptor from '../src';
const { execute, send } = Adaptor;
import { util, fields } from '../src';

describe.skip('execute', () => {
  it('sends an Email and expects a confirmation response', done => {
    let state = {
      configuration: {
        // TODO: this api key is expired and so this test is failing
        apiKey: 'key-e5f5d6dd3f516de19e46dc1554d2d714',
        domain: 'sandbox7b016987bd5f414aa72dcbc5c672f279.mailgun.org',
      },
      data: {},
    };

    execute(
      send(
        fields(
          util.field(
            'from',
            'Test Mailgun <postmaster@sandbox7b016987bd5f414aa72dcbc5c672f279.mailgun.org>'
          ),
          util.field('to', 'santiago@openfn.org'),
          util.field('subject', 'Test language-mailgun Mail'),
          util.field(
            'text',
            'This email checks that language-mailgun send method is working'
          )
        )
      )
    )(state)
      .then(finalState => {
        expect(finalState.data.id);
      })
      .then(done)
      .catch(done);
  });
});
