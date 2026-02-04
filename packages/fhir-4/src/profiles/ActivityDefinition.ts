
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ActivityDefinition_Props = {
    approvalDate?: string;
    author?: FHIR.ContactDetail[];
    bodySite?: MaybeArray<string[] | FHIR.CodeableConcept>;
    code?: string[] | FHIR.CodeableConcept;
    contact?: FHIR.ContactDetail[];
    contained?: any[];
    copyright?: FHIR.markdown;
    date?: string;
    description?: FHIR.markdown;
    doNotPerform?: boolean;
    dosage?: FHIR.Dosage[];
    dynamicValue?: FHIR.BackboneElement[];
    editor?: FHIR.ContactDetail[];
    effectivePeriod?: FHIR.Period;
    endorser?: FHIR.ContactDetail[];
    experimental?: boolean;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    intent?: string;
    jurisdiction?: MaybeArray<string[] | FHIR.CodeableConcept>;
    kind?: string;
    language?: string;
    lastReviewDate?: string;
    library?: any[];
    location?: string | FHIR.Reference;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    observationRequirement?: MaybeArray<string | FHIR.Reference>;
    observationResultRequirement?: MaybeArray<string | FHIR.Reference>;
    participant?: FHIR.BackboneElement[];
    priority?: string;
    product?: string | FHIR.Reference | string[] | FHIR.CodeableConcept;
    profile?: any;
    publisher?: string;
    purpose?: FHIR.markdown;
    quantity?: FHIR.Quantity;
    relatedArtifact?: FHIR.RelatedArtifact[];
    reviewer?: FHIR.ContactDetail[];
    specimenRequirement?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    subject?: string[] | FHIR.CodeableConcept | string | FHIR.Reference | any;
    subtitle?: string;
    text?: FHIR.Narrative;
    timing?: FHIR.Timing | string | FHIR.Age | FHIR.Period | FHIR.Range | FHIR.Duration;
    title?: string;
    topic?: MaybeArray<string[] | FHIR.CodeableConcept>;
    transform?: any;
    url?: string;
    usage?: string;
    useContext?: FHIR.UsageContext[];
    version?: string;
    [key: string]: any;
};

export default function(props: Partial<ActivityDefinition_Props>) {
    const resource = {
        resourceType: "ActivityDefinition",
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

    if (!_.isNil(props.jurisdiction)) {
        if (!Array.isArray(props.jurisdiction)) { props.jurisdiction = [props.jurisdiction]; }
        resource.jurisdiction = dt.concept(props.jurisdiction);
    }

    if (!_.isNil(props.topic)) {
        if (!Array.isArray(props.topic)) { props.topic = [props.topic]; }
        resource.topic = dt.concept(props.topic);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.timing)) {
        delete resource.timing;
        dt.composite(resource, "timing", props.timing);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (let item of src) {
            let _participant = {
                ...item
            };

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.product)) {
        delete resource.product;
        dt.composite(resource, "product", props.product);
    }

    if (!_.isNil(props.bodySite)) {
        if (!Array.isArray(props.bodySite)) { props.bodySite = [props.bodySite]; }
        resource.bodySite = dt.concept(props.bodySite);
    }

    if (!_.isNil(props.specimenRequirement)) {
        if (!Array.isArray(props.specimenRequirement)) { props.specimenRequirement = [props.specimenRequirement]; }
        resource.specimenRequirement = dt.reference(props.specimenRequirement);
    }

    if (!_.isNil(props.observationRequirement)) {
        if (!Array.isArray(props.observationRequirement)) { props.observationRequirement = [props.observationRequirement]; }
        resource.observationRequirement = dt.reference(props.observationRequirement);
    }

    if (!_.isNil(props.observationResultRequirement)) {
        if (!Array.isArray(props.observationResultRequirement)) { props.observationResultRequirement = [props.observationResultRequirement]; }
        resource.observationResultRequirement = dt.reference(props.observationResultRequirement);
    }

    if (!_.isNil(props.dynamicValue)) {
        let src = props.dynamicValue;
        if (!Array.isArray(src)) { src = [src]; }
        resource.dynamicValue = [];

        for (let item of src) {
            let _dynamicValue = {
                ...item
            };

            resource.dynamicValue.push(_dynamicValue);
        }
    }

    return resource;
}
