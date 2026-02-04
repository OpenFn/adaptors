import { expect } from 'chai';
import { mockClient } from 'aws-sdk-client-mock';
import { PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { upload, download, list, remove } from '../src/Adaptor.js';

describe('aws-s3 adaptor operations (mocked S3Client)', () => {
  const s3Mock = mockClient(S3Client);

  beforeEach(() => s3Mock.reset());

  it('upload -> returns bucket/key/etag merged into state.data', async () => {
    s3Mock.on(PutObjectCommand).resolves({ ETag: '"abc123"' });

    const state = { configuration: {}, data: { foo: 'bar' } };
    const final = await upload({ Bucket: 'my-bucket', Key: 'path/file.txt', Body: 'hello' })(state);

    expect(final.data.bucket).to.equal('my-bucket');
    expect(final.data.key).to.equal('path/file.txt');
    expect(final.data.etag).to.equal('"abc123"');
  });

  it('download -> returns base64 body in state.data', async () => {
    const payload = Buffer.from('hello world');
    s3Mock.on(GetObjectCommand).resolves({ Body: payload, ContentType: 'text/plain', ContentLength: payload.length });

    const state = { configuration: {}, data: {} };
    const final = await download({ Bucket: 'b', Key: 'k' })(state);

    expect(final.data.base64).to.equal(payload.toString('base64'));
    expect(final.data.contentType).to.equal('text/plain');
  });

  it('list -> returns Contents in state.data', async () => {
    const contents = [{ Key: 'a' }, { Key: 'b' }];
    s3Mock.on(ListObjectsV2Command).resolves({ Contents: contents });

    const state = { configuration: {}, data: {} };
    const final = await list({ Bucket: 'b' })(state);

    expect(final.data.Contents).to.eql(contents);
  });

  it('remove -> returns result in state.data', async () => {
    const result = { DeleteMarker: true };
    s3Mock.on(DeleteObjectCommand).resolves(result);

    const state = { configuration: {}, data: {} };
    const final = await remove({ Bucket: 'b', Key: 'k' })(state);

    expect(final.data.bucket).to.equal('b');
    expect(final.data.key).to.equal('k');
    expect(final.data.result).to.eql(result);
  });
});
