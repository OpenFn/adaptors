import { expect } from 'chai';
import { createServer } from '../mock/server';
import { streamResponse } from '../../src/Utils';

// TODO: support query options
// TODO support timestamps
describe('GET', () => {
  let request;
  let api;

  beforeEach(() => {
    ({ api, request } = createServer());
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

  it('should consume all results as a stream', async () => {
    api.createCollection('my-collection');

    api.upsert('my-collection', 'x', { id: 'x' });
    api.upsert('my-collection', 'y', { id: 'y' });
    api.upsert('my-collection', 'z', { id: 'z' });

    const response = await request('/collections/my-collection');
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

    const response = await request('/collections/my-collection/y');
    const results = [];

    await streamResponse(response, item => results.push(item));

    expect(results).to.eql([{ key: 'y', value: { id: 'y' } }]);
  });

  it('should consume results as a stream with a wildcard', async () => {
    api.createCollection('my-collection');

    api.upsert('my-collection', 'ax', { id: 'x' });
    api.upsert('my-collection', 'ay', { id: 'y' });
    api.upsert('my-collection', 'az', { id: 'z' });

    const response = await request('/collections/my-collection/*z');
    const results = [];

    await streamResponse(response, item => results.push(item));

    expect(results).to.eql([{ key: 'az', value: { id: 'z' } }]);
  });
});

// describe.only('POST', () => {
//   it('should return 200 for a valid collection', async () => {
//     api.createCollection('my-collection');

//     const response = await request('/collections/my-collection');
//     expect(response.statusCode).to.equal(200);
//   });

//   it("should return 404 for a collection that doesn't exist", async () => {
//     const response = await request('/collections/my-collection');
//     expect(response.statusCode).to.equal(404);
//   });

// });

describe('DELETE', () => {});
