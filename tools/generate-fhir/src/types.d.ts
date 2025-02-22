export type MappingSpec = {
  include?: string[]; // include reource types. Should this take a profile?
  exclude?: string[]; // exclude resource Types. Should this take a profile?
  // kinda thinkg that if you include Patients, you have to include all patient profiles

  // specifiy mapping rules for a profile or resource
  /// resource mappings are applied to each profile, but can be overridden by the profile
  // profiles?: Record<string, Mapping>;
  // resources?: Record<string, Mapping>;

  // Use this for now
  overrides?: Record<string, Mapping>;

  /** Array of string regexes */
  valueSets?: string[];

  propsToIgnoreInDocs?: string[];

  /** After creation has run, execute this code */
  initialiser?: (resource) => void;

  // Allow builder shorthand values to be captured in typings
  // eg, a refernce can be a string or Reference
  typeShorthands?: Record<string, string[]>;
};

export type Mapping = {
  // mapping rules for a particular key
  // defaults, fn, etc
  defaults?: Record<string, any>;

  // Map some simple key in the input to an extension URL
  extension: string;
};

// Proprietary schema to describe a particular prop
export type Schema = {
  id: string;
  type: string[];
  isArray: boolean;
  defaults: Record<string, any>;
  /** True if this prop includes a system */
  hasSystem?: boolean;

  values?: string[];
};

export type profileId = string;

export type SpecJSON = Record<profileId, ProfileSpec>;

// This (partially) defines the JSON structure of a fhir spec for a profile
export type ProfileSpec = {
  id: string; // profile id
  resourceType: string; // should be StructureDefinition
  type: string; // the resource this profile extends
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

export type ElementSpec = {
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
