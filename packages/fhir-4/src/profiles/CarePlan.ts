
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type CarePlan_Props = {
    activity?: FHIR.BackboneElement[];
    addresses?: MaybeArray<string | FHIR.Reference>;
    author?: string | FHIR.Reference;
    basedOn?: MaybeArray<string | FHIR.Reference>;
    careTeam?: MaybeArray<string | FHIR.Reference>;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    contained?: any[];
    contributor?: MaybeArray<string | FHIR.Reference>;
    created?: string;
    description?: string;
    encounter?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    goal?: MaybeArray<string | FHIR.Reference>;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    intent?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    partOf?: MaybeArray<string | FHIR.Reference>;
    period?: FHIR.Period;
    replaces?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    subject?: string | FHIR.Reference;
    supportingInfo?: MaybeArray<string | FHIR.Reference>;
    text?: FHIR.Narrative;
    title?: string;
    [key: string]: any;
};

export default function(props: Partial<CarePlan_Props>) {
    const resource = {
        resourceType: "CarePlan",
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

    if (!_.isNil(props.replaces)) {
        if (!Array.isArray(props.replaces)) { props.replaces = [props.replaces]; }
        resource.replaces = dt.reference(props.replaces);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.contributor)) {
        if (!Array.isArray(props.contributor)) { props.contributor = [props.contributor]; }
        resource.contributor = dt.reference(props.contributor);
    }

    if (!_.isNil(props.careTeam)) {
        if (!Array.isArray(props.careTeam)) { props.careTeam = [props.careTeam]; }
        resource.careTeam = dt.reference(props.careTeam);
    }

    if (!_.isNil(props.addresses)) {
        if (!Array.isArray(props.addresses)) { props.addresses = [props.addresses]; }
        resource.addresses = dt.reference(props.addresses);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = dt.reference(props.supportingInfo);
    }

    if (!_.isNil(props.goal)) {
        if (!Array.isArray(props.goal)) { props.goal = [props.goal]; }
        resource.goal = dt.reference(props.goal);
    }

    if (!_.isNil(props.activity)) {
        let src = props.activity;
        if (!Array.isArray(src)) { src = [src]; }
        resource.activity = [];

        for (let item of src) {
            let _activity = {
                ...item
            };

            resource.activity.push(_activity);
        }
    }

    return resource;
}
