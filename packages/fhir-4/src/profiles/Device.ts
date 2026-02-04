
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Device_Props = {
    contact?: FHIR.ContactPoint[];
    contained?: any[];
    definition?: string | FHIR.Reference;
    deviceName?: FHIR.BackboneElement[];
    distinctIdentifier?: string;
    expirationDate?: string;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    location?: string | FHIR.Reference;
    lotNumber?: string;
    manufactureDate?: string;
    manufacturer?: string;
    meta?: FHIR.Meta;
    modelNumber?: string;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    owner?: string | FHIR.Reference;
    parent?: string | FHIR.Reference;
    partNumber?: string;
    patient?: string | FHIR.Reference;
    property?: FHIR.BackboneElement[];
    safety?: MaybeArray<string[] | FHIR.CodeableConcept>;
    serialNumber?: string;
    specialization?: FHIR.BackboneElement[];
    status?: string;
    statusReason?: MaybeArray<string[] | FHIR.CodeableConcept>;
    text?: FHIR.Narrative;
    type?: string[] | FHIR.CodeableConcept;
    udiCarrier?: FHIR.BackboneElement[];
    url?: string;
    version?: FHIR.BackboneElement[];
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

    if (!_.isNil(props.statusReason)) {
        if (!Array.isArray(props.statusReason)) { props.statusReason = [props.statusReason]; }
        resource.statusReason = dt.concept(props.statusReason);
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

    if (!_.isNil(props.safety)) {
        if (!Array.isArray(props.safety)) { props.safety = [props.safety]; }
        resource.safety = dt.concept(props.safety);
    }

    if (!_.isNil(props.parent)) {
        resource.parent = dt.reference(props.parent);
    }

    return resource;
}
