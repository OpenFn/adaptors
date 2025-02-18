
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type EnrollmentRequest_Props = {
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
    created?: string;
    insurer?: FHIR.Reference;
    provider?: FHIR.Reference;
    candidate?: FHIR.Reference;
    coverage?: FHIR.Reference;
    initialiser?: any;
};

export default function(props: Partial<EnrollmentRequest_Props>) {
    const resource = {
        resourceType: "EnrollmentRequest",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = dt.reference(props.insurer);
    }

    if (!_.isNil(props.provider)) {
        resource.provider = dt.reference(props.provider);
    }

    if (!_.isNil(props.candidate)) {
        resource.candidate = dt.reference(props.candidate);
    }

    if (!_.isNil(props.coverage)) {
        resource.coverage = dt.reference(props.coverage);
    }

    return resource;
}
