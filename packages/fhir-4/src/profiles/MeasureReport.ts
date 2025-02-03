
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type MeasureReport_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    status?: string;
    type?: string;
    measure?: any;
    subject?: Reference;
    date?: string;
    reporter?: Reference;
    period?: Period;
    improvementNotation?: CodeableConcept;
    group?: BackboneElement;
    evaluatedResource?: Reference;
};

export default function(props: Partial<MeasureReport_Props>) {
    const resource = {
        resourceType: "MeasureReport",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MeasureReport</b></p></div>"
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

    if (!_.isNil(props.reporter)) {
        resource.reporter = dt.reference(props.reporter);
    }

    if (!_.isNil(props.group)) {
        let src = props.group;
        if (!Array.isArray(src)) { src = [src]; }
        resource.group = [];

        for (let item of src) {
            let _group = {
                ...item
            };

            resource.group.push(_group);
        }
    }

    if (!_.isNil(props.evaluatedResource)) {
        if (!Array.isArray(props.evaluatedResource)) { props.evaluatedResource = [props.evaluatedResource]; }
        resource.evaluatedResource = dt.reference(props.evaluatedResource);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MeasureReport"]
    };

    return resource;
}
