import { expect } from 'chai';
import { Client, MockAgent } from 'undici';
import Parser from 'jsonparse';

import { createServer, API } from '../mock/server';

const parser = new Parser();

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

    expect(result).to.eql([{ id: 1 }]);
  });

  it('should fetch from a collection with wildcard', () => {
    api.createCollection('a');

    api.upsert('a', 'x', { id: 1 });
    api.upsert('a', 'xx', { id: 2 });
    api.upsert('a', 'axb', { id: 3 });
    api.upsert('a', 'yy', { id: 4 });

    const { results } = api.fetch('a', 'x*', {});

    expect(results).to.eql([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('should remove from a collection', () => {
    api.createCollection('a');

    api.upsert('a', 'x', { id: 1 });

    api.remove('a', 'x');

    expect(api.collections.a).to.eql({});
  });
});

describe.only('GET', () => {
  let request;
  let stream;
  let api;

  beforeEach(() => {
    ({ api, request, stream } = createServer());
  });

  it('should return 200 for a valid collection', async () => {
    api.createCollection('my-collection');

    const response = await request('/collections/my-collection');
    expect(response.statusCode).to.equal(200);
  });

  it("should return 404 for a collection that doesn't exist", async () => {
    const response = await request('/collections/my-collection');
    expect(response.statusCode).to.equal(404);
  });

  // I think this is really a clientside problem?
  it.only('should consume results as a stream', async done => {
    api.createCollection('my-collection');

    api.upsert('my-collection', 'x', { id: 'x ' });
    api.upsert('my-collection', 'y', { id: 'y ' });
    api.upsert('my-collection', 'z', { id: 'z ' });

    const response = await request('/collections/my-collection');

    // hmm. The way this returns data is a little wierd
    parser.onValue = function (value) {
      console.log(this, value);
    };

    for await (const chunk of response.body) {
      parser.write(chunk);
    }
    done();
  });
});

describe('POST', () => {});

describe('DELETE', () => {});
