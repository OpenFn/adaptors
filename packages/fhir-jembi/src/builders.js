
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import * as util from "./Utils.js";
import _ from "lodash";

export function medicationDispense(type, props) {
    const mappings = {
        "arv-medication-dispense": medicationDispense_arv_medication_dispense,
        "cotrimoxazole-preventive-therapy-medication-dispense": medicationDispense_cotrimoxazole_preventive_therapy_medication_dispense,
        "generic-medication-dispense": medicationDispense_generic_medication_dispense
    };

    return mappings[type](props)
}

function medicationDispense_arv_medication_dispense(props) {
    const resource = {
        resourceType: "MedicationDispense"
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

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        util.composite(resource, "statusReason", props.statusReason);
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
        resource.supportingInformation = util.reference(props.supportingInformation);
    }

    if (!_.isNil(props.performer)) {
        let src = props.performer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.performer = [];

        for (let item of src) {
            let performer = {};

            if (!_.isNil(item.id)) {
                performer.id = item.id;
            } else
                {}

            if (!_.isNil(item.modifierExtension)) {
                performer.modifierExtension = item.modifierExtension;
            } else
                {}

            if (!_.isNil(item.function)) {
                performer.function = item.function;
            } else
                {}

            if (!_.isNil(item.actor)) {
                performer.actor = item.actor;
            } else
                {}

            resource.performer.push(performer);
        }
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.authorizingPrescription)) {
        resource.authorizingPrescription = util.reference(props.authorizingPrescription);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.quantity)) {
        let src = props.quantity;
        let quantity = {};

        if (!_.isNil(src.id)) {
            quantity.id = src.id;
        } else
            {}

        if (!_.isNil(src.value)) {
            quantity.value = src.value;
        } else
            {}

        if (!_.isNil(src.comparator)) {
            quantity.comparator = src.comparator;
        } else
            {}

        if (!_.isNil(src.unit)) {
            quantity.unit = src.unit;
        } else
            {}

        if (!_.isNil(src.system)) {
            quantity.system = src.system;
        } else
            {}

        if (!_.isNil(src.code)) {
            quantity.code = src.code;
        } else
            {}

        quantity = util.mapSystems(quantity);
        resource.quantity = quantity;
    }

    if (!_.isNil(props.daysSupply)) {
        let src = props.daysSupply;
        let daysSupply = {};

        if (!_.isNil(src.id)) {
            daysSupply.id = src.id;
        } else
            {}

        if (!_.isNil(src.value)) {
            daysSupply.value = src.value;
        } else
            {}

        if (!_.isNil(src.comparator)) {
            daysSupply.comparator = src.comparator;
        } else
            {}

        if (!_.isNil(src.unit)) {
            daysSupply.unit = src.unit;
        } else
            {}

        if (!_.isNil(src.system)) {
            daysSupply.system = src.system;
        } else
            {}

        if (!_.isNil(src.code)) {
            daysSupply.code = src.code;
        } else
            {}

        daysSupply = util.mapSystems(daysSupply);
        resource.daysSupply = daysSupply;
    }

    if (!_.isNil(props.whenPrepared)) {
        resource.whenPrepared = props.whenPrepared;
    }

    if (!_.isNil(props.whenHandedOver)) {
        resource.whenHandedOver = props.whenHandedOver;
    }

    if (!_.isNil(props.destination)) {
        resource.destination = util.reference(props.destination);
    }

    if (!_.isNil(props.receiver)) {
        resource.receiver = util.reference(props.receiver);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.dosageInstruction)) {
        resource.dosageInstruction = props.dosageInstruction;
    }

    if (!_.isNil(props.substitution)) {
        let src = props.substitution;
        let substitution = {};

        if (!_.isNil(src.id)) {
            substitution.id = src.id;
        } else
            {}

        if (!_.isNil(src.modifierExtension)) {
            substitution.modifierExtension = src.modifierExtension;
        } else
            {}

        if (!_.isNil(src.wasSubstituted)) {
            substitution.wasSubstituted = src.wasSubstituted;
        } else
            {}

        if (!_.isNil(src.type)) {
            substitution.type = src.type;
        } else
            {}

        if (!_.isNil(src.reason)) {
            substitution.reason = src.reason;
        } else
            {}

        if (!_.isNil(src.responsibleParty)) {
            substitution.responsibleParty = src.responsibleParty;
        } else
            {}

        resource.substitution = substitution;
    }

    if (!_.isNil(props.detectedIssue)) {
        resource.detectedIssue = util.reference(props.detectedIssue);
    }

    if (!_.isNil(props.eventHistory)) {
        resource.eventHistory = util.reference(props.eventHistory);
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/arv-medication-dispense"]
    };

    return resource;
}

