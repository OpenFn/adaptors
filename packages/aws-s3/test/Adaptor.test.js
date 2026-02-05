import { expect } from 'chai';

import { get, put, list } from '../src/Adaptor.js';

describe('aws-s3 adaptor exports', () => {
  it('exports minimal API get/put/list and aliases', () => {
    expect(get).to.be.a('function');
    expect(put).to.be.a('function');
    expect(list).to.be.a('function');
  });
});
