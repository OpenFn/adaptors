
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Coverage_Props = {
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
    type?: CodeableConcept;
    policyHolder?: Reference;
    subscriber?: Reference;
    subscriberId?: string;
    beneficiary?: Reference;
    dependent?: string;
    relationship?: CodeableConcept;
    period?: Period;
    payor?: Reference;
    class?: BackboneElement;
    order?: number;
    network?: string;
    costToBeneficiary?: BackboneElement;
    subrogation?: boolean;
    contract?: Reference;
};

export default function(props: Partial<Coverage_Props>) {
    const resource = {
        resourceType: "Coverage",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Coverage</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.policyHolder)) {
        resource.policyHolder = dt.reference(props.policyHolder);
    }

    if (!_.isNil(props.subscriber)) {
        resource.subscriber = dt.reference(props.subscriber);
    }

    if (!_.isNil(props.beneficiary)) {
        resource.beneficiary = dt.reference(props.beneficiary);
    }

    if (!_.isNil(props.payor)) {
        if (!Array.isArray(props.payor)) { props.payor = [props.payor]; }
        resource.payor = dt.reference(props.payor);
    }

    if (!_.isNil(props.class)) {
        let src = props.class;
        if (!Array.isArray(src)) { src = [src]; }
        resource.class = [];

        for (let item of src) {
            let _class = {
                ...item
            };

            resource.class.push(_class);
        }
    }

    if (!_.isNil(props.costToBeneficiary)) {
        let src = props.costToBeneficiary;
        if (!Array.isArray(src)) { src = [src]; }
        resource.costToBeneficiary = [];

        for (let item of src) {
            let _costToBeneficiary = {
                ...item
            };

            resource.costToBeneficiary.push(_costToBeneficiary);
        }
    }

    if (!_.isNil(props.contract)) {
        if (!Array.isArray(props.contract)) { props.contract = [props.contract]; }
        resource.contract = dt.reference(props.contract);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Coverage"]
    };

    return resource;
}
