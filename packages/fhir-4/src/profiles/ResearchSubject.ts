
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ResearchSubject_Props = {
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
    period?: FHIR.Period;
    study?: string | FHIR.Reference;
    individual?: string | FHIR.Reference;
    assignedArm?: string;
    actualArm?: string;
    consent?: string | FHIR.Reference;
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
