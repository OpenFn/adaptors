
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type BodyStructure_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: FHIR.Identifier[];
    active?: boolean;
    morphology?: FHIR.CodeableConcept;
    location?: FHIR.CodeableConcept;
    locationQualifier?: FHIR.CodeableConcept[];
    description?: string;
    image?: FHIR.Attachment[];
    patient?: FHIR.Reference;
    initialiser?: any;
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

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    return resource;
}
