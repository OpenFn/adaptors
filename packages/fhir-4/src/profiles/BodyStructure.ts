
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type BodyStructure_Props = {
    active?: boolean;
    contained?: any[];
    description?: string;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    image?: FHIR.Attachment[];
    implicitRules?: string;
    language?: string;
    location?: string[] | FHIR.CodeableConcept;
    locationQualifier?: MaybeArray<string[] | FHIR.CodeableConcept>;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    morphology?: string[] | FHIR.CodeableConcept;
    patient?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<BodyStructure_Props>) {
    const resource = {
        resourceType: "BodyStructure",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.morphology)) {
        resource.morphology = dt.concept(props.morphology);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.concept(props.location);
    }

    if (!_.isNil(props.locationQualifier)) {
        if (!Array.isArray(props.locationQualifier)) { props.locationQualifier = [props.locationQualifier]; }
        resource.locationQualifier = dt.concept(props.locationQualifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    return resource;
}
