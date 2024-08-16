import './types';

// We gonna have a problem with this in Lightning
// the client won't download this typing
import * as r5 from 'fhir/r5';

interface FhirResources {
  // can I automate this?
  // I don't think so
  // Also I guess not every type is something you create
  // So instead I have to duplicate @types/fhir/FhirResource
  Patient: r5.Patient;
  Contract: r5.Contract;
  Bundle: r5.Bundle;
}

// TODO how do we control versions?
export declare function create<R extends keyof typeof r5>(
  resourceType: R,
  // Exclude the duplicated underscored props from @types/fhir
  // insane! https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
  // But doesn't affected nested types
  resource: Omit<FhirResources[R], 'resourceType' | `_${string}`>,
  params: any,
  callback: any
): any;

import * as Adaptor from './Adaptor';
export default Adaptor;

export * from './Adaptor';
