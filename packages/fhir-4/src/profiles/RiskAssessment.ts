
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type RiskAssessment_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    basedOn?: string | FHIR.Reference;
    parent?: string | FHIR.Reference;
    status?: string;
    method?: string[] | FHIR.CodeableConcept;
    code?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    occurrence?: string | FHIR.Period;
    condition?: string | FHIR.Reference;
    performer?: string | FHIR.Reference;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    basis?: MaybeArray<string | FHIR.Reference>;
    prediction?: FHIR.BackboneElement[];
    mitigation?: string;
    note?: FHIR.Annotation[];
    [key: string]: any;
};

export default function(props: Partial<RiskAssessment_Props>) {
    const resource = {
        resourceType: "RiskAssessment",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.parent)) {
        resource.parent = dt.reference(props.parent);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        delete resource.occurrence;
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.condition)) {
        resource.condition = dt.reference(props.condition);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.basis)) {
        if (!Array.isArray(props.basis)) { props.basis = [props.basis]; }
        resource.basis = dt.reference(props.basis);
    }

    if (!_.isNil(props.prediction)) {
        let src = props.prediction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.prediction = [];

        for (let item of src) {
            let _prediction = {
                ...item
            };

            resource.prediction.push(_prediction);
        }
    }

    return resource;
}
