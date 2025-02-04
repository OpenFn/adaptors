
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type SupplyDelivery_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    basedOn?: FHIR.Reference;
    partOf?: FHIR.Reference;
    status?: string;
    patient?: FHIR.Reference;
    type?: FHIR.CodeableConcept;
    suppliedItem?: FHIR.BackboneElement;
    occurrence?: string;
    supplier?: FHIR.Reference;
    destination?: FHIR.Reference;
    receiver?: FHIR.Reference;
};

export default function(props: Partial<SupplyDelivery_Props>) {
    const resource = {
        resourceType: "SupplyDelivery",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SupplyDelivery</b></p></div>"
        },

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

    if (!_.isNil(props.suppliedItem)) {
        let src = props.suppliedItem;

        let _suppliedItem = {
            ...item
        };

        resource.suppliedItem = _suppliedItem;
    }

    if (!_.isNil(props.occurrence)) {
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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SupplyDelivery"]
    };

    return resource;
}
