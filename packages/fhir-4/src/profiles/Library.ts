
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Library_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    url?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    version?: string;
    name?: string;
    title?: string;
    subtitle?: string;
    status?: string;
    experimental?: boolean;
    type?: string[] | FHIR.CodeableConcept;
    subject?: string[] | FHIR.CodeableConcept | string | FHIR.Reference;
    date?: string;
    publisher?: string;
    contact?: FHIR.ContactDetail[];
    description?: FHIR.markdown;
    useContext?: FHIR.UsageContext[];
    jurisdiction?: MaybeArray<string[] | FHIR.CodeableConcept>;
    purpose?: FHIR.markdown;
    usage?: string;
    copyright?: FHIR.markdown;
    approvalDate?: string;
    lastReviewDate?: string;
    effectivePeriod?: FHIR.Period;
    topic?: MaybeArray<string[] | FHIR.CodeableConcept>;
    author?: FHIR.ContactDetail[];
    editor?: FHIR.ContactDetail[];
    reviewer?: FHIR.ContactDetail[];
    endorser?: FHIR.ContactDetail[];
    relatedArtifact?: FHIR.RelatedArtifact[];
    parameter?: FHIR.ParameterDefinition[];
    dataRequirement?: FHIR.DataRequirement[];
    content?: FHIR.Attachment[];
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

    if (!_.isNil(props.subject)) {
        delete resource.subject;
        dt.composite(resource, "subject", props.subject);
    }

    return resource;
}
