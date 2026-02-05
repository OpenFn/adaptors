
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type SupplyRequest_Props = {
    authoredOn?: string;
    category?: string[] | FHIR.CodeableConcept;
    contained?: any[];
    deliverFrom?: string | FHIR.Reference;
    deliverTo?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    item?: string[] | FHIR.CodeableConcept | string | FHIR.Reference;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    occurrence?: string | FHIR.Period | FHIR.Timing;
    parameter?: FHIR.BackboneElement[];
    priority?: string;
    quantity?: FHIR.Quantity;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    requester?: string | FHIR.Reference;
    status?: string;
    supplier?: MaybeArray<string | FHIR.Reference>;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<SupplyRequest_Props>) {
    const resource = {
        resourceType: "SupplyRequest",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.category)) {
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.item)) {
        delete resource.item;
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
        delete resource.occurrence;
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.requester)) {
        resource.requester = dt.reference(props.requester);
    }

    if (!_.isNil(props.supplier)) {
        if (!Array.isArray(props.supplier)) { props.supplier = [props.supplier]; }
        resource.supplier = dt.reference(props.supplier);
    }

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }
        resource.reasonCode = dt.concept(props.reasonCode);
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

    return resource;
}
