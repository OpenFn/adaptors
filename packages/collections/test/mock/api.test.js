import { expect } from 'chai';
import { API, MULTIPLE_MATCHES } from '../../src/mock.js';

describe('API', () => {
  let api;

  before(() => {
    api = new API();
  });

  afterEach(() => {
    api.reset();
  });

  it('should create an API', () => {
    expect(api).to.not.be.undefined;

    expect(api.collectionsByProject).to.eql({});
  });

  it('should create a collection', () => {
    api.createCollection('p', 'c');

    expect(api.collectionsByProject.p).to.eql({ c: {} });
    expect(api.collectionsByName.c).to.eql([{}]);
  });

  it('should reset', () => {
    api.createCollection('p', 'c');

    expect(api.collectionsByProject).to.eql({ p: { c: {} } });

    api.reset();

    expect(api.collectionsByProject).to.eql({});
  });

  it('should create two APIs with two different collections', () => {
    const a = new API();
    a.createCollection('p', 'a');

    const b = new API();
    b.createCollection('p', 'b');

    expect(a.collectionsByProject.p.a).to.be.ok;
    expect(a.collectionsByProject.p.b).to.be.undefined;

    expect(b.collectionsByProject.p.a).to.be.undefined;
    expect(b.collectionsByProject.p.b).to.be.ok;
  });

  it('should upsert with project id and name', () => {
    api.createCollection('p', 'a');

    api.upsert('p', 'a', 'x', {});

    expect(api.collectionsByProject.p.a).to.eql({ x: {} });
  });

  it('should upsert with name only', () => {
    api.createCollection('p', 'a');

    api.upsert(null, 'a', 'x', {});

    expect(api.collectionsByName.a).to.eql([{ x: {} }]);
  });

  it('should throw if upserting by name and there are multiple matches', () => {
    api.createCollection('p1', 'a');
    api.createCollection('p2', 'a');

    expect(api.collectionsByName.a.length).to.equal(2);

    try {
      api.upsert(null, 'a', 'x', {});
    } catch (e) {
      expect(e.message).to.eql(MULTIPLE_MATCHES);
    }

    expect(api.collectionsByName.a[0]).to.eql({});
    expect(api.collectionsByName.a[1]).to.eql({});
  });

  it("should throw if adding to add to a collection that doesn't exist", () => {
    try {
      api.upsert(null, 'c', 'x', {});
    } catch (e) {
      expect(e.message).to.eql('COLLECTION_NOT_FOUND');
    }
  });

  it('should fetch from a collection with project id', () => {
    api.createCollection('p', 'a');

    api.upsert('p', 'a', 'x', { id: 1 });

    const result = api.fetch('p', 'a', 'x', {});

    expect(result.items).to.eql([{ key: 'x', value: { id: 1 } }]);
  });

  it('should fetch from a collection with name only', () => {
    api.createCollection('p', 'a');

    api.upsert('p', 'a', 'x', { id: 1 });

    const result = api.fetch(null, 'a', 'x', {});

    expect(result.items).to.eql([{ key: 'x', value: { id: 1 } }]);
  });

  it('should throw when fetching by name only with multiple matches', () => {
    api.createCollection('p1', 'a');
    api.createCollection('p2', 'a');

    api.upsert('p1', 'a', 'x', { id: 1 });

    try {
      api.fetch(null, 'a', 'x', {});
    } catch (e) {
      expect(e.message).to.eql(MULTIPLE_MATCHES);
    }
  });

  it('should fetch from a collection with wildcard', () => {
    api.createCollection('p', 'a');

    api.upsert('p', 'a', 'x', { id: 1 });
    api.upsert('p', 'a', 'xx', { id: 2 });
    api.upsert('p', 'a', 'axb', { id: 3 });
    api.upsert('p', 'a', 'yy', { id: 4 });

    const { items } = api.fetch('p', 'a', 'x*', {});

    expect(items).to.eql([
      { key: 'x', value: { id: 1 } },
      { key: 'xx', value: { id: 2 } },
      { key: 'axb', value: { id: 3 } },
    ]);
  });

  it('should fetch with a count', () => {
    api.createCollection('p', 'a');

    api.upsert('p', 'a', 'x', { id: 1 });
    api.upsert('p', 'a', 'xx', { id: 2 });
    api.upsert('p', 'a', 'axb', { id: 3 });
    api.upsert('p', 'a', 'yy', { id: 4 });

    const { count, cursor } = api.fetch('p', 'a', 'x*', {});

    expect(count).to.eql(3);
    expect(cursor).to.be.undefined;
  });

  it('should fetch from a collection with a limit and include a cursor', () => {
    api.createCollection('p', 'a');

    api.upsert('p', 'a', 'x', { id: 1 });
    api.upsert('p', 'a', 'xx', { id: 2 });

    const { items, count, cursor } = api.fetch('p', 'a', 'x*', { limit: 1 });

    expect(count).to.eql(1);
    expect(items).to.eql([{ key: 'x', value: { id: 1 } }]);
    expect(cursor).to.eql(1);
  });

  it('should fetch from a collection from a cursor', () => {
    api.createCollection('p', 'a');

    api.upsert('p', 'a', 'x', { id: 1 });
    api.upsert('p', 'a', 'xx', { id: 2 });

    const { items } = api.fetch('p', 'a', 'x*', { cursor: 1 });

    expect(items).to.eql([{ key: 'xx', value: { id: 2 } }]);
  });

  it('should fetch from a collection with a limit and cursor', () => {
    api.createCollection('p', 'a');

    api.upsert('p', 'a', 'x', { id: 1 });
    api.upsert('p', 'a', 'xx', { id: 2 });
    api.upsert('p', 'a', 'xxx', { id: 3 });

    const { items } = api.fetch('p', 'a', 'x*', { cursor: 1, limit: 1 });

    expect(items).to.eql([{ key: 'xx', value: { id: 2 } }]);
  });

  it('should remove from a collection with project id', () => {
    api.createCollection('p', 'a');

    api.upsert('p', 'a', 'x', { id: 1 });

    api.remove('p', 'a', 'x');

    expect(api.collectionsByProject.p.a).to.eql({});
  });

  it('should remove from a collection with name only', () => {
    api.createCollection('p', 'a');

    api.upsert('p', 'a', 'x', { id: 1 });

    api.remove(null, 'a', 'x');

    expect(api.collectionsByProject.p.a).to.eql({});
  });

  it('should throw when removing from a collection by name only with multiple matches', () => {
    api.createCollection('p', 'a');

    api.upsert('p', 'a', 'x', { id: 1 });

    try {
      api.remove(null, 'a', 'x');
    } catch (e) {
      expect(e.message).to.eql(MULTIPLE_MATCHES);
    }
  });
});
