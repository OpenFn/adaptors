
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type HealthcareService_Props = {
    active?: boolean;
    appointmentRequired?: boolean;
    availabilityExceptions?: string;
    availableTime?: FHIR.BackboneElement[];
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    characteristic?: MaybeArray<string[] | FHIR.CodeableConcept>;
    comment?: string;
    communication?: MaybeArray<string[] | FHIR.CodeableConcept>;
    contained?: any[];
    coverageArea?: MaybeArray<string | FHIR.Reference>;
    eligibility?: FHIR.BackboneElement[];
    endpoint?: MaybeArray<string | FHIR.Reference>;
    extension?: FHIR.Extension[];
    extraDetails?: string;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    location?: MaybeArray<string | FHIR.Reference>;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    notAvailable?: FHIR.BackboneElement[];
    photo?: FHIR.Attachment;
    program?: MaybeArray<string[] | FHIR.CodeableConcept>;
    providedBy?: string | FHIR.Reference;
    referralMethod?: MaybeArray<string[] | FHIR.CodeableConcept>;
    serviceProvisionCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    specialty?: MaybeArray<string[] | FHIR.CodeableConcept>;
    telecom?: FHIR.ContactPoint[];
    text?: FHIR.Narrative;
    type?: MaybeArray<string[] | FHIR.CodeableConcept>;
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

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }

        resource.category = props.category.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/service-category", x))
        );

        dt.ensureConceptText(resource.category);
    }

    if (!_.isNil(props.type)) {
        if (!Array.isArray(props.type)) { props.type = [props.type]; }

        resource.type = props.type.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/service-type", x))
        );

        dt.ensureConceptText(resource.type);
    }

    if (!_.isNil(props.specialty)) {
        if (!Array.isArray(props.specialty)) { props.specialty = [props.specialty]; }

        resource.specialty = props.specialty.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/c80-practice-codes", x))
        );

        dt.ensureConceptText(resource.specialty);
    }

    if (!_.isNil(props.location)) {
        if (!Array.isArray(props.location)) { props.location = [props.location]; }
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.coverageArea)) {
        if (!Array.isArray(props.coverageArea)) { props.coverageArea = [props.coverageArea]; }
        resource.coverageArea = dt.reference(props.coverageArea);
    }

    if (!_.isNil(props.serviceProvisionCode)) {
        if (!Array.isArray(props.serviceProvisionCode)) { props.serviceProvisionCode = [props.serviceProvisionCode]; }

        resource.serviceProvisionCode = props.serviceProvisionCode.map((x) => dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/service-provision-conditions", x)
        ));

        dt.ensureConceptText(resource.serviceProvisionCode);
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

    if (!_.isNil(props.program)) {
        if (!Array.isArray(props.program)) { props.program = [props.program]; }

        resource.program = props.program.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/program", x))
        );

        dt.ensureConceptText(resource.program);
    }

    if (!_.isNil(props.characteristic)) {
        if (!Array.isArray(props.characteristic)) { props.characteristic = [props.characteristic]; }
        resource.characteristic = dt.concept(props.characteristic);
        dt.ensureConceptText(resource.characteristic);
    }

    if (!_.isNil(props.communication)) {
        if (!Array.isArray(props.communication)) { props.communication = [props.communication]; }

        resource.communication = props.communication.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/languages", x))
        );

        dt.ensureConceptText(resource.communication);
    }

    if (!_.isNil(props.referralMethod)) {
        if (!Array.isArray(props.referralMethod)) { props.referralMethod = [props.referralMethod]; }

        resource.referralMethod = props.referralMethod.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/service-referral-method", x))
        );

        dt.ensureConceptText(resource.referralMethod);
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
