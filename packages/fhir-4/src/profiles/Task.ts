
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Task_Props = {
    authoredOn?: string;
    basedOn?: MaybeArray<string | FHIR.Reference>;
    businessStatus?: string[] | FHIR.CodeableConcept;
    code?: string[] | FHIR.CodeableConcept;
    contained?: any[];
    description?: string;
    encounter?: string | FHIR.Reference;
    executionPeriod?: FHIR.Period;
    extension?: FHIR.Extension[];
    focus?: string | FHIR.Reference;
    for?: string | FHIR.Reference;
    groupIdentifier?: string | FHIR.Identifier;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    input?: FHIR.BackboneElement[];
    instantiatesCanonical?: any;
    instantiatesUri?: string;
    insurance?: MaybeArray<string | FHIR.Reference>;
    intent?: string;
    language?: string;
    lastModified?: string;
    location?: string | FHIR.Reference;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    output?: FHIR.BackboneElement[];
    owner?: string | FHIR.Reference;
    partOf?: MaybeArray<string | FHIR.Reference>;
    performerType?: MaybeArray<string[] | FHIR.CodeableConcept>;
    priority?: string;
    reasonCode?: string[] | FHIR.CodeableConcept;
    reasonReference?: string | FHIR.Reference;
    relevantHistory?: MaybeArray<string | FHIR.Reference>;
    requester?: string | FHIR.Reference;
    restriction?: FHIR.BackboneElement;
    status?: string;
    statusReason?: string[] | FHIR.CodeableConcept;
    text?: FHIR.Narrative;
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

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = dt.concept(props.statusReason);
    }

    if (!_.isNil(props.businessStatus)) {
        resource.businessStatus = dt.concept(props.businessStatus);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
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

    if (!_.isNil(props.performerType)) {
        if (!Array.isArray(props.performerType)) { props.performerType = [props.performerType]; }
        resource.performerType = dt.concept(props.performerType);
    }

    if (!_.isNil(props.owner)) {
        resource.owner = dt.reference(props.owner);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = dt.concept(props.reasonCode);
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
