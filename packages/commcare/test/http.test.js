import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { http } from '../src/index.js';
import { buildUrl } from '../src/Utils.js';

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

// Builds a v1 (offset/limit) paginated responder for use with .reply(200, fn)
const v1Responder = (objects, pageSize = 1) => req => {
  const offset = Number(req.query.offset ?? 0);
  const limit = Number(req.query.limit ?? pageSize);
  const nextOffset = offset + limit;
  const next =
    nextOffset < objects.length ? `?limit=${limit}&offset=${nextOffset}` : null;
  return {
    objects: objects.slice(offset, offset + limit),
    meta: { limit, offset, next, total_count: objects.length },
  };
};

// Builds a v2 (cursor) paginated responder. The cursor encodes the next index.
const v2Responder = (objects, pageSize = 1) => req => {
  const cursor = req.query.cursor ? Number(req.query.cursor) : 0;
  const nextCursor = cursor + pageSize;
  const next =
    nextCursor < objects.length
      ? `${hostUrl}/a/test-staging/api/case/v2?cursor=${nextCursor}`
      : null;
  return { cases: objects.slice(cursor, cursor + pageSize), next };
};


describe('buildUrl', () => {
  it('prefixes a relative path with /a/<domain>/api/', () => {
    expect(buildUrl('case/v1', 'my-domain')).to.equal(
      '/a/my-domain/api/case/v1'
    );
  });

  it('passes an absolute path through unchanged', () => {
    expect(buildUrl('/a/my-domain/api/case/v1', 'my-domain')).to.equal(
      '/a/my-domain/api/case/v1'
    );
  });

  it('treats any path starting with / as absolute', () => {
    expect(buildUrl('/some/custom/path', 'my-domain')).to.equal(
      '/some/custom/path'
    );
  });
});


