import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { execute, submitXls, get, post } from '../src';
import sinon from 'sinon';

const hostUrl = 'http://example.commcare.com';
const testServer = enableMockClient(hostUrl);
const domain = 'my-domain';
const app = 'my-app';

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
  it('should fetch cases', async () => {
    testServer
      .intercept({
        path: `/a/${domain}/api/v0.5/case`,
        method: 'GET',
        query: {
          limit: 1,
          offset: 0,
        },
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

    const { data, response } = await execute(
      get('case', { limit: 1, offset: 0 })
    )(state);

    expect(data.length).to.equal(1);
    expect(data[0]).to.haveOwnProperty('case_id');
    expect(response.meta.limit).to.equal(1);
  });

  it('should fetch cases with pagination', async () => {
    testServer
      .intercept({
        path: `/a/${domain}/api/v0.5/case`,
        method: 'GET',
        query: {
          limit: 1,
          offset: 0,
        },
      })
      .reply(200, () => {
        return {
          meta: {
            limit: 1,
            next: null,
            offset: 0,
            previous: null,
            total_count: 3,
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

    const { data, response } = await execute(
      get('case', { limit: 1, offset: 0 })
    )(state);

    expect(data.length).to.equal(3);
    expect(data[0]).to.haveOwnProperty('case_id');
    expect(response.meta.limit).to.equal(1);
  });

  it('should fetch a single case', async () => {
    testServer
      .intercept({
        path: `/a/${domain}/api/v0.5/case/12345`,
        method: 'GET',
        query: {
          limit: 1000,
          offset: 0,
        },
      })
      .reply(200, () => {
        return [
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
        ];
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

    expect(data[0].case_id).to.equal('12345');
    expect(data[0].properties.case_type).to.equal('pregnancy');
  });

  it('should fetch cases and call the callback', async () => {
    testServer
      .intercept({
        path: `/a/${domain}/api/v0.5/case`,
        method: 'GET',
        query: {
          limit: 1000,
          offset: 0,
        },
      })
      .reply(200, () => {
        return {
          meta: {
            limit: 1,
            next: null,
            offset: 0,
            previous: null,
            total_count: 2,
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
