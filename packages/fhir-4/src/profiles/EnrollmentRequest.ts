
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type EnrollmentRequest_Props = {
    candidate?: string | FHIR.Reference;
    contained?: any[];
    coverage?: string | FHIR.Reference;
    created?: string;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    insurer?: string | FHIR.Reference;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    provider?: string | FHIR.Reference;
    status?: string;
    text?: FHIR.Narrative;
    [key: string]: any;
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