describe('http.get', () => {
  it('gets cases using a relative path', async () => {
    testServer
      .intercept({ path: '/a/test-staging/api/case/v1', method: 'GET' })
      .reply(200, { objects: [{ case_id: 'abc-001' }], meta: {} });

    const finalState = await http.get('case/v1')(baseState);

    expect(finalState.data).to.eql([{ case_id: 'abc-001' }]);
  });

  it('gets cases using an absolute path', async () => {
    testServer
      .intercept({ path: '/a/test-staging/api/case/v1/', method: 'GET' })
      .reply(200, { objects: [{ case_id: 'abc-002' }], meta: {} });

    const finalState = await http.get('/a/test-staging/api/case/v1/')(baseState);

    expect(finalState.data).to.eql([{ case_id: 'abc-002' }]);
  });

  describe('no pagination', () => {
    it('does not paginate even when meta.next is present (v1)', async () => {
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, v1Responder([{ case_id: 'a1' }, { case_id: 'a2' }], 1));

      const finalState = await http.get('case/v1')(baseState);

      expect(finalState.data).to.eql([{ case_id: 'a1' }]);
    });

    it('does not paginate even when body.next is present (v2)', async () => {
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v2/, method: 'GET' })
        .reply(200, v2Responder([{ case_id: 'b1' }, { case_id: 'b2' }], 1));

      const finalState = await http.get('case/v2')(baseState);


      expect(finalState.data).to.eql([{ case_id: 'b1' }]);
    });

    it('ignores paginate: false', async () => {
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, v1Responder([{ case_id: 'a1' }, { case_id: 'a2' }], 1));

      const finalState = await http.get('case/v1', { paginate: false })(
        baseState
      );

      expect(finalState.data).to.eql([{ case_id: 'a1' }]);
    });

    it('does not send paginate as a query param', async () => {
      let sentQuery;
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, req => {
          sentQuery = req.query;
          return { objects: [{ case_id: 'a1' }], meta: {} };
        });

      await http.get('case/v1', { paginate: false, limit: 5 })(baseState);

      expect(sentQuery).to.not.have.property('paginate');
      expect(sentQuery.limit).to.eql(5);
    });
  });

  describe('pagination with paginate: true', () => {
    it('accumulates all results into state.data', async () => {
      const objects = [{ case_id: '1' }, { case_id: '2' }, { case_id: '3' }];
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, v1Responder(objects, 1))
        .times(3);

      const finalState = await http.get('case/v1', { paginate: true })(
        baseState
      );

      expect(finalState.data).to.eql(objects);
    });

    it('sends the computed offset/limit on subsequent v1 requests', async () => {
      const queries = [];
      const objects = [{ case_id: '1' }, { case_id: '2' }, { case_id: '3' }];
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, req => {
          queries.push(req.query);
          return v1Responder(objects, 1)(req);
        })
        .times(3);

      await http.get('case/v1', { paginate: true })(baseState);

      expect(queries[0].offset).to.be.undefined;
      expect(queries[1].offset).to.eql(1);
      expect(queries[2].offset).to.eql(2);
    });

    it('accumulates all v2 pages using the cursor', async () => {
      const objects = [{ case_id: '1' }, { case_id: '2' }, { case_id: '3' }];
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v2/, method: 'GET' })
        .reply(200, v2Responder(objects, 1))
        .times(3);

      const finalState = await http.get('case/v2', { paginate: true })(
        baseState
      );

      expect(finalState.data).to.eql(objects);
    });

    it('extracts the cursor from  v2 next URL', async () => {
      const queries = [];
      const objects = [{ case_id: '1' }, { case_id: '2' }];
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v2/, method: 'GET' })
        .reply(200, req => {
          queries.push(req.query);
          return v2Responder(objects, 1)(req);
        })
        .times(2);

      await http.get('case/v2', { paginate: true })(baseState);

      expect(queries[0].cursor).to.be.undefined;
      expect(queries[1].cursor).to.eql('1');
    });

    it('returns a single page when there is no next page', async () => {
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, v1Responder([{ case_id: 'only' }], 1));

      const finalState = await http.get('case/v1', { paginate: true })(
        baseState
      );

      expect(finalState.data).to.eql([{ case_id: 'only' }]);
    });

    it('does not send paginate as a query param', async () => {
      let sentQuery;
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, req => {
          sentQuery = req.query;
          return { objects: [{ case_id: '1' }], meta: { next: null } };
        });

      await http.get('case/v1', { paginate: true })(baseState);

      expect(sentQuery).to.not.have.property('paginate');
    });

    it("respects the user's limit while paginating (v1)", async () => {
      const objects = [
        { case_id: '1' },
        { case_id: '2' },
        { case_id: '3' },
        { case_id: '4' },
      ];
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, req => v1Responder(objects, 2)(req))
        .times(2);

      const finalState = await http.get('case/v1', {
        paginate: true,
        limit: 2,
      })(baseState);

      expect(finalState.data).to.eql(objects);
    });
  });

  describe('pagination with a streaming callback', () => {
    it('invokes the callback once per v1 page', async () => {
      const objects = [{ case_id: '1' }, { case_id: '2' }, { case_id: '3' }];
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, v1Responder(objects, 1))
        .times(3);

      const pages = [];
      await http.get('case/v1', { paginate: true }, state => {
        pages.push(state.data);
        return state;
      })(baseState);

      expect(pages).to.eql([
        [{ case_id: '1' }],
        [{ case_id: '2' }],
        [{ case_id: '3' }],
      ]);
    });

    it('invokes the callback once per v2 page', async () => {
      const objects = [{ case_id: '1' }, { case_id: '2' }, { case_id: '3' }];
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v2/, method: 'GET' })
        .reply(200, v2Responder(objects, 1))
        .times(3);

      const pages = [];
      await http.get('case/v2', { paginate: true }, state => {
        pages.push(state.data);
        return state;
      })(baseState);

      expect(pages).to.eql([
        [{ case_id: '1' }],
        [{ case_id: '2' }],
        [{ case_id: '3' }],
      ]);
    });

    it('does not append results into state.data when callback is provided', async () => {
      const objects = [{ case_id: '1' }, { case_id: '2' }];
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, v1Responder(objects, 1))
        .times(2);

      const finalState = await http.get('case/v1', { paginate: true }, s => s)(
        baseState
      );

      expect(finalState.data).to.eql({});
    });

    it('calls the callback once when there is no next page', async () => {
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, v1Responder([{ case_id: 'only' }], 1));

      let calls = 0;
      const finalState = await http.get('case/v1', { paginate: true }, state => {
        calls++;
        return state;
      })(baseState);

      expect(calls).to.equal(1);
      expect(finalState.data).to.eql({});
    });

    it('streams a single page when paginate is not set', async () => {
      const objects = [{ case_id: '1' }, { case_id: '2' }];
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(200, v1Responder(objects, 1));

      const pages = [];
      const finalState = await http.get('case/v1', {}, state => {
        pages.push(state.data);
        return state;
      })(baseState);

      expect(pages).to.eql([[{ case_id: '1' }]]);
      expect(finalState.data).to.eql({});
    });
  });

  describe('errors', () => {
    it('throws when the server responds with an error', async () => {
      testServer
        .intercept({ path: /\/a\/test-staging\/api\/case\/v1/, method: 'GET' })
        .reply(500, { error: 'boom' });

      let caught;
      try {
        await http.get('case/v1')(baseState);
      } catch (e) {
        caught = e;
      }

      expect(caught).to.not.be.undefined;
      expect(caught.statusCode).to.eql(500);
    });
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
