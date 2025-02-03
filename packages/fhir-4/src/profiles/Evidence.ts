
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Evidence_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    url?: string;
    identifier?: Identifier;
    version?: string;
    title?: string;
    citeAs?: Reference;
    status?: string;
    date?: string;
    useContext?: UsageContext;
    approvalDate?: string;
    lastReviewDate?: string;
    publisher?: string;
    contact?: ContactDetail;
    author?: ContactDetail;
    editor?: ContactDetail;
    reviewer?: ContactDetail;
    endorser?: ContactDetail;
    relatedArtifact?: RelatedArtifact;
    description?: markdown;
    assertion?: markdown;
    note?: Annotation;
    variableDefinition?: BackboneElement;
    synthesisType?: CodeableConcept;
    studyType?: CodeableConcept;
    statistic?: BackboneElement;
    certainty?: BackboneElement;
};

export default function(props: Partial<Evidence_Props>) {
    const resource = {
        resourceType: "Evidence",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Evidence</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.citeAs)) {
        dt.composite(resource, "citeAs", props.citeAs);
    }

    if (!_.isNil(props.variableDefinition)) {
        let src = props.variableDefinition;
        if (!Array.isArray(src)) { src = [src]; }
        resource.variableDefinition = [];

        for (let item of src) {
            let _variableDefinition = {
                ...item
            };

            resource.variableDefinition.push(_variableDefinition);
        }
    }

    if (!_.isNil(props.statistic)) {
        let src = props.statistic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statistic = [];

        for (let item of src) {
            let _statistic = {
                ...item
            };

            resource.statistic.push(_statistic);
        }
    }

    if (!_.isNil(props.certainty)) {
        let src = props.certainty;
        if (!Array.isArray(src)) { src = [src]; }
        resource.certainty = [];

        for (let item of src) {
            let _certainty = {
                ...item
            };

            resource.certainty.push(_certainty);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Evidence"]
    };

    return resource;
}
