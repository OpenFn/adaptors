
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Device_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    definition?: string | FHIR.Reference;
    udiCarrier?: FHIR.BackboneElement[];
    status?: string;
    statusReason?: MaybeArray<string[] | FHIR.CodeableConcept>;
    distinctIdentifier?: string;
    manufacturer?: string;
    manufactureDate?: string;
    expirationDate?: string;
    lotNumber?: string;
    serialNumber?: string;
    deviceName?: FHIR.BackboneElement[];
    modelNumber?: string;
    partNumber?: string;
    type?: string[] | FHIR.CodeableConcept;
    specialization?: FHIR.BackboneElement[];
    version?: FHIR.BackboneElement[];
    property?: FHIR.BackboneElement[];
    patient?: string | FHIR.Reference;
    owner?: string | FHIR.Reference;
    contact?: FHIR.ContactPoint[];
    location?: string | FHIR.Reference;
    url?: string;
    note?: FHIR.Annotation[];
    safety?: MaybeArray<string[] | FHIR.CodeableConcept>;
    parent?: string | FHIR.Reference;
    [key: string]: any;
};

export default function(props: Partial<Device_Props>) {
    const resource = {
        resourceType: "Device",
        ...props
    };

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
            let _udiCarrier = {
                ...item
            };

            resource.udiCarrier.push(_udiCarrier);
        }
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

    if (!_.isNil(props.version)) {
        let src = props.version;
        if (!Array.isArray(src)) { src = [src]; }
        resource.version = [];

        for (let item of src) {
            let _version = {
                ...item
            };

            resource.version.push(_version);
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

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.owner)) {
        resource.owner = dt.reference(props.owner);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.parent)) {
        resource.parent = dt.reference(props.parent);
    }

    return resource;
}
