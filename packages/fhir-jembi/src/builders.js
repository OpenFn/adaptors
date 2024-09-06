
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import { builders } from "./Utils.js";
import _ from "lodash";

export function encounter(type, props) {
    const mappings = {
        "entry-from-outside-target-facility-encounter": encounter_entry_from_outside_target_facility_encounter,
        "target-facility-encounter": encounter_target_facility_encounter
    };

    return mappings[type](props)
}

function encounter_entry_from_outside_target_facility_encounter(props) {
    const resource = {
        resourceType: "Encounter"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusHistory)) {
        let src = props.statusHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statusHistory = [];

        for (const item of src) {
            const statusHistory = {};

            if (!_.isNil(item.id)) {
                statusHistory.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                statusHistory.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.status)) {
                statusHistory.status = item.status;
            }

            if (!_.isNil(item.period)) {
                statusHistory.period = item.period;
            }

            resource.statusHistory.push(statusHistory);
        }
    }

    if (!_.isNil(props.class)) {
        resource.class = props.class;
    }

    if (!_.isNil(props.classHistory)) {
        let src = props.classHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.classHistory = [];

        for (const item of src) {
            const classHistory = {};

            if (!_.isNil(item.id)) {
                classHistory.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                classHistory.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.class)) {
                classHistory.class = item.class;
            }

            if (!_.isNil(item.period)) {
                classHistory.period = item.period;
            }

            resource.classHistory.push(classHistory);
        }
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.serviceType)) {
        resource.serviceType = props.serviceType;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.episodeOfCare)) {
        resource.episodeOfCare = props.episodeOfCare;
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (const item of src) {
            const participant = {};

            if (!_.isNil(item.id)) {
                participant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                participant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                participant.type = item.type;
            }

            if (!_.isNil(item.period)) {
                participant.period = item.period;
            }

            if (!_.isNil(item.individual)) {
                participant.individual = item.individual;
            }

            resource.participant.push(participant);
        }
    }

    if (!_.isNil(props.appointment)) {
        resource.appointment = props.appointment;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.length)) {
        resource.length = props.length;
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        resource.reasonReference = props.reasonReference;
    }

    if (!_.isNil(props.diagnosis)) {
        let src = props.diagnosis;
        if (!Array.isArray(src)) { src = [src]; }
        resource.diagnosis = [];

        for (const item of src) {
            const diagnosis = {};

            if (!_.isNil(item.id)) {
                diagnosis.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                diagnosis.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.condition)) {
                diagnosis.condition = item.condition;
            }

            if (!_.isNil(item.use)) {
                diagnosis.use = item.use;
            }

            if (!_.isNil(item.rank)) {
                diagnosis.rank = item.rank;
            }

            resource.diagnosis.push(diagnosis);
        }
    }

    if (!_.isNil(props.account)) {
        resource.account = props.account;
    }

    if (!_.isNil(props.hospitalization)) {
        let src = props.hospitalization;
        const hospitalization = {};

        if (!_.isNil(src.id)) {
            hospitalization.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            hospitalization.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.preAdmissionIdentifier)) {
            hospitalization.preAdmissionIdentifier = src.preAdmissionIdentifier;
        }

        if (!_.isNil(src.origin)) {
            hospitalization.origin = src.origin;
        }

        if (!_.isNil(src.admitSource)) {
            hospitalization.admitSource = src.admitSource;
        }

        if (!_.isNil(src.reAdmission)) {
            hospitalization.reAdmission = src.reAdmission;
        }

        if (!_.isNil(src.dietPreference)) {
            hospitalization.dietPreference = src.dietPreference;
        }

        if (!_.isNil(src.specialCourtesy)) {
            hospitalization.specialCourtesy = src.specialCourtesy;
        }

        if (!_.isNil(src.specialArrangement)) {
            hospitalization.specialArrangement = src.specialArrangement;
        }

        if (!_.isNil(src.destination)) {
            hospitalization.destination = src.destination;
        }

        if (!_.isNil(src.dischargeDisposition)) {
            hospitalization.dischargeDisposition = src.dischargeDisposition;
        }
    }

    if (!_.isNil(props.location)) {
        let src = props.location;
        if (!Array.isArray(src)) { src = [src]; }
        resource.location = [];

        for (const item of src) {
            const location = {};

            if (!_.isNil(item.id)) {
                location.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                location.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.location)) {
                location.location = item.location;
            }

            if (!_.isNil(item.status)) {
                location.status = item.status;
            }

            if (!_.isNil(item.physicalType)) {
                location.physicalType = item.physicalType;
            }

            if (!_.isNil(item.period)) {
                location.period = item.period;
            }

            resource.location.push(location);
        }
    }

    if (!_.isNil(props.serviceProvider)) {
        resource.serviceProvider = props.serviceProvider;
    } else {
        resource.serviceProvider = {"reference":"Organization/Patient.managingOrganization"};
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/entry-from-outside-target-facility-encounter"
        ]
    };

    return resource;
}

