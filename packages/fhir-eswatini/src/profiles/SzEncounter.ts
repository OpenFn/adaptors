
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Encounter_SzEncounter_Props = {
    account?: Reference[];
    appointment?: Reference[];
    basedOn?: Reference[];
    class?: "OPD" | "IPD" | "CO" | "SO" | "Outpatient Department" | "Inpatient Department" | "Community Outreach" | "Schools Outreach";
    classHistory?: BackboneElement[];
    contained?: any[];
    diagnosis?: BackboneElement[];
    episodeOfCare?: Reference[];
    extension?: Extension[];
    hospitalization?: BackboneElement;
    id?: string;
    identifier?: Identifier[];
    implicitRules?: string;
    language?: string;
    length?: Duration;
    location?: BackboneElement[];
    meta?: Meta;
    modifierExtension?: Extension[];
    partOf?: Reference;
    participant?: BackboneElement[];
    period?: Period;
    priority?: CodeableConcept;
    reasonCode?: CodeableConcept[];
    reasonReference?: Reference[];
    serviceProvider?: Reference;
    serviceType?: CodeableConcept;
    status?: string;
    statusHistory?: BackboneElement[];
    subject?: Reference;
    text?: Narrative;
    type?: CodeableConcept[];
    [key: string]: any;
};

export default function(props: Partial<Encounter_SzEncounter_Props>) {
    const resource = {
        resourceType: "Encounter",

        meta: {
            profile: ["https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzEncounter"]
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

    if (!_.isNil(props.class)) {
        let src = props.class;
        if (typeof src === 'string') {
          src = dt.lookupValue('https://hapifhir.eswatinihie.com/fhir/ValueSet/SzEncounterClassificationVS|0.1.0', src);
         }
        resource.class = dt.coding(src);
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

    if (!_.isNil(props.type)) {
        if (!Array.isArray(props.type)) { props.type = [props.type]; }

        resource.type = props.type.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/encounter-type|4.0.1", x))
        );

        dt.ensureConceptText(resource.type);
    }

    if (!_.isNil(props.serviceType)) {
        resource.serviceType = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/service-type|4.0.1", props.serviceType)
        );

        dt.ensureConceptText(resource.serviceType);
    }

    if (!_.isNil(props.priority)) {
        resource.priority = dt.concept(
            dt.lookupValue("http://terminology.hl7.org/ValueSet/v3-ActPriority|3.0.0", props.priority)
        );

        dt.ensureConceptText(resource.priority);
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

    if (!_.isNil(props.period)) {
        let src = props.period;

        let _period = {
            ...src
        };

        resource.period = _period;
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
            ...src
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

    resource.text = {
      status: 'generated',
      div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">
      <h2>${resource.resourceType}: ${resource.id || '(anon)'}</h2>
</div>`,
    };
    return resource;
}
