
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Flag_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    status?: string;
    category?: FHIR.CodeableConcept;
    code?: FHIR.CodeableConcept;
    subject?: FHIR.Reference;
    period?: FHIR.Period;
    encounter?: FHIR.Reference;
    author?: FHIR.Reference;
};

export default function(props: Partial<Flag_Props>) {
    const resource = {
        resourceType: "Flag",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Flag</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Flag"]
    };

    return resource;
}