function encounter_target_facility_encounter(props) {
    const resource = {
        resourceType: "Encounter"
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
        let src = props.identifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.identifier = [];

        for (const item of src) {
            const identifier = {};

            if (!_.isNil(item.id)) {
                identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                identifier.assigner = item.assigner;
            }

            resource.identifier.push(identifier);
        }
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusHistory)) {
        let src = props.statusHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statusHistory = [];

        for (const item of src) {
            const statusHistory = {};

            if (!_.isNil(item.id)) {
                statusHistory.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                statusHistory.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.status)) {
                statusHistory.status = item.status;
            }

            if (!_.isNil(item.period)) {
                statusHistory.period = item.period;
            }

            resource.statusHistory.push(statusHistory);
        }
    }

    if (!_.isNil(props.class)) {
        resource.class = props.class;
    }

    if (!_.isNil(props.classHistory)) {
        let src = props.classHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.classHistory = [];

        for (const item of src) {
            const classHistory = {};

            if (!_.isNil(item.id)) {
                classHistory.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                classHistory.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.class)) {
                classHistory.class = item.class;
            }

            if (!_.isNil(item.period)) {
                classHistory.period = item.period;
            }

            resource.classHistory.push(classHistory);
        }
    }

    if (!_.isNil(props.type)) {
        let src = props.type;
        if (!Array.isArray(src)) { src = [src]; }
        resource.type = [];

        for (const item of src) {
            const type = {};

            if (!_.isNil(item.id)) {
                type.id = item.id;
            }

            if (!_.isNil(item.visitType)) {
                builders.addExtension(
                    type,
                    "http://moh.gov.et/fhir/hiv/StructureDefinition/encounter-visit-type",
                    item.visitType
                );
            }

            if (!_.isNil(item.coding)) {
                type.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                type.text = item.text;
            }

            resource.type.push(type);
        }
    }

    if (!_.isNil(props.serviceType)) {
        resource.serviceType = props.serviceType;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.episodeOfCare)) {
        resource.episodeOfCare = props.episodeOfCare;
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (const item of src) {
            const participant = {};

            if (!_.isNil(item.id)) {
                participant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                participant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                participant.type = item.type;
            }

            if (!_.isNil(item.period)) {
                participant.period = item.period;
            }

            if (!_.isNil(item.individual)) {
                participant.individual = item.individual;
            }

            resource.participant.push(participant);
        }
    }

    if (!_.isNil(props.appointment)) {
        resource.appointment = props.appointment;
    }

    if (!_.isNil(props.period)) {
        let src = props.period;
        const period = {};

        if (!_.isNil(src.id)) {
            period.id = src.id;
        }

        if (!_.isNil(src.start)) {
            period.start = src.start;
        }

        if (!_.isNil(src.end)) {
            period.end = src.end;
        }
    }

    if (!_.isNil(props.length)) {
        resource.length = props.length;
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        resource.reasonReference = props.reasonReference;
    }

    if (!_.isNil(props.diagnosis)) {
        let src = props.diagnosis;
        if (!Array.isArray(src)) { src = [src]; }
        resource.diagnosis = [];

        for (const item of src) {
            const diagnosis = {};

            if (!_.isNil(item.id)) {
                diagnosis.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                diagnosis.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.condition)) {
                diagnosis.condition = item.condition;
            }

            if (!_.isNil(item.use)) {
                diagnosis.use = item.use;
            }

            if (!_.isNil(item.rank)) {
                diagnosis.rank = item.rank;
            }

            resource.diagnosis.push(diagnosis);
        }
    }

    if (!_.isNil(props.account)) {
        resource.account = props.account;
    }

    if (!_.isNil(props.hospitalization)) {
        let src = props.hospitalization;
        const hospitalization = {};

        if (!_.isNil(src.id)) {
            hospitalization.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            hospitalization.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.preAdmissionIdentifier)) {
            hospitalization.preAdmissionIdentifier = src.preAdmissionIdentifier;
        }

        if (!_.isNil(src.origin)) {
            hospitalization.origin = src.origin;
        }

        if (!_.isNil(src.admitSource)) {
            hospitalization.admitSource = src.admitSource;
        }

        if (!_.isNil(src.reAdmission)) {
            hospitalization.reAdmission = src.reAdmission;
        }

        if (!_.isNil(src.dietPreference)) {
            hospitalization.dietPreference = src.dietPreference;
        }

        if (!_.isNil(src.specialCourtesy)) {
            hospitalization.specialCourtesy = src.specialCourtesy;
        }

        if (!_.isNil(src.specialArrangement)) {
            hospitalization.specialArrangement = src.specialArrangement;
        }

        if (!_.isNil(src.destination)) {
            hospitalization.destination = src.destination;
        }

        if (!_.isNil(src.dischargeDisposition)) {
            hospitalization.dischargeDisposition = src.dischargeDisposition;
        }
    }

    if (!_.isNil(props.location)) {
        let src = props.location;
        if (!Array.isArray(src)) { src = [src]; }
        resource.location = [];

        for (const item of src) {
            const location = {};

            if (!_.isNil(item.id)) {
                location.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                location.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.location)) {
                location.location = item.location;
            }

            if (!_.isNil(item.status)) {
                location.status = item.status;
            }

            if (!_.isNil(item.physicalType)) {
                location.physicalType = item.physicalType;
            }

            if (!_.isNil(item.period)) {
                location.period = item.period;
            }

            resource.location.push(location);
        }
    }

    if (!_.isNil(props.serviceProvider)) {
        resource.serviceProvider = props.serviceProvider;
    } else {
        resource.serviceProvider = {"reference":"Organization/Patient.managingOrganization"};
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/target-facility-encounter"]
    };

    return resource;
}

