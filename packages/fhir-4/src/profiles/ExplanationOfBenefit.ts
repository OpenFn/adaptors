
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type ExplanationOfBenefit_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    status?: string;
    type?: CodeableConcept;
    subType?: CodeableConcept;
    use?: string;
    patient?: Reference;
    billablePeriod?: Period;
    created?: string;
    enterer?: Reference;
    insurer?: Reference;
    provider?: Reference;
    priority?: CodeableConcept;
    fundsReserveRequested?: CodeableConcept;
    fundsReserve?: CodeableConcept;
    related?: BackboneElement;
    prescription?: Reference;
    originalPrescription?: Reference;
    payee?: BackboneElement;
    referral?: Reference;
    facility?: Reference;
    claim?: Reference;
    claimResponse?: Reference;
    outcome?: string;
    disposition?: string;
    preAuthRef?: string;
    preAuthRefPeriod?: Period;
    careTeam?: BackboneElement;
    supportingInfo?: BackboneElement;
    diagnosis?: BackboneElement;
    procedure?: BackboneElement;
    precedence?: number;
    insurance?: BackboneElement;
    accident?: BackboneElement;
    item?: BackboneElement;
    addItem?: BackboneElement;
    adjudication?: any;
    total?: BackboneElement;
    payment?: BackboneElement;
    formCode?: CodeableConcept;
    form?: Attachment;
    processNote?: BackboneElement;
    benefitPeriod?: Period;
    benefitBalance?: BackboneElement;
};

export default function(props: Partial<ExplanationOfBenefit_Props>) {
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
        resource.identifier = dt.identifier(props.identifier);
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
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.billablePeriod)) {
        resource.billablePeriod = props.billablePeriod;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = dt.reference(props.enterer);
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = dt.reference(props.insurer);
    }

    if (!_.isNil(props.provider)) {
        resource.provider = dt.reference(props.provider);
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
        resource.prescription = dt.reference(props.prescription);
    }

    if (!_.isNil(props.originalPrescription)) {
        resource.originalPrescription = dt.reference(props.originalPrescription);
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
        resource.referral = dt.reference(props.referral);
    }

    if (!_.isNil(props.facility)) {
        resource.facility = dt.reference(props.facility);
    }

    if (!_.isNil(props.claim)) {
        resource.claim = dt.reference(props.claim);
    }

    if (!_.isNil(props.claimResponse)) {
        resource.claimResponse = dt.reference(props.claimResponse);
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
