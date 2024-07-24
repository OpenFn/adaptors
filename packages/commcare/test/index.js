import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { execute, submitXls, get, post } from '../src';

const hostUrl = 'http://example.commcare.com';
const testServer = enableMockClient(hostUrl);
const domain = 'my-domain';
const app = 'my-app';

const defaultObjects = [
  { case_id: '1' },
  { case_id: '2' },
  { case_id: '3' },
  { case_id: '4' },
  { case_id: '5' },
  { case_id: '6' },
];
const paginatedResponse = (offset = 0, limit, objects = defaultObjects) => {
  const next =
    offset + limit < objects.length ? `offset=${offset + limit}&limit=1` : null;

  return {
    meta: {
      limit: limit,
      next: next,
      offset: offset,
      total_count: objects.length,
    },
    objects: objects.slice(offset, limit + offset),
  };
};

describe('paginatedResponse', () => {
  it('should handle offset=0 limit=1', () => {
    const result = paginatedResponse(0, 1);
    expect(result).to.eql({
      meta: {
        limit: 1,
        offset: 0,
        total_count: 6,
        next: 'offset=1&limit=1',
      },
      objects: [{ case_id: '1' }],
    });
  });

  it('should handle offset=3 limit=3', () => {
    const result = paginatedResponse(3, 3);
    expect(result.meta).to.eql({
      limit: 3,
      offset: 3,
      total_count: 6,
      next: null,
    });
    expect(result.objects.length).to.equal(3);
  });
  it('should handle offset=5 limit=1', () => {
    const result = paginatedResponse(5, 1);
    expect(result.meta).to.eql({
      limit: 1,
      offset: 5,
      total_count: 6,
      next: null,
    });
    expect(result.objects.length).to.equal(1);
  });

  it('should handle offset=0 limit=6', () => {
    const result = paginatedResponse(0, 6);
    expect(result.meta).to.eql({
      limit: 6,
      offset: 0,
      total_count: 6,
      next: null,
    });
    expect(result.objects.length).to.equal(6);
  });
  it('should handle offset=5 limit=12', () => {
    const result = paginatedResponse(5, 12);
    expect(result.meta).to.eql({
      limit: 12,
      offset: 5,
      total_count: 6,
      next: null,
    });
    expect(result.objects.length).to.equal(1);
  });
});

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {
      data: {},
      configuration: {},
    };
    let operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    let state = {
      data: {},
      configuration: {},
    };

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});

