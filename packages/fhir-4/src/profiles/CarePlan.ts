
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type CarePlan_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    basedOn?: MaybeArray<string | FHIR.Reference>;
    replaces?: MaybeArray<string | FHIR.Reference>;
    partOf?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    intent?: string;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    title?: string;
    description?: string;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    period?: FHIR.Period;
    created?: string;
    author?: string | FHIR.Reference;
    contributor?: MaybeArray<string | FHIR.Reference>;
    careTeam?: MaybeArray<string | FHIR.Reference>;
    addresses?: MaybeArray<string | FHIR.Reference>;
    supportingInfo?: MaybeArray<string | FHIR.Reference>;
    goal?: MaybeArray<string | FHIR.Reference>;
    activity?: FHIR.BackboneElement[];
    note?: FHIR.Annotation[];
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
