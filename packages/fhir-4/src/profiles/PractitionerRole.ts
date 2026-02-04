
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type PractitionerRole_Props = {
    active?: boolean;
    availabilityExceptions?: string;
    availableTime?: FHIR.BackboneElement[];
    code?: MaybeArray<string[] | FHIR.CodeableConcept>;
    contained?: any[];
    endpoint?: MaybeArray<string | FHIR.Reference>;
    extension?: FHIR.Extension[];
    healthcareService?: MaybeArray<string | FHIR.Reference>;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    location?: MaybeArray<string | FHIR.Reference>;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    notAvailable?: FHIR.BackboneElement[];
    organization?: string | FHIR.Reference;
    period?: FHIR.Period;
    practitioner?: string | FHIR.Reference;
    specialty?: MaybeArray<string[] | FHIR.CodeableConcept>;
    telecom?: FHIR.ContactPoint[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<PractitionerRole_Props>) {
    const resource = {
        resourceType: "PractitionerRole",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.practitioner)) {
        resource.practitioner = dt.reference(props.practitioner);
    }

    if (!_.isNil(props.organization)) {
        resource.organization = dt.reference(props.organization);
    }

    if (!_.isNil(props.code)) {
        if (!Array.isArray(props.code)) { props.code = [props.code]; }
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.specialty)) {
        if (!Array.isArray(props.specialty)) { props.specialty = [props.specialty]; }
        resource.specialty = dt.concept(props.specialty);
    }

    if (!_.isNil(props.location)) {
        if (!Array.isArray(props.location)) { props.location = [props.location]; }
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.healthcareService)) {
        if (!Array.isArray(props.healthcareService)) { props.healthcareService = [props.healthcareService]; }
        resource.healthcareService = dt.reference(props.healthcareService);
    }

    if (!_.isNil(props.availableTime)) {
        let src = props.availableTime;
        if (!Array.isArray(src)) { src = [src]; }
        resource.availableTime = [];

        for (let item of src) {
            let _availableTime = {
                ...item
            };

            resource.availableTime.push(_availableTime);
        }
    }

    if (!_.isNil(props.notAvailable)) {
        let src = props.notAvailable;
        if (!Array.isArray(src)) { src = [src]; }
        resource.notAvailable = [];

        for (let item of src) {
            let _notAvailable = {
                ...item
            };

            resource.notAvailable.push(_notAvailable);
        }
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = dt.reference(props.endpoint);
    }

    return resource;
}
