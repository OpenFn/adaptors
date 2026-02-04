
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type AdverseEvent_Props = {
    actuality?: string;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    contained?: any[];
    contributor?: MaybeArray<string | FHIR.Reference>;
    date?: string;
    detected?: string;
    encounter?: string | FHIR.Reference;
    event?: string[] | FHIR.CodeableConcept;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: string | FHIR.Identifier;
    implicitRules?: string;
    language?: string;
    location?: string | FHIR.Reference;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    outcome?: string[] | FHIR.CodeableConcept;
    recordedDate?: string;
    recorder?: string | FHIR.Reference;
    referenceDocument?: MaybeArray<string | FHIR.Reference>;
    resultingCondition?: MaybeArray<string | FHIR.Reference>;
    seriousness?: string[] | FHIR.CodeableConcept;
    severity?: string[] | FHIR.CodeableConcept;
    study?: MaybeArray<string | FHIR.Reference>;
    subject?: string | FHIR.Reference;
    subjectMedicalHistory?: MaybeArray<string | FHIR.Reference>;
    suspectEntity?: FHIR.BackboneElement[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<AdverseEvent_Props>) {
    const resource = {
        resourceType: "AdverseEvent",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.event)) {
        resource.event = dt.concept(props.event);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.resultingCondition)) {
        if (!Array.isArray(props.resultingCondition)) { props.resultingCondition = [props.resultingCondition]; }
        resource.resultingCondition = dt.reference(props.resultingCondition);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.seriousness)) {
        resource.seriousness = dt.concept(props.seriousness);
    }

    if (!_.isNil(props.severity)) {
        resource.severity = dt.concept(props.severity);
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = dt.concept(props.outcome);
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = dt.reference(props.recorder);
    }

    if (!_.isNil(props.contributor)) {
        if (!Array.isArray(props.contributor)) { props.contributor = [props.contributor]; }
        resource.contributor = dt.reference(props.contributor);
    }

    if (!_.isNil(props.suspectEntity)) {
        let src = props.suspectEntity;
        if (!Array.isArray(src)) { src = [src]; }
        resource.suspectEntity = [];

        for (let item of src) {
            let _suspectEntity = {
                ...item
            };

            resource.suspectEntity.push(_suspectEntity);
        }
    }

    if (!_.isNil(props.subjectMedicalHistory)) {
        if (!Array.isArray(props.subjectMedicalHistory)) { props.subjectMedicalHistory = [props.subjectMedicalHistory]; }
        resource.subjectMedicalHistory = dt.reference(props.subjectMedicalHistory);
    }

    if (!_.isNil(props.referenceDocument)) {
        if (!Array.isArray(props.referenceDocument)) { props.referenceDocument = [props.referenceDocument]; }
        resource.referenceDocument = dt.reference(props.referenceDocument);
    }

    if (!_.isNil(props.study)) {
        if (!Array.isArray(props.study)) { props.study = [props.study]; }
        resource.study = dt.reference(props.study);
    }

    return resource;
}
