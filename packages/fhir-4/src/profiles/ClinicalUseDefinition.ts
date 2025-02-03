
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type ClinicalUseDefinition_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    type?: string;
    category?: CodeableConcept;
    subject?: Reference;
    status?: CodeableConcept;
    contraindication?: BackboneElement;
    indication?: BackboneElement;
    interaction?: BackboneElement;
    population?: Reference;
    undesirableEffect?: BackboneElement;
    warning?: BackboneElement;
};

export default function(props: Partial<ClinicalUseDefinition_Props>) {
    const resource = {
        resourceType: "ClinicalUseDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ClinicalUseDefinition</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.contraindication)) {
        let src = props.contraindication;

        let _contraindication = {
            ...item
        };

        resource.contraindication = _contraindication;
    }

    if (!_.isNil(props.indication)) {
        let src = props.indication;

        let _indication = {
            ...item
        };

        resource.indication = _indication;
    }

    if (!_.isNil(props.interaction)) {
        let src = props.interaction;

        let _interaction = {
            ...item
        };

        resource.interaction = _interaction;
    }

    if (!_.isNil(props.population)) {
        if (!Array.isArray(props.population)) { props.population = [props.population]; }
        resource.population = dt.reference(props.population);
    }

    if (!_.isNil(props.undesirableEffect)) {
        let src = props.undesirableEffect;

        let _undesirableEffect = {
            ...item
        };

        resource.undesirableEffect = _undesirableEffect;
    }

    if (!_.isNil(props.warning)) {
        let src = props.warning;

        let _warning = {
            ...item
        };

        resource.warning = _warning;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ClinicalUseDefinition"]
    };

    return resource;
}
