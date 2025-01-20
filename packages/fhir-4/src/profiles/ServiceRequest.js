
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "ServiceRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ServiceRequest</b></p></div>"
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

    if (!_.isNil(props.replaces)) {
        if (!Array.isArray(props.replaces)) { props.replaces = [props.replaces]; }
        resource.replaces = util.reference(props.replaces);
    }

    if (!_.isNil(props.requisition)) {
        resource.requisition = util.identifier(props.requisition, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
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

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.orderDetail)) {
        resource.orderDetail = props.orderDetail;
    }

    if (!_.isNil(props.quantity)) {
        util.composite(resource, "quantity", props.quantity);
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

    if (!_.isNil(props.asNeeded)) {
        util.composite(resource, "asNeeded", props.asNeeded);
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.requester)) {
        resource.requester = util.reference(props.requester);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = props.performerType;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.locationCode)) {
        resource.locationCode = props.locationCode;
    }

    if (!_.isNil(props.locationReference)) {
        if (!Array.isArray(props.locationReference)) { props.locationReference = [props.locationReference]; }
        resource.locationReference = util.reference(props.locationReference);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = util.reference(props.insurance);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.specimen)) {
        if (!Array.isArray(props.specimen)) { props.specimen = [props.specimen]; }
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.patientInstruction)) {
        resource.patientInstruction = props.patientInstruction;
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = util.reference(props.relevantHistory);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"]
    };

    return resource;
}
