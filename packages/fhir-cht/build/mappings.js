export default {
  include: ['Patient'],
  // Only include valuesets that match this regex
  // (but as strings because its annoying with slashies)
  valueSets: ['http://hl7.org/fhir/ValueSet'],
};
