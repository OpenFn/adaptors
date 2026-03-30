
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

        meta: {
            profile: ["https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzAppointment"]
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.cancelationReason)) {
        resource.cancelationReason = dt.concept(dt.lookupValue(
            "http://hl7.org/fhir/ValueSet/appointment-cancellation-reason|4.0.1",
            props.cancelationReason
        ));

        dt.ensureConceptText(resource.cancelationReason);
    }

    if (!_.isNil(props.serviceCategory)) {
        if (!Array.isArray(props.serviceCategory)) { props.serviceCategory = [props.serviceCategory]; }

        resource.serviceCategory = props.serviceCategory.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/service-category|4.0.1", x))
        );

        dt.ensureConceptText(resource.serviceCategory);
    }

    if (!_.isNil(props.serviceType)) {
        if (!Array.isArray(props.serviceType)) { props.serviceType = [props.serviceType]; }

        resource.serviceType = props.serviceType.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/service-type|4.0.1", x))
        );

        dt.ensureConceptText(resource.serviceType);
    }

    if (!_.isNil(props.specialty)) {
        if (!Array.isArray(props.specialty)) { props.specialty = [props.specialty]; }

        resource.specialty = props.specialty.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/c80-practice-codes|4.0.1", x))
        );

        dt.ensureConceptText(resource.specialty);
    }

    if (!_.isNil(props.appointmentType)) {
        resource.appointmentType = dt.concept(
            dt.lookupValue("http://terminology.hl7.org/ValueSet/v2-0276", props.appointmentType)
        );

        dt.ensureConceptText(resource.appointmentType);
    }

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }

        resource.reasonCode = props.reasonCode.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/encounter-reason|4.0.1", x))
        );

        dt.ensureConceptText(resource.reasonCode);
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

    resource.text = {
      status: 'generated',
      div: `
<div xmlns=\"http://www.w3.org/1999/xhtml\">
      <h2>${resource.resourceType}: ${resource.id}</h2>
</div>`,
    };
    return resource;
}
