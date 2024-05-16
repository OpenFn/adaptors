import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { execute, submitXls } from '../src';

const hostUrl = 'http://example.commcare.com';
const testServer = enableMockClient(hostUrl);

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
    const domain = 'my-domain';
    const app = 'my-app';

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
