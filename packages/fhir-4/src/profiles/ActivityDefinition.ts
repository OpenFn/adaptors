
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ActivityDefinition_Props = {
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
    subject?: string[] | FHIR.CodeableConcept | string | FHIR.Reference | any;
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
    library?: any[];
    kind?: string;
    profile?: any;
    code?: string[] | FHIR.CodeableConcept;
    intent?: string;
    priority?: string;
    doNotPerform?: boolean;
    timing?: FHIR.Timing | string | FHIR.Age | FHIR.Period | FHIR.Range | FHIR.Duration;
    location?: string | FHIR.Reference;
    participant?: FHIR.BackboneElement[];
    product?: string | FHIR.Reference | string[] | FHIR.CodeableConcept;
    quantity?: FHIR.Quantity;
    dosage?: FHIR.Dosage[];
    bodySite?: MaybeArray<string[] | FHIR.CodeableConcept>;
    specimenRequirement?: MaybeArray<string | FHIR.Reference>;
    observationRequirement?: MaybeArray<string | FHIR.Reference>;
    observationResultRequirement?: MaybeArray<string | FHIR.Reference>;
    transform?: any;
    dynamicValue?: FHIR.BackboneElement[];
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
