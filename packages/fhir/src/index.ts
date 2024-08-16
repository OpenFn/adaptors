import './types';

// We gonna have a problem with this in Lightning
// the client won't download this typing
import r5 from 'fhir/r5';
import r4 from 'fhir/r5';

// TODO is there any way to automate or generate this?
type VersionMap = {
  r4: {
    Patient: r4.Patient;
    Contract: r4.Contract;
    Bundle: r4.Bundle;
    Person: r4.Person;
  };
  r5: {
    Patient: r5.Patient;
    Contract: r5.Contract;
    Bundle: r5.Bundle;
  };
};

export declare function create<
  R extends keyof VersionMap[V],
  V extends keyof VersionMap = 'r5'
>(
  resourceType: R,
  // Exclude the duplicated underscored props from @types/fhir
  // insane! https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
  // But doesn't affected nested types
  resource: Omit<VersionMap[V][R], 'resourceType' | `_${string}`>,
  params: {
    version?: V;
  },
  callback: any
): any;

import * as Adaptor from './Adaptor';
export default Adaptor;

export * from './Adaptor';
