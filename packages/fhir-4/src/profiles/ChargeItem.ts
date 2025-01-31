
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type ChargeItem_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    definitionUri?: string;
    definitionCanonical?: any;
    status?: string;
    partOf?: Reference;
    code?: CodeableConcept;
    subject?: Reference;
    context?: Reference;
    occurrence?: string;
    performer?: BackboneElement;
    performingOrganization?: Reference;
    requestingOrganization?: Reference;
    costCenter?: Reference;
    quantity?: Quantity;
    bodysite?: CodeableConcept;
    factorOverride?: number;
    priceOverride?: Money;
    overrideReason?: string;
    enterer?: Reference;
    enteredDate?: string;
    reason?: CodeableConcept;
    service?: Reference;
    product?: Reference;
    account?: Reference;
    note?: Annotation;
    supportingInformation?: Reference;
};

export default function(props: Partial<ChargeItem_Props>) {
    const resource = {
        resourceType: "ChargeItem",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ChargeItem</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.implicitRules)) {
        resource.implicitRules = props.implicitRules;
    }

    if (!_.isNil(props.language)) {
        resource.language = props.language;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.contained)) {
        resource.contained = props.contained;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.definitionUri)) {
        resource.definitionUri = props.definitionUri;
    }

    if (!_.isNil(props.definitionCanonical)) {
        resource.definitionCanonical = props.definitionCanonical;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.context)) {
        resource.context = dt.reference(props.context);
    }

    if (!_.isNil(props.occurrence)) {
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.performer)) {
        let src = props.performer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.performer = [];

        for (let item of src) {
            let _performer = {};

            if (!_.isNil(item.id)) {
                _performer.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _performer.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.function)) {
                _performer.function = item.function;
            }

            if (!_.isNil(item.actor)) {
                _performer.actor = item.actor;
            }

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

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.bodysite)) {
        resource.bodysite = props.bodysite;
    }

    if (!_.isNil(props.factorOverride)) {
        resource.factorOverride = props.factorOverride;
    }

    if (!_.isNil(props.priceOverride)) {
        resource.priceOverride = props.priceOverride;
    }

    if (!_.isNil(props.overrideReason)) {
        resource.overrideReason = props.overrideReason;
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = dt.reference(props.enterer);
    }

    if (!_.isNil(props.enteredDate)) {
        resource.enteredDate = props.enteredDate;
    }

    if (!_.isNil(props.reason)) {
        resource.reason = props.reason;
    }

    if (!_.isNil(props.service)) {
        if (!Array.isArray(props.service)) { props.service = [props.service]; }
        resource.service = dt.reference(props.service);
    }

    if (!_.isNil(props.product)) {
        dt.composite(resource, "product", props.product);
    }

    if (!_.isNil(props.account)) {
        if (!Array.isArray(props.account)) { props.account = [props.account]; }
        resource.account = dt.reference(props.account);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = dt.reference(props.supportingInformation);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ChargeItem"]
    };

    return resource;
}
