
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type CoverageEligibilityResponse_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: FHIR.Identifier[];
    status?: string;
    purpose?: string[];
    patient?: FHIR.Reference;
    serviced?: string;
    created?: string;
    requestor?: FHIR.Reference;
    request?: FHIR.Reference;
    outcome?: string;
    disposition?: string;
    insurer?: FHIR.Reference;
    insurance?: FHIR.BackboneElement[];
    preAuthRef?: string;
    form?: FHIR.CodeableConcept;
    error?: FHIR.BackboneElement[];
    initialiser?: any;
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
