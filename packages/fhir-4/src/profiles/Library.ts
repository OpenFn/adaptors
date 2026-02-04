
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Library_Props = {
    approvalDate?: string;
    author?: FHIR.ContactDetail[];
    contact?: FHIR.ContactDetail[];
    contained?: any[];
    content?: FHIR.Attachment[];
    copyright?: FHIR.markdown;
    dataRequirement?: FHIR.DataRequirement[];
    date?: string;
    description?: FHIR.markdown;
    editor?: FHIR.ContactDetail[];
    effectivePeriod?: FHIR.Period;
    endorser?: FHIR.ContactDetail[];
    experimental?: boolean;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    jurisdiction?: MaybeArray<string[] | FHIR.CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    parameter?: FHIR.ParameterDefinition[];
    publisher?: string;
    purpose?: FHIR.markdown;
    relatedArtifact?: FHIR.RelatedArtifact[];
    reviewer?: FHIR.ContactDetail[];
    status?: string;
    subject?: string[] | FHIR.CodeableConcept | string | FHIR.Reference;
    subtitle?: string;
    text?: FHIR.Narrative;
    title?: string;
    topic?: MaybeArray<string[] | FHIR.CodeableConcept>;
    type?: string[] | FHIR.CodeableConcept;
    url?: string;
    usage?: string;
    useContext?: FHIR.UsageContext[];
    version?: string;
    [key: string]: any;
};

export default function(props: Partial<Library_Props>) {
    const resource = {
        resourceType: "Library",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.subject)) {
        delete resource.subject;
        dt.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.jurisdiction)) {
        if (!Array.isArray(props.jurisdiction)) { props.jurisdiction = [props.jurisdiction]; }
        resource.jurisdiction = dt.concept(props.jurisdiction);
    }

    if (!_.isNil(props.topic)) {
        if (!Array.isArray(props.topic)) { props.topic = [props.topic]; }
        resource.topic = dt.concept(props.topic);
    }

    return resource;
}
