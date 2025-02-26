
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type AppointmentResponse_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    appointment?: string | FHIR.Reference;
    start?: string;
    end?: string;
    participantType?: MaybeArray<string[] | FHIR.CodeableConcept>;
    actor?: string | FHIR.Reference;
    participantStatus?: string;
    comment?: string;
    [key: string]: any;
};

export default function(props: Partial<AppointmentResponse_Props>) {
    const resource = {
        resourceType: "AppointmentResponse",
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

    return resource;
}
