import { expect } from 'chai';
import {
  execute,
  getServicePoint,
  searchGroup,
  searchIndividual,
} from '../src/Adaptor.js';

const state = {
  configuration: {
    username: 'admin',
    password: 'admin',
    baseUrl: 'https://demo.openspp.org/',
    database: 'openspp_adaptor',
  },
  references: [],
};

// Unit tests are disabled here because they run against a live sandbox
// They should be re-enabled for local dev when this adaptor is next touched
describe.skip('openspp', () => {
  describe('execute', () => {
    it('executes each operation in sequence', done => {
      const operations = [
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
  });

  describe('getServicePoint', () => {
    it('get non-existing service point from demo server', async () => {
      let finalState = await getServicePoint('n0n-3x15t1n6-53rv1c3-p01nt')(
        state
      );
      expect(finalState.data).to.be.undefined;
    });
  });

  describe('searchGroup', () => {
    it('search non-existing group from demo server', async () => {
      let finalState = await searchGroup([['id', '=', -1]])(state);
      expect(finalState.data).to.be.undefined;
    });
  });

  describe('searchIndividual', () => {
    it('search non-existing individual from demo server', async () => {
      let finalState = await searchIndividual([['id', '=', -1]])(state);
      expect(finalState.data).to.be.undefined;
    });
  });
});
