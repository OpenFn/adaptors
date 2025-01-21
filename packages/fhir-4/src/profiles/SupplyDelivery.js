
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
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
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
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
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.supplier)) {
        resource.supplier = dt.reference(props.supplier);
    }

    if (!_.isNil(props.destination)) {
        resource.destination = dt.reference(props.destination);
    }

    if (!_.isNil(props.receiver)) {
        if (!Array.isArray(props.receiver)) { props.receiver = [props.receiver]; }
        resource.receiver = dt.reference(props.receiver);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SupplyDelivery"]
    };

    return resource;
}
