
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "MedicationRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationRequest</b></p></div>"
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.doNotPerform)) {
        resource.doNotPerform = props.doNotPerform;
    }

    if (!_.isNil(props.reported)) {
        util.composite(resource, "reported", props.reported);
    }

    if (!_.isNil(props.medication)) {
        util.composite(resource, "medication", props.medication);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = util.reference(props.supportingInformation);
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.requester)) {
        resource.requester = util.reference(props.requester);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = props.performerType;
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = util.reference(props.recorder);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
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

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = util.identifier(props.groupIdentifier, undefined);
    }

    if (!_.isNil(props.courseOfTherapyType)) {
        resource.courseOfTherapyType = props.courseOfTherapyType;
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = util.reference(props.insurance);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.dosageInstruction)) {
        resource.dosageInstruction = props.dosageInstruction;
    }

    if (!_.isNil(props.dispenseRequest)) {
        let src = props.dispenseRequest;
        let _dispenseRequest = {};

        if (!_.isNil(src.id)) {
            _dispenseRequest.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _dispenseRequest.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.initialFill)) {
            _dispenseRequest.initialFill = src.initialFill;
        }

        if (!_.isNil(src.dispenseInterval)) {
            _dispenseRequest.dispenseInterval = src.dispenseInterval;
        }

        if (!_.isNil(src.validityPeriod)) {
            _dispenseRequest.validityPeriod = src.validityPeriod;
        }

        if (!_.isNil(src.numberOfRepeatsAllowed)) {
            _dispenseRequest.numberOfRepeatsAllowed = src.numberOfRepeatsAllowed;
        }

        if (!_.isNil(src.quantity)) {
            _dispenseRequest.quantity = src.quantity;
        }

        if (!_.isNil(src.expectedSupplyDuration)) {
            _dispenseRequest.expectedSupplyDuration = src.expectedSupplyDuration;
        }

        if (!_.isNil(src.performer)) {
            _dispenseRequest.performer = src.performer;
        }

        resource.dispenseRequest = _dispenseRequest;
    }

    if (!_.isNil(props.substitution)) {
        let src = props.substitution;
        let _substitution = {};

        if (!_.isNil(src.id)) {
            _substitution.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _substitution.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.allowed)) {
            _substitution.allowed = src.allowed;
        }

        if (!_.isNil(src.reason)) {
            _substitution.reason = src.reason;
        }

        resource.substitution = _substitution;
    }

    if (!_.isNil(props.priorPrescription)) {
        resource.priorPrescription = util.reference(props.priorPrescription);
    }

    if (!_.isNil(props.detectedIssue)) {
        if (!Array.isArray(props.detectedIssue)) { props.detectedIssue = [props.detectedIssue]; }
        resource.detectedIssue = util.reference(props.detectedIssue);
    }

    if (!_.isNil(props.eventHistory)) {
        if (!Array.isArray(props.eventHistory)) { props.eventHistory = [props.eventHistory]; }
        resource.eventHistory = util.reference(props.eventHistory);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"]
    };

    return resource;
}
