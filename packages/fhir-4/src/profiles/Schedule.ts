
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Schedule_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    active?: boolean;
    serviceCategory?: CodeableConcept;
    serviceType?: CodeableConcept;
    specialty?: CodeableConcept;
    actor?: Reference;
    planningHorizon?: Period;
    comment?: string;
};

export default function(props: Partial<Schedule_Props>) {
    const resource = {
        resourceType: "Schedule",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Schedule</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.actor)) {
        if (!Array.isArray(props.actor)) { props.actor = [props.actor]; }
        resource.actor = dt.reference(props.actor);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Schedule"]
    };

    return resource;
}
