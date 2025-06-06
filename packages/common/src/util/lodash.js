import _ from 'lodash';

/**
 * Lodash utility library.
 *
 * This module re-exports the full Lodash object.
 * Use named utilities like `_.map`, `_.cloneDeep`, etc.
 *
 * @see https://lodash.com/docs/
 * @module lodash
 *
 * @example <caption>Split an array into chunks of 2 items each</caption>
 * fn(state => {
 *   const items = [1, 2, 3, 4, 5];
 *   const chunks = util_.chunk(items, 2);
 *   return { ...state, chunks };
 * });
 */
export default _;
