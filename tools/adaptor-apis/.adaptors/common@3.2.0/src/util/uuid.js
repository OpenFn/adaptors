import { randomUUID } from 'node:crypto';

/**
 * Generates a UUID (Universally Unique Identifier)
 * @function
 * @public
 * @namespace util
 * @returns {string} - A newly generated UUID
 * @example <caption>Generate a UUID</caption>
 * const id = util.uuid();
 * console.log(id); // Output:'3f4e254e-8f6f-4f8b-9651-1c1c262cc83f'
 */
export const uuid = () => randomUUID();
