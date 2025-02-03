
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type AdverseEvent_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    actuality?: string;
    category?: CodeableConcept;
    event?: CodeableConcept;
    subject?: Reference;
    encounter?: Reference;
    date?: string;
    detected?: string;
    recordedDate?: string;
    resultingCondition?: Reference;
    location?: Reference;
    seriousness?: CodeableConcept;
    severity?: CodeableConcept;
    outcome?: CodeableConcept;
    recorder?: Reference;
    contributor?: Reference;
    suspectEntity?: BackboneElement;
    subjectMedicalHistory?: Reference;
    referenceDocument?: Reference;
    study?: Reference;
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