export function patient(type, props) {
    const mappings = {
        "patient": patient_patient
    };

    return mappings[type](props)
}

function patient_patient(props) {
    const resource = {
        resourceType: "Patient"
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
        let src = props.identifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.identifier = [];

        for (const item of src) {
            const identifier = {};

            if (!_.isNil(item.id)) {
                identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                identifier.assigner = item.assigner;
            }

            resource.identifier.push(identifier);
        }
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (const item of src) {
            const name = {};

            if (!_.isNil(item.id)) {
                name.id = item.id;
            }

            if (!_.isNil(item.use)) {
                name.use = item.use;
            }

            if (!_.isNil(item.text)) {
                name.text = item.text;
            }

            if (!_.isNil(item.family)) {
                name.family = item.family;
            }

            if (!_.isNil(item.given)) {
                name.given = item.given;
            }

            if (!_.isNil(item.prefix)) {
                name.prefix = item.prefix;
            }

            if (!_.isNil(item.suffix)) {
                name.suffix = item.suffix;
            }

            if (!_.isNil(item.period)) {
                name.period = item.period;
            }

            resource.name.push(name);
        }
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.gender)) {
        resource.gender = props.gender;
    }

    if (!_.isNil(props.birthDate)) {
        resource.birthDate = props.birthDate;
    }

    if (!_.isNil(props.address)) {
        let src = props.address;
        if (!Array.isArray(src)) { src = [src]; }
        resource.address = [];

        for (const item of src) {
            const address = {};

            if (!_.isNil(item.id)) {
                address.id = item.id;
            }

            if (!_.isNil(item.residentialType)) {
                builders.addExtension(
                    address,
                    "http://moh.gov.et/fhir/hiv/StructureDefinition/residential-type",
                    item.residentialType
                );
            }

            if (!_.isNil(item.use)) {
                address.use = item.use;
            }

            if (!_.isNil(item.type)) {
                address.type = item.type;
            }

            if (!_.isNil(item.text)) {
                address.text = item.text;
            }

            if (!_.isNil(item.line)) {
                address.line = item.line;
            }

            if (!_.isNil(item.city)) {
                address.city = item.city;
            }

            if (!_.isNil(item.district)) {
                address.district = item.district;
            }

            if (!_.isNil(item.state)) {
                address.state = item.state;
            }

            if (!_.isNil(item.postalCode)) {
                address.postalCode = item.postalCode;
            }

            if (!_.isNil(item.country)) {
                address.country = item.country;
            }

            if (!_.isNil(item.period)) {
                address.period = item.period;
            }

            resource.address.push(address);
        }
    }

    if (!_.isNil(props.maritalStatus)) {
        resource.maritalStatus = props.maritalStatus;
    }

    if (!_.isNil(props.photo)) {
        resource.photo = props.photo;
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (const item of src) {
            const contact = {};

            if (!_.isNil(item.id)) {
                contact.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                contact.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.relationship)) {
                contact.relationship = item.relationship;
            }

            if (!_.isNil(item.name)) {
                contact.name = item.name;
            }

            if (!_.isNil(item.telecom)) {
                contact.telecom = item.telecom;
            }

            if (!_.isNil(item.address)) {
                contact.address = item.address;
            }

            if (!_.isNil(item.gender)) {
                contact.gender = item.gender;
            }

            if (!_.isNil(item.organization)) {
                contact.organization = item.organization;
            }

            if (!_.isNil(item.period)) {
                contact.period = item.period;
            }

            resource.contact.push(contact);
        }
    }

    if (!_.isNil(props.communication)) {
        let src = props.communication;
        if (!Array.isArray(src)) { src = [src]; }
        resource.communication = [];

        for (const item of src) {
            const communication = {};

            if (!_.isNil(item.id)) {
                communication.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                communication.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.language)) {
                communication.language = item.language;
            }

            if (!_.isNil(item.preferred)) {
                communication.preferred = item.preferred;
            }

            resource.communication.push(communication);
        }
    }

    if (!_.isNil(props.generalPractitioner)) {
        resource.generalPractitioner = props.generalPractitioner;
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = props.managingOrganization;
    }

    if (!_.isNil(props.link)) {
        let src = props.link;
        if (!Array.isArray(src)) { src = [src]; }
        resource.link = [];

        for (const item of src) {
            const link = {};

            if (!_.isNil(item.id)) {
                link.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                link.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.other)) {
                link.other = item.other;
            }

            if (!_.isNil(item.type)) {
                link.type = item.type;
            }

            resource.link.push(link);
        }
    }

    if (!_.isNil(props.religion)) {
        builders.addExtension(
            resource,
            "http://hl7.org/fhir/StructureDefinition/patient-religion",
            props.religion
        );
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/patient"]
    };

    return resource;
}

