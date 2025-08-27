import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the DARAJA API server (excluding the body)
 * @property references - an array of all previous data objects used in the Job
 * @private
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 */


/**
 * STKPush request data object
 * @typedef {Object} STKPushObject
 * @public
 * @property {number} Amount - Amount charged.
 * @property {number} PartyA - The phone number that receives the STK push prompt. Expected to be a valid Safaricom Number that is M-pesa registered in the format 2547XXXXXXXX
 * @property {number} PartyB - The organization that receives the funds
 * @property {number} PhoneNumber - The mobile number to receive the STK pin prompt
 * @property {URL} CallBackURL - A valid secure URL that is used to receive notifications from M-Pesa API. It is the endpoint to which the results will be sent by M-Pesa API
 * @property {string} AccountReference - Along with the business name, this value is also displayed to the customer in the STK pin prompt message. Maximum of 12 characters
 * @property {string} TransactionDesc - Any additional information/comment that can be sent along with the request from you system.
 */


/**
 * Initiate a STK pin prompt to a Safaricom mobile number.
 * @function
 * @public
 * @param {STKPushObject} data - The object that will be attached to the POST request body
 * @param {RequestOptions} options - Optional request object. Includes headers, error mappings and query params
 * @example <caption>Initiate STK Push</caption>
 * stkPush({
    "Amount": 1,
    "PartyA": 254708374149,
    "PartyB": 174379,
    "PhoneNumber": 254708374149,
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "Payment of X"
});
 * @returns {Operation}
 * @state {HttpState}
 */
export function stkPush(data, options = {}) {
  return async state => {

    const { short_code, pass_key } = state.configuration;

    const timestamp = util.getTimestamp()

    const password = short_code + pass_key + timestamp;

    const body = {
      ...data,
      BusinessShortCode: short_code,
      Password: Buffer.from(password).toString('base64'),
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
    };

    console.log('Initiating STK Push request...');

    const response = await util.request(state, 'POST', '/mpesa/stkpush/v1/processrequest', { ...options, body })
    return util.prepareNextState(state, response)
  }
}


/**
 * Check transaction status data object.
 * @typedef {Object} TransactionStatusObject
 * @public
 * @property {string} Initiator - The name of the initiator initiating the request. 
 * @property {string} SecurityCredential - Encrypted credential of the user getting transaction status.
 * @property {string} TransactionID - Unique identifier to identify a transaction on Mpesa.
 * @property {number} PartyA - Organization/MSISDN receiving the transaction.
 * @property {number} IdentifierType - Type of organization receiving the transaction. Example: "4" Orgnaization shortcode.
 * @property {URL} ResultURL - The path that stores information of a transaction.
 * @property {URL} QueueTimeOutURL - The path that stores information of timeout transaction.
 * @property {string} Remarks - Comments that are sent along with the transaction.
 * @property {string} Occassion - Optional parameter.
 */


/**
 * Check the status of the transaction
 * @function
 * @public
 * @param {TransactionStatusObject} data - The object that will be attached to the POST request body
 * @param {RequestOptions} options - Optional request object. Includes headers, error mappings and query params
 * @example <caption>Check status of a transaction</caption>
 * checkTransactionStatus({
    "Initiator": "testapi",
    "SecurityCredential": "ctHDk+dN14A22B5GyQQvISSTY3K1tVnCTuQGoG7PsTCadzTkl5wz44Rhpkb0BZDvfRA==",
    "TransactionID": "OEI2AK4Q16",
    "PartyA": 600998,
    "IdentifierType": 4,
    "ResultURL": "https://mydomain.com/TransactionStatus/result/",
    "QueueTimeOutURL": "https://mydomain.com/TransactionStatus/queue/",
    "Remarks": "fdfdfdfdf",
    "Occassion": "null",
});
 * @returns {Operation}
 * @state {HttpState}
 */
export function checkTransactionStatus(data, options = {}) {
  return async state => {

    const { short_code, pass_key } = state.configuration;

    const timestamp = util.getTimestamp();

    const password = short_code + pass_key + timestamp;

    const body = {
      BusinessShortCode: short_code,
      Password: Buffer.from(password).toString('base64'),
      Timestamp: timestamp,
      CommandID: 'TransactionStatusQuery',
      ...data
    };

    console.log('Initiating check transaction request...');

    const response = await util.request(state, 'POST', '/mpesa/transactionstatus/v1/query', { ...options, body });
    return util.prepareNextState(state, response)
  }
}

/**
 * Register URL parameter definition
 * @typedef {Object} RegisterUrlObject
 * @public
 * @property {numeric} ShortCode - Usually, a unique number is tagged to an M-PESA pay bill/till number of the organization.
 * @property {string} ResponseType - This parameter specifies what is to happen if for any reason the validation URL is not reachable. Sample values: 'Canceled', 'Completed'
 * @property {URL} ConfirmationURL - This is the URL that receives the confirmation request from API upon payment completion.
 * @property {URL} ValidationURL - This is the URL that receives the validation request from the API upon payment submission. 
 */

/**
 * Register a URL that allows receiving payment notifications to your paybill.
 * @public
 * @function
 * @param {RegisterUrlObject} data  - The object that will be attached to the POST request body
 * @param {RequestOptions} options  - Optional request object. Includes headers, error mappings and query params
 * @example <caption>Register a URL to receive payment notifications</caption>
 * registerUrl({
    "ShortCode": 600426,
    "ResponseType": "Completed",
    "ConfirmationURL": "https://mydomain.com/confirmation",
    "ValidationURL": "https://mydomain.com/validation"
});
 * @returns {Operation}
 * @state {HttpState}
 */
