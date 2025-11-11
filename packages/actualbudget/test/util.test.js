import { expect } from 'chai';
import { errorHandler } from '../src/util.js';

function createRejectedPromise() {
  return new Promise((resolve, reject) => {
    const err = new Error('This is a rejection');
    err.type = 'rejection';
    reject(err);
  });
}
describe('errorHandler', () => {
  it('should show fix if error is a PostError', async () => {
    const err = new Error('Not Allowed');
    err.type = 'PostError';

    try {
      errorHandler(err);
    } catch (err) {
      expect(err.message).to.eq('Not Allowed');
      expect(err.fix).to.eq(
        'Error accessing Actual Server, check Actual Server url'
      );
      expect(err.type).to.eq('PostError');
    }
  });
});
