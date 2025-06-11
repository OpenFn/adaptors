import { expect } from 'chai';
import { request } from '../src/util';

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