export function observation(type, props) {
    const mappings = {
        "active-tb-observation": observation_active_tb_observation,
        "alt-ast-observation": observation_alt_ast_observation,
        "alternate-tb-prophylaxis-type-observation": observation_alternate_tb_prophylaxis_type_observation,
        "alternate-tpt-at-follow-up-observation": observation_alternate_tpt_at_follow_up_observation,
        "art-eligibility-status-observation": observation_art_eligibility_status_observation,
        "art-followup-status-observation": observation_art_followup_status_observation,
        "art-followup-stopped-reasons-observation": observation_art_followup_stopped_reasons_observation,
        "art-not-started-plan-next-step-observation": observation_art_not_started_plan_next_step_observation,
        "arv-adherence-observation": observation_arv_adherence_observation,
        "arv-change-category-type-observation": observation_arv_change_category_type_observation,
        "arv-poor-adherence-reasons-observation": observation_arv_poor_adherence_reasons_observation,
        "arv-regimen-change-reason-observation": observation_arv_regimen_change_reason_observation,
        "arv-regimen-changed-observation": observation_arv_regimen_changed_observation,
        "arv-regimen-side-effects-observation": observation_arv_regimen_side_effects_observation,
        "assessed-for-pain-observation": observation_assessed_for_pain_observation,
        "blood-pressure": observation_blood_pressure,
        "bmi-observation": observation_bmi_observation,
        "breastfeeding-status-observation": observation_breastfeeding_status_observation,
        "cd4-absolute-observation": observation_cd4_absolute_observation,
        "cd4-percentage-observation": observation_cd4_percentage_observation,
        "cervical-cancer-screening-accepted-observation": observation_cervical_cancer_screening_accepted_observation,
        "cervical-cancer-screening-counselling-status-observation": observation_cervical_cancer_screening_counselling_status_observation,
        "cervical-cancer-screening-method-observation": observation_cervical_cancer_screening_method_observation,
        "cervical-cancer-screening-observation": observation_cervical_cancer_screening_observation,
        "cervical-cancer-screening-result-observation": observation_cervical_cancer_screening_result_observation,
        "cervical-cancer-screening-type-observation": observation_cervical_cancer_screening_type_observation,
        "cervical-cancer-treatment-received-observation": observation_cervical_cancer_treatment_received_observation,
        "children-developmental-milestone-observation": observation_children_developmental_milestone_observation,
        "confirmed-hiv-positive-observation": observation_confirmed_hiv_positive_observation,
        "cotrimoxazole-preventive-therapy-adherence-observation": observation_cotrimoxazole_preventive_therapy_adherence_observation,
        "cotrimoxazole-preventive-therapy-observation": observation_cotrimoxazole_preventive_therapy_observation,
        "counseled-for-hiv-observation": observation_counseled_for_hiv_observation,
        "creatine-observation": observation_creatine_observation,
        "current-art-duration-observation": observation_current_art_duration_observation,
        "delivery-mode-observation": observation_delivery_mode_observation,
        "delivery-place-observation": observation_delivery_place_observation,
        "differentiated-service-delivery-observation": observation_differentiated_service_delivery_observation,
        "disclosure-status-observation": observation_disclosure_status_observation,
        "edema-observation": observation_edema_observation,
        "elicited-index-case-contacts-observation": observation_elicited_index_case_contacts_observation,
        "enhanced-adherence-counselling-observation": observation_enhanced_adherence_counselling_observation,
        "estimated-delivery-date-observation": observation_estimated_delivery_date_observation,
        "family-member-hiv-status-observation": observation_family_member_hiv_status_observation,
        "family-planning-method-observation": observation_family_planning_method_observation,
        "fluconazole-preventive-therapy-observation": observation_fluconazole_preventive_therapy_observation,
        "future-pregnancy-plans-observation": observation_future_pregnancy_plans_observation,
        "generic-observation": observation_generic_observation,
        "head-circumference-observation": observation_head_circumference_observation,
        "health-status-observation": observation_health_status_observation,
        "heart-rate-observation": observation_heart_rate_observation,
        "height-observation": observation_height_observation,
        "hgb-observation": observation_hgb_observation,
        "highest-education-observation": observation_highest_education_observation,
        "hiv-prevention-plan-observation": observation_hiv_prevention_plan_observation,
        "hiv-program-final-outcome-known-observation": observation_hiv_program_final_outcome_known_observation,
        "hiv-program-final-outcome-observation": observation_hiv_program_final_outcome_observation,
        "hiv-program-reason-art-not-started-observation": observation_hiv_program_reason_art_not_started_observation,
        "hiv-program-status-observation": observation_hiv_program_status_observation,
        "hiv-status-disclosure-at-enrollment-observation": observation_hiv_status_disclosure_at_enrollment_observation,
        "hiv-test-results-observation": observation_hiv_test_results_observation,
        "hiv-treatment-prior-enrollment-observation": observation_hiv_treatment_prior_enrollment_observation,
        "inh-at-follow-up-observation": observation_inh_at_follow_up_observation,
        "last-menstrual-period-observation": observation_last_menstrual_period_observation,
        "level-of-pain-observation": observation_level_of_pain_observation,
        "maternal-hiv-status-observation": observation_maternal_hiv_status_observation,
        "muac-observation": observation_muac_observation,
        "nutritional-screening-result-observation": observation_nutritional_screening_result_observation,
        "nutritional-status-observation": observation_nutritional_status_observation,
        "nutritional-suppliments-provided-observation": observation_nutritional_suppliments_provided_observation,
        "otz-observation": observation_otz_observation,
        "patient-functional-status-observation": observation_patient_functional_status_observation,
        "patient-occupation-observation": observation_patient_occupation_observation,
        "patient-who-stage-observation": observation_patient_who_stage_observation,
        "physical-examinations-observation": observation_physical_examinations_observation,
        "pregnancy-status-observation": observation_pregnancy_status_observation,
        "presenting-symptom-observation": observation_presenting_symptom_observation,
        "reason-eligible-for-art-observation": observation_reason_eligible_for_art_observation,
        "reason-not-eligbile-for-tpt-observation": observation_reason_not_eligbile_for_tpt_observation,
        "resides-in-catchment-area-observation": observation_resides_in_catchment_area_observation,
        "respiratory-rate-observation": observation_respiratory_rate_observation,
        "screened-for-tb-observation": observation_screened_for_tb_observation,
        "target-population-observation": observation_target_population_observation,
        "tb-diagnostic-test-result-observation": observation_tb_diagnostic_test_result_observation,
        "tb-prophylaxis-type-observation": observation_tb_prophylaxis_type_observation,
        "tb-screening-result-observation": observation_tb_screening_result_observation,
        "tb-treatment-started-observation": observation_tb_treatment_started_observation,
        "tb-treatment-status-observation": observation_tb_treatment_status_observation,
        "temperature-observation": observation_temperature_observation,
        "tested-for-hiv-observation": observation_tested_for_hiv_observation,
        "therapeutic-supplementary-food-observation": observation_therapeutic_supplementary_food_observation,
        "tpt-eligbility-observation": observation_tpt_eligbility_observation,
        "tpt-started-observation": observation_tpt_started_observation,
        "treatment-completed-observation": observation_treatment_completed_observation,
        "treatment-discontinued-observation": observation_treatment_discontinued_observation,
        "viral-load-count-observation": observation_viral_load_count_observation,
        "viral-load-indication-observation": observation_viral_load_indication_observation,
        "viral-load-performed-observation": observation_viral_load_performed_observation,
        "weight-observation": observation_weight_observation
    };

    return mappings[type](props)
}

