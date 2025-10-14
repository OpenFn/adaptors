import { expect } from 'chai';
import {
  decryptSubmission,
  type FormSGState,
  type FormSGConfiguration,
} from '../src/Adaptor';

import type { DecryptParams } from '@opengovsg/formsg-sdk/dist/types';

describe('decryptSubmission', () => {
  it('should throw an error if decryption fails (no mock data)', async () => {
    const state: FormSGState = {
      configuration: {
        formSecretKey: 'invalid-key',
        mode: 'development',
      },
      data: {
        encryptedContent: 'invalid-encrypted-content',
        version: 1,
      } as DecryptParams,
    };

    try {
      await decryptSubmission(state.data)(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect((error as Error).message).to.include(
        'Failed to decrypt submission'
      );
    }
  });

  it('should require formSecretKey in configuration', async () => {
    const state: FormSGState = {
      configuration: {} as FormSGConfiguration,
      data: {} as DecryptParams,
    };

    try {
      await decryptSubmission(state.data)(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.exist;
    }
  });
});
