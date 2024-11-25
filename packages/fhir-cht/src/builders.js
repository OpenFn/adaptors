
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "./utils.js";
import _ from "lodash";

/**
  * Create a FHIR Address resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function address(type, props) {
    const mappings = {
        "fr-core-address": address_fr_core_address
    };

    return mappings[type](props)
}

function address_fr_core_address(props) {
    const resource = {
        resourceType: "Address",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Address</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.use)) {
        resource.use = props.use;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.line)) {
        resource.line = props.line;
    }

    if (!_.isNil(props.city)) {
        resource.city = props.city;
    }

    if (!_.isNil(props.district)) {
        resource.district = props.district;
    }

    if (!_.isNil(props.state)) {
        resource.state = props.state;
    }

    if (!_.isNil(props.postalCode)) {
        resource.postalCode = props.postalCode;
    }

    if (!_.isNil(props.country)) {
        resource.country = props.country;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-address"]
    };

    return resource;
}

/**
  * Create a FHIR Appointment resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function appointment(type, props) {
    const mappings = {
        "fr-core-appointment": appointment_fr_core_appointment
    };

    return mappings[type](props)
}

function appointment_fr_core_appointment(props) {
    const resource = {
        resourceType: "Appointment",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Appointment</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.cancelationReason)) {
        resource.cancelationReason = props.cancelationReason;
    }

    if (!_.isNil(props.serviceCategory)) {
        resource.serviceCategory = props.serviceCategory;
    }

    if (!_.isNil(props.serviceType)) {
        resource.serviceType = props.serviceType;
    }

    if (!_.isNil(props.specialty)) {
        resource.specialty = props.specialty;
    }

    if (!_.isNil(props.appointmentType)) {
        resource.appointmentType = props.appointmentType;
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = util.reference(props.supportingInformation);
    }

    if (!_.isNil(props.start)) {
        resource.start = props.start;
    }

    if (!_.isNil(props.end)) {
        resource.end = props.end;
    }

    if (!_.isNil(props.minutesDuration)) {
        resource.minutesDuration = props.minutesDuration;
    }

    if (!_.isNil(props.slot)) {
        if (!Array.isArray(props.slot)) { props.slot = [props.slot]; }
        resource.slot = util.reference(props.slot);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    if (!_.isNil(props.patientInstruction)) {
        resource.patientInstruction = props.patientInstruction;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (let item of src) {
            let _participant = {};

            if (!_.isNil(item.id)) {
                _participant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _participant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _participant.type = item.type;
            }

            if (!_.isNil(item.actor)) {
                _participant.actor = item.actor;
            }

            if (!_.isNil(item.required)) {
                _participant.required = item.required;
            }

            if (!_.isNil(item.status)) {
                _participant.status = item.status;
            }

            if (!_.isNil(item.period)) {
                _participant.period = item.period;
            }

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.requestedPeriod)) {
        resource.requestedPeriod = props.requestedPeriod;
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-appointment"]
    };

    return resource;
}

/**
  * Create a FHIR ContactPoint resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function contactPoint(type, props) {
    const mappings = {
        "fr-core-contact-point": contactPoint_fr_core_contact_point
    };

    return mappings[type](props)
}

function contactPoint_fr_core_contact_point(props) {
    const resource = {
        resourceType: "ContactPoint",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ContactPoint</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.system)) {
        resource.system = props.system;
    }

    if (!_.isNil(props.value)) {
        resource.value = props.value;
    }

    if (!_.isNil(props.use)) {
        resource.use = props.use;
    }

    if (!_.isNil(props.rank)) {
        resource.rank = props.rank;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-contact-point"]
    };

    return resource;
}

/**
  * Create a FHIR Encounter resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function encounter(type, props) {
    const mappings = {
        "fr-core-encounter": encounter_fr_core_encounter
    };

    return mappings[type](props)
}

function encounter_fr_core_encounter(props) {
    const resource = {
        resourceType: "Encounter",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Encounter</b></p></div>"
        }
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

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusHistory)) {
        let src = props.statusHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statusHistory = [];

        for (let item of src) {
            let _statusHistory = {};

            if (!_.isNil(item.id)) {
                _statusHistory.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _statusHistory.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.status)) {
                _statusHistory.status = item.status;
            }

            if (!_.isNil(item.period)) {
                _statusHistory.period = item.period;
            }

            resource.statusHistory.push(_statusHistory);
        }
    }

    if (!_.isNil(props.class)) {
        let src = props.class;
        let _class = {};

        if (!_.isNil(src.id)) {
            _class.id = src.id;
        }

        if (!_.isNil(src.system)) {
            _class.system = src.system;
        }

        if (!_.isNil(src.version)) {
            _class.version = src.version;
        }

        if (!_.isNil(src.code)) {
            _class.code = src.code;
        }

        if (!_.isNil(src.display)) {
            _class.display = src.display;
        }

        if (!_.isNil(src.userSelected)) {
            _class.userSelected = src.userSelected;
        }

        _class = util.mapSystems(_class);
        resource.class = _class;
    }

    if (!_.isNil(props.classHistory)) {
        let src = props.classHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.classHistory = [];

        for (let item of src) {
            let _classHistory = {};

            if (!_.isNil(item.id)) {
                _classHistory.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _classHistory.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.class)) {
                _classHistory.class = item.class;
            }

            if (!_.isNil(item.period)) {
                _classHistory.period = item.period;
            }

            resource.classHistory.push(_classHistory);
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
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.episodeOfCare)) {
        if (!Array.isArray(props.episodeOfCare)) { props.episodeOfCare = [props.episodeOfCare]; }
        resource.episodeOfCare = util.reference(props.episodeOfCare);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (let item of src) {
            let _participant = {};

            if (!_.isNil(item.id)) {
                _participant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _participant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _participant.type = item.type;
            }

            if (!_.isNil(item.period)) {
                _participant.period = item.period;
            }

            if (!_.isNil(item.individual)) {
                _participant.individual = item.individual;
            }

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.appointment)) {
        if (!Array.isArray(props.appointment)) { props.appointment = [props.appointment]; }
        resource.appointment = util.reference(props.appointment);
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
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.diagnosis)) {
        let src = props.diagnosis;
        if (!Array.isArray(src)) { src = [src]; }
        resource.diagnosis = [];

        for (let item of src) {
            let _diagnosis = {};

            if (!_.isNil(item.id)) {
                _diagnosis.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _diagnosis.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.condition)) {
                _diagnosis.condition = item.condition;
            }

            if (!_.isNil(item.use)) {
                _diagnosis.use = item.use;
            }

            if (!_.isNil(item.rank)) {
                _diagnosis.rank = item.rank;
            }

            resource.diagnosis.push(_diagnosis);
        }
    }

    if (!_.isNil(props.account)) {
        if (!Array.isArray(props.account)) { props.account = [props.account]; }
        resource.account = util.reference(props.account);
    }

    if (!_.isNil(props.hospitalization)) {
        let src = props.hospitalization;
        let _hospitalization = {};

        if (!_.isNil(src.id)) {
            _hospitalization.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _hospitalization.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.preAdmissionIdentifier)) {
            _hospitalization.preAdmissionIdentifier = src.preAdmissionIdentifier;
        }

        if (!_.isNil(src.origin)) {
            _hospitalization.origin = src.origin;
        }

        if (!_.isNil(src.admitSource)) {
            _hospitalization.admitSource = src.admitSource;
        }

        if (!_.isNil(src.reAdmission)) {
            _hospitalization.reAdmission = src.reAdmission;
        }

        if (!_.isNil(src.dietPreference)) {
            _hospitalization.dietPreference = src.dietPreference;
        }

        if (!_.isNil(src.specialCourtesy)) {
            _hospitalization.specialCourtesy = src.specialCourtesy;
        }

        if (!_.isNil(src.specialArrangement)) {
            _hospitalization.specialArrangement = src.specialArrangement;
        }

        if (!_.isNil(src.destination)) {
            _hospitalization.destination = src.destination;
        }

        if (!_.isNil(src.dischargeDisposition)) {
            _hospitalization.dischargeDisposition = src.dischargeDisposition;
        }

        resource.hospitalization = _hospitalization;
    }

    if (!_.isNil(props.location)) {
        let src = props.location;
        if (!Array.isArray(src)) { src = [src]; }
        resource.location = [];

        for (let item of src) {
            let _location = {};

            if (!_.isNil(item.id)) {
                _location.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _location.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.location)) {
                _location.location = item.location;
            }

            if (!_.isNil(item.status)) {
                _location.status = item.status;
            }

            if (!_.isNil(item.physicalType)) {
                _location.physicalType = item.physicalType;
            }

            if (!_.isNil(item.period)) {
                _location.period = item.period;
            }

            resource.location.push(_location);
        }
    }

    if (!_.isNil(props.serviceProvider)) {
        resource.serviceProvider = util.reference(props.serviceProvider);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-encounter"]
    };

    return resource;
}

/**
  * Create a FHIR Extension resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function extension(type, props) {
    const mappings = {
        "fr-core-address-insee-code": extension_fr_core_address_insee_code,
        "fr-core-appointment-operator": extension_fr_core_appointment_operator,
        "fr-core-comment": extension_fr_core_comment,
        "fr-core-contact-point-email-type": extension_fr_core_contact_point_email_type,
        "fr-core-estimated-discharge-date": extension_fr_core_estimated_discharge_date,
        "fr-core-human-name-assembly-order": extension_fr_core_human_name_assembly_order,
        "fr-core-identity-reliability": extension_fr_core_identity_reliability,
        "fr-core-location-position-room": extension_fr_core_location_position_room,
        "fr-core-lunar-date": extension_fr_core_lunar_date,
        "fr-core-observation-body-position-ext": extension_fr_core_observation_body_position_ext,
        "fr-core-observation-height-body-position": extension_fr_core_observation_height_body_position,
        "fr-core-observation-level-of-exertion": extension_fr_core_observation_level_of_exertion,
        "fr-core-organization-activity-field": extension_fr_core_organization_activity_field,
        "fr-core-organization-activity-type": extension_fr_core_organization_activity_type,
        "fr-core-organization-analysis-section": extension_fr_core_organization_analysis_section,
        "fr-core-organization-applicant-act": extension_fr_core_organization_applicant_act,
        "fr-core-organization-budget-letter": extension_fr_core_organization_budget_letter,
        "fr-core-organization-description": extension_fr_core_organization_description,
        "fr-core-organization-executant": extension_fr_core_organization_executant,
        "fr-core-organization-external": extension_fr_core_organization_external,
        "fr-core-organization-field": extension_fr_core_organization_field,
        "fr-core-organization-number-of-theorical-accomadation-space": extension_fr_core_organization_number_of_theorical_accomadation_space,
        "fr-core-organization-prestation-discipline": extension_fr_core_organization_prestation_discipline,
        "fr-core-organization-short-name": extension_fr_core_organization_short_name,
        "fr-core-patient-birth-list-given-name": extension_fr_core_patient_birth_list_given_name,
        "fr-core-patient-birthdate-update-indicator": extension_fr_core_patient_birthdate_update_indicator,
        "fr-core-patient-contact-identifier": extension_fr_core_patient_contact_identifier,
        "fr-core-patient-death-place": extension_fr_core_patient_death_place,
        "fr-core-patient-nationality": extension_fr_core_patient_nationality,
        "fr-core-practitioner-profession": extension_fr_core_practitioner_profession,
        "fr-core-practitioner-specialty": extension_fr_core_practitioner_specialty,
        "fr-core-role-code-categorie-professionnelle": extension_fr_core_role_code_categorie_professionnelle,
        "fr-core-schedule-availability-time": extension_fr_core_schedule_availability_time,
        "fr-core-service-type-duration": extension_fr_core_service_type_duration,
        "fr-core-slot-date": extension_fr_core_slot_date,
        "fr-core-use-period": extension_fr_core_use_period
    };

    return mappings[type](props)
}

function extension_fr_core_address_insee_code(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-address-insee-code"
        ]
    };

    return resource;
}

function extension_fr_core_appointment_operator(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-appointment-operator"
        ]
    };

    return resource;
}

function extension_fr_core_comment(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-comment"]
    };

    return resource;
}

function extension_fr_core_contact_point_email_type(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-contact-point-email-type"
        ]
    };

    return resource;
}

function extension_fr_core_estimated_discharge_date(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-estimated-discharge-date"
        ]
    };

    return resource;
}

function extension_fr_core_human_name_assembly_order(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-human-name-assembly-order"
        ]
    };

    return resource;
}

function extension_fr_core_identity_reliability(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        let src = props.extension;
        if (!Array.isArray(src)) { src = [src]; }
        resource.extension = [];

        for (let item of src) {
            let _extension = {};

            if (!_.isNil(item.id)) {
                _extension.id = item.id;
            }

            if (!_.isNil(item.url)) {
                _extension.url = item.url;
            }

            if (!_.isNil(item.value)) {
                _extension.value = item.value;
            }

            resource.extension.push(_extension);
        }
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-identity-reliability"
        ]
    };

    return resource;
}

function extension_fr_core_location_position_room(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-location-position-room"
        ]
    };

    return resource;
}

function extension_fr_core_lunar_date(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-lunar-date"]
    };

    return resource;
}

function extension_fr_core_observation_body_position_ext(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-body-position-ext"
        ]
    };

    return resource;
}

function extension_fr_core_observation_height_body_position(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-height-body-position"
        ]
    };

    return resource;
}

function extension_fr_core_observation_level_of_exertion(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-level-of-exertion"
        ]
    };

    return resource;
}

function extension_fr_core_organization_activity_field(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-activity-field"
        ]
    };

    return resource;
}

function extension_fr_core_organization_activity_type(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-activity-type"
        ]
    };

    return resource;
}

function extension_fr_core_organization_analysis_section(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-analysis-section"
        ]
    };

    return resource;
}

function extension_fr_core_organization_applicant_act(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-applicant-act"
        ]
    };

    return resource;
}

function extension_fr_core_organization_budget_letter(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-budget-letter"
        ]
    };

    return resource;
}

function extension_fr_core_organization_description(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-description"
        ]
    };

    return resource;
}

function extension_fr_core_organization_executant(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-executant"
        ]
    };

    return resource;
}

function extension_fr_core_organization_external(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-external"
        ]
    };

    return resource;
}

function extension_fr_core_organization_field(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-field"
        ]
    };

    return resource;
}

function extension_fr_core_organization_number_of_theorical_accomadation_space(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-number-of-theorical-accomadation-space"
        ]
    };

    return resource;
}

function extension_fr_core_organization_prestation_discipline(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-prestation-discipline"
        ]
    };

    return resource;
}

function extension_fr_core_organization_short_name(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-short-name"
        ]
    };

    return resource;
}

function extension_fr_core_patient_birth_list_given_name(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-birth-list-given-name"
        ]
    };

    return resource;
}

function extension_fr_core_patient_birthdate_update_indicator(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-birthdate-update-indicator"
        ]
    };

    return resource;
}

function extension_fr_core_patient_contact_identifier(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-contact-identifier"
        ]
    };

    return resource;
}

function extension_fr_core_patient_death_place(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-death-place"
        ]
    };

    return resource;
}

function extension_fr_core_patient_nationality(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        let src = props.extension;
        if (!Array.isArray(src)) { src = [src]; }
        resource.extension = [];

        for (let item of src) {
            let _extension = {};

            if (!_.isNil(item.id)) {
                _extension.id = item.id;
            }

            if (!_.isNil(item.url)) {
                _extension.url = item.url;
            }

            if (!_.isNil(item.value)) {
                _extension.value = item.value;
            }

            resource.extension.push(_extension);
        }
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-nationality"
        ]
    };

    return resource;
}

function extension_fr_core_practitioner_profession(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-practitioner-profession"
        ]
    };

    return resource;
}

function extension_fr_core_practitioner_specialty(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-practitioner-specialty"
        ]
    };

    return resource;
}

function extension_fr_core_role_code_categorie_professionnelle(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-role-code-categorie-professionnelle"
        ]
    };

    return resource;
}

function extension_fr_core_schedule_availability_time(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        let src = props.extension;
        if (!Array.isArray(src)) { src = [src]; }
        resource.extension = [];

        for (let item of src) {
            let _extension = {};

            if (!_.isNil(item.id)) {
                _extension.id = item.id;
            }

            if (!_.isNil(item.url)) {
                _extension.url = item.url;
            }

            if (!_.isNil(item.value)) {
                _extension.value = item.value;
            }

            resource.extension.push(_extension);
        }
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-schedule-availability-time"
        ]
    };

    return resource;
}

function extension_fr_core_service_type_duration(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        let src = props.extension;
        if (!Array.isArray(src)) { src = [src]; }
        resource.extension = [];

        for (let item of src) {
            let _extension = {};

            if (!_.isNil(item.id)) {
                _extension.id = item.id;
            }

            if (!_.isNil(item.url)) {
                _extension.url = item.url;
            }

            if (!_.isNil(item.value)) {
                _extension.value = item.value;
            }

            resource.extension.push(_extension);
        }
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-service-type-duration"
        ]
    };

    return resource;
}

function extension_fr_core_slot_date(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-slot-date"]
    };

    return resource;
}

function extension_fr_core_use_period(props) {
    const resource = {
        resourceType: "Extension",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Extension</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-use-period"]
    };

    return resource;
}

/**
  * Create a FHIR HealthcareService resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function healthcareService(type, props) {
    const mappings = {
        "fr-core-healthcare-service": healthcareService_fr_core_healthcare_service
    };

    return mappings[type](props)
}

function healthcareService_fr_core_healthcare_service(props) {
    const resource = {
        resourceType: "HealthcareService",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>HealthcareService</b></p></div>"
        }
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

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.providedBy)) {
        resource.providedBy = util.reference(props.providedBy);
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.specialty)) {
        resource.specialty = props.specialty;
    }

    if (!_.isNil(props.location)) {
        if (!Array.isArray(props.location)) { props.location = [props.location]; }
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    if (!_.isNil(props.extraDetails)) {
        resource.extraDetails = props.extraDetails;
    }

    if (!_.isNil(props.photo)) {
        resource.photo = props.photo;
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.coverageArea)) {
        if (!Array.isArray(props.coverageArea)) { props.coverageArea = [props.coverageArea]; }
        resource.coverageArea = util.reference(props.coverageArea);
    }

    if (!_.isNil(props.serviceProvisionCode)) {
        resource.serviceProvisionCode = props.serviceProvisionCode;
    }

    if (!_.isNil(props.eligibility)) {
        let src = props.eligibility;
        if (!Array.isArray(src)) { src = [src]; }
        resource.eligibility = [];

        for (let item of src) {
            let _eligibility = {};

            if (!_.isNil(item.id)) {
                _eligibility.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _eligibility.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _eligibility.code = item.code;
            }

            if (!_.isNil(item.comment)) {
                _eligibility.comment = item.comment;
            }

            resource.eligibility.push(_eligibility);
        }
    }

    if (!_.isNil(props.program)) {
        resource.program = props.program;
    }

    if (!_.isNil(props.characteristic)) {
        resource.characteristic = props.characteristic;
    }

    if (!_.isNil(props.communication)) {
        resource.communication = props.communication;
    }

    if (!_.isNil(props.referralMethod)) {
        resource.referralMethod = props.referralMethod;
    }

    if (!_.isNil(props.appointmentRequired)) {
        resource.appointmentRequired = props.appointmentRequired;
    }

    if (!_.isNil(props.availableTime)) {
        let src = props.availableTime;
        if (!Array.isArray(src)) { src = [src]; }
        resource.availableTime = [];

        for (let item of src) {
            let _availableTime = {};

            if (!_.isNil(item.id)) {
                _availableTime.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _availableTime.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.daysOfWeek)) {
                _availableTime.daysOfWeek = item.daysOfWeek;
            }

            if (!_.isNil(item.allDay)) {
                _availableTime.allDay = item.allDay;
            }

            if (!_.isNil(item.availableStartTime)) {
                _availableTime.availableStartTime = item.availableStartTime;
            }

            if (!_.isNil(item.availableEndTime)) {
                _availableTime.availableEndTime = item.availableEndTime;
            }

            resource.availableTime.push(_availableTime);
        }
    }

    if (!_.isNil(props.notAvailable)) {
        let src = props.notAvailable;
        if (!Array.isArray(src)) { src = [src]; }
        resource.notAvailable = [];

        for (let item of src) {
            let _notAvailable = {};

            if (!_.isNil(item.id)) {
                _notAvailable.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _notAvailable.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _notAvailable.description = item.description;
            }

            if (!_.isNil(item.during)) {
                _notAvailable.during = item.during;
            }

            resource.notAvailable.push(_notAvailable);
        }
    }

    if (!_.isNil(props.availabilityExceptions)) {
        resource.availabilityExceptions = props.availabilityExceptions;
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = util.reference(props.endpoint);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-healthcare-service"
        ]
    };

    return resource;
}

/**
  * Create a FHIR HumanName resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function humanName(type, props) {
    const mappings = {
        "fr-core-human-name": humanName_fr_core_human_name
    };

    return mappings[type](props)
}

function humanName_fr_core_human_name(props) {
    const resource = {
        resourceType: "HumanName",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>HumanName</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.use)) {
        resource.use = props.use;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.family)) {
        resource.family = props.family;
    }

    if (!_.isNil(props.given)) {
        resource.given = props.given;
    }

    if (!_.isNil(props.prefix)) {
        resource.prefix = props.prefix;
    }

    if (!_.isNil(props.suffix)) {
        resource.suffix = props.suffix;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-human-name"]
    };

    return resource;
}

/**
  * Create a FHIR Location resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function location(type, props) {
    const mappings = {
        "fr-core-location": location_fr_core_location
    };

    return mappings[type](props)
}

function location_fr_core_location(props) {
    const resource = {
        resourceType: "Location",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Location</b></p></div>"
        }
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

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.operationalStatus)) {
        resource.operationalStatus = props.operationalStatus;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.alias)) {
        resource.alias = props.alias;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.mode)) {
        resource.mode = props.mode;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.physicalType)) {
        resource.physicalType = props.physicalType;
    }

    if (!_.isNil(props.position)) {
        let src = props.position;
        let _position = {};

        if (!_.isNil(src.id)) {
            _position.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _position.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.longitude)) {
            _position.longitude = src.longitude;
        }

        if (!_.isNil(src.latitude)) {
            _position.latitude = src.latitude;
        }

        if (!_.isNil(src.altitude)) {
            _position.altitude = src.altitude;
        }

        resource.position = _position;
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = util.reference(props.managingOrganization);
    }

    if (!_.isNil(props.partOf)) {
        let src = props.partOf;
        let _partOf = {};

        if (!_.isNil(src.id)) {
            _partOf.id = src.id;
        }

        if (!_.isNil(src.positionRoom)) {
            util.addExtension(
                _partOf,
                "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-location-position-room",
                src.positionRoom
            );
        }

        if (!_.isNil(src.reference)) {
            _partOf.reference = src.reference;
        }

        if (!_.isNil(src.type)) {
            _partOf.type = src.type;
        }

        if (!_.isNil(src.identifier)) {
            _partOf.identifier = src.identifier;
        }

        if (!_.isNil(src.display)) {
            _partOf.display = src.display;
        }

        resource.partOf = _partOf;
    }

    if (!_.isNil(props.hoursOfOperation)) {
        let src = props.hoursOfOperation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.hoursOfOperation = [];

        for (let item of src) {
            let _hoursOfOperation = {};

            if (!_.isNil(item.id)) {
                _hoursOfOperation.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _hoursOfOperation.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.daysOfWeek)) {
                _hoursOfOperation.daysOfWeek = item.daysOfWeek;
            }

            if (!_.isNil(item.allDay)) {
                _hoursOfOperation.allDay = item.allDay;
            }

            if (!_.isNil(item.openingTime)) {
                _hoursOfOperation.openingTime = item.openingTime;
            }

            if (!_.isNil(item.closingTime)) {
                _hoursOfOperation.closingTime = item.closingTime;
            }

            resource.hoursOfOperation.push(_hoursOfOperation);
        }
    }

    if (!_.isNil(props.availabilityExceptions)) {
        resource.availabilityExceptions = props.availabilityExceptions;
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = util.reference(props.endpoint);
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-location"]
    };

    return resource;
}

/**
  * Create a FHIR MedicationAdministration resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function medicationAdministration(type, props) {
    const mappings = {
        "fr-core-medication-administration-inhaled-oxygen": medicationAdministration_fr_core_medication_administration_inhaled_oxygen
    };

    return mappings[type](props)
}

function medicationAdministration_fr_core_medication_administration_inhaled_oxygen(props) {
    const resource = {
        resourceType: "MedicationAdministration",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationAdministration</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.instantiates)) {
        resource.instantiates = props.instantiates;
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.medication)) {
        util.composite(resource, "medication", props.medication);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.context)) {
        resource.context = util.reference(props.context);
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = util.reference(props.supportingInformation);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.performer)) {
        let src = props.performer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.performer = [];

        for (let item of src) {
            let _performer = {};

            if (!_.isNil(item.id)) {
                _performer.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _performer.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.function)) {
                _performer.function = item.function;
            }

            if (!_.isNil(item.actor)) {
                _performer.actor = item.actor;
            }

            resource.performer.push(_performer);
        }
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.request)) {
        resource.request = util.reference(props.request);
    }

    if (!_.isNil(props.device)) {
        if (!Array.isArray(props.device)) { props.device = [props.device]; }
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.dosage)) {
        let src = props.dosage;
        let _dosage = {};

        if (!_.isNil(src.id)) {
            _dosage.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _dosage.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.text)) {
            _dosage.text = src.text;
        }

        if (!_.isNil(src.site)) {
            _dosage.site = src.site;
        }

        if (!_.isNil(src.route)) {
            _dosage.route = src.route;
        }

        if (!_.isNil(src.method)) {
            _dosage.method = src.method;
        }

        if (!_.isNil(src.dose)) {
            _dosage.dose = src.dose;
        }

        if (!_.isNil(src.rate)) {
            _dosage.rate = src.rate;
        }

        resource.dosage = _dosage;
    }

    if (!_.isNil(props.eventHistory)) {
        if (!Array.isArray(props.eventHistory)) { props.eventHistory = [props.eventHistory]; }
        resource.eventHistory = util.reference(props.eventHistory);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-medication-administration-inhaled-oxygen"
        ]
    };

    return resource;
}

/**
  * Create a FHIR Observation resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function observation(type, props) {
    const mappings = {
        "fr-core-observation-bmi": observation_fr_core_observation_bmi,
        "fr-core-observation-body-height": observation_fr_core_observation_body_height,
        "fr-core-observation-body-temperature": observation_fr_core_observation_body_temperature,
        "fr-core-observation-body-weight": observation_fr_core_observation_body_weight,
        "fr-core-observation-bp": observation_fr_core_observation_bp,
        "fr-core-observation-head-circum": observation_fr_core_observation_head_circum,
        "fr-core-observation-heartrate": observation_fr_core_observation_heartrate,
        "fr-core-observation-resp-rate": observation_fr_core_observation_resp_rate,
        "fr-core-observation-saturation-oxygen": observation_fr_core_observation_saturation_oxygen
    };

    return mappings[type](props)
}

function observation_fr_core_observation_bmi(props) {
    const resource = {
        resourceType: "Observation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {};

            if (!_.isNil(item.id)) {
                _category.id = item.id;
            }

            if (!_.isNil(item.coding)) {
                _category.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _category.text = item.text;
            }

            resource.category.push(_category);
        }
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        let _code = {};

        if (!_.isNil(src.id)) {
            _code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            _code.coding = src.coding;
        }

        if (!_.isNil(src.text)) {
            _code.text = src.text;
        }

        resource.code = _code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
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
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {};

            if (!_.isNil(item.id)) {
                _referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                _referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                _referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                _referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                _referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                _referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                _referenceRange.text = item.text;
            }

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = util.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = util.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {};

            if (!_.isNil(item.id)) {
                _component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _component.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _component.value = item.value;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                _component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                _component.interpretation = item.interpretation;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-bmi"]
    };

    return resource;
}

function observation_fr_core_observation_body_height(props) {
    const resource = {
        resourceType: "Observation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {};

            if (!_.isNil(item.id)) {
                _category.id = item.id;
            }

            if (!_.isNil(item.coding)) {
                _category.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _category.text = item.text;
            }

            resource.category.push(_category);
        }
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        let _code = {};

        if (!_.isNil(src.id)) {
            _code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            _code.coding = src.coding;
        }

        if (!_.isNil(src.text)) {
            _code.text = src.text;
        }

        resource.code = _code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
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
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {};

            if (!_.isNil(item.id)) {
                _referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                _referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                _referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                _referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                _referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                _referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                _referenceRange.text = item.text;
            }

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = util.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = util.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {};

            if (!_.isNil(item.id)) {
                _component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _component.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _component.value = item.value;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                _component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                _component.interpretation = item.interpretation;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-body-height"
        ]
    };

    return resource;
}

function observation_fr_core_observation_body_temperature(props) {
    const resource = {
        resourceType: "Observation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {};

            if (!_.isNil(item.id)) {
                _category.id = item.id;
            }

            if (!_.isNil(item.coding)) {
                _category.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _category.text = item.text;
            }

            resource.category.push(_category);
        }
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        let _code = {};

        if (!_.isNil(src.id)) {
            _code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            _code.coding = src.coding;
        }

        if (!_.isNil(src.text)) {
            _code.text = src.text;
        }

        resource.code = _code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
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
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {};

            if (!_.isNil(item.id)) {
                _referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                _referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                _referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                _referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                _referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                _referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                _referenceRange.text = item.text;
            }

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = util.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = util.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {};

            if (!_.isNil(item.id)) {
                _component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _component.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _component.value = item.value;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                _component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                _component.interpretation = item.interpretation;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-body-temperature"
        ]
    };

    return resource;
}

function observation_fr_core_observation_body_weight(props) {
    const resource = {
        resourceType: "Observation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {};

            if (!_.isNil(item.id)) {
                _category.id = item.id;
            }

            if (!_.isNil(item.coding)) {
                _category.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _category.text = item.text;
            }

            resource.category.push(_category);
        }
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        let _code = {};

        if (!_.isNil(src.id)) {
            _code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            _code.coding = src.coding;
        }

        if (!_.isNil(src.text)) {
            _code.text = src.text;
        }

        resource.code = _code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
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
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {};

            if (!_.isNil(item.id)) {
                _referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                _referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                _referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                _referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                _referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                _referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                _referenceRange.text = item.text;
            }

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = util.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = util.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {};

            if (!_.isNil(item.id)) {
                _component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _component.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _component.value = item.value;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                _component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                _component.interpretation = item.interpretation;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-body-weight"
        ]
    };

    return resource;
}

function observation_fr_core_observation_bp(props) {
    const resource = {
        resourceType: "Observation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {};

            if (!_.isNil(item.id)) {
                _category.id = item.id;
            }

            if (!_.isNil(item.coding)) {
                _category.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _category.text = item.text;
            }

            resource.category.push(_category);
        }
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        let _code = {};

        if (!_.isNil(src.id)) {
            _code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            _code.coding = src.coding;
        }

        if (!_.isNil(src.text)) {
            _code.text = src.text;
        }

        resource.code = _code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
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
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {};

            if (!_.isNil(item.id)) {
                _referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                _referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                _referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                _referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                _referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                _referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                _referenceRange.text = item.text;
            }

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = util.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = util.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {};

            if (!_.isNil(item.id)) {
                _component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _component.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _component.value = item.value;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                _component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                _component.interpretation = item.interpretation;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-bp"]
    };

    return resource;
}

function observation_fr_core_observation_head_circum(props) {
    const resource = {
        resourceType: "Observation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {};

            if (!_.isNil(item.id)) {
                _category.id = item.id;
            }

            if (!_.isNil(item.coding)) {
                _category.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _category.text = item.text;
            }

            resource.category.push(_category);
        }
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        let _code = {};

        if (!_.isNil(src.id)) {
            _code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            _code.coding = src.coding;
        }

        if (!_.isNil(src.text)) {
            _code.text = src.text;
        }

        resource.code = _code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
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
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {};

            if (!_.isNil(item.id)) {
                _referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                _referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                _referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                _referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                _referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                _referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                _referenceRange.text = item.text;
            }

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = util.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = util.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {};

            if (!_.isNil(item.id)) {
                _component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _component.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _component.value = item.value;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                _component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                _component.interpretation = item.interpretation;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-head-circum"
        ]
    };

    return resource;
}

function observation_fr_core_observation_heartrate(props) {
    const resource = {
        resourceType: "Observation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {};

            if (!_.isNil(item.id)) {
                _category.id = item.id;
            }

            if (!_.isNil(item.coding)) {
                _category.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _category.text = item.text;
            }

            resource.category.push(_category);
        }
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        let _code = {};

        if (!_.isNil(src.id)) {
            _code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            _code.coding = src.coding;
        }

        if (!_.isNil(src.text)) {
            _code.text = src.text;
        }

        resource.code = _code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
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
        let src = props.bodySite;
        let _bodySite = {};

        if (!_.isNil(src.id)) {
            _bodySite.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            _bodySite.coding = src.coding;
        }

        if (!_.isNil(src.text)) {
            _bodySite.text = src.text;
        }

        resource.bodySite = _bodySite;
    }

    if (!_.isNil(props.method)) {
        let src = props.method;
        let _method = {};

        if (!_.isNil(src.id)) {
            _method.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            _method.coding = src.coding;
        }

        if (!_.isNil(src.text)) {
            _method.text = src.text;
        }

        resource.method = _method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {};

            if (!_.isNil(item.id)) {
                _referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                _referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                _referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                _referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                _referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                _referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                _referenceRange.text = item.text;
            }

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = util.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = util.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {};

            if (!_.isNil(item.id)) {
                _component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _component.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _component.value = item.value;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                _component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                _component.interpretation = item.interpretation;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-heartrate"
        ]
    };

    return resource;
}

function observation_fr_core_observation_resp_rate(props) {
    const resource = {
        resourceType: "Observation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {};

            if (!_.isNil(item.id)) {
                _category.id = item.id;
            }

            if (!_.isNil(item.coding)) {
                _category.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _category.text = item.text;
            }

            resource.category.push(_category);
        }
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        let _code = {};

        if (!_.isNil(src.id)) {
            _code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            _code.coding = src.coding;
        }

        if (!_.isNil(src.text)) {
            _code.text = src.text;
        }

        resource.code = _code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
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
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {};

            if (!_.isNil(item.id)) {
                _referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                _referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                _referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                _referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                _referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                _referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                _referenceRange.text = item.text;
            }

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = util.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = util.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {};

            if (!_.isNil(item.id)) {
                _component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _component.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _component.value = item.value;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                _component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                _component.interpretation = item.interpretation;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-resp-rate"
        ]
    };

    return resource;
}

function observation_fr_core_observation_saturation_oxygen(props) {
    const resource = {
        resourceType: "Observation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        let src = props.partOf;
        if (!Array.isArray(src)) { src = [src]; }
        resource.partOf = [];

        for (let item of src) {
            let _partOf = {};

            if (!_.isNil(item.id)) {
                _partOf.id = item.id;
            }

            if (!_.isNil(item.reference)) {
                _partOf.reference = item.reference;
            }

            if (!_.isNil(item.type)) {
                _partOf.type = item.type;
            }

            if (!_.isNil(item.identifier)) {
                _partOf.identifier = item.identifier;
            }

            if (!_.isNil(item.display)) {
                _partOf.display = item.display;
            }

            resource.partOf.push(_partOf);
        }
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {};

            if (!_.isNil(item.id)) {
                _category.id = item.id;
            }

            if (!_.isNil(item.coding)) {
                _category.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _category.text = item.text;
            }

            resource.category.push(_category);
        }
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        let _code = {};

        if (!_.isNil(src.id)) {
            _code.id = src.id;
        }

        if (!_.isNil(src.coding)) {
            _code.coding = src.coding;
        }

        if (!_.isNil(src.text)) {
            _code.text = src.text;
        }

        resource.code = _code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        util.composite(resource, "value", props.value);
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
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {};

            if (!_.isNil(item.id)) {
                _referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                _referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                _referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                _referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                _referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                _referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                _referenceRange.text = item.text;
            }

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = util.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = util.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {};

            if (!_.isNil(item.id)) {
                _component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _component.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _component.value = item.value;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                _component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                _component.interpretation = item.interpretation;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-observation-saturation-oxygen"
        ]
    };

    return resource;
}

/**
  * Create a FHIR Organization resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function organization(type, props) {
    const mappings = {
        "fr-core-organization": organization_fr_core_organization,
        "fr-core-organization-pole": organization_fr_core_organization_pole,
        "fr-core-organization-uac": organization_fr_core_organization_uac,
        "fr-core-organization-uf": organization_fr_core_organization_uf
    };

    return mappings[type](props)
}

function organization_fr_core_organization(props) {
    const resource = {
        resourceType: "Organization",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Organization</b></p></div>"
        }
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

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.type)) {
        let src = props.type;
        if (!Array.isArray(src)) { src = [src]; }
        resource.type = [];

        for (let item of src) {
            let _type = {};

            if (!_.isNil(item.id)) {
                _type.id = item.id;
            }

            if (!_.isNil(item.coding)) {
                _type.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _type.text = item.text;
            }

            resource.type.push(_type);
        }
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.alias)) {
        resource.alias = props.alias;
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.partOf)) {
        let src = props.partOf;
        let _partOf = {};

        if (!_.isNil(src.id)) {
            _partOf.id = src.id;
        }

        if (!_.isNil(src.reference)) {
            _partOf.reference = src.reference;
        }

        if (!_.isNil(src.type)) {
            _partOf.type = src.type;
        }

        if (!_.isNil(src.identifier)) {
            _partOf.identifier = src.identifier;
        }

        if (!_.isNil(src.display)) {
            _partOf.display = src.display;
        }

        resource.partOf = _partOf;
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {};

            if (!_.isNil(item.id)) {
                _contact.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _contact.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.purpose)) {
                _contact.purpose = item.purpose;
            }

            if (!_.isNil(item.name)) {
                _contact.name = item.name;
            }

            if (!_.isNil(item.telecom)) {
                _contact.telecom = item.telecom;
            }

            if (!_.isNil(item.address)) {
                _contact.address = item.address;
            }

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = util.reference(props.endpoint);
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization"]
    };

    return resource;
}

function organization_fr_core_organization_pole(props) {
    const resource = {
        resourceType: "Organization",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Organization</b></p></div>"
        }
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

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.alias)) {
        resource.alias = props.alias;
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.partOf)) {
        let src = props.partOf;
        let _partOf = {};

        if (!_.isNil(src.id)) {
            _partOf.id = src.id;
        }

        if (!_.isNil(src.reference)) {
            _partOf.reference = src.reference;
        }

        if (!_.isNil(src.type)) {
            _partOf.type = src.type;
        }

        if (!_.isNil(src.identifier)) {
            _partOf.identifier = src.identifier;
        }

        if (!_.isNil(src.display)) {
            _partOf.display = src.display;
        }

        resource.partOf = _partOf;
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {};

            if (!_.isNil(item.id)) {
                _contact.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _contact.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.purpose)) {
                _contact.purpose = item.purpose;
            }

            if (!_.isNil(item.name)) {
                _contact.name = item.name;
            }

            if (!_.isNil(item.telecom)) {
                _contact.telecom = item.telecom;
            }

            if (!_.isNil(item.address)) {
                _contact.address = item.address;
            }

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = util.reference(props.endpoint);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-pole"
        ]
    };

    return resource;
}

function organization_fr_core_organization_uac(props) {
    const resource = {
        resourceType: "Organization",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Organization</b></p></div>"
        }
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

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.alias)) {
        resource.alias = props.alias;
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.partOf)) {
        let src = props.partOf;
        let _partOf = {};

        if (!_.isNil(src.id)) {
            _partOf.id = src.id;
        }

        if (!_.isNil(src.reference)) {
            _partOf.reference = src.reference;
        }

        if (!_.isNil(src.type)) {
            _partOf.type = src.type;
        }

        if (!_.isNil(src.identifier)) {
            _partOf.identifier = src.identifier;
        }

        if (!_.isNil(src.display)) {
            _partOf.display = src.display;
        }

        resource.partOf = _partOf;
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {};

            if (!_.isNil(item.id)) {
                _contact.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _contact.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.purpose)) {
                _contact.purpose = item.purpose;
            }

            if (!_.isNil(item.name)) {
                _contact.name = item.name;
            }

            if (!_.isNil(item.telecom)) {
                _contact.telecom = item.telecom;
            }

            if (!_.isNil(item.address)) {
                _contact.address = item.address;
            }

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = util.reference(props.endpoint);
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-uac"]
    };

    return resource;
}

function organization_fr_core_organization_uf(props) {
    const resource = {
        resourceType: "Organization",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Organization</b></p></div>"
        }
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

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.alias)) {
        resource.alias = props.alias;
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {};

            if (!_.isNil(item.id)) {
                _contact.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _contact.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.purpose)) {
                _contact.purpose = item.purpose;
            }

            if (!_.isNil(item.name)) {
                _contact.name = item.name;
            }

            if (!_.isNil(item.telecom)) {
                _contact.telecom = item.telecom;
            }

            if (!_.isNil(item.address)) {
                _contact.address = item.address;
            }

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = util.reference(props.endpoint);
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-organization-uf"]
    };

    return resource;
}

/**
  * Create a FHIR Patient resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function patient(type, props) {
    const mappings = {
        "fr-core-patient": patient_fr_core_patient,
        "fr-core-patient-ins": patient_fr_core_patient_ins
    };

    return mappings[type](props)
}

function patient_fr_core_patient(props) {
    const resource = {
        resourceType: "Patient",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Patient</b></p></div>"
        }
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
        let src = props.extension;
        if (!Array.isArray(src)) { src = [src]; }
        resource.extension = [];

        for (let item of src) {
            let _extension = {};

            if (!_.isNil(item.id)) {
                _extension.id = item.id;
            }

            if (!_.isNil(item.url)) {
                _extension.url = item.url;
            }

            if (!_.isNil(item.value)) {
                _extension.value = item.value;
            }

            resource.extension.push(_extension);
        }
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.identifier)) {
        let src = props.identifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.identifier = [];

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (let item of src) {
            let _name = {};

            if (!_.isNil(item.id)) {
                _name.id = item.id;
            }

            if (!_.isNil(item["birth-list-given-name"])) {
                util.addExtension(
                    _name,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-birth-list-given-name",
                    item["birth-list-given-name"]
                );
            }

            if (!_.isNil(item.use)) {
                _name.use = item.use;
            }

            if (!_.isNil(item.text)) {
                _name.text = item.text;
            }

            if (!_.isNil(item.family)) {
                _name.family = item.family;
            }

            if (!_.isNil(item.given)) {
                _name.given = item.given;
            }

            if (!_.isNil(item.prefix)) {
                _name.prefix = item.prefix;
            }

            if (!_.isNil(item.suffix)) {
                _name.suffix = item.suffix;
            }

            if (!_.isNil(item.period)) {
                _name.period = item.period;
            }

            resource.name.push(_name);
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

    if (!_.isNil(props.deceased)) {
        util.composite(resource, "deceased", props.deceased);
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.maritalStatus)) {
        resource.maritalStatus = props.maritalStatus;
    }

    if (!_.isNil(props.multipleBirth)) {
        util.composite(resource, "multipleBirth", props.multipleBirth);
    }

    if (!_.isNil(props.photo)) {
        resource.photo = props.photo;
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {};

            if (!_.isNil(item.id)) {
                _contact.id = item.id;
            }

            if (!_.isNil(item.contactIdentifier)) {
                util.addExtension(
                    _contact,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-contact-identifier",
                    item.contactIdentifier
                );
            }

            if (!_.isNil(item.comment)) {
                util.addExtension(
                    _contact,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-comment",
                    item.comment
                );
            }

            if (!_.isNil(item.modifierExtension)) {
                _contact.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.relationship)) {
                _contact.relationship = item.relationship;
            }

            if (!_.isNil(item.name)) {
                _contact.name = item.name;
            }

            if (!_.isNil(item.telecom)) {
                _contact.telecom = item.telecom;
            }

            if (!_.isNil(item.address)) {
                _contact.address = item.address;
            }

            if (!_.isNil(item.gender)) {
                _contact.gender = item.gender;
            }

            if (!_.isNil(item.organization)) {
                _contact.organization = item.organization;
            }

            if (!_.isNil(item.period)) {
                _contact.period = item.period;
            }

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.communication)) {
        let src = props.communication;
        if (!Array.isArray(src)) { src = [src]; }
        resource.communication = [];

        for (let item of src) {
            let _communication = {};

            if (!_.isNil(item.id)) {
                _communication.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _communication.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.language)) {
                _communication.language = item.language;
            }

            if (!_.isNil(item.preferred)) {
                _communication.preferred = item.preferred;
            }

            resource.communication.push(_communication);
        }
    }

    if (!_.isNil(props.generalPractitioner)) {
        if (!Array.isArray(props.generalPractitioner)) { props.generalPractitioner = [props.generalPractitioner]; }
        resource.generalPractitioner = util.reference(props.generalPractitioner);
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = util.reference(props.managingOrganization);
    }

    if (!_.isNil(props.link)) {
        let src = props.link;
        if (!Array.isArray(src)) { src = [src]; }
        resource.link = [];

        for (let item of src) {
            let _link = {};

            if (!_.isNil(item.id)) {
                _link.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _link.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.other)) {
                _link.other = item.other;
            }

            if (!_.isNil(item.type)) {
                _link.type = item.type;
            }

            resource.link.push(_link);
        }
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient"]
    };

    return resource;
}

function patient_fr_core_patient_ins(props) {
    const resource = {
        resourceType: "Patient",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Patient</b></p></div>"
        }
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
        let src = props.extension;
        if (!Array.isArray(src)) { src = [src]; }
        resource.extension = [];

        for (let item of src) {
            let _extension = {};

            if (!_.isNil(item.id)) {
                _extension.id = item.id;
            }

            if (!_.isNil(item.url)) {
                _extension.url = item.url;
            }

            if (!_.isNil(item.value)) {
                _extension.value = item.value;
            }

            resource.extension.push(_extension);
        }
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.identifier)) {
        let src = props.identifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.identifier = [];

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    } else {
        resource.identifier = {"system":"urn:oid:1.2.250.1.213.1.4.8"};
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (let item of src) {
            let _name = {};

            if (!_.isNil(item.id)) {
                _name.id = item.id;
            }

            if (!_.isNil(item["birth-list-given-name"])) {
                util.addExtension(
                    _name,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-birth-list-given-name",
                    item["birth-list-given-name"]
                );
            }

            if (!_.isNil(item.use)) {
                _name.use = item.use;
            }

            if (!_.isNil(item.text)) {
                _name.text = item.text;
            }

            if (!_.isNil(item.family)) {
                _name.family = item.family;
            }

            if (!_.isNil(item.given)) {
                _name.given = item.given;
            }

            if (!_.isNil(item.prefix)) {
                _name.prefix = item.prefix;
            }

            if (!_.isNil(item.suffix)) {
                _name.suffix = item.suffix;
            }

            if (!_.isNil(item.period)) {
                _name.period = item.period;
            }

            resource.name.push(_name);
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

    if (!_.isNil(props.deceased)) {
        util.composite(resource, "deceased", props.deceased);
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.maritalStatus)) {
        resource.maritalStatus = props.maritalStatus;
    }

    if (!_.isNil(props.multipleBirth)) {
        util.composite(resource, "multipleBirth", props.multipleBirth);
    }

    if (!_.isNil(props.photo)) {
        resource.photo = props.photo;
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {};

            if (!_.isNil(item.id)) {
                _contact.id = item.id;
            }

            if (!_.isNil(item.contactIdentifier)) {
                util.addExtension(
                    _contact,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-contact-identifier",
                    item.contactIdentifier
                );
            }

            if (!_.isNil(item.comment)) {
                util.addExtension(
                    _contact,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-comment",
                    item.comment
                );
            }

            if (!_.isNil(item.modifierExtension)) {
                _contact.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.relationship)) {
                _contact.relationship = item.relationship;
            }

            if (!_.isNil(item.name)) {
                _contact.name = item.name;
            }

            if (!_.isNil(item.telecom)) {
                _contact.telecom = item.telecom;
            }

            if (!_.isNil(item.address)) {
                _contact.address = item.address;
            }

            if (!_.isNil(item.gender)) {
                _contact.gender = item.gender;
            }

            if (!_.isNil(item.organization)) {
                _contact.organization = item.organization;
            }

            if (!_.isNil(item.period)) {
                _contact.period = item.period;
            }

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.communication)) {
        let src = props.communication;
        if (!Array.isArray(src)) { src = [src]; }
        resource.communication = [];

        for (let item of src) {
            let _communication = {};

            if (!_.isNil(item.id)) {
                _communication.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _communication.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.language)) {
                _communication.language = item.language;
            }

            if (!_.isNil(item.preferred)) {
                _communication.preferred = item.preferred;
            }

            resource.communication.push(_communication);
        }
    }

    if (!_.isNil(props.generalPractitioner)) {
        if (!Array.isArray(props.generalPractitioner)) { props.generalPractitioner = [props.generalPractitioner]; }
        resource.generalPractitioner = util.reference(props.generalPractitioner);
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = util.reference(props.managingOrganization);
    }

    if (!_.isNil(props.link)) {
        let src = props.link;
        if (!Array.isArray(src)) { src = [src]; }
        resource.link = [];

        for (let item of src) {
            let _link = {};

            if (!_.isNil(item.id)) {
                _link.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _link.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.other)) {
                _link.other = item.other;
            }

            if (!_.isNil(item.type)) {
                _link.type = item.type;
            }

            resource.link.push(_link);
        }
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-ins"]
    };

    return resource;
}

/**
  * Create a FHIR Practitioner resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function practitioner(type, props) {
    const mappings = {
        "fr-core-practitioner": practitioner_fr_core_practitioner
    };

    return mappings[type](props)
}

function practitioner_fr_core_practitioner(props) {
    const resource = {
        resourceType: "Practitioner",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Practitioner</b></p></div>"
        }
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

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.gender)) {
        resource.gender = props.gender;
    }

    if (!_.isNil(props.birthDate)) {
        resource.birthDate = props.birthDate;
    }

    if (!_.isNil(props.photo)) {
        resource.photo = props.photo;
    }

    if (!_.isNil(props.qualification)) {
        let src = props.qualification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.qualification = [];

        for (let item of src) {
            let _qualification = {};

            if (!_.isNil(item.id)) {
                _qualification.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _qualification.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _qualification.identifier = item.identifier;
            }

            if (!_.isNil(item.code)) {
                _qualification.code = item.code;
            }

            if (!_.isNil(item.period)) {
                _qualification.period = item.period;
            }

            if (!_.isNil(item.issuer)) {
                _qualification.issuer = item.issuer;
            }

            resource.qualification.push(_qualification);
        }
    }

    if (!_.isNil(props.communication)) {
        resource.communication = props.communication;
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-practitioner"]
    };

    return resource;
}

/**
  * Create a FHIR PractitionerRole resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function practitionerRole(type, props) {
    const mappings = {
        "fr-core-practitioner-role-exercice": practitionerRole_fr_core_practitioner_role_exercice,
        "fr-core-practitioner-role-profession": practitionerRole_fr_core_practitioner_role_profession
    };

    return mappings[type](props)
}

function practitionerRole_fr_core_practitioner_role_exercice(props) {
    const resource = {
        resourceType: "PractitionerRole",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PractitionerRole</b></p></div>"
        }
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

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.practitioner)) {
        resource.practitioner = util.reference(props.practitioner);
    }

    if (!_.isNil(props.organization)) {
        resource.organization = util.reference(props.organization);
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.specialty)) {
        resource.specialty = props.specialty;
    }

    if (!_.isNil(props.location)) {
        if (!Array.isArray(props.location)) { props.location = [props.location]; }
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.healthcareService)) {
        if (!Array.isArray(props.healthcareService)) { props.healthcareService = [props.healthcareService]; }
        resource.healthcareService = util.reference(props.healthcareService);
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.availableTime)) {
        let src = props.availableTime;
        if (!Array.isArray(src)) { src = [src]; }
        resource.availableTime = [];

        for (let item of src) {
            let _availableTime = {};

            if (!_.isNil(item.id)) {
                _availableTime.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _availableTime.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.daysOfWeek)) {
                _availableTime.daysOfWeek = item.daysOfWeek;
            }

            if (!_.isNil(item.allDay)) {
                _availableTime.allDay = item.allDay;
            }

            if (!_.isNil(item.availableStartTime)) {
                _availableTime.availableStartTime = item.availableStartTime;
            }

            if (!_.isNil(item.availableEndTime)) {
                _availableTime.availableEndTime = item.availableEndTime;
            }

            resource.availableTime.push(_availableTime);
        }
    }

    if (!_.isNil(props.notAvailable)) {
        let src = props.notAvailable;
        if (!Array.isArray(src)) { src = [src]; }
        resource.notAvailable = [];

        for (let item of src) {
            let _notAvailable = {};

            if (!_.isNil(item.id)) {
                _notAvailable.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _notAvailable.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _notAvailable.description = item.description;
            }

            if (!_.isNil(item.during)) {
                _notAvailable.during = item.during;
            }

            resource.notAvailable.push(_notAvailable);
        }
    }

    if (!_.isNil(props.availabilityExceptions)) {
        resource.availabilityExceptions = props.availabilityExceptions;
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = util.reference(props.endpoint);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-practitioner-role-exercice"
        ]
    };

    return resource;
}

function practitionerRole_fr_core_practitioner_role_profession(props) {
    const resource = {
        resourceType: "PractitionerRole",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PractitionerRole</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.practitioner)) {
        resource.practitioner = util.reference(props.practitioner);
    }

    if (!_.isNil(props.organization)) {
        resource.organization = util.reference(props.organization);
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        if (!Array.isArray(src)) { src = [src]; }
        resource.code = [];

        for (let item of src) {
            let _code = {};

            if (!_.isNil(item.id)) {
                _code.id = item.id;
            }

            if (!_.isNil(item.professionnalCategory)) {
                util.addExtension(
                    _code,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-role-code-categorie-professionnelle",
                    item.professionnalCategory
                );
            }

            if (!_.isNil(item.coding)) {
                _code.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _code.text = item.text;
            }

            resource.code.push(_code);
        }
    }

    if (!_.isNil(props.specialty)) {
        resource.specialty = props.specialty;
    }

    if (!_.isNil(props.location)) {
        if (!Array.isArray(props.location)) { props.location = [props.location]; }
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.healthcareService)) {
        if (!Array.isArray(props.healthcareService)) { props.healthcareService = [props.healthcareService]; }
        resource.healthcareService = util.reference(props.healthcareService);
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.availableTime)) {
        let src = props.availableTime;
        if (!Array.isArray(src)) { src = [src]; }
        resource.availableTime = [];

        for (let item of src) {
            let _availableTime = {};

            if (!_.isNil(item.id)) {
                _availableTime.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _availableTime.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.daysOfWeek)) {
                _availableTime.daysOfWeek = item.daysOfWeek;
            }

            if (!_.isNil(item.allDay)) {
                _availableTime.allDay = item.allDay;
            }

            if (!_.isNil(item.availableStartTime)) {
                _availableTime.availableStartTime = item.availableStartTime;
            }

            if (!_.isNil(item.availableEndTime)) {
                _availableTime.availableEndTime = item.availableEndTime;
            }

            resource.availableTime.push(_availableTime);
        }
    }

    if (!_.isNil(props.notAvailable)) {
        let src = props.notAvailable;
        if (!Array.isArray(src)) { src = [src]; }
        resource.notAvailable = [];

        for (let item of src) {
            let _notAvailable = {};

            if (!_.isNil(item.id)) {
                _notAvailable.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _notAvailable.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _notAvailable.description = item.description;
            }

            if (!_.isNil(item.during)) {
                _notAvailable.during = item.during;
            }

            resource.notAvailable.push(_notAvailable);
        }
    }

    if (!_.isNil(props.availabilityExceptions)) {
        resource.availabilityExceptions = props.availabilityExceptions;
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = util.reference(props.endpoint);
    }

    resource.meta = {
        profile: [
            "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-practitioner-role-profession"
        ]
    };

    return resource;
}

/**
  * Create a FHIR RelatedPerson resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function relatedPerson(type, props) {
    const mappings = {
        "fr-core-related-person": relatedPerson_fr_core_related_person
    };

    return mappings[type](props)
}

function relatedPerson_fr_core_related_person(props) {
    const resource = {
        resourceType: "RelatedPerson",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RelatedPerson</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.relationship)) {
        let src = props.relationship;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relationship = [];

        for (let item of src) {
            let _relationship = {};

            if (!_.isNil(item.id)) {
                _relationship.id = item.id;
            }

            if (!_.isNil(item.coding)) {
                _relationship.coding = item.coding;
            }

            if (!_.isNil(item.text)) {
                _relationship.text = item.text;
            }

            resource.relationship.push(_relationship);
        }
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
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
        resource.address = props.address;
    }

    if (!_.isNil(props.photo)) {
        resource.photo = props.photo;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.communication)) {
        let src = props.communication;
        if (!Array.isArray(src)) { src = [src]; }
        resource.communication = [];

        for (let item of src) {
            let _communication = {};

            if (!_.isNil(item.id)) {
                _communication.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _communication.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.language)) {
                _communication.language = item.language;
            }

            if (!_.isNil(item.preferred)) {
                _communication.preferred = item.preferred;
            }

            resource.communication.push(_communication);
        }
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-related-person"]
    };

    return resource;
}

/**
  * Create a FHIR Schedule resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function schedule(type, props) {
    const mappings = {
        "fr-core-schedule": schedule_fr_core_schedule
    };

    return mappings[type](props)
}

function schedule_fr_core_schedule(props) {
    const resource = {
        resourceType: "Schedule",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Schedule</b></p></div>"
        }
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.serviceCategory)) {
        resource.serviceCategory = props.serviceCategory;
    }

    if (!_.isNil(props.serviceType)) {
        resource.serviceType = props.serviceType;
    }

    if (!_.isNil(props.specialty)) {
        resource.specialty = props.specialty;
    }

    if (!_.isNil(props.actor)) {
        if (!Array.isArray(props.actor)) { props.actor = [props.actor]; }
        resource.actor = util.reference(props.actor);
    }

    if (!_.isNil(props.planningHorizon)) {
        resource.planningHorizon = props.planningHorizon;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-schedule"]
    };

    return resource;
}

/**
  * Create a FHIR Slot resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function slot(type, props) {
    const mappings = {
        "fr-core-slot": slot_fr_core_slot
    };

    return mappings[type](props)
}

function slot_fr_core_slot(props) {
    const resource = {
        resourceType: "Slot",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Slot</b></p></div>"
        }
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

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.serviceCategory)) {
        resource.serviceCategory = props.serviceCategory;
    }

    if (!_.isNil(props.serviceType)) {
        resource.serviceType = props.serviceType;
    }

    if (!_.isNil(props.specialty)) {
        resource.specialty = props.specialty;
    }

    if (!_.isNil(props.appointmentType)) {
        resource.appointmentType = props.appointmentType;
    }

    if (!_.isNil(props.schedule)) {
        resource.schedule = util.reference(props.schedule);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.start)) {
        resource.start = props.start;
    }

    if (!_.isNil(props.end)) {
        resource.end = props.end;
    }

    if (!_.isNil(props.overbooked)) {
        resource.overbooked = props.overbooked;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-slot"]
    };

    return resource;
}
