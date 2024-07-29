// General data types defined in https://hl7.org/fhir/datatypes.html

// so hang on, what is this?
// this needs to be sort of aliased

// this is less a mixin and more of a helper

// hang on, these are types, right? values
// it's up to a builder to interpret and add it

import type FHIR from '@types/fhir';

// this accepts one or more names as simple objects

// should this take use as an argument?
// Should it default it?
// This isn't helping very much!
// should we warn for unrecognised properties?
export const humanName = function (name: FHIR.HumanName) {
  return name;
};

// tempted by this, but it's opinionated
// I suppose what's nice is that if you want to specify use on the object, you can
// export const humanName = function (name: FHIR.HumanName, use?: FHIR.HumanName['use']) {
//   return { name };
// };

export default {};
