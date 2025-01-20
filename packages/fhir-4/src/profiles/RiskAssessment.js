
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "RiskAssessment",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RiskAssessment</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.parent)) {
        resource.parent = util.reference(props.parent);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        util.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.condition)) {
        resource.condition = util.reference(props.condition);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.basis)) {
        if (!Array.isArray(props.basis)) { props.basis = [props.basis]; }
        resource.basis = util.reference(props.basis);
    }

    if (!_.isNil(props.prediction)) {
        let src = props.prediction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.prediction = [];

        for (let item of src) {
            let _prediction = {};

            if (!_.isNil(item.id)) {
                _prediction.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _prediction.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.outcome)) {
                _prediction.outcome = item.outcome;
            }

            if (!_.isNil(item.probability)) {
                _prediction.probability = item.probability;
            }

            if (!_.isNil(item.qualitativeRisk)) {
                _prediction.qualitativeRisk = item.qualitativeRisk;
            }

            if (!_.isNil(item.relativeRisk)) {
                _prediction.relativeRisk = item.relativeRisk;
            }

            if (!_.isNil(item.when)) {
                _prediction.when = item.when;
            }

            if (!_.isNil(item.rationale)) {
                _prediction.rationale = item.rationale;
            }

            resource.prediction.push(_prediction);
        }
    }

    if (!_.isNil(props.mitigation)) {
        resource.mitigation = props.mitigation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/RiskAssessment"]
    };

    return resource;
}
