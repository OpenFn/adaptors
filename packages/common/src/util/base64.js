/**
 * Encodes a given string into Base64 format.
 * @function
 * @public
 * @namespace util
 * @param {string} data - The string to be encoded.
 * @returns {string} - The Base64 encoded string.
 * @example <caption>Encode a string</caption>
 * const encoded = encode('Hello World');
 * console.log(encoded); // Output: SGVsbG8gV29ybGQ=
 */
export const encode = data => {
  let str = data;

  if(typeof str === "object" && str !== null && Object.keys(str).length > 0){
    str = JSON.stringify(str);
  }

  return Buffer.from(str, 'utf-8').toString('base64');
}

/**4
 * Decodes a Base64 encoded string back to its original format.
 * @function
 * @public
 * @namespace util
 * @param {string} base64Data - The Base64 encoded string.
 * @returns {string} - The decoded string.
 * @example <caption>Decode a Base64 string</caption>
 * const decoded = decode('SGVsbG8gV29ybGQ=');
 * console.log(decoded); // Output: Hello World
 */
export const decode = base64Data =>
  Buffer.from(base64Data, 'base64').toString('utf-8');
