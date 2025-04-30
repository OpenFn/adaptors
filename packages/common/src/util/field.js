/**
 * Returns a key, value pair in an array.
 * @public
 * @function
 * @example
 * field('destination_field_name__c', 'value')
 * @param {string} key - Name of the field
 * @param {Value} value - The value itself or a sourceable operation.
 * @returns {Field}
 */
export function field(key, value) {
  return [key, value];
}