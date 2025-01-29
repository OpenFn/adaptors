
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type ClinicalImpression_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    status?: any;
    statusReason?: any;
    code?: any;
    description?: any;
    subject?: any;
    encounter?: any;
    effective?: any;
    date?: any;
    assessor?: any;
    previous?: any;
    problem?: any;
    investigation?: any;
    protocol?: any;
    summary?: any;
    finding?: any;
    prognosisCodeableConcept?: any;
    prognosisReference?: any;
    supportingInfo?: any;
    note?: any;
};

export default function(props: Partial<ClinicalImpression_Props>) {
    const resource = {
        resourceType: "ClinicalImpression",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ClinicalImpression</b></p></div>"
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
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        dt.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
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
            let _investigation = {};

            if (!_.isNil(item.id)) {
                _investigation.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _investigation.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _investigation.code = item.code;
            }

            if (!_.isNil(item.item)) {
                _investigation.item = item.item;
            }

            resource.investigation.push(_investigation);
        }
    }

    if (!_.isNil(props.protocol)) {
        resource.protocol = props.protocol;
    }

    if (!_.isNil(props.summary)) {
        resource.summary = props.summary;
    }

    if (!_.isNil(props.finding)) {
        let src = props.finding;
        if (!Array.isArray(src)) { src = [src]; }
        resource.finding = [];

        for (let item of src) {
            let _finding = {};

            if (!_.isNil(item.id)) {
                _finding.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _finding.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.itemCodeableConcept)) {
                _finding.itemCodeableConcept = item.itemCodeableConcept;
            }

            if (!_.isNil(item.itemReference)) {
                _finding.itemReference = item.itemReference;
            }

            if (!_.isNil(item.basis)) {
                _finding.basis = item.basis;
            }

            resource.finding.push(_finding);
        }
    }

    if (!_.isNil(props.prognosisCodeableConcept)) {
        resource.prognosisCodeableConcept = props.prognosisCodeableConcept;
    }

    if (!_.isNil(props.prognosisReference)) {
        if (!Array.isArray(props.prognosisReference)) { props.prognosisReference = [props.prognosisReference]; }
        resource.prognosisReference = dt.reference(props.prognosisReference);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = dt.reference(props.supportingInfo);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ClinicalImpression"]
    };

    return resource;
}
