// utils includes little builder functions

import _ from 'lodash';

// rather than code gen these with all their complexity,
// we can keep them in the library
// we can even unit test them if we want

// Create an identifier
// input can be a Full identifier, an Identifier with just a value, or a string value
// Note that if system is passed, it'll override
// (is this correct? This will force an input value to be mapped to the new system)
// Maybe the mapper can run some kind of conversion if neccessary?
const identifier = (input, system) => {
  // If an array of inputs is passed in, map each element of the array
  // because it's very common to support a set of identifiers, rather than just one
  if (Array.isArray(input)) {
    return input.map(i => identifier(i, system));
  }

  if (input) {
    if (typeof input === 'string') {
      return {
        value: input,
        system,
      };
    } else if (system) {
      return {
        // Is system a default or override?
        // Probably a default?
        system,
        ...input,
      };
    } else {
      return input;
    }
  }
};

// Add an extension to a resource
const addExtension = (resource, url, value) => {
  const obj = {
    url: url,
  };

  if (value.coding) {
    obj.valueCodeableConcept = value;
  } else {
    obj.value = value;
  }
  // TODO we have to infer every value type here

  resource.extension ??= [];
  resource.extension.push(obj);
};

const findExtension = (arr, targetUrl, path) => {
  const result = arr.find(ext => ext.url === targetUrl);
  if (result && path) {
    return _.get(result, path);
  }
  return result;
};

export { findExtension };

// TODO should this also take display text?
const coding = (code, system) => ({ code, system });

const concept = (text, ...codings) => {
  if (typeof text === 'string') {
    return {
      text,
      coding: codings,
    };
  } else {
    return { coding: [text, ...codings] };
  }
};

// const address = props => {
//   const result = {
//     ...props,
//   };

//   // TODO convert residentialType to an extension

//   return result;
// };

export const builders = {
  addExtension,
  coding,
  concept,
  identifier,
  // address,
};
