import { expect } from 'chai';
import {
  expandReferences,
  normalizeOauthConfig,
  get,
  post,
  del,
} from '../src/util';

import { MockAgent, setGlobalDispatcher } from 'undici';

const mockAgent = new MockAgent();
const mockPool = mockAgent.get('https://www.example.com');

setGlobalDispatcher(mockAgent);

describe.only('methods', () => {
  it('should send a GET', async () => {
    // set up mock GET at /
    let request;
    mockPool
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

    mockPool
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

    mockPool
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

describe.skip('options', () => {
  it('should include headers', () => {
    // check the headers that are incuded in the actual request
  });

  it('should parse a response body as json if content-type is json', () => {});

  //TODO
  it.skip('should force parse a response body as if json: true is passed', () => {});
});

describe('post', () => {
  it('sends a post request', async () => {
    mockPool
      .intercept({
        path: '/api/fake',
        method: 'POST',
      })
      .reply(200);

    const response = await post('https://www.example.com/api/fake');

    expect(Object.keys(response)).to.eql(['code', 'headers', 'data']);

    expect(response.code).to.eql(200);
  });

  it('should include a json body with content-type header', async () => {
    mockPool
      .intercept({
        path: '/api/fake?id=2',
        method: 'POST',
        body: JSON.stringify('stringPayload'),
      })
      .reply(
        200,
        { id: 2 },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

    const response = await post(
      'https://www.example.com/api/fake',
      'stringPayload',
      { query: { id: 2 } }
    );

    expect(response.code).to.eql(200);
    expect(response.data).to.eql({ id: 2 });
  });
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
