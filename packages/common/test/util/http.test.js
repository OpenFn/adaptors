import { expect } from 'chai';
import { enableMockClient, get, post, del } from '../../src/util/http.js';

const client = enableMockClient('https://www.example.com');

const mockClient = (
  requestParams = { path, query, method, body, headers },
  statusCode,
  replyData,
  replyHeaders
) => {
  return client
    .intercept({
      ...requestParams,
    })
    .reply(statusCode, replyData, replyHeaders);
};

describe('request', () => {
  it('should not set header content-type to application/json if body is string', async () => {
    let request;
    client
      .intercept({
        path: '/api',
        method: 'POST',
      })
      .reply(200, r => {
        request = r;
        return '';
      });

    await post('/api', 'some string', {
      baseUrl: 'https://www.example.com',
    });

    expect(request.headers).to.eql({});
  });
  it('should use baseUrl from options', async () => {
    let request;
    client
      .intercept({
        path: '/api',
        method: 'GET',
      })
      .reply(200, r => {
        request = r;
        return {};
      });

    const response = await get('/api', { baseUrl: 'https://www.example.com' });

    expect(request.path).to.eql('/api');
    expect(response.code).to.eql(200);
  });

  it('should accept an absolute url', async () => {
    let request;
    client
      .intercept({
        path: '/api',
        method: 'GET',
      })
      .reply(200, r => {
        request = r;
        return {};
      });

    const response = await get('https://www.example.com/api');

    expect(request.path).to.eql('/api');
    expect(response.code).to.eql(200);
  });
});
describe('methods', () => {
  it('should send a GET', async () => {
    mockClient(
      {
        path: '/api',
        method: 'GET',
      },
      200,
      {},
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    const finalState = await get('https://www.example.com/api');

    expect(finalState.data).to.eql({});
    expect(finalState.code).to.eql(200);
  });

  it('should send a POST', async () => {
    let request;

    client
      .intercept({
        path: '/api',
        method: 'POST',
      })
      .reply(200, r => {
        request = r;
        return {};
      });

    await post('https://www.example.com/api');

    expect(request.method).to.eql('POST');
  });

  it('should send a DELETE', async () => {
    let request;

    client
      .intercept({
        path: '/api',
        method: 'DELETE',
      })
      .reply(200, r => {
        request = r;
        return {};
      });

    await del('https://www.example.com/api');

    expect(request.method).to.eql('DELETE');
  });
});

describe('options', () => {
  it('should not throw 204 if response is okay using errorMap', async () => {
    client
      .intercept({
        path: '/api/content',
        method: 'GET',
      })
      .reply(
        200,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

    const response = await get('https://www.example.com/api/content', {
      errors: {
        204: 'Content not found',
      },
    });

    expect(response.code).to.eql(200);
  });
  it('should throw 204 if response match using errorMap', async () => {
    client
      .intercept({
        path: '/api/noContent',
        method: 'GET',
      })
      .reply(
        204,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

    let error = null;
    try {
      await get('https://www.example.com/api/noContent', {
        errors: {
          204: 'Content not found',
        },
      });
    } catch (err) {
      error = err;
    }

    expect(error.message).to.eql('Content not found');
  });
  it('should use errorMap with function', async () => {
    client
      .intercept({
        path: '/api/noAccess',
        method: 'GET',
      })
      .reply(
        404,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

    let error = null;
    try {
      await get('https://www.example.com/api/noAccess', {
        errors: {
          404: response => (response.context ? 'No Access' : 'Not found'),
        },
      });
    } catch (err) {
      error = err;
    }

    expect(error.message).to.eql('Not found');
  });

  it('should throw by default if a 404', async () => {
    client
      .intercept({
        path: '/api/noAccess',
        method: 'GET',
      })
      .reply(
        404,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

    let error = null;
    try {
      await get('https://www.example.com/api/noAccess');
    } catch (err) {
      error = err;
    }

    expect(error.message).to.eql(
      'Request to https://www.example.com/api/noAccess failed with status: 404'
    );
  });
  it('should include headers', async () => {
    // check the headers that are incuded in the actual request
    let request;
    client
      .intercept({
        path: '/api',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .reply(200, r => {
        request = r;
        return {};
      });

    await get('https://www.example.com/api', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(request.headers).to.eql({
      'Content-Type': 'application/json',
    });
  });

  it('should encode keys and values of query', async () => {
    // check the headers that are incuded in the actual request
    let request;
    client
      .intercept({
        path: '/api?id=2',
        method: 'GET',
      })
      .reply(200, r => {
        request = r;
        return {};
      });

    await get('https://www.example.com/api', {
      query: {
        id: '2',
      },
    });

    expect(request.query).to.eql({
      id: '2',
    });
  });

  it('should throw and use errorMap string value', async () => {
    client
      .intercept({
        path: '/api/noAccess',
        method: 'GET',
      })
      .reply(
        404,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

    let error = null;
    try {
      await get('https://www.example.com/api/noAccess', {
        errors: {
          404: 'No Access',
        },
      });
    } catch (err) {
      error = err;
    }

    expect(error.message).to.eql('No Access');
  });

  it('should throw and use default values', async () => {
    client
      .intercept({
        path: '/api/noAccess',
        method: 'GET',
      })
      .reply(
        405,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

    let error = null;
    try {
      await await get('https://www.example.com/api/noAccess');
    } catch (err) {
      error = err;
    }
    expect(error.message).to.eql(
      'Request to https://www.example.com/api/noAccess failed with status: 405'
    );
  });

  it('should parse a response body as json if content-type is json', async () => {
    client
      .intercept({
        path: '/api?id=2',
        method: 'GET',
      })
      .reply(
        200,
        { id: '2' },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

    const response = await get('https://www.example.com/api', {
      query: {
        id: '2',
      },
    });

    expect(response.data).to.eql({
      id: '2',
    });
  });

  //TODO
  it.skip('should force parse a response body as if json: true is passed', () => {});
});
