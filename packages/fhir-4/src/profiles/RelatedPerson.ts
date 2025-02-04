
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type RelatedPerson_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    active?: boolean;
    patient?: FHIR.Reference;
    relationship?: FHIR.CodeableConcept;
    name?: FHIR.HumanName;
    telecom?: FHIR.ContactPoint;
    gender?: string;
    birthDate?: string;
    address?: FHIR.Address;
    photo?: FHIR.Attachment;
    period?: FHIR.Period;
    communication?: FHIR.BackboneElement;
};

export default function(props: Partial<RelatedPerson_Props>) {
    const resource = {
        resourceType: "RelatedPerson",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RelatedPerson</b></p></div>"
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

    if (!_.isNil(props.communication)) {
        let src = props.communication;
        if (!Array.isArray(src)) { src = [src]; }
        resource.communication = [];

        for (let item of src) {
            let _communication = {
                ...item
            };

            resource.communication.push(_communication);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"]
    };

    return resource;
}
