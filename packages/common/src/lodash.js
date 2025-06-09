import lodash from 'lodash';

/**
 * Lodash utility library.
 * All lodash v4.17 functions are available on the `_` namespace, eg,
 * `_.map`, `_.cloneDeep`, etc.
 *
 * @see https://lodash.com/docs/
 * @public
 * @function
 * @namespace _
 * @alias *
 * @example <caption>Split an array into chunks of 2 items each</caption>
 * fn(state => {
 *   const items = [1, 2, 3, 4, 5];
 *   const chunks = _.chunk(items, 2);
 *   return { ...state, chunks };
 * });
 */

export const _ = lodash;
