
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Condition_Props = {
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
    category?: CodeableConcept;
    severity?: CodeableConcept;
    code?: CodeableConcept;
    bodySite?: CodeableConcept;
    subject?: Reference;
    encounter?: Reference;
    onset?: string;
    abatement?: string;
    recordedDate?: string;
    recorder?: Reference;
    asserter?: Reference;
    stage?: BackboneElement;
    evidence?: BackboneElement;
    note?: Annotation;
};

export default function(props: Partial<Condition_Props>) {
    const resource = {
        resourceType: "Condition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Condition</b></p></div>"
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

    if (!_.isNil(props.onset)) {
        dt.composite(resource, "onset", props.onset);
    }

    if (!_.isNil(props.abatement)) {
        dt.composite(resource, "abatement", props.abatement);
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = dt.reference(props.recorder);
    }

    if (!_.isNil(props.asserter)) {
        resource.asserter = dt.reference(props.asserter);
    }

    if (!_.isNil(props.stage)) {
        let src = props.stage;
        if (!Array.isArray(src)) { src = [src]; }
        resource.stage = [];

        for (let item of src) {
            let _stage = {
                ...item
            };

            resource.stage.push(_stage);
        }
    }

    if (!_.isNil(props.evidence)) {
        let src = props.evidence;
        if (!Array.isArray(src)) { src = [src]; }
        resource.evidence = [];

        for (let item of src) {
            let _evidence = {
                ...item
            };

            resource.evidence.push(_evidence);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Condition"]
    };

    return resource;
}
