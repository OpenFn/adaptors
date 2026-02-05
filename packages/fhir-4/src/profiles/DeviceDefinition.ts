
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type DeviceDefinition_Props = {
    capability?: FHIR.BackboneElement[];
    contact?: FHIR.ContactPoint[];
    contained?: any[];
    deviceName?: FHIR.BackboneElement[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    languageCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    manufacturer?: string | string | FHIR.Reference;
    material?: FHIR.BackboneElement[];
    meta?: FHIR.Meta;
    modelNumber?: string;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    onlineInformation?: string;
    owner?: string | FHIR.Reference;
    parentDevice?: string | FHIR.Reference;
    physicalCharacteristics?: FHIR.ProdCharacteristic;
    property?: FHIR.BackboneElement[];
    quantity?: FHIR.Quantity;
    safety?: MaybeArray<string[] | FHIR.CodeableConcept>;
    shelfLifeStorage?: FHIR.ProductShelfLife[];
    specialization?: FHIR.BackboneElement[];
    text?: FHIR.Narrative;
    type?: string[] | FHIR.CodeableConcept;
    udiDeviceIdentifier?: FHIR.BackboneElement[];
    url?: string;
    version?: string[];
    [key: string]: any;
};

export default function(props: Partial<DeviceDefinition_Props>) {
    const resource = {
        resourceType: "DeviceDefinition",
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
        delete resource.manufacturer;
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

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
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

    if (!_.isNil(props.safety)) {
        if (!Array.isArray(props.safety)) { props.safety = [props.safety]; }
        resource.safety = dt.concept(props.safety);
    }

    if (!_.isNil(props.languageCode)) {
        if (!Array.isArray(props.languageCode)) { props.languageCode = [props.languageCode]; }
        resource.languageCode = dt.concept(props.languageCode);
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

    return resource;
}
