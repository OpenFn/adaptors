import { expect } from 'chai';
import { execute, } from '../src';

describe('execute', () => {
  // Mock this endpoint...
  it.skip('executes each operation in sequence', done => {
    let state = {
      configuration: {
        server: 'testurl',
      },
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

  it.skip('assigns references, data to the initialState', () => {
    let state = {
      configuration: {
        server: 'testurl',
      },
    };

    execute()(state).then(finalState => {
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});
