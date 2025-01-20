
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "AppointmentResponse",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AppointmentResponse</b></p></div>"
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

    if (!_.isNil(props.appointment)) {
        resource.appointment = util.reference(props.appointment);
    }

    if (!_.isNil(props.start)) {
        resource.start = props.start;
    }

    if (!_.isNil(props.end)) {
        resource.end = props.end;
    }

    if (!_.isNil(props.participantType)) {
        resource.participantType = props.participantType;
    }

    if (!_.isNil(props.actor)) {
        resource.actor = util.reference(props.actor);
    }

    if (!_.isNil(props.participantStatus)) {
        resource.participantStatus = props.participantStatus;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AppointmentResponse"]
    };

    return resource;
}
