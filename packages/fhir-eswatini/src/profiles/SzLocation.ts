
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Location_SzLocation_Props = {
    address?: FHIR.Address;
    alias?: string[];
    availabilityExceptions?: string;
    contained?: any[];
    description?: string;
    endpoint?: FHIR.Reference[];
    extension?: FHIR.Extension[];
    hoursOfOperation?: FHIR.BackboneElement[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    language?: string;
    managingOrganization?: FHIR.Reference;
    meta?: FHIR.Meta;
    mode?: string;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    operationalStatus?: FHIR.Coding;
    partOf?: FHIR.Reference;
    physicalType?: FHIR.CodeableConcept;
    position?: FHIR.BackboneElement;
    status?: string;
    telecom?: FHIR.ContactPoint[];
    text?: FHIR.Narrative;
    type?: FHIR.CodeableConcept[];
    [key: string]: any;
};

export default function(props: Partial<Location_SzLocation_Props>) {
    const resource = {
        resourceType: "Location",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.type)) {
        if (!Array.isArray(props.type)) { props.type = [props.type]; }
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.physicalType)) {
        resource.physicalType = dt.concept(props.physicalType);
    }

    if (!_.isNil(props.position)) {
        let src = props.position;

        let _position = {
            ...item
        };

        resource.position = _position;
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = dt.reference(props.managingOrganization);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.hoursOfOperation)) {
        let src = props.hoursOfOperation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.hoursOfOperation = [];

        for (let item of src) {
            let _hoursOfOperation = {
                ...item
            };

            resource.hoursOfOperation.push(_hoursOfOperation);
        }
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = dt.reference(props.endpoint);
    }

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
