
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type AllergyIntolerance_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    clinicalStatus?: FHIR.CodeableConcept;
    verificationStatus?: FHIR.CodeableConcept;
    type?: string;
    category?: string;
    criticality?: string;
    code?: FHIR.CodeableConcept;
    patient?: FHIR.Reference;
    encounter?: FHIR.Reference;
    onset?: string;
    recordedDate?: string;
    recorder?: FHIR.Reference;
    asserter?: FHIR.Reference;
    lastOccurrence?: string;
    note?: FHIR.Annotation;
    reaction?: FHIR.BackboneElement;
    initialiser?: any;
};

export default function(props: Partial<AllergyIntolerance_Props>) {
    const resource = {
        resourceType: "AllergyIntolerance",
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
        delete resource.onset;
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

    return resource;
}
