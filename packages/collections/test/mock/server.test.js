import { expect } from 'chai';
import { createServer } from '../../src/mock.js';
import { streamResponse } from '../../src/collections.js';

let request;
let api;

beforeEach(() => {
  ({ api, request } = createServer());
});

describe('GET', () => {
  it('should return 200 for a valid collection by name only', async () => {
    api.createCollection('project1', 'my-collection');

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection',
    });
    expect(response.statusCode).to.equal(200);
  });

  it('should return 200 for a valid collection with a project Id', async () => {
    api.createCollection('project1', 'my-collection');
    api.createCollection('project2', 'my-collection');

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection',
      query: {
        project_id: 'project2',
      },
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
    api.createCollection('project1', 'my-collection');

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection',
      headers: {},
    });
    expect(response.statusCode).to.equal(403);
  });

  it('should return 409 for an ambiguous request', async () => {
    api.createCollection('project1', 'my-collection');
    api.createCollection('project2', 'my-collection');

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection',
    });
    expect(response.statusCode).to.equal(409);
  });

  it('/collection/name/key should return a single item', async () => {
    api.createCollection('project1', 'my-collection');

    api.upsert('project1', 'my-collection', 'x', { id: 'x' });

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection/x',
    });

    const item = await response.body.json();

    expect(response.statusCode).to.eql(200);
    expect(item).to.eql({ key: 'x', value: { id: 'x' } });
  });

  it('/collection/name should stream all results', async () => {
    api.createCollection('project1', 'my-collection');

    api.upsert('project1', 'my-collection', 'x', 'xx');
    api.upsert('project1', 'my-collection', 'y', 'yy');
    api.upsert('project1', 'my-collection', 'z', 'zz');

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
    api.createCollection('project1', 'my-collection');

    api.upsert('project1', 'my-collection', 'ax', 'x');
    api.upsert('project1', 'my-collection', 'ay', 'y');
    api.upsert('project1', 'my-collection', 'az', 'z');

    const response = await request({
      method: 'GET',
      path: 'collections/my-collection?key=*z',
    });
    const results = [];

    await streamResponse(response, item => results.push(item));

    expect(results).to.eql([{ key: 'az', value: 'z' }]);
  });

  it('should limit and offset results and return a cursor', async () => {
    api.createCollection('project1', 'my-collection');

    api.upsert('project1', 'my-collection', 'x', 'xx');
    api.upsert('project1', 'my-collection', 'y', 'yy');
    api.upsert('project1', 'my-collection', 'z', 'zz');

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
  it('should return 200 for a valid collection with name only', async () => {
    api.createCollection('project1', 'my-collection');

    const response = await request({
      method: 'POST',
      path: 'collections/my-collection',
      data: { items: [] },
    });
    expect(response.statusCode).to.equal(200);
  });

  it('should return 200 for a valid collection with projectId', async () => {
    api.createCollection('project1', 'my-collection');
    api.createCollection('project2', 'my-collection');

    const response = await request({
      method: 'POST',
      path: 'collections/my-collection',
      data: { items: [] },
      query: {
        project_id: 'project2',
      },
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
    api.createCollection('project1', 'my-collection');

    const response = await request({
      method: 'POST',
      path: 'collections/my-collection',
      headers: {},
    });
    expect(response.statusCode).to.equal(403);
  });

  it('should return 409 for for an ambiguous request', async () => {
    api.createCollection('project1', 'my-collection');
    api.createCollection('project2', 'my-collection');

    const response = await request({
      method: 'POST',
      path: 'collections/my-collection',
      data: { items: [{}] },
    });
    expect(response.statusCode).to.equal(409);
  });

  it('should upsert a new item', async () => {
    api.createCollection('project1', 'my-collection');

    const item = { key: 'x', value: { id: 'x' } };

    const response = await request({
      method: 'POST',
      path: 'collections/my-collection',
      data: { items: [item] },
    });

    expect(response.statusCode).to.equal(200);

    const collection = api.getCollection('project1', 'my-collection');
    const result = collection[item.key];
    expect(result).to.eql(item.value);
  });

  it('should return a JSON summary', async () => {
    api.createCollection('project1', 'my-collection');

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
  it('should return 200 for a valid collection by name only', async () => {
    api.createCollection('project1', 'my-collection');

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection',
    });
    expect(response.statusCode).to.equal(200);
  });

  it('should return 200 for a valid collection with a project id', async () => {
    api.createCollection('project1', 'my-collection');
    api.createCollection('project2', 'my-collection');

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection',
      query: {
        project_id: 'project1',
      },
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
    api.createCollection('project1', 'my-collection');

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection',
      headers: {},
    });
    expect(response.statusCode).to.equal(403);
  });

  it('should return 409 for an ambiguous request', async () => {
    api.createCollection('project1', 'my-collection');
    api.createCollection('project2', 'my-collection');

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection',
    });
    expect(response.statusCode).to.equal(409);
  });

  it('should remove an item', async () => {
    api.createCollection('project1', 'my-collection');
    api.upsert('project1', 'my-collection', 'x', { id: 'x' });

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection/x',
    });

    expect(response.statusCode).to.equal(200);

    const collection = api.getCollection('project1', 'my-collection');
    expect(collection.x).to.be.undefined;
  });

  it('should remove items by pattern', async () => {
    api.createCollection('project1', 'my-collection');
    api.upsert('project1', 'my-collection', 'x', { id: 'x' });
    api.upsert('project1', 'my-collection', 'y', { id: 'y' });

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection',
      query: {
        key: '*',
      },
    });

    expect(response.statusCode).to.equal(200);

    const collection = api.getCollection('project1', 'my-collection');
    expect(collection.x).to.be.undefined;
    expect(collection.y).to.be.undefined;
  });

  it('should return a JSON summary', async () => {
    api.createCollection('project1', 'my-collection');
    api.upsert('project1', 'my-collection', 'x', { id: 'x' });

    const response = await request({
      method: 'DELETE',
      path: 'collections/my-collection/x',
    });

    const { deleted, keys } = await response.body.json();

    expect(deleted).to.equal(1);
    expect(keys).to.eql(['x']);
  });
});
