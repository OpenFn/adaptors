
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type HealthcareService_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    active?: boolean;
    providedBy?: string | FHIR.Reference;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    type?: MaybeArray<string[] | FHIR.CodeableConcept>;
    specialty?: MaybeArray<string[] | FHIR.CodeableConcept>;
    location?: MaybeArray<string | FHIR.Reference>;
    name?: string;
    comment?: string;
    extraDetails?: FHIR.markdown;
    photo?: FHIR.Attachment;
    telecom?: FHIR.ContactPoint[];
    coverageArea?: MaybeArray<string | FHIR.Reference>;
    serviceProvisionCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    eligibility?: FHIR.BackboneElement[];
    program?: MaybeArray<string[] | FHIR.CodeableConcept>;
    characteristic?: MaybeArray<string[] | FHIR.CodeableConcept>;
    communication?: MaybeArray<string[] | FHIR.CodeableConcept>;
    referralMethod?: MaybeArray<string[] | FHIR.CodeableConcept>;
    appointmentRequired?: boolean;
    availableTime?: FHIR.BackboneElement[];
    notAvailable?: FHIR.BackboneElement[];
    availabilityExceptions?: string;
    endpoint?: MaybeArray<string | FHIR.Reference>;
    [key: string]: any;
};

export default function(props: Partial<HealthcareService_Props>) {
    const resource = {
        resourceType: "HealthcareService",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.providedBy)) {
        resource.providedBy = dt.reference(props.providedBy);
    }

    if (!_.isNil(props.location)) {
        if (!Array.isArray(props.location)) { props.location = [props.location]; }
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.coverageArea)) {
        if (!Array.isArray(props.coverageArea)) { props.coverageArea = [props.coverageArea]; }
        resource.coverageArea = dt.reference(props.coverageArea);
    }

    if (!_.isNil(props.eligibility)) {
        let src = props.eligibility;
        if (!Array.isArray(src)) { src = [src]; }
        resource.eligibility = [];

        for (let item of src) {
            let _eligibility = {
                ...item
            };

            resource.eligibility.push(_eligibility);
        }
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
