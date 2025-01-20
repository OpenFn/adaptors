
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
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
