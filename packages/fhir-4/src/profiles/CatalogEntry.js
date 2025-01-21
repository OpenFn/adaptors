
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "CatalogEntry",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CatalogEntry</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.orderable)) {
        resource.orderable = props.orderable;
    }

    if (!_.isNil(props.referencedItem)) {
        resource.referencedItem = dt.reference(props.referencedItem);
    }

    if (!_.isNil(props.additionalIdentifier)) {
        if (!Array.isArray(props.additionalIdentifier)) { props.additionalIdentifier = [props.additionalIdentifier]; }
        resource.additionalIdentifier = dt.identifier(props.additionalIdentifier);
    }

    if (!_.isNil(props.classification)) {
        resource.classification = props.classification;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.validityPeriod)) {
        resource.validityPeriod = props.validityPeriod;
    }

    if (!_.isNil(props.validTo)) {
        resource.validTo = props.validTo;
    }

    if (!_.isNil(props.lastUpdated)) {
        resource.lastUpdated = props.lastUpdated;
    }

    if (!_.isNil(props.additionalCharacteristic)) {
        resource.additionalCharacteristic = props.additionalCharacteristic;
    }

    if (!_.isNil(props.additionalClassification)) {
        resource.additionalClassification = props.additionalClassification;
    }

    if (!_.isNil(props.relatedEntry)) {
        let src = props.relatedEntry;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relatedEntry = [];

        for (let item of src) {
            let _relatedEntry = {};

            if (!_.isNil(item.id)) {
                _relatedEntry.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _relatedEntry.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.relationtype)) {
                _relatedEntry.relationtype = item.relationtype;
            }

            if (!_.isNil(item.item)) {
                _relatedEntry.item = item.item;
            }

            resource.relatedEntry.push(_relatedEntry);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CatalogEntry"]
    };

    return resource;
}
