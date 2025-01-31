
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Device_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    definition?: Reference;
    udiCarrier?: BackboneElement;
    status?: string;
    statusReason?: CodeableConcept;
    distinctIdentifier?: string;
    manufacturer?: string;
    manufactureDate?: string;
    expirationDate?: string;
    lotNumber?: string;
    serialNumber?: string;
    deviceName?: BackboneElement;
    modelNumber?: string;
    partNumber?: string;
    type?: CodeableConcept;
    specialization?: BackboneElement;
    version?: BackboneElement;
    property?: BackboneElement;
    patient?: Reference;
    owner?: Reference;
    contact?: ContactPoint;
    location?: Reference;
    url?: string;
    note?: Annotation;
    safety?: CodeableConcept;
    parent?: Reference;
};

export default function(props: Partial<Device_Props>) {
    const resource = {
        resourceType: "Device",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Device</b></p></div>"
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

    if (!_.isNil(props.definition)) {
        resource.definition = dt.reference(props.definition);
    }

    if (!_.isNil(props.udiCarrier)) {
        let src = props.udiCarrier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.udiCarrier = [];

        for (let item of src) {
            let _udiCarrier = {};

            if (!_.isNil(item.id)) {
                _udiCarrier.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _udiCarrier.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.deviceIdentifier)) {
                _udiCarrier.deviceIdentifier = item.deviceIdentifier;
            }

            if (!_.isNil(item.issuer)) {
                _udiCarrier.issuer = item.issuer;
            }

            if (!_.isNil(item.jurisdiction)) {
                _udiCarrier.jurisdiction = item.jurisdiction;
            }

            if (!_.isNil(item.carrierAIDC)) {
                _udiCarrier.carrierAIDC = item.carrierAIDC;
            }

            if (!_.isNil(item.carrierHRF)) {
                _udiCarrier.carrierHRF = item.carrierHRF;
            }

            if (!_.isNil(item.entryType)) {
                _udiCarrier.entryType = item.entryType;
            }

            resource.udiCarrier.push(_udiCarrier);
        }
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.distinctIdentifier)) {
        resource.distinctIdentifier = props.distinctIdentifier;
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = props.manufacturer;
    }

    if (!_.isNil(props.manufactureDate)) {
        resource.manufactureDate = props.manufactureDate;
    }

    if (!_.isNil(props.expirationDate)) {
        resource.expirationDate = props.expirationDate;
    }

    if (!_.isNil(props.lotNumber)) {
        resource.lotNumber = props.lotNumber;
    }

    if (!_.isNil(props.serialNumber)) {
        resource.serialNumber = props.serialNumber;
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

    if (!_.isNil(props.partNumber)) {
        resource.partNumber = props.partNumber;
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
        let src = props.version;
        if (!Array.isArray(src)) { src = [src]; }
        resource.version = [];

        for (let item of src) {
            let _version = {};

            if (!_.isNil(item.id)) {
                _version.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _version.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _version.type = item.type;
            }

            if (!_.isNil(item.component)) {
                _version.component = item.component;
            }

            if (!_.isNil(item.value)) {
                _version.value = item.value;
            }

            resource.version.push(_version);
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

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.owner)) {
        resource.owner = dt.reference(props.owner);
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.safety)) {
        resource.safety = props.safety;
    }

    if (!_.isNil(props.parent)) {
        resource.parent = dt.reference(props.parent);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Device"]
    };

    return resource;
}
