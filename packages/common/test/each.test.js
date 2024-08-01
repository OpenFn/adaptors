import { expect } from 'chai';
import testData from './fixtures/data.json' assert { type: 'json' };
import { each } from '../src/Adaptor';
import * as beta from '../src/beta.js';

function shouldBehaveLikeEach(each) {
  let state, operation;

  beforeEach(function () {
    state = { data: testData, references: [] };
    operation = ({ data, references }) => {
      return {
        data,
        references: [data, ...references],
      };
    };
  });

  it('maps the operation results in the references', () => {
    let results = each('$.data.store.book[*]', operation)(state);
    expect(results.references.reverse()).to.eql(testData.store.book);
  });

  it('maps the operation results in the data', () => {
    let results = each(testData.store.book, operation)(state);
    expect(results.references.reverse()).to.eql(testData.store.book);
  });

  it('provides the current index on state', () => {
    let operation = ({ references, index }) => {
      return { references: [index, ...references] };
    };

    let results = each('$.data.store.book[*]', operation)(state);
    expect(results.references).to.eql([3, 2, 1, 0]);
  });

  it('calls the data sourcing function', () => {
    let sourcingFunction = state => {
      return state.data.store.book;
    };

    let results = each(sourcingFunction, operation)(state);
    expect(results.references.reverse()).to.eql(testData.store.book);
  });

  it('resolves promise operations', () => {
    let sourcingFunction = state => {
      return state.data.store.book;
    };

    operation = ({ data, references }) => {
      return Promise.resolve({
        data,
        references: [data, ...references],
      });
    };

    return each(
      sourcingFunction,
      operation
    )(state).then(state => {
      expect(state.references.reverse()).to.eql(testData.store.book);
    });
  });

  it("returns data to it's original value afterwards", () => {
    let results = beta.each([1, 2, 3, 4], operation)(state);
    expect(results.data).to.eql(testData);
  });
}

describe('each', () => {
  describe('current', function () {
    shouldBehaveLikeEach(each);
  });

  describe('beta', function () {
    shouldBehaveLikeEach(beta.each);
  });
});
