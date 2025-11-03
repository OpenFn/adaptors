import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Get a FHIR resource by ID or list all resources of a type
 * @example <caption>List all practitioners</caption>
 * http.get('/fhir/Practitioner');
 * @example <caption> List a specific practitioner by ID</caption>
 * http.get('/fhir/Practitioner/P10004');
 * @example <caption>Get active practitioners, limit to 1 result</caption>
 * http.get('/fhir/Practitioner', {
 *   query: {
 *     active: true,
 *     _count: 1,
 *   },
 * });
 * @function
 * @public
 * @param {string} resource - FHIR resource type
 * @param {object} options - Options including headers and query parameters
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(resource, options = {}) {
  return async state => {
    const [resolvedResource, resolvedOptions] = expandReferences(
      state,
      resource,
      options
    );

    const response = await util.request(
      state.configuration,
      'GET',
      resolvedResource,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Create a new FHIR resource
 * @example <caption>Create a new Practitioner resource</caption>
 *  http.post('/fhir/Practitioner',  {
 *    "resourceType": "Practitioner",
 *    "meta": {
 *      "versionId": "1",
 *      "lastUpdated": "2024-08-06T06:13:10.163+00:00",
 *      "source": "#m5UGgxqUFEI7qIRF",
 *      "profile": [
 *        "http://ihris.org/fhir/StructureDefinition/ihris-practitioner"
 *      ]
 *    },
 *    "extension": [
 *    // ... extension data
 *    ],
 *    "active": true,
 *    "name": [
 *      {
 *        "use": "official",
 *        "text": "Tekiokion Traifrop",
 *        "family": "Traifrop",
 *        "given": [
 *          "Tekiokion"
 *        ]
 *      }
 *    ],
 *    "gender": "male",
 *    "birthDate": "1979-01-01",
 *    "qualification": [
 *      {
 *        "code": {
 *          "coding": [
 *            {
 *              "system": "http://terminology.hl7.org/CodeSystem/v2-0360|2.7",
 *              "code": "BA"
 *            }
 *          ],
 *          "text": "Bachelor of Arts"
 *        }
 *      }
 *    ]
 *  });
 * @function
 * @public
 * @param {string} resource - FHIR resource type
 * @param {object} body - FHIR resource data
 * @param {object} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(resource, body, options = {}) {
  return async state => {
    const [resolvedResource, resolvedBody, resolvedOptions] =
      expandReferences(state, resource, body, options);

    const response = await util.request(
      state.configuration,
      'POST',
      resolvedResource,
      {
        body: resolvedBody,
        ...resolvedOptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Update an existing FHIR resource
 * @example <caption>Update a Practitioner resource</caption>
 * http.put('/fhir/Practitioner/6462', {
 *   resourceType: 'Practitioner',
 *   id: '6462',
 *   meta: {
 *     versionId: '1',
 *     lastUpdated: '2025-11-03T07:06:59.309+00:00',
 *     source: '#m5UGgxqUFEI7qIRF',
 *     profile: ['http://ihris.org/fhir/StructureDefinition/ihris-practitioner'],
 *   },
 *   extension: [
 *     {
 *       url: 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-nationality',
 *       valueCoding: {
 *         system: 'urn:iso:std:iso:3166',
 *         code: 'TF',
 *       },
 *     },
 *     {
 *       url: 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-residence',
 *       valueReference: {
 *         reference: 'Location/TF.W.GAS',
 *       },
 *     },
 *     {
 *       url: 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-marital-status',
 *       valueCoding: {
 *         system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
 *         code: 'S',
 *       },
 *     },
 *   ],
 *   active: true,
 *   name: [
 *     {
 *       use: 'official',
 *       text: 'Tekiokionses Traifrop',
 *       family: 'Traifrop',
 *       given: ['Tekiokionses'],
 *     },
 *   ],
 *   gender: 'male',
 *   birthDate: '1979-01-01',
 *   qualification: [
 *     {
 *       code: {
 *         coding: [
 *           {
 *             system: 'http://terminology.hl7.org/CodeSystem/v2-0360|2.7',
 *             code: 'BA',
 *           },
 *         ],
 *         text: 'Bachelor of Arts',
 *       },
 *     },
 *   ],
 * });
 * @function
 * @public
 * @param {string} resource - Path to FHIR resource
 * @param {object} body - Updated FHIR resource data
 * @param {object} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function put(resource, body, options = {}) {
  return async state => {
    const [resolvedResource, resolvedBody, resolvedOptions] =
      expandReferences(state, resource, body, options);

    const response = await util.request(
      state.configuration,
      'PUT',
      resolvedResource,
      {
        body: resolvedBody,
        ...resolvedOptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}




