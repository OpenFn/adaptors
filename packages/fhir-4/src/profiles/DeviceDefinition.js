
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "DeviceDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DeviceDefinition</b></p></div>"
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

    if (!_.isNil(props.udiDeviceIdentifier)) {
        let src = props.udiDeviceIdentifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.udiDeviceIdentifier = [];

        for (let item of src) {
            let _udiDeviceIdentifier = {};

            if (!_.isNil(item.id)) {
                _udiDeviceIdentifier.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _udiDeviceIdentifier.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.deviceIdentifier)) {
                _udiDeviceIdentifier.deviceIdentifier = item.deviceIdentifier;
            }

            if (!_.isNil(item.issuer)) {
                _udiDeviceIdentifier.issuer = item.issuer;
            }

            if (!_.isNil(item.jurisdiction)) {
                _udiDeviceIdentifier.jurisdiction = item.jurisdiction;
            }

            resource.udiDeviceIdentifier.push(_udiDeviceIdentifier);
        }
    }

    if (!_.isNil(props.manufacturer)) {
        dt.composite(resource, "manufacturer", props.manufacturer);
    }

    if (!_.isNil(props.deviceName)) {
        let src = props.deviceName;
        if (!Array.isArray(src)) { src = [src]; }
        resource.deviceName = [];

        for (let item of src) {
            let _deviceName = {};

            if (!_.isNil(item.id)) {
                _deviceName.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _deviceName.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _deviceName.name = item.name;
            }

            if (!_.isNil(item.type)) {
                _deviceName.type = item.type;
            }

            resource.deviceName.push(_deviceName);
        }
    }

    if (!_.isNil(props.modelNumber)) {
        resource.modelNumber = props.modelNumber;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.specialization)) {
        let src = props.specialization;
        if (!Array.isArray(src)) { src = [src]; }
        resource.specialization = [];

        for (let item of src) {
            let _specialization = {};

            if (!_.isNil(item.id)) {
                _specialization.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _specialization.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.systemType)) {
                _specialization.systemType = item.systemType;
            }

            if (!_.isNil(item.version)) {
                _specialization.version = item.version;
            }

            resource.specialization.push(_specialization);
        }
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.safety)) {
        resource.safety = props.safety;
    }

    if (!_.isNil(props.shelfLifeStorage)) {
        resource.shelfLifeStorage = props.shelfLifeStorage;
    }

    if (!_.isNil(props.physicalCharacteristics)) {
        resource.physicalCharacteristics = props.physicalCharacteristics;
    }

    if (!_.isNil(props.languageCode)) {
        resource.languageCode = props.languageCode;
    }

    if (!_.isNil(props.capability)) {
        let src = props.capability;
        if (!Array.isArray(src)) { src = [src]; }
        resource.capability = [];

        for (let item of src) {
            let _capability = {};

            if (!_.isNil(item.id)) {
                _capability.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _capability.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _capability.type = item.type;
            }

            if (!_.isNil(item.description)) {
                _capability.description = item.description;
            }

            resource.capability.push(_capability);
        }
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {};

            if (!_.isNil(item.id)) {
                _property.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _property.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _property.type = item.type;
            }

            if (!_.isNil(item.valueQuantity)) {
                _property.valueQuantity = item.valueQuantity;
            }

            if (!_.isNil(item.valueCode)) {
                _property.valueCode = item.valueCode;
            }

            resource.property.push(_property);
        }
    }

    if (!_.isNil(props.owner)) {
        resource.owner = dt.reference(props.owner);
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.onlineInformation)) {
        resource.onlineInformation = props.onlineInformation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.parentDevice)) {
        resource.parentDevice = dt.reference(props.parentDevice);
    }

    if (!_.isNil(props.material)) {
        let src = props.material;
        if (!Array.isArray(src)) { src = [src]; }
        resource.material = [];

        for (let item of src) {
            let _material = {};

            if (!_.isNil(item.id)) {
                _material.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _material.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.substance)) {
                _material.substance = item.substance;
            }

            if (!_.isNil(item.alternate)) {
                _material.alternate = item.alternate;
            }

            if (!_.isNil(item.allergenicIndicator)) {
                _material.allergenicIndicator = item.allergenicIndicator;
            }

            resource.material.push(_material);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DeviceDefinition"]
    };

    return resource;
}