function medicationDispense_cotrimoxazole_preventive_therapy_medication_dispense(props) {
    const resource = {
        resourceType: "MedicationDispense"
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

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        util.composite(resource, "statusReason", props.statusReason);
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
        resource.supportingInformation = util.reference(props.supportingInformation);
    }

    if (!_.isNil(props.performer)) {
        let src = props.performer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.performer = [];

        for (let item of src) {
            let performer = {};

            if (!_.isNil(item.id)) {
                performer.id = item.id;
            } else
                {}

            if (!_.isNil(item.modifierExtension)) {
                performer.modifierExtension = item.modifierExtension;
            } else
                {}

            if (!_.isNil(item.function)) {
                performer.function = item.function;
            } else
                {}

            if (!_.isNil(item.actor)) {
                performer.actor = item.actor;
            } else
                {}

            resource.performer.push(performer);
        }
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.authorizingPrescription)) {
        resource.authorizingPrescription = util.reference(props.authorizingPrescription);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.quantity)) {
        let src = props.quantity;
        let quantity = {};

        if (!_.isNil(src.id)) {
            quantity.id = src.id;
        } else
            {}

        if (!_.isNil(src.value)) {
            quantity.value = src.value;
        } else
            {}

        if (!_.isNil(src.comparator)) {
            quantity.comparator = src.comparator;
        } else
            {}

        if (!_.isNil(src.unit)) {
            quantity.unit = src.unit;
        } else
            {}

        if (!_.isNil(src.system)) {
            quantity.system = src.system;
        } else
            {}

        if (!_.isNil(src.code)) {
            quantity.code = src.code;
        } else
            {}

        quantity = util.mapSystems(quantity);
        resource.quantity = quantity;
    }

    if (!_.isNil(props.daysSupply)) {
        let src = props.daysSupply;
        let daysSupply = {};

        if (!_.isNil(src.id)) {
            daysSupply.id = src.id;
        } else
            {}

        if (!_.isNil(src.value)) {
            daysSupply.value = src.value;
        } else
            {}

        if (!_.isNil(src.comparator)) {
            daysSupply.comparator = src.comparator;
        } else
            {}

        if (!_.isNil(src.unit)) {
            daysSupply.unit = src.unit;
        } else
            {}

        if (!_.isNil(src.system)) {
            daysSupply.system = src.system;
        } else
            {}

        if (!_.isNil(src.code)) {
            daysSupply.code = src.code;
        } else
            {}

        daysSupply = util.mapSystems(daysSupply);
        resource.daysSupply = daysSupply;
    }

    if (!_.isNil(props.whenPrepared)) {
        resource.whenPrepared = props.whenPrepared;
    }

    if (!_.isNil(props.whenHandedOver)) {
        resource.whenHandedOver = props.whenHandedOver;
    }

    if (!_.isNil(props.destination)) {
        resource.destination = util.reference(props.destination);
    }

    if (!_.isNil(props.receiver)) {
        resource.receiver = util.reference(props.receiver);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.dosageInstruction)) {
        resource.dosageInstruction = props.dosageInstruction;
    }

    if (!_.isNil(props.substitution)) {
        let src = props.substitution;
        let substitution = {};

        if (!_.isNil(src.id)) {
            substitution.id = src.id;
        } else
            {}

        if (!_.isNil(src.modifierExtension)) {
            substitution.modifierExtension = src.modifierExtension;
        } else
            {}

        if (!_.isNil(src.wasSubstituted)) {
            substitution.wasSubstituted = src.wasSubstituted;
        } else
            {}

        if (!_.isNil(src.type)) {
            substitution.type = src.type;
        } else
            {}

        if (!_.isNil(src.reason)) {
            substitution.reason = src.reason;
        } else
            {}

        if (!_.isNil(src.responsibleParty)) {
            substitution.responsibleParty = src.responsibleParty;
        } else
            {}

        resource.substitution = substitution;
    }

    if (!_.isNil(props.detectedIssue)) {
        resource.detectedIssue = util.reference(props.detectedIssue);
    }

    if (!_.isNil(props.eventHistory)) {
        resource.eventHistory = util.reference(props.eventHistory);
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cotrimoxazole-preventive-therapy-medication-dispense"
        ]
    };

    return resource;
}