function observation_active_tb_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/active-tb-observation"]
    };

    return resource;
}

function observation_alt_ast_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/alt-ast-observation"]
    };

    return resource;
}

function observation_alternate_tb_prophylaxis_type_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        let src = props.hasMember;
        if (!Array.isArray(src)) { src = [src]; }
        resource.hasMember = [];

        for (const item of src) {
            const hasMember = {};

            if (!_.isNil(item.id)) {
                hasMember.id = item.id;
            }

            if (!_.isNil(item.reference)) {
                hasMember.reference = item.reference;
            }

            if (!_.isNil(item.type)) {
                hasMember.type = item.type;
            }

            if (!_.isNil(item.identifier)) {
                hasMember.identifier = item.identifier;
            }

            if (!_.isNil(item.display)) {
                hasMember.display = item.display;
            }

            resource.hasMember.push(hasMember);
        }
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/alternate-tb-prophylaxis-type-observation"
        ]
    };

    return resource;
}

function observation_alternate_tpt_at_follow_up_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/alternate-tpt-at-follow-up-observation"
        ]
    };

    return resource;
}

function observation_art_eligibility_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/art-eligibility-status-observation"
        ]
    };

    return resource;
}

function observation_art_followup_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/art-followup-status-observation"
        ]
    };

    return resource;
}

