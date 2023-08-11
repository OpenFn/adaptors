import { expect } from 'chai';
import {
  enableMockClient,
  expandReferences,
  normalizeOauthConfig,
  get,
  post,
  del,
} from '../src/util';

const client = enableMockClient('https://www.example.com');

describe('methods', () => {
  it('should send a GET', async () => {
    // set up mock GET at /
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

    await get('https://www.example.com/api');

    // test the result
    expect(request.method).to.eql('GET');
  });

  it('should send a POST', async () => {
    // set up mock POST at /
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

    // test the result
    expect(request.method).to.eql('POST');
  });

  it('should send a DELETE', async () => {
    // set up mock DELETE at /
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

    // test the result
    expect(request.method).to.eql('DELETE');
  });
});

describe('options', () => {
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

    const response = await get('https://www.example.com/api', {
      query: {
        id: '2',
      },
    });

    console.log(response.headers);

    expect(request.query).to.eql({
      id: '2',
    });
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

describe('util expandReferences', () => {
  it('should not modify string references', () => {
    const name = 'mulder';
    const state = {};

    const [resolvedName] = expandReferences(state, name);

    expect(resolvedName).to.equal('mulder');
  });

  it('should expand function references', () => {
    const state = { name: 'mulder' };
    const name = s => s.name;

    const [resolvedName] = expandReferences(state, name);

    expect(resolvedName).to.equal('mulder');
  });

  it('should recursively expand function references', () => {
    const state = { name: 'mulder' };
    const name = s => s => s.name;

    const [resolvedName] = expandReferences(state, name);

    expect(resolvedName).to.equal('mulder');
  });

  it('should expand multiple references', () => {
    const state = { name: 'mulder', truth: 'out there' };
    const name = s => s.name;
    const truth = s => s.truth;

    const [resolvedName, resolvedTruth] = expandReferences(state, name, truth);

    expect(resolvedName).to.equal('mulder');
    expect(resolvedTruth).to.equal('out there');
  });

  it('should expand array references', () => {
    const state = { name: 'mulder' };
    const name = ['fox', s => s.name];

    const [resolvedName] = expandReferences(state, name);

    const [fname, sname] = resolvedName;
    expect(fname).to.equal('fox');
    expect(sname).to.equal('mulder');
  });

  it('should expand object references', () => {
    const state = { name: 'mulder' };
    const name = {
      first: 'fox',
      second: s => s.name,
    };

    const [resolvedName] = expandReferences(state, name);

    expect(resolvedName.first).to.equal('fox');
    expect(resolvedName.second).to.equal('mulder');
  });
});

describe('util normalizeOauthConfig', () => {
  it('should create an `accessToken` key for a standard OAuth2 JSON credential', () => {
    const configuration = { access_token: 'abc123' };

    const normalizedConfig = normalizeOauthConfig(configuration);

    expect(normalizedConfig).to.eql({
      ...configuration,
      accessToken: 'abc123',
    });
  });

  it('should use `accessToken` if `access_token` is not provided', () => {
    const configuration = { accessToken: 'def456' };

    const normalizedConfig = normalizeOauthConfig(configuration);

    expect(normalizedConfig).to.eql({
      accessToken: 'def456',
    });
  });

  it('should throw an error when both `accessToken` and `access_token` are provided', () => {
    const configuration = { access_token: 'abc123', accessToken: 'def456' };

    expect(function () {
      normalizeOauthConfig(configuration);
    }).to.throw('Both "accessToken" & "access_token" keys found');
  });
});
