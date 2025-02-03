
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type AppointmentResponse_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    appointment?: Reference;
    start?: string;
    end?: string;
    participantType?: CodeableConcept;
    actor?: Reference;
    participantStatus?: string;
    comment?: string;
};

export default function(props: Partial<AppointmentResponse_Props>) {
    const resource = {
        resourceType: "AppointmentResponse",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AppointmentResponse</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.appointment)) {
        resource.appointment = dt.reference(props.appointment);
    }

    if (!_.isNil(props.actor)) {
        resource.actor = dt.reference(props.actor);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AppointmentResponse"]
    };

    return resource;
}
