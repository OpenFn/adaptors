import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import * as http from '../src/http.js';
import { stripUrlPath } from '../src/Utils.js';

const hostUrl = 'http://test-example.commcare.com';
const domain = 'test-staging';

const testServer = enableMockClient(hostUrl, { maxRedirections: 1 });

const configuration = {
  hostUrl,
  domain,
  username: 'user',
  apiKey: 'test-api-key',
};

const baseState = { configuration };


describe('stripUrlPath', () => {
  it('prefixes a relative path with /a/<domain>/api/', () => {
    expect(stripUrlPath('case/v1', 'my-domain')).to.equal(
      '/a/my-domain/api/case/v1'
    );
  });

  it('passes an absolute path through unchanged', () => {
    expect(stripUrlPath('/a/my-domain/api/case/v1', 'my-domain')).to.equal(
      '/a/my-domain/api/case/v1'
    );
  });

  it('treats any path starting with / as absolute', () => {
    expect(stripUrlPath('/some/custom/path', 'my-domain')).to.equal(
      '/some/custom/path'
    );
  });
});


describe('http.get', () => {
  it('gets cases using a relative path', async () => {
    testServer
      .intercept({
        path: '/a/test-staging/api/case/v1',
        method: 'GET',
      })
      .reply(200, { objects: [{ case_id: 'abc-001' }], meta: {} });

    const finalState = await http.get('case/v1')(baseState);

    expect(finalState.data).to.eql([{ case_id: 'abc-001' }]);
  });

  it('gets cases using an absolute path', async () => {
    testServer
      .intercept({
        path: '/a/test-staging/api/case/v1/',
        method: 'GET',
      })
      .reply(200, { objects: [{ case_id: 'abc-002' }], meta: {} });

    const finalState = await http.get(
      '/a/test-staging/api/case/v1/'
    )(baseState);

    expect(finalState.data).to.eql([{ case_id: 'abc-002' }]);
  });
});


describe('http.post', () => {
  it('creates a case using a relative path', async () => {
    testServer
      .intercept({
        path: '/a/test-staging/api/case/v2',
        method: 'POST',
      })
      .reply(200, {
        case_id: 'xyz-001',
        case_type: 'patient',
        case_name: 'Elizabeth Harmon',
      });

    const finalState = await http.post('case/v2', {
      case_type: 'patient',
      case_name: 'Elizabeth Harmon',
      owner_id: '20cc9dda-b90a-4af3-aa3d-fc67184e73ef',
      properties: { dob: '1948-11-02' },
    })(baseState);

    expect(finalState.data.case_name).to.equal('Elizabeth Harmon');
  });

  it('creates a case using an absolute path', async () => {
    testServer
      .intercept({
        path: '/a/test-staging/api/case/v2',
        method: 'POST',
      })
      .reply(200, {
        case_id: 'xyz-002',
        case_type: 'patient',
        case_name: 'Elizabeth Harmon',
      });

    const finalState = await http.post(
      '/a/test-staging/api/case/v2',
      {
        case_type: 'patient',
        case_name: 'Elizabeth Harmon',
        owner_id: '20cc9dda-b90a-4af3-aa3d-fc67184e73ef',
        properties: { dob: '1948-11-02' },
      }
    )(baseState);

    expect(finalState.data.case_name).to.equal('Elizabeth Harmon');
  });
});


describe('http.request', () => {
  it('GET cases with a relative path', async () => {
    testServer
      .intercept({
        path: '/a/test-staging/api/case/v1',
        method: 'GET',
      })
      .reply(200, { objects: [{ case_id: 'abc-003' }], meta: {} });

    const finalState = await http.request('GET', 'case/v1')(baseState);

    expect(finalState.data).to.eql([{ case_id: 'abc-003' }]);
  });

  it('GET cases using an absolute path', async () => {
    testServer
      .intercept({
        path: '/a/test-staging/api/case/v1/',
        method: 'GET',
      })
      .reply(200, { objects: [{ case_id: 'abc-004' }], meta: {} });

    const finalState = await http.request(
      'GET',
      '/a/test-staging/api/case/v1/'
    )(baseState);

    expect(finalState.data).to.eql([{ case_id: 'abc-004' }]);
  });

  it('POST a case with a relative path', async () => {
    testServer
      .intercept({
        path: '/a/test-staging/api/case/v2',
        method: 'POST',
      })
      .reply(200, {
        case_id: 'xyz-003',
        case_type: 'patient',
        case_name: 'Elizabeth Harmon',
      });

    const finalState = await http.request('POST', 'case/v2', {
      case_type: 'patient',
      case_name: 'Elizabeth Harmon',
      owner_id: '20cc9dda-b90a-4af3-aa3d-fc67184e73ef',
      properties: { dob: '1948-11-02' },
    })(baseState);

    expect(finalState.data.case_id).to.equal('xyz-003');
  });
});