export function registerUrl(data, options) {
  return async state => {

    console.log('Initiating register URL request...');

    const response = await util.request(state, 'POST', '/mpesa/c2b/v1/registerurl', { ...options, body: { ...data } });
    return util.prepareNextState(state, response)
  }
}


/**
 * Remit tax parameter definition
 * @typedef {Object} RemitTaxObject
 * @public
 * @property {string} Initiator - The M-Pesa API operator username.
 * @property {string} SecurityCredential - The encrypted password of the M-Pesa API operator.
 * @property {number} Amount - The transaction amount.
 * @property {number} PartyA - This is your own shortcode from which the money will be deducted.
 * @property {string} AccountReference - The payment registration number (PRN) issued by KRA.
 * @property {string} Remarks - Any additional information to be associated with the transaction.
 * @property {URL} QueueTimeOutURL - A URL that will be used to notify your system in case the request times out before processing.
 * @property {URL} ResultURL - A URL that will be used to send transaction results after processing.
 */

/**
 * Remit tax to the Kenya Revenue Authority (KRA).
 * @public
 * @function
 * @param {RemitTaxObject} data  - The object that will be attached to the POST request body
 * @param {RequestOptions} options - Optional request object. Includes headers, error mappings and query params
 * @example <caption>Pay tax to KRA</caption>
 * remitTax({
    "Initiator": "testapi",
    "SecurityCredential": "Uq1qluCjSYfMF3XEvlpfuatnWwWerwq42fB+mMd8nsKdAVO04DGHhG/s3xO3g7POki9B8i7cSoEkBux4bQrlDLDWJhaTrt1TdbE+ZQ==",
    "Amount": 1,
    "PartyA": 600995,
    "AccountReference": 353353,
    "Remarks": "ok",
    "QueueTimeOutURL": "https://mydomain.com/b2b/queue/",
    "ResultURL": "https://mydomain.com/b2b/result/"
})
 * @returns {Operation}
 * @state {HttpState}
 */
export function remitTax(data, options = {}) {
  return async state => {

    const body = {
      SenderIdentifierType: '4',
      RecieverIdentifierType: '4',
      PartyB: 572572,
      CommandID: 'PayTaxToKRA',
      ...data,
    }

    console.log('Initiating remit tax request...');

    const response = await util.request(state, 'POST', '/mpesa/b2b/v1/remittax', { ...options, body });
    return util.prepareNextState(state, response)
  }
}

/**
 * Buy goods parameter definition
 * @typedef {Object} BuyGoodsObject
 * @public
 * @property {string} Initiator - The M-Pesa API operator username. This user needs Org Business Pay Bill API initiator role on M-Pesa
 * @property {string} SecurityCredential - The encrypted password of the M-Pesa API operator.
 * @property {number} Amount - The transaction amount.
 * @property {number} PartyA - Your shortcode. The shortcode from which money will be deducted.
 * @property {string} AccountReference - The account number to be associated with the payment. Up to 13 characters
 * @property {string} Remarks - Any additional information to be associated with the transaction.
 * @property {URL} QueueTimeOutURL - A URL that will be used to notify your system in case the request times out before processing.
 * @property {URL} ResultURL - A URL that will be used to send transaction results after processing.
 */


/**
 * Pay for goods and services directly from your business account to a till number, merchant store number or Merchant HO
 * @function
 * @public
 * @param {BuyGoodsObject} data - The object that will be attached to the POST request body
 * @param {RequestOptions} options - Optional request object. Includes headers, error mappings and query params
 * @example <caption>Pay for goods</caption>
 * buyGoods({
    "Initiator": "testapi",
    "SecurityCredential": "sbMXpuhMX5LzieNiDrx9TgscfaBxxvie0WlBDdGli4MWu4s5gbhYVlBy+T89xHQdoYwcG202KNp403ln2dLFnytPqw==",
    "Amount": 1,
    "PartyA": 600999,
    "PartyB": 600000,
    "AccountReference": 353353,
    "Requester": 254708374149,
    "Remarks": "ok",
    "QueueTimeOutURL": "https://mydomain.com/b2b/queue/",
    "ResultURL": "https://mydomain.com/b2b/result/"
});
 * @returns {Operation}
 * @state {HttpState}
 */
export function buyGoods(data, options = {}) {
  return async state => {

    const body = {
      CommandID: 'BusinessBuyGoods',
      SenderIdentifierType: '4',
      RecieverIdentifierType: '4',
      ...data,
    }

    console.log('Initiating buy goods request...');

    const response = await util.request(state, 'POST', '/mpesa/b2b/v1/paymentrequest', { ...options, body });
    return util.prepareNextState(state, response)
  }
}

/**
 * Make a general HTTP request
 * @example <caption>Register a URL to receive payment notifications</caption>
 * request("POST", "/mpesa/c2b/v1/registerurl", 
 *  {
 *    "ShortCode": 600426,
 *    "ResponseType": "Completed",
 *    "ConfirmationURL": "https://mydomain.com/confirmation",
 *    "ValidationURL": "https://mydomain.com/validation"
 *  });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource.
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedoptions] =
      expandReferences(state, method, path, body, options);


    console.log(`Initiating ${method} request to: ${resolvedPath}`);

    const response = await util.request(
      state,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedoptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}

export {
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
  as
} from '@openfn/language-common';
