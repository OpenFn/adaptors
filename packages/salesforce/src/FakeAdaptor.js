import { execute as commonExecute } from '@openfn/language-common';
import mapValues from 'lodash/mapValues';
import flatten from 'lodash/flatten';

/**
 * @ignore
 */

function steps(...operations) {
  return flatten(operations);
}

// TODO: use the one from language-common
function expandReferences(attrs, state) {
  return mapValues(attrs, function (value) {
    return typeof value == 'function' ? value(state) : value;
  });
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

function bulk(sObject, operation, options, fun) {
  return state => {
    const opts = JSON.stringify(options, null, 2);

    state.logger.debug(
      `Performing bulk ${operation} for ${sObject} \nwith options: ${opts}`
    );
    state.logger.debug(
      '======================================================'
    );

    let result = { sObject, operation, options, records: fun(state) };

    return {
      ...state,
      references: [result, ...state.references],
    };
  };
}

function createIf(logical, sObject, fields) {
  return state => {
    if (logical) {
      state.logger.debug(`Creating ${sObject}`);
      state.logger.debug(JSON.stringify(state.data, null, 2));
      state.logger.debug('===================');

      let id = state.references.length + 1;
      let result = { sObject, fields: expandReferences(fields, state), id };

      return {
        ...state,
        references: [result, ...state.references],
      };
    } else {
      console.info(`Not upserting ${sObject} because logical is false.`);
      return state;
    }
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

function upsertIf(logical, sObject, externalId, fields) {
  return state => {
    if (logical) {
      state.logger.debug(`Upserting ${sObject} with externalId:`, externalId);
      state.logger.debug(JSON.stringify(state.data, null, 2));
      state.logger.debug('===================');

      let id = state.references.length + 1;
      let result = { sObject, fields: expandReferences(fields, state), id };

      return {
        ...state,
        references: [result, ...state.references],
      };
    } else {
      console.info(`Not upserting ${sObject} because logical is false.`);
      return state;
    }
  };
}

function query(qs, state) {
  return state => {
    const response = {
      records: [{ Id: 987 }, { Id: 988 }, { Id: 989 }],
    };

    state.logger.debug(`Executing query ${qs}.`);
    state.logger.debug('===================');
    state.logger.debug(
      `Returning arbitrary result: ${JSON.stringify(response, null, 2)}`
    );

    let id = state.references.length + 1;
    let result = response;

    return {
      ...state,
      references: [result, ...state.references],
    };
  };
}

const reference = function (position, { references }) {
  return references[position].id;
};

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

export {
  bulk,
  create,
  createIf,
  execute,
  reference,
  steps,
  update,
  upsert,
  upsertIf,
  query,
};

export {
  alterState,
  arrayToString,
  beta,
  combine,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  http,
  humanProper,
  index,
  join,
  lastReferenceValue,
  map,
  merge,
  referencePath,
  source,
  sourceValue,
  toArray,
} from '@openfn/language-common';
