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
 * @property {String} query - The GraphQL query string
 * @property {object} variables - The variables for that query string
 */

/**
 * @typedef {Object} GetItemsVariables
 * @property {string} key - The unique key of each item in the list
 * @property {object} storeId - The msupply store id  the list is being fetched from
 */


/**
 * @typedef {Object} InsertOutboundShipmentvariables
 * @property {string} otherPartyId - The recieving party id
 * @property {object} storeId - The id of the store the shipment is being made from
 */

/**
 * @typedef {Object} UpsertOutboundShipmentvariables
 * @property {Object} input - The payload for the target shipment
 * @property {object} storeId - The id of the store the shipment is being made from
 */


/**
 * Get the list of items in the catalogue
 * @public
 * @function
 * @example <caption>Get items in the catalogue</caption>
 * getItemsWithStats({
       "key": "name",
       "storeId": "DFE0F611AD84A0419D36F8FEFAD1894C",
})
 * @param {GetItemsVariables} variables - GraphQL query variables
 * @returns {Operation}
 * @state {HttpState}
 */
export function getItemsWithStats(variables) {
  return async state => {
    const [resolvedVariables] = expandReferences(state, variables);

    let opts = {
      body: {
        query: getItemsQueryString,
        variables: resolvedVariables
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
       "otherPartyId": "861102F624354F15ABEB48DC207A4C2D",
       "storeId": "DFE0F611AD84A0419D36F8FEFAD1894C"
})
 * @param {InsertOutboundShipmentvariables} variables - GraphQL query variables
 * @returns {Operation}
 * @state {HttpState}
 */
export function insertOutboundShipment(variables) {
  return async state => {
    const [resolvedVariables] = expandReferences(state, variables);

    let opts = {
      body: {
        query: insertOutboundShipmentQuery,
        variables: {
          id: uuidv4(),
          ...resolvedVariables
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
})
 * @example <caption>Update outbound shipment status to 'PICKED'</caption>
 * upsertOutboundShipment({
 *      "storeId": "DFE0F611AD84A0419D36F8FEFAD1894C",
 *      "input": {
 *        "updateOutboundShipments": [
 *          {
 *            "id": "01961fce-9ef6-7198-93c1-866395094e48",
 *            "status": "PICKED"
 *           }
 *         ]
 *      }
 * })
 * @param {UpsertOutboundShipmentvariables} variables - GraphQL query variables
 * @returns {Operation}
 * @state {HttpState}
 */
export function upsertOutboundShipment(variables) {
  return async state => {
    const [resolvedVariables] = expandReferences(state, variables);

    let opts = {
      body: {
        query: upsertOutboundShipmentQuery,
        variables: resolvedVariables
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
 * query(`query stockLines(
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
     {
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
})
 *@param {string} query - GraphQl query string
 *@param {Object} varibales - GraphQl query variables
 * @returns {Operation} 
 * @state {HttpState}
 */
export function query(query, variables) {
  return async state => {
    const [resolvedQuery, resolvedVariables] = expandReferences(state, query, variables);

    const response = await util.request(
      state,
      {
        body: {
          query: resolvedQuery,
          variables: resolvedVariables,
        },
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
