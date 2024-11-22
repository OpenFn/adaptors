import chai from 'chai';
import sinon from 'sinon';
import { create, upsert, toUTF8, execute, query, get } from '../src/Adaptor';

const { expect } = chai;

describe('Adaptor', () => {
  describe('get', () => {
    it('fetches an account record', done => {
      const fakeConnection = {
        request: function () {
          return Promise.resolve({ Id: 10 });
        },
      };
      let state = { connection: fakeConnection, references: [] };

      let spy = sinon.spy(fakeConnection, 'request');

      get('/services/data/v58.0/sobjects/Account/10')(state)
        .then(state => {
          expect(spy.args[0]).to.eql([
            {
              url: '/services/data/v58.0/sobjects/Account/10',
              method: 'GET',
              query: undefined,
              headers: { 'content-type': 'application/json' },
            },
          ]);
          expect(spy.called).to.eql(true);
          expect(state.data).to.eql({ Id: 10 });
        })
        .then(done)
        .catch(done);
    });
  });
  describe('create', () => {
    it('makes a new sObject', done => {
      const fakeConnection = {
        create: function () {
          return Promise.resolve({ Id: 10 });
        },
      };
      let state = { connection: fakeConnection, references: [] };

      let sObject = 'myObject';
      let fields = { field: 'value' };

      let spy = sinon.spy(fakeConnection, 'create');

      create(
        sObject,
        fields
      )(state)
        .then(state => {
          expect(spy.args[0]).to.eql([sObject, fields]);
          expect(spy.called).to.eql(true);
          expect(state.data).to.eql({ Id: 10 });
        })
        .then(done)
        .catch(done);
    });
  });

  describe('upsert', () => {
    it('is expected to call `upsert` on the connection', done => {
      const connection = {
        upsert: function () {
          return Promise.resolve({ Id: 10 });
        },
      };
      let state = { connection, references: [] };

      let sObject = 'myObject';
      let externalId = 'MyExternalId';
      let fields = { field: 'value' };

      let spy = sinon.spy(connection, 'upsert');

      upsert(
        sObject,
        externalId,
        fields
      )(state)
        .then(state => {
          expect(spy.args[0]).to.eql([sObject, fields, externalId]);
          expect(spy.called).to.eql(true);
          expect(state.data).to.eql({ Id: 10 });
        })
        .then(done)
        .catch(done);
    });
  });

  describe('toUTF8', () => {
    it('Transliterate unicode to ASCII representation', async () => {
      const state = {
        connection: {},
      };

      // Run toUTF8 inside an execute block to ensure that any-ascii gets loaded correctly
      const convert = str => execute(state => toUTF8(str))(state);

      let result = await convert('άνθρωποι');
      expect(result).to.eql('anthropoi');

      // Misc
      result = await convert('☆ ♯ ♰ ⚄ ⛌');
      expect(result).to.equal('* # + 5 X');

      // Emojis
      result = await convert('👑 🌴');
      expect(result).to.eql(':crown: :palm_tree:');

      // Letterlike
      result = await convert('№ ℳ ⅋ ⅍');
      expect(result).to.eql('No M & A/S');

      // Ordinal coordinator
      result = await convert('Nhamaonha 6ª Classe 2023-10-09');
      expect(result).to.eql('Nhamaonha 6a Classe 2023-10-09');
    });
  });

  describe('query', () => {
    it('should properly pass the query string', async () => {
      const fakeConnection = {
        query: function () {
          return Promise.resolve({
            done: true,
            totalSize: 1,
            records: [{ Name: 'OpenFn' }],
          });
        },
      };

      let state = {
        connection: fakeConnection,
        references: [],
      };
      let spy = sinon.spy(fakeConnection, 'query');

      query('select Name from Account')(state).then(state => {
        expect(spy.calledWith('select Name from Account')).to.eql(true);
      });
    });
    it('should properly pass the query string from state', async () => {
      const fakeConnection = {
        query: function () {
          return Promise.resolve({
            done: true,
            totalSize: 1,
            records: [{ Name: 'OpenFn' }],
          });
        },
      };

      let state = {
        connection: fakeConnection,
        references: [],
        qs: 'select Name from Account',
      };
      let spy = sinon.spy(fakeConnection, 'query');

      query(state => state.qs)(state).then(state => {
        expect(spy.calledWith('select Name from Account')).to.eql(true);
      });
    });

    it('should fetch 0 records', done => {
      const fakeConnection = {
        query: function () {
          return Promise.resolve({
            done: true,
            totalSize: 0,
            records: [],
          });
        },
      };
      const state = { connection: fakeConnection, references: [] };

      query('select Name from Account')(state)
        .then(state => {
          expect(state.data).to.eql({
            done: true,
            totalSize: 0,
            records: [],
          });
        })
        .then(done);
    });

    it('should fetch 1 record', done => {
      const fakeConnection = {
        query: function () {
          return Promise.resolve({
            done: true,
            totalSize: 1,
            records: [{ Name: 'OpenFn' }],
          });
        },
      };
      let state = { connection: fakeConnection, references: [] };
      let spy = sinon.spy(fakeConnection, 'query');

      query('select Name from Account')(state)
        .then(state => {
          expect(spy.called).to.eql(true);
          expect(state.data).to.eql({
            done: true,
            totalSize: 1,
            records: [{ Name: 'OpenFn' }],
          });
        })
        .then(done);
    });
    it('should fetch all page if autoFetch is true', done => {
      const fakeConnection = {
        query: function () {
          return Promise.resolve({
            done: false,
            totalSize: 5713,
            nextRecordsUrl:
              '/services/data/v47.0/query/0r8yy3Dlrs3Ol9EACO-2000',
            records: [{ Name: 'Open' }],
          });
        },
        request: function () {
          return Promise.resolve({
            done: true,
            totalSize: 5713,
            records: [{ Name: 'Fn' }],
          });
        },
      };
      let state = { connection: fakeConnection, references: [] };
      let spy = sinon.spy(fakeConnection, 'query');
      let spyReq = sinon.spy(fakeConnection, 'request');

      query('select Name from Account', { autoFetch: true })(state)
        .then(state => {
          expect(spy.called).to.eql(true);
          expect(spyReq.called).to.eql(true);
          expect(state.data).to.eql({
            done: true,
            totalSize: 5713,
            records: [{ Name: 'Open' }, { Name: 'Fn' }],
          });
        })
        .then(done);
    });
    it('should not fetch another page if autofetch is false', done => {
      const fakeConnection = {
        query: function () {
          return Promise.resolve({
            done: false,
            totalSize: 5713,
            nextRecordsUrl:
              '/services/data/v47.0/query/0r8yy3Dlrs3Ol9EACO-2000',
            records: [{ Name: 'Open' }],
          });
        },
        request: function () {
          return Promise.resolve({
            done: true,
            totalSize: 5713,
            records: [{ Name: 'Fn' }],
          });
        },
      };
      let state = { connection: fakeConnection, references: [] };
      let spy = sinon.spy(fakeConnection, 'query');
      let spyReq = sinon.spy(fakeConnection, 'request');

      query('select Name from Account')(state)
        .then(state => {
          expect(spy.called).to.eql(true);
          expect(spyReq.called).to.eql(false);
          expect(state.data).to.eql({
            done: false,
            totalSize: 5713,
            nextRecordsUrl:
              '/services/data/v47.0/query/0r8yy3Dlrs3Ol9EACO-2000',
            records: [{ Name: 'Open' }],
          });
        })
        .then(done);
    });
  });
});
