
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Encounter_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    status?: string;
    statusHistory?: FHIR.BackboneElement;
    class?: FHIR.Coding;
    classHistory?: FHIR.BackboneElement;
    type?: FHIR.CodeableConcept;
    serviceType?: FHIR.CodeableConcept;
    priority?: FHIR.CodeableConcept;
    subject?: FHIR.Reference;
    episodeOfCare?: FHIR.Reference;
    basedOn?: FHIR.Reference;
    participant?: FHIR.BackboneElement;
    appointment?: FHIR.Reference;
    period?: FHIR.Period;
    length?: FHIR.Duration;
    reasonCode?: FHIR.CodeableConcept;
    reasonReference?: FHIR.Reference;
    diagnosis?: FHIR.BackboneElement;
    account?: FHIR.Reference;
    hospitalization?: FHIR.BackboneElement;
    location?: FHIR.BackboneElement;
    serviceProvider?: FHIR.Reference;
    partOf?: FHIR.Reference;
};

export default function(props: Partial<Encounter_Props>) {
    const resource = {
        resourceType: "Encounter",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Encounter</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.statusHistory)) {
        let src = props.statusHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statusHistory = [];

        for (let item of src) {
            let _statusHistory = {
                ...item
            };

            resource.statusHistory.push(_statusHistory);
        }
    }

    if (!_.isNil(props.classHistory)) {
        let src = props.classHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.classHistory = [];

        for (let item of src) {
            let _classHistory = {
                ...item
            };

            resource.classHistory.push(_classHistory);
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.episodeOfCare)) {
        if (!Array.isArray(props.episodeOfCare)) { props.episodeOfCare = [props.episodeOfCare]; }
        resource.episodeOfCare = dt.reference(props.episodeOfCare);
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

    if (!_.isNil(props.appointment)) {
        if (!Array.isArray(props.appointment)) { props.appointment = [props.appointment]; }
        resource.appointment = dt.reference(props.appointment);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.diagnosis)) {
        let src = props.diagnosis;
        if (!Array.isArray(src)) { src = [src]; }
        resource.diagnosis = [];

        for (let item of src) {
            let _diagnosis = {
                ...item
            };

            resource.diagnosis.push(_diagnosis);
        }
    }

    if (!_.isNil(props.account)) {
        if (!Array.isArray(props.account)) { props.account = [props.account]; }
        resource.account = dt.reference(props.account);
    }

    if (!_.isNil(props.hospitalization)) {
        let src = props.hospitalization;

        let _hospitalization = {
            ...item
        };

        resource.hospitalization = _hospitalization;
    }

    if (!_.isNil(props.location)) {
        let src = props.location;
        if (!Array.isArray(src)) { src = [src]; }
        resource.location = [];

        for (let item of src) {
            let _location = {
                ...item
            };

            resource.location.push(_location);
        }
    }

    if (!_.isNil(props.serviceProvider)) {
        resource.serviceProvider = dt.reference(props.serviceProvider);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = dt.reference(props.partOf);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Encounter"]
    };

    return resource;
}
