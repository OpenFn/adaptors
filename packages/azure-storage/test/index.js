import { expect } from 'chai';
import { execute } from '../src';

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {
        configuration: {
            accountName: 'notarealaccount',
            accountKey: 'notarealkey' // not real
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

  it('assigns references, data to the initialState', () => {
    let state = {};

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe.skip('createContainer', () => {});

describe.skip('checkBlobExists', () => {});

describe.skip('uploadBlob', () => {});

describe.skip('downloadBlobAsString', () => {});

describe.skip('downloadBlobAsJSON', () => {});

describe.skip('getBlobProperties', () => {});