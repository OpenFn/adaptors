/**
 * Encodes a given string or Javascript object into Base64 format.
 * @function
 * @public
 * @namespace util
 * @param {string | object} data - The string or object to be encoded.
 * @returns {string} - The Base64 encoded string.
 * @example <caption>Encode a string</caption>
 * const encodedString = encode('Hello World');
 * console.log(encoded); // Output: SGVsbG8gV29ybGQ=
 * @example <caption>Encode an object</caption>
 * const encodedObject = encode({name: 'Jane Doe'})
 * console.log(encodedObject); //output eyJuYW1lIjoiSmFuZSBEb2UifQ==
 *
 */
export const encode = data => {
  let str = data;

  if(typeof data !== "string"){
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
export const decode = base64Data =>{
  let decodedObject = Buffer.from(base64Data, 'base64').toString('utf-8');

  if(['[', '{'].includes(decodedObject[0])){
    decodedObject = JSON.parse(decodedObject);
  }

  return decodedObject;
}

