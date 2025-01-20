
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
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
