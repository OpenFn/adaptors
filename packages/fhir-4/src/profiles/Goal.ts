
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Goal_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    lifecycleStatus?: string;
    achievementStatus?: CodeableConcept;
    category?: CodeableConcept;
    priority?: CodeableConcept;
    description?: CodeableConcept;
    subject?: Reference;
    start?: string;
    target?: BackboneElement;
    statusDate?: string;
    statusReason?: string;
    expressedBy?: Reference;
    addresses?: Reference;
    note?: Annotation;
    outcomeCode?: CodeableConcept;
    outcomeReference?: Reference;
};

export default function(props: Partial<Goal_Props>) {
    const resource = {
        resourceType: "Goal",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Goal</b></p></div>"
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

    if (!_.isNil(props.start)) {
        dt.composite(resource, "start", props.start);
    }

    if (!_.isNil(props.target)) {
        let src = props.target;
        if (!Array.isArray(src)) { src = [src]; }
        resource.target = [];

        for (let item of src) {
            let _target = {
                ...item
            };

            resource.target.push(_target);
        }
    }

    if (!_.isNil(props.expressedBy)) {
        resource.expressedBy = dt.reference(props.expressedBy);
    }

    if (!_.isNil(props.addresses)) {
        if (!Array.isArray(props.addresses)) { props.addresses = [props.addresses]; }
        resource.addresses = dt.reference(props.addresses);
    }

    if (!_.isNil(props.outcomeReference)) {
        if (!Array.isArray(props.outcomeReference)) { props.outcomeReference = [props.outcomeReference]; }
        resource.outcomeReference = dt.reference(props.outcomeReference);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Goal"]
    };

    return resource;
}
