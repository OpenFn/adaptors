
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type EnrollmentResponse_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    status?: string;
    request?: string | FHIR.Reference;
    outcome?: string;
    disposition?: string;
    created?: string;
    organization?: string | FHIR.Reference;
    requestProvider?: string | FHIR.Reference;
    [key: string]: any;
};

export default function(props: Partial<EnrollmentResponse_Props>) {
    const resource = {
        resourceType: "EnrollmentResponse",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.request)) {
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.organization)) {
        resource.organization = dt.reference(props.organization);
    }

    if (!_.isNil(props.requestProvider)) {
        resource.requestProvider = dt.reference(props.requestProvider);
    }

    return resource;
}
