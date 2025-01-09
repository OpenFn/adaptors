import { encode, decode, uuid } from '@openfn/language-common/util';

export {
  /**
   * Encodes a given string into Base64 format.
   * @function
   * @public
   * @param {string} data - The string to be encoded.
   * @returns {string} - The Base64 encoded string.
   * @example <caption>Encode a string</caption>
   * const encoded = util.encode('Hello World');
   * console.log(encoded); // Output: SGVsbG8gV29ybGQ=
   */
  encode,
  /**
   * Decodes a Base64 encoded string back to its original format.
   * @function
   * @public
   * @param {string} base64Data - The Base64 encoded string.
   * @returns {string} - The decoded string.
   * @example <caption>Decode a Base64 string</caption>
   * const decoded = util.decode('SGVsbG8gV29ybGQ=');
   * console.log(decoded); // Output: Hello World
   */
  decode,
  /**
   * Generates a UUID (Universally Unique Identifier).
   * @function
   * @public
   * @returns {string} - A newly generated UUID.
   * @example <caption>Generate a UUID</caption>
   * const id = util.uuid();
   * console.log(id); // Output:'3f4e254e-8f6f-4f8b-9651-1c1c262cc83f'
   */
  uuid,
};
