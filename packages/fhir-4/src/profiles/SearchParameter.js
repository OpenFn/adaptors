
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "SearchParameter",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SearchParameter</b></p></div>"
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

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
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

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.base)) {
        resource.base = props.base;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.expression)) {
        resource.expression = props.expression;
    }

    if (!_.isNil(props.xpath)) {
        resource.xpath = props.xpath;
    }

    if (!_.isNil(props.xpathUsage)) {
        resource.xpathUsage = props.xpathUsage;
    }

    if (!_.isNil(props.target)) {
        resource.target = props.target;
    }

    if (!_.isNil(props.multipleOr)) {
        resource.multipleOr = props.multipleOr;
    }

    if (!_.isNil(props.multipleAnd)) {
        resource.multipleAnd = props.multipleAnd;
    }

    if (!_.isNil(props.comparator)) {
        resource.comparator = props.comparator;
    }

    if (!_.isNil(props.modifier)) {
        resource.modifier = props.modifier;
    }

    if (!_.isNil(props.chain)) {
        resource.chain = props.chain;
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {};

            if (!_.isNil(item.id)) {
                _component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.definition)) {
                _component.definition = item.definition;
            }

            if (!_.isNil(item.expression)) {
                _component.expression = item.expression;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SearchParameter"]
    };

    return resource;
}
