type Mapping = {
  // mapping rules for a particular key
  // defaults, fn, etc
  defaults?: Record<string, any>;

  // Map some simple key in the input to an extension URL
  extension: string;
};

// Proprietary schema to describe a particular prop
type Schema = {
  id: string;
  type: string;
  isArray: boolean;
  defaults: Record<string, any>;
  /** True if this prop includes a system */
  hasSystem?: boolean;
};

type profileId = string;

type SpecJSON = Record<profileId, ProfileSpec>;

// This (partially)) defines the JSON structure of a fhir spec for a profile
type ProfileSpec = {
  id: string; // profile id
  resourceType: string; // should be StructureDefinition
  type: string; // the resource this profile extemds
  kind: string; // ours should all be resource I think?

  name: string;
  title: string;
  description: string;

  status: string; // active | ?

  snapshot: {
    element: ElementSpec[];
  };
  differential: {
    element: Partial<ElementSpec>[];
  };
};

type ElementSpec = {
  path: string;
  id: string;

  /** short description */
  short: string;
  /** description */
  definition: string;

  min?: number | '*';
  max?: number | '*';

  base: any;

  patternCodeableConcept?: string;
  patternUri?: string;
};
