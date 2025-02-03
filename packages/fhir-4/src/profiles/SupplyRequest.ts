
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type SupplyRequest_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    status?: string;
    category?: CodeableConcept;
    priority?: string;
    item?: CodeableConcept;
    quantity?: Quantity;
    parameter?: BackboneElement;
    occurrence?: string;
    authoredOn?: string;
    requester?: Reference;
    supplier?: Reference;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    deliverFrom?: Reference;
    deliverTo?: Reference;
};

export default function(props: Partial<SupplyRequest_Props>) {
    const resource = {
        resourceType: "SupplyRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SupplyRequest</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.item)) {
        dt.composite(resource, "item", props.item);
    }

    if (!_.isNil(props.parameter)) {
        let src = props.parameter;
        if (!Array.isArray(src)) { src = [src]; }
        resource.parameter = [];

        for (let item of src) {
            let _parameter = {
                ...item
            };

            resource.parameter.push(_parameter);
        }
    }

    if (!_.isNil(props.occurrence)) {
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.requester)) {
        resource.requester = dt.reference(props.requester);
    }

    if (!_.isNil(props.supplier)) {
        if (!Array.isArray(props.supplier)) { props.supplier = [props.supplier]; }
        resource.supplier = dt.reference(props.supplier);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.deliverFrom)) {
        resource.deliverFrom = dt.reference(props.deliverFrom);
    }

    if (!_.isNil(props.deliverTo)) {
        resource.deliverTo = dt.reference(props.deliverTo);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SupplyRequest"]
    };

    return resource;
}
