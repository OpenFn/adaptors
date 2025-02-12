import { expect } from 'chai';
import { API } from '../../src/mock';

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

    expect(api.collections).to.eql({});
  });

  it('should create a collection', () => {
    api.createCollection('a');

    expect(api.collections).to.eql({ a: {} });
  });

  it('should reset', () => {
    api.createCollection('x');

    expect(api.collections).to.eql({ x: {} });

    api.reset();

    expect(api.collections).to.eql({});
  });

  it('should create two APIs with two different collections', () => {
    const a = new API();
    a.createCollection('a');

    const b = new API();
    b.createCollection('b');

    expect(a.collections.b).to.be.undefined;
    expect(b.collections.a).to.be.undefined;
  });

  it('should add to a collection', () => {
    api.createCollection('a');

    api.upsert('a', 'x', {});

    expect(api.collections.a).to.eql({ x: {} });
  });

  it("should throw if adding to add to a collection that doesn't exist", () => {
    try {
      api.upsert('c', 'x', {});
    } catch (e) {
      expect(e.message).to.eql('COLLECTION_NOT_FOUND');
    }
  });

  it('should replace into a collection', () => {
    api.createCollection('a');

    api.upsert('a', 'x', []);

    expect(api.collections.a).to.eql({ x: [] });
  });

  it('should fetch from a collection', () => {
    api.createCollection('a');

    api.upsert('a', 'x', { id: 1 });

    const result = api.fetch('a', 'x', {});

    expect(result.items).to.eql([{ key: 'x', value: { id: 1 } }]);
  });

  it('should fetch from a collection with wildcard', () => {
    api.createCollection('a');

    api.upsert('a', 'x', { id: 1 });
    api.upsert('a', 'xx', { id: 2 });
    api.upsert('a', 'axb', { id: 3 });
    api.upsert('a', 'yy', { id: 4 });

    const { items } = api.fetch('a', 'x*', {});

    expect(items).to.eql([
      { key: 'x', value: { id: 1 } },
      { key: 'xx', value: { id: 2 } },
      { key: 'axb', value: { id: 3 } },
    ]);
  });

  it('should fetch with a count', () => {
    api.createCollection('a');

    api.upsert('a', 'x', { id: 1 });
    api.upsert('a', 'xx', { id: 2 });
    api.upsert('a', 'axb', { id: 3 });
    api.upsert('a', 'yy', { id: 4 });

    const { count, cursor } = api.fetch('a', 'x*', {});

    expect(count).to.eql(3);
    expect(cursor).to.be.undefined;
  });

  it('should fetch from a collection with a limit and include a cursor', () => {
    api.createCollection('a');

    api.upsert('a', 'x', { id: 1 });
    api.upsert('a', 'xx', { id: 2 });

    const { items, count, cursor } = api.fetch('a', 'x*', { limit: 1 });

    expect(count).to.eql(1);
    expect(items).to.eql([{ key: 'x', value: { id: 1 } }]);
    expect(cursor).to.eql(1);
  });

  it('should fetch from a collection from a cursor', () => {
    api.createCollection('a');

    api.upsert('a', 'x', { id: 1 });
    api.upsert('a', 'xx', { id: 2 });

    const { items } = api.fetch('a', 'x*', { cursor: 1 });

    expect(items).to.eql([{ key: 'xx', value: { id: 2 } }]);
  });

  it('should fetch from a collection with a limit and cursor', () => {
    api.createCollection('a');

    api.upsert('a', 'x', { id: 1 });
    api.upsert('a', 'xx', { id: 2 });
    api.upsert('a', 'xxx', { id: 3 });

    const { items } = api.fetch('a', 'x*', { cursor: 1, limit: 1 });

    expect(items).to.eql([{ key: 'xx', value: { id: 2 } }]);
  });

  it('should remove from a collection', () => {
    api.createCollection('a');

    api.upsert('a', 'x', { id: 1 });

    api.remove('a', 'x');

    expect(api.collections.a).to.eql({});
  });
});
