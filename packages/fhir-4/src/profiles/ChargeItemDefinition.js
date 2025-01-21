
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
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
        resource.identifier = dt.identifier(props.identifier);
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
        resource.instance = dt.reference(props.instance);
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
