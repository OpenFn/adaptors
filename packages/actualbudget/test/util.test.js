import { expect } from 'chai';
import { errorHandler } from '../src/util.js';

describe.only('errorHandler', () => {
  it('should throw an error if the error type is PostError and the message contains "Not Allowed"', async () => {
    const err = {
      type: 'PostError',
      message: 'Not Allowed',
      meta: {},
    };
    try {
      errorHandler(err);
    } catch (err) {
      expect(err.message).to.equal(
        'Error accessing Actual Server, check Actual Server url'
      );
    }
  });
});
