
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
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
        resource.identifier = dt.identifier(props.identifier);
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
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.recipient)) {
        resource.recipient = dt.reference(props.recipient);
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
        resource.issuer = dt.reference(props.issuer);
    }

    if (!_.isNil(props.account)) {
        resource.account = dt.reference(props.account);
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
