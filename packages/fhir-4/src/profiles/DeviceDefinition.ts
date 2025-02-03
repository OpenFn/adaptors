
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type DeviceDefinition_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    udiDeviceIdentifier?: BackboneElement;
    manufacturer?: string;
    deviceName?: BackboneElement;
    modelNumber?: string;
    type?: CodeableConcept;
    specialization?: BackboneElement;
    version?: string;
    safety?: CodeableConcept;
    shelfLifeStorage?: ProductShelfLife;
    physicalCharacteristics?: ProdCharacteristic;
    languageCode?: CodeableConcept;
    capability?: BackboneElement;
    property?: BackboneElement;
    owner?: Reference;
    contact?: ContactPoint;
    url?: string;
    onlineInformation?: string;
    note?: Annotation;
    quantity?: Quantity;
    parentDevice?: Reference;
    material?: BackboneElement;
};

export default function(props: Partial<DeviceDefinition_Props>) {
    const resource = {
        resourceType: "DeviceDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DeviceDefinition</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.udiDeviceIdentifier)) {
        let src = props.udiDeviceIdentifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.udiDeviceIdentifier = [];

        for (let item of src) {
            let _udiDeviceIdentifier = {
                ...item
            };

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
            let _deviceName = {
                ...item
            };

            resource.deviceName.push(_deviceName);
        }
    }

    if (!_.isNil(props.specialization)) {
        let src = props.specialization;
        if (!Array.isArray(src)) { src = [src]; }
        resource.specialization = [];

        for (let item of src) {
            let _specialization = {
                ...item
            };

            resource.specialization.push(_specialization);
        }
    }

    if (!_.isNil(props.capability)) {
        let src = props.capability;
        if (!Array.isArray(src)) { src = [src]; }
        resource.capability = [];

        for (let item of src) {
            let _capability = {
                ...item
            };

            resource.capability.push(_capability);
        }
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {
                ...item
            };

            resource.property.push(_property);
        }
    }

    if (!_.isNil(props.owner)) {
        resource.owner = dt.reference(props.owner);
    }

    if (!_.isNil(props.parentDevice)) {
        resource.parentDevice = dt.reference(props.parentDevice);
    }

    if (!_.isNil(props.material)) {
        let src = props.material;
        if (!Array.isArray(src)) { src = [src]; }
        resource.material = [];

        for (let item of src) {
            let _material = {
                ...item
            };

            resource.material.push(_material);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DeviceDefinition"]
    };

    return resource;
}
