import { expect } from 'chai';
import { Readable } from 'node:stream';

import {
  enableMockClient,
  request,
  get,
  post,
  del,
  parseUrl,
  ERROR_URL_MISMATCH,
} from '../../src/util/http.js';

const client = enableMockClient('https://www.example.com');

describe.only('parseUrl', () => {
  it('should work with a url and path', () => {
    const { url, baseUrl, path } = parseUrl('https://www.example.org/a/b/c');

    expect(baseUrl).to.equal('https://www.example.org');
    expect(path).to.equal('/a/b/c');
    expect(url).to.eql('https://www.example.org/a/b/c');
  });

  it('should work with a path and valid base', () => {
    const { url, baseUrl, path } = parseUrl('a/b/c', 'https://www.example.org');

    expect(baseUrl).to.equal('https://www.example.org');
    expect(path).to.equal('/a/b/c');
    expect(url).to.eql('https://www.example.org/a/b/c');
  });

  it('should work with a path with a leading slash and valid base', () => {
    const { url, baseUrl, path } = parseUrl(
      '/a/b/c',
      'https://www.example.org'
    );

    expect(baseUrl).to.equal('https://www.example.org');
    expect(path).to.equal('/a/b/c');
    expect(url).to.eql('https://www.example.org/a/b/c');
  });

  it('should work with a path with a leading slash and a base with a trailing slash', () => {
    const { url, baseUrl, path } = parseUrl(
      '/a/b/c',
      'https://www.example.org/'
    );

    expect(baseUrl).to.equal('https://www.example.org');
    expect(path).to.equal('/a/b/c');
    expect(url).to.eql('https://www.example.org/a/b/c');
  });

  it('should work with path and url base', () => {
    const { url, baseUrl, path } = parseUrl(
      'a/b/c',
      'https://www.example.org/api'
    );

    expect(baseUrl).to.equal('https://www.example.org');
    expect(path).to.equal('/api/a/b/c');
    expect(url).to.eql('https://www.example.org/api/a/b/c');
  });

  it('should work with matching absolute url and base', () => {
    const { url, baseUrl, path } = parseUrl(
      'https://www.example.org/api/a/b/c',
      'https://www.example.org/api'
    );

    expect(baseUrl).to.equal('https://www.example.org');
    expect(path).to.equal('/api/a/b/c');
    expect(url).to.eql('https://www.example.org/api/a/b/c');
  });

  it('should work with matching absolute url and no base', () => {
    const { url, baseUrl, path } = parseUrl(
      'https://www.example.org/api/a/b/c'
    );

    expect(baseUrl).to.equal('https://www.example.org');
    expect(path).to.equal('/api/a/b/c');
    expect(url).to.eql('https://www.example.org/api/a/b/c');
  });

  it('should extract query parameters', () => {
    const { query } = parseUrl('a/b/c?x=1&y=2', 'https://www.example.org/api');

    expect(query).to.eql({ x: '1', y: '2' });
  });

  it('should extract empty query parameters', () => {
    const { query } = parseUrl('a', 'https://www.example.org/api');

    expect(query).to.eql({});
  });

  it('should throw if base has no protocol', () => {
    try {
      parseUrl('/a/b/c', 'www.example.org');
    } catch (e) {
      expect(e.message).to.eql('Invalid URL');
    }
  });

  it('should throw if path and no base', () => {
    try {
      parseUrl('/a/b/c');
    } catch (e) {
      expect(e.message).to.eql('Invalid URL');
    }
  });

  it('should throw if url and base mismatch', () => {
    try {
      parseUrl('http://www.x.com/a', 'http://www.y.com/a');
    } catch (e) {
      expect(e.message).to.eql(ERROR_URL_MISMATCH);
    }
  });
});

