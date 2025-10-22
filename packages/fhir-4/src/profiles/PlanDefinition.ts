
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type PlanDefinition_Props = {
    action?: FHIR.BackboneElement[];
    approvalDate?: string;
    author?: FHIR.ContactDetail[];
    contact?: FHIR.ContactDetail[];
    contained?: any[];
    copyright?: FHIR.markdown;
    date?: string;
    description?: FHIR.markdown;
    editor?: FHIR.ContactDetail[];
    effectivePeriod?: FHIR.Period;
    endorser?: FHIR.ContactDetail[];
    experimental?: boolean;
    extension?: FHIR.Extension[];
    goal?: FHIR.BackboneElement[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    jurisdiction?: MaybeArray<string[] | FHIR.CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    library?: any[];
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    publisher?: string;
    purpose?: FHIR.markdown;
    relatedArtifact?: FHIR.RelatedArtifact[];
    reviewer?: FHIR.ContactDetail[];
    status?: string;
    subject?: string[] | FHIR.CodeableConcept | string | FHIR.Reference | any;
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

export default function(props: Partial<PlanDefinition_Props>) {
    const resource = {
        resourceType: "PlanDefinition",
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

    if (!_.isNil(props.goal)) {
        let src = props.goal;
        if (!Array.isArray(src)) { src = [src]; }
        resource.goal = [];

        for (let item of src) {
            let _goal = {
                ...item
            };

            resource.goal.push(_goal);
        }
    }

    if (!_.isNil(props.action)) {
        let src = props.action;
        if (!Array.isArray(src)) { src = [src]; }
        resource.action = [];

        for (let item of src) {
            let _action = {
                ...item
            };

            resource.action.push(_action);
        }
    }

    return resource;
}
