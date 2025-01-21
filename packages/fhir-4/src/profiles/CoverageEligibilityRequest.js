
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
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
        resource.identifier = dt.identifier(props.identifier);
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
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.serviced)) {
        dt.composite(resource, "serviced", props.serviced);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = dt.reference(props.enterer);
    }

    if (!_.isNil(props.provider)) {
        resource.provider = dt.reference(props.provider);
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = dt.reference(props.insurer);
    }

    if (!_.isNil(props.facility)) {
        resource.facility = dt.reference(props.facility);
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
