import { expandReferences } from '@openfn/language-common/util';
import formsgSdk from '@opengovsg/formsg-sdk';
import type {
  PackageMode,
  DecryptParams,
  DecryptedContent,
} from '@opengovsg/formsg-sdk/dist/types';

/**
 * A function that takes state and returns state (or a Promise of state)
 */
type Operation = (state: any) => any | Promise<any>;

/**
 * Configuration for FormSG adaptor
 * @typedef {Object} FormSGConfiguration
 * @property {string} formSecretKey - Your form's secret key from FormSG
 * @property {PackageMode} [mode='development'] - SDK mode: 'production', 'staging', or 'development'
 * @property {string} [webhookEndpoint] - The URI of your webhook endpoint
 */
export interface FormSGConfiguration {
  formSecretKey: string;
  mode?: PackageMode;
  webhookEndpoint?: string;
}

/**
 * State object for FormSG operations
 * @typedef {Object} FormSGState
 * @property {Object} data - The current data/response
 * @property {FormSGConfiguration} configuration - FormSG configuration
 * @property {Array} references - Array of previous data objects
 */
export interface FormSGState {
  data: any;
  configuration: FormSGConfiguration;
  references?: any[];
}

/**
 * Options for decrypting FormSG submissions
 * @typedef {Object} DecryptOptions
 * @property {boolean} [verifySignature=false] - Whether to verify webhook signature
 * @property {string} [signatureHeader] - The X-FormSG-Signature header value
 */
export interface DecryptOptions {
  verifySignature?: boolean;
  signatureHeader?: string;
}

/**
 * Decrypt a FormSG submission
 * @example
 * decryptSubmission($.data)
 * @example
 * decryptSubmission($.data, {
 *   verifySignature: true,
 *   signatureHeader: $.headers['x-formsg-signature']
 * })
 * @function
 * @public
 * @param {DecryptParams} submissionData - The encrypted submission data from FormSG webhook
 * @param {DecryptOptions} options - Options for decryption
 * @returns {Operation}
 * @state {FormSGState}
 */
export function decryptSubmission(
  submissionData: DecryptParams,
  options?: DecryptOptions
): Operation {
  return async (state: FormSGState) => {
    const [resolvedData, resolvedOptions] = expandReferences(
      state,
      submissionData,
      options || {}
    ) as [DecryptParams, DecryptOptions];

    const {
      mode = 'development',
      formSecretKey,
      webhookEndpoint,
    } = state.configuration;

    if (!formSecretKey) {
      throw new Error('formSecretKey is required in configuration');
    }

    const { verifySignature = false, signatureHeader } = resolvedOptions;

    const formsg = formsgSdk({ mode });

    if (verifySignature) {
      if (!signatureHeader) {
        throw new Error(
          'signatureHeader is required when verifySignature is true'
        );
      }
      if (!webhookEndpoint) {
        throw new Error(
          'webhookEndpoint must be configured in configuration when verifySignature is true'
        );
      }

      formsg.webhooks.authenticate(signatureHeader, webhookEndpoint);
      console.log('✓ Webhook signature verified successfully');
    }

    const decryptedSubmission: DecryptedContent | null = formsg.crypto.decrypt(
      formSecretKey,
      resolvedData
    );

    if (!decryptedSubmission) {
      throw new Error(
        'Failed to decrypt submission - decryption returned null'
      );
    }

    console.log('✓ Submission decrypted successfully');

    return {
      ...state,
      data: decryptedSubmission,
      references: [state.data, ...(state.references || [])],
    };
  };
}

/**
 * Verify a FormSG webhook signature
 * @example
 * verifyWebhook($.headers['x-formsg-signature'])
 * @function
 * @public
 * @param {string} signatureHeader - The X-FormSG-Signature header value
 * @returns {Operation}
 * @state {FormSGState}
 */
export function verifyWebhook(signatureHeader: string): Operation {
  return async (state: FormSGState) => {
    const [resolvedSignature] = expandReferences(state, signatureHeader);

    const { mode = 'development', webhookEndpoint } = state.configuration;

    if (!webhookEndpoint) {
      throw new Error(
        'webhookEndpoint must be configured in configuration to verify webhooks'
      );
    }

    const formsg = formsgSdk({ mode });

    formsg.webhooks.authenticate(resolvedSignature, webhookEndpoint);
    console.log('✓ Webhook signature verified successfully');

    return {
      ...state,
      data: {
        verified: true,
        signature: resolvedSignature,
      },
      references: [state.data, ...(state.references || [])],
    };
  };
}

/**
 * Process a FormSG webhook (verify and decrypt in one step)
 * @example
 * processWebhook($.data, $.headers['x-formsg-signature'])
 * @function
 * @public
 * @param {DecryptParams} submissionData - The encrypted submission data from FormSG webhook
 * @param {string} signatureHeader - The X-FormSG-Signature header value
 * @returns {Operation}
 * @state {FormSGState}
 */
export function processWebhook(
  submissionData: DecryptParams,
  signatureHeader: string
): Operation {
  return async (state: FormSGState) => {
    const opts: DecryptOptions = {
      verifySignature: true,
      signatureHeader,
    };

    return decryptSubmission(submissionData, opts)(state);
  };
}

export {
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
