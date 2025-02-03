
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type ResearchElementDefinition_Props = {
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
    name?: string;
    title?: string;
    shortTitle?: string;
    subtitle?: string;
    status?: string;
    experimental?: boolean;
    subject?: CodeableConcept;
    date?: string;
    publisher?: string;
    contact?: ContactDetail;
    description?: markdown;
    comment?: string;
    useContext?: UsageContext;
    jurisdiction?: CodeableConcept;
    purpose?: markdown;
    usage?: string;
    copyright?: markdown;
    approvalDate?: string;
    lastReviewDate?: string;
    effectivePeriod?: Period;
    topic?: CodeableConcept;
    author?: ContactDetail;
    editor?: ContactDetail;
    reviewer?: ContactDetail;
    endorser?: ContactDetail;
    relatedArtifact?: RelatedArtifact;
    library?: any;
    type?: string;
    variableType?: string;
    characteristic?: BackboneElement;
};

export default function(props: Partial<ResearchElementDefinition_Props>) {
    const resource = {
        resourceType: "ResearchElementDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ResearchElementDefinition</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        dt.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.characteristic)) {
        let src = props.characteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.characteristic = [];

        for (let item of src) {
            let _characteristic = {
                ...item
            };

            resource.characteristic.push(_characteristic);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ResearchElementDefinition"]
    };

    return resource;
}
