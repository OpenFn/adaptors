
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Appointment_Props = {
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
    cancelationReason?: CodeableConcept;
    serviceCategory?: CodeableConcept;
    serviceType?: CodeableConcept;
    specialty?: CodeableConcept;
    appointmentType?: CodeableConcept;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    priority?: number;
    description?: string;
    supportingInformation?: Reference;
    start?: string;
    end?: string;
    minutesDuration?: number;
    slot?: Reference;
    created?: string;
    comment?: string;
    patientInstruction?: string;
    basedOn?: Reference;
    participant?: BackboneElement;
    requestedPeriod?: Period;
};

export default function(props: Partial<Appointment_Props>) {
    const resource = {
        resourceType: "Appointment",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Appointment</b></p></div>"
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

    if (!_.isNil(props.cancelationReason)) {
        resource.cancelationReason = props.cancelationReason;
    }

    if (!_.isNil(props.serviceCategory)) {
        resource.serviceCategory = props.serviceCategory;
    }

    if (!_.isNil(props.serviceType)) {
        resource.serviceType = props.serviceType;
    }

    if (!_.isNil(props.specialty)) {
        resource.specialty = props.specialty;
    }

    if (!_.isNil(props.appointmentType)) {
        resource.appointmentType = props.appointmentType;
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = dt.reference(props.supportingInformation);
    }

    if (!_.isNil(props.start)) {
        resource.start = props.start;
    }

    if (!_.isNil(props.end)) {
        resource.end = props.end;
    }

    if (!_.isNil(props.minutesDuration)) {
        resource.minutesDuration = props.minutesDuration;
    }

    if (!_.isNil(props.slot)) {
        if (!Array.isArray(props.slot)) { props.slot = [props.slot]; }
        resource.slot = dt.reference(props.slot);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    if (!_.isNil(props.patientInstruction)) {
        resource.patientInstruction = props.patientInstruction;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (let item of src) {
            let _participant = {};

            if (!_.isNil(item.id)) {
                _participant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _participant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _participant.type = item.type;
            }

            if (!_.isNil(item.actor)) {
                _participant.actor = item.actor;
            }

            if (!_.isNil(item.required)) {
                _participant.required = item.required;
            }

            if (!_.isNil(item.status)) {
                _participant.status = item.status;
            }

            if (!_.isNil(item.period)) {
                _participant.period = item.period;
            }

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.requestedPeriod)) {
        resource.requestedPeriod = props.requestedPeriod;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Appointment"]
    };

    return resource;
}
