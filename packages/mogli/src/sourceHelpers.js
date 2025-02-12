import { sourceValue, field } from '@openfn/language-common';

/**
 * Adds a lookup or 'dome insert' to a record.
 * @example <caption>Example</caption>
 * lookup("relationship_name__r", "externalID on related object", "$.path")
 * @function
 * @public
 * @param {string} relationshipName - `__r` relationship field on the record.
 * @param {string} externalID - Salesforce ExternalID field.
 * @param {string} path - JSONPath to data source.
 * @returns {object}
 */
export function lookup(relationshipName, externalId, path) {
  return field(relationshipName, state => {
    return { [externalId]: sourceValue(path)(state) };
  });
}

/**
 * Adds a lookup or 'dome insert' to a record.
 * @example <caption>Data Sourced Value</caption>
 * relationship("relationship_name__r", "externalID on related object", dataSource("path"))
 * @example <caption>Fixed Value</caption>
 * relationship("relationship_name__r", "externalID on related object", "hello world")
 * @function
 * @public
 * @param {string} relationshipName - `__r` relationship field on the record.
 * @param {string} externalID - Salesforce ExternalID field.
 * @param {string} dataSource - resolvable source.
 * @returns {object}
 */
export function relationship(relationshipName, externalId, dataSource) {
  return field(relationshipName, state => {
    if (typeof dataSource == 'function') {
      return { [externalId]: dataSource(state) };
    }
    return { [externalId]: dataSource };
  });
}