describe('SubmitXls', () => {
  it('should submit JSON as an xls file', async () => {
    let formdata;

    testServer
      .intercept({
        path: `/a/${domain}/importer/excel/bulk_upload_api/`,
        method: 'POST',
      })
      .reply(200, req => {
        // save out the form data that was upladed
        formdata = req.body;

        // simulate a return from commcare
        return { code: 200, message: 'success' };
      });

    const state = {
      configuration: {
        hostUrl,
        domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };

    const { data } = await execute(
      submitXls([{ name: 'Mamadou', phone: '000000' }], {
        case_type: 'student',
        search_field: 'external_id',
        create_new_cases: 'on',
      })
    )(state);

    // The response  should be on state.data
    expect(data.code).to.equal(200);
    expect(data.message).to.equal('success');

    // And the adaptor should have uploaded a reasonable looking formdata object
    expect(formdata.get('case_type')).to.not.be.undefined;
    expect(formdata.get('case_type')).to.equal('student');
    expect(formdata.get('search_field')).to.equal('external_id');
    expect(formdata.get('create_new_cases')).to.equal('on');
  });
});

describe('getCases', () => {
  it.only('should fetch cases', async () => {
    testServer
      .intercept({
        path: `/a/${domain}/api/v0.5/case`,
        method: 'GET',
      })
      .reply(200, () => {
        return {
          meta: {
            limit: 1,
            next: null,
            offset: 0,
            previous: null,
            total_count: 1,
          },
          objects: [
            {
              case_id: '12345',
              closed: false,
              closed_by: null,
              date_closed: null,
              date_modified: 'xxxxx',
              domain: `${domain}`,
              id: '12345',
              indexed_on: 'xxxxx',
              indices: {},
              opened_by: 'xxxxx',
              properties: {
                Children_alive: 'no',
                Last_menstrual_period: 'xxxx',
                Total_children: '',
                case_name: 'Jane',
                case_type: 'pregnancy',
                date_opened: 'xxxxx',
                external_id: null,
                feeling_sick: 'No',
                owner_id: 'xxxxxx',
                village_name: 'Somewhere',
              },
              resource_uri: '',
              server_date_modified: 'xxxxx',
              server_date_opened: 'xxxxx',
              user_id: 'xxxxx',
              xform_ids: ['xxxx'],
            },
          ],
        };
      });

    const state = {
      configuration: {
        hostUrl,
        domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };

    const { data, response } = await execute(get('case'))(state);

    expect(data.length).to.equal(1);
    expect(data[0]).to.haveOwnProperty('case_id');
    expect(response.meta.limit).to.equal(1);
  });
  it('should fetch a single case', async () => {
    testServer
      .intercept({
        path: `/a/${domain}/api/v0.5/case/12345`,
        method: 'GET',
      })
      .reply(200, () => {
        return {
          case_id: '12345',
          closed: false,
          closed_by: null,
          date_closed: null,
          date_modified: 'xxxxx',
          domain: `${domain}`,
          id: '12345',
          indexed_on: 'xxxxx',
          indices: {},
          opened_by: 'xxxxx',
          properties: {
            Children_alive: 'no',
            Last_menstrual_period: 'xxxx',
            Total_children: '',
            case_name: 'Jane',
            case_type: 'pregnancy',
            date_opened: 'xxxxx',
            external_id: null,
            feeling_sick: 'No',
            owner_id: 'xxxxxx',
            village_name: 'Somewhere',
          },
          resource_uri: '',
          server_date_modified: 'xxxxx',
          server_date_opened: 'xxxxx',
          user_id: 'xxxxx',
          xform_ids: ['xxxx'],
        };
      });

    const state = {
      configuration: {
        hostUrl,
        domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };

    const { data } = await execute(get('case/12345'))(state);
    expect(data.case_id).to.equal('12345');
    expect(data.properties.case_type).to.equal('pregnancy');
  });

  it.only('should fetch cases and call the callback', async () => {
    testServer
      .intercept({
        path: `/a/${domain}/api/v0.5/case`,
        method: 'GET',
      })
      .reply(200, () => {
        return {
          meta: {
            limit: 1,
            next: null,
            offset: 0,
            previous: null,
            total_count: 1,
          },
          objects: [
            {
              case_id: '12345',
              closed: false,
              closed_by: null,
              date_closed: null,
              date_modified: 'xxxxx',
              domain: `${domain}`,
              id: '12345',
              indexed_on: 'xxxxx',
              indices: {},
              opened_by: 'xxxxx',
              properties: {
                Children_alive: 'no',
                Last_menstrual_period: 'xxxx',
                Total_children: '',
                case_name: 'Jane',
                case_type: 'pregnancy',
                date_opened: 'xxxxx',
                external_id: null,
                feeling_sick: 'No',
                owner_id: 'xxxxxx',
                village_name: 'Somewhere',
              },
              resource_uri: '',
              server_date_modified: 'xxxxx',
              server_date_opened: 'xxxxx',
              user_id: 'xxxxx',
              xform_ids: ['xxxx'],
            },
          ],
        };
      });

    const state = {
      configuration: {
        hostUrl,
        domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };
    let callbackArg;
    const callback = state => {
      callbackArg = state;
      return state;
    };

    await execute(get('case', {}, callback))(state);
    expect(callbackArg.data).to.deep.equal([
      {
        case_id: '12345',
        closed: false,
        closed_by: null,
        date_closed: null,
        date_modified: 'xxxxx',
        domain: `${domain}`,
        id: '12345',
        indexed_on: 'xxxxx',
        indices: {},
        opened_by: 'xxxxx',
        properties: {
          Children_alive: 'no',
          Last_menstrual_period: 'xxxx',
          Total_children: '',
          case_name: 'Jane',
          case_type: 'pregnancy',
          date_opened: 'xxxxx',
          external_id: null,
          feeling_sick: 'No',
          owner_id: 'xxxxxx',
          village_name: 'Somewhere',
        },
        resource_uri: '',
        server_date_modified: 'xxxxx',
        server_date_opened: 'xxxxx',
        user_id: 'xxxxx',
        xform_ids: ['xxxx'],
      },
    ]);
  });
});

describe('get', () => {
  it('should fetch the next page if the response has a meta.next property', async () => {
    const objects = [
      { case_id: '123' },
      { case_id: '456' },
      { case_id: '789' },
    ];
    testServer
      .intercept({
        path: /\/a\/my-domain\/api\/v0\.5\/case/,
        method: 'GET',
      })
      .reply(200, req => {
        return paginatedResponse(req.query.offset, 1, objects);
      })
      .times(5);

    const state = {
      configuration: {
        hostUrl,
        domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };

    const { data, response } = await execute(get('case'))(state);
    expect(data.length).to.equal(3);
    expect(response.meta.limit).to.equal(1);
    expect(response.meta.offset).to.equal(2);
  });

  it('should call the callback once per page', async () => {
    const objects = [
      { case_id: '123' },
      { case_id: '456' },
      { case_id: '789' },
    ];
    testServer
      .intercept({
        path: /\/a\/my-domain\/api\/v0\.5\/case/,
        method: 'GET',
      })
      .reply(200, req => {
        return paginatedResponse(req.query.offset, 1, objects);
      })
      .times(3);

    const state = {
      configuration: {
        hostUrl,
        domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };

    let callbackArgCount = 0;
    const callback = state => {
      callbackArgCount++;
      return state;
    };

    const { data, response } = await execute(get('case', {}, callback))(state);

    expect(data.length).to.equal(3);
    expect(response.meta.limit).to.equal(1);
    expect(response.meta.offset).to.equal(2);
    expect(callbackArgCount).to.deep.equal(3);
  });

  it('should not add limit and offset to the parameters of the first request if the user does not pass them', async () => {
    testServer
      .intercept({
        path: /\/a\/my-domain\/api\/v0\.5\/case/,
        method: 'GET',
      })
      .reply(200, () => {
        return {
          meta: {
            limit: 1,
            next: null,
            offset: 1,
            previous: null,
            total_count: 1,
          },
          objects: [],
        };
      });

    const state = {
      configuration: {
        hostUrl,
        domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };

    const { response } = await execute(get('case'))(state);
    expect(response.statusCode).to.equal(200);
  });

  it('should not auto-fetch if the user sets an offset', async () => {
    let callCount = 0;
    testServer
      .intercept({
        path: /\/a\/my-domain\/api\/v0\.5\/case/,
        method: 'GET',
        query: {
          offset: 1,
        },
      })
      .reply(200, () => {
        callCount++;

        return {
          meta: {
            limit: 1,
            next: 'offset=2',
            offset: 1,
            previous: null,
            total_count: 3,
          },
          objects: [{ case_id: '789' }],
        };
      });

    const state = {
      configuration: {
        hostUrl,
        domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };

    const { data } = await execute(get('case', { offset: 1 }))(state);
    expect(data.length).to.equal(1);
    expect(callCount).to.equal(1);
  });

  it("should respect the user's limit while paginating", async () => {
    testServer
      .intercept({
        path: /\/a\/my-domain\/api\/v0\.5\/case/,
        method: 'GET',
        query: {
          limit: 2,
        },
      })
      .reply(200, req => {
        return paginatedResponse(req.query.offset, req.query.limit);
      })
      .times(5);

    const state = {
      configuration: {
        hostUrl,
        domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };

    const callback = state => {
      expect(state.data.length).to.equal(2);
      return state;
    };

    const { data } = await execute(get('case', { limit: 2 }, callback))(state);
    expect(data.length).to.equal(6);
  });

  it('should call the callback once for a single request', async () => {
    testServer
      .intercept({
        path: `/a/${domain}/api/v0.5/case`,
        method: 'GET',
      })
      .reply(200, () => {
        return {
          meta: {
            limit: 1,
            next: null,
            offset: 0,
            previous: null,
            total_count: 1,
          },
          objects: { case_id: '123' },
        };
      });

    const state = {
      configuration: {
        hostUrl,
        domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };

    let callbackArgCount = 0;
    const callback = state => {
      callbackArgCount++;
      return state;
    };

    await execute(get('case', {}, callback))(state);
    expect(callbackArgCount).to.deep.equal(1);
  });
});
describe('createUser', () => {
  it('should create a user', async () => {
    testServer
      .intercept({
        path: `/a/${domain}/api/v0.5/user`,
        method: 'POST',
      })
      .reply(201, () => {
        // simulate a return from commcare
        return {
          id: '123456',
        };
      });

    const state = {
      configuration: {
        hostUrl,
        domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };

    const { data, response } = await execute(
      post('user', {
        username: 'person',
        password: 'per1234',
        first_name: 'Per',
        last_name: 'Son',
        default_phone_number: '+50253311399',
        email: 'person@example.org',
      })
    )(state);

    expect(data).to.haveOwnProperty('id');
    expect(response.statusCode).to.equal(201);
  });
});
