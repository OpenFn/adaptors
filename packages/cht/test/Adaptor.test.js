import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, get, post, put } from '../src/Adaptor.js';

const testServer = enableMockClient('https://example.cht.com');

describe('request', () => {
  it('should send a GET request', async () => {
    const data = {
      has_permissions: true,
    };

    testServer
      .intercept({
        path: '/api/v1/settings',
        method: 'GET',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, data, { headers: { 'content-type': 'application/json' } });

    const state = {
      configuration: {
        baseUrl: 'https://example.cht.com',
        username: 'hello',
        password: 'there',
      },
      data,
    };

    const finalState = await request('GET', '/api/v1/settings')(state);

    expect(finalState.data).to.eql(data);
  });

  it('should throw for a 403 response', async () => {
    testServer
      .intercept({
        path: '/api/v1/contacts',
        method: 'GET',
      })
      .reply(403);

    const state = {
      configuration: {
        baseUrl: 'https://example.cht.com',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await request(
      'GET',
      '/api/v1/contacts'
    )(state).catch(error => {
      return error;
    });
    expect(error.statusMessage).to.eql('Forbidden');
  });
});

describe('get()', () => {
  it('should make a simple get request', async () => {
    const data = {
      has_permissions: true,
    };

    testServer
      .intercept({
        path: '/api/v1/settings',
        method: 'GET',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, data, { headers: { 'content-type': 'application/json' } });

    const state = {
      configuration: {
        baseUrl: 'https://example.cht.com',
        username: 'hello',
        password: 'there',
      },
      data,
    };

    const finalState = await get('/api/v1/settings')(state);

    expect(finalState.data).to.eql(data);
    expect(finalState.response.method).to.eql('GET');
  });
  it('should make a get that returns xml', async () => {
    const data = '<?xml version="1.0"?>';

    testServer
      .intercept({
        path: '/api/v1/forms/undo_death_report.xml',
        method: 'GET',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, data, { headers: { 'content-type': 'text/html' } });

    const state = {
      configuration: {
        baseUrl: 'https://example.cht.com',
        username: 'hello',
        password: 'there',
      },
      data,
    };

    const finalState = await get('/api/v1/forms/undo_death_report.xml')(state);

    expect(finalState.data).to.eql(data);
  });
  it('should make a get with parameters', async () => {
    const data = {
      code: 'immunization_visit',
    };

    testServer
      .intercept({
        path: '/api/v2/export/reports',
        method: 'GET',
        query: {
          limit: 1,
        },
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, data, { headers: { 'content-type': 'application/json' } });

    const state = {
      configuration: {
        baseUrl: 'https://example.cht.com',
        username: 'hello',
        password: 'there',
      },
      data,
    };

    const finalState = await get('/api/v2/export/reports', {
      query: { limit: 1 },
    })(state);
    expect(finalState.data).to.eql(data);
  });
});
describe('post()', () => {
  it('should make a simple post request', async () => {
    testServer
      .intercept({
        path: '/api/v1/people',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(
        201,
        {
          id: '71df9d25ed6732ea3b4435862510d115',
          rev: '1-a4060843d78f46a60a6f41051e40e3b5',
        },
        { headers: { 'content-type': 'application/json' } }
      );

    const state = {
      configuration: {
        baseUrl: 'https://example.cht.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        id: '71df9d25ed6732ea3b4435862510d115',
        rev: '1-a4060843d78f46a60a6f41051e40e3b5',
      },
    };

    const finalState = await post('/api/v1/people', {
      name: 'Samuel',
      place: '1d83f2b4a27eceb40df9e9f9ad06d137',
      type: 'contact',
      contact_type: 'chp',
    })(state);

    expect(finalState.data).to.eql({
      id: '71df9d25ed6732ea3b4435862510d115',
      rev: '1-a4060843d78f46a60a6f41051e40e3b5',
    });
  });
});

describe('put()', () => {
  it('should make a simple put request', async () => {
    testServer
      .intercept({
        path: '/api/v1/settings',
        method: 'PUT',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
        query: {
          overwrite: true,
        },
      })
      .reply(
        200,
        {
          success: true,
          upgraded: false,
        },
        { headers: { 'content-type': 'application/json' } }
      );

    const state = {
      configuration: {
        baseUrl: 'https://example.cht.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        success: true,
        upgraded: false,
      },
    };

    const finalState = await put('/api/v1/settings', {
      query: {
        overwrite: true,
      },
    })(state);

    expect(finalState.data).to.eql({
      success: true,
      upgraded: false,
    });
  });
});