function observation_art_followup_stopped_reasons_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/art-followup-stopped-reasons-observation"
        ]
    };

    return resource;
}

function observation_art_not_started_plan_next_step_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/art-not-started-plan-next-step-observation"
        ]
    };

    return resource;
}

function observation_arv_adherence_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/arv-adherence-observation"]
    };

    return resource;
}

function observation_arv_change_category_type_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-change-category-type-observation"
        ]
    };

    return resource;
}

function observation_arv_poor_adherence_reasons_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-poor-adherence-reasons-observation"
        ]
    };

    return resource;
}

function observation_arv_regimen_change_reason_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-regimen-change-reason-observation"
        ]
    };

    return resource;
}

function observation_arv_regimen_changed_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-regimen-changed-observation"
        ]
    };

    return resource;
}

function observation_arv_regimen_side_effects_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-regimen-side-effects-observation"
        ]
    };

    return resource;
}

function observation_assessed_for_pain_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/assessed-for-pain-observation"
        ]
    };

    return resource;
}

function observation_blood_pressure(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/blood-pressure"]
    };

    return resource;
}

function observation_bmi_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/bmi-observation"]
    };

    return resource;
}

function observation_breastfeeding_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/breastfeeding-status-observation"
        ]
    };

    return resource;
}

function observation_cd4_absolute_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/cd4-absolute-observation"]
    };

    return resource;
}

