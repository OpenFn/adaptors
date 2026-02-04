
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type AppointmentResponse_Props = {
    actor?: string | FHIR.Reference;
    appointment?: string | FHIR.Reference;
    comment?: string;
    contained?: any[];
    end?: string;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    participantStatus?: string;
    participantType?: MaybeArray<string[] | FHIR.CodeableConcept>;
    start?: string;
    text?: FHIR.Narrative;
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

    if (!_.isNil(props.participantType)) {
        if (!Array.isArray(props.participantType)) { props.participantType = [props.participantType]; }
        resource.participantType = dt.concept(props.participantType);
    }

    if (!_.isNil(props.actor)) {
        resource.actor = dt.reference(props.actor);
    }

    return resource;
}
