
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ResearchSubject_Props = {
    actualArm?: string;
    assignedArm?: string;
    consent?: string | FHIR.Reference;
    contained?: any[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    individual?: string | FHIR.Reference;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    period?: FHIR.Period;
    status?: string;
    study?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<ResearchSubject_Props>) {
    const resource = {
        resourceType: "ResearchSubject",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.study)) {
        resource.study = dt.reference(props.study);
    }

    if (!_.isNil(props.individual)) {
        resource.individual = dt.reference(props.individual);
    }

    if (!_.isNil(props.consent)) {
        resource.consent = dt.reference(props.consent);
    }

    return resource;
}
