
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import { builders } from '@openfn/language-fhir-4';

declare type Appointment_SzAppointment_Props = {
    appointmentType?: builders.CodeableConcept;
    basedOn?: builders.Reference[];
    cancelationReason?: builders.CodeableConcept;
    comment?: string;
    contained?: any[];
    created?: string;
    description?: string;
    end?: string;
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: builders.Meta;
    minutesDuration?: number;
    modifierExtension?: builders.Extension[];
    participant?: builders.BackboneElement[];
    patientInstruction?: string;
    priority?: number;
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    requestedPeriod?: builders.Period[];
    serviceCategory?: builders.CodeableConcept[];
    serviceType?: builders.CodeableConcept[];
    slot?: builders.Reference[];
    specialty?: builders.CodeableConcept[];
    start?: string;
    status?: string;
    supportingInformation?: builders.Reference[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Condition_SzCondition_Props = {
    abatement?: string | builders.Age | builders.Period | builders.Range;
    asserter?: builders.Reference;
    bodySite?: builders.CodeableConcept[];
    category?: builders.CodeableConcept[];
    clinicalStatus?: builders.CodeableConcept;
    code?: builders.CodeableConcept;
    contained?: any[];
    encounter?: builders.Reference;
    evidence?: builders.BackboneElement[];
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    onset?: string;
    recordedDate?: string;
    recorder?: builders.Reference;
    severity?: builders.CodeableConcept;
    stage?: builders.BackboneElement[];
    subject?: builders.Reference;
    text?: builders.Narrative;
    verificationStatus?: builders.CodeableConcept;
    [key: string]: any;
};

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

declare type EpisodeOfCare_SzEpisodeOfCare_Props = {
    account?: builders.Reference[];
    careManager?: builders.Reference;
    contained?: any[];
    diagnosis?: builders.BackboneElement[];
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    managingOrganization?: builders.Reference;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    patient?: builders.Reference;
    period?: builders.Period;
    referralRequest?: builders.Reference[];
    status?: string;
    statusHistory?: builders.BackboneElement[];
    team?: builders.Reference[];
    text?: builders.Narrative;
    type?: builders.CodeableConcept[];
    [key: string]: any;
};

declare type Extension_SzAuthorizerExtension_Props = {
    extension?: builders.Extension[];
    id?: string;
    url?: string;
    value?: builders.Reference;
    [key: string]: any;
};

declare type Extension_SzChiefdomExtension_Props = {
    extension?: builders.Extension[];
    id?: string;
    url?: string;
    value?: builders.CodeableConcept;
    [key: string]: any;
};

declare type Extension_SzInkhundlaExtension_Props = {
    extension?: builders.Extension[];
    id?: string;
    url?: string;
    value?: builders.CodeableConcept;
    [key: string]: any;
};

declare type Extension_SzLocationCodeExtension_Props = {
    extension?: builders.Extension[];
    id?: string;
    url?: string;
    value?: string;
    [key: string]: any;
};

declare type Extension_SzReferralRecipientExtension_Props = {
    extension?: builders.Extension[];
    id?: string;
    url?: string;
    value?: builders.Reference;
    [key: string]: any;
};

declare type Extension_SzRegistrationDate_Props = {
    extension?: builders.Extension[];
    id?: string;
    url?: string;
    value?: string;
    [key: string]: any;
};

declare type Extension_SzTestingLabExtension_Props = {
    extension?: builders.Extension[];
    id?: string;
    url?: string;
    value?: builders.Reference;
    [key: string]: any;
};

declare type Location_SzLocation_Props = {
    address?: builders.Address;
    alias?: string[];
    availabilityExceptions?: string;
    contained?: any[];
    description?: string;
    endpoint?: builders.Reference[];
    extension?: builders.Extension[];
    hoursOfOperation?: builders.BackboneElement[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    managingOrganization?: builders.Reference;
    meta?: builders.Meta;
    mode?: string;
    modifierExtension?: builders.Extension[];
    name?: string;
    operationalStatus?: builders.Coding;
    partOf?: builders.Reference;
    physicalType?: builders.CodeableConcept;
    position?: builders.BackboneElement;
    status?: string;
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    type?: builders.CodeableConcept[];
    [key: string]: any;
};

declare type Medication_SzMedication_Props = {
    amount?: builders.Ratio;
    batch?: builders.BackboneElement;
    code?: builders.CodeableConcept;
    contained?: any[];
    extension?: builders.Extension[];
    form?: builders.CodeableConcept;
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    ingredient?: builders.BackboneElement[];
    language?: string;
    manufacturer?: builders.Reference;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    status?: string;
    text?: builders.Narrative;
    [key: string]: any;
};

declare type MedicationDispense_SzMedicationDispense_Props = {
    authorizingPrescription?: builders.Reference[];
    category?: builders.CodeableConcept;
    contained?: any[];
    context?: builders.Reference;
    daysSupply?: builders.Quantity;
    destination?: builders.Reference;
    detectedIssue?: builders.Reference[];
    dosageInstruction?: builders.Dosage[];
    eventHistory?: builders.Reference[];
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    location?: builders.Reference;
    medication?: builders.CodeableConcept;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.BackboneElement[];
    quantity?: builders.Quantity;
    receiver?: builders.Reference[];
    status?: string;
    statusReason?: builders.CodeableConcept | builders.Reference;
    subject?: builders.Reference;
    substitution?: builders.BackboneElement;
    supportingInformation?: builders.Reference[];
    text?: builders.Narrative;
    type?: builders.CodeableConcept;
    whenHandedOver?: string;
    whenPrepared?: string;
    [key: string]: any;
};

declare type MedicationRequest_SzMedicationRequest_Props = {
    authoredOn?: string;
    basedOn?: builders.Reference[];
    category?: builders.CodeableConcept[];
    contained?: any[];
    courseOfTherapyType?: builders.CodeableConcept;
    detectedIssue?: builders.Reference[];
    dispenseRequest?: builders.BackboneElement;
    doNotPerform?: boolean;
    dosageInstruction?: builders.Dosage[];
    encounter?: builders.Reference;
    eventHistory?: builders.Reference[];
    extension?: builders.Extension[];
    groupIdentifier?: builders.Identifier;
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: builders.Reference[];
    intent?: string;
    language?: string;
    medication?: builders.CodeableConcept;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    performer?: builders.Reference;
    performerType?: builders.CodeableConcept;
    priorPrescription?: builders.Reference;
    priority?: string;
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    recorder?: builders.Reference;
    reported?: boolean | builders.Reference;
    requester?: builders.Reference;
    status?: string;
    statusReason?: builders.CodeableConcept;
    subject?: builders.Reference;
    substitution?: builders.BackboneElement;
    supportingInformation?: builders.Reference[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Observation_SzCauseOfDeath_Props = {
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept;
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    component?: builders.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: builders.CodeableConcept;
    derivedFrom?: builders.Reference[];
    device?: builders.Reference;
    effective?: string | builders.Period | builders.Timing;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focus?: builders.Reference[];
    hasMember?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    interpretation?: builders.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: builders.Meta;
    method?: builders.CodeableConcept;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.Reference[];
    referenceRange?: builders.BackboneElement[];
    specimen?: builders.Reference;
    status?: string;
    subject?: builders.Reference;
    text?: builders.Narrative;
    value?: builders.CodeableConcept;
    [key: string]: any;
};

declare type Observation_SzClinicalObservation_Props = {
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept;
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    component?: builders.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: builders.CodeableConcept;
    derivedFrom?: builders.Reference[];
    device?: builders.Reference;
    effective?: string | builders.Period | builders.Timing;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focus?: builders.Reference[];
    hasMember?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    interpretation?: builders.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: builders.Meta;
    method?: builders.CodeableConcept;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.Reference[];
    referenceRange?: builders.BackboneElement[];
    specimen?: builders.Reference;
    status?: string;
    subject?: builders.Reference;
    text?: builders.Narrative;
    value?: builders.Quantity | builders.CodeableConcept | string | boolean | number | builders.Range | builders.Ratio | builders.SampledData | builders.Period;
    [key: string]: any;
};

declare type Observation_SzLabResult_Props = {
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept;
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    component?: builders.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: builders.CodeableConcept;
    derivedFrom?: builders.Reference[];
    device?: builders.Reference;
    effective?: string | builders.Period | builders.Timing;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focus?: builders.Reference[];
    hasMember?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    interpretation?: builders.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: builders.Meta;
    method?: builders.CodeableConcept;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.Reference[];
    referenceRange?: builders.BackboneElement[];
    specimen?: builders.Reference;
    status?: string;
    subject?: builders.Reference;
    text?: builders.Narrative;
    value?: builders.Quantity | builders.CodeableConcept | string | boolean | number | builders.Range | builders.Ratio | builders.SampledData | builders.Period;
    [key: string]: any;
};

declare type Observation_SzMannerOfDeath_Props = {
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept;
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    component?: builders.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: builders.CodeableConcept;
    derivedFrom?: builders.Reference[];
    device?: builders.Reference;
    effective?: string | builders.Period | builders.Timing;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focus?: builders.Reference[];
    hasMember?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    interpretation?: builders.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: builders.Meta;
    method?: builders.CodeableConcept;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.Reference[];
    referenceRange?: builders.BackboneElement[];
    specimen?: builders.Reference;
    status?: string;
    subject?: builders.Reference;
    text?: builders.Narrative;
    value?: string;
    [key: string]: any;
};

declare type Observation_SzVitalSigns_Props = {
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept;
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    component?: builders.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: builders.CodeableConcept;
    derivedFrom?: builders.Reference[];
    device?: builders.Reference;
    effective?: string | builders.Period;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focus?: builders.Reference[];
    hasMember?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    interpretation?: builders.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: builders.Meta;
    method?: builders.CodeableConcept;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.Reference[];
    referenceRange?: builders.BackboneElement[];
    specimen?: builders.Reference;
    status?: string;
    subject?: builders.Reference;
    text?: builders.Narrative;
    value?: builders.Quantity;
    [key: string]: any;
};

declare type Organization_SzOrganization_Props = {
    active?: boolean;
    address?: builders.Address[];
    alias?: string[];
    contact?: builders.BackboneElement[];
    contained?: any[];
    endpoint?: builders.Reference[];
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    name?: string;
    partOf?: builders.Reference;
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    type?: builders.CodeableConcept[];
    [key: string]: any;
};

declare type Patient_SzPatient_Props = {
    active?: boolean;
    address?: builders.Address[];
    birthDate?: string;
    communication?: builders.BackboneElement[];
    contact?: builders.BackboneElement[];
    contained?: any[];
    deceased?: boolean | string;
    extension?: builders.Extension[];
    gender?: string;
    generalPractitioner?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    link?: builders.BackboneElement[];
    managingOrganization?: builders.Reference;
    maritalStatus?: builders.CodeableConcept;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    multipleBirth?: boolean | number;
    name?: builders.HumanName[];
    photo?: builders.Attachment[];
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Practitioner_SzPractitioner_Props = {
    active?: boolean;
    address?: builders.Address[];
    birthDate?: string;
    communication?: builders.CodeableConcept[];
    contained?: any[];
    extension?: builders.Extension[];
    gender?: string;
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    name?: builders.HumanName[];
    photo?: builders.Attachment[];
    qualification?: builders.BackboneElement[];
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Procedure_SzProcedure_Props = {
    asserter?: builders.Reference;
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept[];
    category?: builders.CodeableConcept;
    code?: builders.CodeableConcept;
    complication?: builders.CodeableConcept[];
    complicationDetail?: builders.Reference[];
    contained?: any[];
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focalDevice?: builders.BackboneElement[];
    followUp?: builders.CodeableConcept[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    language?: string;
    location?: builders.Reference;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    outcome?: builders.CodeableConcept;
    partOf?: builders.Reference[];
    performed?: string | builders.Period | builders.Age | builders.Range;
    performer?: builders.BackboneElement[];
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    recorder?: builders.Reference;
    report?: builders.Reference[];
    status?: string;
    statusReason?: builders.CodeableConcept;
    subject?: builders.Reference;
    text?: builders.Narrative;
    usedCode?: builders.CodeableConcept[];
    usedReference?: builders.Reference[];
    [key: string]: any;
};

declare type ServiceRequest_SzLabRequest_Props = {
    asNeeded?: boolean | builders.CodeableConcept;
    authoredOn?: string;
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept[];
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    contained?: any[];
    doNotPerform?: boolean;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: builders.Reference[];
    intent?: string;
    language?: string;
    locationCode?: builders.CodeableConcept[];
    locationReference?: builders.Reference[];
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    occurrence?: string | builders.Period | builders.Timing;
    orderDetail?: builders.CodeableConcept[];
    patientInstruction?: string;
    performer?: builders.Reference[];
    performerType?: builders.CodeableConcept;
    priority?: string;
    quantity?: builders.Quantity | builders.Ratio | builders.Range;
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    relevantHistory?: builders.Reference[];
    replaces?: builders.Reference[];
    requester?: builders.Reference;
    requisition?: builders.Identifier;
    specimen?: builders.Reference[];
    status?: string;
    subject?: builders.Reference;
    supportingInfo?: builders.Reference[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type ServiceRequest_SzReferral_Props = {
    asNeeded?: boolean | builders.CodeableConcept;
    authoredOn?: string;
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept[];
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    contained?: any[];
    doNotPerform?: boolean;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: builders.Reference[];
    intent?: string;
    language?: string;
    locationCode?: builders.CodeableConcept[];
    locationReference?: builders.Reference[];
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    occurrence?: string | builders.Period | builders.Timing;
    orderDetail?: builders.CodeableConcept[];
    patientInstruction?: string;
    performer?: builders.Reference[];
    performerType?: builders.CodeableConcept;
    priority?: string;
    quantity?: builders.Quantity | builders.Ratio | builders.Range;
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    relevantHistory?: builders.Reference[];
    replaces?: builders.Reference[];
    requester?: builders.Reference;
    requisition?: builders.Identifier;
    specimen?: builders.Reference[];
    status?: string;
    subject?: builders.Reference;
    supportingInfo?: builders.Reference[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Specimen_SzLabSpecimen_Props = {
    accessionIdentifier?: builders.Identifier;
    collection?: builders.BackboneElement;
    condition?: builders.CodeableConcept[];
    contained?: any[];
    container?: builders.BackboneElement[];
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    parent?: builders.Reference[];
    processing?: builders.BackboneElement[];
    receivedTime?: string;
    request?: builders.Reference[];
    status?: string;
    subject?: builders.Reference;
    text?: builders.Narrative;
    type?: builders.CodeableConcept;
    [key: string]: any;
};

declare const mapSystems: (obj: any) => any;
/**
 * Define a set of mapped system values.
 *
 * Builder functions will use this mappings when they encounter them in system keys. Useful for setting shortcuts.
 * @public
 * @function
 * @example <caption>Set shortcut system mappings</caption>
 * b.setSystemMap({
 *   SmartCareID: 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'
 * });
 * create(builders.patient({ identifier: b.identifier('xyz', 'SmartCareId') }))
 */
declare const setSystemMap: (newMappings: any) => (state: any) => any;
declare const extendSystemMap: (newMappings: any) => void;
/**
 * Create an Identifier. Systems will be mapped against the system map. Pass extensions as extra arguments.
 * @public
 * @function
 * @param id - A string identifier, a FHIR identifier object, or an array of either.
 * @param ext - Any other arguments will be treated as extensions
 * @param {string} [system] - the string system to use by default if
 */
declare const identifier: (id: string | builders.Identifier, ...ext: any[]) => any;
/**
 * Alias for b.identifier()
 * @public
 * @function
 */
declare const id: (id: string | builders.Identifier, ...ext: any[]) => any;
/**
 * Add an extension to a resource (or object).
 * An object will be created and added to an `extension` array on the provided resource.
 * The extension array will be set if it does not exist on the resource.
 * The value will be smartly written to the object, ie, valueDateTime or valueReference or valueString
 * @public
 * @function
 * @param resource - a FHIR resource object to add an extension too
 * @param {string} url - the URL to set for the extension
 * @param value - the value that the extension should contain
 */
declare const addExtension: (resource: any, url: any, value: any) => void;
/**
 * Alias for b.extension()
 * @public
 * @function
 */
declare const ext: (url: string, value: any, props?: Omit<builders.Extension, 'url'>) => {
    extension: ({
        url: string;
    } & Omit<builders.Extension, "url">)[];
};
/**
 * Find an extension with a given url in some array
 * @public
 * @function
 * @param obj - a fhir resource
 * @param {string} targetUrl - the extension URL you want to find
 * @param {string} [path] - a path to extract from the resource. Optional.
 */
declare const findExtension: (obj: any, targetUrl: any, path: any) => any;
/**
 * Create a coding object { code, system }. Systems will be mapped using the system map.
 * @public
 * @function
 * @param {string} code - the code value
 * @param {string} system - URL to the system. Will be mapped using the system map.
 */
declare const coding: (code: string, system: string, extra?: Omit<builders.Coding, 'code' | 'system'>) => any;
declare const c: (code: string, system: string, extra?: Omit<builders.Coding, 'code' | 'system'>) => any;
/**
 * Create a value object { code, system } with optional system. Systems will be mapped.
 * @function
 * @param {string} value - the value
 * @param {string} system - URL to the system. Well be mapped using the system map.
 */
declare const value: (value: any, system: any, ...extra: any[]) => any;
/**
 * Create a CodeableConcept. Codings can be coding objects or
 * [code, system, extra] tuples (such as passed to b.coding())
 * Systems will be mapped with the system map
 * @public
 * @function
 * @param {string} value - the value
 * @param {object} extra - Extra properties to write to the coding
 * @example <caption>Create a codeableConcept</caption>
 * const myConcept = util.concept(['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 * @example <caption>Create a codeableConcept with text</caption>
 * const myConcept = util.concept('smart care id', ['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 */
declare type ConceptCoding = builders.Coding | [string, string, Omit<builders.Coding, 'code' | 'system'>?];
declare const concept: (codings: ConceptCoding | ConceptCoding[], extra?: Omit<builders.CodeableConcept, 'coding'>) => builders.CodeableConcept;
/**
 * Alias for b.concept()
 * @public
 * @function
 */
declare const cc: (codings: ConceptCoding | ConceptCoding[], extra?: Omit<builders.CodeableConcept, 'coding'>) => builders.CodeableConcept;
/**
 * Create a reference object of the form { reference }
 * If ref is an array, each item will be mapped and an array returned.
 * If ref is a FHIR resource, a reference to it will be generated
 * If ref is a string, it'll be treated as a reference id and returned as an object
 * If ref is a valid FHIR reference, it'll just be returned.
 * @public
 * @function
 * @param ref - the thing to generate a reference from
 */
declare const reference: (ref: any, opts?: {}) => any;
/**
 * Alias for b.reference()
 * @public
 * @function
 */
declare const ref: (ref: any, opts?: {}) => any;
/**
 * Write a value to the target object using a typed key
 * Ie, if key is `value` and the value is a date time string,
 * this function will write `valueDateTime` to the object.
 *
 * This function is poorly named.
 * @public
 * @function
 * @param object - the object to write the composite key to
 * @param {string} key - the base key to use to write the value
 * @param value - some value to write to the object
 */
declare const composite: (object: any, key: any, value: any) => void;

/**
  * Create a Appointment resource.
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
  * @param {Identifier} [props.identifier] - External Ids for this item
  * @param {string} [props.status] - proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error | checked-in | waitlist
  * @param {CodeableConcept} [props.cancelationReason] - The coded reason for the appointment being cancelled
  * @param {CodeableConcept} [props.serviceCategory] - A broad categorization of the service that is to be performed during this appointment
  * @param {CodeableConcept} [props.serviceType] - The specific service that is to be performed during this appointment
  * @param {CodeableConcept} [props.specialty] - The specialty of a practitioner that would be required to perform the service requested in this appointment
  * @param {CodeableConcept} [props.appointmentType] - The style of appointment or patient that has been booked in the slot (not service type)
  * @param {CodeableConcept} [props.reasonCode] - Coded reason this appointment is scheduled
  * @param {Reference} [props.reasonReference] - Reason the appointment is to take place (resource)
  * @param {unsignedInt} [props.priority] - Used to make informed decisions if needing to re-prioritize
  * @param {string} [props.description] - Shown on a subject line in a meeting request, or appointment list
  * @param {Reference} [props.supportingInformation] - Additional information to support the appointment
  * @param {instant} [props.start] - When appointment is to take place
  * @param {instant} [props.end] - When appointment is to conclude
  * @param {number} [props.minutesDuration] - Can be less than start/end (e.g. estimate)
  * @param {Reference} [props.slot] - The slots that this appointment is filling
  * @param {dateTime} [props.created] - The date that this appointment was initially created
  * @param {string} [props.comment] - Additional comments
  * @param {string} [props.patientInstruction] - Detailed information and instructions for the patient
  * @param {Reference} [props.basedOn] - The service request this appointment is allocated to assess
  * @param {BackboneElement} [props.participant] - Participants involved in appointment
  * @param {Period} [props.requestedPeriod] - Potential date/time interval(s) requested to allocate the appointment within
  */
declare function appointment(type: "SzAppointment", props: Appointment_SzAppointment_Props): any;
/**
  * Create a Condition resource.
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
  * @param {Identifier} [props.identifier] - External Ids for this condition
  * @param {CodeableConcept} [props.clinicalStatus] - active | recurrence | relapse | inactive | remission | resolved
  * @param {CodeableConcept} [props.verificationStatus] - unconfirmed | provisional | differential | confirmed | refuted | entered-in-error
  * @param {CodeableConcept} [props.category] - problem-list-item | encounter-diagnosis
  * @param {CodeableConcept} [props.severity] - Subjective severity of condition
  * @param {CodeableConcept} [props.code] - Condition Identification
  * @param {CodeableConcept} [props.bodySite] - Anatomical location, if relevant
  * @param {Reference} [props.subject] - Who has the condition?
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {dateTime} [props.onset] - Diagnosis date
  * @param {dateTime|Age|Period|Range|string} [props.abatement] - When in resolution/remission
  * @param {dateTime} [props.recordedDate] - Date record was first recorded
  * @param {Reference} [props.recorder] - Who recorded the condition
  * @param {Reference} [props.asserter] - Person who asserts this condition
  * @param {BackboneElement} [props.stage] - Stage/grade, usually assessed formally
  * @param {BackboneElement} [props.evidence] - Supporting evidence
  * @param {Annotation} [props.note] - Additional information about the Condition
  */
declare function condition(type: "SzCondition", props: Condition_SzCondition_Props): any;
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
  * @param {Coding} [props.class] - Department in which the encounter took place
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
/**
  * Create a EpisodeOfCare resource.
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
  * @param {Identifier} [props.identifier] - Business Identifier(s) relevant for this EpisodeOfCare
  * @param {string} [props.status] - planned | waitlist | active | onhold | finished | cancelled | entered-in-error
  * @param {BackboneElement} [props.statusHistory] - Past list of status codes (the current status may be included to cover the start date of the status)
  * @param {CodeableConcept} [props.type] - Episode of care classification
  * @param {BackboneElement} [props.diagnosis] - The list of diagnosis relevant to this episode of care
  * @param {Reference} [props.patient] - The patient who is the focus of this episode of care
  * @param {Reference} [props.managingOrganization] - Organization that assumes care
  * @param {Period} [props.period] - Start and end datest of the Episode of care
  * @param {Reference} [props.referralRequest] - Originating Referral Request(s)
  * @param {Reference} [props.careManager] - Care manager/care coordinator for the patient
  * @param {Reference} [props.team] - Other practitioners facilitating this episode of care
  * @param {Reference} [props.account] - The set of accounts that may be used for billing for this EpisodeOfCare
  */
declare function episodeOfCare(type: "SzEpisodeOfCare", props: EpisodeOfCare_SzEpisodeOfCare_Props): any;
/**
  * Create a Extension resource.
  * @public
  * @function
  * @param {string} type - A profile type: one of SzAuthorizerExtension,SzChiefdomExtension,SzInkhundlaExtension,SzLocationCodeExtension,SzReferralRecipientExtension,SzRegistrationDate,SzTestingLabExtension
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Unique id for inter-element referencing
  * @param {Extension} [props.extension] - Extension
  * @param {string} [props.url] - identifies the meaning of the extension
  * @param {Reference} [props.value] - Value of extension
  */
declare function extension(type: "SzAuthorizerExtension", props: Extension_SzAuthorizerExtension_Props): any;
declare function extension(type: "SzChiefdomExtension", props: Extension_SzChiefdomExtension_Props): any;
declare function extension(type: "SzInkhundlaExtension", props: Extension_SzInkhundlaExtension_Props): any;
declare function extension(type: "SzLocationCodeExtension", props: Extension_SzLocationCodeExtension_Props): any;
declare function extension(type: "SzReferralRecipientExtension", props: Extension_SzReferralRecipientExtension_Props): any;
declare function extension(type: "SzRegistrationDate", props: Extension_SzRegistrationDate_Props): any;
declare function extension(type: "SzTestingLabExtension", props: Extension_SzTestingLabExtension_Props): any;
/**
  * Create a Location resource.
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
  * @param {Identifier} [props.identifier] - Unique code or number identifying the location to its users
  * @param {string} [props.status] - active | suspended | inactive
  * @param {Coding} [props.operationalStatus] - The operational status of the location (typically only for a bed/room)
  * @param {string} [props.name] - Location Name
  * @param {string} [props.alias] - A list of alternate names that the location is known as, or was known as, in the past
  * @param {string} [props.description] - Additional details about the location that could be displayed as further information to identify the location beyond its name
  * @param {string} [props.mode] - instance | kind
  * @param {CodeableConcept} [props.type] - Location Type
  * @param {ContactPoint} [props.telecom] - Contact details of the location
  * @param {Address} [props.address] - Physical location
  * @param {CodeableConcept} [props.physicalType] - Physical form of the location
  * @param {BackboneElement} [props.position] - The absolute geographic location
  * @param {Reference} [props.managingOrganization] - Organization responsible for provisioning and upkeep
  * @param {Reference} [props.partOf] - Another Location this one is physically a part of
  * @param {BackboneElement} [props.hoursOfOperation] - What days/times during a week is this location usually open
  * @param {string} [props.availabilityExceptions] - Description of availability exceptions
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the location
  */
declare function location(type: "SzLocation", props: Location_SzLocation_Props): any;
/**
  * Create a Medication resource.
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
  * @param {Identifier} [props.identifier] - Business identifier for this medication
  * @param {CodeableConcept} [props.code] - ELMIS Product Code
  * @param {string} [props.status] - active | inactive | entered-in-error
  * @param {Reference} [props.manufacturer] - Manufacturer of the item
  * @param {CodeableConcept} [props.form] - powder | tablets | capsule +
  * @param {Ratio} [props.amount] - Amount of drug in package
  * @param {BackboneElement} [props.ingredient] - Active or inactive ingredient
  * @param {BackboneElement} [props.batch] - Details about packaged medications
  */
declare function medication(type: "SzMedication", props: Medication_SzMedication_Props): any;
/**
  * Create a MedicationDispense resource.
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
  * @param {Identifier} [props.identifier] - External identifier
  * @param {Reference} [props.partOf] - Event that dispense is part of
  * @param {string} [props.status] - preparation | in-progress | cancelled | on-hold | completed | entered-in-error | stopped | declined | unknown
  * @param {CodeableConcept|Reference} [props.statusReason] - Why a dispense was not performed
  * @param {CodeableConcept} [props.category] - Type of medication dispense
  * @param {CodeableConcept} [props.medication] - Supplied Medication
  * @param {Reference} [props.subject] - Who the dispense is for
  * @param {Reference} [props.context] - Encounter / Episode associated with event
  * @param {Reference} [props.supportingInformation] - Information that supports the dispensing of the medication
  * @param {BackboneElement} [props.performer] - Dispensing Practitioner
  * @param {Reference} [props.location] - Where the dispense occurred
  * @param {Reference} [props.authorizingPrescription] - Medication order that authorizes the dispense
  * @param {CodeableConcept} [props.type] - Trial fill, partial fill, emergency fill, etc.
  * @param {Quantity} [props.quantity] - Amount dispensed
  * @param {Quantity} [props.daysSupply] - Amount of medication expressed as a timing amount
  * @param {dateTime} [props.whenPrepared] - When product was packaged and reviewed
  * @param {dateTime} [props.whenHandedOver] - When product was given out
  * @param {Reference} [props.destination] - Where the medication was sent
  * @param {Reference} [props.receiver] - Who collected the medication
  * @param {Annotation} [props.note] - Information about the dispense
  * @param {Dosage} [props.dosageInstruction] - How the medication is to be used by the patient or administered by the caregiver
  * @param {BackboneElement} [props.substitution] - Whether a substitution was performed on the dispense
  * @param {Reference} [props.detectedIssue] - Clinical issue with action
  * @param {Reference} [props.eventHistory] - A list of relevant lifecycle events
  */
declare function medicationDispense(type: "SzMedicationDispense", props: MedicationDispense_SzMedicationDispense_Props): any;
/**
  * Create a MedicationRequest resource.
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
  * @param {Identifier} [props.identifier] - External ids for this request
  * @param {string} [props.status] - active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  * @param {string} [props.intent] - proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
  * @param {CodeableConcept} [props.category] - Type of medication usage
  * @param {string} [props.priority] - routine | urgent | asap | stat
  * @param {boolean} [props.doNotPerform] - True if request is prohibiting action
  * @param {boolean|Reference} [props.reported] - Reported rather than primary record
  * @param {CodeableConcept} [props.medication] - Medication to be taken
  * @param {Reference} [props.subject] - Who or group medication request is for
  * @param {Reference} [props.encounter] - Encounter created as part of encounter/admission/stay
  * @param {Reference} [props.supportingInformation] - Information to support ordering of the medication
  * @param {dateTime} [props.authoredOn] - Medication Request Date
  * @param {Reference} [props.requester] - Who/What requested the Request
  * @param {Reference} [props.performer] - Intended performer of administration
  * @param {CodeableConcept} [props.performerType] - Desired kind of performer of the medication administration
  * @param {Reference} [props.recorder] - Person who entered the request
  * @param {CodeableConcept} [props.reasonCode] - Reason or indication for ordering or not ordering the medication
  * @param {Reference} [props.reasonReference] - Condition or observation that supports why the prescription is being written
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {Identifier} [props.groupIdentifier] - Composite request this is part of
  * @param {CodeableConcept} [props.courseOfTherapyType] - Overall pattern of medication administration
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {Annotation} [props.note] - Information about the prescription
  * @param {Dosage} [props.dosageInstruction] - Dosage Instruction
  * @param {BackboneElement} [props.dispenseRequest] - Medication supply authorization
  * @param {BackboneElement} [props.substitution] - Any restrictions on medication substitution
  * @param {Reference} [props.priorPrescription] - An order/prescription that is being replaced
  * @param {Reference} [props.detectedIssue] - Clinical Issue with action
  * @param {Reference} [props.eventHistory] - A list of events of interest in the lifecycle
  */
declare function medicationRequest(type: "SzMedicationRequest", props: MedicationRequest_SzMedicationRequest_Props): any;
/**
  * Create a Observation resource.
  * @public
  * @function
  * @param {string} type - A profile type: one of SzCauseOfDeath,SzClinicalObservation,SzLabResult,SzMannerOfDeath,SzVitalSigns
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Business Identifier for observation
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal or order
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.status] - registered | preliminary | final | amended +
  * @param {CodeableConcept} [props.category] - Classification of  type of observation
  * @param {CodeableConcept} [props.code] - Cause of death
  * @param {Reference} [props.subject] - The decedent
  * @param {Reference} [props.focus] - What the observation is about, when it is not about the subject of record
  * @param {Reference} [props.encounter] - Healthcare event during which this observation is made
  * @param {dateTime|Period|Timing|instant} [props.effective] - Clinically relevant time/time-period for observation
  * @param {instant} [props.issued] - Date/Time this version was made available
  * @param {Reference} [props.performer] - Cause of death certifier (coroner or medical examiner)
  * @param {CodeableConcept} [props.value] - Actual result
  * @param {CodeableConcept} [props.dataAbsentReason] - Why the result is missing
  * @param {CodeableConcept} [props.interpretation] - High, low, normal, etc.
  * @param {Annotation} [props.note] - Comments about the observation
  * @param {CodeableConcept} [props.bodySite] - Observed body part
  * @param {CodeableConcept} [props.method] - How it was done
  * @param {Reference} [props.specimen] - Specimen used for this observation
  * @param {Reference} [props.device] - (Measurement) Device
  * @param {BackboneElement} [props.referenceRange] - Provides guide for interpretation
  * @param {Reference} [props.hasMember] - Related resource that belongs to the Observation group
  * @param {Reference} [props.derivedFrom] - Related measurements the observation is made from
  * @param {BackboneElement} [props.component] - Cause of death time interval for Intermediate, Intermediate I, Intermediat II, Underlying
  */
declare function observation(type: "SzCauseOfDeath", props: Observation_SzCauseOfDeath_Props): any;
declare function observation(type: "SzClinicalObservation", props: Observation_SzClinicalObservation_Props): any;
declare function observation(type: "SzLabResult", props: Observation_SzLabResult_Props): any;
declare function observation(type: "SzMannerOfDeath", props: Observation_SzMannerOfDeath_Props): any;
declare function observation(type: "SzVitalSigns", props: Observation_SzVitalSigns_Props): any;
/**
  * Create a Organization resource.
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
  * @param {Identifier} [props.identifier] - Identifies this organization  across multiple systems
  * @param {boolean} [props.active] - Whether the organization's record is still in active use
  * @param {CodeableConcept} [props.type] - Organization Type
  * @param {string} [props.name] - Organization' name
  * @param {string} [props.alias] - A list of alternate names that the organization is known as, or was known as in the past
  * @param {ContactPoint} [props.telecom] - A contact detail for the organization
  * @param {Address} [props.address] - An address for the organization
  * @param {Reference} [props.partOf] - The organization of which this organization forms a part
  * @param {BackboneElement} [props.contact] - Contact for the organization for a certain purpose
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the organization
  */
declare function organization(type: "SzOrganization", props: Organization_SzOrganization_Props): any;
/**
  * Create a Patient resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Date the patient was registered
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Patient's Identification Number
  * @param {boolean} [props.active] - Whether this patient's record is in active use
  * @param {HumanName} [props.name] - Patient's name
  * @param {ContactPoint} [props.telecom] - A contact detail for the individual
  * @param {string} [props.gender] - Sex at birth: male | female | other | unknown
  * @param {date} [props.birthDate] - Date of birth: YYYY-MM-DD
  * @param {boolean|dateTime} [props.deceased] - Indicates if the individual is deceased or not
  * @param {Address} [props.address] - An address for the individual
  * @param {CodeableConcept} [props.maritalStatus] - Marital (civil) status of a patient
  * @param {boolean|integer} [props.multipleBirth] - Whether patient is part of a multiple birth
  * @param {Attachment} [props.photo] - Image of the patient
  * @param {BackboneElement} [props.contact] - A contact party (e.g. guardian, partner, friend) for the patient
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with the patient about his or her health
  * @param {Reference} [props.generalPractitioner] - Patient's nominated primary care provider
  * @param {Reference} [props.managingOrganization] - Organization that is the custodian of the patient record
  * @param {BackboneElement} [props.link] - Link to another patient resource that concerns the same actual person
  */
declare function patient(type: "SzPatient", props: Patient_SzPatient_Props): any;
/**
  * Create a Practitioner resource.
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
  * @param {Identifier} [props.identifier] - An identifier for the person as this agent
  * @param {boolean} [props.active] - Whether this practitioner's record is in active use
  * @param {HumanName} [props.name] - Practitioner's name
  * @param {ContactPoint} [props.telecom] - A contact detail for the practitioner (that apply to all roles)
  * @param {Address} [props.address] - Address(es) of the practitioner that are not role specific (typically home address)
  * @param {string} [props.gender] - Sex at birth: male | female | other | unknown
  * @param {date} [props.birthDate] - The date  on which the practitioner was born
  * @param {Attachment} [props.photo] - Image of the person
  * @param {BackboneElement} [props.qualification] - Certification, licenses, or training pertaining to the provision of care
  * @param {CodeableConcept} [props.communication] - A language the practitioner can use in patient communication
  */
declare function practitioner(type: "SzPractitioner", props: Practitioner_SzPractitioner_Props): any;
/**
  * Create a Procedure resource.
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
  * @param {Identifier} [props.identifier] - External Identifiers for this procedure
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - A request for this procedure
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.status] - preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown
  * @param {CodeableConcept} [props.statusReason] - Reason for current status
  * @param {CodeableConcept} [props.category] - Classification of the procedure
  * @param {CodeableConcept} [props.code] - Procedure Code
  * @param {Reference} [props.subject] - Who the procedure was performed on
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {dateTime|Period|string|Age|Range} [props.performed] - When the procedure was performed
  * @param {Reference} [props.recorder] - Who recorded the procedure
  * @param {Reference} [props.asserter] - Person who asserts this procedure
  * @param {BackboneElement} [props.performer] - The people who performed the procedure
  * @param {Reference} [props.location] - Where the procedure happened
  * @param {CodeableConcept} [props.reasonCode] - Coded reason procedure performed
  * @param {Reference} [props.reasonReference] - The justification that the procedure was performed
  * @param {CodeableConcept} [props.bodySite] - Target body sites
  * @param {CodeableConcept} [props.outcome] - The result of procedure
  * @param {Reference} [props.report] - Any report resulting from the procedure
  * @param {CodeableConcept} [props.complication] - Complication following the procedure
  * @param {Reference} [props.complicationDetail] - A condition that is a result of the procedure
  * @param {CodeableConcept} [props.followUp] - Instructions for follow up
  * @param {Annotation} [props.note] - Additional information about the procedure
  * @param {BackboneElement} [props.focalDevice] - Manipulated, implanted, or removed device
  * @param {Reference} [props.usedReference] - Items used during procedure
  * @param {CodeableConcept} [props.usedCode] - Coded items used during the procedure
  */
declare function procedure(type: "SzProcedure", props: Procedure_SzProcedure_Props): any;
/**
  * Create a ServiceRequest resource.
  * @public
  * @function
  * @param {string} type - A profile type: one of SzLabRequest,SzReferral
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Identifiers assigned to this order
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {Reference} [props.replaces] - What request replaces
  * @param {Identifier} [props.requisition] - Composite Request ID
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
  * @param {CodeableConcept} [props.category] - Type of service request
  * @param {string} [props.priority] - routine | urgent | asap | stat
  * @param {boolean} [props.doNotPerform] - True if service/procedure should not be performed
  * @param {CodeableConcept} [props.code] - Local test code
  * @param {CodeableConcept} [props.orderDetail] - Additional order information
  * @param {Quantity|Ratio|Range} [props.quantity] - Service amount
  * @param {Reference} [props.subject] - Patient's information
  * @param {Reference} [props.encounter] - Encounter information
  * @param {dateTime|Period|Timing} [props.occurrence] - When service should occur
  * @param {boolean|CodeableConcept} [props.asNeeded] - Preconditions for service
  * @param {dateTime} [props.authoredOn] - Date request signed
  * @param {Reference} [props.requester] - Who/what is requesting service
  * @param {CodeableConcept} [props.performerType] - Performer role
  * @param {Reference} [props.performer] - Requested performer
  * @param {CodeableConcept} [props.locationCode] - Requested location
  * @param {Reference} [props.locationReference] - Requested location
  * @param {CodeableConcept} [props.reasonCode] - Explanation/Justification for procedure or service
  * @param {Reference} [props.reasonReference] - Explanation/Justification for service or service
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {Reference} [props.supportingInfo] - Additional clinical information
  * @param {Reference} [props.specimen] - Lab test specimen
  * @param {CodeableConcept} [props.bodySite] - Location on Body
  * @param {Annotation} [props.note] - Comments
  * @param {string} [props.patientInstruction] - Patient or consumer-oriented instructions
  * @param {Reference} [props.relevantHistory] - Request provenance
  */
declare function serviceRequest(type: "SzLabRequest", props: ServiceRequest_SzLabRequest_Props): any;
declare function serviceRequest(type: "SzReferral", props: ServiceRequest_SzReferral_Props): any;
/**
  * Create a Specimen resource.
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
  * @param {Identifier} [props.identifier] - External Identifier
  * @param {Identifier} [props.accessionIdentifier] - Identifier assigned by the lab
  * @param {string} [props.status] - available | unavailable | unsatisfactory | entered-in-error
  * @param {CodeableConcept} [props.type] - Type of specimen being collected
  * @param {Reference} [props.subject] - Patient associated with the specimen being collected
  * @param {dateTime} [props.receivedTime] - The time when specimen was received for processing
  * @param {Reference} [props.parent] - Specimen from which this specimen originated
  * @param {Reference} [props.request] - Why the specimen was collected
  * @param {BackboneElement} [props.collection] - Specimen collection information
  * @param {BackboneElement} [props.processing] - Processing and processing step details
  * @param {BackboneElement} [props.container] - Direct container of specimen (tube/slide, etc.)
  * @param {CodeableConcept} [props.condition] - State of the specimen
  * @param {Annotation} [props.note] - Comments
  */
declare function specimen(type: "SzLabSpecimen", props: Specimen_SzLabSpecimen_Props): any;

export { addExtension, appointment, c, cc, coding, composite, concept, condition, encounter, episodeOfCare, ext, extendSystemMap, extension, findExtension, id, identifier, location, mapSystems, medication, medicationDispense, medicationRequest, observation, organization, patient, practitioner, procedure, ref, reference, serviceRequest, setSystemMap, specimen, value };

