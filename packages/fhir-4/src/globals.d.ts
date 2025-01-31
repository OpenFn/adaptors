// TODO generate this - just checking the structure

// TODO need to add @types fhir to the gen
import * as FHIR from 'fhir/r4';

// re-declare fhir types with _ removed
// basically everything allows _ variants
// but it's not useful for users
// We want to allow support for them, but not present them to users
// TODO: this doens't work - we need to generate these datatype interfaces from the spec
declare global {
  export type Identifier = Omit<FHIR.Identifier, `_${string}`>;
}
