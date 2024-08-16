import { create } from '@openfn/language-fhir';
// this is good enough, the module path doesn't seem to resolve
// but it won't find the typings this way right?
// import { create, jam } from './packages/fhir/dist/index';
import { cursor } from '@openfn/language-common';

import { create as dhis2Create } from '@openfn/language-dhis2';

create();

cursor('x', {});

dhis2Create();
