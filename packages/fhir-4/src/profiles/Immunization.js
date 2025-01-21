
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
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
        resource.identifier = dt.identifier(props.identifier);
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
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        dt.composite(resource, "occurrence", props.occurrence);
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
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = dt.reference(props.manufacturer);
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
        resource.reasonReference = dt.reference(props.reasonReference);
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
