
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Condition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Condition</b></p></div>"
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

    if (!_.isNil(props.clinicalStatus)) {
        resource.clinicalStatus = props.clinicalStatus;
    }

    if (!_.isNil(props.verificationStatus)) {
        resource.verificationStatus = props.verificationStatus;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.severity)) {
        resource.severity = props.severity;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.onset)) {
        util.composite(resource, "onset", props.onset);
    }

    if (!_.isNil(props.abatement)) {
        util.composite(resource, "abatement", props.abatement);
    }

    if (!_.isNil(props.recordedDate)) {
        resource.recordedDate = props.recordedDate;
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = util.reference(props.recorder);
    }

    if (!_.isNil(props.asserter)) {
        resource.asserter = util.reference(props.asserter);
    }

    if (!_.isNil(props.stage)) {
        let src = props.stage;
        if (!Array.isArray(src)) { src = [src]; }
        resource.stage = [];

        for (let item of src) {
            let _stage = {};

            if (!_.isNil(item.id)) {
                _stage.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _stage.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.summary)) {
                _stage.summary = item.summary;
            }

            if (!_.isNil(item.assessment)) {
                _stage.assessment = item.assessment;
            }

            if (!_.isNil(item.type)) {
                _stage.type = item.type;
            }

            resource.stage.push(_stage);
        }
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

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Condition"]
    };

    return resource;
}
