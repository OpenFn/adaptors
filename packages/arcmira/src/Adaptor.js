import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * OpenFn state returned by Arcmira operations.
 * @typedef {object} ArcmiraState
 * @property {object} data - Complete parsed API response, including coverage and source metadata.
 * @property {object} response - HTTP statusCode only; request credentials are not copied here.
 * @property {Array} references - Previous state.data values.
 */

/**
 * Read the key's account, scopes, plan, usage and transcript settings.
 * See {@link https://arcmira.com/docs|Arcmira API docs} for the response contract.
 * @example <caption>Check account context before a research step.</caption>
 * getAccountContext();
 * @function
 * @public
 * @returns {Operation}
 * @state {ArcmiraState}
 */
export function getAccountContext() {
  return async state => {
    const response = await util.request(state.configuration, '/v1/me');
    return util.prepareNextState(state, response);
  };
}

/**
 * Supported search query parameters. Date filters apply to media publication dates.
 * See {@link https://arcmira.com/docs|Arcmira API docs} for plan windows and source classes.
 * @typedef {object} SearchParameters
 * @property {number} [limit=5] - Maximum chunks, an integer from 1 to 20. One request only.
 * @property {string} [after] - Inclusive ISO 8601 publication date or datetime.
 * @property {string} [before] - Exclusive ISO 8601 publication date or datetime.
 * @property {string} [channel_ids] - Comma-separated YouTube channel IDs, at most eight.
 * @property {string} [source] - arcmira_premium, creator_captions or third_party_quick.
 */

/**
 * Search indexed transcripts for one topic. Returns the complete response in
 * state.data, preserving chunks, timestamps, source classes and coverage notes.
 * Makes one GET request without pagination, automatic retries or transcript generation.
 * The first five returned chunks do not use credits under the current API contract.
 * Reads beyond the free result allowance are metered under configured account budgets.
 * @example <caption>Search a publication window from input data.</caption>
 * searchTranscripts($.data.topic, {
 *   after: $.data.after,
 *   before: $.data.before,
 *   limit: 3,
 * });
 * @function
 * @public
 * @param {string} query - One topic or phrase, at least two characters.
 * @param {SearchParameters} [parameters={}] - Supported API filters and result limit.
 * @returns {Operation}
 * @state {ArcmiraState}
 */
export function searchTranscripts(query, parameters = {}) {
  return async state => {
    const [q, params] = expandReferences(state, query, parameters);
    if (typeof q !== 'string' || q.trim().length < 2) {
      throw new Error('Arcmira search requires one topic of at least two characters.');
    }
    if (!params || typeof params !== 'object' || Array.isArray(params)) {
      throw new Error('Arcmira search parameters must be an object.');
    }
    const allowed = ['limit', 'after', 'before', 'channel_ids', 'source'];
    if (Object.keys(params).some(key => !allowed.includes(key))) {
      throw new Error('Unsupported Arcmira search parameter. Use limit, after, before, channel_ids or source.');
    }
    const limit = params.limit === undefined ? 5 : params.limit;
    if (!Number.isInteger(limit) || limit < 1 || limit > 20) {
      throw new Error('Arcmira search limit must be an integer from 1 to 20.');
    }
    const filters = {};
    for (const key of allowed.filter(key => key !== 'limit')) {
      if (params[key] !== undefined) {
        if (typeof params[key] !== 'string' || !params[key].trim()) {
          throw new Error(`Arcmira ${key} must be a non-empty string.`);
        }
        filters[key] = params[key];
      }
    }
    if (filters.source && !['arcmira_premium', 'creator_captions', 'third_party_quick'].includes(filters.source)) {
      throw new Error('Unsupported Arcmira transcript source.');
    }
    const response = await util.request(state.configuration, '/v1/search', {
      q: q.trim(),
      limit,
      ...filters,
    });
    return util.prepareNextState(state, response);
  };
}

export {
  as, combine, cursor, dataPath, dataValue, dateFns, each, field, fields,
  fn, fnIf, group, lastReferenceValue, map, merge, scrubEmojis, sourceValue, util,
} from '@openfn/language-common';
