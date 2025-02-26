
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Task_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    instantiatesCanonical?: any;
    instantiatesUri?: string;
    basedOn?: MaybeArray<string | FHIR.Reference>;
    groupIdentifier?: string | FHIR.Identifier;
    partOf?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    statusReason?: string[] | FHIR.CodeableConcept;
    businessStatus?: string[] | FHIR.CodeableConcept;
    intent?: string;
    priority?: string;
    code?: string[] | FHIR.CodeableConcept;
    description?: string;
    focus?: string | FHIR.Reference;
    for?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    executionPeriod?: FHIR.Period;
    authoredOn?: string;
    lastModified?: string;
    requester?: string | FHIR.Reference;
    performerType?: MaybeArray<string[] | FHIR.CodeableConcept>;
    owner?: string | FHIR.Reference;
    location?: string | FHIR.Reference;
    reasonCode?: string[] | FHIR.CodeableConcept;
    reasonReference?: string | FHIR.Reference;
    insurance?: MaybeArray<string | FHIR.Reference>;
    note?: FHIR.Annotation[];
    relevantHistory?: MaybeArray<string | FHIR.Reference>;
    restriction?: FHIR.BackboneElement;
    input?: FHIR.BackboneElement[];
    output?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<Task_Props>) {
    const resource = {
        resourceType: "Task",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = dt.identifier(props.groupIdentifier);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.focus)) {
        resource.focus = dt.reference(props.focus);
    }

    if (!_.isNil(props.for)) {
        resource.for = dt.reference(props.for);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.requester)) {
        resource.requester = dt.reference(props.requester);
    }

    if (!_.isNil(props.owner)) {
        resource.owner = dt.reference(props.owner);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.reasonReference)) {
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = dt.reference(props.insurance);
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = dt.reference(props.relevantHistory);
    }

    if (!_.isNil(props.restriction)) {
        let src = props.restriction;

        let _restriction = {
            ...item
        };

        resource.restriction = _restriction;
    }

    if (!_.isNil(props.input)) {
        let src = props.input;
        if (!Array.isArray(src)) { src = [src]; }
        resource.input = [];

        for (let item of src) {
            let _input = {
                ...item
            };

            resource.input.push(_input);
        }
    }

    if (!_.isNil(props.output)) {
        let src = props.output;
        if (!Array.isArray(src)) { src = [src]; }
        resource.output = [];

        for (let item of src) {
            let _output = {
                ...item
            };

            resource.output.push(_output);
        }
    }

    return resource;
}
