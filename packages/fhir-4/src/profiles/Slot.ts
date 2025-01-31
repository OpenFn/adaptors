
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Slot_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    serviceCategory?: CodeableConcept;
    serviceType?: CodeableConcept;
    specialty?: CodeableConcept;
    appointmentType?: CodeableConcept;
    schedule?: Reference;
    status?: string;
    start?: string;
    end?: string;
    overbooked?: boolean;
    comment?: string;
};

export default function(props: Partial<Slot_Props>) {
    const resource = {
        resourceType: "Slot",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Slot</b></p></div>"
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

    if (!_.isNil(props.schedule)) {
        resource.schedule = dt.reference(props.schedule);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.start)) {
        resource.start = props.start;
    }

    if (!_.isNil(props.end)) {
        resource.end = props.end;
    }

    if (!_.isNil(props.overbooked)) {
        resource.overbooked = props.overbooked;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Slot"]
    };

    return resource;
}
