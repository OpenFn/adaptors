
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ClinicalImpression_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    status?: string;
    statusReason?: string[] | FHIR.CodeableConcept;
    code?: string[] | FHIR.CodeableConcept;
    description?: string;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    effective?: string | FHIR.Period;
    date?: string;
    assessor?: string | FHIR.Reference;
    previous?: string | FHIR.Reference;
    problem?: MaybeArray<string | FHIR.Reference>;
    investigation?: FHIR.BackboneElement[];
    protocol?: string[];
    summary?: string;
    finding?: FHIR.BackboneElement[];
    prognosisCodeableConcept?: MaybeArray<string[] | FHIR.CodeableConcept>;
    prognosisReference?: MaybeArray<string | FHIR.Reference>;
    supportingInfo?: MaybeArray<string | FHIR.Reference>;
    note?: FHIR.Annotation[];
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
