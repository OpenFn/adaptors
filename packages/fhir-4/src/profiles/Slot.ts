
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
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.schedule)) {
        resource.schedule = dt.reference(props.schedule);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Slot"]
    };

    return resource;
}
