import '@openfn/language-common';
// // we should have type defs on this
import { create, builders, b } from '@openfn/language-fhir-jembi';

// and this should actually run
console.log(builders);
const encounter = b.encounter({});

console.log(encounter);

console.log('hello');
