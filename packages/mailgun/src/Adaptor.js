
import {
  execute as commonExecute,
  expandReferences,
  composeNextState,
} from "@openfn/language-common";
import Mailgun from "mailgun-js";
// NOTE: We can use sync-request because the Node sandbox the client uses will
// be killed after 300s, regardless of whether this succeeds, fails, or hangs.
import request from "sync-request";

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

  return (state) => {
    return commonExecute(...operations)({ ...initialState, ...state });
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
  return (state) => {
    const body = expandReferences(params)(state);

    const { apiKey, domain } = state.configuration;

    const mailgun = new Mailgun({ apiKey: apiKey, domain: domain });

    if (body.attachment) {
      const response = request("GET", body.attachment.url);
      console.log(response);
      var attch = new mailgun.Attachment({
        data: response.body,
        filename: body.attachment.filename,
      });
      body.attachment = attch;
    }

    console.log("Sending mail:");

    return new Promise((resolve, reject) => {
      mailgun.messages().send(body, (error, response) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log(response);
          resolve(response);
        }
      });
    }).then((response) => {
      const nextState = composeNextState(state, response);
      return nextState;
    });
  };
}

export {
  fn,
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
} from "@openfn/language-common";
