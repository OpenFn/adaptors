import './types';

// // export * as utils from './Utils';

import * as r5 from 'fhir/r5';

// this needs to override the built in sig
/**
 * CREATE TWO ELECTRIC BOOGALOO
 */
export declare function create(
  resourceType: 'Patient' | 'Bundle',
  resource: r5.Patient | r5.Bundle,
  params: any,
  callback: any
): any;

// export declare function jam(
//   resourceType: 'Patient' | 'Bundle',
//   resource: r5.Patient | r5.Bundle,
//   params: any,
//   callback: any
// ): any;

// // create()

import * as Adaptor from './Adaptor';
export default Adaptor;

export * from './Adaptor';