function observation_cd4_percentage_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cd4-percentage-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_accepted_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-accepted-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_counselling_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-counselling-status-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_method_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-method-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_result_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-result-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_type_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-type-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_treatment_received_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-treatment-received-observation"
        ]
    };

    return resource;
}

function observation_children_developmental_milestone_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/children-developmental-milestone-observation"
        ]
    };

    return resource;
}

function observation_confirmed_hiv_positive_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/confirmed-hiv-positive-observation"
        ]
    };

    return resource;
}

function observation_cotrimoxazole_preventive_therapy_adherence_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cotrimoxazole-preventive-therapy-adherence-observation"
        ]
    };

    return resource;
}

function observation_cotrimoxazole_preventive_therapy_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cotrimoxazole-preventive-therapy-observation"
        ]
    };

    return resource;
}

function observation_counseled_for_hiv_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/counseled-for-hiv-observation"
        ]
    };

    return resource;
}

function observation_creatine_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/creatine-observation"]
    };

    return resource;
}

function observation_current_art_duration_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/current-art-duration-observation"
        ]
    };

    return resource;
}

function observation_delivery_mode_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/delivery-mode-observation"]
    };

    return resource;
}

function observation_delivery_place_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/delivery-place-observation"
        ]
    };

    return resource;
}

function observation_differentiated_service_delivery_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/differentiated-service-delivery-observation"
        ]
    };

    return resource;
}

function observation_disclosure_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/disclosure-status-observation"
        ]
    };

    return resource;
}

function observation_edema_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/edema-observation"]
    };

    return resource;
}

function observation_elicited_index_case_contacts_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/elicited-index-case-contacts-observation"
        ]
    };

    return resource;
}

function observation_enhanced_adherence_counselling_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/enhanced-adherence-counselling-observation"
        ]
    };

    return resource;
}

function observation_estimated_delivery_date_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/estimated-delivery-date-observation"
        ]
    };

    return resource;
}

function observation_family_member_hiv_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/family-member-hiv-status-observation"
        ]
    };

    return resource;
}

function observation_family_planning_method_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/family-planning-method-observation"
        ]
    };

    return resource;
}

function observation_fluconazole_preventive_therapy_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/fluconazole-preventive-therapy-observation"
        ]
    };

    return resource;
}

function observation_future_pregnancy_plans_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/future-pregnancy-plans-observation"
        ]
    };

    return resource;
}

function observation_generic_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/generic-observation"]
    };

    return resource;
}

function observation_head_circumference_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/head-circumference-observation"
        ]
    };

    return resource;
}

function observation_health_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/health-status-observation"]
    };

    return resource;
}

function observation_heart_rate_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/heart-rate-observation"]
    };

    return resource;
}

function observation_height_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/height-observation"]
    };

    return resource;
}

function observation_hgb_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/hgb-observation"]
    };

    return resource;
}

function observation_highest_education_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/highest-education-observation"
        ]
    };

    return resource;
}

function observation_hiv_prevention_plan_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-prevention-plan-observation"
        ]
    };

    return resource;
}

function observation_hiv_program_final_outcome_known_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-program-final-outcome-known-observation"
        ]
    };

    return resource;
}

function observation_hiv_program_final_outcome_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-program-final-outcome-observation"
        ]
    };

    return resource;
}

function observation_hiv_program_reason_art_not_started_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-program-reason-art-not-started-observation"
        ]
    };

    return resource;
}

function observation_hiv_program_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-program-status-observation"
        ]
    };

    return resource;
}

function observation_hiv_status_disclosure_at_enrollment_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-status-disclosure-at-enrollment-observation"
        ]
    };

    return resource;
}

function observation_hiv_test_results_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-test-results-observation"
        ]
    };

    return resource;
}

function observation_hiv_treatment_prior_enrollment_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-treatment-prior-enrollment-observation"
        ]
    };

    return resource;
}

function observation_inh_at_follow_up_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/inh-at-follow-up-observation"
        ]
    };

    return resource;
}

function observation_last_menstrual_period_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/last-menstrual-period-observation"
        ]
    };

    return resource;
}

function observation_level_of_pain_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/level-of-pain-observation"]
    };

    return resource;
}

function observation_maternal_hiv_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/maternal-hiv-status-observation"
        ]
    };

    return resource;
}

