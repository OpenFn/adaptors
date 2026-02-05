
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Appointment_SzAppointment_Props = {
    appointmentType?: FHIR.CodeableConcept;
    basedOn?: FHIR.Reference[];
    cancelationReason?: FHIR.CodeableConcept;
    comment?: string;
    contained?: any[];
    created?: string;
    description?: string;
    end?: string;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    minutesDuration?: number;
    modifierExtension?: FHIR.Extension[];
    participant?: FHIR.BackboneElement[];
    patientInstruction?: string;
    priority?: number;
    reasonCode?: FHIR.CodeableConcept[];
    reasonReference?: FHIR.Reference[];
    requestedPeriod?: FHIR.Period[];
    serviceCategory?: FHIR.CodeableConcept[];
    serviceType?: FHIR.CodeableConcept[];
    slot?: FHIR.Reference[];
    specialty?: FHIR.CodeableConcept[];
    start?: string;
    status?: string;
    supportingInformation?: FHIR.Reference[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<Appointment_SzAppointment_Props>) {
    const resource = {
        resourceType: "Appointment",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.cancelationReason)) {
        resource.cancelationReason = dt.concept(props.cancelationReason);
    }

    if (!_.isNil(props.serviceCategory)) {
        if (!Array.isArray(props.serviceCategory)) { props.serviceCategory = [props.serviceCategory]; }
        resource.serviceCategory = dt.concept(props.serviceCategory);
    }

    if (!_.isNil(props.serviceType)) {
        if (!Array.isArray(props.serviceType)) { props.serviceType = [props.serviceType]; }
        resource.serviceType = dt.concept(props.serviceType);
    }

    if (!_.isNil(props.specialty)) {
        if (!Array.isArray(props.specialty)) { props.specialty = [props.specialty]; }
        resource.specialty = dt.concept(props.specialty);
    }

    if (!_.isNil(props.appointmentType)) {
        resource.appointmentType = dt.concept(props.appointmentType);
    }

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }
        resource.reasonCode = dt.concept(props.reasonCode);
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

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
