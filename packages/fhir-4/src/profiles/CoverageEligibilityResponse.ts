
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type CoverageEligibilityResponse_Props = {
    contained?: any[];
    created?: string;
    disposition?: string;
    error?: FHIR.BackboneElement[];
    extension?: FHIR.Extension[];
    form?: string[] | FHIR.CodeableConcept;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    insurance?: FHIR.BackboneElement[];
    insurer?: string | FHIR.Reference;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    outcome?: string;
    patient?: string | FHIR.Reference;
    preAuthRef?: string;
    purpose?: string[];
    request?: string | FHIR.Reference;
    requestor?: string | FHIR.Reference;
    serviced?: string | FHIR.Period;
    status?: string;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<CoverageEligibilityResponse_Props>) {
    const resource = {
        resourceType: "CoverageEligibilityResponse",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.serviced)) {
        delete resource.serviced;
        dt.composite(resource, "serviced", props.serviced);
    }

    if (!_.isNil(props.requestor)) {
        resource.requestor = dt.reference(props.requestor);
    }

    if (!_.isNil(props.request)) {
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = dt.reference(props.insurer);
    }

    if (!_.isNil(props.insurance)) {
        let src = props.insurance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.insurance = [];

        for (let item of src) {
            let _insurance = {
                ...item
            };

            resource.insurance.push(_insurance);
        }
    }

    if (!_.isNil(props.form)) {
        resource.form = dt.concept(props.form);
    }

    if (!_.isNil(props.error)) {
        let src = props.error;
        if (!Array.isArray(src)) { src = [src]; }
        resource.error = [];

        for (let item of src) {
            let _error = {
                ...item
            };

            resource.error.push(_error);
        }
    }

    return resource;
}
