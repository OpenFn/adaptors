import { expect } from 'chai';

import nock from 'nock';
import ClientFixtures, { fixtures } from './ClientFixtures';

import Adaptor from '../src';
const { execute, event, dataElement, send } = Adaptor;

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {};
    let operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    let state = {};

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});

describe('send', () => {
  let wishedBody = {
    recipient: 'alexis',
    sender: 'taylor',
    text: 'hi mom!',
    messageId: '1111',
    inboxId: '1c908151-8273-431c-b1d4-8bfe2b5c65df',
  };

  before(() => {
    nock('https://www.openfunction.io')
      .post('/smpp/1c908151-8273-431c-b1d4-8bfe2b5c65df/send')
      .reply(200, {
        status: 'SMS sent succesfully.',
        smsData: wishedBody,
      });
  });

  it('sends a message', () => {
    let state = {
      configuration: {
        systemId: 'lwr_airtel_niger',
        password: 'password',
        clientHost: 'https://www.openfunction.io',
        inboxId: '1c908151-8273-431c-b1d4-8bfe2b5c65df',
      },
      data: {
        from: 'taylor',
        to: 'alexis',
        text: 'hi mom!',
        messageId: '1111',
      },
    };

    return execute(
      send({
        text: state.data.text,
        message_uuid: state.data.message_uuid,
        recipient: state.data.to,
        sender: state.data.from,
      })
    )(state).then(state => {
      let responseBody = state.response.body.body;

      // Check that an HTTP post is made to the correct endpoint.
      expect(responseBody.status).to.eql('SMS sent succesfully.');
      // Check that the appropriate data made it to the request from state.
      expect(responseBody.smsData).to.eql({
        text: state.data.text,
        messageId: state.data.messageId,
        inboxId: state.configuration.inboxId,
        recipient: state.data.to,
        sender: state.data.from,
      });
    });
  });
});
