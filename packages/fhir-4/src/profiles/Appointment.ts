
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Appointment_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: FHIR.Identifier[];
    status?: string;
    cancelationReason?: FHIR.CodeableConcept;
    serviceCategory?: FHIR.CodeableConcept[];
    serviceType?: FHIR.CodeableConcept[];
    specialty?: FHIR.CodeableConcept[];
    appointmentType?: FHIR.CodeableConcept;
    reasonCode?: FHIR.CodeableConcept[];
    reasonReference?: FHIR.Reference[];
    priority?: number;
    description?: string;
    supportingInformation?: FHIR.Reference[];
    start?: string;
    end?: string;
    minutesDuration?: number;
    slot?: FHIR.Reference[];
    created?: string;
    comment?: string;
    patientInstruction?: string;
    basedOn?: FHIR.Reference[];
    participant?: FHIR.BackboneElement[];
    requestedPeriod?: FHIR.Period[];
    initialiser?: any;
};

export default function(props: Partial<Appointment_Props>) {
    const resource = {
        resourceType: "Appointment",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = dt.reference(props.supportingInformation);
    }

    if (!_.isNil(props.slot)) {
        if (!Array.isArray(props.slot)) { props.slot = [props.slot]; }
        resource.slot = dt.reference(props.slot);
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
            let _participant = {
                ...item
            };

            resource.participant.push(_participant);
        }
    }

    return resource;
}
