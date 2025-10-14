import { expect } from 'chai';
import {
  decryptSubmission,
  verifyWebhook,
  processWebhook,
  type FormSGState,
  type FormSGConfiguration,
} from '../src/Adaptor';
import type { DecryptParams } from '@opengovsg/formsg-sdk/dist/types';

describe('FormSG Adaptor', () => {
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

  describe('verifyWebhook', () => {
    it('should throw an error if webhookEndpoint is not configured', async () => {
      const state: FormSGState = {
        configuration: {
          formSecretKey: 'test-key',
          mode: 'development',
        },
        data: {},
      };

      try {
        await verifyWebhook('test-signature')(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).to.include(
          'webhookEndpoint must be configured'
        );
      }
    });

    it('should throw an error for invalid signature', async () => {
      const state: FormSGState = {
        configuration: {
          formSecretKey: 'test-key',
          mode: 'development',
          webhookEndpoint: 'https://example.com/webhook',
        },
        data: {},
      };

      try {
        await verifyWebhook('invalid-signature')(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).to.include(
          'X-FormSG-Signature header is invalid'
        );
      }
    });
  });

  describe('decryptSubmission (without signature verification)', () => {
    it('should successfully decrypt real FormSG submission', async () => {
      // Real test data from FormSG (in dev mode) webhook
      // Note: We skip signature verification in tests because signatures expire
      const state: FormSGState = {
        configuration: {
          formSecretKey: 'epV/ENO9NstNrVVtBWdmEKpFMKla58Qy/eS7BVl4fok=', // Secret key from a dummy form
          mode: 'development',
        },
        data: {
          formId: '68e7e536228a4c0fff058a3e',
          submissionId: '68e7e5a8228a4c0fff058b0a',
          encryptedContent:
            'AVaUzPxsPVODeB+AWEB9JFtEQeUo1N//hyJk3tCjBmg=;VkvWrSb8rJfbEjY104P56jEYOwty39Ko:6KnKpMb7ATmY2BL68Vn20mGwQOq+3a480d/XubbU+YZ72Pg3bMmzPpAq/pEYhlSgAoNlEM/ZXFt2d9x3dG3Z4ai3Mj3RwfcgG3mkpDcYIqd3FwXzwoKhAL02nH1lYk+0eVtp1Vmf/5tBfLEYdkSD+MWbcjgcrI101Ajs+68cS9HX',
          version: 2.1,
          created: '2025-10-09T16:41:12.647Z',
        } as DecryptParams,
      };

      const result = await decryptSubmission(state.data)(state);

      expect(result.data).to.exist;
      expect(result.data.responses).to.be.an('array');
      expect(result.references).to.be.an('array');
      expect(result.references).to.have.lengthOf(1);

      expect(result.data.responses).to.deep.equal([
        {
          _id: '68e7e560228a4c0fff058a67',
          question: 'Short test field',
          answer: 'Test answer',
          fieldType: 'textfield',
        },
      ]);
    });
  });

  describe('processWebhook', () => {
    it('should fail with invalid signature format', async () => {
      const state: FormSGState = {
        configuration: {
          formSecretKey: 'epV/ENO9NstNrVVtBWdmEKpFMKla58Qy/eS7BVl4fok=',
          mode: 'development',
          webhookEndpoint:
            'https://webhook.site/5d839958-ef57-40e0-8158-8d7fb2b4a527',
        },
        data: {
          formId: '68e7e536228a4c0fff058a3e',
          submissionId: '68e7e5a8228a4c0fff058b0a',
          encryptedContent:
            'AVaUzPxsPVODeB+AWEB9JFtEQeUo1N//hyJk3tCjBmg=;VkvWrSb8rJfbEjY104P56jEYOwty39Ko:6KnKpMb7ATmY2BL68Vn20mGwQOq+3a480d/XubbU+YZ72Pg3bMmzPpAq/pEYhlSgAoNlEM/ZXFt2d9x3dG3Z4ai3Mj3RwfcgG3mkpDcYIqd3FwXzwoKhAL02nH1lYk+0eVtp1Vmf/5tBfLEYdkSD+MWbcjgcrI101Ajs+68cS9HX',
          version: 2.1,
          created: '2025-10-09T16:41:12.647Z',
        } as DecryptParams,
      };

      try {
        await processWebhook(state.data, 'invalid-signature-format')(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).to.include(
          'X-FormSG-Signature header is invalid'
        );
      }
    });
  });

  describe('configuration modes', () => {
    it('should default to development mode', async () => {
      const state: FormSGState = {
        configuration: {
          formSecretKey: 'test-key',
        },
        data: {} as DecryptParams,
      };

      try {
        await decryptSubmission(state.data)(state);
      } catch (error) {
        // Error is expected, but we're testing that it doesn't fail on mode
        expect((error as Error).message).to.include(
          'Failed to decrypt submission'
        );
      }
    });

    it('should accept production mode', async () => {
      const state: FormSGState = {
        configuration: {
          formSecretKey: 'test-key',
          mode: 'production',
        },
        data: {} as DecryptParams,
      };

      try {
        await decryptSubmission(state.data)(state);
      } catch (error) {
        expect((error as Error).message).to.include(
          'Failed to decrypt submission'
        );
      }
    });

    it('should accept staging mode', async () => {
      const state: FormSGState = {
        configuration: {
          formSecretKey: 'test-key',
          mode: 'staging',
        },
        data: {} as DecryptParams,
      };

      try {
        await decryptSubmission(state.data)(state);
      } catch (error) {
        expect((error as Error).message).to.include(
          'Failed to decrypt submission'
        );
      }
    });
  });
});