function medicationDispense_generic_medication_dispense(props) {
    const resource = {
        resourceType: "MedicationDispense"
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

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        util.composite(resource, "statusReason", props.statusReason);
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
        resource.supportingInformation = util.reference(props.supportingInformation);
    }

    if (!_.isNil(props.performer)) {
        let src = props.performer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.performer = [];

        for (let item of src) {
            let performer = {};

            if (!_.isNil(item.id)) {
                performer.id = item.id;
            } else
                {}

            if (!_.isNil(item.modifierExtension)) {
                performer.modifierExtension = item.modifierExtension;
            } else
                {}

            if (!_.isNil(item.function)) {
                performer.function = item.function;
            } else
                {}

            if (!_.isNil(item.actor)) {
                performer.actor = item.actor;
            } else
                {}

            resource.performer.push(performer);
        }
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.authorizingPrescription)) {
        resource.authorizingPrescription = util.reference(props.authorizingPrescription);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.quantity)) {
        let src = props.quantity;
        let quantity = {};

        if (!_.isNil(src.id)) {
            quantity.id = src.id;
        } else
            {}

        if (!_.isNil(src.value)) {
            quantity.value = src.value;
        } else
            {}

        if (!_.isNil(src.comparator)) {
            quantity.comparator = src.comparator;
        } else
            {}

        if (!_.isNil(src.unit)) {
            quantity.unit = src.unit;
        } else
            {}

        if (!_.isNil(src.system)) {
            quantity.system = src.system;
        } else
            {}

        if (!_.isNil(src.code)) {
            quantity.code = src.code;
        } else
            {}

        quantity = util.mapSystems(quantity);
        resource.quantity = quantity;
    }

    if (!_.isNil(props.daysSupply)) {
        let src = props.daysSupply;
        let daysSupply = {};

        if (!_.isNil(src.id)) {
            daysSupply.id = src.id;
        } else
            {}

        if (!_.isNil(src.value)) {
            daysSupply.value = src.value;
        } else
            {}

        if (!_.isNil(src.comparator)) {
            daysSupply.comparator = src.comparator;
        } else
            {}

        if (!_.isNil(src.unit)) {
            daysSupply.unit = src.unit;
        } else
            {}

        if (!_.isNil(src.system)) {
            daysSupply.system = src.system;
        } else
            {}

        if (!_.isNil(src.code)) {
            daysSupply.code = src.code;
        } else
            {}

        daysSupply = util.mapSystems(daysSupply);
        resource.daysSupply = daysSupply;
    }

    if (!_.isNil(props.whenPrepared)) {
        resource.whenPrepared = props.whenPrepared;
    }

    if (!_.isNil(props.whenHandedOver)) {
        resource.whenHandedOver = props.whenHandedOver;
    }

    if (!_.isNil(props.destination)) {
        resource.destination = util.reference(props.destination);
    }

    if (!_.isNil(props.receiver)) {
        resource.receiver = util.reference(props.receiver);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.dosageInstruction)) {
        resource.dosageInstruction = props.dosageInstruction;
    }

    if (!_.isNil(props.substitution)) {
        let src = props.substitution;
        let substitution = {};

        if (!_.isNil(src.id)) {
            substitution.id = src.id;
        } else
            {}

        if (!_.isNil(src.modifierExtension)) {
            substitution.modifierExtension = src.modifierExtension;
        } else
            {}

        if (!_.isNil(src.wasSubstituted)) {
            substitution.wasSubstituted = src.wasSubstituted;
        } else
            {}

        if (!_.isNil(src.type)) {
            substitution.type = src.type;
        } else
            {}

        if (!_.isNil(src.reason)) {
            substitution.reason = src.reason;
        } else
            {}

        if (!_.isNil(src.responsibleParty)) {
            substitution.responsibleParty = src.responsibleParty;
        } else
            {}

        resource.substitution = substitution;
    }

    if (!_.isNil(props.detectedIssue)) {
        resource.detectedIssue = util.reference(props.detectedIssue);
    }

    if (!_.isNil(props.eventHistory)) {
        resource.eventHistory = util.reference(props.eventHistory);
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/generic-medication-dispense"
        ]
    };

    return resource;
}