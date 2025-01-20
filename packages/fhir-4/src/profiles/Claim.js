
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
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
