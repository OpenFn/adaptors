import { expect } from 'chai';
import Adaptor from '../src';
const { execute, sendSMS } = Adaptor;

describe('execute', () => {
  it.skip('sends an SMS and expects a delivery status', done => {
    let state = {
      configuration: {
        apiKey: '613118f9',
        apiSecret: 'b7e9d82697feb58b',
      },
      data: {},
    };

    const from = 'OpenFn';
    const to = '56979395234';
    const message = 'Hello World!';

    execute(sendSMS(from, to, message))(state)
      .then(finalState => {
        expect(finalState.data.messages[0].status).to.eql('0');
      })
      .then(done)
      .catch(done);
  });
});
