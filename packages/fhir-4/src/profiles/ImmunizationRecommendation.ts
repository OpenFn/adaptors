
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type ImmunizationRecommendation_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    patient?: Reference;
    date?: string;
    authority?: Reference;
    recommendation?: BackboneElement;
};

export default function(props: Partial<ImmunizationRecommendation_Props>) {
    const resource = {
        resourceType: "ImmunizationRecommendation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ImmunizationRecommendation</b></p></div>"
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

    if (!_.isNil(props.authority)) {
        resource.authority = dt.reference(props.authority);
    }

    if (!_.isNil(props.recommendation)) {
        let src = props.recommendation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.recommendation = [];

        for (let item of src) {
            let _recommendation = {
                ...item
            };

            resource.recommendation.push(_recommendation);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation"]
    };

    return resource;
}
