
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type SpecimenDefinition_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    typeCollected?: FHIR.CodeableConcept;
    patientPreparation?: FHIR.CodeableConcept;
    timeAspect?: string;
    collection?: FHIR.CodeableConcept;
    typeTested?: FHIR.BackboneElement;
};

export default function(props: Partial<SpecimenDefinition_Props>) {
    const resource = {
        resourceType: "SpecimenDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SpecimenDefinition</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.typeTested)) {
        let src = props.typeTested;
        if (!Array.isArray(src)) { src = [src]; }
        resource.typeTested = [];

        for (let item of src) {
            let _typeTested = {
                ...item
            };

            resource.typeTested.push(_typeTested);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SpecimenDefinition"]
    };

    return resource;
}
