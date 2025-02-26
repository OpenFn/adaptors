
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ResearchDefinition_Props = {
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
    shortTitle?: string;
    subtitle?: string;
    status?: string;
    experimental?: boolean;
    subject?: string[] | FHIR.CodeableConcept | string | FHIR.Reference;
    date?: string;
    publisher?: string;
    contact?: FHIR.ContactDetail[];
    description?: FHIR.markdown;
    comment?: string[];
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
    library?: any[];
    population?: string | FHIR.Reference;
    exposure?: string | FHIR.Reference;
    exposureAlternative?: string | FHIR.Reference;
    outcome?: string | FHIR.Reference;
    [key: string]: any;
};

export default function(props: Partial<ResearchDefinition_Props>) {
    const resource = {
        resourceType: "ResearchDefinition",
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

    if (!_.isNil(props.population)) {
        resource.population = dt.reference(props.population);
    }

    if (!_.isNil(props.exposure)) {
        resource.exposure = dt.reference(props.exposure);
    }

    if (!_.isNil(props.exposureAlternative)) {
        resource.exposureAlternative = dt.reference(props.exposureAlternative);
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = dt.reference(props.outcome);
    }

    return resource;
}
