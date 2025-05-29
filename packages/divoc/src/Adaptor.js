import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';


/**
 * State object
 * @typedef {Object} DivocHttpState
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the DIVOC server (excluding the body)
 * @property references - An array of the previous data object used in the job
 * @private
 */

/**
 * Executes a sequence of operations
 * Wraps 'language-common/execute` and prepends initial state object for DIVOC
 * @private
 * @example
 * execute(certifyVaccination({}))(state)
 * @param  {Operations} operations 
 * @returns {operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({...initialState,...state})
  }
}


/**
 * Certify a vaccination
 * @public
 * @function
 * @example  <caption>Certify a vaccination object</caption>
 * certifyVaccination({
        "preEnrollmentCode": "string",
        "recipient": {
            "name": "string",
            "dob": "2025-03-20",
            "age": "string",
            "gender": "string",
            "nationality": "string",
            "identity": "string",
            "contact": [
                "string"
            ],
            "address": {
                "addressLine1": "string",
                "addressLine2": "string",
                "district": "string",
                "state": "string",
                "pincode": 0
            }
        },
        "vaccination": {
            "name": "string",
            "batch": "string",
            "manufacturer": "string",
            "date": "2025-03-20T06:08:22.394Z",
            "effectiveStart": "2025-03-20",
            "effectiveUntil": "2025-03-20",
            "dose": 1,
            "totalDoses": 2
        },
        "vaccinator": {
            "name": "string"
        },
        "facility": {
            "name": "string",
            "address": {
                "addressLine1": "string",
                "addressLine2": "string",
                "district": "string",
                "state": "string",
                "pincode": 0
            }
        },
        "meta": {}
    });
  @param {Object} data - Vaccinationobject
  @state {DivocHttpState}
  @returns {Operation}
*/
export function certifyVaccination(data) {
  return async state => {
    
    const [resolvedData] = expandReferences(state, data);
    const { baseUrl } = state.configuration;

    const options = {
      method: 'POST',
      data: resolvedData,
    }
    

    const response = await util.request({...state.configuration}, '/v1/certify', options);
  
    return util.prepareNextState(state, response);
  }
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
} from '@openfn/language-common';
