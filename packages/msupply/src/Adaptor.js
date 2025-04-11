import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';
import { getItemsQueryString, insertOutboundShipmentQuery, upsertOutboundShipmentQuery } from './queryStrings'
import { v4 as uuidv4 } from 'uuid';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/


/**
 * @typedef {Object} RequestBody
 * @property {object} query - The GraphQL query string
 * @property {object} variables - The variables for that query string
 */

/**
 * @typedef {Object} RequestOptions
 * @property {GenericRequestBody} body - The body of the post request
 * @property {object} headers - An object of headers to append to the request.
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 */


/**
 * Get items in your catalogue and their stats like stock on hand and AMC
 * @public
 * @function
 * @example <caption>Get items in your catalogue</caption>
 * getItemsWithStats({
   body: {
     variables: {
       "key": "name",
        "first": 20,
        "isDesc": false,
        "offset": 0,
        "storeId": "DFE0F611AD84A0419D36F8FEFAD1894C",
        "filter": {
            "isVisibleOrOnHand": true,
            "isActive": true
        }
     }
   }
})
 * @param {RequestOptions} options  - Request object containing your variables
 * @returns {Operation}
 * @state {HttpState}
 */
export function getItemsWithStats(options) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    let opts = {
      ...resolvedOptions,
      body: {
        query: getItemsQueryString,
        variables: {
          ...resolvedOptions.body.variables
        }
      },
    }
    const response = await util.request(state, opts);
    return util.prepareNextState(state, response)
  }
}


/**
 * Create an outbound shipment.
 * @public
 * @function
 * @example <caption>Create an outbound shipment</caption>
 * insertOutboundShipment({
   body: {
     variables: {
       "otherPartyId": "861102F624354F15ABEB48DC207A4C2D",
       "storeId": "DFE0F611AD84A0419D36F8FEFAD1894C"
     }
   }
})
 * @param {RequestOptions} options - Request object containing your variables
 * @returns {Operation}
 * @state {HttpState}
 */
export function insertOutboundShipment(options) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    let opts = {
      ...resolvedOptions,
      body: {
        query: insertOutboundShipmentQuery,
        variables: {
          id: uuidv4(),
          ...resolvedOptions.body.variables
        }
      },
    }
    const response = await util.request(state, opts);
    return util.prepareNextState(state, response)
  }
}

/**
 * Update an outbound shipment
 * @public
 * @function
 * @example <caption>Add items to an outbound shipment</caption>
 * upsertOutboundShipment({
   body: {
     variables: {
       "storeId": "DFE0F611AD84A0419D36F8FEFAD1894C",
        "input": {
           "insertOutboundShipmentLines": [
            {
              "id": "01961fde-0d43-7bdc-a52d-f2c9b81758ca",
              "numberOfPacks": 10,
              "stockLineId": "01954360-782d-7933-9493-4099e7e9a20c",
              "invoiceId": "01961fce-9ef6-7198-93c1-866395094e48"
            }
          ],
          "updateOutboundShipmentLines": [],
          "deleteOutboundShipmentLines": [],
          "insertOutboundShipmentUnallocatedLines": [],
          "updateOutboundShipmentUnallocatedLines": [],
          "deleteOutboundShipmentUnallocatedLines": [],
          "insertOutboundShipmentServiceLines": [],
          "updateOutboundShipmentServiceLines": [],
          "deleteOutboundShipmentServiceLines": []
         }
     }
   }  
})
 * @example <caption>Update outbound shipment status to 'PICKED'</caption>
 * upsertOutboundShipment({
 *  body: {
 *    variables: {
 *      "storeId": "DFE0F611AD84A0419D36F8FEFAD1894C",
 *      "input": {
 *        "updateOutboundShipments": [
 *          {
 *            "id": "01961fce-9ef6-7198-93c1-866395094e48",
 *            "status": "PICKED"
 *           }
 *         ]
 *       }
 *    }
 *  }
 * })
 * @param {RequestOptions} options - Request object containing your variables
 * @returns {Operation}
 * @state {HttpState}
 */
export function upsertOutboundShipment(options) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    let opts = {
      ...resolvedOptions,
      body: {
        query: upsertOutboundShipmentQuery,
        variables: {
          ...resolvedOptions.body.variables
        }
      },
    }

    const response = await util.request(state, opts);
    return util.prepareNextState(state, response)
  }
}


/**
 * Make a generic GraphQL request
 * @public
 * @function
 * @example <caption>Get you stock lines</caption>
 * request({
   body: {
      query: `query stockLines(
            $first: Int,
            $offset: Int,
            $key: StockLineSortFieldInput!,
            $desc: Boolean,
            $filter: StockLineFilterInput,
            $storeId: String!
          ) {
            stockLines(
              storeId: $storeId,
              filter: $filter,
              page: {first: $first, offset: $offset},
              sort: {key: $key, desc: $desc}
            ) {
              ... on StockLineConnector {
                __typename
                nodes {
                  item {
                    code
                    name
                    unitName
                  }
                }
                totalCount
              }
            }
          }`,
      variables: {
        "storeId": "DFE0F611AD84A0419D36F8FEFAD1894C",
        "first": 20,
        "offset": 0,
        "key": "expiryDate",
        "desc": false,
        "filter": {
          "hasPacksInStore": true,
          "masterList": {
            "existsForStoreId": {
              "equalTo": "DFE0F611AD84A0419D36F8FEFAD1894C"
            }
          }
        }
      }
    }
})
 *@param {GenericRequestOptions} options - Options object containing your query and variables
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(options = {}) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    const response = await util.request(
      state,
      {
        body: {
          query: resolvedOptions.body.query,
          variables: resolvedOptions.body.variables,
        },
        ...resolvedOptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}

export {
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';
