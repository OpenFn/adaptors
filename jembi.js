import '@openfn/language-common';
// // we should have type defs on this
import { create, builders } from '@openfn/language-fhir-jembi';

// and this should actually run
console.log(builders);
const encounter = builders.createEncounter({});

console.log(encounter);

console.log('hello');
