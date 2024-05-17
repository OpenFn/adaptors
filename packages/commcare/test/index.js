import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { execute, submitXls, get } from '../src';

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
        applicationName: domain,
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
    let method;
    let path;

    testServer
      .intercept({
        path: `/a/${domain}/api/v0.5/case`,
        method: 'GET',
      })
      .reply(200, req => {
        method = req.method;
        path = req.path;

        // simulate a return from commcare
        return {
          code: 200,
          message: 'success',
          data: [
            {
              case_id: '12345',
              properties: { case_type: 'pregnancy', case_name: 'Jane' },
            },
          ],
        };
      });

    const state = {
      configuration: {
        hostUrl,
        applicationName: domain,
        appId: app,
        username: 'user',
        password: 'password',
      },
    };

    const { data } = await execute(get('case'))(state);

    // The response  should be on state.data
    expect(data.code).to.equal(200);
    expect(data.message).to.equal('success');
    expect(data.data[0]).to.haveOwnProperty('case_id');

    // And the adaptor should have uploaded a reasonable looking formdata object
    expect(method).to.equal('GET');
    expect(path).to.equal('/a/my-domain/api/v0.5/case');
  });
});
