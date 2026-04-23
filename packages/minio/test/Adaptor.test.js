import { expect } from 'chai';
import { EventEmitter } from 'node:events';

import {
  getObject,
  getObjectTags,
  listObjects,
  putObject,
  setObjectTags,
  setMockClient,
} from '../src/Adaptor.js';

const state = {
  configuration: {
    endPoint: 'play.min.io',
    port: 9000,
    useSSL: true,
    accessKey: 'minioaccesskey',
    secretKey: 'miniosecretkey',
  },
  data: {},
};

describe('listObjects', () => {
  afterEach(() => {
    setMockClient(null);
  });

  it('collects streamed objects into state.data', async () => {
    const obj1 = {
      name: 'openmrs/2025-04/report-1.json',
      size: 128,
      lastModified: new Date('2025-04-01'),
      etag: 'etag-1',
    };
    const obj2 = {
      name: 'openmrs/2025-04/report-2.json',
      size: 256,
      lastModified: new Date('2025-04-02'),
      etag: 'etag-2',
    };

    let capturedArgs;

    setMockClient({
      listObjects(bucketName, prefix, recursive) {
        capturedArgs = { bucketName, prefix, recursive };
        const stream = new EventEmitter();
        setImmediate(() => {
          stream.emit('data', obj1);
          stream.emit('data', obj2);
          stream.emit('end');
        });
        return stream;
      },
    });

    const finalState = await listObjects('bucket-a', {
      prefix: 'openmrs/2025-04/',
      recursive: false,
    })(state);

    expect(capturedArgs).to.eql({
      bucketName: 'bucket-a',
      prefix: 'openmrs/2025-04/',
      recursive: false,
    });
    expect(finalState.data).to.eql([obj1, obj2]);
  });

  it('defaults prefix to empty string and recursive to true', async () => {
    let capturedArgs;

    setMockClient({
      listObjects(bucketName, prefix, recursive) {
        capturedArgs = { bucketName, prefix, recursive };
        const stream = new EventEmitter();
        setImmediate(() => stream.emit('end'));
        return stream;
      },
    });

    await listObjects('bucket-a')(state);

    expect(capturedArgs).to.eql({ bucketName: 'bucket-a', prefix: '', recursive: true });
  });
});

describe('putObject', () => {
  afterEach(() => {
    setMockClient(null);
  });

  it('serializes JSON data and writes to state.data with etag', async () => {
    const uploaded = [];

    setMockClient({
      putObject(bucketName, objectName, buffer, size) {
        uploaded.push({
          bucketName,
          objectName,
          body: buffer.toString(),
          size,
        });
        return Promise.resolve({ etag: 'abc123', versionId: null });
      },
    });

    const finalState = await putObject('bucket-a', 'records/patient.json', {
      id: 1,
      name: 'Alice',
    })(state);

    expect(uploaded).to.have.length(1);
    expect(uploaded[0].bucketName).to.equal('bucket-a');
    expect(uploaded[0].objectName).to.equal('records/patient.json');
    expect(JSON.parse(uploaded[0].body)).to.eql({ id: 1, name: 'Alice' });
    expect(uploaded[0].size).to.equal(Buffer.byteLength(uploaded[0].body));
    expect(finalState.data).to.eql({ etag: 'abc123', versionId: null });
  });
});

describe('setObjectTags', () => {
  afterEach(() => {
    setMockClient(null);
  });

  it('calls setObjectTagging with the resolved tags and returns state unchanged', async () => {
    const calls = [];

    setMockClient({
      setObjectTagging(bucketName, objectName, tags, putOpts) {
        calls.push({ bucketName, objectName, tags, putOpts });
        return Promise.resolve();
      },
    });

    const initialState = { ...state, data: { keep: true } };
    const finalState = await setObjectTags('bucket-a', 'records/patient.json', {
      source: 'openmrs',
      status: 'raw',
    })(initialState);

    expect(calls).to.have.length(1);
    expect(calls[0]).to.eql({
      bucketName: 'bucket-a',
      objectName: 'records/patient.json',
      tags: { source: 'openmrs', status: 'raw' },
      putOpts: {},
    });
    expect(finalState).to.equal(initialState);
  });

  it('passes putOpts through to setObjectTagging', async () => {
    const calls = [];

    setMockClient({
      setObjectTagging(bucketName, objectName, tags, putOpts) {
        calls.push({ bucketName, objectName, tags, putOpts });
        return Promise.resolve();
      },
    });

    await setObjectTags(
      'bucket-a',
      'records/patient.json',
      { status: 'processed' },
      { versionId: 'v1' },
    )(state);

    expect(calls[0].putOpts).to.eql({ versionId: 'v1' });
  });
});

describe('getObjectTags', () => {
  afterEach(() => {
    setMockClient(null);
  });

  it('returns the tag set as state.data', async () => {
    const expectedTags = { source: 'openmrs', status: 'raw' };
    let capturedArgs;

    setMockClient({
      getObjectTagging(bucketName, objectName) {
        capturedArgs = { bucketName, objectName };
        return Promise.resolve(expectedTags);
      },
    });

    const finalState = await getObjectTags(
      'bucket-a',
      'records/patient.json',
    )(state);

    expect(capturedArgs).to.eql({
      bucketName: 'bucket-a',
      objectName: 'records/patient.json',
    });
    expect(finalState.data).to.eql(expectedTags);
  });
});

describe('getObject', () => {
  afterEach(() => {
    setMockClient(null);
  });

  it('returns a Buffer by default when no format is specified', async () => {
    let capturedArgs;

    setMockClient({
      getObject(bucketName, objectName) {
        capturedArgs = { bucketName, objectName };
        const stream = new EventEmitter();
        setImmediate(() => {
          stream.emit('data', Buffer.from('raw bytes'));
          stream.emit('end');
        });
        return Promise.resolve(stream);
      },
    });

    const finalState = await getObject('bucket-a', 'file.bin')(state);

    expect(capturedArgs).to.eql({ bucketName: 'bucket-a', objectName: 'file.bin' });
    expect(Buffer.isBuffer(finalState.data)).to.equal(true);
    expect(finalState.data.toString()).to.equal('raw bytes');
  });

  it('parses streamed object data as json', async () => {
    let capturedArgs;

    setMockClient({
      getObject(bucketName, objectName) {
        capturedArgs = { bucketName, objectName };
        const stream = new EventEmitter();
        setImmediate(() => {
          stream.emit('data', Buffer.from('{"name":"file-1","size":123}'));
          stream.emit('end');
        });
        return Promise.resolve(stream);
      },
    });

    const finalState = await getObject('bucket-a', 'file.txt', {
      format: 'json',
    })(state);

    expect(capturedArgs).to.eql({
      bucketName: 'bucket-a',
      objectName: 'file.txt',
    });
    expect(finalState.data).to.eql({ name: 'file-1', size: 123 });
  });

  it('writes parsed result to destination when provided', async () => {
    setMockClient({
      getObject() {
        const stream = new EventEmitter();
        setImmediate(() => {
          stream.emit('data', Buffer.from('raw object body'));
          stream.emit('end');
        });
        return Promise.resolve(stream);
      },
    });

    const finalState = await getObject('bucket-a', 'file.txt', {
      format: 'raw',
      destination: 'result.objectBody',
    })({ ...state, data: { keep: true } });

    expect(finalState.data).to.eql({ keep: true });
    expect(Buffer.isBuffer(finalState.result.objectBody)).to.equal(true);
    expect(finalState.result.objectBody.toString()).to.equal('raw object body');
  });
});
