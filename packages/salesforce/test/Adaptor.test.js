import chai from 'chai';
import sinon from 'sinon';
import { create, upsert, toUTF8, execute } from '../src/Adaptor';

const { expect } = chai;

describe('Adaptor', () => {
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
});
