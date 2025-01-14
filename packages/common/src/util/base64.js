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
    try {
      str = JSON.stringify(str);
    } catch (e){
      console.log(e.message);
    }
  }

  return Buffer.from(str, 'utf-8').toString('base64');
}

/**4
 * Decodes a Base64 encoded string back to its original format.
 * @function
 * @public
 * @namespace util
 * @param {string} base64Data - The Base64 encoded string.
 * @returns {string | object} - The decoded string or JavaScript Object.
 * @example <caption>Decode a Base64 string</caption>
 * const decoded = decode('SGVsbG8gV29ybGQ=');
 * @example <caption>Decode a Base64 JSON object to a standard JavaScript object</caption>
 * const decoded = decode('eyJuYW1lIjoiSmFuZSBEb2UifQ==');
 * console.log(decoded); // Output: {name: 'Jane Doe'}
 */
export const decode = base64Data =>{
  let decodedObject = Buffer.from(base64Data, 'base64').toString('utf-8');

  if(['[', '{'].includes(decodedObject[0])){
    decodedObject = JSON.parse(decodedObject);
  }

  return decodedObject;
}

