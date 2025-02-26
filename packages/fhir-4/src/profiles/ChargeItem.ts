
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ChargeItem_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    definitionUri?: string[];
    definitionCanonical?: any[];
    status?: string;
    partOf?: MaybeArray<string | FHIR.Reference>;
    code?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    context?: string | FHIR.Reference;
    occurrence?: string | FHIR.Period | FHIR.Timing;
    performer?: FHIR.BackboneElement[];
    performingOrganization?: string | FHIR.Reference;
    requestingOrganization?: string | FHIR.Reference;
    costCenter?: string | FHIR.Reference;
    quantity?: FHIR.Quantity;
    bodysite?: MaybeArray<string[] | FHIR.CodeableConcept>;
    factorOverride?: number;
    priceOverride?: FHIR.Money;
    overrideReason?: string;
    enterer?: string | FHIR.Reference;
    enteredDate?: string;
    reason?: MaybeArray<string[] | FHIR.CodeableConcept>;
    service?: MaybeArray<string | FHIR.Reference>;
    product?: string | FHIR.Reference | string[] | FHIR.CodeableConcept;
    account?: MaybeArray<string | FHIR.Reference>;
    note?: FHIR.Annotation[];
    supportingInformation?: MaybeArray<string | FHIR.Reference>;
    [key: string]: any;
};

export default function(props: Partial<ChargeItem_Props>) {
    const resource = {
        resourceType: "ChargeItem",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.context)) {
        resource.context = dt.reference(props.context);
    }

    if (!_.isNil(props.occurrence)) {
        delete resource.occurrence;
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.performer)) {
        let src = props.performer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.performer = [];

        for (let item of src) {
            let _performer = {
                ...item
            };

            resource.performer.push(_performer);
        }
    }

    if (!_.isNil(props.performingOrganization)) {
        resource.performingOrganization = dt.reference(props.performingOrganization);
    }

    if (!_.isNil(props.requestingOrganization)) {
        resource.requestingOrganization = dt.reference(props.requestingOrganization);
    }

    if (!_.isNil(props.costCenter)) {
        resource.costCenter = dt.reference(props.costCenter);
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = dt.reference(props.enterer);
    }

    if (!_.isNil(props.service)) {
        if (!Array.isArray(props.service)) { props.service = [props.service]; }
        resource.service = dt.reference(props.service);
    }

    if (!_.isNil(props.product)) {
        delete resource.product;
        dt.composite(resource, "product", props.product);
    }

    if (!_.isNil(props.account)) {
        if (!Array.isArray(props.account)) { props.account = [props.account]; }
        resource.account = dt.reference(props.account);
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = dt.reference(props.supportingInformation);
    }

    return resource;
}
