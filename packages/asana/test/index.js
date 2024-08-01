import { expect } from 'chai';

import { execute, request } from '../src';

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

describe('request', () => {
  it('throws if an absolute URL is passed', async () => {
    // happily the request won't actually be made, so we don't need to mock anything here
    let err;
    try {
      await execute(request('https://www.blah.com/a/b/c'))({});
    } catch (e) {
      err = e;
    }
    expect(err.code).to.equal('BASE_URL_MISMATCH');
  });
});

describe.skip('getTask', () => {});

describe.skip('getTasks', () => {});

describe.skip('updateTask', () => {});

describe.skip('createTask', () => {});

describe.skip('upsertTask', () => {});
