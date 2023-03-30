import { execute as commonExecute } from '@openfn/language-common';
// import { curry, mapValues, flatten } from 'lodash-fp';
import pkg from 'lodash-fp';
const { curry, mapValues, flatten } = pkg;

/**
 * @ignore
 */

function steps(...operations) {
  return flatten(operations);
}

// TODO: use the one from @openfn/language-common
function expandReferences(attrs, state) {
  return mapValues(function (value) {
    return typeof value == 'function' ? value(state) : value;
  })(attrs);
}

function create(sObject, fields) {
  return state => {
    state.logger.debug(`Creating ${sObject}`);
    state.logger.debug(JSON.stringify(state.data, null, 2));
    state.logger.debug('===================');

    let id = state.references.length + 1;
    let result = { sObject, fields: expandReferences(fields, state), id };

    return {
      ...state,
      references: [result, ...state.references],
    };
  };
}

function update(sObject, fields) {
  return state => {
    state.logger.debug(`Updating ${sObject}`);
    state.logger.debug(JSON.stringify(state.data, null, 2));
    state.logger.debug('===================');

    let id = state.references.length + 1;
    let result = { sObject, fields: expandReferences(fields, state), id };

    return {
      ...state,
      references: [result, ...state.references],
    };
  };
}

function upsert(sObject, externalId, fields) {
  return state => {
    state.logger.debug(`Upserting ${sObject} with externalId:`, externalId);
    state.logger.debug(JSON.stringify(state.data, null, 2));
    state.logger.debug('===================');

    let id = state.references.length + 1;
    let result = { sObject, fields: expandReferences(fields, state), id };

    return {
      ...state,
      references: [result, ...state.references],
    };
  };
}

const reference = curry(function (position, { references }) {
  return references[position].id;
});

function execute(...operations) {
  const initialState = {
    logger: {
      info: console.info.bind(console),
      debug: console.log.bind(console),
    },
    references: [],
    data: null,
  };

  return state => {
    // Note: we no longer need `steps` anymore since `commonExecute`
    return commonExecute(...flatten(operations), function (state) {
      delete state.connection;
      return state;
    })({ ...initialState, ...state })
      .then(function (state) {
        state.logger.info(JSON.stringify(state.references, null, 2));
        console.info('Finished Successfully');
        return state;
      })
      .catch(function (err) {
        console.error(err.stack);
        console.info('Job failed.');
      });
  };
}

export { create, execute, reference, steps, update, upsert };

export { lookup, relationship } from './sourceHelpers';

export {
  each,
  join,
  fields,
  field,
  source,
  sourceValue,
  map,
  combine,
  merge,
  dataPath,
  dataValue,
  referencePath,
  lastReferenceValue,
  index,
  beta,
  toArray,
  arrayToString,
} from '@openfn/language-common';
