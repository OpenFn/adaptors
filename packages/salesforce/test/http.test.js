import { expect } from 'chai';
import { http, setMockConnection } from '../src/index';

describe('http', () => {
  describe('request', () => {
    let reqArgs;
    beforeEach(() => {
      const fakeConnection = {
        request: args => {
          reqArgs = args;
          return Promise.resolve({ label: 'Account' });
        },
      };

      setMockConnection(fakeConnection);
    });

    it('should use relative path from root', done => {
      http
        .request('/services/data/v46.0/sobjects/Account/describe')({})
        .then(({ data }) => {
          expect(reqArgs).to.eql({
            body: undefined,
            headers: { 'content-type': 'application/json' },
            method: 'GET',
            url: '/services/data/v46.0/sobjects/Account/describe',
          });
          expect(data.label).to.eq('Account');
        })
        .then(done)
        .catch(done);
    });

    it('should use relative path from version root', done => {
      http
        .request('/sobjects/Account/describe')({})
        .then(({ data }) => {
          expect(reqArgs).to.eql({
            body: undefined,
            headers: { 'content-type': 'application/json' },
            method: 'GET',
            url: '/sobjects/Account/describe',
          });
          expect(data.label).to.eq('Account');
        })
        .then(done)
        .catch(done);
    });
  });
  describe('get', () => {
    it('should append correct query parameters to the request URL', done => {
      let reqArgs;
      const fakeConnection = {
        request: args => {
          reqArgs = args;
          return Promise.resolve({
            latestDateCovered: '2020-01-01T00:00:00Z',
          });
        },
      };
      setMockConnection(fakeConnection);
      const state = {};

      const startDate = '2020-01-01T00:00:00Z';
      const endDate = '2020-01-02T00:00:00Z';
      http
        .get('/sobjects/Account/updated', {
          query: { start: startDate, end: endDate },
        })(state)
        .then(state => {
          expect(reqArgs.url).to.include(
            `start=${encodeURIComponent(startDate)}`
          );
          expect(reqArgs.url).to.include(`end=${encodeURIComponent(endDate)}`);
          expect(reqArgs.method).to.eql('GET');
          expect(state.data).to.eql({
            latestDateCovered: '2020-01-01T00:00:00Z',
          });
        })
        .then(done)
        .catch(done);
    });
    it('fetches an account record', done => {
      let reqArgs;
      const fakeConnection = {
        request: args => {
          reqArgs = args;
          return Promise.resolve({ Id: 10 });
        },
      };
      setMockConnection(fakeConnection);
      const state = {};

      http
        .get('/services/data/v58.0/sobjects/Account/10')(state)
        .then(state => {
          expect(reqArgs).to.eql({
            body: undefined,
            headers: { 'content-type': 'application/json' },
            method: 'GET',
            url: '/services/data/v58.0/sobjects/Account/10',
          });

          expect(state.data).to.eql({ Id: 10 });
        })
        .then(done)
        .catch(done);
    });
  });
  describe('post', () => {
    it('should post a request to Salesforce', done => {
      let reqArgs;
      const fakeConnection = {
        request: args => {
          reqArgs = args;
          return Promise.resolve({
            id: '0015g00000LJ2wGAAT',
            success: true,
            errors: [],
          });
        },
      };
      setMockConnection(fakeConnection);
      const state = {};

      http
        .post('/sobjects/Account', {
          Name: 'test',
        })(state)
        .then(state => {
          expect(reqArgs).to.eql({
            body: JSON.stringify({ Name: 'test' }),
            headers: {
              'content-type': 'application/json',
            },
            method: 'POST',
            url: '/sobjects/Account',
          });

          expect(state.data.success).to.eql(true);
        })
        .then(done)
        .catch(done);
    });
  });
});
