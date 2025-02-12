import { expect } from 'chai';
import { createServer } from '../../src/mock';
import { streamResponse } from '../../src/collections';

let request;
let api;

beforeEach(() => {
  ({ api, request } = createServer());
});

// TODO: support query options
// TODO support timestamps
describe('GET', () => {
  it('should return 200 for a valid collection', async () => {
    api.createCollection('my-collection');

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection',
    });
    expect(response.statusCode).to.equal(200);
  });

  it("should return 404 for a collection that doesn't exist", async () => {
    const response = await request({
      method: 'GET',
      path: 'collections/my-collection',
    });
    expect(response.statusCode).to.equal(404);
  });

  it('should return 403 if no credential', async () => {
    api.createCollection('my-collection');

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection',
      headers: {},
    });
    expect(response.statusCode).to.equal(403);
  });

  it('/collection/name/key should return a single item', async () => {
    api.createCollection('my-collection');

    api.upsert('my-collection', 'x', { id: 'x' });

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection/x',
    });

    const item = await response.body.json();

    expect(response.statusCode).to.eql(200);
    expect(item).to.eql({ key: 'x', value: { id: 'x' } });
  });

  it('/collection/name should stream all results', async () => {
    api.createCollection('my-collection');

    api.upsert('my-collection', 'x', 'xx');
    api.upsert('my-collection', 'y', 'yy');
    api.upsert('my-collection', 'z', 'zz');

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection',
    });
    const results = [];

    await streamResponse(response, item => results.push(item));

    expect(results).to.eql([
      { key: 'x', value: 'xx' },
      { key: 'y', value: 'yy' },
      { key: 'z', value: 'zz' },
    ]);
  });

  it('/collection/name?key=* should stream some results', async () => {
    api.createCollection('my-collection');

    api.upsert('my-collection', 'ax', 'x');
    api.upsert('my-collection', 'ay', 'y');
    api.upsert('my-collection', 'az', 'z');

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection?key=*z',
    });
    const results = [];

    await streamResponse(response, item => results.push(item));

    expect(results).to.eql([{ key: 'az', value: 'z' }]);
  });

  it('should limit and offset results and return a cursor', async () => {
    api.createCollection('my-collection');

    api.upsert('my-collection', 'x', 'xx');
    api.upsert('my-collection', 'y', 'yy');
    api.upsert('my-collection', 'z', 'zz');

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection',
      query: {
        limit: 1,
        cursor: 1,
      },
    });
    const results = [];

    const cursor = await streamResponse(response, item => results.push(item));

    expect(results).to.eql([{ key: 'y', value: 'yy' }]);
    expect(cursor).to.equal('2');
  });
});

describe('POST', () => {
  it('should return 200 for a valid collection', async () => {
    api.createCollection('my-collection');

    const response = await request({
      method: 'POST',
      path: 'collections/my-collection',
      data: { items: [] },
    });
    expect(response.statusCode).to.equal(200);
  });

  it("should return 404 for a collection that doesn't exist", async () => {
    // Note that we need to include an item here to trigger the error in the mock
    const response = await request({
      method: 'POST',
      path: 'collections/my-collection',
      data: { items: [{}] },
    });
    expect(response.statusCode).to.equal(404);
  });

  it('should return 403 if no credential', async () => {
    api.createCollection('my-collection');

    const response = await request({
      method: 'POST',
      path: 'collections/my-collection',
      headers: {},
    });
    expect(response.statusCode).to.equal(403);
  });

  it('should upsert a new item', async () => {
    api.createCollection('my-collection');

    const item = { key: 'x', value: { id: 'x' } };

    const response = await request({
      method: 'POST',
      path: 'collections/my-collection',
      data: { items: [item] },
    });

    expect(response.statusCode).to.equal(200);

    const result = api.byKey('my-collection', item.key);
    expect(result).to.eql(item.value);
  });

  it('should return a JSON summary', async () => {
    api.createCollection('my-collection');

    const item = { key: 'x', value: { id: 'x' } };

    const response = await request({
      method: 'POST',
      path: 'collections/my-collection',
      data: { items: [item] },
    });

    const { upserted, errors } = await response.body.json();

    expect(upserted).to.equal(1);
    expect(errors).to.eql([]);
  });
});

describe('DELETE', () => {
  it('should return 200 for a valid collection', async () => {
    api.createCollection('my-collection');

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection',
    });
    expect(response.statusCode).to.equal(200);
  });

  it("should return 404 for a collection that doesn't exist", async () => {
    // Note that we need to include an item here to trigger the error in the mock
    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection',
    });
    expect(response.statusCode).to.equal(404);
  });

  it('should return 403 if no credential', async () => {
    api.createCollection('my-collection');

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection',
      headers: {},
    });
    expect(response.statusCode).to.equal(403);
  });

  it('should remove an item', async () => {
    api.createCollection('my-collection');
    api.upsert('my-collection', 'x', { id: 'x' });

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection/x',
    });

    expect(response.statusCode).to.equal(200);

    const result = api.byKey('my-collection', 'x');
    expect(result).to.be.undefined;
  });

  it('should remove items by pattern', async () => {
    api.createCollection('my-collection');
    api.upsert('my-collection', 'x', { id: 'x' });
    api.upsert('my-collection', 'y', { id: 'y' });

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection',
      query: {
        key: '*',
      },
    });

    expect(response.statusCode).to.equal(200);

    const x = api.byKey('my-collection', 'x');
    expect(x).to.be.undefined;
    const y = api.byKey('my-collection', 'y');
    expect(y).to.be.undefined;
  });

  it('should return a JSON summary', async () => {
    api.createCollection('my-collection');
    api.upsert('my-collection', 'x', { id: 'x' });

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection/x',
    });

    const { deleted, keys } = await response.body.json();

    expect(deleted).to.equal(1);
    expect(keys).to.eql(['x']);
  });
});
