import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import Adaptor from '../src';

const { execute, postData } = Adaptor;
const testServer = enableMockClient('https://fake.server.com');

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {};
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
    let state = {};

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe('post', () => {
  it('calls the callback', async () => {
    let state = {
      configuration: {
        username: 'hello',
        password: 'there',
      },
    };

    testServer
      .intercept({
        method: 'POST',
        path: '/api',
      })
      .reply(200, { foo: 'bar' });

    const result = await execute(
      postData({
        url: 'https://fake.server.com/api',
        headers: null,
        body: { a: 1 },
      })
    )(state);

    const status = result.response.statusCode;
    const responseBody = result.data;
    expect(status).to.eq(200);
    expect(responseBody).to.eql({ foo: 'bar' });
  });
});
