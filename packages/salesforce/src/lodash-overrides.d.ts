// This file overrides curry to make it into a sort of proxy function
// This should export the correct signature to the DTS file
declare module 'lodash/fp' {
  export const curry: <F>(fn: F) => F;

  // @ts-ignore
  export default {
    curry,
  };
}
