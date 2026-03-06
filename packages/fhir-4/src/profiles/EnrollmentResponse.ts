
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type EnrollmentResponse_Props = {
    contained?: any[];
    created?: string;
    disposition?: string;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    organization?: string | FHIR.Reference;
    outcome?: string;
    request?: string | FHIR.Reference;
    requestProvider?: string | FHIR.Reference;
    status?: string;
    text?: FHIR.Narrative;
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
