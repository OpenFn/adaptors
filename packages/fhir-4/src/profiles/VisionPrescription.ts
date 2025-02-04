
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type VisionPrescription_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: any;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    status?: string;
    created?: string;
    patient?: Reference;
    encounter?: Reference;
    dateWritten?: string;
    prescriber?: Reference;
    lensSpecification?: BackboneElement;
};

export default function(props: Partial<VisionPrescription_Props>) {
    const resource = {
        resourceType: "VisionPrescription",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>VisionPrescription</b></p></div>"
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

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.prescriber)) {
        resource.prescriber = dt.reference(props.prescriber);
    }

    if (!_.isNil(props.lensSpecification)) {
        let src = props.lensSpecification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.lensSpecification = [];

        for (let item of src) {
            let _lensSpecification = {
                ...item
            };

            resource.lensSpecification.push(_lensSpecification);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/VisionPrescription"]
    };

    return resource;
}
