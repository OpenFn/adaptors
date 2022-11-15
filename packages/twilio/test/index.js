import chai from 'chai';
const { expect } = chai;

import nock from 'nock';
const { back } = nock;

import ClientFixtures, { fixtures } from './ClientFixtures';

import Adaptor from '../src';
const { execute, sendSMS, dataValue } = Adaptor;

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
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

// TODO: add a test for sendSMS
// describe('sendSMS', () => {
//   before(() => {
//     nock('https://api.twilio.com/')
//       .post('/2010-04-01/Accounts/ACsecret/Messages.json')
//       .reply(200, (uri, requestBody) => {
//         return { ...requestBody, fullName: 'Mamadou', gender: 'M' };
//       });
//   });

//   it('will enqueue an SMS via Twilio', async () => {
//     const state = {
//       configuration: {
//         accountSid: 'ACsecret',
//         authToken: 'evenMoreSecret',
//       },
//       data: {
//         fullName: 'Mamadou',
//         phone: '+19147157445',
//       },
//     };
//
//     const finalState = await execute(
//       sendSMS({
//         from: '+19138675309',
//         name: dataValue('fullName')(state),
//         to: dataValue('phone')(state),
//       })
//     )(state);
//     expect(finalState.data).to.eql({});
//   });
// });
