
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ClinicalImpression_Props = {
    assessor?: string | FHIR.Reference;
    code?: string[] | FHIR.CodeableConcept;
    contained?: any[];
    date?: string;
    description?: string;
    effective?: string | FHIR.Period;
    encounter?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    finding?: FHIR.BackboneElement[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    investigation?: FHIR.BackboneElement[];
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    previous?: string | FHIR.Reference;
    problem?: MaybeArray<string | FHIR.Reference>;
    prognosisCodeableConcept?: MaybeArray<string[] | FHIR.CodeableConcept>;
    prognosisReference?: MaybeArray<string | FHIR.Reference>;
    protocol?: string[];
    status?: string;
    statusReason?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    summary?: string;
    supportingInfo?: MaybeArray<string | FHIR.Reference>;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<ClinicalImpression_Props>) {
    const resource = {
        resourceType: "ClinicalImpression",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = dt.concept(props.statusReason);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        delete resource.effective;
        dt.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.assessor)) {
        resource.assessor = dt.reference(props.assessor);
    }

    if (!_.isNil(props.previous)) {
        resource.previous = dt.reference(props.previous);
    }

    if (!_.isNil(props.problem)) {
        if (!Array.isArray(props.problem)) { props.problem = [props.problem]; }
        resource.problem = dt.reference(props.problem);
    }

    if (!_.isNil(props.investigation)) {
        let src = props.investigation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.investigation = [];

        for (let item of src) {
            let _investigation = {
                ...item
            };

            resource.investigation.push(_investigation);
        }
    }

    if (!_.isNil(props.finding)) {
        let src = props.finding;
        if (!Array.isArray(src)) { src = [src]; }
        resource.finding = [];

        for (let item of src) {
            let _finding = {
                ...item
            };

            resource.finding.push(_finding);
        }
    }

    if (!_.isNil(props.prognosisCodeableConcept)) {
        if (!Array.isArray(props.prognosisCodeableConcept)) { props.prognosisCodeableConcept = [props.prognosisCodeableConcept]; }
        resource.prognosisCodeableConcept = dt.concept(props.prognosisCodeableConcept);
    }

    if (!_.isNil(props.prognosisReference)) {
        if (!Array.isArray(props.prognosisReference)) { props.prognosisReference = [props.prognosisReference]; }
        resource.prognosisReference = dt.reference(props.prognosisReference);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = dt.reference(props.supportingInfo);
    }

    return resource;
}
