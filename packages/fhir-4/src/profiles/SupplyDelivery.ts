
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type SupplyDelivery_Props = {
    basedOn?: MaybeArray<string | FHIR.Reference>;
    contained?: any[];
    destination?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    occurrence?: string | FHIR.Period | FHIR.Timing;
    partOf?: MaybeArray<string | FHIR.Reference>;
    patient?: string | FHIR.Reference;
    receiver?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    suppliedItem?: FHIR.BackboneElement;
    supplier?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    type?: string[] | FHIR.CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<SupplyDelivery_Props>) {
    const resource = {
        resourceType: "SupplyDelivery",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.suppliedItem)) {
        let src = props.suppliedItem;

        let _suppliedItem = {
            ...item
        };

        resource.suppliedItem = _suppliedItem;
    }

    if (!_.isNil(props.occurrence)) {
        delete resource.occurrence;
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.supplier)) {
        resource.supplier = dt.reference(props.supplier);
    }

    if (!_.isNil(props.destination)) {
        resource.destination = dt.reference(props.destination);
    }

    if (!_.isNil(props.receiver)) {
        if (!Array.isArray(props.receiver)) { props.receiver = [props.receiver]; }
        resource.receiver = dt.reference(props.receiver);
    }

    return resource;
}
