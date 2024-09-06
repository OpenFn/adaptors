
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import * as util from "./Utils.js";
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusHistory)) {
        let src = props.statusHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statusHistory = [];

        for (let item of src) {
            let statusHistory = {};

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

        for (let item of src) {
            let classHistory = {};

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

        for (let item of src) {
            let participant = {};

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

        for (let item of src) {
            let diagnosis = {};

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

        resource.hospitalization = hospitalization;
    }

    if (!_.isNil(props.location)) {
        let src = props.location;
        if (!Array.isArray(src)) { src = [src]; }
        resource.location = [];

        for (let item of src) {
            let location = {};

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

        for (let item of src) {
            let identifier = {};

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

            identifier = util.mapSystems(identifier);
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

        for (let item of src) {
            let statusHistory = {};

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

        for (let item of src) {
            let classHistory = {};

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

        for (let item of src) {
            let type = {};

            if (!_.isNil(item.id)) {
                type.id = item.id;
            }

            if (!_.isNil(item.visitType)) {
                util.addExtension(
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

        for (let item of src) {
            let participant = {};

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

        resource.period = period;
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

        for (let item of src) {
            let diagnosis = {};

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

        resource.hospitalization = hospitalization;
    }

    if (!_.isNil(props.location)) {
        let src = props.location;
        if (!Array.isArray(src)) { src = [src]; }
        resource.location = [];

        for (let item of src) {
            let location = {};

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