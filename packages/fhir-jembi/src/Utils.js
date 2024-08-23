// utils includes little builder functions

// rather than code gen these with all their complexity,
// we can keep them in the library
// we can even unit test them if we want

// Create an identifier
// input can be a Full identifier, an Identifier with just a value, or a string value
// Note that if system is passed, it'll override
// (is this correct? This will force an input value to be mapped to the new system)
// Maybe the mapper can run some kind of conversion if neccessary?
const identifier = (input, system) => {
  if (input) {
    if (typeof input === 'string') {
      return {
        value: input,
        system,
      };
    } else if (system) {
      return {
        ...input,
        system,
      };
    } else {
      return input;
    }
  }
};

export const builders = {
  identifier,
};
