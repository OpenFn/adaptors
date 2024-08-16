import * as r5 from 'fhir/r5';

// TODO this will be a complex type
// I think I can only handle simple types in the js doc
// how will I bind this to the resourceType in the function ?
export type FhirResource = r5.Patient | r5.Bundle;

export type FhirResourceType = 'Patient' | 'Bundle';
