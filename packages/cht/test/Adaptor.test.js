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
      .reply(200, data);

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

  it('should include basic auth', async () => {
    testServer
      .intercept({
        path: '/api/v1/settings',
        method: 'GET',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, {});

    const state = {
      configuration: {
        baseUrl: 'https://example.cht.com',
        username: 'hello',
        password: 'there',
      },
      data: {},
    };

    const finalState = await request('GET', '/api/v1/settings')(state);

    expect(finalState.configuration).to.eql(state.configuration);
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
      .reply(200, data);

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
      .reply(201, {
        name: 'Hannah',
        phone: '+254712345678',
        type: 'contact',
        contact_type: 'patient',
      });

    const state = {
      configuration: {
        baseUrl: 'https://example.cht.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        name: 'Hannah',
        phone: '+254712345678',
        type: 'contact',
        contact_type: 'patient',
      },
    };

    const finalState = await post('/api/v1/people')(state);

    expect(finalState.data).to.eql({
      name: 'Hannah',
      phone: '+254712345678',
      type: 'contact',
      contact_type: 'patient',
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
      })
      .reply(200, {
        success: true,
        upgraded: false,
      });

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
      overwrite: true,
    })(state);

    expect(finalState.data).to.eql({
      success: true,
      upgraded: false,
    });
  });
});
