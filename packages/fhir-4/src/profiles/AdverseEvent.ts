
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type AdverseEvent_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    actuality?: string;
    category?: FHIR.CodeableConcept;
    event?: FHIR.CodeableConcept;
    subject?: FHIR.Reference;
    encounter?: FHIR.Reference;
    date?: string;
    detected?: string;
    recordedDate?: string;
    resultingCondition?: FHIR.Reference;
    location?: FHIR.Reference;
    seriousness?: FHIR.CodeableConcept;
    severity?: FHIR.CodeableConcept;
    outcome?: FHIR.CodeableConcept;
    recorder?: FHIR.Reference;
    contributor?: FHIR.Reference;
    suspectEntity?: FHIR.BackboneElement;
    subjectMedicalHistory?: FHIR.Reference;
    referenceDocument?: FHIR.Reference;
    study?: FHIR.Reference;
};

export default function(props: Partial<AdverseEvent_Props>) {
    const resource = {
        resourceType: "AdverseEvent",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AdverseEvent</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AdverseEvent"]
    };

    return resource;
}
