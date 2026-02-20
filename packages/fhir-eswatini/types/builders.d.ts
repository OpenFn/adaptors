
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import { builders } from '@openfn/language-fhir-4';

declare type Encounter_SzEncounter_Props = {
    account?: builders.Reference[];
    appointment?: builders.Reference[];
    basedOn?: builders.Reference[];
    class?: builders.Coding;
    classHistory?: builders.BackboneElement[];
    contained?: any[];
    diagnosis?: builders.BackboneElement[];
    episodeOfCare?: builders.Reference[];
    extension?: builders.Extension[];
    hospitalization?: builders.BackboneElement;
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    length?: builders.Duration;
    location?: builders.BackboneElement[];
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    partOf?: builders.Reference;
    participant?: builders.BackboneElement[];
    period?: builders.Period;
    priority?: builders.CodeableConcept;
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    serviceProvider?: builders.Reference;
    serviceType?: builders.CodeableConcept;
    status?: string;
    statusHistory?: builders.BackboneElement[];
    subject?: builders.Reference;
    text?: builders.Narrative;
    type?: builders.CodeableConcept[];
    [key: string]: any;
};

declare const addExtension: (resource: any, url: any, value: any) => void;
declare const c: typeof builders.coding;
declare const cc: (codings: (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?]) | (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?])[], extra?: Omit<builders.CodeableConcept, "coding">) => builders.CodeableConcept;
declare const coding: typeof builders.coding;
declare const composite: (object: any, key: any, value: any) => void;
declare const concept: (codings: (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?]) | (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?])[], extra?: Omit<builders.CodeableConcept, "coding">) => builders.CodeableConcept;
declare const ext: (url: string, value: any, props?: Omit<builders.Extension, "url">) => {
    extension: ({
        url: string;
    } & Omit<builders.Extension, "url">)[];
};
declare const extendSystemMap: (newMappings: any) => void;
declare const extendValues: (url: any, values: any, type?: string) => void;
declare const extension: (url: string, value: any, props?: Omit<builders.Extension, "url">) => {
    extension: ({
        url: string;
    } & Omit<builders.Extension, "url">)[];
};
declare const findExtension: (obj: any, targetUrl: any, path: any) => any;
declare const id: (id: string | builders.Identifier, ext?: any[], valueHints?: any) => any;
declare const identifier: (id: string | builders.Identifier, ext?: any[], valueHints?: any) => any;
declare const lookupValue: (url: any, code: any) => any;
declare const mapSystems: (obj: any) => any;
declare const mapValues: (obj: any, hints: any) => any;
declare const ref: (ref: any, opts?: {}) => any;
declare const reference: (ref: any, opts?: {}) => any;
declare const setSystemMap: (newMappings: any) => (state: any) => any;
declare const setValues: (url: any, values: any, type?: string) => void;
declare const value: (value: any, system: any, ...extra: any[]) => any;

/**
  * Create a Encounter resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Identifier(s) by which this encounter is known
  * @param {string} [props.status] - planned | arrived | triaged | in-progress | onleave | finished | cancelled +
  * @param {BackboneElement} [props.statusHistory] - List of past encounter statuses
  * @param {string} [props.class] - Department in which the encounter took place. Accepts values: OPD, IPD, CO, SO
  * @param {BackboneElement} [props.classHistory] - List of past encounter classes
  * @param {CodeableConcept} [props.type] - Specific type of encounter
  * @param {CodeableConcept} [props.serviceType] - Specific type of service
  * @param {CodeableConcept} [props.priority] - Indicates the urgency of the encounter
  * @param {Reference} [props.subject] - Patient associated with the encounter
  * @param {Reference} [props.episodeOfCare] - Episode(s) of care that this encounter should be recorded against
  * @param {Reference} [props.basedOn] - The ServiceRequest that initiated this encounter
  * @param {BackboneElement} [props.participant] - List of participants involved in the encounter
  * @param {Reference} [props.appointment] - The appointment that scheduled this encounter
  * @param {Period} [props.period] - The start and end time of the encounter
  * @param {Duration} [props.length] - Quantity of time the encounter lasted (less time absent)
  * @param {CodeableConcept} [props.reasonCode] - Coded reason the encounter takes place
  * @param {Reference} [props.reasonReference] - Reason the encounter takes place (reference)
  * @param {BackboneElement} [props.diagnosis] - The list of diagnosis relevant to this encounter
  * @param {Reference} [props.account] - The set of accounts that may be used for billing for this Encounter
  * @param {BackboneElement} [props.hospitalization] - Details about the admission to a healthcare service
  * @param {BackboneElement} [props.location] - Encounter location
  * @param {Reference} [props.serviceProvider] - Health facility responsible for the encounter
  * @param {Reference} [props.partOf] - Another Encounter this encounter is part of
  */
declare function encounter(type: "SzEncounter", props: Encounter_SzEncounter_Props): any;
declare function encounter(props: Encounter_SzEncounter_Props): any;

export { addExtension, c, cc, coding, composite, concept, encounter, ext, extendSystemMap, extendValues, extension, findExtension, id, identifier, lookupValue, mapSystems, mapValues, ref, reference, setSystemMap, setValues, value };