describe('request function', () => {
  it('should make a successful arbitary request', async () => {
    client
      .intercept({
        path: '/api',
        method: 'TEST',
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

    const result = await request('TEST', 'https://www.example.com/api');

    expect(result.body).to.eql({});
    expect(result.statusCode).to.eql(200);
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

    console.log(response);

    expect(response.statusCode).to.eql(200);
    expect(response.url).to.eql('https://www.example.com/api');
  });

  it('should accept an absolute url', async () => {
    client
      .intercept({
        path: '/api',
        method: 'GET',
      })
      .reply(200, {});

    const response = await request('GET', 'https://www.example.com/api');

    expect(response.statusCode).to.eql(200);
    expect(response.url).to.eql('https://www.example.com/api');
  });

  it('should include query parameters in the url', async () => {
    client
      .intercept({
        path: '/api',
        method: 'GET',
        query: {
          name: 'homelander',
        },
      })
      .reply(200, {});

    const response = await request(
      'GET',
      'https://www.example.com/api?name=homelander'
    );

    expect(response.statusCode).to.eql(200);
    expect(response.url).to.eql('https://www.example.com/api?name=homelander');
  });

  it('should include query parameters in the options', async () => {
    client
      .intercept({
        path: '/api',
        method: 'GET',
        query: {
          name: 'homelander',
        },
      })
      .reply(200, {});

    const response = await request('GET', 'https://www.example.com/api', {
      query: { name: 'homelander' },
    });

    expect(response.statusCode).to.eql(200);
    expect(response.url).to.eql('https://www.example.com/api');
  });

  it('should send data', async () => {
    const data = {
      hello: 'world',
    };
    let responseData;
    client
      .intercept({
        path: '/api',
        method: 'POST',
      })
      .reply(200, ({ body }) => {
        responseData = body;
        return {};
      });

    const response = await request('POST', 'https://www.example.com/api', {
      body: data,
    });

    expect(response.statusCode).to.eql(200);
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
          204: 'No Content',
        },
      }
    );

    expect(response.statusCode).to.eql(200);
  });

  it('should throw 204 if response match using errorMap', async () => {
    client
      .intercept({
        path: '/api/noContent',
        method: 'GET',
      })
      .reply(204, { error: 'No Content' });

    let error = null;
    try {
      await request('GET', 'https://www.example.com/api/noContent', {
        errors: {
          204: 'No Content',
        },
      });
    } catch (err) {
      error = err;
    }

    expect(error.message).to.eql('No Content');
  });

  it('should use errorMap with function', async () => {
    client
      .intercept({
        path: '/api/no-access',
        method: 'GET',
      })
      .reply(404, { error: 'Not Found' });

    let error = null;
    try {
      await request('GET', 'https://www.example.com/api/no-access', {
        errors: {
          404: response => (response.context ? 'No Access' : 'Not Found'),
        },
      });
    } catch (err) {
      error = err;
    }

    expect(error.message).to.eql('Not Found');
  });

  it('should throw by default if a 404', async () => {
    client
      .intercept({
        path: '/api/no-access',
        method: 'GET',
      })
      .reply(404, { error: 'Not Found' });

    let error = null;
    try {
      await request('GET', 'https://www.example.com/api/no-access');
    } catch (err) {
      error = err;
    }

    expect(error.message).to.eql(
      'GET to https://www.example.com/api/no-access returned 404: Not Found'
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
        path: '/api/no-access',
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
      await request('GET', 'https://www.example.com/api/no-access', {
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
        path: '/api/no-access',
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
      await await request('GET', 'https://www.example.com/api/no-access');
    } catch (err) {
      error = err;
    }
    expect(error.message).to.eql(
      'GET to https://www.example.com/api/no-access returned 405: Method Not Allowed'
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

    const { body, statusCode } = await get('https://www.example.com/api');

    expect(body).to.eql({});
    expect(statusCode).to.eql(200);
  });

  it('should send a post', async () => {
    const data = {
      hello: 'world',
    };

    client
      .intercept({
        path: '/api',
        method: 'POST',
      })
      .reply(200, ({ body }) => body, {
        headers: {
          'content-type': 'application/json',
        },
      });

    const { statusCode, body } = await post(
      'https://www.example.com/api',
      data
    );

    expect(statusCode).to.eql(200);
    expect(body).to.eql(data);
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

    const { body, statusCode } = await del('https://www.example.com/api');

    expect(body).to.eql({});
    expect(statusCode).to.eql(200);
  });

  describe('requestBodyType function', () => {
    let reqBody;
    before(() => {
      client
        .intercept({
          path: '/test-body',
          method: 'POST',
        })
        .reply(200, ({ body }) => {
          reqBody = body;
          return {};
        })
        .persist();
    });

    it('Handles null body', async () => {
      await request('POST', 'https://www.example.com/test-body', {
        body: null,
      });

      expect(reqBody).to.eql(undefined);
    });

    it('Handles undefined body', async () => {
      await request('POST', 'https://www.example.com/test-body');

      expect(reqBody).to.eql(undefined);
    });

    it('Handles Buffer body', async () => {
      const buffer = Buffer.from('Test data');
      await request('POST', 'https://www.example.com/test-body', {
        body: buffer,
      });

      expect(reqBody).to.eql(buffer);
    });

    it('Handles Readable stream body', async () => {
      const readableStream = new Readable.from('Test data');
      await request('POST', 'https://www.example.com/test-body', {
        body: readableStream,
      });

      expect(reqBody).to.eql(readableStream);
    });

    it('Handles string body', async () => {
      const stringBody = 'Test data';
      await request('POST', 'https://www.example.com/test-body', {
        body: stringBody,
      });

      expect(reqBody).to.eql(stringBody);
    });

    it('Handles object body (async iterable)', async () => {
      const asyncIterable = {
        [Symbol.asyncIterator]: function () {
          let i = 0;
          return {
            async next() {
              if (i < 3) {
                return { value: i++, done: false };
              } else {
                return { done: true };
              }
            },
          };
        },
      };

      await request('POST', 'https://www.example.com/test-body', {
        body: asyncIterable,
      });
      expect(reqBody).to.eql(asyncIterable);
    });

    it('Handles object body (iterable)', async () => {
      const iterable = {
        [Symbol.iterator]: function () {
          let i = 0;
          return {
            next() {
              if (i < 3) {
                return { value: i++, done: false };
              } else {
                return { done: true };
              }
            },
          };
        },
      };
      await request('POST', 'https://www.example.com/test-body', {
        body: iterable,
      });
      expect(reqBody).to.eql(iterable);
    });

    it('Handles object body (converts to JSON)', async () => {
      const objBody = { key: 'value' };
      const expectedJSON = JSON.stringify(objBody);
      await request('POST', 'https://www.example.com/test-body', {
        body: objBody,
      });
      expect(reqBody).to.eql(expectedJSON);
    });

    it('Handles FormData body', async () => {
      const formData = new FormData();
      formData.append('key1', 'value1');
      formData.append('key2', 'value2');
      await request('POST', 'https://www.example.com/test-body', {
        body: formData,
      });
      expect(reqBody).to.eql(formData);
    });

    it('Handles unsupported body type', async () => {
      await request('POST', 'https://www.example.com/test-body', {
        body: 123,
      }).catch(error => {
        expect(error.message).to.eql('Unsupported body type');
      });
    });
  });

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
});
