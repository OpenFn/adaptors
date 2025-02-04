
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Library_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    url?: string;
    identifier?: FHIR.Identifier;
    version?: string;
    name?: string;
    title?: string;
    subtitle?: string;
    status?: string;
    experimental?: boolean;
    type?: FHIR.CodeableConcept;
    subject?: FHIR.CodeableConcept;
    date?: string;
    publisher?: string;
    contact?: FHIR.ContactDetail;
    description?: FHIR.markdown;
    useContext?: FHIR.UsageContext;
    jurisdiction?: FHIR.CodeableConcept;
    purpose?: FHIR.markdown;
    usage?: string;
    copyright?: FHIR.markdown;
    approvalDate?: string;
    lastReviewDate?: string;
    effectivePeriod?: FHIR.Period;
    topic?: FHIR.CodeableConcept;
    author?: FHIR.ContactDetail;
    editor?: FHIR.ContactDetail;
    reviewer?: FHIR.ContactDetail;
    endorser?: FHIR.ContactDetail;
    relatedArtifact?: FHIR.RelatedArtifact;
    parameter?: FHIR.ParameterDefinition;
    dataRequirement?: FHIR.DataRequirement;
    content?: FHIR.Attachment;
};

export default function(props: Partial<Library_Props>) {
    const resource = {
        resourceType: "Library",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Library</b></p></div>"
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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Library"]
    };

    return resource;
}
