import chai from 'chai';
import sinon from 'sinon';
import {
  reference,
  create,
  createIf,
  upsert,
  upsertIf,
  toUTF8,
  steps,
  each,
  field,
  fields,
  sourceValue,
  execute,
} from '../src/Adaptor';

import testData from './testData' assert { type: 'json' };

const { expect } = chai;

describe('Adaptor', () => {
  describe('reference', () => {
    it('returns the Id of a previous operation', () => {
      let state = { references: [{ id: '12345' }] };
      let Id = reference(0)(state);
      expect(Id).to.eql('12345');
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
          expect(state.references[0]).to.eql({ Id: 10 });
        })
        .then(done)
        .catch(done);
    });
  });

  describe('createIf', () => {
    it("doesn't create a new sObject if a logical is false", done => {
      const fakeConnection = {
        create: function () {
          return Promise.resolve({ Id: 10 });
        },
      };
      let state = { connection: fakeConnection, references: [] };

      let logical = 1 + 1 == 3;

      let sObject = 'myObject';
      let fields = { field: 'value' };

      let spy = sinon.spy(fakeConnection, 'create');

      createIf(logical, sObject, fields)(state);

      expect(spy.called).to.eql(false);
      expect(state).to.eql({ connection: fakeConnection, references: [] });
      done();
    });

    it('makes a new sObject if a logical is true', done => {
      const fakeConnection = {
        create: function () {
          return Promise.resolve({ Id: 10 });
        },
      };
      let state = { connection: fakeConnection, references: [] };

      let logical = 1 + 1 == 2;

      let sObject = 'myObject';
      let fields = { field: 'value' };

      let spy = sinon.spy(fakeConnection, 'create');

      createIf(
        logical,
        sObject,
        fields
      )(state)
        .then(state => {
          expect(spy.args[0]).to.eql([sObject, fields]);
          expect(spy.called).to.eql(true);
          expect(state.references[0]).to.eql({ Id: 10 });
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
          expect(state.references[0]).to.eql({ Id: 10 });
        })
        .then(done)
        .catch(done);
    });
  });

  describe('upsertIf', () => {
    it('upserts if a logical is true', done => {
      const fakeConnection = {
        upsert: function () {
          return Promise.resolve({ Id: 10 });
        },
      };
      let state = { connection: fakeConnection, references: [] };

      let logical = 1 + 1 == 2;

      let sObject = 'myObject';
      let externalId = 'MyExternalId';
      let fields = { field: 'value' };

      let spy = sinon.spy(fakeConnection, 'upsert');

      upsertIf(
        logical,
        sObject,
        externalId,
        fields
      )(state)
        .then(state => {
          expect(spy.args[0]).to.eql([sObject, fields, externalId]);
          expect(spy.called).to.eql(true);
          expect(state.references[0]).to.eql({ Id: 10 });
        })
        .then(done)
        .catch(done);
    });
  });

  describe('toUTF8', () => {
    it('Transliterate unicode to ASCII representation', () => {
      expect(toUTF8('άνθρωποι')).to.eql('anthropoi');
      // Misc
      expect(toUTF8('☆ ♯ ♰ ⚄ ⛌')).to.equal('* # + 5 X');
      // Emojis
      expect(toUTF8('👑 🌴')).to.eql(':crown: :palm_tree:');
      // Letterlike
      expect(toUTF8('№ ℳ ⅋ ⅍')).to.eql('No M & A/S');
      // Ordinal coordinator
      expect(toUTF8('Nhamaonha 6ª Classe 2023-10-09')).to.eql(
        'Nhamaonha 6a Classe 2023-10-09'
      );
    });
  });
});
