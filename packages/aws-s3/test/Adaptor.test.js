import { config, expect } from 'chai';
import { mockClient } from 'aws-sdk-client-mock';
import { PutObjectCommand, GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

import { get, put, list } from '../src/Adaptor.js';

describe('aws-s3 adaptor', () => {
  const s3Mock = mockClient(S3Client);
   beforeEach(() => {
    s3Mock.reset();
   });


describe ('put', () =>{
  it('should return bucket/key/etag merged into state.data', async () => {
    s3Mock.on(PutObjectCommand).resolves({ ETag: '"abc123"'});

    const state = { 
      configuration: {},
      data: { foo: 'bar'}
    };
    const finalState = await put({ bucket: 'my-bucket', key: 'path/file.txt', body: 'hello' })(state);
    expect(finalState.data.bucket).to.equal('my-bucket');
    expect(finalState.data.key).to.equal('path/file.txt');
    expect(finalState.data.etag).to.equal('"abc123"');
    expect(finalState.data.foo).to.equal('bar');

  });
  
});

describe('get', () => {
  it('should return base64 body in state.data for non-JSON objects', async () => {
    const payload = Buffer.from('testing world');
    s3Mock.on(GetObjectCommand).resolves({ Body: payload, ContentType: 'text/plain', ContentLength: payload.length});

    const state = { configuration: {}, data:{} };
    const finalState = await get({ bucket: 'b', key: 'k'})(state);

expect(finalState.data.base64).to.equal(payload.toString('base64'));


});

it('should return JSON when object is JSON', async () => {
  const object =  { id: 2000, name: 'test'};
  const payload = Buffer.from(JSON.stringify(object));


  s3Mock.on(GetObjectCommand).resolves({ Body: payload, ContentType: 'application/json', ContentLength: payload.length});
  const state = {
    configuration: {},
    data: {}
  };
  const finalState =  await get({ bucket: 'b', key: 'k'})(state);
  expect(finalState.data).to.deep.equal(object)
});
});

describe('list', () => {
  it('should return content in state.data', async () => {
    const contents = [{
      key: 'first'
    }, {
      key: 'second'
    }];
    s3Mock.on(ListObjectsV2Command).resolves({ Contents: contents});

    const state = { 
      configuration: {},
      data:{}
    };
    const finalState = await list({ bucket: 'b'})(state);

    expect(finalState.data).to.deep.equal(contents);

  });
});

});
