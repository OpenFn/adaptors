import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import Mailgun from 'mailgun.js';
import formData from 'form-data';
// NOTE: We can use sync-request because the Node sandbox the client uses will
// be killed after 300s, regardless of whether this succeeds, fails, or hangs.
import request from 'sync-request';

const mailgun = new Mailgun(formData);

const setupClient = state => {
  const { apiKey } = state.configuration;
  state.client = mailgun.client({ username: 'api', key: apiKey });
  return state;
};

const teardownClient = state => {
  delete state.client;
  return state;
};

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for mailgun.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(
      setupClient,
      ...operations,
      teardownClient
    )({ ...initialState, ...state });
  };
}

/**
 * Create an event
 * @public
 * @example
 * send({
 *   from: 'from_email',
 *   to: 'to_email',
 *   subject: 'Your Subject',
 *   text: 'Your message goes here',
 *   attachment: {
 *     url: 'www.google.com/doodle.png',
 *     filename: 'forYou.png',
 *   },
 * })
 * @function
 * @param {object} params - Params for sending an email
 */
export function send(params) {
  return state => {
    const { client } = state;
    const { domain } = state.configuration;

    const [body] = expandReferences(state, params);

    if (body.attachment) {
      const response = request('GET', body.attachment.url);
      console.log(response);
      body.attachment = {
        data: response.body,
        filename: body.attachment.filename,
      };
    }
    console.log('Sending mail:');
    return client.messages.create(domain, body).then(response => {
      console.log(response);
      return composeNextState(state, response);
    });
  };
}

export {
  fn,
  fnIf,
  field,
  alterState,
  fields,
  sourceValue,
  merge,
  each,
  dataPath,
  dataValue,
  lastReferenceValue,
  beta,
} from '@openfn/language-common';
