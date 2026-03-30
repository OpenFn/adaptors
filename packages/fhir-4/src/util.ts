import nodepath from 'node:path';
import _ from 'lodash-es';

import { composeNextState } from '@openfn/language-common';
import {
  throwError,
  request as commonRequest,
  makeBasicAuthHeader,
  assertRelativeUrl,
} from '@openfn/language-common/util';

export function assertValidResourceId(id: string) {
  if (!id.match('/')) {
    throwError('INVALID_RESOURCE_ID', {
      description: `${id} is not a valid resource identifier`,
      fix: `Make sure the type and id are present in the reference, ie, Patient/123`,
    });
  }
}
export function addAuth(options) {
  if (options.headers?.Authorization) {
    return;
  }

  const { username, password, access_token, authorization } =
    options.configuration;

  if (authorization) {
    return { Authorization: authorization };
  }

  if (access_token || authorization) {
    return { Authorization: `Bearer ${access_token}` };
  }

  if (username && password) {
    return { ...makeBasicAuthHeader(username, password) };
  }
}

export const prepareNextState = (state, response) => {
  const { body, validationErrors, ...responseWithoutBody } = response;

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

// TODO need to do this for errors too
export const logResponse = (response, query) => {
  const { method, url, statusCode, duration } = response;
  if (method && url && duration && statusCode) {
    let urlWithQuery = url;
    if (query && Object.keys(query).length) {
      urlWithQuery += '?' + new URLSearchParams(query).toString();
    }
    const message = `${method} ${urlWithQuery} - ${statusCode} in ${duration}ms`;
    if (response instanceof Error) {
      console.error(message);
      console.error('response body: ');
      console.error(response.body || '[no body]');
    } else {
      console.log(message);
    }
  }
  return response;
};

type RequestOptions = {
  headers?: Record<string, string>;
  body?: any;
  configuration: {
    apiPath?: string;
    baseUrl?: string;
    username?: string;
    password?: string;
    access_token?: string;
  };
  query?: Record<string, string>;
};

export const request = (method, path, options: RequestOptions) => {
  assertRelativeUrl(path);

  const { configuration, ...otherOptions } = options;
  const fullPath = nodepath.join(configuration.apiPath ?? '/fhir', path);
  const opts = {
    ...otherOptions,
    headers: Object.assign(
      {},
      {
        accept: 'application/fhir+json',
        'content-type': 'application/fhir+json',
      },
      addAuth(options),
      options.headers,
    ),
    baseUrl: configuration.baseUrl,
    parseAs: 'json',
  };

  // TODO add common error handlers for 404, 401
  return commonRequest(method, fullPath, opts)
    .then(logResponse)
    .then()
    .catch(async e => {
      if (
        e.headers &&
        'content-type' in e.headers &&
        e.headers['content-type'].match(/fhir\+json/)
      ) {
        logValidationErrors(e, opts.body);
      }
      throw e;
    });
};

// Util function to nicely print validation errors coming back from a fhir response
export function logValidationErrors(response, payload, logger = console) {
  const error = JSON.parse(response.body);
  if (error.issue && error.issue.length) {
    delete response.body;
    logger.log();
    logger.error('FHIR server reports validation issues:');
    const errCount = error.issue.reduce(
      (count, e) => (e.severity === 'error' ? count + 1 : count),
      0,
    );
    if (errCount) {
      logger.error(` - ${errCount} Errors`);
    }

    const warnCount = error.issue.reduce(
      (count, e) => (e.severity === 'error' ? count + 1 : count),
      0,
    );
    if (warnCount) {
      logger.error(` - ${warnCount} Warnings`);
    }
    logger.log();

    // group by resource
    // How does this look for a bundle though?
    const groups = {};

    error.issue.forEach(issue => {
      try {
        let resourceId = 'unidentified resource';
        // first we identify the resource in question
        // Which might mean pulling it out of the bundle
        if (issue.location) {
          let idx = issue.location[0].match(/Bundle.entry\[(\d+)\]/);
          if (idx && idx.length >= 2) {
            idx = idx[1];
            const resource = _.get(payload, `entry[${idx}]`)?.resource;
            if (resource) {
              resourceId = `${resource.resourceType}/${resource.id}`;
            }
          } else {
            if (payload.resourceType && payload.id) {
              resourceId = `${payload.resourceType}/${payload.id}`;
            }
          }
        }

        const type = `${issue.severity}s`;
        groups[resourceId] ??= {};

        let path = '*';
        // Now find the path to which the validation refers
        // If no path, just use *
        if (issue.location[0].match(/\.resource\./)) {
          // Match path like Bundle.entry[6].resource.category.coding[0]
          path = issue.location[0].split(/\.resource\./)[1];
        } else if (issue.location.includes(`*${resourceId}*`)) {
          // match a path like Bundle.entry[6].resource.category.coding[0]
          const suffix = issue.location[0].split(/\.resource\./)[1];
          if (suffix && suffix.length > 1) {
            path = suffix;
          }
        }
        groups[resourceId][type] ??= {};

        groups[resourceId][type][path] ??= [];
        groups[resourceId][type][path].push(issue.diagnostics);
      } catch (e) {
        logger.log('error parsing issue at ', issue.location);
        console.log(e);
      }
    });

    // Now log everything
    for (const resource in groups) {
      logger.log(`${resource} issues:`);
      ['errors', 'warnings'].forEach(type => {
        if (type in groups[resource]) {
          logger.log(`  ${type}:`.toUpperCase());

          for (const path in groups[resource][type]) {
            logger.log();
            logger.log('  ', path);
            for (const message of groups[resource][type][path]) {
              const fn = type === 'error' ? console.error : console.warn;
              fn('    -', message);
            }
          }
          logger.log();
        }
      });
    }

    // Note that this will get extracted by cleanResponseObject
    logger.log('Issues will be written to state.fhirValidationIssues');
    response.$validationIssues = groups;
  } else {
    response.body = error;
  }

  return response;
}

// Util function which takes the validation errors
// array off of the response object and writes it to state
// This is useful because
// a) the validation array looks really ugly when logged to the CLI or app
// b) validation errors have been pretty-printed already
// c) users might want to do some automation/analysis on the validation errors
export function cleanResponseObject(state, response) {
  if (response.$validationIssues) {
    state.fhirValidationIssues ??= {};
    Object.assign(state.fhirValidationIssues, response.$validationIssues);
    delete response.$validationIssues;
  }
  return state;
}

function collectRefs(value: any): string[] {
  if (!value || typeof value !== 'object') return [];
  if (Array.isArray(value)) return value.flatMap(collectRefs);

  const refs: string[] = [];
  if (typeof value.reference === 'string') {
    refs.push(value.reference);
  }
  for (const v of Object.values(value)) {
    refs.push(...collectRefs(v));
  }
  return refs;
}

export function sortBundle(entries: any[]) {
  // Map "ResourceType/id" -> index in the entries array
  const indexByRef = new Map<string, number>();
  for (let i = 0; i < entries.length; i++) {
    const { resourceType, id } = entries[i].resource;
    if (resourceType && id) {
      indexByRef.set(`${resourceType}/${id}`, i);
    }
  }

  const n = entries.length;
  const inDegree = new Array(n).fill(0);
  // adj[j] = list of indices that depend on j (j must come before them)
  const adj: number[][] = Array.from({ length: n }, () => []);

  for (let i = 0; i < n; i++) {
    const deps = new Set<number>();
    for (const ref of collectRefs(entries[i].resource)) {
      const j = indexByRef.get(ref);
      if (j !== undefined && j !== i) deps.add(j);
    }
    for (const j of deps) {
      adj[j].push(i);
      inDegree[i]++;
    }
  }

  // Kahn's algorithm - queue seeded with zero-in-degree nodes in original order
  const queue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const result: any[] = [];
  while (queue.length > 0) {
    const idx = queue.shift()!;
    result.push(entries[idx]);
    for (const dep of adj[idx]) {
      if (--inDegree[dep] === 0) {
        // Insert in original-index order to keep the sort stable
        let k = 0;
        while (k < queue.length && queue[k] < dep) k++;
        queue.splice(k, 0, dep);
      }
    }
  }

  // Append any remaining entries (e.g. circular deps) in original order
  for (let i = 0; i < n; i++) {
    if (inDegree[i] > 0) result.push(entries[i]);
  }

  return result;
}
