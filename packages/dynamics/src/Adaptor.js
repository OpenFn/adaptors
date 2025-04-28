import { execute as commonExecute } from '@openfn/language-common';
import {
  normalizeOauthConfig,
  expandReferences,
} from '@openfn/language-common/util';
import request from 'request';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
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
    return commonExecute(...operations)({
      ...initialState,
      ...state,
      configuration: normalizeOauthConfig(state.configuration),
    });
  };
}

export function createEntity(params) {
  return state => {
    function assembleError({ response, error }) {
      if (response && [200, 201, 202, 204].indexOf(response.statusCode) > -1)
        return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`);
    }

    const { resource, accessToken, apiVersion } = state.configuration;

    const [resolvedParams] = expandReferences(state, params);
    const { entityName, body } = resolvedParams;

    const url = `${resource}/api/data/v${apiVersion}/${entityName}`;

    const headers = {
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Content-Type': 'application/json',
      Authorization: accessToken,
    };

    console.log('Posting to url: ' + url);
    console.log('With body: ' + JSON.stringify(body, null, 2));

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: url,
          json: body,
          headers,
        },
        function (err, response) {
          const error = assembleError({ error: err, response });
          if (error) {
            reject(error);
          } else {
            console.log('Create entity succeeded.');
            resolve(response);
          }
        }
      );
    }).then(data => {
      const nextState = {
        ...state,
        response: { statusCode: data.statusCode, body: data.body },
      };
      return nextState;
    });
  };
}

export function query(params) {
  return state => {
    function assembleError({ response, error }) {
      if (response && [200, 201, 202, 204].indexOf(response.statusCode) > -1)
        return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`);
    }

    const { resource, accessToken, apiVersion } = state.configuration;
    const [resolvedParams] = expandReferences(state, params);
    const { entityName, entityId, query } = resolvedParams;

    const url = `${resource}/api/data/v${apiVersion}/${entityName}`;

    const urlId = entityId ? `${url}(${entityId})` : url;

    // TODO: find a better way of running these ternaries.
    // Here we initialize an empty object if no query is present.
    const ternaryQuery = query || {};

    const selectors = ternaryQuery.fields
      ? `$select=${query.fields.join(',')}`
      : null;
    const orderBy = ternaryQuery.orderBy
      ? `$orderby=${query.orderBy.field} ${query.orderBy.direction}`
      : null;
    const filter = ternaryQuery.filter ? `$filter=${query.filter}` : null;
    const limit = ternaryQuery.limit ? query.limit : 0;

    const queryUrl = [selectors, orderBy, filter]
      .filter(i => {
        return i != null;
      })
      .join('&');

    const fullUrl = queryUrl ? `${urlId}?${queryUrl}` : urlId;

    console.log('Full URL: ' + fullUrl);

    const headers = {
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Content-Type': 'application/json',
      Authorization: accessToken,
      Prefer: 'odata.maxpagesize=' + limit,
    };

    return new Promise((resolve, reject) => {
      request.get(
        {
          url: fullUrl,
          headers,
        },
        function (err, response, body) {
          const error = assembleError({ error: err, response });
          if (error) {
            reject(error);
          } else {
            console.log('Query succeeded.');
            console.log(JSON.parse(body));
            resolve(response);
          }
        }
      );
    }).then(data => {
      const nextState = {
        ...state,
        response: { statusCode: data.statusCode, body: data.body },
      };
      return nextState;
    });
  };
}

export function updateEntity(params) {
  return state => {
    function assembleError({ response, error }) {
      if (response && [200, 201, 202, 204].indexOf(response.statusCode) > -1)
        return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`);
    }

    const { resource, accessToken, apiVersion } = state.configuration;

    const [resolvedParams] = expandReferences(state, params);
    const { entityName, entityId, body } = resolvedParams;

    const url = `${resource}/api/data/v${apiVersion}/${entityName}(${entityId})`;

    const headers = {
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Content-Type': 'application/json',
      Authorization: accessToken,
    };

    console.log('Posting to url: ' + url);
    console.log('With body: ' + JSON.stringify(body, null, 2));

    return new Promise((resolve, reject) => {
      request.patch(
        {
          url: url,
          json: body,
          headers,
        },
        function (err, response) {
          const error = assembleError({ response, error: err });
          if (error) {
            reject(error);
          } else {
            console.log('Update succeeded.');
            resolve(response);
          }
        }
      );
    }).then(data => {
      const nextState = {
        ...state,
        response: { statusCode: data.statusCode, body: data.body },
      };
      return nextState;
    });
  };
}

export function deleteEntity(params) {
  return state => {
    function assembleError({ response, error }) {
      if (response && [200, 201, 202, 204].indexOf(response.statusCode) > -1)
        return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`);
    }

    const { resource, accessToken, apiVersion } = state.configuration;

    const [resolvedParams] = expandReferences(state, params);
    const { entityName, entityId } = resolvedParams;

    const url = `${resource}/api/data/v${apiVersion}/${entityName}(${entityId})`;

    const headers = {
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Content-Type': 'application/json',
      Authorization: accessToken,
    };

    console.log('Posting to url: ' + url);

    return new Promise((resolve, reject) => {
      request.delete(
        {
          url: url,
          headers,
        },
        function (err, response) {
          const error = assembleError({ error: err, response });
          if (error) {
            reject(error);
          } else {
            console.log('Delete succeeded.');
            resolve(response);
          }
        }
      );
    }).then(data => {
      const nextState = {
        ...state,
        response: { statusCode: data.statusCode, body: data.body },
      };
      return nextState;
    });
  };
}

export {
  field,
  fields,
  sourceValue,
  alterState,
  fn,
  fnIf,
  each,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';
