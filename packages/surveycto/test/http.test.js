import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { post, get, request, _delete } from '../src/http';

const baseUrl = 'https://trial.surveycto.com';
const mock = enableMockClient(baseUrl);

const state = {
  configuration: {
    user: 'u',
    password: 'p',
    servername: 'trial',
    apiVersion: 'v2',
  },
};

describe('request', () => {
  it('throws if an absolute URL is passed', async () => {
    // happily the request won't actually be made, so we don't need to mock anything here
    let err;
    try {
      await request('https://www.blah.com/a/b/c')({});
    } catch (e) {
      err = e;
    }
    expect(err.code).to.equal('UNEXPECTED_ABSOLUTE_URL');
  });
});

describe('get', () => {
  it('should handle non-JSON response', async () => {
    mock
      .intercept({
        path: /\/api\/v2\/datasets\/plain/,
        method: 'GET',
      })
      .reply(200, 'plain text', {
        headers: { 'content-type': 'text/plain' },
      });
    const result = await get('/datasets/plain')(state);
    expect(result.data).to.equal('plain text');
    expect(result.response.statusCode).to.equal(200);
  });

  it('should send query params', async () => {
    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset/,
        method: 'GET',
        query: { foo: 'bar' },
      })
      .reply(200, { ok: true });
    const result = await get('/datasets/new_dataset', {
      query: { foo: 'bar' },
    })(state);
    expect(result.data).to.eql({ ok: true });
    expect(result.response.statusCode).to.equal(200);
  });

  it('should list a single dataset', async () => {
    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset/,
        method: 'GET',
      })
      .reply(
        200,
        {
          id: 'new_dataset',
          title: 'New dataset',
          discriminator: 'DATA',
          groupId: 1,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await get('datasets/new_dataset')(state);
    expect(result.data).to.eql({
      id: 'new_dataset',
      title: 'New dataset',
      discriminator: 'DATA',
      groupId: 1,
    });
    expect(result.response.statusCode).to.eql(200);
  });
  it('should list a single dataset in csv format', async () => {
    mock
      .intercept({
        path: /\/api\/v2\/datasets\/data\/csv\/new_dataset/,
        method: 'GET',
        query: { asAttachment: true },
      })
      .reply(
        200,
        'id,name,users\n3,Trial,All users here\n4,Trial update,All users\n5,Trials,All users here\n',
        {
          headers: {
            'content-type': 'text/plain;charset=UTF-8',
            Accept: 'text/csv',
          },
        }
      );

    const result = await get('/datasets/data/csv/new_dataset', {
      query: { asAttachment: true },
    })(state);

    expect(result.data).to.eql(
      'id,name,users\n3,Trial,All users here\n4,Trial update,All users\n5,Trials,All users here\n'
    );
    expect(result.response.statusCode).to.eql(200);
  });
  it('should list a single record', async () => {
    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset\/record/,
        method: 'GET',
        query: { recordId: '2' },
      })
      .reply(
        200,
        {
          recordId: '2',
          values: {
            name: 'Triayuio8gtvgu7gt',
            id: '2',
            users: 'All users',
          },
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await get('/datasets/new_dataset/record', {
      query: {
        recordId: 2,
      },
    })(state);
    expect(result.data).to.eql({
      recordId: '2',
      values: {
        name: 'Triayuio8gtvgu7gt',
        id: '2',
        users: 'All users',
      },
    });
    expect(result.response.statusCode).to.eql(200);
  });
});

describe('delete', () => {
  it('should delete a dataset', async () => {
    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset/,
        method: 'DELETE',
      })
      .reply(
        200,
        {
          success: true,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await _delete('/datasets/new_dataset')(state);
    expect(result.data).to.eql({
      success: true,
    });
    expect(result.response.statusCode).to.eql(200);
  });

  it('should delete a dataset record', async () => {
    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset\/record/,
        method: 'DELETE',
        query: { recordId: '2' },
      })
      .reply(
        200,
        {
          success: true,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await _delete('/datasets/new_dataset/record', {
      query: { recordId: 2 },
    })(state);
    expect(result.data).to.eql({
      success: true,
    });
    expect(result.response.statusCode).to.eql(200);
  });
});

describe('post', () => {
  it('should delete a dataset', async () => {
    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset\/purge/,
        method: 'POST',
      })
      .reply(
        200,
        {
          success: true,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await post('/datasets/new_dataset/purge')(state);
    expect(result.data).to.eql({
      success: true,
    });
    expect(result.response.statusCode).to.eql(200);
  });
});
