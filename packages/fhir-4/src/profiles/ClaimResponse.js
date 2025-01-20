
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
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
