
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "PackagedProductDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PackagedProductDefinition</b></p></div>"
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

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.packageFor)) {
        if (!Array.isArray(props.packageFor)) { props.packageFor = [props.packageFor]; }
        resource.packageFor = util.reference(props.packageFor);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusDate)) {
        resource.statusDate = props.statusDate;
    }

    if (!_.isNil(props.containedItemQuantity)) {
        resource.containedItemQuantity = props.containedItemQuantity;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.legalStatusOfSupply)) {
        let src = props.legalStatusOfSupply;
        if (!Array.isArray(src)) { src = [src]; }
        resource.legalStatusOfSupply = [];

        for (let item of src) {
            let _legalStatusOfSupply = {};

            if (!_.isNil(item.id)) {
                _legalStatusOfSupply.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _legalStatusOfSupply.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _legalStatusOfSupply.code = item.code;
            }

            if (!_.isNil(item.jurisdiction)) {
                _legalStatusOfSupply.jurisdiction = item.jurisdiction;
            }

            resource.legalStatusOfSupply.push(_legalStatusOfSupply);
        }
    }

    if (!_.isNil(props.marketingStatus)) {
        resource.marketingStatus = props.marketingStatus;
    }

    if (!_.isNil(props.characteristic)) {
        resource.characteristic = props.characteristic;
    }

    if (!_.isNil(props.copackagedIndicator)) {
        resource.copackagedIndicator = props.copackagedIndicator;
    }

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = util.reference(props.manufacturer);
    }

    if (!_.isNil(props.package)) {
        let src = props.package;
        let _package = {};

        if (!_.isNil(src.id)) {
            _package.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _package.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.identifier)) {
            _package.identifier = src.identifier;
        }

        if (!_.isNil(src.type)) {
            _package.type = src.type;
        }

        if (!_.isNil(src.quantity)) {
            _package.quantity = src.quantity;
        }

        if (!_.isNil(src.material)) {
            _package.material = src.material;
        }

        if (!_.isNil(src.alternateMaterial)) {
            _package.alternateMaterial = src.alternateMaterial;
        }

        if (!_.isNil(src.shelfLifeStorage)) {
            _package.shelfLifeStorage = src.shelfLifeStorage;
        }

        if (!_.isNil(src.manufacturer)) {
            _package.manufacturer = src.manufacturer;
        }

        if (!_.isNil(src.property)) {
            _package.property = src.property;
        }

        if (!_.isNil(src.containedItem)) {
            _package.containedItem = src.containedItem;
        }

        resource.package = _package;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/PackagedProductDefinition"]
    };

    return resource;
}
