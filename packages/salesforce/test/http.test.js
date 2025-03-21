import { expect } from 'chai';
import sinon from 'sinon';

import * as http from '../src/http';

describe('http', () => {
  describe('request', () => {
    let spy;
    const fakeConnection = {
      request: () => Promise.resolve({ label: 'Account' }),
    };
    let state = { connection: fakeConnection };

    beforeEach(() => {
      spy = sinon.spy(fakeConnection, 'request');
    });

    afterEach(() => {
      spy.restore(); // This restores all Sinon stubs and spies
    });

    it('should use relative path from root', done => {
      http
        .request('/services/data/v46.0/sobjects/Account/describe')(state)
        .then(({ data }) => {
          expect(spy.args[0]).to.eql([
            {
              body: undefined,
              headers: undefined,
              method: 'GET',
              url: '/services/data/v46.0/sobjects/Account/describe',
            },
          ]);
          expect(spy.called).to.eql(true);
          expect(data.label).to.eq('Account');
        })
        .then(done)
        .catch(done);
    });

    it('should use relative path from version root', done => {
      http
        .request('/sobjects/Account/describe')(state)
        .then(({ data }) => {
          expect(spy.args[0]).to.eql([
            {
              body: undefined,
              headers: undefined,
              method: 'GET',
              url: '/sobjects/Account/describe',
            },
          ]);
          expect(spy.called).to.eql(true);
          expect(data.label).to.eq('Account');
        })
        .then(done)
        .catch(done);
    });
  });
  describe('get', () => {
    it('fetches an account record', done => {
      const fakeConnection = {
        requestGet: function () {
          return Promise.resolve({ Id: 10 });
        },
      };
      let state = { connection: fakeConnection, references: [] };

      let spy = sinon.spy(fakeConnection, 'requestGet');

      http
        .get('/services/data/v58.0/sobjects/Account/10')(state)
        .then(state => {
          expect(spy.args[0]).to.eql([
            '/services/data/v58.0/sobjects/Account/10',
            {},
          ]);
          expect(spy.called).to.eql(true);
          expect(state.data).to.eql({ Id: 10 });
        })
        .then(done)
        .catch(done);
    });
  });
});
