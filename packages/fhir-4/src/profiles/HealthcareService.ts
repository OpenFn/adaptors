
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type HealthcareService_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: Array<string | FHIR.Identifier>;
    active?: boolean;
    providedBy?: string | FHIR.Reference;
    category?: Array<string[] | FHIR.CodeableConcept>;
    type?: Array<string[] | FHIR.CodeableConcept>;
    specialty?: Array<string[] | FHIR.CodeableConcept>;
    location?: Array<string | FHIR.Reference>;
    name?: string;
    comment?: string;
    extraDetails?: FHIR.markdown;
    photo?: FHIR.Attachment;
    telecom?: FHIR.ContactPoint[];
    coverageArea?: Array<string | FHIR.Reference>;
    serviceProvisionCode?: Array<string[] | FHIR.CodeableConcept>;
    eligibility?: FHIR.BackboneElement[];
    program?: Array<string[] | FHIR.CodeableConcept>;
    characteristic?: Array<string[] | FHIR.CodeableConcept>;
    communication?: Array<string[] | FHIR.CodeableConcept>;
    referralMethod?: Array<string[] | FHIR.CodeableConcept>;
    appointmentRequired?: boolean;
    availableTime?: FHIR.BackboneElement[];
    notAvailable?: FHIR.BackboneElement[];
    availabilityExceptions?: string;
    endpoint?: Array<string | FHIR.Reference>;
    initialiser?: any;
    typeShorthands?: any;
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
