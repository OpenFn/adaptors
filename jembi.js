import '@openfn/language-common';
// // we should have type defs on this
import { create, builders, b, util } from '@openfn/language-fhir-jembi';

// and this should actually run
// console.log(builders);
const encounter = b.encounter({
  id: 'wibble',
  identifier: 'identify me baby',
});

console.log(encounter);

create('Patient', { id: 'big willy smith' })();

console.log('hello');

util.address({
  
})