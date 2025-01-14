
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "./utils.js";
import _ from "lodash";

/**
  * Create a FHIR Account resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function account(type, props) {
    const mappings = {
        "Account": account_Account
    };

    return mappings[type](props)
}

function account_Account(props) {
    const resource = {
        resourceType: "Account",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Account</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.servicePeriod)) {
        resource.servicePeriod = props.servicePeriod;
    }

    if (!_.isNil(props.coverage)) {
        let src = props.coverage;
        if (!Array.isArray(src)) { src = [src]; }
        resource.coverage = [];

        for (let item of src) {
            let _coverage = {};

            if (!_.isNil(item.id)) {
                _coverage.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _coverage.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.coverage)) {
                _coverage.coverage = item.coverage;
            }

            if (!_.isNil(item.priority)) {
                _coverage.priority = item.priority;
            }

            resource.coverage.push(_coverage);
        }
    }

    if (!_.isNil(props.owner)) {
        resource.owner = util.reference(props.owner);
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.guarantor)) {
        let src = props.guarantor;
        if (!Array.isArray(src)) { src = [src]; }
        resource.guarantor = [];

        for (let item of src) {
            let _guarantor = {};

            if (!_.isNil(item.id)) {
                _guarantor.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _guarantor.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.party)) {
                _guarantor.party = item.party;
            }

            if (!_.isNil(item.onHold)) {
                _guarantor.onHold = item.onHold;
            }

            if (!_.isNil(item.period)) {
                _guarantor.period = item.period;
            }

            resource.guarantor.push(_guarantor);
        }
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Account"]
    };

    return resource;
}

/**
  * Create a FHIR ActivityDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function activityDefinition(type, props) {
    const mappings = {
        "ActivityDefinition": activityDefinition_ActivityDefinition
    };

    return mappings[type](props)
}

function activityDefinition_ActivityDefinition(props) {
    const resource = {
        resourceType: "ActivityDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ActivityDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.subject)) {
        util.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.library)) {
        resource.library = props.library;
    }

    if (!_.isNil(props.kind)) {
        resource.kind = props.kind;
    }

    if (!_.isNil(props.profile)) {
        resource.profile = props.profile;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.doNotPerform)) {
        resource.doNotPerform = props.doNotPerform;
    }

    if (!_.isNil(props.timing)) {
        util.composite(resource, "timing", props.timing);
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
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

            if (!_.isNil(item.role)) {
                _participant.role = item.role;
            }

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.product)) {
        util.composite(resource, "product", props.product);
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.dosage)) {
        resource.dosage = props.dosage;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.specimenRequirement)) {
        if (!Array.isArray(props.specimenRequirement)) { props.specimenRequirement = [props.specimenRequirement]; }
        resource.specimenRequirement = util.reference(props.specimenRequirement);
    }

    if (!_.isNil(props.observationRequirement)) {
        if (!Array.isArray(props.observationRequirement)) { props.observationRequirement = [props.observationRequirement]; }
        resource.observationRequirement = util.reference(props.observationRequirement);
    }

    if (!_.isNil(props.observationResultRequirement)) {
        if (!Array.isArray(props.observationResultRequirement)) { props.observationResultRequirement = [props.observationResultRequirement]; }
        resource.observationResultRequirement = util.reference(props.observationResultRequirement);
    }

    if (!_.isNil(props.transform)) {
        resource.transform = props.transform;
    }

    if (!_.isNil(props.dynamicValue)) {
        let src = props.dynamicValue;
        if (!Array.isArray(src)) { src = [src]; }
        resource.dynamicValue = [];

        for (let item of src) {
            let _dynamicValue = {};

            if (!_.isNil(item.id)) {
                _dynamicValue.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _dynamicValue.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.path)) {
                _dynamicValue.path = item.path;
            }

            if (!_.isNil(item.expression)) {
                _dynamicValue.expression = item.expression;
            }

            resource.dynamicValue.push(_dynamicValue);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR AdministrableProductDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function administrableProductDefinition(type, props) {
    const mappings = {
        "AdministrableProductDefinition": administrableProductDefinition_AdministrableProductDefinition
    };

    return mappings[type](props)
}

function administrableProductDefinition_AdministrableProductDefinition(props) {
    const resource = {
        resourceType: "AdministrableProductDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AdministrableProductDefinition</b></p></div>"
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

    if (!_.isNil(props.formOf)) {
        if (!Array.isArray(props.formOf)) { props.formOf = [props.formOf]; }
        resource.formOf = util.reference(props.formOf);
    }

    if (!_.isNil(props.administrableDoseForm)) {
        resource.administrableDoseForm = props.administrableDoseForm;
    }

    if (!_.isNil(props.unitOfPresentation)) {
        resource.unitOfPresentation = props.unitOfPresentation;
    }

    if (!_.isNil(props.producedFrom)) {
        if (!Array.isArray(props.producedFrom)) { props.producedFrom = [props.producedFrom]; }
        resource.producedFrom = util.reference(props.producedFrom);
    }

    if (!_.isNil(props.ingredient)) {
        resource.ingredient = props.ingredient;
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {};

            if (!_.isNil(item.id)) {
                _property.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _property.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _property.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _property.value = item.value;
            }

            if (!_.isNil(item.status)) {
                _property.status = item.status;
            }

            resource.property.push(_property);
        }
    }

    if (!_.isNil(props.routeOfAdministration)) {
        let src = props.routeOfAdministration;
        if (!Array.isArray(src)) { src = [src]; }
        resource.routeOfAdministration = [];

        for (let item of src) {
            let _routeOfAdministration = {};

            if (!_.isNil(item.id)) {
                _routeOfAdministration.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _routeOfAdministration.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _routeOfAdministration.code = item.code;
            }

            if (!_.isNil(item.firstDose)) {
                _routeOfAdministration.firstDose = item.firstDose;
            }

            if (!_.isNil(item.maxSingleDose)) {
                _routeOfAdministration.maxSingleDose = item.maxSingleDose;
            }

            if (!_.isNil(item.maxDosePerDay)) {
                _routeOfAdministration.maxDosePerDay = item.maxDosePerDay;
            }

            if (!_.isNil(item.maxDosePerTreatmentPeriod)) {
                _routeOfAdministration.maxDosePerTreatmentPeriod = item.maxDosePerTreatmentPeriod;
            }

            if (!_.isNil(item.maxTreatmentPeriod)) {
                _routeOfAdministration.maxTreatmentPeriod = item.maxTreatmentPeriod;
            }

            if (!_.isNil(item.targetSpecies)) {
                _routeOfAdministration.targetSpecies = item.targetSpecies;
            }

            resource.routeOfAdministration.push(_routeOfAdministration);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AdministrableProductDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR AdverseEvent resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function adverseEvent(type, props) {
    const mappings = {
        "AdverseEvent": adverseEvent_AdverseEvent
    };

    return mappings[type](props)
}

function adverseEvent_AdverseEvent(props) {
    const resource = {
        resourceType: "AdverseEvent",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AdverseEvent</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.actuality)) {
        resource.actuality = props.actuality;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.event)) {
        resource.event = props.event;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.detected)) {
        resource.detected = props.detected;
    }

    if (!_.isNil(props.recordedDate)) {
        resource.recordedDate = props.recordedDate;
    }

    if (!_.isNil(props.resultingCondition)) {
        if (!Array.isArray(props.resultingCondition)) { props.resultingCondition = [props.resultingCondition]; }
        resource.resultingCondition = util.reference(props.resultingCondition);
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.seriousness)) {
        resource.seriousness = props.seriousness;
    }

    if (!_.isNil(props.severity)) {
        resource.severity = props.severity;
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = util.reference(props.recorder);
    }

    if (!_.isNil(props.contributor)) {
        if (!Array.isArray(props.contributor)) { props.contributor = [props.contributor]; }
        resource.contributor = util.reference(props.contributor);
    }

    if (!_.isNil(props.suspectEntity)) {
        let src = props.suspectEntity;
        if (!Array.isArray(src)) { src = [src]; }
        resource.suspectEntity = [];

        for (let item of src) {
            let _suspectEntity = {};

            if (!_.isNil(item.id)) {
                _suspectEntity.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _suspectEntity.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.instance)) {
                _suspectEntity.instance = item.instance;
            }

            if (!_.isNil(item.causality)) {
                _suspectEntity.causality = item.causality;
            }

            resource.suspectEntity.push(_suspectEntity);
        }
    }

    if (!_.isNil(props.subjectMedicalHistory)) {
        if (!Array.isArray(props.subjectMedicalHistory)) { props.subjectMedicalHistory = [props.subjectMedicalHistory]; }
        resource.subjectMedicalHistory = util.reference(props.subjectMedicalHistory);
    }

    if (!_.isNil(props.referenceDocument)) {
        if (!Array.isArray(props.referenceDocument)) { props.referenceDocument = [props.referenceDocument]; }
        resource.referenceDocument = util.reference(props.referenceDocument);
    }

    if (!_.isNil(props.study)) {
        if (!Array.isArray(props.study)) { props.study = [props.study]; }
        resource.study = util.reference(props.study);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AdverseEvent"]
    };

    return resource;
}

/**
  * Create a FHIR AllergyIntolerance resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function allergyIntolerance(type, props) {
    const mappings = {
        "AllergyIntolerance": allergyIntolerance_AllergyIntolerance
    };

    return mappings[type](props)
}

function allergyIntolerance_AllergyIntolerance(props) {
    const resource = {
        resourceType: "AllergyIntolerance",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AllergyIntolerance</b></p></div>"
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

    if (!_.isNil(props.clinicalStatus)) {
        resource.clinicalStatus = props.clinicalStatus;
    }

    if (!_.isNil(props.verificationStatus)) {
        resource.verificationStatus = props.verificationStatus;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.criticality)) {
        resource.criticality = props.criticality;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.onset)) {
        util.composite(resource, "onset", props.onset);
    }

    if (!_.isNil(props.recordedDate)) {
        resource.recordedDate = props.recordedDate;
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = util.reference(props.recorder);
    }

    if (!_.isNil(props.asserter)) {
        resource.asserter = util.reference(props.asserter);
    }

    if (!_.isNil(props.lastOccurrence)) {
        resource.lastOccurrence = props.lastOccurrence;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.reaction)) {
        let src = props.reaction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.reaction = [];

        for (let item of src) {
            let _reaction = {};

            if (!_.isNil(item.id)) {
                _reaction.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _reaction.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.substance)) {
                _reaction.substance = item.substance;
            }

            if (!_.isNil(item.manifestation)) {
                _reaction.manifestation = item.manifestation;
            }

            if (!_.isNil(item.description)) {
                _reaction.description = item.description;
            }

            if (!_.isNil(item.onset)) {
                _reaction.onset = item.onset;
            }

            if (!_.isNil(item.severity)) {
                _reaction.severity = item.severity;
            }

            if (!_.isNil(item.exposureRoute)) {
                _reaction.exposureRoute = item.exposureRoute;
            }

            if (!_.isNil(item.note)) {
                _reaction.note = item.note;
            }

            resource.reaction.push(_reaction);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance"]
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
        "Appointment": appointment_Appointment
    };

    return mappings[type](props)
}

function appointment_Appointment(props) {
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
        profile: ["http://hl7.org/fhir/StructureDefinition/Appointment"]
    };

    return resource;
}

/**
  * Create a FHIR AppointmentResponse resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function appointmentResponse(type, props) {
    const mappings = {
        "AppointmentResponse": appointmentResponse_AppointmentResponse
    };

    return mappings[type](props)
}

function appointmentResponse_AppointmentResponse(props) {
    const resource = {
        resourceType: "AppointmentResponse",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AppointmentResponse</b></p></div>"
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

    if (!_.isNil(props.appointment)) {
        resource.appointment = util.reference(props.appointment);
    }

    if (!_.isNil(props.start)) {
        resource.start = props.start;
    }

    if (!_.isNil(props.end)) {
        resource.end = props.end;
    }

    if (!_.isNil(props.participantType)) {
        resource.participantType = props.participantType;
    }

    if (!_.isNil(props.actor)) {
        resource.actor = util.reference(props.actor);
    }

    if (!_.isNil(props.participantStatus)) {
        resource.participantStatus = props.participantStatus;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AppointmentResponse"]
    };

    return resource;
}

/**
  * Create a FHIR AuditEvent resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function auditEvent(type, props) {
    const mappings = {
        "AuditEvent": auditEvent_AuditEvent
    };

    return mappings[type](props)
}

function auditEvent_AuditEvent(props) {
    const resource = {
        resourceType: "AuditEvent",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AuditEvent</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subtype)) {
        resource.subtype = props.subtype;
    }

    if (!_.isNil(props.action)) {
        resource.action = props.action;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.recorded)) {
        resource.recorded = props.recorded;
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
    }

    if (!_.isNil(props.outcomeDesc)) {
        resource.outcomeDesc = props.outcomeDesc;
    }

    if (!_.isNil(props.purposeOfEvent)) {
        resource.purposeOfEvent = props.purposeOfEvent;
    }

    if (!_.isNil(props.agent)) {
        let src = props.agent;
        if (!Array.isArray(src)) { src = [src]; }
        resource.agent = [];

        for (let item of src) {
            let _agent = {};

            if (!_.isNil(item.id)) {
                _agent.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _agent.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _agent.type = item.type;
            }

            if (!_.isNil(item.role)) {
                _agent.role = item.role;
            }

            if (!_.isNil(item.who)) {
                _agent.who = item.who;
            }

            if (!_.isNil(item.altId)) {
                _agent.altId = item.altId;
            }

            if (!_.isNil(item.name)) {
                _agent.name = item.name;
            }

            if (!_.isNil(item.requestor)) {
                _agent.requestor = item.requestor;
            }

            if (!_.isNil(item.location)) {
                _agent.location = item.location;
            }

            if (!_.isNil(item.policy)) {
                _agent.policy = item.policy;
            }

            if (!_.isNil(item.media)) {
                _agent.media = item.media;
            }

            if (!_.isNil(item.network)) {
                _agent.network = item.network;
            }

            if (!_.isNil(item.purposeOfUse)) {
                _agent.purposeOfUse = item.purposeOfUse;
            }

            resource.agent.push(_agent);
        }
    }

    if (!_.isNil(props.source)) {
        let src = props.source;
        let _source = {};

        if (!_.isNil(src.id)) {
            _source.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _source.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.site)) {
            _source.site = src.site;
        }

        if (!_.isNil(src.observer)) {
            _source.observer = src.observer;
        }

        if (!_.isNil(src.type)) {
            _source.type = src.type;
        }

        resource.source = _source;
    }

    if (!_.isNil(props.entity)) {
        let src = props.entity;
        if (!Array.isArray(src)) { src = [src]; }
        resource.entity = [];

        for (let item of src) {
            let _entity = {};

            if (!_.isNil(item.id)) {
                _entity.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _entity.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.what)) {
                _entity.what = item.what;
            }

            if (!_.isNil(item.type)) {
                _entity.type = item.type;
            }

            if (!_.isNil(item.role)) {
                _entity.role = item.role;
            }

            if (!_.isNil(item.lifecycle)) {
                _entity.lifecycle = item.lifecycle;
            }

            if (!_.isNil(item.securityLabel)) {
                _entity.securityLabel = item.securityLabel;
            }

            if (!_.isNil(item.name)) {
                _entity.name = item.name;
            }

            if (!_.isNil(item.description)) {
                _entity.description = item.description;
            }

            if (!_.isNil(item.query)) {
                _entity.query = item.query;
            }

            if (!_.isNil(item.detail)) {
                _entity.detail = item.detail;
            }

            resource.entity.push(_entity);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AuditEvent"]
    };

    return resource;
}

/**
  * Create a FHIR Basic resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function basic(type, props) {
    const mappings = {
        "Basic": basic_Basic
    };

    return mappings[type](props)
}

function basic_Basic(props) {
    const resource = {
        resourceType: "Basic",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Basic</b></p></div>"
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

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Basic"]
    };

    return resource;
}

/**
  * Create a FHIR Binary resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function binary(type, props) {
    const mappings = {
        "Binary": binary_Binary
    };

    return mappings[type](props)
}

function binary_Binary(props) {
    const resource = {
        resourceType: "Binary",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Binary</b></p></div>"
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

    if (!_.isNil(props.contentType)) {
        resource.contentType = props.contentType;
    }

    if (!_.isNil(props.securityContext)) {
        resource.securityContext = util.reference(props.securityContext);
    }

    if (!_.isNil(props.data)) {
        resource.data = props.data;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Binary"]
    };

    return resource;
}

/**
  * Create a FHIR BiologicallyDerivedProduct resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function biologicallyDerivedProduct(type, props) {
    const mappings = {
        "BiologicallyDerivedProduct": biologicallyDerivedProduct_BiologicallyDerivedProduct
    };

    return mappings[type](props)
}

function biologicallyDerivedProduct_BiologicallyDerivedProduct(props) {
    const resource = {
        resourceType: "BiologicallyDerivedProduct",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>BiologicallyDerivedProduct</b></p></div>"
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

    if (!_.isNil(props.productCategory)) {
        resource.productCategory = props.productCategory;
    }

    if (!_.isNil(props.productCode)) {
        resource.productCode = props.productCode;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.request)) {
        if (!Array.isArray(props.request)) { props.request = [props.request]; }
        resource.request = util.reference(props.request);
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.parent)) {
        if (!Array.isArray(props.parent)) { props.parent = [props.parent]; }
        resource.parent = util.reference(props.parent);
    }

    if (!_.isNil(props.collection)) {
        let src = props.collection;
        let _collection = {};

        if (!_.isNil(src.id)) {
            _collection.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _collection.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.collector)) {
            _collection.collector = src.collector;
        }

        if (!_.isNil(src.source)) {
            _collection.source = src.source;
        }

        if (!_.isNil(src.collected)) {
            _collection.collected = src.collected;
        }

        resource.collection = _collection;
    }

    if (!_.isNil(props.processing)) {
        let src = props.processing;
        if (!Array.isArray(src)) { src = [src]; }
        resource.processing = [];

        for (let item of src) {
            let _processing = {};

            if (!_.isNil(item.id)) {
                _processing.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _processing.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _processing.description = item.description;
            }

            if (!_.isNil(item.procedure)) {
                _processing.procedure = item.procedure;
            }

            if (!_.isNil(item.additive)) {
                _processing.additive = item.additive;
            }

            if (!_.isNil(item.time)) {
                _processing.time = item.time;
            }

            resource.processing.push(_processing);
        }
    }

    if (!_.isNil(props.manipulation)) {
        let src = props.manipulation;
        let _manipulation = {};

        if (!_.isNil(src.id)) {
            _manipulation.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _manipulation.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.description)) {
            _manipulation.description = src.description;
        }

        if (!_.isNil(src.time)) {
            _manipulation.time = src.time;
        }

        resource.manipulation = _manipulation;
    }

    if (!_.isNil(props.storage)) {
        let src = props.storage;
        if (!Array.isArray(src)) { src = [src]; }
        resource.storage = [];

        for (let item of src) {
            let _storage = {};

            if (!_.isNil(item.id)) {
                _storage.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _storage.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _storage.description = item.description;
            }

            if (!_.isNil(item.temperature)) {
                _storage.temperature = item.temperature;
            }

            if (!_.isNil(item.scale)) {
                _storage.scale = item.scale;
            }

            if (!_.isNil(item.duration)) {
                _storage.duration = item.duration;
            }

            resource.storage.push(_storage);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct"]
    };

    return resource;
}

/**
  * Create a FHIR BodyStructure resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function bodyStructure(type, props) {
    const mappings = {
        "BodyStructure": bodyStructure_BodyStructure
    };

    return mappings[type](props)
}

function bodyStructure_BodyStructure(props) {
    const resource = {
        resourceType: "BodyStructure",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>BodyStructure</b></p></div>"
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

    if (!_.isNil(props.morphology)) {
        resource.morphology = props.morphology;
    }

    if (!_.isNil(props.location)) {
        resource.location = props.location;
    }

    if (!_.isNil(props.locationQualifier)) {
        resource.locationQualifier = props.locationQualifier;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.image)) {
        resource.image = props.image;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/BodyStructure"]
    };

    return resource;
}

/**
  * Create a FHIR Bundle resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function bundle(type, props) {
    const mappings = {
        "Bundle": bundle_Bundle
    };

    return mappings[type](props)
}

function bundle_Bundle(props) {
    const resource = {
        resourceType: "Bundle",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Bundle</b></p></div>"
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

    if (!_.isNil(props.identifier)) {
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.timestamp)) {
        resource.timestamp = props.timestamp;
    }

    if (!_.isNil(props.total)) {
        resource.total = props.total;
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

            if (!_.isNil(item.relation)) {
                _link.relation = item.relation;
            }

            if (!_.isNil(item.url)) {
                _link.url = item.url;
            }

            resource.link.push(_link);
        }
    }

    if (!_.isNil(props.entry)) {
        let src = props.entry;
        if (!Array.isArray(src)) { src = [src]; }
        resource.entry = [];

        for (let item of src) {
            let _entry = {};

            if (!_.isNil(item.id)) {
                _entry.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _entry.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.fullUrl)) {
                _entry.fullUrl = item.fullUrl;
            }

            if (!_.isNil(item.resource)) {
                _entry.resource = item.resource;
            }

            if (!_.isNil(item.search)) {
                _entry.search = item.search;
            }

            if (!_.isNil(item.request)) {
                _entry.request = item.request;
            }

            if (!_.isNil(item.response)) {
                _entry.response = item.response;
            }

            resource.entry.push(_entry);
        }
    }

    if (!_.isNil(props.signature)) {
        resource.signature = props.signature;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Bundle"]
    };

    return resource;
}

/**
  * Create a FHIR CapabilityStatement resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function capabilityStatement(type, props) {
    const mappings = {
        "CapabilityStatement": capabilityStatement_CapabilityStatement
    };

    return mappings[type](props)
}

function capabilityStatement_CapabilityStatement(props) {
    const resource = {
        resourceType: "CapabilityStatement",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CapabilityStatement</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.kind)) {
        resource.kind = props.kind;
    }

    if (!_.isNil(props.instantiates)) {
        resource.instantiates = props.instantiates;
    }

    if (!_.isNil(props.imports)) {
        resource.imports = props.imports;
    }

    if (!_.isNil(props.software)) {
        let src = props.software;
        let _software = {};

        if (!_.isNil(src.id)) {
            _software.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _software.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.name)) {
            _software.name = src.name;
        }

        if (!_.isNil(src.version)) {
            _software.version = src.version;
        }

        if (!_.isNil(src.releaseDate)) {
            _software.releaseDate = src.releaseDate;
        }

        resource.software = _software;
    }

    if (!_.isNil(props.implementation)) {
        let src = props.implementation;
        let _implementation = {};

        if (!_.isNil(src.id)) {
            _implementation.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _implementation.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.description)) {
            _implementation.description = src.description;
        }

        if (!_.isNil(src.url)) {
            _implementation.url = src.url;
        }

        if (!_.isNil(src.custodian)) {
            _implementation.custodian = src.custodian;
        }

        resource.implementation = _implementation;
    }

    if (!_.isNil(props.fhirVersion)) {
        resource.fhirVersion = props.fhirVersion;
    }

    if (!_.isNil(props.format)) {
        resource.format = props.format;
    }

    if (!_.isNil(props.patchFormat)) {
        resource.patchFormat = props.patchFormat;
    }

    if (!_.isNil(props.implementationGuide)) {
        resource.implementationGuide = props.implementationGuide;
    }

    if (!_.isNil(props.rest)) {
        let src = props.rest;
        if (!Array.isArray(src)) { src = [src]; }
        resource.rest = [];

        for (let item of src) {
            let _rest = {};

            if (!_.isNil(item.id)) {
                _rest.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _rest.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.mode)) {
                _rest.mode = item.mode;
            }

            if (!_.isNil(item.documentation)) {
                _rest.documentation = item.documentation;
            }

            if (!_.isNil(item.security)) {
                _rest.security = item.security;
            }

            if (!_.isNil(item.resource)) {
                _rest.resource = item.resource;
            }

            if (!_.isNil(item.interaction)) {
                _rest.interaction = item.interaction;
            }

            if (!_.isNil(item.compartment)) {
                _rest.compartment = item.compartment;
            }

            resource.rest.push(_rest);
        }
    }

    if (!_.isNil(props.messaging)) {
        let src = props.messaging;
        if (!Array.isArray(src)) { src = [src]; }
        resource.messaging = [];

        for (let item of src) {
            let _messaging = {};

            if (!_.isNil(item.id)) {
                _messaging.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _messaging.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.endpoint)) {
                _messaging.endpoint = item.endpoint;
            }

            if (!_.isNil(item.reliableCache)) {
                _messaging.reliableCache = item.reliableCache;
            }

            if (!_.isNil(item.documentation)) {
                _messaging.documentation = item.documentation;
            }

            if (!_.isNil(item.supportedMessage)) {
                _messaging.supportedMessage = item.supportedMessage;
            }

            resource.messaging.push(_messaging);
        }
    }

    if (!_.isNil(props.document)) {
        let src = props.document;
        if (!Array.isArray(src)) { src = [src]; }
        resource.document = [];

        for (let item of src) {
            let _document = {};

            if (!_.isNil(item.id)) {
                _document.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _document.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.mode)) {
                _document.mode = item.mode;
            }

            if (!_.isNil(item.documentation)) {
                _document.documentation = item.documentation;
            }

            if (!_.isNil(item.profile)) {
                _document.profile = item.profile;
            }

            resource.document.push(_document);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CapabilityStatement"]
    };

    return resource;
}

/**
  * Create a FHIR CarePlan resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function carePlan(type, props) {
    const mappings = {
        "CarePlan": carePlan_CarePlan
    };

    return mappings[type](props)
}

function carePlan_CarePlan(props) {
    const resource = {
        resourceType: "CarePlan",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CarePlan</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        if (!Array.isArray(props.replaces)) { props.replaces = [props.replaces]; }
        resource.replaces = util.reference(props.replaces);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.contributor)) {
        if (!Array.isArray(props.contributor)) { props.contributor = [props.contributor]; }
        resource.contributor = util.reference(props.contributor);
    }

    if (!_.isNil(props.careTeam)) {
        if (!Array.isArray(props.careTeam)) { props.careTeam = [props.careTeam]; }
        resource.careTeam = util.reference(props.careTeam);
    }

    if (!_.isNil(props.addresses)) {
        if (!Array.isArray(props.addresses)) { props.addresses = [props.addresses]; }
        resource.addresses = util.reference(props.addresses);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.goal)) {
        if (!Array.isArray(props.goal)) { props.goal = [props.goal]; }
        resource.goal = util.reference(props.goal);
    }

    if (!_.isNil(props.activity)) {
        let src = props.activity;
        if (!Array.isArray(src)) { src = [src]; }
        resource.activity = [];

        for (let item of src) {
            let _activity = {};

            if (!_.isNil(item.id)) {
                _activity.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _activity.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.outcomeCodeableConcept)) {
                _activity.outcomeCodeableConcept = item.outcomeCodeableConcept;
            }

            if (!_.isNil(item.outcomeReference)) {
                _activity.outcomeReference = item.outcomeReference;
            }

            if (!_.isNil(item.progress)) {
                _activity.progress = item.progress;
            }

            if (!_.isNil(item.reference)) {
                _activity.reference = item.reference;
            }

            if (!_.isNil(item.detail)) {
                _activity.detail = item.detail;
            }

            resource.activity.push(_activity);
        }
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"]
    };

    return resource;
}

/**
  * Create a FHIR CareTeam resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function careTeam(type, props) {
    const mappings = {
        "CareTeam": careTeam_CareTeam
    };

    return mappings[type](props)
}

function careTeam_CareTeam(props) {
    const resource = {
        resourceType: "CareTeam",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CareTeam</b></p></div>"
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

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
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

            if (!_.isNil(item.role)) {
                _participant.role = item.role;
            }

            if (!_.isNil(item.member)) {
                _participant.member = item.member;
            }

            if (!_.isNil(item.onBehalfOf)) {
                _participant.onBehalfOf = item.onBehalfOf;
            }

            if (!_.isNil(item.period)) {
                _participant.period = item.period;
            }

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.managingOrganization)) {
        if (!Array.isArray(props.managingOrganization)) { props.managingOrganization = [props.managingOrganization]; }
        resource.managingOrganization = util.reference(props.managingOrganization);
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"]
    };

    return resource;
}

/**
  * Create a FHIR CatalogEntry resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function catalogEntry(type, props) {
    const mappings = {
        "CatalogEntry": catalogEntry_CatalogEntry
    };

    return mappings[type](props)
}

function catalogEntry_CatalogEntry(props) {
    const resource = {
        resourceType: "CatalogEntry",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CatalogEntry</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.orderable)) {
        resource.orderable = props.orderable;
    }

    if (!_.isNil(props.referencedItem)) {
        resource.referencedItem = util.reference(props.referencedItem);
    }

    if (!_.isNil(props.additionalIdentifier)) {
        if (!Array.isArray(props.additionalIdentifier)) { props.additionalIdentifier = [props.additionalIdentifier]; }
        resource.additionalIdentifier = util.identifier(props.additionalIdentifier, undefined);
    }

    if (!_.isNil(props.classification)) {
        resource.classification = props.classification;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.validityPeriod)) {
        resource.validityPeriod = props.validityPeriod;
    }

    if (!_.isNil(props.validTo)) {
        resource.validTo = props.validTo;
    }

    if (!_.isNil(props.lastUpdated)) {
        resource.lastUpdated = props.lastUpdated;
    }

    if (!_.isNil(props.additionalCharacteristic)) {
        resource.additionalCharacteristic = props.additionalCharacteristic;
    }

    if (!_.isNil(props.additionalClassification)) {
        resource.additionalClassification = props.additionalClassification;
    }

    if (!_.isNil(props.relatedEntry)) {
        let src = props.relatedEntry;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relatedEntry = [];

        for (let item of src) {
            let _relatedEntry = {};

            if (!_.isNil(item.id)) {
                _relatedEntry.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _relatedEntry.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.relationtype)) {
                _relatedEntry.relationtype = item.relationtype;
            }

            if (!_.isNil(item.item)) {
                _relatedEntry.item = item.item;
            }

            resource.relatedEntry.push(_relatedEntry);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CatalogEntry"]
    };

    return resource;
}

/**
  * Create a FHIR ChargeItem resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function chargeItem(type, props) {
    const mappings = {
        "ChargeItem": chargeItem_ChargeItem
    };

    return mappings[type](props)
}

function chargeItem_ChargeItem(props) {
    const resource = {
        resourceType: "ChargeItem",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ChargeItem</b></p></div>"
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

    if (!_.isNil(props.definitionUri)) {
        resource.definitionUri = props.definitionUri;
    }

    if (!_.isNil(props.definitionCanonical)) {
        resource.definitionCanonical = props.definitionCanonical;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.context)) {
        resource.context = util.reference(props.context);
    }

    if (!_.isNil(props.occurrence)) {
        util.composite(resource, "occurrence", props.occurrence);
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

    if (!_.isNil(props.performingOrganization)) {
        resource.performingOrganization = util.reference(props.performingOrganization);
    }

    if (!_.isNil(props.requestingOrganization)) {
        resource.requestingOrganization = util.reference(props.requestingOrganization);
    }

    if (!_.isNil(props.costCenter)) {
        resource.costCenter = util.reference(props.costCenter);
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.bodysite)) {
        resource.bodysite = props.bodysite;
    }

    if (!_.isNil(props.factorOverride)) {
        resource.factorOverride = props.factorOverride;
    }

    if (!_.isNil(props.priceOverride)) {
        resource.priceOverride = props.priceOverride;
    }

    if (!_.isNil(props.overrideReason)) {
        resource.overrideReason = props.overrideReason;
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = util.reference(props.enterer);
    }

    if (!_.isNil(props.enteredDate)) {
        resource.enteredDate = props.enteredDate;
    }

    if (!_.isNil(props.reason)) {
        resource.reason = props.reason;
    }

    if (!_.isNil(props.service)) {
        if (!Array.isArray(props.service)) { props.service = [props.service]; }
        resource.service = util.reference(props.service);
    }

    if (!_.isNil(props.product)) {
        util.composite(resource, "product", props.product);
    }

    if (!_.isNil(props.account)) {
        if (!Array.isArray(props.account)) { props.account = [props.account]; }
        resource.account = util.reference(props.account);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = util.reference(props.supportingInformation);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ChargeItem"]
    };

    return resource;
}

/**
  * Create a FHIR ChargeItemDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function chargeItemDefinition(type, props) {
    const mappings = {
        "ChargeItemDefinition": chargeItemDefinition_ChargeItemDefinition
    };

    return mappings[type](props)
}

function chargeItemDefinition_ChargeItemDefinition(props) {
    const resource = {
        resourceType: "ChargeItemDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ChargeItemDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.derivedFromUri)) {
        resource.derivedFromUri = props.derivedFromUri;
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = props.partOf;
    }

    if (!_.isNil(props.replaces)) {
        resource.replaces = props.replaces;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.instance)) {
        if (!Array.isArray(props.instance)) { props.instance = [props.instance]; }
        resource.instance = util.reference(props.instance);
    }

    if (!_.isNil(props.applicability)) {
        let src = props.applicability;
        if (!Array.isArray(src)) { src = [src]; }
        resource.applicability = [];

        for (let item of src) {
            let _applicability = {};

            if (!_.isNil(item.id)) {
                _applicability.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _applicability.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _applicability.description = item.description;
            }

            if (!_.isNil(item.language)) {
                _applicability.language = item.language;
            }

            if (!_.isNil(item.expression)) {
                _applicability.expression = item.expression;
            }

            resource.applicability.push(_applicability);
        }
    }

    if (!_.isNil(props.propertyGroup)) {
        let src = props.propertyGroup;
        if (!Array.isArray(src)) { src = [src]; }
        resource.propertyGroup = [];

        for (let item of src) {
            let _propertyGroup = {};

            if (!_.isNil(item.id)) {
                _propertyGroup.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _propertyGroup.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.priceComponent)) {
                _propertyGroup.priceComponent = item.priceComponent;
            }

            resource.propertyGroup.push(_propertyGroup);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ChargeItemDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR Citation resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function citation(type, props) {
    const mappings = {
        "Citation": citation_Citation
    };

    return mappings[type](props)
}

function citation_Citation(props) {
    const resource = {
        resourceType: "Citation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Citation</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.summary)) {
        let src = props.summary;
        if (!Array.isArray(src)) { src = [src]; }
        resource.summary = [];

        for (let item of src) {
            let _summary = {};

            if (!_.isNil(item.id)) {
                _summary.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _summary.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.style)) {
                _summary.style = item.style;
            }

            if (!_.isNil(item.text)) {
                _summary.text = item.text;
            }

            resource.summary.push(_summary);
        }
    }

    if (!_.isNil(props.classification)) {
        let src = props.classification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.classification = [];

        for (let item of src) {
            let _classification = {};

            if (!_.isNil(item.id)) {
                _classification.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _classification.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _classification.type = item.type;
            }

            if (!_.isNil(item.classifier)) {
                _classification.classifier = item.classifier;
            }

            resource.classification.push(_classification);
        }
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.currentState)) {
        resource.currentState = props.currentState;
    }

    if (!_.isNil(props.statusDate)) {
        let src = props.statusDate;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statusDate = [];

        for (let item of src) {
            let _statusDate = {};

            if (!_.isNil(item.id)) {
                _statusDate.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _statusDate.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.activity)) {
                _statusDate.activity = item.activity;
            }

            if (!_.isNil(item.actual)) {
                _statusDate.actual = item.actual;
            }

            if (!_.isNil(item.period)) {
                _statusDate.period = item.period;
            }

            resource.statusDate.push(_statusDate);
        }
    }

    if (!_.isNil(props.relatesTo)) {
        let src = props.relatesTo;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relatesTo = [];

        for (let item of src) {
            let _relatesTo = {};

            if (!_.isNil(item.id)) {
                _relatesTo.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _relatesTo.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.relationshipType)) {
                _relatesTo.relationshipType = item.relationshipType;
            }

            if (!_.isNil(item.targetClassifier)) {
                _relatesTo.targetClassifier = item.targetClassifier;
            }

            if (!_.isNil(item.target)) {
                _relatesTo.target = item.target;
            }

            resource.relatesTo.push(_relatesTo);
        }
    }

    if (!_.isNil(props.citedArtifact)) {
        let src = props.citedArtifact;
        let _citedArtifact = {};

        if (!_.isNil(src.id)) {
            _citedArtifact.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _citedArtifact.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.identifier)) {
            _citedArtifact.identifier = src.identifier;
        }

        if (!_.isNil(src.relatedIdentifier)) {
            _citedArtifact.relatedIdentifier = src.relatedIdentifier;
        }

        if (!_.isNil(src.dateAccessed)) {
            _citedArtifact.dateAccessed = src.dateAccessed;
        }

        if (!_.isNil(src.version)) {
            _citedArtifact.version = src.version;
        }

        if (!_.isNil(src.currentState)) {
            _citedArtifact.currentState = src.currentState;
        }

        if (!_.isNil(src.statusDate)) {
            _citedArtifact.statusDate = src.statusDate;
        }

        if (!_.isNil(src.title)) {
            _citedArtifact.title = src.title;
        }

        if (!_.isNil(src.abstract)) {
            _citedArtifact.abstract = src.abstract;
        }

        if (!_.isNil(src.part)) {
            _citedArtifact.part = src.part;
        }

        if (!_.isNil(src.relatesTo)) {
            _citedArtifact.relatesTo = src.relatesTo;
        }

        if (!_.isNil(src.publicationForm)) {
            _citedArtifact.publicationForm = src.publicationForm;
        }

        if (!_.isNil(src.webLocation)) {
            _citedArtifact.webLocation = src.webLocation;
        }

        if (!_.isNil(src.classification)) {
            _citedArtifact.classification = src.classification;
        }

        if (!_.isNil(src.contributorship)) {
            _citedArtifact.contributorship = src.contributorship;
        }

        if (!_.isNil(src.note)) {
            _citedArtifact.note = src.note;
        }

        resource.citedArtifact = _citedArtifact;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Citation"]
    };

    return resource;
}

/**
  * Create a FHIR Claim resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function claim(type, props) {
    const mappings = {
        "Claim": claim_Claim
    };

    return mappings[type](props)
}

function claim_Claim(props) {
    const resource = {
        resourceType: "Claim",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Claim</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subType)) {
        resource.subType = props.subType;
    }

    if (!_.isNil(props.use)) {
        resource.use = props.use;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.billablePeriod)) {
        resource.billablePeriod = props.billablePeriod;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = util.reference(props.enterer);
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = util.reference(props.insurer);
    }

    if (!_.isNil(props.provider)) {
        resource.provider = util.reference(props.provider);
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.fundsReserve)) {
        resource.fundsReserve = props.fundsReserve;
    }

    if (!_.isNil(props.related)) {
        let src = props.related;
        if (!Array.isArray(src)) { src = [src]; }
        resource.related = [];

        for (let item of src) {
            let _related = {};

            if (!_.isNil(item.id)) {
                _related.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _related.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.claim)) {
                _related.claim = item.claim;
            }

            if (!_.isNil(item.relationship)) {
                _related.relationship = item.relationship;
            }

            if (!_.isNil(item.reference)) {
                _related.reference = item.reference;
            }

            resource.related.push(_related);
        }
    }

    if (!_.isNil(props.prescription)) {
        resource.prescription = util.reference(props.prescription);
    }

    if (!_.isNil(props.originalPrescription)) {
        resource.originalPrescription = util.reference(props.originalPrescription);
    }

    if (!_.isNil(props.payee)) {
        let src = props.payee;
        let _payee = {};

        if (!_.isNil(src.id)) {
            _payee.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _payee.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _payee.type = src.type;
        }

        if (!_.isNil(src.party)) {
            _payee.party = src.party;
        }

        resource.payee = _payee;
    }

    if (!_.isNil(props.referral)) {
        resource.referral = util.reference(props.referral);
    }

    if (!_.isNil(props.facility)) {
        resource.facility = util.reference(props.facility);
    }

    if (!_.isNil(props.careTeam)) {
        let src = props.careTeam;
        if (!Array.isArray(src)) { src = [src]; }
        resource.careTeam = [];

        for (let item of src) {
            let _careTeam = {};

            if (!_.isNil(item.id)) {
                _careTeam.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _careTeam.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _careTeam.sequence = item.sequence;
            }

            if (!_.isNil(item.provider)) {
                _careTeam.provider = item.provider;
            }

            if (!_.isNil(item.responsible)) {
                _careTeam.responsible = item.responsible;
            }

            if (!_.isNil(item.role)) {
                _careTeam.role = item.role;
            }

            if (!_.isNil(item.qualification)) {
                _careTeam.qualification = item.qualification;
            }

            resource.careTeam.push(_careTeam);
        }
    }

    if (!_.isNil(props.supportingInfo)) {
        let src = props.supportingInfo;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supportingInfo = [];

        for (let item of src) {
            let _supportingInfo = {};

            if (!_.isNil(item.id)) {
                _supportingInfo.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _supportingInfo.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _supportingInfo.sequence = item.sequence;
            }

            if (!_.isNil(item.category)) {
                _supportingInfo.category = item.category;
            }

            if (!_.isNil(item.code)) {
                _supportingInfo.code = item.code;
            }

            if (!_.isNil(item.timing)) {
                _supportingInfo.timing = item.timing;
            }

            if (!_.isNil(item.value)) {
                _supportingInfo.value = item.value;
            }

            if (!_.isNil(item.reason)) {
                _supportingInfo.reason = item.reason;
            }

            resource.supportingInfo.push(_supportingInfo);
        }
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

            if (!_.isNil(item.sequence)) {
                _diagnosis.sequence = item.sequence;
            }

            if (!_.isNil(item.diagnosis)) {
                _diagnosis.diagnosis = item.diagnosis;
            }

            if (!_.isNil(item.type)) {
                _diagnosis.type = item.type;
            }

            if (!_.isNil(item.onAdmission)) {
                _diagnosis.onAdmission = item.onAdmission;
            }

            if (!_.isNil(item.packageCode)) {
                _diagnosis.packageCode = item.packageCode;
            }

            resource.diagnosis.push(_diagnosis);
        }
    }

    if (!_.isNil(props.procedure)) {
        let src = props.procedure;
        if (!Array.isArray(src)) { src = [src]; }
        resource.procedure = [];

        for (let item of src) {
            let _procedure = {};

            if (!_.isNil(item.id)) {
                _procedure.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _procedure.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _procedure.sequence = item.sequence;
            }

            if (!_.isNil(item.type)) {
                _procedure.type = item.type;
            }

            if (!_.isNil(item.date)) {
                _procedure.date = item.date;
            }

            if (!_.isNil(item.procedure)) {
                _procedure.procedure = item.procedure;
            }

            if (!_.isNil(item.udi)) {
                _procedure.udi = item.udi;
            }

            resource.procedure.push(_procedure);
        }
    }

    if (!_.isNil(props.insurance)) {
        let src = props.insurance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.insurance = [];

        for (let item of src) {
            let _insurance = {};

            if (!_.isNil(item.id)) {
                _insurance.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _insurance.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _insurance.sequence = item.sequence;
            }

            if (!_.isNil(item.focal)) {
                _insurance.focal = item.focal;
            }

            if (!_.isNil(item.identifier)) {
                _insurance.identifier = item.identifier;
            }

            if (!_.isNil(item.coverage)) {
                _insurance.coverage = item.coverage;
            }

            if (!_.isNil(item.businessArrangement)) {
                _insurance.businessArrangement = item.businessArrangement;
            }

            if (!_.isNil(item.preAuthRef)) {
                _insurance.preAuthRef = item.preAuthRef;
            }

            if (!_.isNil(item.claimResponse)) {
                _insurance.claimResponse = item.claimResponse;
            }

            resource.insurance.push(_insurance);
        }
    }

    if (!_.isNil(props.accident)) {
        let src = props.accident;
        let _accident = {};

        if (!_.isNil(src.id)) {
            _accident.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _accident.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.date)) {
            _accident.date = src.date;
        }

        if (!_.isNil(src.type)) {
            _accident.type = src.type;
        }

        if (!_.isNil(src.location)) {
            _accident.location = src.location;
        }

        resource.accident = _accident;
    }

    if (!_.isNil(props.item)) {
        let src = props.item;
        if (!Array.isArray(src)) { src = [src]; }
        resource.item = [];

        for (let item of src) {
            let _item = {};

            if (!_.isNil(item.id)) {
                _item.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _item.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _item.sequence = item.sequence;
            }

            if (!_.isNil(item.careTeamSequence)) {
                _item.careTeamSequence = item.careTeamSequence;
            }

            if (!_.isNil(item.diagnosisSequence)) {
                _item.diagnosisSequence = item.diagnosisSequence;
            }

            if (!_.isNil(item.procedureSequence)) {
                _item.procedureSequence = item.procedureSequence;
            }

            if (!_.isNil(item.informationSequence)) {
                _item.informationSequence = item.informationSequence;
            }

            if (!_.isNil(item.revenue)) {
                _item.revenue = item.revenue;
            }

            if (!_.isNil(item.category)) {
                _item.category = item.category;
            }

            if (!_.isNil(item.productOrService)) {
                _item.productOrService = item.productOrService;
            }

            if (!_.isNil(item.modifier)) {
                _item.modifier = item.modifier;
            }

            if (!_.isNil(item.programCode)) {
                _item.programCode = item.programCode;
            }

            if (!_.isNil(item.serviced)) {
                _item.serviced = item.serviced;
            }

            if (!_.isNil(item.location)) {
                _item.location = item.location;
            }

            if (!_.isNil(item.quantity)) {
                _item.quantity = item.quantity;
            }

            if (!_.isNil(item.unitPrice)) {
                _item.unitPrice = item.unitPrice;
            }

            if (!_.isNil(item.factor)) {
                _item.factor = item.factor;
            }

            if (!_.isNil(item.net)) {
                _item.net = item.net;
            }

            if (!_.isNil(item.udi)) {
                _item.udi = item.udi;
            }

            if (!_.isNil(item.bodySite)) {
                _item.bodySite = item.bodySite;
            }

            if (!_.isNil(item.subSite)) {
                _item.subSite = item.subSite;
            }

            if (!_.isNil(item.encounter)) {
                _item.encounter = item.encounter;
            }

            if (!_.isNil(item.detail)) {
                _item.detail = item.detail;
            }

            resource.item.push(_item);
        }
    }

    if (!_.isNil(props.total)) {
        resource.total = props.total;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Claim"]
    };

    return resource;
}

/**
  * Create a FHIR ClaimResponse resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function claimResponse(type, props) {
    const mappings = {
        "ClaimResponse": claimResponse_ClaimResponse
    };

    return mappings[type](props)
}

function claimResponse_ClaimResponse(props) {
    const resource = {
        resourceType: "ClaimResponse",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ClaimResponse</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subType)) {
        resource.subType = props.subType;
    }

    if (!_.isNil(props.use)) {
        resource.use = props.use;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = util.reference(props.insurer);
    }

    if (!_.isNil(props.requestor)) {
        resource.requestor = util.reference(props.requestor);
    }

    if (!_.isNil(props.request)) {
        resource.request = util.reference(props.request);
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
    }

    if (!_.isNil(props.disposition)) {
        resource.disposition = props.disposition;
    }

    if (!_.isNil(props.preAuthRef)) {
        resource.preAuthRef = props.preAuthRef;
    }

    if (!_.isNil(props.preAuthPeriod)) {
        resource.preAuthPeriod = props.preAuthPeriod;
    }

    if (!_.isNil(props.payeeType)) {
        resource.payeeType = props.payeeType;
    }

    if (!_.isNil(props.item)) {
        let src = props.item;
        if (!Array.isArray(src)) { src = [src]; }
        resource.item = [];

        for (let item of src) {
            let _item = {};

            if (!_.isNil(item.id)) {
                _item.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _item.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.itemSequence)) {
                _item.itemSequence = item.itemSequence;
            }

            if (!_.isNil(item.noteNumber)) {
                _item.noteNumber = item.noteNumber;
            }

            if (!_.isNil(item.adjudication)) {
                _item.adjudication = item.adjudication;
            }

            if (!_.isNil(item.detail)) {
                _item.detail = item.detail;
            }

            resource.item.push(_item);
        }
    }

    if (!_.isNil(props.addItem)) {
        let src = props.addItem;
        if (!Array.isArray(src)) { src = [src]; }
        resource.addItem = [];

        for (let item of src) {
            let _addItem = {};

            if (!_.isNil(item.id)) {
                _addItem.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _addItem.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.itemSequence)) {
                _addItem.itemSequence = item.itemSequence;
            }

            if (!_.isNil(item.detailSequence)) {
                _addItem.detailSequence = item.detailSequence;
            }

            if (!_.isNil(item.subdetailSequence)) {
                _addItem.subdetailSequence = item.subdetailSequence;
            }

            if (!_.isNil(item.provider)) {
                _addItem.provider = item.provider;
            }

            if (!_.isNil(item.productOrService)) {
                _addItem.productOrService = item.productOrService;
            }

            if (!_.isNil(item.modifier)) {
                _addItem.modifier = item.modifier;
            }

            if (!_.isNil(item.programCode)) {
                _addItem.programCode = item.programCode;
            }

            if (!_.isNil(item.serviced)) {
                _addItem.serviced = item.serviced;
            }

            if (!_.isNil(item.location)) {
                _addItem.location = item.location;
            }

            if (!_.isNil(item.quantity)) {
                _addItem.quantity = item.quantity;
            }

            if (!_.isNil(item.unitPrice)) {
                _addItem.unitPrice = item.unitPrice;
            }

            if (!_.isNil(item.factor)) {
                _addItem.factor = item.factor;
            }

            if (!_.isNil(item.net)) {
                _addItem.net = item.net;
            }

            if (!_.isNil(item.bodySite)) {
                _addItem.bodySite = item.bodySite;
            }

            if (!_.isNil(item.subSite)) {
                _addItem.subSite = item.subSite;
            }

            if (!_.isNil(item.noteNumber)) {
                _addItem.noteNumber = item.noteNumber;
            }

            if (!_.isNil(item.detail)) {
                _addItem.detail = item.detail;
            }

            resource.addItem.push(_addItem);
        }
    }

    if (!_.isNil(props.adjudication)) {
        resource.adjudication = props.adjudication;
    }

    if (!_.isNil(props.total)) {
        let src = props.total;
        if (!Array.isArray(src)) { src = [src]; }
        resource.total = [];

        for (let item of src) {
            let _total = {};

            if (!_.isNil(item.id)) {
                _total.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _total.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.category)) {
                _total.category = item.category;
            }

            if (!_.isNil(item.amount)) {
                _total.amount = item.amount;
            }

            resource.total.push(_total);
        }
    }

    if (!_.isNil(props.payment)) {
        let src = props.payment;
        let _payment = {};

        if (!_.isNil(src.id)) {
            _payment.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _payment.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _payment.type = src.type;
        }

        if (!_.isNil(src.adjustment)) {
            _payment.adjustment = src.adjustment;
        }

        if (!_.isNil(src.adjustmentReason)) {
            _payment.adjustmentReason = src.adjustmentReason;
        }

        if (!_.isNil(src.date)) {
            _payment.date = src.date;
        }

        if (!_.isNil(src.amount)) {
            _payment.amount = src.amount;
        }

        if (!_.isNil(src.identifier)) {
            _payment.identifier = src.identifier;
        }

        resource.payment = _payment;
    }

    if (!_.isNil(props.fundsReserve)) {
        resource.fundsReserve = props.fundsReserve;
    }

    if (!_.isNil(props.formCode)) {
        resource.formCode = props.formCode;
    }

    if (!_.isNil(props.form)) {
        resource.form = props.form;
    }

    if (!_.isNil(props.processNote)) {
        let src = props.processNote;
        if (!Array.isArray(src)) { src = [src]; }
        resource.processNote = [];

        for (let item of src) {
            let _processNote = {};

            if (!_.isNil(item.id)) {
                _processNote.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _processNote.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.number)) {
                _processNote.number = item.number;
            }

            if (!_.isNil(item.type)) {
                _processNote.type = item.type;
            }

            if (!_.isNil(item.text)) {
                _processNote.text = item.text;
            }

            if (!_.isNil(item.language)) {
                _processNote.language = item.language;
            }

            resource.processNote.push(_processNote);
        }
    }

    if (!_.isNil(props.communicationRequest)) {
        if (!Array.isArray(props.communicationRequest)) { props.communicationRequest = [props.communicationRequest]; }
        resource.communicationRequest = util.reference(props.communicationRequest);
    }

    if (!_.isNil(props.insurance)) {
        let src = props.insurance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.insurance = [];

        for (let item of src) {
            let _insurance = {};

            if (!_.isNil(item.id)) {
                _insurance.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _insurance.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _insurance.sequence = item.sequence;
            }

            if (!_.isNil(item.focal)) {
                _insurance.focal = item.focal;
            }

            if (!_.isNil(item.coverage)) {
                _insurance.coverage = item.coverage;
            }

            if (!_.isNil(item.businessArrangement)) {
                _insurance.businessArrangement = item.businessArrangement;
            }

            if (!_.isNil(item.claimResponse)) {
                _insurance.claimResponse = item.claimResponse;
            }

            resource.insurance.push(_insurance);
        }
    }

    if (!_.isNil(props.error)) {
        let src = props.error;
        if (!Array.isArray(src)) { src = [src]; }
        resource.error = [];

        for (let item of src) {
            let _error = {};

            if (!_.isNil(item.id)) {
                _error.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _error.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.itemSequence)) {
                _error.itemSequence = item.itemSequence;
            }

            if (!_.isNil(item.detailSequence)) {
                _error.detailSequence = item.detailSequence;
            }

            if (!_.isNil(item.subDetailSequence)) {
                _error.subDetailSequence = item.subDetailSequence;
            }

            if (!_.isNil(item.code)) {
                _error.code = item.code;
            }

            resource.error.push(_error);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse"]
    };

    return resource;
}

/**
  * Create a FHIR ClinicalImpression resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function clinicalImpression(type, props) {
    const mappings = {
        "ClinicalImpression": clinicalImpression_ClinicalImpression
    };

    return mappings[type](props)
}

function clinicalImpression_ClinicalImpression(props) {
    const resource = {
        resourceType: "ClinicalImpression",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ClinicalImpression</b></p></div>"
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

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.assessor)) {
        resource.assessor = util.reference(props.assessor);
    }

    if (!_.isNil(props.previous)) {
        resource.previous = util.reference(props.previous);
    }

    if (!_.isNil(props.problem)) {
        if (!Array.isArray(props.problem)) { props.problem = [props.problem]; }
        resource.problem = util.reference(props.problem);
    }

    if (!_.isNil(props.investigation)) {
        let src = props.investigation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.investigation = [];

        for (let item of src) {
            let _investigation = {};

            if (!_.isNil(item.id)) {
                _investigation.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _investigation.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _investigation.code = item.code;
            }

            if (!_.isNil(item.item)) {
                _investigation.item = item.item;
            }

            resource.investigation.push(_investigation);
        }
    }

    if (!_.isNil(props.protocol)) {
        resource.protocol = props.protocol;
    }

    if (!_.isNil(props.summary)) {
        resource.summary = props.summary;
    }

    if (!_.isNil(props.finding)) {
        let src = props.finding;
        if (!Array.isArray(src)) { src = [src]; }
        resource.finding = [];

        for (let item of src) {
            let _finding = {};

            if (!_.isNil(item.id)) {
                _finding.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _finding.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.itemCodeableConcept)) {
                _finding.itemCodeableConcept = item.itemCodeableConcept;
            }

            if (!_.isNil(item.itemReference)) {
                _finding.itemReference = item.itemReference;
            }

            if (!_.isNil(item.basis)) {
                _finding.basis = item.basis;
            }

            resource.finding.push(_finding);
        }
    }

    if (!_.isNil(props.prognosisCodeableConcept)) {
        resource.prognosisCodeableConcept = props.prognosisCodeableConcept;
    }

    if (!_.isNil(props.prognosisReference)) {
        if (!Array.isArray(props.prognosisReference)) { props.prognosisReference = [props.prognosisReference]; }
        resource.prognosisReference = util.reference(props.prognosisReference);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ClinicalImpression"]
    };

    return resource;
}

/**
  * Create a FHIR ClinicalUseDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function clinicalUseDefinition(type, props) {
    const mappings = {
        "ClinicalUseDefinition": clinicalUseDefinition_ClinicalUseDefinition
    };

    return mappings[type](props)
}

function clinicalUseDefinition_ClinicalUseDefinition(props) {
    const resource = {
        resourceType: "ClinicalUseDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ClinicalUseDefinition</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.contraindication)) {
        let src = props.contraindication;
        let _contraindication = {};

        if (!_.isNil(src.id)) {
            _contraindication.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _contraindication.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.diseaseSymptomProcedure)) {
            _contraindication.diseaseSymptomProcedure = src.diseaseSymptomProcedure;
        }

        if (!_.isNil(src.diseaseStatus)) {
            _contraindication.diseaseStatus = src.diseaseStatus;
        }

        if (!_.isNil(src.comorbidity)) {
            _contraindication.comorbidity = src.comorbidity;
        }

        if (!_.isNil(src.indication)) {
            _contraindication.indication = src.indication;
        }

        if (!_.isNil(src.otherTherapy)) {
            _contraindication.otherTherapy = src.otherTherapy;
        }

        resource.contraindication = _contraindication;
    }

    if (!_.isNil(props.indication)) {
        let src = props.indication;
        let _indication = {};

        if (!_.isNil(src.id)) {
            _indication.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _indication.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.diseaseSymptomProcedure)) {
            _indication.diseaseSymptomProcedure = src.diseaseSymptomProcedure;
        }

        if (!_.isNil(src.diseaseStatus)) {
            _indication.diseaseStatus = src.diseaseStatus;
        }

        if (!_.isNil(src.comorbidity)) {
            _indication.comorbidity = src.comorbidity;
        }

        if (!_.isNil(src.intendedEffect)) {
            _indication.intendedEffect = src.intendedEffect;
        }

        if (!_.isNil(src.duration)) {
            _indication.duration = src.duration;
        }

        if (!_.isNil(src.undesirableEffect)) {
            _indication.undesirableEffect = src.undesirableEffect;
        }

        resource.indication = _indication;
    }

    if (!_.isNil(props.interaction)) {
        let src = props.interaction;
        let _interaction = {};

        if (!_.isNil(src.id)) {
            _interaction.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _interaction.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.interactant)) {
            _interaction.interactant = src.interactant;
        }

        if (!_.isNil(src.type)) {
            _interaction.type = src.type;
        }

        if (!_.isNil(src.effect)) {
            _interaction.effect = src.effect;
        }

        if (!_.isNil(src.incidence)) {
            _interaction.incidence = src.incidence;
        }

        if (!_.isNil(src.management)) {
            _interaction.management = src.management;
        }

        resource.interaction = _interaction;
    }

    if (!_.isNil(props.population)) {
        if (!Array.isArray(props.population)) { props.population = [props.population]; }
        resource.population = util.reference(props.population);
    }

    if (!_.isNil(props.undesirableEffect)) {
        let src = props.undesirableEffect;
        let _undesirableEffect = {};

        if (!_.isNil(src.id)) {
            _undesirableEffect.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _undesirableEffect.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.symptomConditionEffect)) {
            _undesirableEffect.symptomConditionEffect = src.symptomConditionEffect;
        }

        if (!_.isNil(src.classification)) {
            _undesirableEffect.classification = src.classification;
        }

        if (!_.isNil(src.frequencyOfOccurrence)) {
            _undesirableEffect.frequencyOfOccurrence = src.frequencyOfOccurrence;
        }

        resource.undesirableEffect = _undesirableEffect;
    }

    if (!_.isNil(props.warning)) {
        let src = props.warning;
        let _warning = {};

        if (!_.isNil(src.id)) {
            _warning.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _warning.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.description)) {
            _warning.description = src.description;
        }

        if (!_.isNil(src.code)) {
            _warning.code = src.code;
        }

        resource.warning = _warning;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ClinicalUseDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR CodeSystem resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function codeSystem(type, props) {
    const mappings = {
        "CodeSystem": codeSystem_CodeSystem
    };

    return mappings[type](props)
}

function codeSystem_CodeSystem(props) {
    const resource = {
        resourceType: "CodeSystem",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CodeSystem</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.caseSensitive)) {
        resource.caseSensitive = props.caseSensitive;
    }

    if (!_.isNil(props.valueSet)) {
        resource.valueSet = props.valueSet;
    }

    if (!_.isNil(props.hierarchyMeaning)) {
        resource.hierarchyMeaning = props.hierarchyMeaning;
    }

    if (!_.isNil(props.compositional)) {
        resource.compositional = props.compositional;
    }

    if (!_.isNil(props.versionNeeded)) {
        resource.versionNeeded = props.versionNeeded;
    }

    if (!_.isNil(props.content)) {
        resource.content = props.content;
    }

    if (!_.isNil(props.supplements)) {
        resource.supplements = props.supplements;
    }

    if (!_.isNil(props.count)) {
        resource.count = props.count;
    }

    if (!_.isNil(props.filter)) {
        let src = props.filter;
        if (!Array.isArray(src)) { src = [src]; }
        resource.filter = [];

        for (let item of src) {
            let _filter = {};

            if (!_.isNil(item.id)) {
                _filter.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _filter.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _filter.code = item.code;
            }

            if (!_.isNil(item.description)) {
                _filter.description = item.description;
            }

            if (!_.isNil(item.operator)) {
                _filter.operator = item.operator;
            }

            if (!_.isNil(item.value)) {
                _filter.value = item.value;
            }

            resource.filter.push(_filter);
        }
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {};

            if (!_.isNil(item.id)) {
                _property.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _property.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _property.code = item.code;
            }

            if (!_.isNil(item.uri)) {
                _property.uri = item.uri;
            }

            if (!_.isNil(item.description)) {
                _property.description = item.description;
            }

            if (!_.isNil(item.type)) {
                _property.type = item.type;
            }

            resource.property.push(_property);
        }
    }

    if (!_.isNil(props.concept)) {
        let src = props.concept;
        if (!Array.isArray(src)) { src = [src]; }
        resource.concept = [];

        for (let item of src) {
            let _concept = {};

            if (!_.isNil(item.id)) {
                _concept.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _concept.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _concept.code = item.code;
            }

            if (!_.isNil(item.display)) {
                _concept.display = item.display;
            }

            if (!_.isNil(item.definition)) {
                _concept.definition = item.definition;
            }

            if (!_.isNil(item.designation)) {
                _concept.designation = item.designation;
            }

            if (!_.isNil(item.property)) {
                _concept.property = item.property;
            }

            resource.concept.push(_concept);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CodeSystem"]
    };

    return resource;
}

/**
  * Create a FHIR Communication resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function communication(type, props) {
    const mappings = {
        "Communication": communication_Communication
    };

    return mappings[type](props)
}

function communication_Communication(props) {
    const resource = {
        resourceType: "Communication",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Communication</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.inResponseTo)) {
        if (!Array.isArray(props.inResponseTo)) { props.inResponseTo = [props.inResponseTo]; }
        resource.inResponseTo = util.reference(props.inResponseTo);
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

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.medium)) {
        resource.medium = props.medium;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.about)) {
        if (!Array.isArray(props.about)) { props.about = [props.about]; }
        resource.about = util.reference(props.about);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.sent)) {
        resource.sent = props.sent;
    }

    if (!_.isNil(props.received)) {
        resource.received = props.received;
    }

    if (!_.isNil(props.recipient)) {
        if (!Array.isArray(props.recipient)) { props.recipient = [props.recipient]; }
        resource.recipient = util.reference(props.recipient);
    }

    if (!_.isNil(props.sender)) {
        resource.sender = util.reference(props.sender);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.payload)) {
        let src = props.payload;
        if (!Array.isArray(src)) { src = [src]; }
        resource.payload = [];

        for (let item of src) {
            let _payload = {};

            if (!_.isNil(item.id)) {
                _payload.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _payload.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.content)) {
                _payload.content = item.content;
            }

            resource.payload.push(_payload);
        }
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Communication"]
    };

    return resource;
}

/**
  * Create a FHIR CommunicationRequest resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function communicationRequest(type, props) {
    const mappings = {
        "CommunicationRequest": communicationRequest_CommunicationRequest
    };

    return mappings[type](props)
}

function communicationRequest_CommunicationRequest(props) {
    const resource = {
        resourceType: "CommunicationRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CommunicationRequest</b></p></div>"
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

    if (!_.isNil(props.replaces)) {
        if (!Array.isArray(props.replaces)) { props.replaces = [props.replaces]; }
        resource.replaces = util.reference(props.replaces);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = util.identifier(props.groupIdentifier, undefined);
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

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.doNotPerform)) {
        resource.doNotPerform = props.doNotPerform;
    }

    if (!_.isNil(props.medium)) {
        resource.medium = props.medium;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.about)) {
        if (!Array.isArray(props.about)) { props.about = [props.about]; }
        resource.about = util.reference(props.about);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.payload)) {
        let src = props.payload;
        if (!Array.isArray(src)) { src = [src]; }
        resource.payload = [];

        for (let item of src) {
            let _payload = {};

            if (!_.isNil(item.id)) {
                _payload.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _payload.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.content)) {
                _payload.content = item.content;
            }

            resource.payload.push(_payload);
        }
    }

    if (!_.isNil(props.occurrence)) {
        util.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.requester)) {
        resource.requester = util.reference(props.requester);
    }

    if (!_.isNil(props.recipient)) {
        if (!Array.isArray(props.recipient)) { props.recipient = [props.recipient]; }
        resource.recipient = util.reference(props.recipient);
    }

    if (!_.isNil(props.sender)) {
        resource.sender = util.reference(props.sender);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CommunicationRequest"]
    };

    return resource;
}

/**
  * Create a FHIR CompartmentDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function compartmentDefinition(type, props) {
    const mappings = {
        "CompartmentDefinition": compartmentDefinition_CompartmentDefinition
    };

    return mappings[type](props)
}

function compartmentDefinition_CompartmentDefinition(props) {
    const resource = {
        resourceType: "CompartmentDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CompartmentDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.search)) {
        resource.search = props.search;
    }

    if (!_.isNil(props.resource)) {
        let src = props.resource;
        if (!Array.isArray(src)) { src = [src]; }
        resource.resource = [];

        for (let item of src) {
            let _resource = {};

            if (!_.isNil(item.id)) {
                _resource.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _resource.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _resource.code = item.code;
            }

            if (!_.isNil(item.param)) {
                _resource.param = item.param;
            }

            if (!_.isNil(item.documentation)) {
                _resource.documentation = item.documentation;
            }

            resource.resource.push(_resource);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CompartmentDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR Composition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function composition(type, props) {
    const mappings = {
        "Composition": composition_Composition
    };

    return mappings[type](props)
}

function composition_Composition(props) {
    const resource = {
        resourceType: "Composition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Composition</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.author)) {
        if (!Array.isArray(props.author)) { props.author = [props.author]; }
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.confidentiality)) {
        resource.confidentiality = props.confidentiality;
    }

    if (!_.isNil(props.attester)) {
        let src = props.attester;
        if (!Array.isArray(src)) { src = [src]; }
        resource.attester = [];

        for (let item of src) {
            let _attester = {};

            if (!_.isNil(item.id)) {
                _attester.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _attester.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.mode)) {
                _attester.mode = item.mode;
            }

            if (!_.isNil(item.time)) {
                _attester.time = item.time;
            }

            if (!_.isNil(item.party)) {
                _attester.party = item.party;
            }

            resource.attester.push(_attester);
        }
    }

    if (!_.isNil(props.custodian)) {
        resource.custodian = util.reference(props.custodian);
    }

    if (!_.isNil(props.relatesTo)) {
        let src = props.relatesTo;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relatesTo = [];

        for (let item of src) {
            let _relatesTo = {};

            if (!_.isNil(item.id)) {
                _relatesTo.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _relatesTo.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _relatesTo.code = item.code;
            }

            if (!_.isNil(item.target)) {
                _relatesTo.target = item.target;
            }

            resource.relatesTo.push(_relatesTo);
        }
    }

    if (!_.isNil(props.event)) {
        let src = props.event;
        if (!Array.isArray(src)) { src = [src]; }
        resource.event = [];

        for (let item of src) {
            let _event = {};

            if (!_.isNil(item.id)) {
                _event.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _event.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _event.code = item.code;
            }

            if (!_.isNil(item.period)) {
                _event.period = item.period;
            }

            if (!_.isNil(item.detail)) {
                _event.detail = item.detail;
            }

            resource.event.push(_event);
        }
    }

    if (!_.isNil(props.section)) {
        let src = props.section;
        if (!Array.isArray(src)) { src = [src]; }
        resource.section = [];

        for (let item of src) {
            let _section = {};

            if (!_.isNil(item.id)) {
                _section.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _section.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.title)) {
                _section.title = item.title;
            }

            if (!_.isNil(item.code)) {
                _section.code = item.code;
            }

            if (!_.isNil(item.author)) {
                _section.author = item.author;
            }

            if (!_.isNil(item.focus)) {
                _section.focus = item.focus;
            }

            if (!_.isNil(item.text)) {
                _section.text = item.text;
            }

            if (!_.isNil(item.mode)) {
                _section.mode = item.mode;
            }

            if (!_.isNil(item.orderedBy)) {
                _section.orderedBy = item.orderedBy;
            }

            if (!_.isNil(item.entry)) {
                _section.entry = item.entry;
            }

            if (!_.isNil(item.emptyReason)) {
                _section.emptyReason = item.emptyReason;
            }

            resource.section.push(_section);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Composition"]
    };

    return resource;
}

/**
  * Create a FHIR ConceptMap resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function conceptMap(type, props) {
    const mappings = {
        "ConceptMap": conceptMap_ConceptMap
    };

    return mappings[type](props)
}

function conceptMap_ConceptMap(props) {
    const resource = {
        resourceType: "ConceptMap",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ConceptMap</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.source)) {
        util.composite(resource, "source", props.source);
    }

    if (!_.isNil(props.target)) {
        util.composite(resource, "target", props.target);
    }

    if (!_.isNil(props.group)) {
        let src = props.group;
        if (!Array.isArray(src)) { src = [src]; }
        resource.group = [];

        for (let item of src) {
            let _group = {};

            if (!_.isNil(item.id)) {
                _group.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _group.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.source)) {
                _group.source = item.source;
            }

            if (!_.isNil(item.sourceVersion)) {
                _group.sourceVersion = item.sourceVersion;
            }

            if (!_.isNil(item.target)) {
                _group.target = item.target;
            }

            if (!_.isNil(item.targetVersion)) {
                _group.targetVersion = item.targetVersion;
            }

            if (!_.isNil(item.element)) {
                _group.element = item.element;
            }

            if (!_.isNil(item.unmapped)) {
                _group.unmapped = item.unmapped;
            }

            resource.group.push(_group);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ConceptMap"]
    };

    return resource;
}

/**
  * Create a FHIR Condition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function condition(type, props) {
    const mappings = {
        "Condition": condition_Condition
    };

    return mappings[type](props)
}

function condition_Condition(props) {
    const resource = {
        resourceType: "Condition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Condition</b></p></div>"
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

    if (!_.isNil(props.clinicalStatus)) {
        resource.clinicalStatus = props.clinicalStatus;
    }

    if (!_.isNil(props.verificationStatus)) {
        resource.verificationStatus = props.verificationStatus;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.severity)) {
        resource.severity = props.severity;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.onset)) {
        util.composite(resource, "onset", props.onset);
    }

    if (!_.isNil(props.abatement)) {
        util.composite(resource, "abatement", props.abatement);
    }

    if (!_.isNil(props.recordedDate)) {
        resource.recordedDate = props.recordedDate;
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = util.reference(props.recorder);
    }

    if (!_.isNil(props.asserter)) {
        resource.asserter = util.reference(props.asserter);
    }

    if (!_.isNil(props.stage)) {
        let src = props.stage;
        if (!Array.isArray(src)) { src = [src]; }
        resource.stage = [];

        for (let item of src) {
            let _stage = {};

            if (!_.isNil(item.id)) {
                _stage.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _stage.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.summary)) {
                _stage.summary = item.summary;
            }

            if (!_.isNil(item.assessment)) {
                _stage.assessment = item.assessment;
            }

            if (!_.isNil(item.type)) {
                _stage.type = item.type;
            }

            resource.stage.push(_stage);
        }
    }

    if (!_.isNil(props.evidence)) {
        let src = props.evidence;
        if (!Array.isArray(src)) { src = [src]; }
        resource.evidence = [];

        for (let item of src) {
            let _evidence = {};

            if (!_.isNil(item.id)) {
                _evidence.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _evidence.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _evidence.code = item.code;
            }

            if (!_.isNil(item.detail)) {
                _evidence.detail = item.detail;
            }

            resource.evidence.push(_evidence);
        }
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Condition"]
    };

    return resource;
}

/**
  * Create a FHIR Consent resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function consent(type, props) {
    const mappings = {
        "Consent": consent_Consent
    };

    return mappings[type](props)
}

function consent_Consent(props) {
    const resource = {
        resourceType: "Consent",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Consent</b></p></div>"
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

    if (!_.isNil(props.scope)) {
        resource.scope = props.scope;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.dateTime)) {
        resource.dateTime = props.dateTime;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.organization)) {
        if (!Array.isArray(props.organization)) { props.organization = [props.organization]; }
        resource.organization = util.reference(props.organization);
    }

    if (!_.isNil(props.source)) {
        util.composite(resource, "source", props.source);
    }

    if (!_.isNil(props.policy)) {
        let src = props.policy;
        if (!Array.isArray(src)) { src = [src]; }
        resource.policy = [];

        for (let item of src) {
            let _policy = {};

            if (!_.isNil(item.id)) {
                _policy.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _policy.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.authority)) {
                _policy.authority = item.authority;
            }

            if (!_.isNil(item.uri)) {
                _policy.uri = item.uri;
            }

            resource.policy.push(_policy);
        }
    }

    if (!_.isNil(props.policyRule)) {
        resource.policyRule = props.policyRule;
    }

    if (!_.isNil(props.verification)) {
        let src = props.verification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.verification = [];

        for (let item of src) {
            let _verification = {};

            if (!_.isNil(item.id)) {
                _verification.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _verification.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.verified)) {
                _verification.verified = item.verified;
            }

            if (!_.isNil(item.verifiedWith)) {
                _verification.verifiedWith = item.verifiedWith;
            }

            if (!_.isNil(item.verificationDate)) {
                _verification.verificationDate = item.verificationDate;
            }

            resource.verification.push(_verification);
        }
    }

    if (!_.isNil(props.provision)) {
        let src = props.provision;
        let _provision = {};

        if (!_.isNil(src.id)) {
            _provision.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _provision.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _provision.type = src.type;
        }

        if (!_.isNil(src.period)) {
            _provision.period = src.period;
        }

        if (!_.isNil(src.actor)) {
            _provision.actor = src.actor;
        }

        if (!_.isNil(src.action)) {
            _provision.action = src.action;
        }

        if (!_.isNil(src.securityLabel)) {
            _provision.securityLabel = src.securityLabel;
        }

        if (!_.isNil(src.purpose)) {
            _provision.purpose = src.purpose;
        }

        if (!_.isNil(src.class)) {
            _provision.class = src.class;
        }

        if (!_.isNil(src.code)) {
            _provision.code = src.code;
        }

        if (!_.isNil(src.dataPeriod)) {
            _provision.dataPeriod = src.dataPeriod;
        }

        if (!_.isNil(src.data)) {
            _provision.data = src.data;
        }

        resource.provision = _provision;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Consent"]
    };

    return resource;
}

/**
  * Create a FHIR Contract resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function contract(type, props) {
    const mappings = {
        "Contract": contract_Contract
    };

    return mappings[type](props)
}

function contract_Contract(props) {
    const resource = {
        resourceType: "Contract",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Contract</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.legalState)) {
        resource.legalState = props.legalState;
    }

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = util.reference(props.instantiatesCanonical);
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.contentDerivative)) {
        resource.contentDerivative = props.contentDerivative;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.applies)) {
        resource.applies = props.applies;
    }

    if (!_.isNil(props.expirationType)) {
        resource.expirationType = props.expirationType;
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.authority)) {
        if (!Array.isArray(props.authority)) { props.authority = [props.authority]; }
        resource.authority = util.reference(props.authority);
    }

    if (!_.isNil(props.domain)) {
        if (!Array.isArray(props.domain)) { props.domain = [props.domain]; }
        resource.domain = util.reference(props.domain);
    }

    if (!_.isNil(props.site)) {
        if (!Array.isArray(props.site)) { props.site = [props.site]; }
        resource.site = util.reference(props.site);
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.alias)) {
        resource.alias = props.alias;
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.scope)) {
        resource.scope = props.scope;
    }

    if (!_.isNil(props.topic)) {
        util.composite(resource, "topic", props.topic);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subType)) {
        resource.subType = props.subType;
    }

    if (!_.isNil(props.contentDefinition)) {
        let src = props.contentDefinition;
        let _contentDefinition = {};

        if (!_.isNil(src.id)) {
            _contentDefinition.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _contentDefinition.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _contentDefinition.type = src.type;
        }

        if (!_.isNil(src.subType)) {
            _contentDefinition.subType = src.subType;
        }

        if (!_.isNil(src.publisher)) {
            _contentDefinition.publisher = src.publisher;
        }

        if (!_.isNil(src.publicationDate)) {
            _contentDefinition.publicationDate = src.publicationDate;
        }

        if (!_.isNil(src.publicationStatus)) {
            _contentDefinition.publicationStatus = src.publicationStatus;
        }

        if (!_.isNil(src.copyright)) {
            _contentDefinition.copyright = src.copyright;
        }

        resource.contentDefinition = _contentDefinition;
    }

    if (!_.isNil(props.term)) {
        let src = props.term;
        if (!Array.isArray(src)) { src = [src]; }
        resource.term = [];

        for (let item of src) {
            let _term = {};

            if (!_.isNil(item.id)) {
                _term.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _term.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _term.identifier = item.identifier;
            }

            if (!_.isNil(item.issued)) {
                _term.issued = item.issued;
            }

            if (!_.isNil(item.applies)) {
                _term.applies = item.applies;
            }

            if (!_.isNil(item.topic)) {
                _term.topic = item.topic;
            }

            if (!_.isNil(item.type)) {
                _term.type = item.type;
            }

            if (!_.isNil(item.subType)) {
                _term.subType = item.subType;
            }

            if (!_.isNil(item.text)) {
                _term.text = item.text;
            }

            if (!_.isNil(item.securityLabel)) {
                _term.securityLabel = item.securityLabel;
            }

            if (!_.isNil(item.offer)) {
                _term.offer = item.offer;
            }

            if (!_.isNil(item.asset)) {
                _term.asset = item.asset;
            }

            if (!_.isNil(item.action)) {
                _term.action = item.action;
            }

            resource.term.push(_term);
        }
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = util.reference(props.relevantHistory);
    }

    if (!_.isNil(props.signer)) {
        let src = props.signer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.signer = [];

        for (let item of src) {
            let _signer = {};

            if (!_.isNil(item.id)) {
                _signer.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _signer.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _signer.type = item.type;
            }

            if (!_.isNil(item.party)) {
                _signer.party = item.party;
            }

            if (!_.isNil(item.signature)) {
                _signer.signature = item.signature;
            }

            resource.signer.push(_signer);
        }
    }

    if (!_.isNil(props.friendly)) {
        let src = props.friendly;
        if (!Array.isArray(src)) { src = [src]; }
        resource.friendly = [];

        for (let item of src) {
            let _friendly = {};

            if (!_.isNil(item.id)) {
                _friendly.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _friendly.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.content)) {
                _friendly.content = item.content;
            }

            resource.friendly.push(_friendly);
        }
    }

    if (!_.isNil(props.legal)) {
        let src = props.legal;
        if (!Array.isArray(src)) { src = [src]; }
        resource.legal = [];

        for (let item of src) {
            let _legal = {};

            if (!_.isNil(item.id)) {
                _legal.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _legal.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.content)) {
                _legal.content = item.content;
            }

            resource.legal.push(_legal);
        }
    }

    if (!_.isNil(props.rule)) {
        let src = props.rule;
        if (!Array.isArray(src)) { src = [src]; }
        resource.rule = [];

        for (let item of src) {
            let _rule = {};

            if (!_.isNil(item.id)) {
                _rule.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _rule.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.content)) {
                _rule.content = item.content;
            }

            resource.rule.push(_rule);
        }
    }

    if (!_.isNil(props.legallyBinding)) {
        util.composite(resource, "legallyBinding", props.legallyBinding);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Contract"]
    };

    return resource;
}

/**
  * Create a FHIR Coverage resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function coverage(type, props) {
    const mappings = {
        "Coverage": coverage_Coverage
    };

    return mappings[type](props)
}

function coverage_Coverage(props) {
    const resource = {
        resourceType: "Coverage",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Coverage</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.policyHolder)) {
        resource.policyHolder = util.reference(props.policyHolder);
    }

    if (!_.isNil(props.subscriber)) {
        resource.subscriber = util.reference(props.subscriber);
    }

    if (!_.isNil(props.subscriberId)) {
        resource.subscriberId = props.subscriberId;
    }

    if (!_.isNil(props.beneficiary)) {
        resource.beneficiary = util.reference(props.beneficiary);
    }

    if (!_.isNil(props.dependent)) {
        resource.dependent = props.dependent;
    }

    if (!_.isNil(props.relationship)) {
        resource.relationship = props.relationship;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.payor)) {
        if (!Array.isArray(props.payor)) { props.payor = [props.payor]; }
        resource.payor = util.reference(props.payor);
    }

    if (!_.isNil(props.class)) {
        let src = props.class;
        if (!Array.isArray(src)) { src = [src]; }
        resource.class = [];

        for (let item of src) {
            let _class = {};

            if (!_.isNil(item.id)) {
                _class.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _class.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _class.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _class.value = item.value;
            }

            if (!_.isNil(item.name)) {
                _class.name = item.name;
            }

            resource.class.push(_class);
        }
    }

    if (!_.isNil(props.order)) {
        resource.order = props.order;
    }

    if (!_.isNil(props.network)) {
        resource.network = props.network;
    }

    if (!_.isNil(props.costToBeneficiary)) {
        let src = props.costToBeneficiary;
        if (!Array.isArray(src)) { src = [src]; }
        resource.costToBeneficiary = [];

        for (let item of src) {
            let _costToBeneficiary = {};

            if (!_.isNil(item.id)) {
                _costToBeneficiary.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _costToBeneficiary.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _costToBeneficiary.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _costToBeneficiary.value = item.value;
            }

            if (!_.isNil(item.exception)) {
                _costToBeneficiary.exception = item.exception;
            }

            resource.costToBeneficiary.push(_costToBeneficiary);
        }
    }

    if (!_.isNil(props.subrogation)) {
        resource.subrogation = props.subrogation;
    }

    if (!_.isNil(props.contract)) {
        if (!Array.isArray(props.contract)) { props.contract = [props.contract]; }
        resource.contract = util.reference(props.contract);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Coverage"]
    };

    return resource;
}

/**
  * Create a FHIR CoverageEligibilityRequest resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function coverageEligibilityRequest(type, props) {
    const mappings = {
        "CoverageEligibilityRequest": coverageEligibilityRequest_CoverageEligibilityRequest
    };

    return mappings[type](props)
}

function coverageEligibilityRequest_CoverageEligibilityRequest(props) {
    const resource = {
        resourceType: "CoverageEligibilityRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CoverageEligibilityRequest</b></p></div>"
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

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.serviced)) {
        util.composite(resource, "serviced", props.serviced);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = util.reference(props.enterer);
    }

    if (!_.isNil(props.provider)) {
        resource.provider = util.reference(props.provider);
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = util.reference(props.insurer);
    }

    if (!_.isNil(props.facility)) {
        resource.facility = util.reference(props.facility);
    }

    if (!_.isNil(props.supportingInfo)) {
        let src = props.supportingInfo;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supportingInfo = [];

        for (let item of src) {
            let _supportingInfo = {};

            if (!_.isNil(item.id)) {
                _supportingInfo.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _supportingInfo.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _supportingInfo.sequence = item.sequence;
            }

            if (!_.isNil(item.information)) {
                _supportingInfo.information = item.information;
            }

            if (!_.isNil(item.appliesToAll)) {
                _supportingInfo.appliesToAll = item.appliesToAll;
            }

            resource.supportingInfo.push(_supportingInfo);
        }
    }

    if (!_.isNil(props.insurance)) {
        let src = props.insurance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.insurance = [];

        for (let item of src) {
            let _insurance = {};

            if (!_.isNil(item.id)) {
                _insurance.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _insurance.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.focal)) {
                _insurance.focal = item.focal;
            }

            if (!_.isNil(item.coverage)) {
                _insurance.coverage = item.coverage;
            }

            if (!_.isNil(item.businessArrangement)) {
                _insurance.businessArrangement = item.businessArrangement;
            }

            resource.insurance.push(_insurance);
        }
    }

    if (!_.isNil(props.item)) {
        let src = props.item;
        if (!Array.isArray(src)) { src = [src]; }
        resource.item = [];

        for (let item of src) {
            let _item = {};

            if (!_.isNil(item.id)) {
                _item.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _item.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.supportingInfoSequence)) {
                _item.supportingInfoSequence = item.supportingInfoSequence;
            }

            if (!_.isNil(item.category)) {
                _item.category = item.category;
            }

            if (!_.isNil(item.productOrService)) {
                _item.productOrService = item.productOrService;
            }

            if (!_.isNil(item.modifier)) {
                _item.modifier = item.modifier;
            }

            if (!_.isNil(item.provider)) {
                _item.provider = item.provider;
            }

            if (!_.isNil(item.quantity)) {
                _item.quantity = item.quantity;
            }

            if (!_.isNil(item.unitPrice)) {
                _item.unitPrice = item.unitPrice;
            }

            if (!_.isNil(item.facility)) {
                _item.facility = item.facility;
            }

            if (!_.isNil(item.diagnosis)) {
                _item.diagnosis = item.diagnosis;
            }

            if (!_.isNil(item.detail)) {
                _item.detail = item.detail;
            }

            resource.item.push(_item);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CoverageEligibilityRequest"]
    };

    return resource;
}

/**
  * Create a FHIR CoverageEligibilityResponse resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function coverageEligibilityResponse(type, props) {
    const mappings = {
        "CoverageEligibilityResponse": coverageEligibilityResponse_CoverageEligibilityResponse
    };

    return mappings[type](props)
}

function coverageEligibilityResponse_CoverageEligibilityResponse(props) {
    const resource = {
        resourceType: "CoverageEligibilityResponse",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CoverageEligibilityResponse</b></p></div>"
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

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.serviced)) {
        util.composite(resource, "serviced", props.serviced);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.requestor)) {
        resource.requestor = util.reference(props.requestor);
    }

    if (!_.isNil(props.request)) {
        resource.request = util.reference(props.request);
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
    }

    if (!_.isNil(props.disposition)) {
        resource.disposition = props.disposition;
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = util.reference(props.insurer);
    }

    if (!_.isNil(props.insurance)) {
        let src = props.insurance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.insurance = [];

        for (let item of src) {
            let _insurance = {};

            if (!_.isNil(item.id)) {
                _insurance.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _insurance.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.coverage)) {
                _insurance.coverage = item.coverage;
            }

            if (!_.isNil(item.inforce)) {
                _insurance.inforce = item.inforce;
            }

            if (!_.isNil(item.benefitPeriod)) {
                _insurance.benefitPeriod = item.benefitPeriod;
            }

            if (!_.isNil(item.item)) {
                _insurance.item = item.item;
            }

            resource.insurance.push(_insurance);
        }
    }

    if (!_.isNil(props.preAuthRef)) {
        resource.preAuthRef = props.preAuthRef;
    }

    if (!_.isNil(props.form)) {
        resource.form = props.form;
    }

    if (!_.isNil(props.error)) {
        let src = props.error;
        if (!Array.isArray(src)) { src = [src]; }
        resource.error = [];

        for (let item of src) {
            let _error = {};

            if (!_.isNil(item.id)) {
                _error.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _error.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _error.code = item.code;
            }

            resource.error.push(_error);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CoverageEligibilityResponse"]
    };

    return resource;
}

/**
  * Create a FHIR DetectedIssue resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function detectedIssue(type, props) {
    const mappings = {
        "DetectedIssue": detectedIssue_DetectedIssue
    };

    return mappings[type](props)
}

function detectedIssue_DetectedIssue(props) {
    const resource = {
        resourceType: "DetectedIssue",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DetectedIssue</b></p></div>"
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

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.severity)) {
        resource.severity = props.severity;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.identified)) {
        util.composite(resource, "identified", props.identified);
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.implicated)) {
        if (!Array.isArray(props.implicated)) { props.implicated = [props.implicated]; }
        resource.implicated = util.reference(props.implicated);
    }

    if (!_.isNil(props.evidence)) {
        let src = props.evidence;
        if (!Array.isArray(src)) { src = [src]; }
        resource.evidence = [];

        for (let item of src) {
            let _evidence = {};

            if (!_.isNil(item.id)) {
                _evidence.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _evidence.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _evidence.code = item.code;
            }

            if (!_.isNil(item.detail)) {
                _evidence.detail = item.detail;
            }

            resource.evidence.push(_evidence);
        }
    }

    if (!_.isNil(props.detail)) {
        resource.detail = props.detail;
    }

    if (!_.isNil(props.reference)) {
        resource.reference = props.reference;
    }

    if (!_.isNil(props.mitigation)) {
        let src = props.mitigation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.mitigation = [];

        for (let item of src) {
            let _mitigation = {};

            if (!_.isNil(item.id)) {
                _mitigation.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _mitigation.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.action)) {
                _mitigation.action = item.action;
            }

            if (!_.isNil(item.date)) {
                _mitigation.date = item.date;
            }

            if (!_.isNil(item.author)) {
                _mitigation.author = item.author;
            }

            resource.mitigation.push(_mitigation);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DetectedIssue"]
    };

    return resource;
}

/**
  * Create a FHIR Device resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function device(type, props) {
    const mappings = {
        "Device": device_Device
    };

    return mappings[type](props)
}

function device_Device(props) {
    const resource = {
        resourceType: "Device",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Device</b></p></div>"
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

    if (!_.isNil(props.definition)) {
        resource.definition = util.reference(props.definition);
    }

    if (!_.isNil(props.udiCarrier)) {
        let src = props.udiCarrier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.udiCarrier = [];

        for (let item of src) {
            let _udiCarrier = {};

            if (!_.isNil(item.id)) {
                _udiCarrier.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _udiCarrier.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.deviceIdentifier)) {
                _udiCarrier.deviceIdentifier = item.deviceIdentifier;
            }

            if (!_.isNil(item.issuer)) {
                _udiCarrier.issuer = item.issuer;
            }

            if (!_.isNil(item.jurisdiction)) {
                _udiCarrier.jurisdiction = item.jurisdiction;
            }

            if (!_.isNil(item.carrierAIDC)) {
                _udiCarrier.carrierAIDC = item.carrierAIDC;
            }

            if (!_.isNil(item.carrierHRF)) {
                _udiCarrier.carrierHRF = item.carrierHRF;
            }

            if (!_.isNil(item.entryType)) {
                _udiCarrier.entryType = item.entryType;
            }

            resource.udiCarrier.push(_udiCarrier);
        }
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.distinctIdentifier)) {
        resource.distinctIdentifier = props.distinctIdentifier;
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = props.manufacturer;
    }

    if (!_.isNil(props.manufactureDate)) {
        resource.manufactureDate = props.manufactureDate;
    }

    if (!_.isNil(props.expirationDate)) {
        resource.expirationDate = props.expirationDate;
    }

    if (!_.isNil(props.lotNumber)) {
        resource.lotNumber = props.lotNumber;
    }

    if (!_.isNil(props.serialNumber)) {
        resource.serialNumber = props.serialNumber;
    }

    if (!_.isNil(props.deviceName)) {
        let src = props.deviceName;
        if (!Array.isArray(src)) { src = [src]; }
        resource.deviceName = [];

        for (let item of src) {
            let _deviceName = {};

            if (!_.isNil(item.id)) {
                _deviceName.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _deviceName.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _deviceName.name = item.name;
            }

            if (!_.isNil(item.type)) {
                _deviceName.type = item.type;
            }

            resource.deviceName.push(_deviceName);
        }
    }

    if (!_.isNil(props.modelNumber)) {
        resource.modelNumber = props.modelNumber;
    }

    if (!_.isNil(props.partNumber)) {
        resource.partNumber = props.partNumber;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.specialization)) {
        let src = props.specialization;
        if (!Array.isArray(src)) { src = [src]; }
        resource.specialization = [];

        for (let item of src) {
            let _specialization = {};

            if (!_.isNil(item.id)) {
                _specialization.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _specialization.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.systemType)) {
                _specialization.systemType = item.systemType;
            }

            if (!_.isNil(item.version)) {
                _specialization.version = item.version;
            }

            resource.specialization.push(_specialization);
        }
    }

    if (!_.isNil(props.version)) {
        let src = props.version;
        if (!Array.isArray(src)) { src = [src]; }
        resource.version = [];

        for (let item of src) {
            let _version = {};

            if (!_.isNil(item.id)) {
                _version.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _version.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _version.type = item.type;
            }

            if (!_.isNil(item.component)) {
                _version.component = item.component;
            }

            if (!_.isNil(item.value)) {
                _version.value = item.value;
            }

            resource.version.push(_version);
        }
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {};

            if (!_.isNil(item.id)) {
                _property.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _property.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _property.type = item.type;
            }

            if (!_.isNil(item.valueQuantity)) {
                _property.valueQuantity = item.valueQuantity;
            }

            if (!_.isNil(item.valueCode)) {
                _property.valueCode = item.valueCode;
            }

            resource.property.push(_property);
        }
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.owner)) {
        resource.owner = util.reference(props.owner);
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.safety)) {
        resource.safety = props.safety;
    }

    if (!_.isNil(props.parent)) {
        resource.parent = util.reference(props.parent);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Device"]
    };

    return resource;
}

/**
  * Create a FHIR DeviceDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function deviceDefinition(type, props) {
    const mappings = {
        "DeviceDefinition": deviceDefinition_DeviceDefinition
    };

    return mappings[type](props)
}

function deviceDefinition_DeviceDefinition(props) {
    const resource = {
        resourceType: "DeviceDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DeviceDefinition</b></p></div>"
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

    if (!_.isNil(props.udiDeviceIdentifier)) {
        let src = props.udiDeviceIdentifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.udiDeviceIdentifier = [];

        for (let item of src) {
            let _udiDeviceIdentifier = {};

            if (!_.isNil(item.id)) {
                _udiDeviceIdentifier.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _udiDeviceIdentifier.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.deviceIdentifier)) {
                _udiDeviceIdentifier.deviceIdentifier = item.deviceIdentifier;
            }

            if (!_.isNil(item.issuer)) {
                _udiDeviceIdentifier.issuer = item.issuer;
            }

            if (!_.isNil(item.jurisdiction)) {
                _udiDeviceIdentifier.jurisdiction = item.jurisdiction;
            }

            resource.udiDeviceIdentifier.push(_udiDeviceIdentifier);
        }
    }

    if (!_.isNil(props.manufacturer)) {
        util.composite(resource, "manufacturer", props.manufacturer);
    }

    if (!_.isNil(props.deviceName)) {
        let src = props.deviceName;
        if (!Array.isArray(src)) { src = [src]; }
        resource.deviceName = [];

        for (let item of src) {
            let _deviceName = {};

            if (!_.isNil(item.id)) {
                _deviceName.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _deviceName.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _deviceName.name = item.name;
            }

            if (!_.isNil(item.type)) {
                _deviceName.type = item.type;
            }

            resource.deviceName.push(_deviceName);
        }
    }

    if (!_.isNil(props.modelNumber)) {
        resource.modelNumber = props.modelNumber;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.specialization)) {
        let src = props.specialization;
        if (!Array.isArray(src)) { src = [src]; }
        resource.specialization = [];

        for (let item of src) {
            let _specialization = {};

            if (!_.isNil(item.id)) {
                _specialization.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _specialization.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.systemType)) {
                _specialization.systemType = item.systemType;
            }

            if (!_.isNil(item.version)) {
                _specialization.version = item.version;
            }

            resource.specialization.push(_specialization);
        }
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.safety)) {
        resource.safety = props.safety;
    }

    if (!_.isNil(props.shelfLifeStorage)) {
        resource.shelfLifeStorage = props.shelfLifeStorage;
    }

    if (!_.isNil(props.physicalCharacteristics)) {
        resource.physicalCharacteristics = props.physicalCharacteristics;
    }

    if (!_.isNil(props.languageCode)) {
        resource.languageCode = props.languageCode;
    }

    if (!_.isNil(props.capability)) {
        let src = props.capability;
        if (!Array.isArray(src)) { src = [src]; }
        resource.capability = [];

        for (let item of src) {
            let _capability = {};

            if (!_.isNil(item.id)) {
                _capability.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _capability.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _capability.type = item.type;
            }

            if (!_.isNil(item.description)) {
                _capability.description = item.description;
            }

            resource.capability.push(_capability);
        }
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {};

            if (!_.isNil(item.id)) {
                _property.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _property.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _property.type = item.type;
            }

            if (!_.isNil(item.valueQuantity)) {
                _property.valueQuantity = item.valueQuantity;
            }

            if (!_.isNil(item.valueCode)) {
                _property.valueCode = item.valueCode;
            }

            resource.property.push(_property);
        }
    }

    if (!_.isNil(props.owner)) {
        resource.owner = util.reference(props.owner);
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.onlineInformation)) {
        resource.onlineInformation = props.onlineInformation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.parentDevice)) {
        resource.parentDevice = util.reference(props.parentDevice);
    }

    if (!_.isNil(props.material)) {
        let src = props.material;
        if (!Array.isArray(src)) { src = [src]; }
        resource.material = [];

        for (let item of src) {
            let _material = {};

            if (!_.isNil(item.id)) {
                _material.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _material.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.substance)) {
                _material.substance = item.substance;
            }

            if (!_.isNil(item.alternate)) {
                _material.alternate = item.alternate;
            }

            if (!_.isNil(item.allergenicIndicator)) {
                _material.allergenicIndicator = item.allergenicIndicator;
            }

            resource.material.push(_material);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DeviceDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR DeviceMetric resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function deviceMetric(type, props) {
    const mappings = {
        "DeviceMetric": deviceMetric_DeviceMetric
    };

    return mappings[type](props)
}

function deviceMetric_DeviceMetric(props) {
    const resource = {
        resourceType: "DeviceMetric",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DeviceMetric</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.unit)) {
        resource.unit = props.unit;
    }

    if (!_.isNil(props.source)) {
        resource.source = util.reference(props.source);
    }

    if (!_.isNil(props.parent)) {
        resource.parent = util.reference(props.parent);
    }

    if (!_.isNil(props.operationalStatus)) {
        resource.operationalStatus = props.operationalStatus;
    }

    if (!_.isNil(props.color)) {
        resource.color = props.color;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.measurementPeriod)) {
        resource.measurementPeriod = props.measurementPeriod;
    }

    if (!_.isNil(props.calibration)) {
        let src = props.calibration;
        if (!Array.isArray(src)) { src = [src]; }
        resource.calibration = [];

        for (let item of src) {
            let _calibration = {};

            if (!_.isNil(item.id)) {
                _calibration.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _calibration.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _calibration.type = item.type;
            }

            if (!_.isNil(item.state)) {
                _calibration.state = item.state;
            }

            if (!_.isNil(item.time)) {
                _calibration.time = item.time;
            }

            resource.calibration.push(_calibration);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DeviceMetric"]
    };

    return resource;
}

/**
  * Create a FHIR DeviceRequest resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function deviceRequest(type, props) {
    const mappings = {
        "DeviceRequest": deviceRequest_DeviceRequest
    };

    return mappings[type](props)
}

function deviceRequest_DeviceRequest(props) {
    const resource = {
        resourceType: "DeviceRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DeviceRequest</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.priorRequest)) {
        if (!Array.isArray(props.priorRequest)) { props.priorRequest = [props.priorRequest]; }
        resource.priorRequest = util.reference(props.priorRequest);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = util.identifier(props.groupIdentifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.code)) {
        util.composite(resource, "code", props.code);
    }

    if (!_.isNil(props.parameter)) {
        let src = props.parameter;
        if (!Array.isArray(src)) { src = [src]; }
        resource.parameter = [];

        for (let item of src) {
            let _parameter = {};

            if (!_.isNil(item.id)) {
                _parameter.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _parameter.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _parameter.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _parameter.value = item.value;
            }

            resource.parameter.push(_parameter);
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        util.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.requester)) {
        resource.requester = util.reference(props.requester);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = props.performerType;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = util.reference(props.insurance);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = util.reference(props.relevantHistory);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest"]
    };

    return resource;
}

/**
  * Create a FHIR DeviceUseStatement resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function deviceUseStatement(type, props) {
    const mappings = {
        "DeviceUseStatement": deviceUseStatement_DeviceUseStatement
    };

    return mappings[type](props)
}

function deviceUseStatement_DeviceUseStatement(props) {
    const resource = {
        resourceType: "DeviceUseStatement",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DeviceUseStatement</b></p></div>"
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = util.reference(props.derivedFrom);
    }

    if (!_.isNil(props.timing)) {
        util.composite(resource, "timing", props.timing);
    }

    if (!_.isNil(props.recordedOn)) {
        resource.recordedOn = props.recordedOn;
    }

    if (!_.isNil(props.source)) {
        resource.source = util.reference(props.source);
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DeviceUseStatement"]
    };

    return resource;
}

/**
  * Create a FHIR DiagnosticReport resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function diagnosticReport(type, props) {
    const mappings = {
        "DiagnosticReport": diagnosticReport_DiagnosticReport
    };

    return mappings[type](props)
}

function diagnosticReport_DiagnosticReport(props) {
    const resource = {
        resourceType: "DiagnosticReport",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DiagnosticReport</b></p></div>"
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
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

    if (!_.isNil(props.resultsInterpreter)) {
        if (!Array.isArray(props.resultsInterpreter)) { props.resultsInterpreter = [props.resultsInterpreter]; }
        resource.resultsInterpreter = util.reference(props.resultsInterpreter);
    }

    if (!_.isNil(props.specimen)) {
        if (!Array.isArray(props.specimen)) { props.specimen = [props.specimen]; }
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.result)) {
        if (!Array.isArray(props.result)) { props.result = [props.result]; }
        resource.result = util.reference(props.result);
    }

    if (!_.isNil(props.imagingStudy)) {
        if (!Array.isArray(props.imagingStudy)) { props.imagingStudy = [props.imagingStudy]; }
        resource.imagingStudy = util.reference(props.imagingStudy);
    }

    if (!_.isNil(props.media)) {
        let src = props.media;
        if (!Array.isArray(src)) { src = [src]; }
        resource.media = [];

        for (let item of src) {
            let _media = {};

            if (!_.isNil(item.id)) {
                _media.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _media.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.comment)) {
                _media.comment = item.comment;
            }

            if (!_.isNil(item.link)) {
                _media.link = item.link;
            }

            resource.media.push(_media);
        }
    }

    if (!_.isNil(props.conclusion)) {
        resource.conclusion = props.conclusion;
    }

    if (!_.isNil(props.conclusionCode)) {
        resource.conclusionCode = props.conclusionCode;
    }

    if (!_.isNil(props.presentedForm)) {
        resource.presentedForm = props.presentedForm;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DiagnosticReport"]
    };

    return resource;
}

/**
  * Create a FHIR DocumentManifest resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function documentManifest(type, props) {
    const mappings = {
        "DocumentManifest": documentManifest_DocumentManifest
    };

    return mappings[type](props)
}

function documentManifest_DocumentManifest(props) {
    const resource = {
        resourceType: "DocumentManifest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DocumentManifest</b></p></div>"
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

    if (!_.isNil(props.masterIdentifier)) {
        resource.masterIdentifier = util.identifier(props.masterIdentifier, undefined);
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.author)) {
        if (!Array.isArray(props.author)) { props.author = [props.author]; }
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.recipient)) {
        if (!Array.isArray(props.recipient)) { props.recipient = [props.recipient]; }
        resource.recipient = util.reference(props.recipient);
    }

    if (!_.isNil(props.source)) {
        resource.source = props.source;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.content)) {
        if (!Array.isArray(props.content)) { props.content = [props.content]; }
        resource.content = util.reference(props.content);
    }

    if (!_.isNil(props.related)) {
        let src = props.related;
        if (!Array.isArray(src)) { src = [src]; }
        resource.related = [];

        for (let item of src) {
            let _related = {};

            if (!_.isNil(item.id)) {
                _related.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _related.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _related.identifier = item.identifier;
            }

            if (!_.isNil(item.ref)) {
                _related.ref = item.ref;
            }

            resource.related.push(_related);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DocumentManifest"]
    };

    return resource;
}

/**
  * Create a FHIR DocumentReference resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function documentReference(type, props) {
    const mappings = {
        "DocumentReference": documentReference_DocumentReference
    };

    return mappings[type](props)
}

function documentReference_DocumentReference(props) {
    const resource = {
        resourceType: "DocumentReference",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DocumentReference</b></p></div>"
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

    if (!_.isNil(props.masterIdentifier)) {
        resource.masterIdentifier = util.identifier(props.masterIdentifier, undefined);
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.docStatus)) {
        resource.docStatus = props.docStatus;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.author)) {
        if (!Array.isArray(props.author)) { props.author = [props.author]; }
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.authenticator)) {
        resource.authenticator = util.reference(props.authenticator);
    }

    if (!_.isNil(props.custodian)) {
        resource.custodian = util.reference(props.custodian);
    }

    if (!_.isNil(props.relatesTo)) {
        let src = props.relatesTo;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relatesTo = [];

        for (let item of src) {
            let _relatesTo = {};

            if (!_.isNil(item.id)) {
                _relatesTo.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _relatesTo.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _relatesTo.code = item.code;
            }

            if (!_.isNil(item.target)) {
                _relatesTo.target = item.target;
            }

            resource.relatesTo.push(_relatesTo);
        }
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.securityLabel)) {
        resource.securityLabel = props.securityLabel;
    }

    if (!_.isNil(props.content)) {
        let src = props.content;
        if (!Array.isArray(src)) { src = [src]; }
        resource.content = [];

        for (let item of src) {
            let _content = {};

            if (!_.isNil(item.id)) {
                _content.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _content.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.attachment)) {
                _content.attachment = item.attachment;
            }

            if (!_.isNil(item.format)) {
                _content.format = item.format;
            }

            resource.content.push(_content);
        }
    }

    if (!_.isNil(props.context)) {
        let src = props.context;
        let _context = {};

        if (!_.isNil(src.id)) {
            _context.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _context.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.encounter)) {
            _context.encounter = src.encounter;
        }

        if (!_.isNil(src.event)) {
            _context.event = src.event;
        }

        if (!_.isNil(src.period)) {
            _context.period = src.period;
        }

        if (!_.isNil(src.facilityType)) {
            _context.facilityType = src.facilityType;
        }

        if (!_.isNil(src.practiceSetting)) {
            _context.practiceSetting = src.practiceSetting;
        }

        if (!_.isNil(src.sourcePatientInfo)) {
            _context.sourcePatientInfo = src.sourcePatientInfo;
        }

        if (!_.isNil(src.related)) {
            _context.related = src.related;
        }

        resource.context = _context;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"]
    };

    return resource;
}

/**
  * Create a FHIR DomainResource resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function domainResource(type, props) {
    const mappings = {
        "DomainResource": domainResource_DomainResource
    };

    return mappings[type](props)
}

function domainResource_DomainResource(props) {
    const resource = {
        resourceType: "DomainResource",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DomainResource</b></p></div>"
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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DomainResource"]
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
        "Encounter": encounter_Encounter
    };

    return mappings[type](props)
}

function encounter_Encounter(props) {
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
        resource.class = props.class;
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
        profile: ["http://hl7.org/fhir/StructureDefinition/Encounter"]
    };

    return resource;
}

/**
  * Create a FHIR Endpoint resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function endpoint(type, props) {
    const mappings = {
        "Endpoint": endpoint_Endpoint
    };

    return mappings[type](props)
}

function endpoint_Endpoint(props) {
    const resource = {
        resourceType: "Endpoint",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Endpoint</b></p></div>"
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

    if (!_.isNil(props.connectionType)) {
        resource.connectionType = props.connectionType;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = util.reference(props.managingOrganization);
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.payloadType)) {
        resource.payloadType = props.payloadType;
    }

    if (!_.isNil(props.payloadMimeType)) {
        resource.payloadMimeType = props.payloadMimeType;
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.header)) {
        resource.header = props.header;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"]
    };

    return resource;
}

/**
  * Create a FHIR EnrollmentRequest resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function enrollmentRequest(type, props) {
    const mappings = {
        "EnrollmentRequest": enrollmentRequest_EnrollmentRequest
    };

    return mappings[type](props)
}

function enrollmentRequest_EnrollmentRequest(props) {
    const resource = {
        resourceType: "EnrollmentRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EnrollmentRequest</b></p></div>"
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

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = util.reference(props.insurer);
    }

    if (!_.isNil(props.provider)) {
        resource.provider = util.reference(props.provider);
    }

    if (!_.isNil(props.candidate)) {
        resource.candidate = util.reference(props.candidate);
    }

    if (!_.isNil(props.coverage)) {
        resource.coverage = util.reference(props.coverage);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EnrollmentRequest"]
    };

    return resource;
}

/**
  * Create a FHIR EnrollmentResponse resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function enrollmentResponse(type, props) {
    const mappings = {
        "EnrollmentResponse": enrollmentResponse_EnrollmentResponse
    };

    return mappings[type](props)
}

function enrollmentResponse_EnrollmentResponse(props) {
    const resource = {
        resourceType: "EnrollmentResponse",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EnrollmentResponse</b></p></div>"
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

    if (!_.isNil(props.request)) {
        resource.request = util.reference(props.request);
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
    }

    if (!_.isNil(props.disposition)) {
        resource.disposition = props.disposition;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.organization)) {
        resource.organization = util.reference(props.organization);
    }

    if (!_.isNil(props.requestProvider)) {
        resource.requestProvider = util.reference(props.requestProvider);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EnrollmentResponse"]
    };

    return resource;
}

/**
  * Create a FHIR EpisodeOfCare resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function episodeOfCare(type, props) {
    const mappings = {
        "EpisodeOfCare": episodeOfCare_EpisodeOfCare
    };

    return mappings[type](props)
}

function episodeOfCare_EpisodeOfCare(props) {
    const resource = {
        resourceType: "EpisodeOfCare",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EpisodeOfCare</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
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

            if (!_.isNil(item.role)) {
                _diagnosis.role = item.role;
            }

            if (!_.isNil(item.rank)) {
                _diagnosis.rank = item.rank;
            }

            resource.diagnosis.push(_diagnosis);
        }
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = util.reference(props.managingOrganization);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.referralRequest)) {
        if (!Array.isArray(props.referralRequest)) { props.referralRequest = [props.referralRequest]; }
        resource.referralRequest = util.reference(props.referralRequest);
    }

    if (!_.isNil(props.careManager)) {
        resource.careManager = util.reference(props.careManager);
    }

    if (!_.isNil(props.team)) {
        if (!Array.isArray(props.team)) { props.team = [props.team]; }
        resource.team = util.reference(props.team);
    }

    if (!_.isNil(props.account)) {
        if (!Array.isArray(props.account)) { props.account = [props.account]; }
        resource.account = util.reference(props.account);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"]
    };

    return resource;
}

/**
  * Create a FHIR EventDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function eventDefinition(type, props) {
    const mappings = {
        "EventDefinition": eventDefinition_EventDefinition
    };

    return mappings[type](props)
}

function eventDefinition_EventDefinition(props) {
    const resource = {
        resourceType: "EventDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EventDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.subject)) {
        util.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.trigger)) {
        resource.trigger = props.trigger;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EventDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR Evidence resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function evidence(type, props) {
    const mappings = {
        "Evidence": evidence_Evidence
    };

    return mappings[type](props)
}

function evidence_Evidence(props) {
    const resource = {
        resourceType: "Evidence",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Evidence</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.citeAs)) {
        util.composite(resource, "citeAs", props.citeAs);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.assertion)) {
        resource.assertion = props.assertion;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.variableDefinition)) {
        let src = props.variableDefinition;
        if (!Array.isArray(src)) { src = [src]; }
        resource.variableDefinition = [];

        for (let item of src) {
            let _variableDefinition = {};

            if (!_.isNil(item.id)) {
                _variableDefinition.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _variableDefinition.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _variableDefinition.description = item.description;
            }

            if (!_.isNil(item.note)) {
                _variableDefinition.note = item.note;
            }

            if (!_.isNil(item.variableRole)) {
                _variableDefinition.variableRole = item.variableRole;
            }

            if (!_.isNil(item.observed)) {
                _variableDefinition.observed = item.observed;
            }

            if (!_.isNil(item.intended)) {
                _variableDefinition.intended = item.intended;
            }

            if (!_.isNil(item.directnessMatch)) {
                _variableDefinition.directnessMatch = item.directnessMatch;
            }

            resource.variableDefinition.push(_variableDefinition);
        }
    }

    if (!_.isNil(props.synthesisType)) {
        resource.synthesisType = props.synthesisType;
    }

    if (!_.isNil(props.studyType)) {
        resource.studyType = props.studyType;
    }

    if (!_.isNil(props.statistic)) {
        let src = props.statistic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statistic = [];

        for (let item of src) {
            let _statistic = {};

            if (!_.isNil(item.id)) {
                _statistic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _statistic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _statistic.description = item.description;
            }

            if (!_.isNil(item.note)) {
                _statistic.note = item.note;
            }

            if (!_.isNil(item.statisticType)) {
                _statistic.statisticType = item.statisticType;
            }

            if (!_.isNil(item.category)) {
                _statistic.category = item.category;
            }

            if (!_.isNil(item.quantity)) {
                _statistic.quantity = item.quantity;
            }

            if (!_.isNil(item.numberOfEvents)) {
                _statistic.numberOfEvents = item.numberOfEvents;
            }

            if (!_.isNil(item.numberAffected)) {
                _statistic.numberAffected = item.numberAffected;
            }

            if (!_.isNil(item.sampleSize)) {
                _statistic.sampleSize = item.sampleSize;
            }

            if (!_.isNil(item.attributeEstimate)) {
                _statistic.attributeEstimate = item.attributeEstimate;
            }

            if (!_.isNil(item.modelCharacteristic)) {
                _statistic.modelCharacteristic = item.modelCharacteristic;
            }

            resource.statistic.push(_statistic);
        }
    }

    if (!_.isNil(props.certainty)) {
        let src = props.certainty;
        if (!Array.isArray(src)) { src = [src]; }
        resource.certainty = [];

        for (let item of src) {
            let _certainty = {};

            if (!_.isNil(item.id)) {
                _certainty.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _certainty.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _certainty.description = item.description;
            }

            if (!_.isNil(item.note)) {
                _certainty.note = item.note;
            }

            if (!_.isNil(item.type)) {
                _certainty.type = item.type;
            }

            if (!_.isNil(item.rating)) {
                _certainty.rating = item.rating;
            }

            if (!_.isNil(item.rater)) {
                _certainty.rater = item.rater;
            }

            resource.certainty.push(_certainty);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Evidence"]
    };

    return resource;
}

/**
  * Create a FHIR EvidenceReport resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function evidenceReport(type, props) {
    const mappings = {
        "EvidenceReport": evidenceReport_EvidenceReport
    };

    return mappings[type](props)
}

function evidenceReport_EvidenceReport(props) {
    const resource = {
        resourceType: "EvidenceReport",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EvidenceReport</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.relatedIdentifier)) {
        if (!Array.isArray(props.relatedIdentifier)) { props.relatedIdentifier = [props.relatedIdentifier]; }
        resource.relatedIdentifier = util.identifier(props.relatedIdentifier, undefined);
    }

    if (!_.isNil(props.citeAs)) {
        util.composite(resource, "citeAs", props.citeAs);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.subject)) {
        let src = props.subject;
        let _subject = {};

        if (!_.isNil(src.id)) {
            _subject.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _subject.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.characteristic)) {
            _subject.characteristic = src.characteristic;
        }

        if (!_.isNil(src.note)) {
            _subject.note = src.note;
        }

        resource.subject = _subject;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatesTo)) {
        let src = props.relatesTo;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relatesTo = [];

        for (let item of src) {
            let _relatesTo = {};

            if (!_.isNil(item.id)) {
                _relatesTo.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _relatesTo.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _relatesTo.code = item.code;
            }

            if (!_.isNil(item.target)) {
                _relatesTo.target = item.target;
            }

            resource.relatesTo.push(_relatesTo);
        }
    }

    if (!_.isNil(props.section)) {
        let src = props.section;
        if (!Array.isArray(src)) { src = [src]; }
        resource.section = [];

        for (let item of src) {
            let _section = {};

            if (!_.isNil(item.id)) {
                _section.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _section.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.title)) {
                _section.title = item.title;
            }

            if (!_.isNil(item.focus)) {
                _section.focus = item.focus;
            }

            if (!_.isNil(item.focusReference)) {
                _section.focusReference = item.focusReference;
            }

            if (!_.isNil(item.author)) {
                _section.author = item.author;
            }

            if (!_.isNil(item.text)) {
                _section.text = item.text;
            }

            if (!_.isNil(item.mode)) {
                _section.mode = item.mode;
            }

            if (!_.isNil(item.orderedBy)) {
                _section.orderedBy = item.orderedBy;
            }

            if (!_.isNil(item.entryClassifier)) {
                _section.entryClassifier = item.entryClassifier;
            }

            if (!_.isNil(item.entryReference)) {
                _section.entryReference = item.entryReference;
            }

            if (!_.isNil(item.entryQuantity)) {
                _section.entryQuantity = item.entryQuantity;
            }

            if (!_.isNil(item.emptyReason)) {
                _section.emptyReason = item.emptyReason;
            }

            resource.section.push(_section);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EvidenceReport"]
    };

    return resource;
}

/**
  * Create a FHIR EvidenceVariable resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function evidenceVariable(type, props) {
    const mappings = {
        "EvidenceVariable": evidenceVariable_EvidenceVariable
    };

    return mappings[type](props)
}

function evidenceVariable_EvidenceVariable(props) {
    const resource = {
        resourceType: "EvidenceVariable",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EvidenceVariable</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.shortTitle)) {
        resource.shortTitle = props.shortTitle;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.actual)) {
        resource.actual = props.actual;
    }

    if (!_.isNil(props.characteristicCombination)) {
        resource.characteristicCombination = props.characteristicCombination;
    }

    if (!_.isNil(props.characteristic)) {
        let src = props.characteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.characteristic = [];

        for (let item of src) {
            let _characteristic = {};

            if (!_.isNil(item.id)) {
                _characteristic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _characteristic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _characteristic.description = item.description;
            }

            if (!_.isNil(item.definition)) {
                _characteristic.definition = item.definition;
            }

            if (!_.isNil(item.method)) {
                _characteristic.method = item.method;
            }

            if (!_.isNil(item.device)) {
                _characteristic.device = item.device;
            }

            if (!_.isNil(item.exclude)) {
                _characteristic.exclude = item.exclude;
            }

            if (!_.isNil(item.timeFromStart)) {
                _characteristic.timeFromStart = item.timeFromStart;
            }

            if (!_.isNil(item.groupMeasure)) {
                _characteristic.groupMeasure = item.groupMeasure;
            }

            resource.characteristic.push(_characteristic);
        }
    }

    if (!_.isNil(props.handling)) {
        resource.handling = props.handling;
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

            if (!_.isNil(item.modifierExtension)) {
                _category.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _category.name = item.name;
            }

            if (!_.isNil(item.value)) {
                _category.value = item.value;
            }

            resource.category.push(_category);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"]
    };

    return resource;
}

/**
  * Create a FHIR ExampleScenario resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function exampleScenario(type, props) {
    const mappings = {
        "ExampleScenario": exampleScenario_ExampleScenario
    };

    return mappings[type](props)
}

function exampleScenario_ExampleScenario(props) {
    const resource = {
        resourceType: "ExampleScenario",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ExampleScenario</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.actor)) {
        let src = props.actor;
        if (!Array.isArray(src)) { src = [src]; }
        resource.actor = [];

        for (let item of src) {
            let _actor = {};

            if (!_.isNil(item.id)) {
                _actor.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _actor.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.actorId)) {
                _actor.actorId = item.actorId;
            }

            if (!_.isNil(item.type)) {
                _actor.type = item.type;
            }

            if (!_.isNil(item.name)) {
                _actor.name = item.name;
            }

            if (!_.isNil(item.description)) {
                _actor.description = item.description;
            }

            resource.actor.push(_actor);
        }
    }

    if (!_.isNil(props.instance)) {
        let src = props.instance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.instance = [];

        for (let item of src) {
            let _instance = {};

            if (!_.isNil(item.id)) {
                _instance.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _instance.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.resourceId)) {
                _instance.resourceId = item.resourceId;
            }

            if (!_.isNil(item.resourceType)) {
                _instance.resourceType = item.resourceType;
            }

            if (!_.isNil(item.name)) {
                _instance.name = item.name;
            }

            if (!_.isNil(item.description)) {
                _instance.description = item.description;
            }

            if (!_.isNil(item.version)) {
                _instance.version = item.version;
            }

            if (!_.isNil(item.containedInstance)) {
                _instance.containedInstance = item.containedInstance;
            }

            resource.instance.push(_instance);
        }
    }

    if (!_.isNil(props.process)) {
        let src = props.process;
        if (!Array.isArray(src)) { src = [src]; }
        resource.process = [];

        for (let item of src) {
            let _process = {};

            if (!_.isNil(item.id)) {
                _process.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _process.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.title)) {
                _process.title = item.title;
            }

            if (!_.isNil(item.description)) {
                _process.description = item.description;
            }

            if (!_.isNil(item.preConditions)) {
                _process.preConditions = item.preConditions;
            }

            if (!_.isNil(item.postConditions)) {
                _process.postConditions = item.postConditions;
            }

            if (!_.isNil(item.step)) {
                _process.step = item.step;
            }

            resource.process.push(_process);
        }
    }

    if (!_.isNil(props.workflow)) {
        resource.workflow = props.workflow;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ExampleScenario"]
    };

    return resource;
}

/**
  * Create a FHIR ExplanationOfBenefit resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function explanationOfBenefit(type, props) {
    const mappings = {
        "ExplanationOfBenefit": explanationOfBenefit_ExplanationOfBenefit
    };

    return mappings[type](props)
}

function explanationOfBenefit_ExplanationOfBenefit(props) {
    const resource = {
        resourceType: "ExplanationOfBenefit",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ExplanationOfBenefit</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subType)) {
        resource.subType = props.subType;
    }

    if (!_.isNil(props.use)) {
        resource.use = props.use;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.billablePeriod)) {
        resource.billablePeriod = props.billablePeriod;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = util.reference(props.enterer);
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = util.reference(props.insurer);
    }

    if (!_.isNil(props.provider)) {
        resource.provider = util.reference(props.provider);
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.fundsReserveRequested)) {
        resource.fundsReserveRequested = props.fundsReserveRequested;
    }

    if (!_.isNil(props.fundsReserve)) {
        resource.fundsReserve = props.fundsReserve;
    }

    if (!_.isNil(props.related)) {
        let src = props.related;
        if (!Array.isArray(src)) { src = [src]; }
        resource.related = [];

        for (let item of src) {
            let _related = {};

            if (!_.isNil(item.id)) {
                _related.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _related.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.claim)) {
                _related.claim = item.claim;
            }

            if (!_.isNil(item.relationship)) {
                _related.relationship = item.relationship;
            }

            if (!_.isNil(item.reference)) {
                _related.reference = item.reference;
            }

            resource.related.push(_related);
        }
    }

    if (!_.isNil(props.prescription)) {
        resource.prescription = util.reference(props.prescription);
    }

    if (!_.isNil(props.originalPrescription)) {
        resource.originalPrescription = util.reference(props.originalPrescription);
    }

    if (!_.isNil(props.payee)) {
        let src = props.payee;
        let _payee = {};

        if (!_.isNil(src.id)) {
            _payee.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _payee.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _payee.type = src.type;
        }

        if (!_.isNil(src.party)) {
            _payee.party = src.party;
        }

        resource.payee = _payee;
    }

    if (!_.isNil(props.referral)) {
        resource.referral = util.reference(props.referral);
    }

    if (!_.isNil(props.facility)) {
        resource.facility = util.reference(props.facility);
    }

    if (!_.isNil(props.claim)) {
        resource.claim = util.reference(props.claim);
    }

    if (!_.isNil(props.claimResponse)) {
        resource.claimResponse = util.reference(props.claimResponse);
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
    }

    if (!_.isNil(props.disposition)) {
        resource.disposition = props.disposition;
    }

    if (!_.isNil(props.preAuthRef)) {
        resource.preAuthRef = props.preAuthRef;
    }

    if (!_.isNil(props.preAuthRefPeriod)) {
        resource.preAuthRefPeriod = props.preAuthRefPeriod;
    }

    if (!_.isNil(props.careTeam)) {
        let src = props.careTeam;
        if (!Array.isArray(src)) { src = [src]; }
        resource.careTeam = [];

        for (let item of src) {
            let _careTeam = {};

            if (!_.isNil(item.id)) {
                _careTeam.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _careTeam.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _careTeam.sequence = item.sequence;
            }

            if (!_.isNil(item.provider)) {
                _careTeam.provider = item.provider;
            }

            if (!_.isNil(item.responsible)) {
                _careTeam.responsible = item.responsible;
            }

            if (!_.isNil(item.role)) {
                _careTeam.role = item.role;
            }

            if (!_.isNil(item.qualification)) {
                _careTeam.qualification = item.qualification;
            }

            resource.careTeam.push(_careTeam);
        }
    }

    if (!_.isNil(props.supportingInfo)) {
        let src = props.supportingInfo;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supportingInfo = [];

        for (let item of src) {
            let _supportingInfo = {};

            if (!_.isNil(item.id)) {
                _supportingInfo.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _supportingInfo.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _supportingInfo.sequence = item.sequence;
            }

            if (!_.isNil(item.category)) {
                _supportingInfo.category = item.category;
            }

            if (!_.isNil(item.code)) {
                _supportingInfo.code = item.code;
            }

            if (!_.isNil(item.timing)) {
                _supportingInfo.timing = item.timing;
            }

            if (!_.isNil(item.value)) {
                _supportingInfo.value = item.value;
            }

            if (!_.isNil(item.reason)) {
                _supportingInfo.reason = item.reason;
            }

            resource.supportingInfo.push(_supportingInfo);
        }
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

            if (!_.isNil(item.sequence)) {
                _diagnosis.sequence = item.sequence;
            }

            if (!_.isNil(item.diagnosis)) {
                _diagnosis.diagnosis = item.diagnosis;
            }

            if (!_.isNil(item.type)) {
                _diagnosis.type = item.type;
            }

            if (!_.isNil(item.onAdmission)) {
                _diagnosis.onAdmission = item.onAdmission;
            }

            if (!_.isNil(item.packageCode)) {
                _diagnosis.packageCode = item.packageCode;
            }

            resource.diagnosis.push(_diagnosis);
        }
    }

    if (!_.isNil(props.procedure)) {
        let src = props.procedure;
        if (!Array.isArray(src)) { src = [src]; }
        resource.procedure = [];

        for (let item of src) {
            let _procedure = {};

            if (!_.isNil(item.id)) {
                _procedure.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _procedure.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _procedure.sequence = item.sequence;
            }

            if (!_.isNil(item.type)) {
                _procedure.type = item.type;
            }

            if (!_.isNil(item.date)) {
                _procedure.date = item.date;
            }

            if (!_.isNil(item.procedure)) {
                _procedure.procedure = item.procedure;
            }

            if (!_.isNil(item.udi)) {
                _procedure.udi = item.udi;
            }

            resource.procedure.push(_procedure);
        }
    }

    if (!_.isNil(props.precedence)) {
        resource.precedence = props.precedence;
    }

    if (!_.isNil(props.insurance)) {
        let src = props.insurance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.insurance = [];

        for (let item of src) {
            let _insurance = {};

            if (!_.isNil(item.id)) {
                _insurance.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _insurance.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.focal)) {
                _insurance.focal = item.focal;
            }

            if (!_.isNil(item.coverage)) {
                _insurance.coverage = item.coverage;
            }

            if (!_.isNil(item.preAuthRef)) {
                _insurance.preAuthRef = item.preAuthRef;
            }

            resource.insurance.push(_insurance);
        }
    }

    if (!_.isNil(props.accident)) {
        let src = props.accident;
        let _accident = {};

        if (!_.isNil(src.id)) {
            _accident.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _accident.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.date)) {
            _accident.date = src.date;
        }

        if (!_.isNil(src.type)) {
            _accident.type = src.type;
        }

        if (!_.isNil(src.location)) {
            _accident.location = src.location;
        }

        resource.accident = _accident;
    }

    if (!_.isNil(props.item)) {
        let src = props.item;
        if (!Array.isArray(src)) { src = [src]; }
        resource.item = [];

        for (let item of src) {
            let _item = {};

            if (!_.isNil(item.id)) {
                _item.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _item.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _item.sequence = item.sequence;
            }

            if (!_.isNil(item.careTeamSequence)) {
                _item.careTeamSequence = item.careTeamSequence;
            }

            if (!_.isNil(item.diagnosisSequence)) {
                _item.diagnosisSequence = item.diagnosisSequence;
            }

            if (!_.isNil(item.procedureSequence)) {
                _item.procedureSequence = item.procedureSequence;
            }

            if (!_.isNil(item.informationSequence)) {
                _item.informationSequence = item.informationSequence;
            }

            if (!_.isNil(item.revenue)) {
                _item.revenue = item.revenue;
            }

            if (!_.isNil(item.category)) {
                _item.category = item.category;
            }

            if (!_.isNil(item.productOrService)) {
                _item.productOrService = item.productOrService;
            }

            if (!_.isNil(item.modifier)) {
                _item.modifier = item.modifier;
            }

            if (!_.isNil(item.programCode)) {
                _item.programCode = item.programCode;
            }

            if (!_.isNil(item.serviced)) {
                _item.serviced = item.serviced;
            }

            if (!_.isNil(item.location)) {
                _item.location = item.location;
            }

            if (!_.isNil(item.quantity)) {
                _item.quantity = item.quantity;
            }

            if (!_.isNil(item.unitPrice)) {
                _item.unitPrice = item.unitPrice;
            }

            if (!_.isNil(item.factor)) {
                _item.factor = item.factor;
            }

            if (!_.isNil(item.net)) {
                _item.net = item.net;
            }

            if (!_.isNil(item.udi)) {
                _item.udi = item.udi;
            }

            if (!_.isNil(item.bodySite)) {
                _item.bodySite = item.bodySite;
            }

            if (!_.isNil(item.subSite)) {
                _item.subSite = item.subSite;
            }

            if (!_.isNil(item.encounter)) {
                _item.encounter = item.encounter;
            }

            if (!_.isNil(item.noteNumber)) {
                _item.noteNumber = item.noteNumber;
            }

            if (!_.isNil(item.adjudication)) {
                _item.adjudication = item.adjudication;
            }

            if (!_.isNil(item.detail)) {
                _item.detail = item.detail;
            }

            resource.item.push(_item);
        }
    }

    if (!_.isNil(props.addItem)) {
        let src = props.addItem;
        if (!Array.isArray(src)) { src = [src]; }
        resource.addItem = [];

        for (let item of src) {
            let _addItem = {};

            if (!_.isNil(item.id)) {
                _addItem.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _addItem.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.itemSequence)) {
                _addItem.itemSequence = item.itemSequence;
            }

            if (!_.isNil(item.detailSequence)) {
                _addItem.detailSequence = item.detailSequence;
            }

            if (!_.isNil(item.subDetailSequence)) {
                _addItem.subDetailSequence = item.subDetailSequence;
            }

            if (!_.isNil(item.provider)) {
                _addItem.provider = item.provider;
            }

            if (!_.isNil(item.productOrService)) {
                _addItem.productOrService = item.productOrService;
            }

            if (!_.isNil(item.modifier)) {
                _addItem.modifier = item.modifier;
            }

            if (!_.isNil(item.programCode)) {
                _addItem.programCode = item.programCode;
            }

            if (!_.isNil(item.serviced)) {
                _addItem.serviced = item.serviced;
            }

            if (!_.isNil(item.location)) {
                _addItem.location = item.location;
            }

            if (!_.isNil(item.quantity)) {
                _addItem.quantity = item.quantity;
            }

            if (!_.isNil(item.unitPrice)) {
                _addItem.unitPrice = item.unitPrice;
            }

            if (!_.isNil(item.factor)) {
                _addItem.factor = item.factor;
            }

            if (!_.isNil(item.net)) {
                _addItem.net = item.net;
            }

            if (!_.isNil(item.bodySite)) {
                _addItem.bodySite = item.bodySite;
            }

            if (!_.isNil(item.subSite)) {
                _addItem.subSite = item.subSite;
            }

            if (!_.isNil(item.noteNumber)) {
                _addItem.noteNumber = item.noteNumber;
            }

            if (!_.isNil(item.detail)) {
                _addItem.detail = item.detail;
            }

            resource.addItem.push(_addItem);
        }
    }

    if (!_.isNil(props.adjudication)) {
        resource.adjudication = props.adjudication;
    }

    if (!_.isNil(props.total)) {
        let src = props.total;
        if (!Array.isArray(src)) { src = [src]; }
        resource.total = [];

        for (let item of src) {
            let _total = {};

            if (!_.isNil(item.id)) {
                _total.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _total.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.category)) {
                _total.category = item.category;
            }

            if (!_.isNil(item.amount)) {
                _total.amount = item.amount;
            }

            resource.total.push(_total);
        }
    }

    if (!_.isNil(props.payment)) {
        let src = props.payment;
        let _payment = {};

        if (!_.isNil(src.id)) {
            _payment.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _payment.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _payment.type = src.type;
        }

        if (!_.isNil(src.adjustment)) {
            _payment.adjustment = src.adjustment;
        }

        if (!_.isNil(src.adjustmentReason)) {
            _payment.adjustmentReason = src.adjustmentReason;
        }

        if (!_.isNil(src.date)) {
            _payment.date = src.date;
        }

        if (!_.isNil(src.amount)) {
            _payment.amount = src.amount;
        }

        if (!_.isNil(src.identifier)) {
            _payment.identifier = src.identifier;
        }

        resource.payment = _payment;
    }

    if (!_.isNil(props.formCode)) {
        resource.formCode = props.formCode;
    }

    if (!_.isNil(props.form)) {
        resource.form = props.form;
    }

    if (!_.isNil(props.processNote)) {
        let src = props.processNote;
        if (!Array.isArray(src)) { src = [src]; }
        resource.processNote = [];

        for (let item of src) {
            let _processNote = {};

            if (!_.isNil(item.id)) {
                _processNote.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _processNote.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.number)) {
                _processNote.number = item.number;
            }

            if (!_.isNil(item.type)) {
                _processNote.type = item.type;
            }

            if (!_.isNil(item.text)) {
                _processNote.text = item.text;
            }

            if (!_.isNil(item.language)) {
                _processNote.language = item.language;
            }

            resource.processNote.push(_processNote);
        }
    }

    if (!_.isNil(props.benefitPeriod)) {
        resource.benefitPeriod = props.benefitPeriod;
    }

    if (!_.isNil(props.benefitBalance)) {
        let src = props.benefitBalance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.benefitBalance = [];

        for (let item of src) {
            let _benefitBalance = {};

            if (!_.isNil(item.id)) {
                _benefitBalance.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _benefitBalance.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.category)) {
                _benefitBalance.category = item.category;
            }

            if (!_.isNil(item.excluded)) {
                _benefitBalance.excluded = item.excluded;
            }

            if (!_.isNil(item.name)) {
                _benefitBalance.name = item.name;
            }

            if (!_.isNil(item.description)) {
                _benefitBalance.description = item.description;
            }

            if (!_.isNil(item.network)) {
                _benefitBalance.network = item.network;
            }

            if (!_.isNil(item.unit)) {
                _benefitBalance.unit = item.unit;
            }

            if (!_.isNil(item.term)) {
                _benefitBalance.term = item.term;
            }

            if (!_.isNil(item.financial)) {
                _benefitBalance.financial = item.financial;
            }

            resource.benefitBalance.push(_benefitBalance);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ExplanationOfBenefit"]
    };

    return resource;
}

/**
  * Create a FHIR FamilyMemberHistory resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function familyMemberHistory(type, props) {
    const mappings = {
        "FamilyMemberHistory": familyMemberHistory_FamilyMemberHistory
    };

    return mappings[type](props)
}

function familyMemberHistory_FamilyMemberHistory(props) {
    const resource = {
        resourceType: "FamilyMemberHistory",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>FamilyMemberHistory</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.relationship)) {
        resource.relationship = props.relationship;
    }

    if (!_.isNil(props.sex)) {
        resource.sex = props.sex;
    }

    if (!_.isNil(props.born)) {
        util.composite(resource, "born", props.born);
    }

    if (!_.isNil(props.age)) {
        util.composite(resource, "age", props.age);
    }

    if (!_.isNil(props.estimatedAge)) {
        resource.estimatedAge = props.estimatedAge;
    }

    if (!_.isNil(props.deceased)) {
        util.composite(resource, "deceased", props.deceased);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.condition)) {
        let src = props.condition;
        if (!Array.isArray(src)) { src = [src]; }
        resource.condition = [];

        for (let item of src) {
            let _condition = {};

            if (!_.isNil(item.id)) {
                _condition.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _condition.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _condition.code = item.code;
            }

            if (!_.isNil(item.outcome)) {
                _condition.outcome = item.outcome;
            }

            if (!_.isNil(item.contributedToDeath)) {
                _condition.contributedToDeath = item.contributedToDeath;
            }

            if (!_.isNil(item.onset)) {
                _condition.onset = item.onset;
            }

            if (!_.isNil(item.note)) {
                _condition.note = item.note;
            }

            resource.condition.push(_condition);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory"]
    };

    return resource;
}

/**
  * Create a FHIR Flag resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function flag(type, props) {
    const mappings = {
        "Flag": flag_Flag
    };

    return mappings[type](props)
}

function flag_Flag(props) {
    const resource = {
        resourceType: "Flag",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Flag</b></p></div>"
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

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Flag"]
    };

    return resource;
}

/**
  * Create a FHIR Goal resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function goal(type, props) {
    const mappings = {
        "Goal": goal_Goal
    };

    return mappings[type](props)
}

function goal_Goal(props) {
    const resource = {
        resourceType: "Goal",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Goal</b></p></div>"
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

    if (!_.isNil(props.lifecycleStatus)) {
        resource.lifecycleStatus = props.lifecycleStatus;
    }

    if (!_.isNil(props.achievementStatus)) {
        resource.achievementStatus = props.achievementStatus;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.start)) {
        util.composite(resource, "start", props.start);
    }

    if (!_.isNil(props.target)) {
        let src = props.target;
        if (!Array.isArray(src)) { src = [src]; }
        resource.target = [];

        for (let item of src) {
            let _target = {};

            if (!_.isNil(item.id)) {
                _target.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _target.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.measure)) {
                _target.measure = item.measure;
            }

            if (!_.isNil(item.detail)) {
                _target.detail = item.detail;
            }

            if (!_.isNil(item.due)) {
                _target.due = item.due;
            }

            resource.target.push(_target);
        }
    }

    if (!_.isNil(props.statusDate)) {
        resource.statusDate = props.statusDate;
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.expressedBy)) {
        resource.expressedBy = util.reference(props.expressedBy);
    }

    if (!_.isNil(props.addresses)) {
        if (!Array.isArray(props.addresses)) { props.addresses = [props.addresses]; }
        resource.addresses = util.reference(props.addresses);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.outcomeCode)) {
        resource.outcomeCode = props.outcomeCode;
    }

    if (!_.isNil(props.outcomeReference)) {
        if (!Array.isArray(props.outcomeReference)) { props.outcomeReference = [props.outcomeReference]; }
        resource.outcomeReference = util.reference(props.outcomeReference);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Goal"]
    };

    return resource;
}

/**
  * Create a FHIR GraphDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function graphDefinition(type, props) {
    const mappings = {
        "GraphDefinition": graphDefinition_GraphDefinition
    };

    return mappings[type](props)
}

function graphDefinition_GraphDefinition(props) {
    const resource = {
        resourceType: "GraphDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>GraphDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.start)) {
        resource.start = props.start;
    }

    if (!_.isNil(props.profile)) {
        resource.profile = props.profile;
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

            if (!_.isNil(item.path)) {
                _link.path = item.path;
            }

            if (!_.isNil(item.sliceName)) {
                _link.sliceName = item.sliceName;
            }

            if (!_.isNil(item.min)) {
                _link.min = item.min;
            }

            if (!_.isNil(item.max)) {
                _link.max = item.max;
            }

            if (!_.isNil(item.description)) {
                _link.description = item.description;
            }

            if (!_.isNil(item.target)) {
                _link.target = item.target;
            }

            resource.link.push(_link);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/GraphDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR Group resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function group(type, props) {
    const mappings = {
        "Group": group_Group
    };

    return mappings[type](props)
}

function group_Group(props) {
    const resource = {
        resourceType: "Group",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Group</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.actual)) {
        resource.actual = props.actual;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.managingEntity)) {
        resource.managingEntity = util.reference(props.managingEntity);
    }

    if (!_.isNil(props.characteristic)) {
        let src = props.characteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.characteristic = [];

        for (let item of src) {
            let _characteristic = {};

            if (!_.isNil(item.id)) {
                _characteristic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _characteristic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _characteristic.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _characteristic.value = item.value;
            }

            if (!_.isNil(item.exclude)) {
                _characteristic.exclude = item.exclude;
            }

            if (!_.isNil(item.period)) {
                _characteristic.period = item.period;
            }

            resource.characteristic.push(_characteristic);
        }
    }

    if (!_.isNil(props.member)) {
        let src = props.member;
        if (!Array.isArray(src)) { src = [src]; }
        resource.member = [];

        for (let item of src) {
            let _member = {};

            if (!_.isNil(item.id)) {
                _member.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _member.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.entity)) {
                _member.entity = item.entity;
            }

            if (!_.isNil(item.period)) {
                _member.period = item.period;
            }

            if (!_.isNil(item.inactive)) {
                _member.inactive = item.inactive;
            }

            resource.member.push(_member);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Group"]
    };

    return resource;
}

/**
  * Create a FHIR GuidanceResponse resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function guidanceResponse(type, props) {
    const mappings = {
        "GuidanceResponse": guidanceResponse_GuidanceResponse
    };

    return mappings[type](props)
}

function guidanceResponse_GuidanceResponse(props) {
    const resource = {
        resourceType: "GuidanceResponse",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>GuidanceResponse</b></p></div>"
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

    if (!_.isNil(props.requestIdentifier)) {
        resource.requestIdentifier = util.identifier(props.requestIdentifier, undefined);
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.module)) {
        util.composite(resource, "module", props.module);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.occurrenceDateTime)) {
        resource.occurrenceDateTime = props.occurrenceDateTime;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.evaluationMessage)) {
        if (!Array.isArray(props.evaluationMessage)) { props.evaluationMessage = [props.evaluationMessage]; }
        resource.evaluationMessage = util.reference(props.evaluationMessage);
    }

    if (!_.isNil(props.outputParameters)) {
        resource.outputParameters = util.reference(props.outputParameters);
    }

    if (!_.isNil(props.result)) {
        resource.result = util.reference(props.result);
    }

    if (!_.isNil(props.dataRequirement)) {
        resource.dataRequirement = props.dataRequirement;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/GuidanceResponse"]
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
        "HealthcareService": healthcareService_HealthcareService
    };

    return mappings[type](props)
}

function healthcareService_HealthcareService(props) {
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
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
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
        profile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"]
    };

    return resource;
}

/**
  * Create a FHIR ImagingStudy resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function imagingStudy(type, props) {
    const mappings = {
        "ImagingStudy": imagingStudy_ImagingStudy
    };

    return mappings[type](props)
}

function imagingStudy_ImagingStudy(props) {
    const resource = {
        resourceType: "ImagingStudy",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ImagingStudy</b></p></div>"
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

    if (!_.isNil(props.modality)) {
        resource.modality = props.modality;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.started)) {
        resource.started = props.started;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.referrer)) {
        resource.referrer = util.reference(props.referrer);
    }

    if (!_.isNil(props.interpreter)) {
        if (!Array.isArray(props.interpreter)) { props.interpreter = [props.interpreter]; }
        resource.interpreter = util.reference(props.interpreter);
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = util.reference(props.endpoint);
    }

    if (!_.isNil(props.numberOfSeries)) {
        resource.numberOfSeries = props.numberOfSeries;
    }

    if (!_.isNil(props.numberOfInstances)) {
        resource.numberOfInstances = props.numberOfInstances;
    }

    if (!_.isNil(props.procedureReference)) {
        resource.procedureReference = util.reference(props.procedureReference);
    }

    if (!_.isNil(props.procedureCode)) {
        resource.procedureCode = props.procedureCode;
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.series)) {
        let src = props.series;
        if (!Array.isArray(src)) { src = [src]; }
        resource.series = [];

        for (let item of src) {
            let _series = {};

            if (!_.isNil(item.id)) {
                _series.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _series.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.uid)) {
                _series.uid = item.uid;
            }

            if (!_.isNil(item.number)) {
                _series.number = item.number;
            }

            if (!_.isNil(item.modality)) {
                _series.modality = item.modality;
            }

            if (!_.isNil(item.description)) {
                _series.description = item.description;
            }

            if (!_.isNil(item.numberOfInstances)) {
                _series.numberOfInstances = item.numberOfInstances;
            }

            if (!_.isNil(item.endpoint)) {
                _series.endpoint = item.endpoint;
            }

            if (!_.isNil(item.bodySite)) {
                _series.bodySite = item.bodySite;
            }

            if (!_.isNil(item.laterality)) {
                _series.laterality = item.laterality;
            }

            if (!_.isNil(item.specimen)) {
                _series.specimen = item.specimen;
            }

            if (!_.isNil(item.started)) {
                _series.started = item.started;
            }

            if (!_.isNil(item.performer)) {
                _series.performer = item.performer;
            }

            if (!_.isNil(item.instance)) {
                _series.instance = item.instance;
            }

            resource.series.push(_series);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ImagingStudy"]
    };

    return resource;
}

/**
  * Create a FHIR Immunization resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function immunization(type, props) {
    const mappings = {
        "Immunization": immunization_Immunization
    };

    return mappings[type](props)
}

function immunization_Immunization(props) {
    const resource = {
        resourceType: "Immunization",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Immunization</b></p></div>"
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

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.vaccineCode)) {
        resource.vaccineCode = props.vaccineCode;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        util.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.recorded)) {
        resource.recorded = props.recorded;
    }

    if (!_.isNil(props.primarySource)) {
        resource.primarySource = props.primarySource;
    }

    if (!_.isNil(props.reportOrigin)) {
        resource.reportOrigin = props.reportOrigin;
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = util.reference(props.manufacturer);
    }

    if (!_.isNil(props.lotNumber)) {
        resource.lotNumber = props.lotNumber;
    }

    if (!_.isNil(props.expirationDate)) {
        resource.expirationDate = props.expirationDate;
    }

    if (!_.isNil(props.site)) {
        resource.site = props.site;
    }

    if (!_.isNil(props.route)) {
        resource.route = props.route;
    }

    if (!_.isNil(props.doseQuantity)) {
        resource.doseQuantity = props.doseQuantity;
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

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.isSubpotent)) {
        resource.isSubpotent = props.isSubpotent;
    }

    if (!_.isNil(props.subpotentReason)) {
        resource.subpotentReason = props.subpotentReason;
    }

    if (!_.isNil(props.education)) {
        let src = props.education;
        if (!Array.isArray(src)) { src = [src]; }
        resource.education = [];

        for (let item of src) {
            let _education = {};

            if (!_.isNil(item.id)) {
                _education.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _education.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.documentType)) {
                _education.documentType = item.documentType;
            }

            if (!_.isNil(item.reference)) {
                _education.reference = item.reference;
            }

            if (!_.isNil(item.publicationDate)) {
                _education.publicationDate = item.publicationDate;
            }

            if (!_.isNil(item.presentationDate)) {
                _education.presentationDate = item.presentationDate;
            }

            resource.education.push(_education);
        }
    }

    if (!_.isNil(props.programEligibility)) {
        resource.programEligibility = props.programEligibility;
    }

    if (!_.isNil(props.fundingSource)) {
        resource.fundingSource = props.fundingSource;
    }

    if (!_.isNil(props.reaction)) {
        let src = props.reaction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.reaction = [];

        for (let item of src) {
            let _reaction = {};

            if (!_.isNil(item.id)) {
                _reaction.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _reaction.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.date)) {
                _reaction.date = item.date;
            }

            if (!_.isNil(item.detail)) {
                _reaction.detail = item.detail;
            }

            if (!_.isNil(item.reported)) {
                _reaction.reported = item.reported;
            }

            resource.reaction.push(_reaction);
        }
    }

    if (!_.isNil(props.protocolApplied)) {
        let src = props.protocolApplied;
        if (!Array.isArray(src)) { src = [src]; }
        resource.protocolApplied = [];

        for (let item of src) {
            let _protocolApplied = {};

            if (!_.isNil(item.id)) {
                _protocolApplied.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _protocolApplied.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.series)) {
                _protocolApplied.series = item.series;
            }

            if (!_.isNil(item.authority)) {
                _protocolApplied.authority = item.authority;
            }

            if (!_.isNil(item.targetDisease)) {
                _protocolApplied.targetDisease = item.targetDisease;
            }

            if (!_.isNil(item.doseNumber)) {
                _protocolApplied.doseNumber = item.doseNumber;
            }

            if (!_.isNil(item.seriesDoses)) {
                _protocolApplied.seriesDoses = item.seriesDoses;
            }

            resource.protocolApplied.push(_protocolApplied);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Immunization"]
    };

    return resource;
}

/**
  * Create a FHIR ImmunizationEvaluation resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function immunizationEvaluation(type, props) {
    const mappings = {
        "ImmunizationEvaluation": immunizationEvaluation_ImmunizationEvaluation
    };

    return mappings[type](props)
}

function immunizationEvaluation_ImmunizationEvaluation(props) {
    const resource = {
        resourceType: "ImmunizationEvaluation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ImmunizationEvaluation</b></p></div>"
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

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.authority)) {
        resource.authority = util.reference(props.authority);
    }

    if (!_.isNil(props.targetDisease)) {
        resource.targetDisease = props.targetDisease;
    }

    if (!_.isNil(props.immunizationEvent)) {
        resource.immunizationEvent = util.reference(props.immunizationEvent);
    }

    if (!_.isNil(props.doseStatus)) {
        resource.doseStatus = props.doseStatus;
    }

    if (!_.isNil(props.doseStatusReason)) {
        resource.doseStatusReason = props.doseStatusReason;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.series)) {
        resource.series = props.series;
    }

    if (!_.isNil(props.doseNumber)) {
        util.composite(resource, "doseNumber", props.doseNumber);
    }

    if (!_.isNil(props.seriesDoses)) {
        util.composite(resource, "seriesDoses", props.seriesDoses);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ImmunizationEvaluation"]
    };

    return resource;
}

/**
  * Create a FHIR ImmunizationRecommendation resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function immunizationRecommendation(type, props) {
    const mappings = {
        "ImmunizationRecommendation": immunizationRecommendation_ImmunizationRecommendation
    };

    return mappings[type](props)
}

function immunizationRecommendation_ImmunizationRecommendation(props) {
    const resource = {
        resourceType: "ImmunizationRecommendation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ImmunizationRecommendation</b></p></div>"
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

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.authority)) {
        resource.authority = util.reference(props.authority);
    }

    if (!_.isNil(props.recommendation)) {
        let src = props.recommendation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.recommendation = [];

        for (let item of src) {
            let _recommendation = {};

            if (!_.isNil(item.id)) {
                _recommendation.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _recommendation.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.vaccineCode)) {
                _recommendation.vaccineCode = item.vaccineCode;
            }

            if (!_.isNil(item.targetDisease)) {
                _recommendation.targetDisease = item.targetDisease;
            }

            if (!_.isNil(item.contraindicatedVaccineCode)) {
                _recommendation.contraindicatedVaccineCode = item.contraindicatedVaccineCode;
            }

            if (!_.isNil(item.forecastStatus)) {
                _recommendation.forecastStatus = item.forecastStatus;
            }

            if (!_.isNil(item.forecastReason)) {
                _recommendation.forecastReason = item.forecastReason;
            }

            if (!_.isNil(item.dateCriterion)) {
                _recommendation.dateCriterion = item.dateCriterion;
            }

            if (!_.isNil(item.description)) {
                _recommendation.description = item.description;
            }

            if (!_.isNil(item.series)) {
                _recommendation.series = item.series;
            }

            if (!_.isNil(item.doseNumber)) {
                _recommendation.doseNumber = item.doseNumber;
            }

            if (!_.isNil(item.seriesDoses)) {
                _recommendation.seriesDoses = item.seriesDoses;
            }

            if (!_.isNil(item.supportingImmunization)) {
                _recommendation.supportingImmunization = item.supportingImmunization;
            }

            if (!_.isNil(item.supportingPatientInformation)) {
                _recommendation.supportingPatientInformation = item.supportingPatientInformation;
            }

            resource.recommendation.push(_recommendation);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation"]
    };

    return resource;
}

/**
  * Create a FHIR ImplementationGuide resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function implementationGuide(type, props) {
    const mappings = {
        "ImplementationGuide": implementationGuide_ImplementationGuide
    };

    return mappings[type](props)
}

function implementationGuide_ImplementationGuide(props) {
    const resource = {
        resourceType: "ImplementationGuide",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ImplementationGuide</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.packageId)) {
        resource.packageId = props.packageId;
    }

    if (!_.isNil(props.license)) {
        resource.license = props.license;
    }

    if (!_.isNil(props.fhirVersion)) {
        resource.fhirVersion = props.fhirVersion;
    }

    if (!_.isNil(props.dependsOn)) {
        let src = props.dependsOn;
        if (!Array.isArray(src)) { src = [src]; }
        resource.dependsOn = [];

        for (let item of src) {
            let _dependsOn = {};

            if (!_.isNil(item.id)) {
                _dependsOn.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _dependsOn.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.uri)) {
                _dependsOn.uri = item.uri;
            }

            if (!_.isNil(item.packageId)) {
                _dependsOn.packageId = item.packageId;
            }

            if (!_.isNil(item.version)) {
                _dependsOn.version = item.version;
            }

            resource.dependsOn.push(_dependsOn);
        }
    }

    if (!_.isNil(props.global)) {
        let src = props.global;
        if (!Array.isArray(src)) { src = [src]; }
        resource.global = [];

        for (let item of src) {
            let _global = {};

            if (!_.isNil(item.id)) {
                _global.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _global.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _global.type = item.type;
            }

            if (!_.isNil(item.profile)) {
                _global.profile = item.profile;
            }

            resource.global.push(_global);
        }
    }

    if (!_.isNil(props.definition)) {
        let src = props.definition;
        let _definition = {};

        if (!_.isNil(src.id)) {
            _definition.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _definition.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.grouping)) {
            _definition.grouping = src.grouping;
        }

        if (!_.isNil(src.resource)) {
            _definition.resource = src.resource;
        }

        if (!_.isNil(src.page)) {
            _definition.page = src.page;
        }

        if (!_.isNil(src.parameter)) {
            _definition.parameter = src.parameter;
        }

        if (!_.isNil(src.template)) {
            _definition.template = src.template;
        }

        resource.definition = _definition;
    }

    if (!_.isNil(props.manifest)) {
        let src = props.manifest;
        let _manifest = {};

        if (!_.isNil(src.id)) {
            _manifest.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _manifest.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.rendering)) {
            _manifest.rendering = src.rendering;
        }

        if (!_.isNil(src.resource)) {
            _manifest.resource = src.resource;
        }

        if (!_.isNil(src.page)) {
            _manifest.page = src.page;
        }

        if (!_.isNil(src.image)) {
            _manifest.image = src.image;
        }

        if (!_.isNil(src.other)) {
            _manifest.other = src.other;
        }

        resource.manifest = _manifest;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ImplementationGuide"]
    };

    return resource;
}

/**
  * Create a FHIR Ingredient resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function ingredient(type, props) {
    const mappings = {
        "Ingredient": ingredient_Ingredient
    };

    return mappings[type](props)
}

function ingredient_Ingredient(props) {
    const resource = {
        resourceType: "Ingredient",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Ingredient</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.for)) {
        if (!Array.isArray(props.for)) { props.for = [props.for]; }
        resource.for = util.reference(props.for);
    }

    if (!_.isNil(props.role)) {
        resource.role = props.role;
    }

    if (!_.isNil(props.function)) {
        resource.function = props.function;
    }

    if (!_.isNil(props.allergenicIndicator)) {
        resource.allergenicIndicator = props.allergenicIndicator;
    }

    if (!_.isNil(props.manufacturer)) {
        let src = props.manufacturer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.manufacturer = [];

        for (let item of src) {
            let _manufacturer = {};

            if (!_.isNil(item.id)) {
                _manufacturer.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _manufacturer.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.role)) {
                _manufacturer.role = item.role;
            }

            if (!_.isNil(item.manufacturer)) {
                _manufacturer.manufacturer = item.manufacturer;
            }

            resource.manufacturer.push(_manufacturer);
        }
    }

    if (!_.isNil(props.substance)) {
        let src = props.substance;
        let _substance = {};

        if (!_.isNil(src.id)) {
            _substance.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _substance.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.code)) {
            _substance.code = src.code;
        }

        if (!_.isNil(src.strength)) {
            _substance.strength = src.strength;
        }

        resource.substance = _substance;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Ingredient"]
    };

    return resource;
}

/**
  * Create a FHIR InsurancePlan resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function insurancePlan(type, props) {
    const mappings = {
        "InsurancePlan": insurancePlan_InsurancePlan
    };

    return mappings[type](props)
}

function insurancePlan_InsurancePlan(props) {
    const resource = {
        resourceType: "InsurancePlan",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>InsurancePlan</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.alias)) {
        resource.alias = props.alias;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.ownedBy)) {
        resource.ownedBy = util.reference(props.ownedBy);
    }

    if (!_.isNil(props.administeredBy)) {
        resource.administeredBy = util.reference(props.administeredBy);
    }

    if (!_.isNil(props.coverageArea)) {
        if (!Array.isArray(props.coverageArea)) { props.coverageArea = [props.coverageArea]; }
        resource.coverageArea = util.reference(props.coverageArea);
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

    if (!_.isNil(props.network)) {
        if (!Array.isArray(props.network)) { props.network = [props.network]; }
        resource.network = util.reference(props.network);
    }

    if (!_.isNil(props.coverage)) {
        let src = props.coverage;
        if (!Array.isArray(src)) { src = [src]; }
        resource.coverage = [];

        for (let item of src) {
            let _coverage = {};

            if (!_.isNil(item.id)) {
                _coverage.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _coverage.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _coverage.type = item.type;
            }

            if (!_.isNil(item.network)) {
                _coverage.network = item.network;
            }

            if (!_.isNil(item.benefit)) {
                _coverage.benefit = item.benefit;
            }

            resource.coverage.push(_coverage);
        }
    }

    if (!_.isNil(props.plan)) {
        let src = props.plan;
        if (!Array.isArray(src)) { src = [src]; }
        resource.plan = [];

        for (let item of src) {
            let _plan = {};

            if (!_.isNil(item.id)) {
                _plan.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _plan.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _plan.identifier = item.identifier;
            }

            if (!_.isNil(item.type)) {
                _plan.type = item.type;
            }

            if (!_.isNil(item.coverageArea)) {
                _plan.coverageArea = item.coverageArea;
            }

            if (!_.isNil(item.network)) {
                _plan.network = item.network;
            }

            if (!_.isNil(item.generalCost)) {
                _plan.generalCost = item.generalCost;
            }

            if (!_.isNil(item.specificCost)) {
                _plan.specificCost = item.specificCost;
            }

            resource.plan.push(_plan);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/InsurancePlan"]
    };

    return resource;
}

/**
  * Create a FHIR Invoice resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function invoice(type, props) {
    const mappings = {
        "Invoice": invoice_Invoice
    };

    return mappings[type](props)
}

function invoice_Invoice(props) {
    const resource = {
        resourceType: "Invoice",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Invoice</b></p></div>"
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

    if (!_.isNil(props.cancelledReason)) {
        resource.cancelledReason = props.cancelledReason;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.recipient)) {
        resource.recipient = util.reference(props.recipient);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
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

            if (!_.isNil(item.role)) {
                _participant.role = item.role;
            }

            if (!_.isNil(item.actor)) {
                _participant.actor = item.actor;
            }

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.issuer)) {
        resource.issuer = util.reference(props.issuer);
    }

    if (!_.isNil(props.account)) {
        resource.account = util.reference(props.account);
    }

    if (!_.isNil(props.lineItem)) {
        let src = props.lineItem;
        if (!Array.isArray(src)) { src = [src]; }
        resource.lineItem = [];

        for (let item of src) {
            let _lineItem = {};

            if (!_.isNil(item.id)) {
                _lineItem.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _lineItem.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.sequence)) {
                _lineItem.sequence = item.sequence;
            }

            if (!_.isNil(item.chargeItem)) {
                _lineItem.chargeItem = item.chargeItem;
            }

            if (!_.isNil(item.priceComponent)) {
                _lineItem.priceComponent = item.priceComponent;
            }

            resource.lineItem.push(_lineItem);
        }
    }

    if (!_.isNil(props.totalPriceComponent)) {
        resource.totalPriceComponent = props.totalPriceComponent;
    }

    if (!_.isNil(props.totalNet)) {
        resource.totalNet = props.totalNet;
    }

    if (!_.isNil(props.totalGross)) {
        resource.totalGross = props.totalGross;
    }

    if (!_.isNil(props.paymentTerms)) {
        resource.paymentTerms = props.paymentTerms;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Invoice"]
    };

    return resource;
}

/**
  * Create a FHIR Library resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function library(type, props) {
    const mappings = {
        "Library": library_Library
    };

    return mappings[type](props)
}

function library_Library(props) {
    const resource = {
        resourceType: "Library",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Library</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subject)) {
        util.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.parameter)) {
        resource.parameter = props.parameter;
    }

    if (!_.isNil(props.dataRequirement)) {
        resource.dataRequirement = props.dataRequirement;
    }

    if (!_.isNil(props.content)) {
        resource.content = props.content;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Library"]
    };

    return resource;
}

/**
  * Create a FHIR Linkage resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function linkage(type, props) {
    const mappings = {
        "Linkage": linkage_Linkage
    };

    return mappings[type](props)
}

function linkage_Linkage(props) {
    const resource = {
        resourceType: "Linkage",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Linkage</b></p></div>"
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

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.item)) {
        let src = props.item;
        if (!Array.isArray(src)) { src = [src]; }
        resource.item = [];

        for (let item of src) {
            let _item = {};

            if (!_.isNil(item.id)) {
                _item.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _item.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _item.type = item.type;
            }

            if (!_.isNil(item.resource)) {
                _item.resource = item.resource;
            }

            resource.item.push(_item);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Linkage"]
    };

    return resource;
}

/**
  * Create a FHIR List resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function list(type, props) {
    const mappings = {
        "List": list_List
    };

    return mappings[type](props)
}

function list_List(props) {
    const resource = {
        resourceType: "List",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>List</b></p></div>"
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

    if (!_.isNil(props.mode)) {
        resource.mode = props.mode;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.source)) {
        resource.source = util.reference(props.source);
    }

    if (!_.isNil(props.orderedBy)) {
        resource.orderedBy = props.orderedBy;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.entry)) {
        let src = props.entry;
        if (!Array.isArray(src)) { src = [src]; }
        resource.entry = [];

        for (let item of src) {
            let _entry = {};

            if (!_.isNil(item.id)) {
                _entry.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _entry.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.flag)) {
                _entry.flag = item.flag;
            }

            if (!_.isNil(item.deleted)) {
                _entry.deleted = item.deleted;
            }

            if (!_.isNil(item.date)) {
                _entry.date = item.date;
            }

            if (!_.isNil(item.item)) {
                _entry.item = item.item;
            }

            resource.entry.push(_entry);
        }
    }

    if (!_.isNil(props.emptyReason)) {
        resource.emptyReason = props.emptyReason;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/List"]
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
        "Location": location_Location
    };

    return mappings[type](props)
}

function location_Location(props) {
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
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
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
        resource.partOf = util.reference(props.partOf);
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
        profile: ["http://hl7.org/fhir/StructureDefinition/Location"]
    };

    return resource;
}

/**
  * Create a FHIR ManufacturedItemDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function manufacturedItemDefinition(type, props) {
    const mappings = {
        "ManufacturedItemDefinition": manufacturedItemDefinition_ManufacturedItemDefinition
    };

    return mappings[type](props)
}

function manufacturedItemDefinition_ManufacturedItemDefinition(props) {
    const resource = {
        resourceType: "ManufacturedItemDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ManufacturedItemDefinition</b></p></div>"
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

    if (!_.isNil(props.manufacturedDoseForm)) {
        resource.manufacturedDoseForm = props.manufacturedDoseForm;
    }

    if (!_.isNil(props.unitOfPresentation)) {
        resource.unitOfPresentation = props.unitOfPresentation;
    }

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = util.reference(props.manufacturer);
    }

    if (!_.isNil(props.ingredient)) {
        resource.ingredient = props.ingredient;
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {};

            if (!_.isNil(item.id)) {
                _property.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _property.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _property.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _property.value = item.value;
            }

            resource.property.push(_property);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ManufacturedItemDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR Measure resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function measure(type, props) {
    const mappings = {
        "Measure": measure_Measure
    };

    return mappings[type](props)
}

function measure_Measure(props) {
    const resource = {
        resourceType: "Measure",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Measure</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.subject)) {
        util.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.library)) {
        resource.library = props.library;
    }

    if (!_.isNil(props.disclaimer)) {
        resource.disclaimer = props.disclaimer;
    }

    if (!_.isNil(props.scoring)) {
        resource.scoring = props.scoring;
    }

    if (!_.isNil(props.compositeScoring)) {
        resource.compositeScoring = props.compositeScoring;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.riskAdjustment)) {
        resource.riskAdjustment = props.riskAdjustment;
    }

    if (!_.isNil(props.rateAggregation)) {
        resource.rateAggregation = props.rateAggregation;
    }

    if (!_.isNil(props.rationale)) {
        resource.rationale = props.rationale;
    }

    if (!_.isNil(props.clinicalRecommendationStatement)) {
        resource.clinicalRecommendationStatement = props.clinicalRecommendationStatement;
    }

    if (!_.isNil(props.improvementNotation)) {
        resource.improvementNotation = props.improvementNotation;
    }

    if (!_.isNil(props.definition)) {
        resource.definition = props.definition;
    }

    if (!_.isNil(props.guidance)) {
        resource.guidance = props.guidance;
    }

    if (!_.isNil(props.group)) {
        let src = props.group;
        if (!Array.isArray(src)) { src = [src]; }
        resource.group = [];

        for (let item of src) {
            let _group = {};

            if (!_.isNil(item.id)) {
                _group.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _group.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _group.code = item.code;
            }

            if (!_.isNil(item.description)) {
                _group.description = item.description;
            }

            if (!_.isNil(item.population)) {
                _group.population = item.population;
            }

            if (!_.isNil(item.stratifier)) {
                _group.stratifier = item.stratifier;
            }

            resource.group.push(_group);
        }
    }

    if (!_.isNil(props.supplementalData)) {
        let src = props.supplementalData;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supplementalData = [];

        for (let item of src) {
            let _supplementalData = {};

            if (!_.isNil(item.id)) {
                _supplementalData.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _supplementalData.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _supplementalData.code = item.code;
            }

            if (!_.isNil(item.usage)) {
                _supplementalData.usage = item.usage;
            }

            if (!_.isNil(item.description)) {
                _supplementalData.description = item.description;
            }

            if (!_.isNil(item.criteria)) {
                _supplementalData.criteria = item.criteria;
            }

            resource.supplementalData.push(_supplementalData);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Measure"]
    };

    return resource;
}

/**
  * Create a FHIR MeasureReport resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function measureReport(type, props) {
    const mappings = {
        "MeasureReport": measureReport_MeasureReport
    };

    return mappings[type](props)
}

function measureReport_MeasureReport(props) {
    const resource = {
        resourceType: "MeasureReport",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MeasureReport</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.measure)) {
        resource.measure = props.measure;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.reporter)) {
        resource.reporter = util.reference(props.reporter);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.improvementNotation)) {
        resource.improvementNotation = props.improvementNotation;
    }

    if (!_.isNil(props.group)) {
        let src = props.group;
        if (!Array.isArray(src)) { src = [src]; }
        resource.group = [];

        for (let item of src) {
            let _group = {};

            if (!_.isNil(item.id)) {
                _group.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _group.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _group.code = item.code;
            }

            if (!_.isNil(item.population)) {
                _group.population = item.population;
            }

            if (!_.isNil(item.measureScore)) {
                _group.measureScore = item.measureScore;
            }

            if (!_.isNil(item.stratifier)) {
                _group.stratifier = item.stratifier;
            }

            resource.group.push(_group);
        }
    }

    if (!_.isNil(props.evaluatedResource)) {
        if (!Array.isArray(props.evaluatedResource)) { props.evaluatedResource = [props.evaluatedResource]; }
        resource.evaluatedResource = util.reference(props.evaluatedResource);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MeasureReport"]
    };

    return resource;
}

/**
  * Create a FHIR Media resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function media(type, props) {
    const mappings = {
        "Media": media_Media
    };

    return mappings[type](props)
}

function media_Media(props) {
    const resource = {
        resourceType: "Media",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Media</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.modality)) {
        resource.modality = props.modality;
    }

    if (!_.isNil(props.view)) {
        resource.view = props.view;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.created)) {
        util.composite(resource, "created", props.created);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.operator)) {
        resource.operator = util.reference(props.operator);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.deviceName)) {
        resource.deviceName = props.deviceName;
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.height)) {
        resource.height = props.height;
    }

    if (!_.isNil(props.width)) {
        resource.width = props.width;
    }

    if (!_.isNil(props.frames)) {
        resource.frames = props.frames;
    }

    if (!_.isNil(props.duration)) {
        resource.duration = props.duration;
    }

    if (!_.isNil(props.content)) {
        resource.content = props.content;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Media"]
    };

    return resource;
}

/**
  * Create a FHIR Medication resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function medication(type, props) {
    const mappings = {
        "Medication": medication_Medication
    };

    return mappings[type](props)
}

function medication_Medication(props) {
    const resource = {
        resourceType: "Medication",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Medication</b></p></div>"
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

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = util.reference(props.manufacturer);
    }

    if (!_.isNil(props.form)) {
        resource.form = props.form;
    }

    if (!_.isNil(props.amount)) {
        resource.amount = props.amount;
    }

    if (!_.isNil(props.ingredient)) {
        let src = props.ingredient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.ingredient = [];

        for (let item of src) {
            let _ingredient = {};

            if (!_.isNil(item.id)) {
                _ingredient.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _ingredient.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.item)) {
                _ingredient.item = item.item;
            }

            if (!_.isNil(item.isActive)) {
                _ingredient.isActive = item.isActive;
            }

            if (!_.isNil(item.strength)) {
                _ingredient.strength = item.strength;
            }

            resource.ingredient.push(_ingredient);
        }
    }

    if (!_.isNil(props.batch)) {
        let src = props.batch;
        let _batch = {};

        if (!_.isNil(src.id)) {
            _batch.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _batch.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.lotNumber)) {
            _batch.lotNumber = src.lotNumber;
        }

        if (!_.isNil(src.expirationDate)) {
            _batch.expirationDate = src.expirationDate;
        }

        resource.batch = _batch;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Medication"]
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
        "MedicationAdministration": medicationAdministration_MedicationAdministration
    };

    return mappings[type](props)
}

function medicationAdministration_MedicationAdministration(props) {
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
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration"]
    };

    return resource;
}

/**
  * Create a FHIR MedicationDispense resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function medicationDispense(type, props) {
    const mappings = {
        "MedicationDispense": medicationDispense_MedicationDispense
    };

    return mappings[type](props)
}

function medicationDispense_MedicationDispense(props) {
    const resource = {
        resourceType: "MedicationDispense",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationDispense</b></p></div>"
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

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
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
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = util.reference(props.supportingInformation);
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

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.authorizingPrescription)) {
        if (!Array.isArray(props.authorizingPrescription)) { props.authorizingPrescription = [props.authorizingPrescription]; }
        resource.authorizingPrescription = util.reference(props.authorizingPrescription);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.daysSupply)) {
        resource.daysSupply = props.daysSupply;
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
        if (!Array.isArray(props.receiver)) { props.receiver = [props.receiver]; }
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
        let _substitution = {};

        if (!_.isNil(src.id)) {
            _substitution.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _substitution.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.wasSubstituted)) {
            _substitution.wasSubstituted = src.wasSubstituted;
        }

        if (!_.isNil(src.type)) {
            _substitution.type = src.type;
        }

        if (!_.isNil(src.reason)) {
            _substitution.reason = src.reason;
        }

        if (!_.isNil(src.responsibleParty)) {
            _substitution.responsibleParty = src.responsibleParty;
        }

        resource.substitution = _substitution;
    }

    if (!_.isNil(props.detectedIssue)) {
        if (!Array.isArray(props.detectedIssue)) { props.detectedIssue = [props.detectedIssue]; }
        resource.detectedIssue = util.reference(props.detectedIssue);
    }

    if (!_.isNil(props.eventHistory)) {
        if (!Array.isArray(props.eventHistory)) { props.eventHistory = [props.eventHistory]; }
        resource.eventHistory = util.reference(props.eventHistory);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicationDispense"]
    };

    return resource;
}

/**
  * Create a FHIR MedicationKnowledge resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function medicationKnowledge(type, props) {
    const mappings = {
        "MedicationKnowledge": medicationKnowledge_MedicationKnowledge
    };

    return mappings[type](props)
}

function medicationKnowledge_MedicationKnowledge(props) {
    const resource = {
        resourceType: "MedicationKnowledge",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationKnowledge</b></p></div>"
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

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = util.reference(props.manufacturer);
    }

    if (!_.isNil(props.doseForm)) {
        resource.doseForm = props.doseForm;
    }

    if (!_.isNil(props.amount)) {
        resource.amount = props.amount;
    }

    if (!_.isNil(props.synonym)) {
        resource.synonym = props.synonym;
    }

    if (!_.isNil(props.relatedMedicationKnowledge)) {
        let src = props.relatedMedicationKnowledge;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relatedMedicationKnowledge = [];

        for (let item of src) {
            let _relatedMedicationKnowledge = {};

            if (!_.isNil(item.id)) {
                _relatedMedicationKnowledge.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _relatedMedicationKnowledge.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _relatedMedicationKnowledge.type = item.type;
            }

            if (!_.isNil(item.reference)) {
                _relatedMedicationKnowledge.reference = item.reference;
            }

            resource.relatedMedicationKnowledge.push(_relatedMedicationKnowledge);
        }
    }

    if (!_.isNil(props.associatedMedication)) {
        if (!Array.isArray(props.associatedMedication)) { props.associatedMedication = [props.associatedMedication]; }
        resource.associatedMedication = util.reference(props.associatedMedication);
    }

    if (!_.isNil(props.productType)) {
        resource.productType = props.productType;
    }

    if (!_.isNil(props.monograph)) {
        let src = props.monograph;
        if (!Array.isArray(src)) { src = [src]; }
        resource.monograph = [];

        for (let item of src) {
            let _monograph = {};

            if (!_.isNil(item.id)) {
                _monograph.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _monograph.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _monograph.type = item.type;
            }

            if (!_.isNil(item.source)) {
                _monograph.source = item.source;
            }

            resource.monograph.push(_monograph);
        }
    }

    if (!_.isNil(props.ingredient)) {
        let src = props.ingredient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.ingredient = [];

        for (let item of src) {
            let _ingredient = {};

            if (!_.isNil(item.id)) {
                _ingredient.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _ingredient.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.item)) {
                _ingredient.item = item.item;
            }

            if (!_.isNil(item.isActive)) {
                _ingredient.isActive = item.isActive;
            }

            if (!_.isNil(item.strength)) {
                _ingredient.strength = item.strength;
            }

            resource.ingredient.push(_ingredient);
        }
    }

    if (!_.isNil(props.preparationInstruction)) {
        resource.preparationInstruction = props.preparationInstruction;
    }

    if (!_.isNil(props.intendedRoute)) {
        resource.intendedRoute = props.intendedRoute;
    }

    if (!_.isNil(props.cost)) {
        let src = props.cost;
        if (!Array.isArray(src)) { src = [src]; }
        resource.cost = [];

        for (let item of src) {
            let _cost = {};

            if (!_.isNil(item.id)) {
                _cost.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _cost.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _cost.type = item.type;
            }

            if (!_.isNil(item.source)) {
                _cost.source = item.source;
            }

            if (!_.isNil(item.cost)) {
                _cost.cost = item.cost;
            }

            resource.cost.push(_cost);
        }
    }

    if (!_.isNil(props.monitoringProgram)) {
        let src = props.monitoringProgram;
        if (!Array.isArray(src)) { src = [src]; }
        resource.monitoringProgram = [];

        for (let item of src) {
            let _monitoringProgram = {};

            if (!_.isNil(item.id)) {
                _monitoringProgram.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _monitoringProgram.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _monitoringProgram.type = item.type;
            }

            if (!_.isNil(item.name)) {
                _monitoringProgram.name = item.name;
            }

            resource.monitoringProgram.push(_monitoringProgram);
        }
    }

    if (!_.isNil(props.administrationGuidelines)) {
        let src = props.administrationGuidelines;
        if (!Array.isArray(src)) { src = [src]; }
        resource.administrationGuidelines = [];

        for (let item of src) {
            let _administrationGuidelines = {};

            if (!_.isNil(item.id)) {
                _administrationGuidelines.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _administrationGuidelines.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.dosage)) {
                _administrationGuidelines.dosage = item.dosage;
            }

            if (!_.isNil(item.indication)) {
                _administrationGuidelines.indication = item.indication;
            }

            if (!_.isNil(item.patientCharacteristics)) {
                _administrationGuidelines.patientCharacteristics = item.patientCharacteristics;
            }

            resource.administrationGuidelines.push(_administrationGuidelines);
        }
    }

    if (!_.isNil(props.medicineClassification)) {
        let src = props.medicineClassification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.medicineClassification = [];

        for (let item of src) {
            let _medicineClassification = {};

            if (!_.isNil(item.id)) {
                _medicineClassification.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _medicineClassification.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _medicineClassification.type = item.type;
            }

            if (!_.isNil(item.classification)) {
                _medicineClassification.classification = item.classification;
            }

            resource.medicineClassification.push(_medicineClassification);
        }
    }

    if (!_.isNil(props.packaging)) {
        let src = props.packaging;
        let _packaging = {};

        if (!_.isNil(src.id)) {
            _packaging.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _packaging.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _packaging.type = src.type;
        }

        if (!_.isNil(src.quantity)) {
            _packaging.quantity = src.quantity;
        }

        resource.packaging = _packaging;
    }

    if (!_.isNil(props.drugCharacteristic)) {
        let src = props.drugCharacteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.drugCharacteristic = [];

        for (let item of src) {
            let _drugCharacteristic = {};

            if (!_.isNil(item.id)) {
                _drugCharacteristic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _drugCharacteristic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _drugCharacteristic.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _drugCharacteristic.value = item.value;
            }

            resource.drugCharacteristic.push(_drugCharacteristic);
        }
    }

    if (!_.isNil(props.contraindication)) {
        if (!Array.isArray(props.contraindication)) { props.contraindication = [props.contraindication]; }
        resource.contraindication = util.reference(props.contraindication);
    }

    if (!_.isNil(props.regulatory)) {
        let src = props.regulatory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.regulatory = [];

        for (let item of src) {
            let _regulatory = {};

            if (!_.isNil(item.id)) {
                _regulatory.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _regulatory.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.regulatoryAuthority)) {
                _regulatory.regulatoryAuthority = item.regulatoryAuthority;
            }

            if (!_.isNil(item.substitution)) {
                _regulatory.substitution = item.substitution;
            }

            if (!_.isNil(item.schedule)) {
                _regulatory.schedule = item.schedule;
            }

            if (!_.isNil(item.maxDispense)) {
                _regulatory.maxDispense = item.maxDispense;
            }

            resource.regulatory.push(_regulatory);
        }
    }

    if (!_.isNil(props.kinetics)) {
        let src = props.kinetics;
        if (!Array.isArray(src)) { src = [src]; }
        resource.kinetics = [];

        for (let item of src) {
            let _kinetics = {};

            if (!_.isNil(item.id)) {
                _kinetics.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _kinetics.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.areaUnderCurve)) {
                _kinetics.areaUnderCurve = item.areaUnderCurve;
            }

            if (!_.isNil(item.lethalDose50)) {
                _kinetics.lethalDose50 = item.lethalDose50;
            }

            if (!_.isNil(item.halfLifePeriod)) {
                _kinetics.halfLifePeriod = item.halfLifePeriod;
            }

            resource.kinetics.push(_kinetics);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicationKnowledge"]
    };

    return resource;
}

/**
  * Create a FHIR MedicationRequest resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function medicationRequest(type, props) {
    const mappings = {
        "MedicationRequest": medicationRequest_MedicationRequest
    };

    return mappings[type](props)
}

function medicationRequest_MedicationRequest(props) {
    const resource = {
        resourceType: "MedicationRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationRequest</b></p></div>"
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

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.doNotPerform)) {
        resource.doNotPerform = props.doNotPerform;
    }

    if (!_.isNil(props.reported)) {
        util.composite(resource, "reported", props.reported);
    }

    if (!_.isNil(props.medication)) {
        util.composite(resource, "medication", props.medication);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = util.reference(props.supportingInformation);
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.requester)) {
        resource.requester = util.reference(props.requester);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = props.performerType;
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = util.reference(props.recorder);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = util.identifier(props.groupIdentifier, undefined);
    }

    if (!_.isNil(props.courseOfTherapyType)) {
        resource.courseOfTherapyType = props.courseOfTherapyType;
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = util.reference(props.insurance);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.dosageInstruction)) {
        resource.dosageInstruction = props.dosageInstruction;
    }

    if (!_.isNil(props.dispenseRequest)) {
        let src = props.dispenseRequest;
        let _dispenseRequest = {};

        if (!_.isNil(src.id)) {
            _dispenseRequest.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _dispenseRequest.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.initialFill)) {
            _dispenseRequest.initialFill = src.initialFill;
        }

        if (!_.isNil(src.dispenseInterval)) {
            _dispenseRequest.dispenseInterval = src.dispenseInterval;
        }

        if (!_.isNil(src.validityPeriod)) {
            _dispenseRequest.validityPeriod = src.validityPeriod;
        }

        if (!_.isNil(src.numberOfRepeatsAllowed)) {
            _dispenseRequest.numberOfRepeatsAllowed = src.numberOfRepeatsAllowed;
        }

        if (!_.isNil(src.quantity)) {
            _dispenseRequest.quantity = src.quantity;
        }

        if (!_.isNil(src.expectedSupplyDuration)) {
            _dispenseRequest.expectedSupplyDuration = src.expectedSupplyDuration;
        }

        if (!_.isNil(src.performer)) {
            _dispenseRequest.performer = src.performer;
        }

        resource.dispenseRequest = _dispenseRequest;
    }

    if (!_.isNil(props.substitution)) {
        let src = props.substitution;
        let _substitution = {};

        if (!_.isNil(src.id)) {
            _substitution.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _substitution.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.allowed)) {
            _substitution.allowed = src.allowed;
        }

        if (!_.isNil(src.reason)) {
            _substitution.reason = src.reason;
        }

        resource.substitution = _substitution;
    }

    if (!_.isNil(props.priorPrescription)) {
        resource.priorPrescription = util.reference(props.priorPrescription);
    }

    if (!_.isNil(props.detectedIssue)) {
        if (!Array.isArray(props.detectedIssue)) { props.detectedIssue = [props.detectedIssue]; }
        resource.detectedIssue = util.reference(props.detectedIssue);
    }

    if (!_.isNil(props.eventHistory)) {
        if (!Array.isArray(props.eventHistory)) { props.eventHistory = [props.eventHistory]; }
        resource.eventHistory = util.reference(props.eventHistory);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"]
    };

    return resource;
}

/**
  * Create a FHIR MedicationStatement resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function medicationStatement(type, props) {
    const mappings = {
        "MedicationStatement": medicationStatement_MedicationStatement
    };

    return mappings[type](props)
}

function medicationStatement_MedicationStatement(props) {
    const resource = {
        resourceType: "MedicationStatement",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationStatement</b></p></div>"
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

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.dateAsserted)) {
        resource.dateAsserted = props.dateAsserted;
    }

    if (!_.isNil(props.informationSource)) {
        resource.informationSource = util.reference(props.informationSource);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = util.reference(props.derivedFrom);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.dosage)) {
        resource.dosage = props.dosage;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicationStatement"]
    };

    return resource;
}

/**
  * Create a FHIR MedicinalProductDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function medicinalProductDefinition(type, props) {
    const mappings = {
        "MedicinalProductDefinition": medicinalProductDefinition_MedicinalProductDefinition
    };

    return mappings[type](props)
}

function medicinalProductDefinition_MedicinalProductDefinition(props) {
    const resource = {
        resourceType: "MedicinalProductDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicinalProductDefinition</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.domain)) {
        resource.domain = props.domain;
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusDate)) {
        resource.statusDate = props.statusDate;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.combinedPharmaceuticalDoseForm)) {
        resource.combinedPharmaceuticalDoseForm = props.combinedPharmaceuticalDoseForm;
    }

    if (!_.isNil(props.route)) {
        resource.route = props.route;
    }

    if (!_.isNil(props.indication)) {
        resource.indication = props.indication;
    }

    if (!_.isNil(props.legalStatusOfSupply)) {
        resource.legalStatusOfSupply = props.legalStatusOfSupply;
    }

    if (!_.isNil(props.additionalMonitoringIndicator)) {
        resource.additionalMonitoringIndicator = props.additionalMonitoringIndicator;
    }

    if (!_.isNil(props.specialMeasures)) {
        resource.specialMeasures = props.specialMeasures;
    }

    if (!_.isNil(props.pediatricUseIndicator)) {
        resource.pediatricUseIndicator = props.pediatricUseIndicator;
    }

    if (!_.isNil(props.classification)) {
        resource.classification = props.classification;
    }

    if (!_.isNil(props.marketingStatus)) {
        resource.marketingStatus = props.marketingStatus;
    }

    if (!_.isNil(props.packagedMedicinalProduct)) {
        resource.packagedMedicinalProduct = props.packagedMedicinalProduct;
    }

    if (!_.isNil(props.ingredient)) {
        resource.ingredient = props.ingredient;
    }

    if (!_.isNil(props.impurity)) {
        resource.impurity = props.impurity;
    }

    if (!_.isNil(props.attachedDocument)) {
        if (!Array.isArray(props.attachedDocument)) { props.attachedDocument = [props.attachedDocument]; }
        resource.attachedDocument = util.reference(props.attachedDocument);
    }

    if (!_.isNil(props.masterFile)) {
        if (!Array.isArray(props.masterFile)) { props.masterFile = [props.masterFile]; }
        resource.masterFile = util.reference(props.masterFile);
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

            if (!_.isNil(item.type)) {
                _contact.type = item.type;
            }

            if (!_.isNil(item.contact)) {
                _contact.contact = item.contact;
            }

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.clinicalTrial)) {
        if (!Array.isArray(props.clinicalTrial)) { props.clinicalTrial = [props.clinicalTrial]; }
        resource.clinicalTrial = util.reference(props.clinicalTrial);
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
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

            if (!_.isNil(item.modifierExtension)) {
                _name.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.productName)) {
                _name.productName = item.productName;
            }

            if (!_.isNil(item.type)) {
                _name.type = item.type;
            }

            if (!_.isNil(item.namePart)) {
                _name.namePart = item.namePart;
            }

            if (!_.isNil(item.countryLanguage)) {
                _name.countryLanguage = item.countryLanguage;
            }

            resource.name.push(_name);
        }
    }

    if (!_.isNil(props.crossReference)) {
        let src = props.crossReference;
        if (!Array.isArray(src)) { src = [src]; }
        resource.crossReference = [];

        for (let item of src) {
            let _crossReference = {};

            if (!_.isNil(item.id)) {
                _crossReference.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _crossReference.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.product)) {
                _crossReference.product = item.product;
            }

            if (!_.isNil(item.type)) {
                _crossReference.type = item.type;
            }

            resource.crossReference.push(_crossReference);
        }
    }

    if (!_.isNil(props.operation)) {
        let src = props.operation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.operation = [];

        for (let item of src) {
            let _operation = {};

            if (!_.isNil(item.id)) {
                _operation.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _operation.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _operation.type = item.type;
            }

            if (!_.isNil(item.effectiveDate)) {
                _operation.effectiveDate = item.effectiveDate;
            }

            if (!_.isNil(item.organization)) {
                _operation.organization = item.organization;
            }

            if (!_.isNil(item.confidentialityIndicator)) {
                _operation.confidentialityIndicator = item.confidentialityIndicator;
            }

            resource.operation.push(_operation);
        }
    }

    if (!_.isNil(props.characteristic)) {
        let src = props.characteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.characteristic = [];

        for (let item of src) {
            let _characteristic = {};

            if (!_.isNil(item.id)) {
                _characteristic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _characteristic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _characteristic.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _characteristic.value = item.value;
            }

            resource.characteristic.push(_characteristic);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR MessageDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function messageDefinition(type, props) {
    const mappings = {
        "MessageDefinition": messageDefinition_MessageDefinition
    };

    return mappings[type](props)
}

function messageDefinition_MessageDefinition(props) {
    const resource = {
        resourceType: "MessageDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MessageDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.replaces)) {
        resource.replaces = props.replaces;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.base)) {
        resource.base = props.base;
    }

    if (!_.isNil(props.parent)) {
        resource.parent = props.parent;
    }

    if (!_.isNil(props.event)) {
        util.composite(resource, "event", props.event);
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.focus)) {
        let src = props.focus;
        if (!Array.isArray(src)) { src = [src]; }
        resource.focus = [];

        for (let item of src) {
            let _focus = {};

            if (!_.isNil(item.id)) {
                _focus.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _focus.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _focus.code = item.code;
            }

            if (!_.isNil(item.profile)) {
                _focus.profile = item.profile;
            }

            if (!_.isNil(item.min)) {
                _focus.min = item.min;
            }

            if (!_.isNil(item.max)) {
                _focus.max = item.max;
            }

            resource.focus.push(_focus);
        }
    }

    if (!_.isNil(props.responseRequired)) {
        resource.responseRequired = props.responseRequired;
    }

    if (!_.isNil(props.allowedResponse)) {
        let src = props.allowedResponse;
        if (!Array.isArray(src)) { src = [src]; }
        resource.allowedResponse = [];

        for (let item of src) {
            let _allowedResponse = {};

            if (!_.isNil(item.id)) {
                _allowedResponse.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _allowedResponse.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.message)) {
                _allowedResponse.message = item.message;
            }

            if (!_.isNil(item.situation)) {
                _allowedResponse.situation = item.situation;
            }

            resource.allowedResponse.push(_allowedResponse);
        }
    }

    if (!_.isNil(props.graph)) {
        resource.graph = props.graph;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MessageDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR MessageHeader resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function messageHeader(type, props) {
    const mappings = {
        "MessageHeader": messageHeader_MessageHeader
    };

    return mappings[type](props)
}

function messageHeader_MessageHeader(props) {
    const resource = {
        resourceType: "MessageHeader",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MessageHeader</b></p></div>"
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

    if (!_.isNil(props.event)) {
        util.composite(resource, "event", props.event);
    }

    if (!_.isNil(props.destination)) {
        let src = props.destination;
        if (!Array.isArray(src)) { src = [src]; }
        resource.destination = [];

        for (let item of src) {
            let _destination = {};

            if (!_.isNil(item.id)) {
                _destination.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _destination.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _destination.name = item.name;
            }

            if (!_.isNil(item.target)) {
                _destination.target = item.target;
            }

            if (!_.isNil(item.endpoint)) {
                _destination.endpoint = item.endpoint;
            }

            if (!_.isNil(item.receiver)) {
                _destination.receiver = item.receiver;
            }

            resource.destination.push(_destination);
        }
    }

    if (!_.isNil(props.sender)) {
        resource.sender = util.reference(props.sender);
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = util.reference(props.enterer);
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.source)) {
        let src = props.source;
        let _source = {};

        if (!_.isNil(src.id)) {
            _source.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _source.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.name)) {
            _source.name = src.name;
        }

        if (!_.isNil(src.software)) {
            _source.software = src.software;
        }

        if (!_.isNil(src.version)) {
            _source.version = src.version;
        }

        if (!_.isNil(src.contact)) {
            _source.contact = src.contact;
        }

        if (!_.isNil(src.endpoint)) {
            _source.endpoint = src.endpoint;
        }

        resource.source = _source;
    }

    if (!_.isNil(props.responsible)) {
        resource.responsible = util.reference(props.responsible);
    }

    if (!_.isNil(props.reason)) {
        resource.reason = props.reason;
    }

    if (!_.isNil(props.response)) {
        let src = props.response;
        let _response = {};

        if (!_.isNil(src.id)) {
            _response.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _response.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.identifier)) {
            _response.identifier = src.identifier;
        }

        if (!_.isNil(src.code)) {
            _response.code = src.code;
        }

        if (!_.isNil(src.details)) {
            _response.details = src.details;
        }

        resource.response = _response;
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.definition)) {
        resource.definition = props.definition;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MessageHeader"]
    };

    return resource;
}

/**
  * Create a FHIR MolecularSequence resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function molecularSequence(type, props) {
    const mappings = {
        "MolecularSequence": molecularSequence_MolecularSequence
    };

    return mappings[type](props)
}

function molecularSequence_MolecularSequence(props) {
    const resource = {
        resourceType: "MolecularSequence",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MolecularSequence</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.coordinateSystem)) {
        resource.coordinateSystem = props.coordinateSystem;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = util.reference(props.device);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.referenceSeq)) {
        let src = props.referenceSeq;
        let _referenceSeq = {};

        if (!_.isNil(src.id)) {
            _referenceSeq.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _referenceSeq.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.chromosome)) {
            _referenceSeq.chromosome = src.chromosome;
        }

        if (!_.isNil(src.genomeBuild)) {
            _referenceSeq.genomeBuild = src.genomeBuild;
        }

        if (!_.isNil(src.orientation)) {
            _referenceSeq.orientation = src.orientation;
        }

        if (!_.isNil(src.referenceSeqId)) {
            _referenceSeq.referenceSeqId = src.referenceSeqId;
        }

        if (!_.isNil(src.referenceSeqPointer)) {
            _referenceSeq.referenceSeqPointer = src.referenceSeqPointer;
        }

        if (!_.isNil(src.referenceSeqString)) {
            _referenceSeq.referenceSeqString = src.referenceSeqString;
        }

        if (!_.isNil(src.strand)) {
            _referenceSeq.strand = src.strand;
        }

        if (!_.isNil(src.windowStart)) {
            _referenceSeq.windowStart = src.windowStart;
        }

        if (!_.isNil(src.windowEnd)) {
            _referenceSeq.windowEnd = src.windowEnd;
        }

        resource.referenceSeq = _referenceSeq;
    }

    if (!_.isNil(props.variant)) {
        let src = props.variant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.variant = [];

        for (let item of src) {
            let _variant = {};

            if (!_.isNil(item.id)) {
                _variant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _variant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.start)) {
                _variant.start = item.start;
            }

            if (!_.isNil(item.end)) {
                _variant.end = item.end;
            }

            if (!_.isNil(item.observedAllele)) {
                _variant.observedAllele = item.observedAllele;
            }

            if (!_.isNil(item.referenceAllele)) {
                _variant.referenceAllele = item.referenceAllele;
            }

            if (!_.isNil(item.cigar)) {
                _variant.cigar = item.cigar;
            }

            if (!_.isNil(item.variantPointer)) {
                _variant.variantPointer = item.variantPointer;
            }

            resource.variant.push(_variant);
        }
    }

    if (!_.isNil(props.observedSeq)) {
        resource.observedSeq = props.observedSeq;
    }

    if (!_.isNil(props.quality)) {
        let src = props.quality;
        if (!Array.isArray(src)) { src = [src]; }
        resource.quality = [];

        for (let item of src) {
            let _quality = {};

            if (!_.isNil(item.id)) {
                _quality.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _quality.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _quality.type = item.type;
            }

            if (!_.isNil(item.standardSequence)) {
                _quality.standardSequence = item.standardSequence;
            }

            if (!_.isNil(item.start)) {
                _quality.start = item.start;
            }

            if (!_.isNil(item.end)) {
                _quality.end = item.end;
            }

            if (!_.isNil(item.score)) {
                _quality.score = item.score;
            }

            if (!_.isNil(item.method)) {
                _quality.method = item.method;
            }

            if (!_.isNil(item.truthTP)) {
                _quality.truthTP = item.truthTP;
            }

            if (!_.isNil(item.queryTP)) {
                _quality.queryTP = item.queryTP;
            }

            if (!_.isNil(item.truthFN)) {
                _quality.truthFN = item.truthFN;
            }

            if (!_.isNil(item.queryFP)) {
                _quality.queryFP = item.queryFP;
            }

            if (!_.isNil(item.gtFP)) {
                _quality.gtFP = item.gtFP;
            }

            if (!_.isNil(item.precision)) {
                _quality.precision = item.precision;
            }

            if (!_.isNil(item.recall)) {
                _quality.recall = item.recall;
            }

            if (!_.isNil(item.fScore)) {
                _quality.fScore = item.fScore;
            }

            if (!_.isNil(item.roc)) {
                _quality.roc = item.roc;
            }

            resource.quality.push(_quality);
        }
    }

    if (!_.isNil(props.readCoverage)) {
        resource.readCoverage = props.readCoverage;
    }

    if (!_.isNil(props.repository)) {
        let src = props.repository;
        if (!Array.isArray(src)) { src = [src]; }
        resource.repository = [];

        for (let item of src) {
            let _repository = {};

            if (!_.isNil(item.id)) {
                _repository.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _repository.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _repository.type = item.type;
            }

            if (!_.isNil(item.url)) {
                _repository.url = item.url;
            }

            if (!_.isNil(item.name)) {
                _repository.name = item.name;
            }

            if (!_.isNil(item.datasetId)) {
                _repository.datasetId = item.datasetId;
            }

            if (!_.isNil(item.variantsetId)) {
                _repository.variantsetId = item.variantsetId;
            }

            if (!_.isNil(item.readsetId)) {
                _repository.readsetId = item.readsetId;
            }

            resource.repository.push(_repository);
        }
    }

    if (!_.isNil(props.pointer)) {
        if (!Array.isArray(props.pointer)) { props.pointer = [props.pointer]; }
        resource.pointer = util.reference(props.pointer);
    }

    if (!_.isNil(props.structureVariant)) {
        let src = props.structureVariant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.structureVariant = [];

        for (let item of src) {
            let _structureVariant = {};

            if (!_.isNil(item.id)) {
                _structureVariant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _structureVariant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.variantType)) {
                _structureVariant.variantType = item.variantType;
            }

            if (!_.isNil(item.exact)) {
                _structureVariant.exact = item.exact;
            }

            if (!_.isNil(item.length)) {
                _structureVariant.length = item.length;
            }

            if (!_.isNil(item.outer)) {
                _structureVariant.outer = item.outer;
            }

            if (!_.isNil(item.inner)) {
                _structureVariant.inner = item.inner;
            }

            resource.structureVariant.push(_structureVariant);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MolecularSequence"]
    };

    return resource;
}

/**
  * Create a FHIR NamingSystem resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function namingSystem(type, props) {
    const mappings = {
        "NamingSystem": namingSystem_NamingSystem
    };

    return mappings[type](props)
}

function namingSystem_NamingSystem(props) {
    const resource = {
        resourceType: "NamingSystem",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>NamingSystem</b></p></div>"
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

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.kind)) {
        resource.kind = props.kind;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.responsible)) {
        resource.responsible = props.responsible;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.uniqueId)) {
        let src = props.uniqueId;
        if (!Array.isArray(src)) { src = [src]; }
        resource.uniqueId = [];

        for (let item of src) {
            let _uniqueId = {};

            if (!_.isNil(item.id)) {
                _uniqueId.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _uniqueId.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _uniqueId.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _uniqueId.value = item.value;
            }

            if (!_.isNil(item.preferred)) {
                _uniqueId.preferred = item.preferred;
            }

            if (!_.isNil(item.comment)) {
                _uniqueId.comment = item.comment;
            }

            if (!_.isNil(item.period)) {
                _uniqueId.period = item.period;
            }

            resource.uniqueId.push(_uniqueId);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/NamingSystem"]
    };

    return resource;
}

/**
  * Create a FHIR NutritionOrder resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function nutritionOrder(type, props) {
    const mappings = {
        "NutritionOrder": nutritionOrder_NutritionOrder
    };

    return mappings[type](props)
}

function nutritionOrder_NutritionOrder(props) {
    const resource = {
        resourceType: "NutritionOrder",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>NutritionOrder</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.instantiates)) {
        resource.instantiates = props.instantiates;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.dateTime)) {
        resource.dateTime = props.dateTime;
    }

    if (!_.isNil(props.orderer)) {
        resource.orderer = util.reference(props.orderer);
    }

    if (!_.isNil(props.allergyIntolerance)) {
        if (!Array.isArray(props.allergyIntolerance)) { props.allergyIntolerance = [props.allergyIntolerance]; }
        resource.allergyIntolerance = util.reference(props.allergyIntolerance);
    }

    if (!_.isNil(props.foodPreferenceModifier)) {
        resource.foodPreferenceModifier = props.foodPreferenceModifier;
    }

    if (!_.isNil(props.excludeFoodModifier)) {
        resource.excludeFoodModifier = props.excludeFoodModifier;
    }

    if (!_.isNil(props.oralDiet)) {
        let src = props.oralDiet;
        let _oralDiet = {};

        if (!_.isNil(src.id)) {
            _oralDiet.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _oralDiet.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _oralDiet.type = src.type;
        }

        if (!_.isNil(src.schedule)) {
            _oralDiet.schedule = src.schedule;
        }

        if (!_.isNil(src.nutrient)) {
            _oralDiet.nutrient = src.nutrient;
        }

        if (!_.isNil(src.texture)) {
            _oralDiet.texture = src.texture;
        }

        if (!_.isNil(src.fluidConsistencyType)) {
            _oralDiet.fluidConsistencyType = src.fluidConsistencyType;
        }

        if (!_.isNil(src.instruction)) {
            _oralDiet.instruction = src.instruction;
        }

        resource.oralDiet = _oralDiet;
    }

    if (!_.isNil(props.supplement)) {
        let src = props.supplement;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supplement = [];

        for (let item of src) {
            let _supplement = {};

            if (!_.isNil(item.id)) {
                _supplement.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _supplement.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _supplement.type = item.type;
            }

            if (!_.isNil(item.productName)) {
                _supplement.productName = item.productName;
            }

            if (!_.isNil(item.schedule)) {
                _supplement.schedule = item.schedule;
            }

            if (!_.isNil(item.quantity)) {
                _supplement.quantity = item.quantity;
            }

            if (!_.isNil(item.instruction)) {
                _supplement.instruction = item.instruction;
            }

            resource.supplement.push(_supplement);
        }
    }

    if (!_.isNil(props.enteralFormula)) {
        let src = props.enteralFormula;
        let _enteralFormula = {};

        if (!_.isNil(src.id)) {
            _enteralFormula.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _enteralFormula.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.baseFormulaType)) {
            _enteralFormula.baseFormulaType = src.baseFormulaType;
        }

        if (!_.isNil(src.baseFormulaProductName)) {
            _enteralFormula.baseFormulaProductName = src.baseFormulaProductName;
        }

        if (!_.isNil(src.additiveType)) {
            _enteralFormula.additiveType = src.additiveType;
        }

        if (!_.isNil(src.additiveProductName)) {
            _enteralFormula.additiveProductName = src.additiveProductName;
        }

        if (!_.isNil(src.caloricDensity)) {
            _enteralFormula.caloricDensity = src.caloricDensity;
        }

        if (!_.isNil(src.routeofAdministration)) {
            _enteralFormula.routeofAdministration = src.routeofAdministration;
        }

        if (!_.isNil(src.administration)) {
            _enteralFormula.administration = src.administration;
        }

        if (!_.isNil(src.maxVolumeToDeliver)) {
            _enteralFormula.maxVolumeToDeliver = src.maxVolumeToDeliver;
        }

        if (!_.isNil(src.administrationInstruction)) {
            _enteralFormula.administrationInstruction = src.administrationInstruction;
        }

        resource.enteralFormula = _enteralFormula;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/NutritionOrder"]
    };

    return resource;
}

/**
  * Create a FHIR NutritionProduct resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function nutritionProduct(type, props) {
    const mappings = {
        "NutritionProduct": nutritionProduct_NutritionProduct
    };

    return mappings[type](props)
}

function nutritionProduct_NutritionProduct(props) {
    const resource = {
        resourceType: "NutritionProduct",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>NutritionProduct</b></p></div>"
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = util.reference(props.manufacturer);
    }

    if (!_.isNil(props.nutrient)) {
        let src = props.nutrient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.nutrient = [];

        for (let item of src) {
            let _nutrient = {};

            if (!_.isNil(item.id)) {
                _nutrient.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _nutrient.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.item)) {
                _nutrient.item = item.item;
            }

            if (!_.isNil(item.amount)) {
                _nutrient.amount = item.amount;
            }

            resource.nutrient.push(_nutrient);
        }
    }

    if (!_.isNil(props.ingredient)) {
        let src = props.ingredient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.ingredient = [];

        for (let item of src) {
            let _ingredient = {};

            if (!_.isNil(item.id)) {
                _ingredient.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _ingredient.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.item)) {
                _ingredient.item = item.item;
            }

            if (!_.isNil(item.amount)) {
                _ingredient.amount = item.amount;
            }

            resource.ingredient.push(_ingredient);
        }
    }

    if (!_.isNil(props.knownAllergen)) {
        resource.knownAllergen = props.knownAllergen;
    }

    if (!_.isNil(props.productCharacteristic)) {
        let src = props.productCharacteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.productCharacteristic = [];

        for (let item of src) {
            let _productCharacteristic = {};

            if (!_.isNil(item.id)) {
                _productCharacteristic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _productCharacteristic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _productCharacteristic.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _productCharacteristic.value = item.value;
            }

            resource.productCharacteristic.push(_productCharacteristic);
        }
    }

    if (!_.isNil(props.instance)) {
        let src = props.instance;
        let _instance = {};

        if (!_.isNil(src.id)) {
            _instance.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _instance.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.quantity)) {
            _instance.quantity = src.quantity;
        }

        if (!_.isNil(src.identifier)) {
            _instance.identifier = src.identifier;
        }

        if (!_.isNil(src.lotNumber)) {
            _instance.lotNumber = src.lotNumber;
        }

        if (!_.isNil(src.expiry)) {
            _instance.expiry = src.expiry;
        }

        if (!_.isNil(src.useBy)) {
            _instance.useBy = src.useBy;
        }

        resource.instance = _instance;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/NutritionProduct"]
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
        "Observation": observation_Observation
    };

    return mappings[type](props)
}

function observation_Observation(props) {
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
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
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
        profile: ["http://hl7.org/fhir/StructureDefinition/Observation"]
    };

    return resource;
}

/**
  * Create a FHIR ObservationDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function observationDefinition(type, props) {
    const mappings = {
        "ObservationDefinition": observationDefinition_ObservationDefinition
    };

    return mappings[type](props)
}

function observationDefinition_ObservationDefinition(props) {
    const resource = {
        resourceType: "ObservationDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ObservationDefinition</b></p></div>"
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

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.permittedDataType)) {
        resource.permittedDataType = props.permittedDataType;
    }

    if (!_.isNil(props.multipleResultsAllowed)) {
        resource.multipleResultsAllowed = props.multipleResultsAllowed;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.preferredReportName)) {
        resource.preferredReportName = props.preferredReportName;
    }

    if (!_.isNil(props.quantitativeDetails)) {
        let src = props.quantitativeDetails;
        let _quantitativeDetails = {};

        if (!_.isNil(src.id)) {
            _quantitativeDetails.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _quantitativeDetails.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.customaryUnit)) {
            _quantitativeDetails.customaryUnit = src.customaryUnit;
        }

        if (!_.isNil(src.unit)) {
            _quantitativeDetails.unit = src.unit;
        }

        if (!_.isNil(src.conversionFactor)) {
            _quantitativeDetails.conversionFactor = src.conversionFactor;
        }

        if (!_.isNil(src.decimalPrecision)) {
            _quantitativeDetails.decimalPrecision = src.decimalPrecision;
        }

        resource.quantitativeDetails = _quantitativeDetails;
    }

    if (!_.isNil(props.qualifiedInterval)) {
        let src = props.qualifiedInterval;
        if (!Array.isArray(src)) { src = [src]; }
        resource.qualifiedInterval = [];

        for (let item of src) {
            let _qualifiedInterval = {};

            if (!_.isNil(item.id)) {
                _qualifiedInterval.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _qualifiedInterval.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.category)) {
                _qualifiedInterval.category = item.category;
            }

            if (!_.isNil(item.range)) {
                _qualifiedInterval.range = item.range;
            }

            if (!_.isNil(item.context)) {
                _qualifiedInterval.context = item.context;
            }

            if (!_.isNil(item.appliesTo)) {
                _qualifiedInterval.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.gender)) {
                _qualifiedInterval.gender = item.gender;
            }

            if (!_.isNil(item.age)) {
                _qualifiedInterval.age = item.age;
            }

            if (!_.isNil(item.gestationalAge)) {
                _qualifiedInterval.gestationalAge = item.gestationalAge;
            }

            if (!_.isNil(item.condition)) {
                _qualifiedInterval.condition = item.condition;
            }

            resource.qualifiedInterval.push(_qualifiedInterval);
        }
    }

    if (!_.isNil(props.validCodedValueSet)) {
        resource.validCodedValueSet = util.reference(props.validCodedValueSet);
    }

    if (!_.isNil(props.normalCodedValueSet)) {
        resource.normalCodedValueSet = util.reference(props.normalCodedValueSet);
    }

    if (!_.isNil(props.abnormalCodedValueSet)) {
        resource.abnormalCodedValueSet = util.reference(props.abnormalCodedValueSet);
    }

    if (!_.isNil(props.criticalCodedValueSet)) {
        resource.criticalCodedValueSet = util.reference(props.criticalCodedValueSet);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ObservationDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR OperationDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function operationDefinition(type, props) {
    const mappings = {
        "OperationDefinition": operationDefinition_OperationDefinition
    };

    return mappings[type](props)
}

function operationDefinition_OperationDefinition(props) {
    const resource = {
        resourceType: "OperationDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>OperationDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.kind)) {
        resource.kind = props.kind;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.affectsState)) {
        resource.affectsState = props.affectsState;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    if (!_.isNil(props.base)) {
        resource.base = props.base;
    }

    if (!_.isNil(props.resource)) {
        resource.resource = props.resource;
    }

    if (!_.isNil(props.system)) {
        resource.system = props.system;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.instance)) {
        resource.instance = props.instance;
    }

    if (!_.isNil(props.inputProfile)) {
        resource.inputProfile = props.inputProfile;
    }

    if (!_.isNil(props.outputProfile)) {
        resource.outputProfile = props.outputProfile;
    }

    if (!_.isNil(props.parameter)) {
        let src = props.parameter;
        if (!Array.isArray(src)) { src = [src]; }
        resource.parameter = [];

        for (let item of src) {
            let _parameter = {};

            if (!_.isNil(item.id)) {
                _parameter.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _parameter.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _parameter.name = item.name;
            }

            if (!_.isNil(item.use)) {
                _parameter.use = item.use;
            }

            if (!_.isNil(item.min)) {
                _parameter.min = item.min;
            }

            if (!_.isNil(item.max)) {
                _parameter.max = item.max;
            }

            if (!_.isNil(item.documentation)) {
                _parameter.documentation = item.documentation;
            }

            if (!_.isNil(item.type)) {
                _parameter.type = item.type;
            }

            if (!_.isNil(item.targetProfile)) {
                _parameter.targetProfile = item.targetProfile;
            }

            if (!_.isNil(item.searchType)) {
                _parameter.searchType = item.searchType;
            }

            if (!_.isNil(item.binding)) {
                _parameter.binding = item.binding;
            }

            if (!_.isNil(item.referencedFrom)) {
                _parameter.referencedFrom = item.referencedFrom;
            }

            resource.parameter.push(_parameter);
        }
    }

    if (!_.isNil(props.overload)) {
        let src = props.overload;
        if (!Array.isArray(src)) { src = [src]; }
        resource.overload = [];

        for (let item of src) {
            let _overload = {};

            if (!_.isNil(item.id)) {
                _overload.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _overload.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.parameterName)) {
                _overload.parameterName = item.parameterName;
            }

            if (!_.isNil(item.comment)) {
                _overload.comment = item.comment;
            }

            resource.overload.push(_overload);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/OperationDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR OperationOutcome resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function operationOutcome(type, props) {
    const mappings = {
        "OperationOutcome": operationOutcome_OperationOutcome
    };

    return mappings[type](props)
}

function operationOutcome_OperationOutcome(props) {
    const resource = {
        resourceType: "OperationOutcome",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>OperationOutcome</b></p></div>"
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

    if (!_.isNil(props.issue)) {
        let src = props.issue;
        if (!Array.isArray(src)) { src = [src]; }
        resource.issue = [];

        for (let item of src) {
            let _issue = {};

            if (!_.isNil(item.id)) {
                _issue.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _issue.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.severity)) {
                _issue.severity = item.severity;
            }

            if (!_.isNil(item.code)) {
                _issue.code = item.code;
            }

            if (!_.isNil(item.details)) {
                _issue.details = item.details;
            }

            if (!_.isNil(item.diagnostics)) {
                _issue.diagnostics = item.diagnostics;
            }

            if (!_.isNil(item.location)) {
                _issue.location = item.location;
            }

            if (!_.isNil(item.expression)) {
                _issue.expression = item.expression;
            }

            resource.issue.push(_issue);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/OperationOutcome"]
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
        "Organization": organization_Organization
    };

    return mappings[type](props)
}

function organization_Organization(props) {
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
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
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
        profile: ["http://hl7.org/fhir/StructureDefinition/Organization"]
    };

    return resource;
}

/**
  * Create a FHIR OrganizationAffiliation resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function organizationAffiliation(type, props) {
    const mappings = {
        "OrganizationAffiliation": organizationAffiliation_OrganizationAffiliation
    };

    return mappings[type](props)
}

function organizationAffiliation_OrganizationAffiliation(props) {
    const resource = {
        resourceType: "OrganizationAffiliation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>OrganizationAffiliation</b></p></div>"
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

    if (!_.isNil(props.organization)) {
        resource.organization = util.reference(props.organization);
    }

    if (!_.isNil(props.participatingOrganization)) {
        resource.participatingOrganization = util.reference(props.participatingOrganization);
    }

    if (!_.isNil(props.network)) {
        if (!Array.isArray(props.network)) { props.network = [props.network]; }
        resource.network = util.reference(props.network);
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

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = util.reference(props.endpoint);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/OrganizationAffiliation"]
    };

    return resource;
}

/**
  * Create a FHIR PackagedProductDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function packagedProductDefinition(type, props) {
    const mappings = {
        "PackagedProductDefinition": packagedProductDefinition_PackagedProductDefinition
    };

    return mappings[type](props)
}

function packagedProductDefinition_PackagedProductDefinition(props) {
    const resource = {
        resourceType: "PackagedProductDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PackagedProductDefinition</b></p></div>"
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

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.packageFor)) {
        if (!Array.isArray(props.packageFor)) { props.packageFor = [props.packageFor]; }
        resource.packageFor = util.reference(props.packageFor);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusDate)) {
        resource.statusDate = props.statusDate;
    }

    if (!_.isNil(props.containedItemQuantity)) {
        resource.containedItemQuantity = props.containedItemQuantity;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.legalStatusOfSupply)) {
        let src = props.legalStatusOfSupply;
        if (!Array.isArray(src)) { src = [src]; }
        resource.legalStatusOfSupply = [];

        for (let item of src) {
            let _legalStatusOfSupply = {};

            if (!_.isNil(item.id)) {
                _legalStatusOfSupply.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _legalStatusOfSupply.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _legalStatusOfSupply.code = item.code;
            }

            if (!_.isNil(item.jurisdiction)) {
                _legalStatusOfSupply.jurisdiction = item.jurisdiction;
            }

            resource.legalStatusOfSupply.push(_legalStatusOfSupply);
        }
    }

    if (!_.isNil(props.marketingStatus)) {
        resource.marketingStatus = props.marketingStatus;
    }

    if (!_.isNil(props.characteristic)) {
        resource.characteristic = props.characteristic;
    }

    if (!_.isNil(props.copackagedIndicator)) {
        resource.copackagedIndicator = props.copackagedIndicator;
    }

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = util.reference(props.manufacturer);
    }

    if (!_.isNil(props.package)) {
        let src = props.package;
        let _package = {};

        if (!_.isNil(src.id)) {
            _package.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _package.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.identifier)) {
            _package.identifier = src.identifier;
        }

        if (!_.isNil(src.type)) {
            _package.type = src.type;
        }

        if (!_.isNil(src.quantity)) {
            _package.quantity = src.quantity;
        }

        if (!_.isNil(src.material)) {
            _package.material = src.material;
        }

        if (!_.isNil(src.alternateMaterial)) {
            _package.alternateMaterial = src.alternateMaterial;
        }

        if (!_.isNil(src.shelfLifeStorage)) {
            _package.shelfLifeStorage = src.shelfLifeStorage;
        }

        if (!_.isNil(src.manufacturer)) {
            _package.manufacturer = src.manufacturer;
        }

        if (!_.isNil(src.property)) {
            _package.property = src.property;
        }

        if (!_.isNil(src.containedItem)) {
            _package.containedItem = src.containedItem;
        }

        resource.package = _package;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/PackagedProductDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR Parameters resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function parameters(type, props) {
    const mappings = {
        "Parameters": parameters_Parameters
    };

    return mappings[type](props)
}

function parameters_Parameters(props) {
    const resource = {
        resourceType: "Parameters",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Parameters</b></p></div>"
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

    if (!_.isNil(props.parameter)) {
        let src = props.parameter;
        if (!Array.isArray(src)) { src = [src]; }
        resource.parameter = [];

        for (let item of src) {
            let _parameter = {};

            if (!_.isNil(item.id)) {
                _parameter.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _parameter.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _parameter.name = item.name;
            }

            if (!_.isNil(item.value)) {
                _parameter.value = item.value;
            }

            if (!_.isNil(item.resource)) {
                _parameter.resource = item.resource;
            }

            resource.parameter.push(_parameter);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Parameters"]
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
        "Patient": patient_Patient
    };

    return mappings[type](props)
}

function patient_Patient(props) {
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
        profile: ["http://hl7.org/fhir/StructureDefinition/Patient"]
    };

    return resource;
}

/**
  * Create a FHIR PaymentNotice resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function paymentNotice(type, props) {
    const mappings = {
        "PaymentNotice": paymentNotice_PaymentNotice
    };

    return mappings[type](props)
}

function paymentNotice_PaymentNotice(props) {
    const resource = {
        resourceType: "PaymentNotice",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PaymentNotice</b></p></div>"
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

    if (!_.isNil(props.request)) {
        resource.request = util.reference(props.request);
    }

    if (!_.isNil(props.response)) {
        resource.response = util.reference(props.response);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.provider)) {
        resource.provider = util.reference(props.provider);
    }

    if (!_.isNil(props.payment)) {
        resource.payment = util.reference(props.payment);
    }

    if (!_.isNil(props.paymentDate)) {
        resource.paymentDate = props.paymentDate;
    }

    if (!_.isNil(props.payee)) {
        resource.payee = util.reference(props.payee);
    }

    if (!_.isNil(props.recipient)) {
        resource.recipient = util.reference(props.recipient);
    }

    if (!_.isNil(props.amount)) {
        resource.amount = props.amount;
    }

    if (!_.isNil(props.paymentStatus)) {
        resource.paymentStatus = props.paymentStatus;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/PaymentNotice"]
    };

    return resource;
}

/**
  * Create a FHIR PaymentReconciliation resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function paymentReconciliation(type, props) {
    const mappings = {
        "PaymentReconciliation": paymentReconciliation_PaymentReconciliation
    };

    return mappings[type](props)
}

function paymentReconciliation_PaymentReconciliation(props) {
    const resource = {
        resourceType: "PaymentReconciliation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PaymentReconciliation</b></p></div>"
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

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.paymentIssuer)) {
        resource.paymentIssuer = util.reference(props.paymentIssuer);
    }

    if (!_.isNil(props.request)) {
        resource.request = util.reference(props.request);
    }

    if (!_.isNil(props.requestor)) {
        resource.requestor = util.reference(props.requestor);
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
    }

    if (!_.isNil(props.disposition)) {
        resource.disposition = props.disposition;
    }

    if (!_.isNil(props.paymentDate)) {
        resource.paymentDate = props.paymentDate;
    }

    if (!_.isNil(props.paymentAmount)) {
        resource.paymentAmount = props.paymentAmount;
    }

    if (!_.isNil(props.paymentIdentifier)) {
        resource.paymentIdentifier = util.identifier(props.paymentIdentifier, undefined);
    }

    if (!_.isNil(props.detail)) {
        let src = props.detail;
        if (!Array.isArray(src)) { src = [src]; }
        resource.detail = [];

        for (let item of src) {
            let _detail = {};

            if (!_.isNil(item.id)) {
                _detail.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _detail.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _detail.identifier = item.identifier;
            }

            if (!_.isNil(item.predecessor)) {
                _detail.predecessor = item.predecessor;
            }

            if (!_.isNil(item.type)) {
                _detail.type = item.type;
            }

            if (!_.isNil(item.request)) {
                _detail.request = item.request;
            }

            if (!_.isNil(item.submitter)) {
                _detail.submitter = item.submitter;
            }

            if (!_.isNil(item.response)) {
                _detail.response = item.response;
            }

            if (!_.isNil(item.date)) {
                _detail.date = item.date;
            }

            if (!_.isNil(item.responsible)) {
                _detail.responsible = item.responsible;
            }

            if (!_.isNil(item.payee)) {
                _detail.payee = item.payee;
            }

            if (!_.isNil(item.amount)) {
                _detail.amount = item.amount;
            }

            resource.detail.push(_detail);
        }
    }

    if (!_.isNil(props.formCode)) {
        resource.formCode = props.formCode;
    }

    if (!_.isNil(props.processNote)) {
        let src = props.processNote;
        if (!Array.isArray(src)) { src = [src]; }
        resource.processNote = [];

        for (let item of src) {
            let _processNote = {};

            if (!_.isNil(item.id)) {
                _processNote.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _processNote.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _processNote.type = item.type;
            }

            if (!_.isNil(item.text)) {
                _processNote.text = item.text;
            }

            resource.processNote.push(_processNote);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/PaymentReconciliation"]
    };

    return resource;
}

/**
  * Create a FHIR Person resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function person(type, props) {
    const mappings = {
        "Person": person_Person
    };

    return mappings[type](props)
}

function person_Person(props) {
    const resource = {
        resourceType: "Person",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Person</b></p></div>"
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

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = util.reference(props.managingOrganization);
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
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

            if (!_.isNil(item.target)) {
                _link.target = item.target;
            }

            if (!_.isNil(item.assurance)) {
                _link.assurance = item.assurance;
            }

            resource.link.push(_link);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Person"]
    };

    return resource;
}

/**
  * Create a FHIR PlanDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function planDefinition(type, props) {
    const mappings = {
        "PlanDefinition": planDefinition_PlanDefinition
    };

    return mappings[type](props)
}

function planDefinition_PlanDefinition(props) {
    const resource = {
        resourceType: "PlanDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PlanDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.subject)) {
        util.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.library)) {
        resource.library = props.library;
    }

    if (!_.isNil(props.goal)) {
        let src = props.goal;
        if (!Array.isArray(src)) { src = [src]; }
        resource.goal = [];

        for (let item of src) {
            let _goal = {};

            if (!_.isNil(item.id)) {
                _goal.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _goal.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.category)) {
                _goal.category = item.category;
            }

            if (!_.isNil(item.description)) {
                _goal.description = item.description;
            }

            if (!_.isNil(item.priority)) {
                _goal.priority = item.priority;
            }

            if (!_.isNil(item.start)) {
                _goal.start = item.start;
            }

            if (!_.isNil(item.addresses)) {
                _goal.addresses = item.addresses;
            }

            if (!_.isNil(item.documentation)) {
                _goal.documentation = item.documentation;
            }

            if (!_.isNil(item.target)) {
                _goal.target = item.target;
            }

            resource.goal.push(_goal);
        }
    }

    if (!_.isNil(props.action)) {
        let src = props.action;
        if (!Array.isArray(src)) { src = [src]; }
        resource.action = [];

        for (let item of src) {
            let _action = {};

            if (!_.isNil(item.id)) {
                _action.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _action.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.prefix)) {
                _action.prefix = item.prefix;
            }

            if (!_.isNil(item.title)) {
                _action.title = item.title;
            }

            if (!_.isNil(item.description)) {
                _action.description = item.description;
            }

            if (!_.isNil(item.textEquivalent)) {
                _action.textEquivalent = item.textEquivalent;
            }

            if (!_.isNil(item.priority)) {
                _action.priority = item.priority;
            }

            if (!_.isNil(item.code)) {
                _action.code = item.code;
            }

            if (!_.isNil(item.reason)) {
                _action.reason = item.reason;
            }

            if (!_.isNil(item.documentation)) {
                _action.documentation = item.documentation;
            }

            if (!_.isNil(item.goalId)) {
                _action.goalId = item.goalId;
            }

            if (!_.isNil(item.subject)) {
                _action.subject = item.subject;
            }

            if (!_.isNil(item.trigger)) {
                _action.trigger = item.trigger;
            }

            if (!_.isNil(item.condition)) {
                _action.condition = item.condition;
            }

            if (!_.isNil(item.input)) {
                _action.input = item.input;
            }

            if (!_.isNil(item.output)) {
                _action.output = item.output;
            }

            if (!_.isNil(item.relatedAction)) {
                _action.relatedAction = item.relatedAction;
            }

            if (!_.isNil(item.timing)) {
                _action.timing = item.timing;
            }

            if (!_.isNil(item.participant)) {
                _action.participant = item.participant;
            }

            if (!_.isNil(item.type)) {
                _action.type = item.type;
            }

            if (!_.isNil(item.groupingBehavior)) {
                _action.groupingBehavior = item.groupingBehavior;
            }

            if (!_.isNil(item.selectionBehavior)) {
                _action.selectionBehavior = item.selectionBehavior;
            }

            if (!_.isNil(item.requiredBehavior)) {
                _action.requiredBehavior = item.requiredBehavior;
            }

            if (!_.isNil(item.precheckBehavior)) {
                _action.precheckBehavior = item.precheckBehavior;
            }

            if (!_.isNil(item.cardinalityBehavior)) {
                _action.cardinalityBehavior = item.cardinalityBehavior;
            }

            if (!_.isNil(item.definition)) {
                _action.definition = item.definition;
            }

            if (!_.isNil(item.transform)) {
                _action.transform = item.transform;
            }

            if (!_.isNil(item.dynamicValue)) {
                _action.dynamicValue = item.dynamicValue;
            }

            resource.action.push(_action);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"]
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
        "Practitioner": practitioner_Practitioner
    };

    return mappings[type](props)
}

function practitioner_Practitioner(props) {
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
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
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
        profile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"]
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
        "PractitionerRole": practitionerRole_PractitionerRole
    };

    return mappings[type](props)
}

function practitionerRole_PractitionerRole(props) {
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
        profile: ["http://hl7.org/fhir/StructureDefinition/PractitionerRole"]
    };

    return resource;
}

/**
  * Create a FHIR Procedure resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function procedure(type, props) {
    const mappings = {
        "Procedure": procedure_Procedure
    };

    return mappings[type](props)
}

function procedure_Procedure(props) {
    const resource = {
        resourceType: "Procedure",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Procedure</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
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

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.performed)) {
        util.composite(resource, "performed", props.performed);
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = util.reference(props.recorder);
    }

    if (!_.isNil(props.asserter)) {
        resource.asserter = util.reference(props.asserter);
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

            if (!_.isNil(item.onBehalfOf)) {
                _performer.onBehalfOf = item.onBehalfOf;
            }

            resource.performer.push(_performer);
        }
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
    }

    if (!_.isNil(props.report)) {
        if (!Array.isArray(props.report)) { props.report = [props.report]; }
        resource.report = util.reference(props.report);
    }

    if (!_.isNil(props.complication)) {
        resource.complication = props.complication;
    }

    if (!_.isNil(props.complicationDetail)) {
        if (!Array.isArray(props.complicationDetail)) { props.complicationDetail = [props.complicationDetail]; }
        resource.complicationDetail = util.reference(props.complicationDetail);
    }

    if (!_.isNil(props.followUp)) {
        resource.followUp = props.followUp;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.focalDevice)) {
        let src = props.focalDevice;
        if (!Array.isArray(src)) { src = [src]; }
        resource.focalDevice = [];

        for (let item of src) {
            let _focalDevice = {};

            if (!_.isNil(item.id)) {
                _focalDevice.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _focalDevice.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.action)) {
                _focalDevice.action = item.action;
            }

            if (!_.isNil(item.manipulated)) {
                _focalDevice.manipulated = item.manipulated;
            }

            resource.focalDevice.push(_focalDevice);
        }
    }

    if (!_.isNil(props.usedReference)) {
        if (!Array.isArray(props.usedReference)) { props.usedReference = [props.usedReference]; }
        resource.usedReference = util.reference(props.usedReference);
    }

    if (!_.isNil(props.usedCode)) {
        resource.usedCode = props.usedCode;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Procedure"]
    };

    return resource;
}

/**
  * Create a FHIR Provenance resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function provenance(type, props) {
    const mappings = {
        "Provenance": provenance_Provenance
    };

    return mappings[type](props)
}

function provenance_Provenance(props) {
    const resource = {
        resourceType: "Provenance",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Provenance</b></p></div>"
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

    if (!_.isNil(props.target)) {
        if (!Array.isArray(props.target)) { props.target = [props.target]; }
        resource.target = util.reference(props.target);
    }

    if (!_.isNil(props.occurred)) {
        util.composite(resource, "occurred", props.occurred);
    }

    if (!_.isNil(props.recorded)) {
        resource.recorded = props.recorded;
    }

    if (!_.isNil(props.policy)) {
        resource.policy = props.policy;
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.reason)) {
        resource.reason = props.reason;
    }

    if (!_.isNil(props.activity)) {
        resource.activity = props.activity;
    }

    if (!_.isNil(props.agent)) {
        let src = props.agent;
        if (!Array.isArray(src)) { src = [src]; }
        resource.agent = [];

        for (let item of src) {
            let _agent = {};

            if (!_.isNil(item.id)) {
                _agent.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _agent.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _agent.type = item.type;
            }

            if (!_.isNil(item.role)) {
                _agent.role = item.role;
            }

            if (!_.isNil(item.who)) {
                _agent.who = item.who;
            }

            if (!_.isNil(item.onBehalfOf)) {
                _agent.onBehalfOf = item.onBehalfOf;
            }

            resource.agent.push(_agent);
        }
    }

    if (!_.isNil(props.entity)) {
        let src = props.entity;
        if (!Array.isArray(src)) { src = [src]; }
        resource.entity = [];

        for (let item of src) {
            let _entity = {};

            if (!_.isNil(item.id)) {
                _entity.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _entity.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.role)) {
                _entity.role = item.role;
            }

            if (!_.isNil(item.what)) {
                _entity.what = item.what;
            }

            resource.entity.push(_entity);
        }
    }

    if (!_.isNil(props.signature)) {
        resource.signature = props.signature;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Provenance"]
    };

    return resource;
}

/**
  * Create a FHIR Questionnaire resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function questionnaire(type, props) {
    const mappings = {
        "Questionnaire": questionnaire_Questionnaire
    };

    return mappings[type](props)
}

function questionnaire_Questionnaire(props) {
    const resource = {
        resourceType: "Questionnaire",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Questionnaire</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.subjectType)) {
        resource.subjectType = props.subjectType;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.item)) {
        let src = props.item;
        if (!Array.isArray(src)) { src = [src]; }
        resource.item = [];

        for (let item of src) {
            let _item = {};

            if (!_.isNil(item.id)) {
                _item.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _item.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.linkId)) {
                _item.linkId = item.linkId;
            }

            if (!_.isNil(item.definition)) {
                _item.definition = item.definition;
            }

            if (!_.isNil(item.code)) {
                _item.code = item.code;
            }

            if (!_.isNil(item.prefix)) {
                _item.prefix = item.prefix;
            }

            if (!_.isNil(item.text)) {
                _item.text = item.text;
            }

            if (!_.isNil(item.type)) {
                _item.type = item.type;
            }

            if (!_.isNil(item.enableWhen)) {
                _item.enableWhen = item.enableWhen;
            }

            if (!_.isNil(item.enableBehavior)) {
                _item.enableBehavior = item.enableBehavior;
            }

            if (!_.isNil(item.required)) {
                _item.required = item.required;
            }

            if (!_.isNil(item.repeats)) {
                _item.repeats = item.repeats;
            }

            if (!_.isNil(item.readOnly)) {
                _item.readOnly = item.readOnly;
            }

            if (!_.isNil(item.maxLength)) {
                _item.maxLength = item.maxLength;
            }

            if (!_.isNil(item.answerValueSet)) {
                _item.answerValueSet = item.answerValueSet;
            }

            if (!_.isNil(item.answerOption)) {
                _item.answerOption = item.answerOption;
            }

            if (!_.isNil(item.initial)) {
                _item.initial = item.initial;
            }

            resource.item.push(_item);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Questionnaire"]
    };

    return resource;
}

/**
  * Create a FHIR QuestionnaireResponse resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function questionnaireResponse(type, props) {
    const mappings = {
        "QuestionnaireResponse": questionnaireResponse_QuestionnaireResponse
    };

    return mappings[type](props)
}

function questionnaireResponse_QuestionnaireResponse(props) {
    const resource = {
        resourceType: "QuestionnaireResponse",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>QuestionnaireResponse</b></p></div>"
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

    if (!_.isNil(props.questionnaire)) {
        resource.questionnaire = props.questionnaire;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.authored)) {
        resource.authored = props.authored;
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.source)) {
        resource.source = util.reference(props.source);
    }

    if (!_.isNil(props.item)) {
        let src = props.item;
        if (!Array.isArray(src)) { src = [src]; }
        resource.item = [];

        for (let item of src) {
            let _item = {};

            if (!_.isNil(item.id)) {
                _item.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _item.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.linkId)) {
                _item.linkId = item.linkId;
            }

            if (!_.isNil(item.definition)) {
                _item.definition = item.definition;
            }

            if (!_.isNil(item.text)) {
                _item.text = item.text;
            }

            if (!_.isNil(item.answer)) {
                _item.answer = item.answer;
            }

            resource.item.push(_item);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"]
    };

    return resource;
}

/**
  * Create a FHIR RegulatedAuthorization resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function regulatedAuthorization(type, props) {
    const mappings = {
        "RegulatedAuthorization": regulatedAuthorization_RegulatedAuthorization
    };

    return mappings[type](props)
}

function regulatedAuthorization_RegulatedAuthorization(props) {
    const resource = {
        resourceType: "RegulatedAuthorization",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RegulatedAuthorization</b></p></div>"
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

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.region)) {
        resource.region = props.region;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusDate)) {
        resource.statusDate = props.statusDate;
    }

    if (!_.isNil(props.validityPeriod)) {
        resource.validityPeriod = props.validityPeriod;
    }

    if (!_.isNil(props.indication)) {
        resource.indication = props.indication;
    }

    if (!_.isNil(props.intendedUse)) {
        resource.intendedUse = props.intendedUse;
    }

    if (!_.isNil(props.basis)) {
        resource.basis = props.basis;
    }

    if (!_.isNil(props.holder)) {
        resource.holder = util.reference(props.holder);
    }

    if (!_.isNil(props.regulator)) {
        resource.regulator = util.reference(props.regulator);
    }

    if (!_.isNil(props.case)) {
        let src = props.case;
        let _case = {};

        if (!_.isNil(src.id)) {
            _case.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _case.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.identifier)) {
            _case.identifier = src.identifier;
        }

        if (!_.isNil(src.type)) {
            _case.type = src.type;
        }

        if (!_.isNil(src.status)) {
            _case.status = src.status;
        }

        if (!_.isNil(src.date)) {
            _case.date = src.date;
        }

        resource.case = _case;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/RegulatedAuthorization"]
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
        "RelatedPerson": relatedPerson_RelatedPerson
    };

    return mappings[type](props)
}

function relatedPerson_RelatedPerson(props) {
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
        resource.relationship = props.relationship;
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
        profile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"]
    };

    return resource;
}

/**
  * Create a FHIR RequestGroup resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function requestGroup(type, props) {
    const mappings = {
        "RequestGroup": requestGroup_RequestGroup
    };

    return mappings[type](props)
}

function requestGroup_RequestGroup(props) {
    const resource = {
        resourceType: "RequestGroup",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RequestGroup</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        if (!Array.isArray(props.replaces)) { props.replaces = [props.replaces]; }
        resource.replaces = util.reference(props.replaces);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = util.identifier(props.groupIdentifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.action)) {
        let src = props.action;
        if (!Array.isArray(src)) { src = [src]; }
        resource.action = [];

        for (let item of src) {
            let _action = {};

            if (!_.isNil(item.id)) {
                _action.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _action.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.prefix)) {
                _action.prefix = item.prefix;
            }

            if (!_.isNil(item.title)) {
                _action.title = item.title;
            }

            if (!_.isNil(item.description)) {
                _action.description = item.description;
            }

            if (!_.isNil(item.textEquivalent)) {
                _action.textEquivalent = item.textEquivalent;
            }

            if (!_.isNil(item.priority)) {
                _action.priority = item.priority;
            }

            if (!_.isNil(item.code)) {
                _action.code = item.code;
            }

            if (!_.isNil(item.documentation)) {
                _action.documentation = item.documentation;
            }

            if (!_.isNil(item.condition)) {
                _action.condition = item.condition;
            }

            if (!_.isNil(item.relatedAction)) {
                _action.relatedAction = item.relatedAction;
            }

            if (!_.isNil(item.timing)) {
                _action.timing = item.timing;
            }

            if (!_.isNil(item.participant)) {
                _action.participant = item.participant;
            }

            if (!_.isNil(item.type)) {
                _action.type = item.type;
            }

            if (!_.isNil(item.groupingBehavior)) {
                _action.groupingBehavior = item.groupingBehavior;
            }

            if (!_.isNil(item.selectionBehavior)) {
                _action.selectionBehavior = item.selectionBehavior;
            }

            if (!_.isNil(item.requiredBehavior)) {
                _action.requiredBehavior = item.requiredBehavior;
            }

            if (!_.isNil(item.precheckBehavior)) {
                _action.precheckBehavior = item.precheckBehavior;
            }

            if (!_.isNil(item.cardinalityBehavior)) {
                _action.cardinalityBehavior = item.cardinalityBehavior;
            }

            if (!_.isNil(item.resource)) {
                _action.resource = item.resource;
            }

            resource.action.push(_action);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/RequestGroup"]
    };

    return resource;
}

/**
  * Create a FHIR ResearchDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function researchDefinition(type, props) {
    const mappings = {
        "ResearchDefinition": researchDefinition_ResearchDefinition
    };

    return mappings[type](props)
}

function researchDefinition_ResearchDefinition(props) {
    const resource = {
        resourceType: "ResearchDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ResearchDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.shortTitle)) {
        resource.shortTitle = props.shortTitle;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.subject)) {
        util.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.library)) {
        resource.library = props.library;
    }

    if (!_.isNil(props.population)) {
        resource.population = util.reference(props.population);
    }

    if (!_.isNil(props.exposure)) {
        resource.exposure = util.reference(props.exposure);
    }

    if (!_.isNil(props.exposureAlternative)) {
        resource.exposureAlternative = util.reference(props.exposureAlternative);
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = util.reference(props.outcome);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ResearchDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR ResearchElementDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function researchElementDefinition(type, props) {
    const mappings = {
        "ResearchElementDefinition": researchElementDefinition_ResearchElementDefinition
    };

    return mappings[type](props)
}

function researchElementDefinition_ResearchElementDefinition(props) {
    const resource = {
        resourceType: "ResearchElementDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ResearchElementDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.shortTitle)) {
        resource.shortTitle = props.shortTitle;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.subject)) {
        util.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.library)) {
        resource.library = props.library;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.variableType)) {
        resource.variableType = props.variableType;
    }

    if (!_.isNil(props.characteristic)) {
        let src = props.characteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.characteristic = [];

        for (let item of src) {
            let _characteristic = {};

            if (!_.isNil(item.id)) {
                _characteristic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _characteristic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.definition)) {
                _characteristic.definition = item.definition;
            }

            if (!_.isNil(item.usageContext)) {
                _characteristic.usageContext = item.usageContext;
            }

            if (!_.isNil(item.exclude)) {
                _characteristic.exclude = item.exclude;
            }

            if (!_.isNil(item.unitOfMeasure)) {
                _characteristic.unitOfMeasure = item.unitOfMeasure;
            }

            if (!_.isNil(item.studyEffectiveDescription)) {
                _characteristic.studyEffectiveDescription = item.studyEffectiveDescription;
            }

            if (!_.isNil(item.studyEffective)) {
                _characteristic.studyEffective = item.studyEffective;
            }

            if (!_.isNil(item.studyEffectiveTimeFromStart)) {
                _characteristic.studyEffectiveTimeFromStart = item.studyEffectiveTimeFromStart;
            }

            if (!_.isNil(item.studyEffectiveGroupMeasure)) {
                _characteristic.studyEffectiveGroupMeasure = item.studyEffectiveGroupMeasure;
            }

            if (!_.isNil(item.participantEffectiveDescription)) {
                _characteristic.participantEffectiveDescription = item.participantEffectiveDescription;
            }

            if (!_.isNil(item.participantEffective)) {
                _characteristic.participantEffective = item.participantEffective;
            }

            if (!_.isNil(item.participantEffectiveTimeFromStart)) {
                _characteristic.participantEffectiveTimeFromStart = item.participantEffectiveTimeFromStart;
            }

            if (!_.isNil(item.participantEffectiveGroupMeasure)) {
                _characteristic.participantEffectiveGroupMeasure = item.participantEffectiveGroupMeasure;
            }

            resource.characteristic.push(_characteristic);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ResearchElementDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR ResearchStudy resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function researchStudy(type, props) {
    const mappings = {
        "ResearchStudy": researchStudy_ResearchStudy
    };

    return mappings[type](props)
}

function researchStudy_ResearchStudy(props) {
    const resource = {
        resourceType: "ResearchStudy",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ResearchStudy</b></p></div>"
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

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.protocol)) {
        if (!Array.isArray(props.protocol)) { props.protocol = [props.protocol]; }
        resource.protocol = util.reference(props.protocol);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.primaryPurposeType)) {
        resource.primaryPurposeType = props.primaryPurposeType;
    }

    if (!_.isNil(props.phase)) {
        resource.phase = props.phase;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.condition)) {
        resource.condition = props.condition;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.keyword)) {
        resource.keyword = props.keyword;
    }

    if (!_.isNil(props.location)) {
        resource.location = props.location;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.enrollment)) {
        if (!Array.isArray(props.enrollment)) { props.enrollment = [props.enrollment]; }
        resource.enrollment = util.reference(props.enrollment);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.sponsor)) {
        resource.sponsor = util.reference(props.sponsor);
    }

    if (!_.isNil(props.principalInvestigator)) {
        resource.principalInvestigator = util.reference(props.principalInvestigator);
    }

    if (!_.isNil(props.site)) {
        if (!Array.isArray(props.site)) { props.site = [props.site]; }
        resource.site = util.reference(props.site);
    }

    if (!_.isNil(props.reasonStopped)) {
        resource.reasonStopped = props.reasonStopped;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.arm)) {
        let src = props.arm;
        if (!Array.isArray(src)) { src = [src]; }
        resource.arm = [];

        for (let item of src) {
            let _arm = {};

            if (!_.isNil(item.id)) {
                _arm.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _arm.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _arm.name = item.name;
            }

            if (!_.isNil(item.type)) {
                _arm.type = item.type;
            }

            if (!_.isNil(item.description)) {
                _arm.description = item.description;
            }

            resource.arm.push(_arm);
        }
    }

    if (!_.isNil(props.objective)) {
        let src = props.objective;
        if (!Array.isArray(src)) { src = [src]; }
        resource.objective = [];

        for (let item of src) {
            let _objective = {};

            if (!_.isNil(item.id)) {
                _objective.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _objective.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _objective.name = item.name;
            }

            if (!_.isNil(item.type)) {
                _objective.type = item.type;
            }

            resource.objective.push(_objective);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ResearchStudy"]
    };

    return resource;
}

/**
  * Create a FHIR ResearchSubject resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function researchSubject(type, props) {
    const mappings = {
        "ResearchSubject": researchSubject_ResearchSubject
    };

    return mappings[type](props)
}

function researchSubject_ResearchSubject(props) {
    const resource = {
        resourceType: "ResearchSubject",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ResearchSubject</b></p></div>"
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

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.study)) {
        resource.study = util.reference(props.study);
    }

    if (!_.isNil(props.individual)) {
        resource.individual = util.reference(props.individual);
    }

    if (!_.isNil(props.assignedArm)) {
        resource.assignedArm = props.assignedArm;
    }

    if (!_.isNil(props.actualArm)) {
        resource.actualArm = props.actualArm;
    }

    if (!_.isNil(props.consent)) {
        resource.consent = util.reference(props.consent);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ResearchSubject"]
    };

    return resource;
}

/**
  * Create a FHIR Resource resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function resource(type, props) {
    const mappings = {
        "Resource": resource_Resource
    };

    return mappings[type](props)
}

function resource_Resource(props) {
    const resource = {
        resourceType: "Resource",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Resource</b></p></div>"
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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Resource"]
    };

    return resource;
}

/**
  * Create a FHIR RiskAssessment resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function riskAssessment(type, props) {
    const mappings = {
        "RiskAssessment": riskAssessment_RiskAssessment
    };

    return mappings[type](props)
}

function riskAssessment_RiskAssessment(props) {
    const resource = {
        resourceType: "RiskAssessment",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RiskAssessment</b></p></div>"
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
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.parent)) {
        resource.parent = util.reference(props.parent);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        util.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.condition)) {
        resource.condition = util.reference(props.condition);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.basis)) {
        if (!Array.isArray(props.basis)) { props.basis = [props.basis]; }
        resource.basis = util.reference(props.basis);
    }

    if (!_.isNil(props.prediction)) {
        let src = props.prediction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.prediction = [];

        for (let item of src) {
            let _prediction = {};

            if (!_.isNil(item.id)) {
                _prediction.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _prediction.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.outcome)) {
                _prediction.outcome = item.outcome;
            }

            if (!_.isNil(item.probability)) {
                _prediction.probability = item.probability;
            }

            if (!_.isNil(item.qualitativeRisk)) {
                _prediction.qualitativeRisk = item.qualitativeRisk;
            }

            if (!_.isNil(item.relativeRisk)) {
                _prediction.relativeRisk = item.relativeRisk;
            }

            if (!_.isNil(item.when)) {
                _prediction.when = item.when;
            }

            if (!_.isNil(item.rationale)) {
                _prediction.rationale = item.rationale;
            }

            resource.prediction.push(_prediction);
        }
    }

    if (!_.isNil(props.mitigation)) {
        resource.mitigation = props.mitigation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/RiskAssessment"]
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
        "Schedule": schedule_Schedule
    };

    return mappings[type](props)
}

function schedule_Schedule(props) {
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
        profile: ["http://hl7.org/fhir/StructureDefinition/Schedule"]
    };

    return resource;
}

/**
  * Create a FHIR SearchParameter resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function searchParameter(type, props) {
    const mappings = {
        "SearchParameter": searchParameter_SearchParameter
    };

    return mappings[type](props)
}

function searchParameter_SearchParameter(props) {
    const resource = {
        resourceType: "SearchParameter",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SearchParameter</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.base)) {
        resource.base = props.base;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.expression)) {
        resource.expression = props.expression;
    }

    if (!_.isNil(props.xpath)) {
        resource.xpath = props.xpath;
    }

    if (!_.isNil(props.xpathUsage)) {
        resource.xpathUsage = props.xpathUsage;
    }

    if (!_.isNil(props.target)) {
        resource.target = props.target;
    }

    if (!_.isNil(props.multipleOr)) {
        resource.multipleOr = props.multipleOr;
    }

    if (!_.isNil(props.multipleAnd)) {
        resource.multipleAnd = props.multipleAnd;
    }

    if (!_.isNil(props.comparator)) {
        resource.comparator = props.comparator;
    }

    if (!_.isNil(props.modifier)) {
        resource.modifier = props.modifier;
    }

    if (!_.isNil(props.chain)) {
        resource.chain = props.chain;
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

            if (!_.isNil(item.definition)) {
                _component.definition = item.definition;
            }

            if (!_.isNil(item.expression)) {
                _component.expression = item.expression;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SearchParameter"]
    };

    return resource;
}

/**
  * Create a FHIR ServiceRequest resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function serviceRequest(type, props) {
    const mappings = {
        "ServiceRequest": serviceRequest_ServiceRequest
    };

    return mappings[type](props)
}

function serviceRequest_ServiceRequest(props) {
    const resource = {
        resourceType: "ServiceRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ServiceRequest</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        if (!Array.isArray(props.replaces)) { props.replaces = [props.replaces]; }
        resource.replaces = util.reference(props.replaces);
    }

    if (!_.isNil(props.requisition)) {
        resource.requisition = util.identifier(props.requisition, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.doNotPerform)) {
        resource.doNotPerform = props.doNotPerform;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.orderDetail)) {
        resource.orderDetail = props.orderDetail;
    }

    if (!_.isNil(props.quantity)) {
        util.composite(resource, "quantity", props.quantity);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        util.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.asNeeded)) {
        util.composite(resource, "asNeeded", props.asNeeded);
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.requester)) {
        resource.requester = util.reference(props.requester);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = props.performerType;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.locationCode)) {
        resource.locationCode = props.locationCode;
    }

    if (!_.isNil(props.locationReference)) {
        if (!Array.isArray(props.locationReference)) { props.locationReference = [props.locationReference]; }
        resource.locationReference = util.reference(props.locationReference);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = util.reference(props.insurance);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.specimen)) {
        if (!Array.isArray(props.specimen)) { props.specimen = [props.specimen]; }
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.patientInstruction)) {
        resource.patientInstruction = props.patientInstruction;
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = util.reference(props.relevantHistory);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"]
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
        "Slot": slot_Slot
    };

    return mappings[type](props)
}

function slot_Slot(props) {
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
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
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
        profile: ["http://hl7.org/fhir/StructureDefinition/Slot"]
    };

    return resource;
}

/**
  * Create a FHIR Specimen resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function specimen(type, props) {
    const mappings = {
        "Specimen": specimen_Specimen
    };

    return mappings[type](props)
}

function specimen_Specimen(props) {
    const resource = {
        resourceType: "Specimen",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Specimen</b></p></div>"
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

    if (!_.isNil(props.accessionIdentifier)) {
        resource.accessionIdentifier = util.identifier(props.accessionIdentifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.receivedTime)) {
        resource.receivedTime = props.receivedTime;
    }

    if (!_.isNil(props.parent)) {
        if (!Array.isArray(props.parent)) { props.parent = [props.parent]; }
        resource.parent = util.reference(props.parent);
    }

    if (!_.isNil(props.request)) {
        if (!Array.isArray(props.request)) { props.request = [props.request]; }
        resource.request = util.reference(props.request);
    }

    if (!_.isNil(props.collection)) {
        let src = props.collection;
        let _collection = {};

        if (!_.isNil(src.id)) {
            _collection.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _collection.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.collector)) {
            _collection.collector = src.collector;
        }

        if (!_.isNil(src.collected)) {
            _collection.collected = src.collected;
        }

        if (!_.isNil(src.duration)) {
            _collection.duration = src.duration;
        }

        if (!_.isNil(src.quantity)) {
            _collection.quantity = src.quantity;
        }

        if (!_.isNil(src.method)) {
            _collection.method = src.method;
        }

        if (!_.isNil(src.bodySite)) {
            _collection.bodySite = src.bodySite;
        }

        if (!_.isNil(src.fastingStatus)) {
            _collection.fastingStatus = src.fastingStatus;
        }

        resource.collection = _collection;
    }

    if (!_.isNil(props.processing)) {
        let src = props.processing;
        if (!Array.isArray(src)) { src = [src]; }
        resource.processing = [];

        for (let item of src) {
            let _processing = {};

            if (!_.isNil(item.id)) {
                _processing.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _processing.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _processing.description = item.description;
            }

            if (!_.isNil(item.procedure)) {
                _processing.procedure = item.procedure;
            }

            if (!_.isNil(item.additive)) {
                _processing.additive = item.additive;
            }

            if (!_.isNil(item.time)) {
                _processing.time = item.time;
            }

            resource.processing.push(_processing);
        }
    }

    if (!_.isNil(props.container)) {
        let src = props.container;
        if (!Array.isArray(src)) { src = [src]; }
        resource.container = [];

        for (let item of src) {
            let _container = {};

            if (!_.isNil(item.id)) {
                _container.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _container.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _container.identifier = item.identifier;
            }

            if (!_.isNil(item.description)) {
                _container.description = item.description;
            }

            if (!_.isNil(item.type)) {
                _container.type = item.type;
            }

            if (!_.isNil(item.capacity)) {
                _container.capacity = item.capacity;
            }

            if (!_.isNil(item.specimenQuantity)) {
                _container.specimenQuantity = item.specimenQuantity;
            }

            if (!_.isNil(item.additive)) {
                _container.additive = item.additive;
            }

            resource.container.push(_container);
        }
    }

    if (!_.isNil(props.condition)) {
        resource.condition = props.condition;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Specimen"]
    };

    return resource;
}

/**
  * Create a FHIR SpecimenDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function specimenDefinition(type, props) {
    const mappings = {
        "SpecimenDefinition": specimenDefinition_SpecimenDefinition
    };

    return mappings[type](props)
}

function specimenDefinition_SpecimenDefinition(props) {
    const resource = {
        resourceType: "SpecimenDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SpecimenDefinition</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.typeCollected)) {
        resource.typeCollected = props.typeCollected;
    }

    if (!_.isNil(props.patientPreparation)) {
        resource.patientPreparation = props.patientPreparation;
    }

    if (!_.isNil(props.timeAspect)) {
        resource.timeAspect = props.timeAspect;
    }

    if (!_.isNil(props.collection)) {
        resource.collection = props.collection;
    }

    if (!_.isNil(props.typeTested)) {
        let src = props.typeTested;
        if (!Array.isArray(src)) { src = [src]; }
        resource.typeTested = [];

        for (let item of src) {
            let _typeTested = {};

            if (!_.isNil(item.id)) {
                _typeTested.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _typeTested.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.isDerived)) {
                _typeTested.isDerived = item.isDerived;
            }

            if (!_.isNil(item.type)) {
                _typeTested.type = item.type;
            }

            if (!_.isNil(item.preference)) {
                _typeTested.preference = item.preference;
            }

            if (!_.isNil(item.container)) {
                _typeTested.container = item.container;
            }

            if (!_.isNil(item.requirement)) {
                _typeTested.requirement = item.requirement;
            }

            if (!_.isNil(item.retentionTime)) {
                _typeTested.retentionTime = item.retentionTime;
            }

            if (!_.isNil(item.rejectionCriterion)) {
                _typeTested.rejectionCriterion = item.rejectionCriterion;
            }

            if (!_.isNil(item.handling)) {
                _typeTested.handling = item.handling;
            }

            resource.typeTested.push(_typeTested);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SpecimenDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR StructureDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function structureDefinition(type, props) {
    const mappings = {
        "StructureDefinition": structureDefinition_StructureDefinition
    };

    return mappings[type](props)
}

function structureDefinition_StructureDefinition(props) {
    const resource = {
        resourceType: "StructureDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>StructureDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.keyword)) {
        resource.keyword = props.keyword;
    }

    if (!_.isNil(props.fhirVersion)) {
        resource.fhirVersion = props.fhirVersion;
    }

    if (!_.isNil(props.mapping)) {
        let src = props.mapping;
        if (!Array.isArray(src)) { src = [src]; }
        resource.mapping = [];

        for (let item of src) {
            let _mapping = {};

            if (!_.isNil(item.id)) {
                _mapping.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _mapping.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identity)) {
                _mapping.identity = item.identity;
            }

            if (!_.isNil(item.uri)) {
                _mapping.uri = item.uri;
            }

            if (!_.isNil(item.name)) {
                _mapping.name = item.name;
            }

            if (!_.isNil(item.comment)) {
                _mapping.comment = item.comment;
            }

            resource.mapping.push(_mapping);
        }
    }

    if (!_.isNil(props.kind)) {
        resource.kind = props.kind;
    }

    if (!_.isNil(props.abstract)) {
        resource.abstract = props.abstract;
    }

    if (!_.isNil(props.context)) {
        let src = props.context;
        if (!Array.isArray(src)) { src = [src]; }
        resource.context = [];

        for (let item of src) {
            let _context = {};

            if (!_.isNil(item.id)) {
                _context.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _context.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _context.type = item.type;
            }

            if (!_.isNil(item.expression)) {
                _context.expression = item.expression;
            }

            resource.context.push(_context);
        }
    }

    if (!_.isNil(props.contextInvariant)) {
        resource.contextInvariant = props.contextInvariant;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.baseDefinition)) {
        resource.baseDefinition = props.baseDefinition;
    }

    if (!_.isNil(props.derivation)) {
        resource.derivation = props.derivation;
    }

    if (!_.isNil(props.snapshot)) {
        let src = props.snapshot;
        let _snapshot = {};

        if (!_.isNil(src.id)) {
            _snapshot.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _snapshot.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.element)) {
            _snapshot.element = src.element;
        }

        resource.snapshot = _snapshot;
    }

    if (!_.isNil(props.differential)) {
        let src = props.differential;
        let _differential = {};

        if (!_.isNil(src.id)) {
            _differential.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _differential.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.element)) {
            _differential.element = src.element;
        }

        resource.differential = _differential;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR StructureMap resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function structureMap(type, props) {
    const mappings = {
        "StructureMap": structureMap_StructureMap
    };

    return mappings[type](props)
}

function structureMap_StructureMap(props) {
    const resource = {
        resourceType: "StructureMap",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>StructureMap</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.structure)) {
        let src = props.structure;
        if (!Array.isArray(src)) { src = [src]; }
        resource.structure = [];

        for (let item of src) {
            let _structure = {};

            if (!_.isNil(item.id)) {
                _structure.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _structure.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.url)) {
                _structure.url = item.url;
            }

            if (!_.isNil(item.mode)) {
                _structure.mode = item.mode;
            }

            if (!_.isNil(item.alias)) {
                _structure.alias = item.alias;
            }

            if (!_.isNil(item.documentation)) {
                _structure.documentation = item.documentation;
            }

            resource.structure.push(_structure);
        }
    }

    if (!_.isNil(props.import)) {
        resource.import = props.import;
    }

    if (!_.isNil(props.group)) {
        let src = props.group;
        if (!Array.isArray(src)) { src = [src]; }
        resource.group = [];

        for (let item of src) {
            let _group = {};

            if (!_.isNil(item.id)) {
                _group.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _group.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _group.name = item.name;
            }

            if (!_.isNil(item.extends)) {
                _group.extends = item.extends;
            }

            if (!_.isNil(item.typeMode)) {
                _group.typeMode = item.typeMode;
            }

            if (!_.isNil(item.documentation)) {
                _group.documentation = item.documentation;
            }

            if (!_.isNil(item.input)) {
                _group.input = item.input;
            }

            if (!_.isNil(item.rule)) {
                _group.rule = item.rule;
            }

            resource.group.push(_group);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/StructureMap"]
    };

    return resource;
}

/**
  * Create a FHIR Subscription resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function subscription(type, props) {
    const mappings = {
        "Subscription": subscription_Subscription
    };

    return mappings[type](props)
}

function subscription_Subscription(props) {
    const resource = {
        resourceType: "Subscription",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Subscription</b></p></div>"
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.end)) {
        resource.end = props.end;
    }

    if (!_.isNil(props.reason)) {
        resource.reason = props.reason;
    }

    if (!_.isNil(props.criteria)) {
        resource.criteria = props.criteria;
    }

    if (!_.isNil(props.error)) {
        resource.error = props.error;
    }

    if (!_.isNil(props.channel)) {
        let src = props.channel;
        let _channel = {};

        if (!_.isNil(src.id)) {
            _channel.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _channel.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _channel.type = src.type;
        }

        if (!_.isNil(src.endpoint)) {
            _channel.endpoint = src.endpoint;
        }

        if (!_.isNil(src.payload)) {
            _channel.payload = src.payload;
        }

        if (!_.isNil(src.header)) {
            _channel.header = src.header;
        }

        resource.channel = _channel;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Subscription"]
    };

    return resource;
}

/**
  * Create a FHIR SubscriptionStatus resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function subscriptionStatus(type, props) {
    const mappings = {
        "SubscriptionStatus": subscriptionStatus_SubscriptionStatus
    };

    return mappings[type](props)
}

function subscriptionStatus_SubscriptionStatus(props) {
    const resource = {
        resourceType: "SubscriptionStatus",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SubscriptionStatus</b></p></div>"
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.eventsSinceSubscriptionStart)) {
        resource.eventsSinceSubscriptionStart = props.eventsSinceSubscriptionStart;
    }

    if (!_.isNil(props.notificationEvent)) {
        let src = props.notificationEvent;
        if (!Array.isArray(src)) { src = [src]; }
        resource.notificationEvent = [];

        for (let item of src) {
            let _notificationEvent = {};

            if (!_.isNil(item.id)) {
                _notificationEvent.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _notificationEvent.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.eventNumber)) {
                _notificationEvent.eventNumber = item.eventNumber;
            }

            if (!_.isNil(item.timestamp)) {
                _notificationEvent.timestamp = item.timestamp;
            }

            if (!_.isNil(item.focus)) {
                _notificationEvent.focus = item.focus;
            }

            if (!_.isNil(item.additionalContext)) {
                _notificationEvent.additionalContext = item.additionalContext;
            }

            resource.notificationEvent.push(_notificationEvent);
        }
    }

    if (!_.isNil(props.subscription)) {
        resource.subscription = util.reference(props.subscription);
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.error)) {
        resource.error = props.error;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SubscriptionStatus"]
    };

    return resource;
}

/**
  * Create a FHIR SubscriptionTopic resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function subscriptionTopic(type, props) {
    const mappings = {
        "SubscriptionTopic": subscriptionTopic_SubscriptionTopic
    };

    return mappings[type](props)
}

function subscriptionTopic_SubscriptionTopic(props) {
    const resource = {
        resourceType: "SubscriptionTopic",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SubscriptionTopic</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.resourceTrigger)) {
        let src = props.resourceTrigger;
        if (!Array.isArray(src)) { src = [src]; }
        resource.resourceTrigger = [];

        for (let item of src) {
            let _resourceTrigger = {};

            if (!_.isNil(item.id)) {
                _resourceTrigger.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _resourceTrigger.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _resourceTrigger.description = item.description;
            }

            if (!_.isNil(item.resource)) {
                _resourceTrigger.resource = item.resource;
            }

            if (!_.isNil(item.supportedInteraction)) {
                _resourceTrigger.supportedInteraction = item.supportedInteraction;
            }

            if (!_.isNil(item.queryCriteria)) {
                _resourceTrigger.queryCriteria = item.queryCriteria;
            }

            if (!_.isNil(item.fhirPathCriteria)) {
                _resourceTrigger.fhirPathCriteria = item.fhirPathCriteria;
            }

            resource.resourceTrigger.push(_resourceTrigger);
        }
    }

    if (!_.isNil(props.eventTrigger)) {
        let src = props.eventTrigger;
        if (!Array.isArray(src)) { src = [src]; }
        resource.eventTrigger = [];

        for (let item of src) {
            let _eventTrigger = {};

            if (!_.isNil(item.id)) {
                _eventTrigger.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _eventTrigger.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _eventTrigger.description = item.description;
            }

            if (!_.isNil(item.event)) {
                _eventTrigger.event = item.event;
            }

            if (!_.isNil(item.resource)) {
                _eventTrigger.resource = item.resource;
            }

            resource.eventTrigger.push(_eventTrigger);
        }
    }

    if (!_.isNil(props.canFilterBy)) {
        let src = props.canFilterBy;
        if (!Array.isArray(src)) { src = [src]; }
        resource.canFilterBy = [];

        for (let item of src) {
            let _canFilterBy = {};

            if (!_.isNil(item.id)) {
                _canFilterBy.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _canFilterBy.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _canFilterBy.description = item.description;
            }

            if (!_.isNil(item.resource)) {
                _canFilterBy.resource = item.resource;
            }

            if (!_.isNil(item.filterParameter)) {
                _canFilterBy.filterParameter = item.filterParameter;
            }

            if (!_.isNil(item.filterDefinition)) {
                _canFilterBy.filterDefinition = item.filterDefinition;
            }

            if (!_.isNil(item.modifier)) {
                _canFilterBy.modifier = item.modifier;
            }

            resource.canFilterBy.push(_canFilterBy);
        }
    }

    if (!_.isNil(props.notificationShape)) {
        let src = props.notificationShape;
        if (!Array.isArray(src)) { src = [src]; }
        resource.notificationShape = [];

        for (let item of src) {
            let _notificationShape = {};

            if (!_.isNil(item.id)) {
                _notificationShape.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _notificationShape.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.resource)) {
                _notificationShape.resource = item.resource;
            }

            if (!_.isNil(item.include)) {
                _notificationShape.include = item.include;
            }

            if (!_.isNil(item.revInclude)) {
                _notificationShape.revInclude = item.revInclude;
            }

            resource.notificationShape.push(_notificationShape);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SubscriptionTopic"]
    };

    return resource;
}

/**
  * Create a FHIR Substance resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function substance(type, props) {
    const mappings = {
        "Substance": substance_Substance
    };

    return mappings[type](props)
}

function substance_Substance(props) {
    const resource = {
        resourceType: "Substance",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Substance</b></p></div>"
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

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.instance)) {
        let src = props.instance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.instance = [];

        for (let item of src) {
            let _instance = {};

            if (!_.isNil(item.id)) {
                _instance.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _instance.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _instance.identifier = item.identifier;
            }

            if (!_.isNil(item.expiry)) {
                _instance.expiry = item.expiry;
            }

            if (!_.isNil(item.quantity)) {
                _instance.quantity = item.quantity;
            }

            resource.instance.push(_instance);
        }
    }

    if (!_.isNil(props.ingredient)) {
        let src = props.ingredient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.ingredient = [];

        for (let item of src) {
            let _ingredient = {};

            if (!_.isNil(item.id)) {
                _ingredient.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _ingredient.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.quantity)) {
                _ingredient.quantity = item.quantity;
            }

            if (!_.isNil(item.substance)) {
                _ingredient.substance = item.substance;
            }

            resource.ingredient.push(_ingredient);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Substance"]
    };

    return resource;
}

/**
  * Create a FHIR SubstanceDefinition resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function substanceDefinition(type, props) {
    const mappings = {
        "SubstanceDefinition": substanceDefinition_SubstanceDefinition
    };

    return mappings[type](props)
}

function substanceDefinition_SubstanceDefinition(props) {
    const resource = {
        resourceType: "SubstanceDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SubstanceDefinition</b></p></div>"
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

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.classification)) {
        resource.classification = props.classification;
    }

    if (!_.isNil(props.domain)) {
        resource.domain = props.domain;
    }

    if (!_.isNil(props.grade)) {
        resource.grade = props.grade;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.informationSource)) {
        if (!Array.isArray(props.informationSource)) { props.informationSource = [props.informationSource]; }
        resource.informationSource = util.reference(props.informationSource);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = util.reference(props.manufacturer);
    }

    if (!_.isNil(props.supplier)) {
        if (!Array.isArray(props.supplier)) { props.supplier = [props.supplier]; }
        resource.supplier = util.reference(props.supplier);
    }

    if (!_.isNil(props.moiety)) {
        let src = props.moiety;
        if (!Array.isArray(src)) { src = [src]; }
        resource.moiety = [];

        for (let item of src) {
            let _moiety = {};

            if (!_.isNil(item.id)) {
                _moiety.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _moiety.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.role)) {
                _moiety.role = item.role;
            }

            if (!_.isNil(item.identifier)) {
                _moiety.identifier = item.identifier;
            }

            if (!_.isNil(item.name)) {
                _moiety.name = item.name;
            }

            if (!_.isNil(item.stereochemistry)) {
                _moiety.stereochemistry = item.stereochemistry;
            }

            if (!_.isNil(item.opticalActivity)) {
                _moiety.opticalActivity = item.opticalActivity;
            }

            if (!_.isNil(item.molecularFormula)) {
                _moiety.molecularFormula = item.molecularFormula;
            }

            if (!_.isNil(item.amount)) {
                _moiety.amount = item.amount;
            }

            if (!_.isNil(item.measurementType)) {
                _moiety.measurementType = item.measurementType;
            }

            resource.moiety.push(_moiety);
        }
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {};

            if (!_.isNil(item.id)) {
                _property.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _property.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _property.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _property.value = item.value;
            }

            resource.property.push(_property);
        }
    }

    if (!_.isNil(props.molecularWeight)) {
        let src = props.molecularWeight;
        if (!Array.isArray(src)) { src = [src]; }
        resource.molecularWeight = [];

        for (let item of src) {
            let _molecularWeight = {};

            if (!_.isNil(item.id)) {
                _molecularWeight.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _molecularWeight.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.method)) {
                _molecularWeight.method = item.method;
            }

            if (!_.isNil(item.type)) {
                _molecularWeight.type = item.type;
            }

            if (!_.isNil(item.amount)) {
                _molecularWeight.amount = item.amount;
            }

            resource.molecularWeight.push(_molecularWeight);
        }
    }

    if (!_.isNil(props.structure)) {
        let src = props.structure;
        let _structure = {};

        if (!_.isNil(src.id)) {
            _structure.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _structure.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.stereochemistry)) {
            _structure.stereochemistry = src.stereochemistry;
        }

        if (!_.isNil(src.opticalActivity)) {
            _structure.opticalActivity = src.opticalActivity;
        }

        if (!_.isNil(src.molecularFormula)) {
            _structure.molecularFormula = src.molecularFormula;
        }

        if (!_.isNil(src.molecularFormulaByMoiety)) {
            _structure.molecularFormulaByMoiety = src.molecularFormulaByMoiety;
        }

        if (!_.isNil(src.technique)) {
            _structure.technique = src.technique;
        }

        if (!_.isNil(src.sourceDocument)) {
            _structure.sourceDocument = src.sourceDocument;
        }

        if (!_.isNil(src.representation)) {
            _structure.representation = src.representation;
        }

        resource.structure = _structure;
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

            if (!_.isNil(item.modifierExtension)) {
                _code.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _code.code = item.code;
            }

            if (!_.isNil(item.status)) {
                _code.status = item.status;
            }

            if (!_.isNil(item.statusDate)) {
                _code.statusDate = item.statusDate;
            }

            if (!_.isNil(item.note)) {
                _code.note = item.note;
            }

            if (!_.isNil(item.source)) {
                _code.source = item.source;
            }

            resource.code.push(_code);
        }
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

            if (!_.isNil(item.modifierExtension)) {
                _name.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _name.name = item.name;
            }

            if (!_.isNil(item.type)) {
                _name.type = item.type;
            }

            if (!_.isNil(item.status)) {
                _name.status = item.status;
            }

            if (!_.isNil(item.preferred)) {
                _name.preferred = item.preferred;
            }

            if (!_.isNil(item.language)) {
                _name.language = item.language;
            }

            if (!_.isNil(item.domain)) {
                _name.domain = item.domain;
            }

            if (!_.isNil(item.jurisdiction)) {
                _name.jurisdiction = item.jurisdiction;
            }

            if (!_.isNil(item.official)) {
                _name.official = item.official;
            }

            if (!_.isNil(item.source)) {
                _name.source = item.source;
            }

            resource.name.push(_name);
        }
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

            if (!_.isNil(item.modifierExtension)) {
                _relationship.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.substanceDefinition)) {
                _relationship.substanceDefinition = item.substanceDefinition;
            }

            if (!_.isNil(item.type)) {
                _relationship.type = item.type;
            }

            if (!_.isNil(item.isDefining)) {
                _relationship.isDefining = item.isDefining;
            }

            if (!_.isNil(item.amount)) {
                _relationship.amount = item.amount;
            }

            if (!_.isNil(item.ratioHighLimitAmount)) {
                _relationship.ratioHighLimitAmount = item.ratioHighLimitAmount;
            }

            if (!_.isNil(item.comparator)) {
                _relationship.comparator = item.comparator;
            }

            if (!_.isNil(item.source)) {
                _relationship.source = item.source;
            }

            resource.relationship.push(_relationship);
        }
    }

    if (!_.isNil(props.sourceMaterial)) {
        let src = props.sourceMaterial;
        let _sourceMaterial = {};

        if (!_.isNil(src.id)) {
            _sourceMaterial.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _sourceMaterial.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _sourceMaterial.type = src.type;
        }

        if (!_.isNil(src.genus)) {
            _sourceMaterial.genus = src.genus;
        }

        if (!_.isNil(src.species)) {
            _sourceMaterial.species = src.species;
        }

        if (!_.isNil(src.part)) {
            _sourceMaterial.part = src.part;
        }

        if (!_.isNil(src.countryOfOrigin)) {
            _sourceMaterial.countryOfOrigin = src.countryOfOrigin;
        }

        resource.sourceMaterial = _sourceMaterial;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"]
    };

    return resource;
}

/**
  * Create a FHIR SupplyDelivery resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function supplyDelivery(type, props) {
    const mappings = {
        "SupplyDelivery": supplyDelivery_SupplyDelivery
    };

    return mappings[type](props)
}

function supplyDelivery_SupplyDelivery(props) {
    const resource = {
        resourceType: "SupplyDelivery",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SupplyDelivery</b></p></div>"
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

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.suppliedItem)) {
        let src = props.suppliedItem;
        let _suppliedItem = {};

        if (!_.isNil(src.id)) {
            _suppliedItem.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _suppliedItem.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.quantity)) {
            _suppliedItem.quantity = src.quantity;
        }

        if (!_.isNil(src.item)) {
            _suppliedItem.item = src.item;
        }

        resource.suppliedItem = _suppliedItem;
    }

    if (!_.isNil(props.occurrence)) {
        util.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.supplier)) {
        resource.supplier = util.reference(props.supplier);
    }

    if (!_.isNil(props.destination)) {
        resource.destination = util.reference(props.destination);
    }

    if (!_.isNil(props.receiver)) {
        if (!Array.isArray(props.receiver)) { props.receiver = [props.receiver]; }
        resource.receiver = util.reference(props.receiver);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SupplyDelivery"]
    };

    return resource;
}

/**
  * Create a FHIR SupplyRequest resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function supplyRequest(type, props) {
    const mappings = {
        "SupplyRequest": supplyRequest_SupplyRequest
    };

    return mappings[type](props)
}

function supplyRequest_SupplyRequest(props) {
    const resource = {
        resourceType: "SupplyRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SupplyRequest</b></p></div>"
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

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.item)) {
        util.composite(resource, "item", props.item);
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.parameter)) {
        let src = props.parameter;
        if (!Array.isArray(src)) { src = [src]; }
        resource.parameter = [];

        for (let item of src) {
            let _parameter = {};

            if (!_.isNil(item.id)) {
                _parameter.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _parameter.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _parameter.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _parameter.value = item.value;
            }

            resource.parameter.push(_parameter);
        }
    }

    if (!_.isNil(props.occurrence)) {
        util.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.requester)) {
        resource.requester = util.reference(props.requester);
    }

    if (!_.isNil(props.supplier)) {
        if (!Array.isArray(props.supplier)) { props.supplier = [props.supplier]; }
        resource.supplier = util.reference(props.supplier);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.deliverFrom)) {
        resource.deliverFrom = util.reference(props.deliverFrom);
    }

    if (!_.isNil(props.deliverTo)) {
        resource.deliverTo = util.reference(props.deliverTo);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SupplyRequest"]
    };

    return resource;
}

/**
  * Create a FHIR Task resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function task(type, props) {
    const mappings = {
        "Task": task_Task
    };

    return mappings[type](props)
}

function task_Task(props) {
    const resource = {
        resourceType: "Task",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Task</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = util.identifier(props.groupIdentifier, undefined);
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

    if (!_.isNil(props.businessStatus)) {
        resource.businessStatus = props.businessStatus;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.for)) {
        resource.for = util.reference(props.for);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.executionPeriod)) {
        resource.executionPeriod = props.executionPeriod;
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.lastModified)) {
        resource.lastModified = props.lastModified;
    }

    if (!_.isNil(props.requester)) {
        resource.requester = util.reference(props.requester);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = props.performerType;
    }

    if (!_.isNil(props.owner)) {
        resource.owner = util.reference(props.owner);
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = util.reference(props.insurance);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = util.reference(props.relevantHistory);
    }

    if (!_.isNil(props.restriction)) {
        let src = props.restriction;
        let _restriction = {};

        if (!_.isNil(src.id)) {
            _restriction.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _restriction.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.repetitions)) {
            _restriction.repetitions = src.repetitions;
        }

        if (!_.isNil(src.period)) {
            _restriction.period = src.period;
        }

        if (!_.isNil(src.recipient)) {
            _restriction.recipient = src.recipient;
        }

        resource.restriction = _restriction;
    }

    if (!_.isNil(props.input)) {
        let src = props.input;
        if (!Array.isArray(src)) { src = [src]; }
        resource.input = [];

        for (let item of src) {
            let _input = {};

            if (!_.isNil(item.id)) {
                _input.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _input.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _input.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _input.value = item.value;
            }

            resource.input.push(_input);
        }
    }

    if (!_.isNil(props.output)) {
        let src = props.output;
        if (!Array.isArray(src)) { src = [src]; }
        resource.output = [];

        for (let item of src) {
            let _output = {};

            if (!_.isNil(item.id)) {
                _output.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _output.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _output.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _output.value = item.value;
            }

            resource.output.push(_output);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Task"]
    };

    return resource;
}

/**
  * Create a FHIR TerminologyCapabilities resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function terminologyCapabilities(type, props) {
    const mappings = {
        "TerminologyCapabilities": terminologyCapabilities_TerminologyCapabilities
    };

    return mappings[type](props)
}

function terminologyCapabilities_TerminologyCapabilities(props) {
    const resource = {
        resourceType: "TerminologyCapabilities",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>TerminologyCapabilities</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.kind)) {
        resource.kind = props.kind;
    }

    if (!_.isNil(props.software)) {
        let src = props.software;
        let _software = {};

        if (!_.isNil(src.id)) {
            _software.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _software.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.name)) {
            _software.name = src.name;
        }

        if (!_.isNil(src.version)) {
            _software.version = src.version;
        }

        resource.software = _software;
    }

    if (!_.isNil(props.implementation)) {
        let src = props.implementation;
        let _implementation = {};

        if (!_.isNil(src.id)) {
            _implementation.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _implementation.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.description)) {
            _implementation.description = src.description;
        }

        if (!_.isNil(src.url)) {
            _implementation.url = src.url;
        }

        resource.implementation = _implementation;
    }

    if (!_.isNil(props.lockedDate)) {
        resource.lockedDate = props.lockedDate;
    }

    if (!_.isNil(props.codeSystem)) {
        let src = props.codeSystem;
        if (!Array.isArray(src)) { src = [src]; }
        resource.codeSystem = [];

        for (let item of src) {
            let _codeSystem = {};

            if (!_.isNil(item.id)) {
                _codeSystem.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _codeSystem.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.uri)) {
                _codeSystem.uri = item.uri;
            }

            if (!_.isNil(item.version)) {
                _codeSystem.version = item.version;
            }

            if (!_.isNil(item.subsumption)) {
                _codeSystem.subsumption = item.subsumption;
            }

            resource.codeSystem.push(_codeSystem);
        }
    }

    if (!_.isNil(props.expansion)) {
        let src = props.expansion;
        let _expansion = {};

        if (!_.isNil(src.id)) {
            _expansion.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _expansion.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.hierarchical)) {
            _expansion.hierarchical = src.hierarchical;
        }

        if (!_.isNil(src.paging)) {
            _expansion.paging = src.paging;
        }

        if (!_.isNil(src.incomplete)) {
            _expansion.incomplete = src.incomplete;
        }

        if (!_.isNil(src.parameter)) {
            _expansion.parameter = src.parameter;
        }

        if (!_.isNil(src.textFilter)) {
            _expansion.textFilter = src.textFilter;
        }

        resource.expansion = _expansion;
    }

    if (!_.isNil(props.codeSearch)) {
        resource.codeSearch = props.codeSearch;
    }

    if (!_.isNil(props.validateCode)) {
        let src = props.validateCode;
        let _validateCode = {};

        if (!_.isNil(src.id)) {
            _validateCode.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _validateCode.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.translations)) {
            _validateCode.translations = src.translations;
        }

        resource.validateCode = _validateCode;
    }

    if (!_.isNil(props.translation)) {
        let src = props.translation;
        let _translation = {};

        if (!_.isNil(src.id)) {
            _translation.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _translation.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.needsMap)) {
            _translation.needsMap = src.needsMap;
        }

        resource.translation = _translation;
    }

    if (!_.isNil(props.closure)) {
        let src = props.closure;
        let _closure = {};

        if (!_.isNil(src.id)) {
            _closure.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _closure.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.translation)) {
            _closure.translation = src.translation;
        }

        resource.closure = _closure;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/TerminologyCapabilities"]
    };

    return resource;
}

/**
  * Create a FHIR TestReport resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function testReport(type, props) {
    const mappings = {
        "TestReport": testReport_TestReport
    };

    return mappings[type](props)
}

function testReport_TestReport(props) {
    const resource = {
        resourceType: "TestReport",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>TestReport</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.testScript)) {
        resource.testScript = util.reference(props.testScript);
    }

    if (!_.isNil(props.result)) {
        resource.result = props.result;
    }

    if (!_.isNil(props.score)) {
        resource.score = props.score;
    }

    if (!_.isNil(props.tester)) {
        resource.tester = props.tester;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
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

            if (!_.isNil(item.uri)) {
                _participant.uri = item.uri;
            }

            if (!_.isNil(item.display)) {
                _participant.display = item.display;
            }

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.setup)) {
        let src = props.setup;
        let _setup = {};

        if (!_.isNil(src.id)) {
            _setup.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _setup.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.action)) {
            _setup.action = src.action;
        }

        resource.setup = _setup;
    }

    if (!_.isNil(props.test)) {
        let src = props.test;
        if (!Array.isArray(src)) { src = [src]; }
        resource.test = [];

        for (let item of src) {
            let _test = {};

            if (!_.isNil(item.id)) {
                _test.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _test.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _test.name = item.name;
            }

            if (!_.isNil(item.description)) {
                _test.description = item.description;
            }

            if (!_.isNil(item.action)) {
                _test.action = item.action;
            }

            resource.test.push(_test);
        }
    }

    if (!_.isNil(props.teardown)) {
        let src = props.teardown;
        let _teardown = {};

        if (!_.isNil(src.id)) {
            _teardown.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _teardown.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.action)) {
            _teardown.action = src.action;
        }

        resource.teardown = _teardown;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/TestReport"]
    };

    return resource;
}

/**
  * Create a FHIR TestScript resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function testScript(type, props) {
    const mappings = {
        "TestScript": testScript_TestScript
    };

    return mappings[type](props)
}

function testScript_TestScript(props) {
    const resource = {
        resourceType: "TestScript",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>TestScript</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.origin)) {
        let src = props.origin;
        if (!Array.isArray(src)) { src = [src]; }
        resource.origin = [];

        for (let item of src) {
            let _origin = {};

            if (!_.isNil(item.id)) {
                _origin.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _origin.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.index)) {
                _origin.index = item.index;
            }

            if (!_.isNil(item.profile)) {
                _origin.profile = item.profile;
            }

            resource.origin.push(_origin);
        }
    }

    if (!_.isNil(props.destination)) {
        let src = props.destination;
        if (!Array.isArray(src)) { src = [src]; }
        resource.destination = [];

        for (let item of src) {
            let _destination = {};

            if (!_.isNil(item.id)) {
                _destination.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _destination.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.index)) {
                _destination.index = item.index;
            }

            if (!_.isNil(item.profile)) {
                _destination.profile = item.profile;
            }

            resource.destination.push(_destination);
        }
    }

    if (!_.isNil(props.metadata)) {
        let src = props.metadata;
        let _metadata = {};

        if (!_.isNil(src.id)) {
            _metadata.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _metadata.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.link)) {
            _metadata.link = src.link;
        }

        if (!_.isNil(src.capability)) {
            _metadata.capability = src.capability;
        }

        resource.metadata = _metadata;
    }

    if (!_.isNil(props.fixture)) {
        let src = props.fixture;
        if (!Array.isArray(src)) { src = [src]; }
        resource.fixture = [];

        for (let item of src) {
            let _fixture = {};

            if (!_.isNil(item.id)) {
                _fixture.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _fixture.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.autocreate)) {
                _fixture.autocreate = item.autocreate;
            }

            if (!_.isNil(item.autodelete)) {
                _fixture.autodelete = item.autodelete;
            }

            if (!_.isNil(item.resource)) {
                _fixture.resource = item.resource;
            }

            resource.fixture.push(_fixture);
        }
    }

    if (!_.isNil(props.profile)) {
        if (!Array.isArray(props.profile)) { props.profile = [props.profile]; }
        resource.profile = util.reference(props.profile);
    }

    if (!_.isNil(props.variable)) {
        let src = props.variable;
        if (!Array.isArray(src)) { src = [src]; }
        resource.variable = [];

        for (let item of src) {
            let _variable = {};

            if (!_.isNil(item.id)) {
                _variable.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _variable.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _variable.name = item.name;
            }

            if (!_.isNil(item.defaultValue)) {
                _variable.defaultValue = item.defaultValue;
            }

            if (!_.isNil(item.description)) {
                _variable.description = item.description;
            }

            if (!_.isNil(item.expression)) {
                _variable.expression = item.expression;
            }

            if (!_.isNil(item.headerField)) {
                _variable.headerField = item.headerField;
            }

            if (!_.isNil(item.hint)) {
                _variable.hint = item.hint;
            }

            if (!_.isNil(item.path)) {
                _variable.path = item.path;
            }

            if (!_.isNil(item.sourceId)) {
                _variable.sourceId = item.sourceId;
            }

            resource.variable.push(_variable);
        }
    }

    if (!_.isNil(props.setup)) {
        let src = props.setup;
        let _setup = {};

        if (!_.isNil(src.id)) {
            _setup.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _setup.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.action)) {
            _setup.action = src.action;
        }

        resource.setup = _setup;
    }

    if (!_.isNil(props.test)) {
        let src = props.test;
        if (!Array.isArray(src)) { src = [src]; }
        resource.test = [];

        for (let item of src) {
            let _test = {};

            if (!_.isNil(item.id)) {
                _test.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _test.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _test.name = item.name;
            }

            if (!_.isNil(item.description)) {
                _test.description = item.description;
            }

            if (!_.isNil(item.action)) {
                _test.action = item.action;
            }

            resource.test.push(_test);
        }
    }

    if (!_.isNil(props.teardown)) {
        let src = props.teardown;
        let _teardown = {};

        if (!_.isNil(src.id)) {
            _teardown.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _teardown.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.action)) {
            _teardown.action = src.action;
        }

        resource.teardown = _teardown;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/TestScript"]
    };

    return resource;
}

/**
  * Create a FHIR ValueSet resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function valueSet(type, props) {
    const mappings = {
        "ValueSet": valueSet_ValueSet
    };

    return mappings[type](props)
}

function valueSet_ValueSet(props) {
    const resource = {
        resourceType: "ValueSet",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ValueSet</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.immutable)) {
        resource.immutable = props.immutable;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.compose)) {
        let src = props.compose;
        let _compose = {};

        if (!_.isNil(src.id)) {
            _compose.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _compose.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.lockedDate)) {
            _compose.lockedDate = src.lockedDate;
        }

        if (!_.isNil(src.inactive)) {
            _compose.inactive = src.inactive;
        }

        if (!_.isNil(src.include)) {
            _compose.include = src.include;
        }

        resource.compose = _compose;
    }

    if (!_.isNil(props.expansion)) {
        let src = props.expansion;
        let _expansion = {};

        if (!_.isNil(src.id)) {
            _expansion.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _expansion.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.identifier)) {
            _expansion.identifier = src.identifier;
        }

        if (!_.isNil(src.timestamp)) {
            _expansion.timestamp = src.timestamp;
        }

        if (!_.isNil(src.total)) {
            _expansion.total = src.total;
        }

        if (!_.isNil(src.offset)) {
            _expansion.offset = src.offset;
        }

        if (!_.isNil(src.parameter)) {
            _expansion.parameter = src.parameter;
        }

        if (!_.isNil(src.contains)) {
            _expansion.contains = src.contains;
        }

        resource.expansion = _expansion;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"]
    };

    return resource;
}

/**
  * Create a FHIR VerificationResult resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function verificationResult(type, props) {
    const mappings = {
        "VerificationResult": verificationResult_VerificationResult
    };

    return mappings[type](props)
}

function verificationResult_VerificationResult(props) {
    const resource = {
        resourceType: "VerificationResult",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>VerificationResult</b></p></div>"
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

    if (!_.isNil(props.target)) {
        if (!Array.isArray(props.target)) { props.target = [props.target]; }
        resource.target = util.reference(props.target);
    }

    if (!_.isNil(props.targetLocation)) {
        resource.targetLocation = props.targetLocation;
    }

    if (!_.isNil(props.need)) {
        resource.need = props.need;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusDate)) {
        resource.statusDate = props.statusDate;
    }

    if (!_.isNil(props.validationType)) {
        resource.validationType = props.validationType;
    }

    if (!_.isNil(props.validationProcess)) {
        resource.validationProcess = props.validationProcess;
    }

    if (!_.isNil(props.frequency)) {
        resource.frequency = props.frequency;
    }

    if (!_.isNil(props.lastPerformed)) {
        resource.lastPerformed = props.lastPerformed;
    }

    if (!_.isNil(props.nextScheduled)) {
        resource.nextScheduled = props.nextScheduled;
    }

    if (!_.isNil(props.failureAction)) {
        resource.failureAction = props.failureAction;
    }

    if (!_.isNil(props.primarySource)) {
        let src = props.primarySource;
        if (!Array.isArray(src)) { src = [src]; }
        resource.primarySource = [];

        for (let item of src) {
            let _primarySource = {};

            if (!_.isNil(item.id)) {
                _primarySource.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _primarySource.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.who)) {
                _primarySource.who = item.who;
            }

            if (!_.isNil(item.type)) {
                _primarySource.type = item.type;
            }

            if (!_.isNil(item.communicationMethod)) {
                _primarySource.communicationMethod = item.communicationMethod;
            }

            if (!_.isNil(item.validationStatus)) {
                _primarySource.validationStatus = item.validationStatus;
            }

            if (!_.isNil(item.validationDate)) {
                _primarySource.validationDate = item.validationDate;
            }

            if (!_.isNil(item.canPushUpdates)) {
                _primarySource.canPushUpdates = item.canPushUpdates;
            }

            if (!_.isNil(item.pushTypeAvailable)) {
                _primarySource.pushTypeAvailable = item.pushTypeAvailable;
            }

            resource.primarySource.push(_primarySource);
        }
    }

    if (!_.isNil(props.attestation)) {
        let src = props.attestation;
        let _attestation = {};

        if (!_.isNil(src.id)) {
            _attestation.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _attestation.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.who)) {
            _attestation.who = src.who;
        }

        if (!_.isNil(src.onBehalfOf)) {
            _attestation.onBehalfOf = src.onBehalfOf;
        }

        if (!_.isNil(src.communicationMethod)) {
            _attestation.communicationMethod = src.communicationMethod;
        }

        if (!_.isNil(src.date)) {
            _attestation.date = src.date;
        }

        if (!_.isNil(src.sourceIdentityCertificate)) {
            _attestation.sourceIdentityCertificate = src.sourceIdentityCertificate;
        }

        if (!_.isNil(src.proxyIdentityCertificate)) {
            _attestation.proxyIdentityCertificate = src.proxyIdentityCertificate;
        }

        if (!_.isNil(src.proxySignature)) {
            _attestation.proxySignature = src.proxySignature;
        }

        if (!_.isNil(src.sourceSignature)) {
            _attestation.sourceSignature = src.sourceSignature;
        }

        resource.attestation = _attestation;
    }

    if (!_.isNil(props.validator)) {
        let src = props.validator;
        if (!Array.isArray(src)) { src = [src]; }
        resource.validator = [];

        for (let item of src) {
            let _validator = {};

            if (!_.isNil(item.id)) {
                _validator.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _validator.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.organization)) {
                _validator.organization = item.organization;
            }

            if (!_.isNil(item.identityCertificate)) {
                _validator.identityCertificate = item.identityCertificate;
            }

            if (!_.isNil(item.attestationSignature)) {
                _validator.attestationSignature = item.attestationSignature;
            }

            resource.validator.push(_validator);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/VerificationResult"]
    };

    return resource;
}

/**
  * Create a FHIR VisionPrescription resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function visionPrescription(type, props) {
    const mappings = {
        "VisionPrescription": visionPrescription_VisionPrescription
    };

    return mappings[type](props)
}

function visionPrescription_VisionPrescription(props) {
    const resource = {
        resourceType: "VisionPrescription",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>VisionPrescription</b></p></div>"
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

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.dateWritten)) {
        resource.dateWritten = props.dateWritten;
    }

    if (!_.isNil(props.prescriber)) {
        resource.prescriber = util.reference(props.prescriber);
    }

    if (!_.isNil(props.lensSpecification)) {
        let src = props.lensSpecification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.lensSpecification = [];

        for (let item of src) {
            let _lensSpecification = {};

            if (!_.isNil(item.id)) {
                _lensSpecification.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _lensSpecification.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.product)) {
                _lensSpecification.product = item.product;
            }

            if (!_.isNil(item.eye)) {
                _lensSpecification.eye = item.eye;
            }

            if (!_.isNil(item.sphere)) {
                _lensSpecification.sphere = item.sphere;
            }

            if (!_.isNil(item.cylinder)) {
                _lensSpecification.cylinder = item.cylinder;
            }

            if (!_.isNil(item.axis)) {
                _lensSpecification.axis = item.axis;
            }

            if (!_.isNil(item.prism)) {
                _lensSpecification.prism = item.prism;
            }

            if (!_.isNil(item.add)) {
                _lensSpecification.add = item.add;
            }

            if (!_.isNil(item.power)) {
                _lensSpecification.power = item.power;
            }

            if (!_.isNil(item.backCurve)) {
                _lensSpecification.backCurve = item.backCurve;
            }

            if (!_.isNil(item.diameter)) {
                _lensSpecification.diameter = item.diameter;
            }

            if (!_.isNil(item.duration)) {
                _lensSpecification.duration = item.duration;
            }

            if (!_.isNil(item.color)) {
                _lensSpecification.color = item.color;
            }

            if (!_.isNil(item.brand)) {
                _lensSpecification.brand = item.brand;
            }

            if (!_.isNil(item.note)) {
                _lensSpecification.note = item.note;
            }

            resource.lensSpecification.push(_lensSpecification);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/VisionPrescription"]
    };

    return resource;
}
