import { expect } from 'chai';
import Adaptor from '../src';

const { execute } = Adaptor;

// TODO: mock a connection for the login.
describe('execute', () => {
  it.skip('executes each operation in sequence', (done) => {
    let state = {
      configuration: {
        username: 'test',
        password: '123',
        instanceUrl: 'https://www.openmrs.org',
      },
    };
    let operations = [
      (state) => {
        return { counter: 1 };
      },
      (state) => {
        return { counter: 2 };
      },
      (state) => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then((finalState) => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it.skip('assigns references, data to the initialState', () => {
    let state = {};

    let finalState = execute()(state);

    execute()(state).then((finalState) => {
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});