function observation_muac_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/muac-observation"]
    };

    return resource;
}

function observation_nutritional_screening_result_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/nutritional-screening-result-observation"
        ]
    };

    return resource;
}

function observation_nutritional_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/nutritional-status-observation"
        ]
    };

    return resource;
}

function observation_nutritional_suppliments_provided_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/nutritional-suppliments-provided-observation"
        ]
    };

    return resource;
}

function observation_otz_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/otz-observation"]
    };

    return resource;
}

function observation_patient_functional_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/patient-functional-status-observation"
        ]
    };

    return resource;
}

function observation_patient_occupation_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/patient-occupation-observation"
        ]
    };

    return resource;
}

function observation_patient_who_stage_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/patient-who-stage-observation"
        ]
    };

    return resource;
}

function observation_physical_examinations_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/physical-examinations-observation"
        ]
    };

    return resource;
}

function observation_pregnancy_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/pregnancy-status-observation"
        ]
    };

    return resource;
}

function observation_presenting_symptom_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/presenting-symptom-observation"
        ]
    };

    return resource;
}

function observation_reason_eligible_for_art_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/reason-eligible-for-art-observation"
        ]
    };

    return resource;
}

function observation_reason_not_eligbile_for_tpt_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/reason-not-eligbile-for-tpt-observation"
        ]
    };

    return resource;
}

function observation_resides_in_catchment_area_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/resides-in-catchment-area-observation"
        ]
    };

    return resource;
}

function observation_respiratory_rate_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/respiratory-rate-observation"
        ]
    };

    return resource;
}

function observation_screened_for_tb_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/screened-for-tb-observation"
        ]
    };

    return resource;
}

function observation_target_population_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/target-population-observation"
        ]
    };

    return resource;
}

function observation_tb_diagnostic_test_result_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tb-diagnostic-test-result-observation"
        ]
    };

    return resource;
}

function observation_tb_prophylaxis_type_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tb-prophylaxis-type-observation"
        ]
    };

    return resource;
}

function observation_tb_screening_result_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tb-screening-result-observation"
        ]
    };

    return resource;
}

function observation_tb_treatment_started_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tb-treatment-started-observation"
        ]
    };

    return resource;
}

function observation_tb_treatment_status_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tb-treatment-status-observation"
        ]
    };

    return resource;
}

function observation_temperature_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/temperature-observation"]
    };

    return resource;
}

function observation_tested_for_hiv_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tested-for-hiv-observation"
        ]
    };

    return resource;
}

function observation_therapeutic_supplementary_food_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/therapeutic-supplementary-food-observation"
        ]
    };

    return resource;
}

function observation_tpt_eligbility_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tpt-eligbility-observation"
        ]
    };

    return resource;
}

function observation_tpt_started_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/tpt-started-observation"]
    };

    return resource;
}

function observation_treatment_completed_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/treatment-completed-observation"
        ]
    };

    return resource;
}

function observation_treatment_discontinued_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/treatment-discontinued-observation"
        ]
    };

    return resource;
}

function observation_viral_load_count_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/viral-load-count-observation"
        ]
    };

    return resource;
}

function observation_viral_load_indication_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/viral-load-indication-observation"
        ]
    };

    return resource;
}

function observation_viral_load_performed_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/viral-load-performed-observation"
        ]
    };

    return resource;
}

function observation_weight_observation(props) {
    const resource = {
        resourceType: "Observation"
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = props.basedOn;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        const code = {};

        if (!_.isNil(src.id)) {
            code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            builders.addExtension(
                code,
                "http://moh.gov.et/fhir/hiv/StructureDefinition/strict-coding",
                src.coding
            );
        }

        if (!_.isNil(src.text)) {
            code.text = src.text;
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = props.subject;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = props.encounter;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = props.performer;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = props.specimen;
    }

    if (!_.isNil(props.device)) {
        resource.device = props.device;
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (const item of src) {
            const referenceRange = {};

            if (!_.isNil(item.id)) {
                referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                referenceRange.text = item.text;
            }

            resource.referenceRange.push(referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        resource.hasMember = props.hasMember;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (const item of src) {
            const component = {};

            if (!_.isNil(item.id)) {
                component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                component.code = item.code;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                component.interpretation = item.interpretation;
            }

            resource.component.push(component);
        }
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/weight-observation"]
    };

    return resource;
}