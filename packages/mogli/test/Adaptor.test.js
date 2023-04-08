import { expect } from 'chai';
import sinon from 'sinon';
import {
  reference,
  createSMS,
  steps,
  each,
  field,
  fields,
  dataValue,
  execute,
} from '../src/Adaptor';

import testData from './testData' assert { type: 'json' };

describe('Adaptor', () => {
  describe('reference', () => {
    it('returns the Id of a previous operation', () => {
      let state = { references: [{ id: '12345' }] };
      let Id = reference(0, state);
      expect(Id).to.eql('12345');
    });
  });

  describe('createSMS', () => {
    it('makes a new SMS in Mogli', done => {
      const fakeConnection = {
        loginUrl: 'https://na8.salesforce.fake.com',
        accessToken: '8675309',
        createSMS: function () {
          return Promise.resolve({ Id: 10 });
        },
      };
      let state = {
        configuration: { loginUrl: 'https://www.login.salesforce.com' },
        connection: fakeConnection,
        references: [],
      };

      let fields = { field: 'value' };

      let spy = sinon.spy(fakeConnection, 'createSMS');

      fakeConnection
        .createSMS(fields, state)
        .then(state => {
          // TODO: finish tests...
          // expect(spy.args[0]).to.eql(fields);
          expect(spy.called).to.eql(true);
          // expect(state.references[0]).to.eql({Id: 10})
        })
        .then(done)
        .catch(done);
    });
  });
});
