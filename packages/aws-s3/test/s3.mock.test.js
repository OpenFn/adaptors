import { expect } from 'chai';
import { mockClient } from 'aws-sdk-client-mock';
import { PutObjectCommand, GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

import { put, get, list } from '../src/Adaptor.js';

describe('aws-s3 adaptor operations (mocked S3Client)', () => {
  const s3Mock = mockClient(S3Client);

  beforeEach(() => s3Mock.reset());

  it('put -> returns bucket/key/etag merged into state.data', async () => {
    s3Mock.on(PutObjectCommand).resolves({ ETag: '"abc123"' });

    const state = { configuration: {}, data: { foo: 'bar' } };
    const final = await put({ bucket: 'my-bucket', key: 'path/file.txt', body: 'hello' })(state);

    expect(final.data.bucket).to.equal('my-bucket');
    expect(final.data.key).to.equal('path/file.txt');
    expect(final.data.etag).to.equal('"abc123"');
  });

  it('get -> returns base64 body in state.data for non-JSON', async () => {
    const payload = Buffer.from('hello world');
    s3Mock.on(GetObjectCommand).resolves({ Body: payload, ContentType: 'text/plain', ContentLength: payload.length });

    const state = { configuration: {}, data: {} };
    const final = await get({ bucket: 'b', key: 'k' })(state);

    expect(final.data.base64).to.equal(payload.toString('base64'));
    expect(final.data.contentType).to.equal('text/plain');
  });

  it('get -> parses JSON when object is JSON', async () => {
    const obj = { id: 1, name: 'x' };
    const payload = Buffer.from(JSON.stringify(obj));
    s3Mock.on(GetObjectCommand).resolves({ Body: payload, ContentType: 'application/json', ContentLength: payload.length });

    const state = { configuration: {}, data: {} };
    const final = await get({ bucket: 'b', key: 'k' })(state);

    expect(final.data).to.eql(obj);
  });

  it('list -> returns Contents in state.data', async () => {
    const contents = [{ Key: 'a' }, { Key: 'b' }];
    s3Mock.on(ListObjectsV2Command).resolves({ Contents: contents });

    const state = { configuration: {}, data: {} };
    const final = await list({ bucket: 'b' })(state);

    expect(final.data).to.eql(contents);
  });


});
