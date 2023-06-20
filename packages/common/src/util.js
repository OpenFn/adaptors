/**
 * General-purpose utility functions
 * 
 * These are designed more for use in adaptor code than job code
 * (but we could choose to export util from common)
 * 
 * None of these functions are operation factories
 */

// TODO this doesn't currently support skip
export function expandReferences(state, ...args) {
  return args.map((value) => expandReference(state, value));
}

function expandReference(state, value) {
  if (Array.isArray(value)) {
    return value.map(v => expandReference(state, v));
  }

  if (typeof value == 'object' && !!value) {
    return Object.keys(value).reduce((acc, key) => {
      return { ...acc, [key]: expandReference(state, value[key]) };
    }, {});
  }

  if (typeof value == 'function') {
    return expandReference(state, value(state));
  }
  return value;
}