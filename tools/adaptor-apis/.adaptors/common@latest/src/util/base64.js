import _ from 'lodash';

/**
 * Encodes a given string or Javascript object into Base64 format.
 * @function
 * @public
 * @namespace util
 * @param {string | object} data - The string or object to be encoded.
 * @param {object} options - Options
 * @param {boolean} [options.parseJson=true] - If false, no attempt will be made to stringiy the data before encoding it.
 * @returns {string} - The Base64 encoded string.
 * @example <caption>Encode a string</caption>
 * const encodedString = util.encode('Hello World');
 * console.log(encoded); // Output: SGVsbG8gV29ybGQ=
 * @example <caption>Encode an object</caption>
 * const encodedObject = util.encode({name: 'Jane Doe' })
 * console.log(encodedObject); //output eyJuYW1lIjoiSmFuZSBEb2UifQ==
 * @example <caption>To skip the JSON stringification step</caption>
 * const encodedObject = util.encode('Hello World', { parseJson: false })
 */
export const encode = (data, options = { parseJson: true }) => {
  let str = data;

  if (typeof data !== 'string' && options.parseJson) {
    try {
      str = JSON.stringify(str);
    } catch (e) {
      console.log(e.message);
    }
  }

  return Buffer.from(str, 'utf-8').toString('base64');
};

/**
 * Decodes a Base64 encoded string back to its original format.
 * @function
 * @public
 * @namespace util
 * @param {string} base64Data - The Base64 encoded string.
 * @param {object} options - Options.
 * @param {boolean} [options.parseJson=true] - If false, no attempt will be made to parse the decoded data into a JSON object.
 * @returns {string | object} - The decoded string or JavaScript Object.
 * @example <caption>Decode a Base64 string</caption>
 * const decoded = util.decode('SGVsbG8gV29ybGQ=');
 * @example <caption>Decode a Base64 JSON object to a standard JavaScript object</caption>
 * const decoded = util.decode('eyJuYW1lIjoiSmFuZSBEb2UifQ==');
 * console.log(decoded); // Output: {name: 'Jane Doe' }
 * @example <caption>To skip the JSON stringification step</caption>
 * const decodedString = util.decode('Hello World', { parseJson: false })
 */
export const decode = (base64Data, options = { parseJson: true }) => {
  let decodedValue = Buffer.from(base64Data, 'base64').toString('utf-8');

  if (
    (_.startsWith(decodedValue, '[') || _.startsWith(decodedValue, '{')) &&
    options.parseJson
  ) {
    try {
      decodedValue = JSON.parse(decodedValue);
    } catch (e) {
      console.log(e.message);
    }
  }

  return decodedValue;
};
