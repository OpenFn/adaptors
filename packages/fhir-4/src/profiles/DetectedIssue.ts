
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type DetectedIssue_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    status?: string;
    code?: CodeableConcept;
    severity?: string;
    patient?: Reference;
    identified?: string;
    author?: Reference;
    implicated?: Reference;
    evidence?: BackboneElement;
    detail?: string;
    reference?: string;
    mitigation?: BackboneElement;
};

export default function(props: Partial<DetectedIssue_Props>) {
    const resource = {
        resourceType: "DetectedIssue",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DetectedIssue</b></p></div>"
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

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.severity)) {
        resource.severity = props.severity;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.identified)) {
        dt.composite(resource, "identified", props.identified);
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.implicated)) {
        if (!Array.isArray(props.implicated)) { props.implicated = [props.implicated]; }
        resource.implicated = dt.reference(props.implicated);
    }

    if (!_.isNil(props.evidence)) {
        let src = props.evidence;
        if (!Array.isArray(src)) { src = [src]; }
        resource.evidence = [];

        for (let item of src) {
            let _evidence = {};

            if (!_.isNil(item.id)) {
                _evidence.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _evidence.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _evidence.code = item.code;
            }

            if (!_.isNil(item.detail)) {
                _evidence.detail = item.detail;
            }

            resource.evidence.push(_evidence);
        }
    }

    if (!_.isNil(props.detail)) {
        resource.detail = props.detail;
    }

    if (!_.isNil(props.reference)) {
        resource.reference = props.reference;
    }

    if (!_.isNil(props.mitigation)) {
        let src = props.mitigation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.mitigation = [];

        for (let item of src) {
            let _mitigation = {};

            if (!_.isNil(item.id)) {
                _mitigation.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _mitigation.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.action)) {
                _mitigation.action = item.action;
            }

            if (!_.isNil(item.date)) {
                _mitigation.date = item.date;
            }

            if (!_.isNil(item.author)) {
                _mitigation.author = item.author;
            }

            resource.mitigation.push(_mitigation);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DetectedIssue"]
    };

    return resource;
}
