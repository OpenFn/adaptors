
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Location_SzLocation_Props = {
    address?: Address;
    alias?: string[];
    availabilityExceptions?: string;
    contained?: any[];
    description?: string;
    endpoint?: Reference[];
    extension?: Extension[];
    hoursOfOperation?: BackboneElement[];
    id?: string;
    identifier?: Identifier[];
    implicitRules?: string;
    language?: string;
    managingOrganization?: Reference;
    meta?: Meta;
    mode?: string;
    modifierExtension?: Extension[];
    name?: string;
    operationalStatus?: Coding;
    partOf?: Reference;
    physicalType?: CodeableConcept;
    position?: BackboneElement;
    status?: string;
    telecom?: ContactPoint[];
    text?: Narrative;
    type?: CodeableConcept[];
    [key: string]: any;
};

export default function(props: Partial<Location_SzLocation_Props>) {
    const resource = {
        resourceType: "Location",

        meta: {
            profile: ["https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzLocation"]
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.operationalStatus)) {
        let src = props.operationalStatus;
        if (typeof src === 'string') {
          src = dt.lookupValue('http://terminology.hl7.org/ValueSet/v2-0116|3.0.0', src);
         }
        resource.operationalStatus = dt.coding(src);
    }

    if (!_.isNil(props.type)) {
        if (!Array.isArray(props.type)) { props.type = [props.type]; }

        resource.type = props.type.map((x) => dt.concept(dt.lookupValue(
            "http://terminology.hl7.org/ValueSet/v3-ServiceDeliveryLocationRoleType|3.0.0",
            x
        )));

        dt.ensureConceptText(resource.type);
    }

    if (!_.isNil(props.physicalType)) {
        resource.physicalType = dt.concept(dt.lookupValue(
            "http://hl7.org/fhir/ValueSet/location-physical-type|4.0.1",
            props.physicalType
        ));

        dt.ensureConceptText(resource.physicalType);
    }

    if (!_.isNil(props.position)) {
        let src = props.position;

        let _position = {
            ...src
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

    resource.text = {
      status: 'generated',
      div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">
      <h2>${resource.resourceType}: ${resource.id || '(anon)'}</h2>
</div>`,
    };
    return resource;
}
