/**
 * Converts an attribute ID and value into a DHIS2 attribute object
 * @public
 * @example
 * fn(state => {
 *    const s = util.attr('w75KJ2mc4zz', 'Elias');
 *    console.log(s);
 *    return state;
 * })
 * @function
 * @param {string} attribute - A tracked entity instance (TEI) attribute ID.
 * @param {string} value - The value for that attribute.
 * @returns {object}
 */
export function attr(attribute, value) {
  return { attribute, value };
}

/**
 * Converts a dataElement and value into a DHIS2 dataValue object
 * @public
 * @example
 * fn(state => {
 *   const s = util.dv('f7n9E0hX8qk', 12);
 *   console.log(s);
 *   return state
 * })
 * @function
 * @param {string} dataElement - A data element ID.
 * @param {string} value - The value for that data element.
 * @returns {object}
 */
export function dv(dataElement, value) {
  return { dataElement, value };
}

/**
 * Gets an attribute value by its case-insensitive display name
 * @public
 * @example
 * fn(state => {
 *    const s = util.findAttributeValue(state.data.trackedEntities[0], 'first name');
 *    console.log(s);
 *    return state
 * })
 * @function
 * @param {Object} trackedEntity - A tracked entity instance (TEI) object
 * @param {string} attributeDisplayName - The 'displayName' to search for in the TEI's attributes
 * @returns {string}
 */
export function findAttributeValue(trackedEntity, attributeDisplayName) {
  return trackedEntity?.attributes?.find(
    a => a?.displayName.toLowerCase() == attributeDisplayName.toLowerCase()
  )?.value;
}

/**
 * Gets an attribute value by its uid
 * @public
 * @example
 * fn(state =>{
 *   const s = util.findAttributeValueById(state.tei, 'y1w2R6leVmh');
 *   console.log(s);
 *   return state
 * })
 * @function
 * @param {Object} trackedEntity - A tracked entity instance (TEI) object
 * @param {string} attributeUid - The uid to search for in the TEI's attributes
 * @returns {string}
 */
export function findAttributeValueById(trackedEntity, attributeUid) {
  return trackedEntity?.attributes?.find(a => a?.attribute == attributeUid)
    ?.value;
}
