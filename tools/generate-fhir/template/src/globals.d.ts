// TODO this shold be imported from the base adaptor

// import { HumanName } from 'fhir/r5';

// Global fhir types
// maybe we should use types/fhir for this
// But that has its own problems and I think this is fairly simple

type Identifier = {
  system: string;
  value: string;
};

// TODO this probably isn't complete
type Meta = {
  profile: string[];
};

type Coding = {
  system: string;
  code: string;
};

type CodeableConcept = {
  coding: Coding[];
  text?: string;
  extension?: Extension[];
};

type Narrative = {
  status: string;
  div: string;
};

type BackboneElement = {
  extension?: Extension[];
  id?: string;
  modifierExtension?: Extension[];
};

type Extension = {
  // TODO this supports lods of value types...
  url: string;
  valueCodeableConcept: CodeableConcept;
};

type Reference = {
  display?: string;
  identifier?: Identifier;
  reference?: string;
  type?: string;
};

type Period = {
  start: 'string';
  end: 'string';
};

type Resource = {
  resourceType: string;
  id?: string;
  implicitRules?: string;
  language?: string;
  meta?: Meta;
};

// TODO humanname is a bit more complex.. maybe I should be exporting from fhir after all
// interface HumanName extends HN {}
// type HumanName = HN;

// these are stubbed exports
type Duration = {};
type HumanName = {};
type ContactPoint = {};
type Address = {};
type Annotation = {};
type Attachment = {};
