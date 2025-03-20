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
    it('should append correct query parameters to the request URL', done => {
      const fakeConnection = {
        requestGet: () => {
          return Promise.resolve({ latestDateCovered: '2020-01-01T00:00:00Z' });
        },
      };
      let state = { connection: fakeConnection };

      let spy = sinon.spy(fakeConnection, 'requestGet');

      const startDate = '2020-01-01T00:00:00Z';
      const endDate = '2020-01-02T00:00:00Z';
      http
        .get('/sobjects/Account/updated', {
          query: { start: startDate, end: endDate },
        })(state)
        .then(state => {
          expect(spy.args[0][0]).to.include(
            `start=${encodeURIComponent(startDate)}`
          );
          expect(spy.args[0][0]).to.include(
            `end=${encodeURIComponent(endDate)}`
          );
          expect(spy.called).to.eql(true);
          expect(state.data).to.eql({
            latestDateCovered: '2020-01-01T00:00:00Z',
          });
        })
        .then(done)
        .catch(done);
    });
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
  describe('post', () => {
    it('should post a request to Salesforce', done => {
      const fakeConnection = {
        requestPost: () => {
          return Promise.resolve({
            id: '0015g00000LJ2wGAAT',
            success: true,
            errors: [],
          });
        },
      };
      let state = { connection: fakeConnection, references: [] };

      let spy = sinon.spy(fakeConnection, 'requestPost');

      http
        .post('/sobjects/Account', {
          body: { Name: 'test' },
        })(state)
        .then(state => {
          expect(spy.args[0]).to.eql([
            '/sobjects/Account',
            { body: { Name: 'test' } },
            {},
          ]);
          expect(spy.called).to.eql(true);
          expect(state.data.success).to.eql(true);
        })
        .then(done)
        .catch(done);
    });
  });
});
