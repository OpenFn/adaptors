import { expect } from 'chai';

import { upload, download, list, remove } from '../src/Adaptor.js';

describe('aws-s3 adaptor exports', () => {
  it('exports upload/download/list/remove operations', () => {
    expect(upload).to.be.a('function');
    expect(download).to.be.a('function');
    expect(list).to.be.a('function');
    expect(remove).to.be.a('function');
  });
});
