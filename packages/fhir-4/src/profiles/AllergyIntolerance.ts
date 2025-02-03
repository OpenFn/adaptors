
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type AllergyIntolerance_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    clinicalStatus?: CodeableConcept;
    verificationStatus?: CodeableConcept;
    type?: string;
    category?: string;
    criticality?: string;
    code?: CodeableConcept;
    patient?: Reference;
    encounter?: Reference;
    onset?: string;
    recordedDate?: string;
    recorder?: Reference;
    asserter?: Reference;
    lastOccurrence?: string;
    note?: Annotation;
    reaction?: BackboneElement;
};

export default function(props: Partial<AllergyIntolerance_Props>) {
    const resource = {
        resourceType: "AllergyIntolerance",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AllergyIntolerance</b></p></div>"
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

    if (!_.isNil(props.onset)) {
        dt.composite(resource, "onset", props.onset);
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = dt.reference(props.recorder);
    }

    if (!_.isNil(props.asserter)) {
        resource.asserter = dt.reference(props.asserter);
    }

    if (!_.isNil(props.reaction)) {
        let src = props.reaction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.reaction = [];

        for (let item of src) {
            let _reaction = {
                ...item
            };

            resource.reaction.push(_reaction);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance"]
    };

    return resource;
}
