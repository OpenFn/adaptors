import { expect } from 'chai';
import {
  enableMockClient,
  request,
  get,
  post,
  del,
} from '../../src/util/http.js';

const client = enableMockClient('https://www.example.com');

describe('request function', () => {
  describe('parseAs', () => {
    it('should auto parse as json', async () => {
      client
        .intercept({
          path: '/api',
          method: 'GET',
        })
        .reply(
          200,
          {
            name: 'mutchi',
          },
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        );

      const result = await request('GET', 'https://www.example.com/api');

      expect(result.body).to.eql({ name: 'mutchi' });
    });
    it('should auto parse as text by default', async () => {
      client
        .intercept({
          path: '/api',
          method: 'GET',
        })
        .reply(200, {
          name: 'joe',
        });

      const result = await request('GET', 'https://www.example.com/api');

      expect(result.body).to.eql(JSON.stringify({ name: 'joe' }));
    });
    it('should auto parse as text in any other case', async () => {
      client
        .intercept({
          path: '/api',
          method: 'GET',
        })
        .reply(200, 'hello world', {
          headers: {
            'content-type': 'application/xml',
          },
        });

      const result = await request('GET', 'https://www.example.com/api');

      expect(result.body).to.eql('hello world');
    });
    it('should force as json', async () => {
      client
        .intercept({
          path: '/api',
          method: 'GET',
        })
        .reply(200, {
          name: 'aissa',
        });

      const result = await request('GET', 'https://www.example.com/api', {
        parseAs: 'json',
      });

      expect(result.body).to.eql({ name: 'aissa' });
    });
    it('should force as json even if content type is string', async () => {
      client
        .intercept({
          path: '/api',
          method: 'GET',
        })
        .reply(
          200,
          {
            name: 'aissa',
          },
          {
            headers: {
              'content-type': 'application/text',
            },
          }
        );

      const result = await request('GET', 'https://www.example.com/api', {
        parseAs: 'json',
      });

      expect(result.body).to.eql({ name: 'aissa' });
    });
    it('should force as stream', async () => {
      client
        .intercept({
          path: '/api',
          method: 'GET',
        })
        .reply(200, {
          name: 'iam stream',
        });

      const result = await request('GET', 'https://www.example.com/api', {
        parseAs: 'stream',
      });

      //TODO - Better technique for testing stream
      expect(await result.body.json()).to.eql({ name: 'iam stream' });
    });
    it('should parse as json if content type is json', async () => {
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

      const { body } = await request('GET', 'https://www.example.com/api', {
        query: {
          id: '2',
        },
      });

      expect(body).to.eql({
        id: '2',
      });
    });
  });

  it('should make a successful arbitary request', async () => {
    client
      .intercept({
        path: '/api',
        method: 'JOE',
      })
      .reply(
        200,
        {},
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );

    const result = await request('JOE', 'https://www.example.com/api');

    expect(result.body).to.eql({});
    expect(result.code).to.eql(200);
  });
  it('should use baseUrl from options', async () => {
    client
      .intercept({
        path: '/api',
        method: 'GET',
      })
      .reply(200, {});

    const response = await request('GET', '/api', {
      baseUrl: 'https://www.example.com',
    });

    expect(response.code).to.eql(200);
  });
  it('should accept an absolute url', async () => {
    client
      .intercept({
        path: '/api',
        method: 'GET',
      })
      .reply(200, {});

    const response = await request('GET', 'https://www.example.com/api');

    expect(response.code).to.eql(200);
  });
});

describe('options', () => {
  it('should not throw 204 if response is okay using errorMap', async () => {
    client
      .intercept({
        path: '/api/content',
        method: 'GET',
      })
      .reply(200, {});

    const response = await request(
      'GET',
      'https://www.example.com/api/content',
      {
        errors: {
          204: 'Content not found',
        },
      }
    );

    expect(response.code).to.eql(200);
  });
  it('should throw 204 if response match using errorMap', async () => {
    client
      .intercept({
        path: '/api/noContent',
        method: 'GET',
      })
      .reply(204, { error: 'Content not found' });

    let error = null;
    try {
      await request('GET', 'https://www.example.com/api/noContent', {
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
      .reply(404, { error: 'Not found' });

    let error = null;
    try {
      await request('GET', 'https://www.example.com/api/noAccess', {
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
      .reply(404, { error: 'Not found' });

    let error = null;
    try {
      await request('GET', 'https://www.example.com/api/noAccess');
    } catch (err) {
      error = err;
    }

    expect(error.message).to.eql(
      'Request to https://www.example.com/api/noAccess failed with status: 404'
    );
  });
  it('should encode keys and values of query', async () => {
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
      await request('GET', 'https://www.example.com/api/noAccess', {
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
      await await request('GET', 'https://www.example.com/api/noAccess');
    } catch (err) {
      error = err;
    }
    expect(error.message).to.eql(
      'Request to https://www.example.com/api/noAccess failed with status: 405'
    );
  });
});

describe('helpers', () => {
  it('should make a successful GET request', async () => {
    client
      .intercept({
        path: '/api',
        method: 'GET',
      })
      .reply(
        200,
        {},
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );

    const { body, code } = await get('https://www.example.com/api');

    expect(body).to.eql({});
    expect(code).to.eql(200);
  });
  it('should handle different HTTP methods eg: POST', async () => {
    client
      .intercept({
        path: '/api',
        method: 'POST',
      })
      .reply(200);

    const { code } = await post('https://www.example.com/api');

    expect(code).to.eql(200);
  });
  it('should send a DELETE', async () => {
    client
      .intercept({
        path: '/api',
        method: 'DELETE',
      })
      .reply(
        200,
        {},
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );

    const { body, code } = await del('https://www.example.com/api');

    expect(body).to.eql({});
    expect(code).to.eql(200);
  });
});