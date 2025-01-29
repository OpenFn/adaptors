
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type AdverseEvent_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    actuality?: any;
    category?: any;
    event?: any;
    subject?: any;
    encounter?: any;
    date?: any;
    detected?: any;
    recordedDate?: any;
    resultingCondition?: any;
    location?: any;
    seriousness?: any;
    severity?: any;
    outcome?: any;
    recorder?: any;
    contributor?: any;
    suspectEntity?: any;
    subjectMedicalHistory?: any;
    referenceDocument?: any;
    study?: any;
};

export default function(props: Partial<AdverseEvent_Props>) {
    const resource = {
        resourceType: "AdverseEvent",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AdverseEvent</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.implicitRules)) {
        resource.implicitRules = props.implicitRules;
    }

    if (!_.isNil(props.language)) {
        resource.language = props.language;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.contained)) {
        resource.contained = props.contained;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.identifier)) {
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.actuality)) {
        resource.actuality = props.actuality;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.event)) {
        resource.event = props.event;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.detected)) {
        resource.detected = props.detected;
    }

    if (!_.isNil(props.recordedDate)) {
        resource.recordedDate = props.recordedDate;
    }

    if (!_.isNil(props.resultingCondition)) {
        if (!Array.isArray(props.resultingCondition)) { props.resultingCondition = [props.resultingCondition]; }
        resource.resultingCondition = dt.reference(props.resultingCondition);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.seriousness)) {
        resource.seriousness = props.seriousness;
    }

    if (!_.isNil(props.severity)) {
        resource.severity = props.severity;
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
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
            let _suspectEntity = {};

            if (!_.isNil(item.id)) {
                _suspectEntity.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _suspectEntity.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.instance)) {
                _suspectEntity.instance = item.instance;
            }

            if (!_.isNil(item.causality)) {
                _suspectEntity.causality = item.causality;
            }

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
