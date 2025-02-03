
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type BodyStructure_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    active?: boolean;
    morphology?: CodeableConcept;
    location?: CodeableConcept;
    locationQualifier?: CodeableConcept;
    description?: string;
    image?: Attachment;
    patient?: Reference;
};

export default function(props: Partial<BodyStructure_Props>) {
    const resource = {
        resourceType: "BodyStructure",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>BodyStructure</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/BodyStructure"]
    };

    return resource;
}
