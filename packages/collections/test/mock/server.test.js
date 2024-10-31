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

  it('should consume all results as a stream', async () => {
    api.createCollection('my-collection');

    api.upsert('my-collection', 'x', { id: 'x' });
    api.upsert('my-collection', 'y', { id: 'y' });
    api.upsert('my-collection', 'z', { id: 'z' });

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection',
    });
    const results = [];

    await streamResponse(response, item => results.push(item));

    expect(results).to.eql([
      { key: 'x', value: { id: 'x' } },
      { key: 'y', value: { id: 'y' } },
      { key: 'z', value: { id: 'z' } },
    ]);
  });

  it('should consume a single result as a stream', async () => {
    api.createCollection('my-collection');

    api.upsert('my-collection', 'x', { id: 'x' });
    api.upsert('my-collection', 'y', { id: 'y' });
    api.upsert('my-collection', 'z', { id: 'z' });

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection/y',
    });
    const results = [];

    await streamResponse(response, item => results.push(item));

    expect(results).to.eql([{ key: 'y', value: { id: 'y' } }]);
  });

  it('should consume results as a stream with a wildcard', async () => {
    api.createCollection('my-collection');

    api.upsert('my-collection', 'ax', { id: 'x' });
    api.upsert('my-collection', 'ay', { id: 'y' });
    api.upsert('my-collection', 'az', { id: 'z' });

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection/*z',
    });
    const results = [];

    await streamResponse(response, item => results.push(item));

    expect(results).to.eql([{ key: 'az', value: { id: 'z' } }]);
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
