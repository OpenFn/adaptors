import './types';

// We gonna have a problem with this in Lightning
// the client won't download this typing
import r5 from 'fhir/r5';

interface FhirResources {
  // can I automate this?
  Patient: r5.Patient;
  Contract: r5.Contract;
  Bundle: r5.Bundle;
}

export declare function create<R extends keyof FhirResources>(
  resourceType: R,
  // Exclude the duplicated underscored props from @types/fhir
  // insane! https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
  resource: Omit<FhirResources[R], 'resourceType' | `_${string}`>,
  params: any,
  callback: any
): any;

import * as Adaptor from './Adaptor';
export default Adaptor;

export * from './Adaptor';
