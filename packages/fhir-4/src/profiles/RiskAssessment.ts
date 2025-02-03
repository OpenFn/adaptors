
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type RiskAssessment_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    basedOn?: Reference;
    parent?: Reference;
    status?: string;
    method?: CodeableConcept;
    code?: CodeableConcept;
    subject?: Reference;
    encounter?: Reference;
    occurrence?: string;
    condition?: Reference;
    performer?: Reference;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    basis?: Reference;
    prediction?: BackboneElement;
    mitigation?: string;
    note?: Annotation;
};

export default function(props: Partial<RiskAssessment_Props>) {
    const resource = {
        resourceType: "RiskAssessment",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RiskAssessment</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.parent)) {
        resource.parent = dt.reference(props.parent);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.condition)) {
        resource.condition = dt.reference(props.condition);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.basis)) {
        if (!Array.isArray(props.basis)) { props.basis = [props.basis]; }
        resource.basis = dt.reference(props.basis);
    }

    if (!_.isNil(props.prediction)) {
        let src = props.prediction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.prediction = [];

        for (let item of src) {
            let _prediction = {
                ...item
            };

            resource.prediction.push(_prediction);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/RiskAssessment"]
    };

    return resource;
}
