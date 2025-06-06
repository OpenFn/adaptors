import { _ } from '../src/lodash';
import { expect } from 'chai';

describe('_', () => {
  it('should map values', () => {
    const mappedValues = _.map([1, 2, 3], n => n * 2);

    expect(mappedValues).to.eql([2, 4, 6]);
  });
  it('should filter values', () => {
    const filteredValues = _.filter([1, 2, 3, 4, 5], n => n % 2 === 0);

    expect(filteredValues).to.eql([2, 4]);
  });
});
