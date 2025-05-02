export * from './http';
export * from './references';

export { default as parseDate } from './parse-date';
export { default as throwError } from './throw-error';
export { encode, decode } from './base64';
export { uuid } from './uuid';

/**
 * Returns a key, value pair in an array.
 * @public
 * @function
 * @namespace util
 * @example
 * field('destination_field_name__c', 'value')
 * @param {string} key - Name of the field
 * @param {Value} value - The value itself or a sourceable operation.
 * @returns {Field}
 */
export function field(key, value) {
  return [key, value];
}
