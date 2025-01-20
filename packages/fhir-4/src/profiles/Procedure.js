
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Procedure",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Procedure</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
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

    if (!_.isNil(props.performed)) {
        util.composite(resource, "performed", props.performed);
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = util.reference(props.recorder);
    }

    if (!_.isNil(props.asserter)) {
        resource.asserter = util.reference(props.asserter);
    }

    if (!_.isNil(props.performer)) {
        let src = props.performer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.performer = [];

        for (let item of src) {
            let _performer = {};

            if (!_.isNil(item.id)) {
                _performer.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _performer.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.function)) {
                _performer.function = item.function;
            }

            if (!_.isNil(item.actor)) {
                _performer.actor = item.actor;
            }

            if (!_.isNil(item.onBehalfOf)) {
                _performer.onBehalfOf = item.onBehalfOf;
            }

            resource.performer.push(_performer);
        }
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
    }

    if (!_.isNil(props.report)) {
        if (!Array.isArray(props.report)) { props.report = [props.report]; }
        resource.report = util.reference(props.report);
    }

    if (!_.isNil(props.complication)) {
        resource.complication = props.complication;
    }

    if (!_.isNil(props.complicationDetail)) {
        if (!Array.isArray(props.complicationDetail)) { props.complicationDetail = [props.complicationDetail]; }
        resource.complicationDetail = util.reference(props.complicationDetail);
    }

    if (!_.isNil(props.followUp)) {
        resource.followUp = props.followUp;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.focalDevice)) {
        let src = props.focalDevice;
        if (!Array.isArray(src)) { src = [src]; }
        resource.focalDevice = [];

        for (let item of src) {
            let _focalDevice = {};

            if (!_.isNil(item.id)) {
                _focalDevice.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _focalDevice.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.action)) {
                _focalDevice.action = item.action;
            }

            if (!_.isNil(item.manipulated)) {
                _focalDevice.manipulated = item.manipulated;
            }

            resource.focalDevice.push(_focalDevice);
        }
    }

    if (!_.isNil(props.usedReference)) {
        if (!Array.isArray(props.usedReference)) { props.usedReference = [props.usedReference]; }
        resource.usedReference = util.reference(props.usedReference);
    }

    if (!_.isNil(props.usedCode)) {
        resource.usedCode = props.usedCode;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Procedure"]
    };

    return resource;
}
