
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type AdverseEvent_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: string | FHIR.Identifier;
    actuality?: string;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    event?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    date?: string;
    detected?: string;
    recordedDate?: string;
    resultingCondition?: MaybeArray<string | FHIR.Reference>;
    location?: string | FHIR.Reference;
    seriousness?: string[] | FHIR.CodeableConcept;
    severity?: string[] | FHIR.CodeableConcept;
    outcome?: string[] | FHIR.CodeableConcept;
    recorder?: string | FHIR.Reference;
    contributor?: MaybeArray<string | FHIR.Reference>;
    suspectEntity?: FHIR.BackboneElement[];
    subjectMedicalHistory?: MaybeArray<string | FHIR.Reference>;
    referenceDocument?: MaybeArray<string | FHIR.Reference>;
    study?: MaybeArray<string | FHIR.Reference>;
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
