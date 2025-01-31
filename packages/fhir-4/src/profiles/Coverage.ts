
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.policyHolder)) {
        resource.policyHolder = dt.reference(props.policyHolder);
    }

    if (!_.isNil(props.subscriber)) {
        resource.subscriber = dt.reference(props.subscriber);
    }

    if (!_.isNil(props.subscriberId)) {
        resource.subscriberId = props.subscriberId;
    }

    if (!_.isNil(props.beneficiary)) {
        resource.beneficiary = dt.reference(props.beneficiary);
    }

    if (!_.isNil(props.dependent)) {
        resource.dependent = props.dependent;
    }

    if (!_.isNil(props.relationship)) {
        resource.relationship = props.relationship;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
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
            let _class = {};

            if (!_.isNil(item.id)) {
                _class.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _class.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _class.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _class.value = item.value;
            }

            if (!_.isNil(item.name)) {
                _class.name = item.name;
            }

            resource.class.push(_class);
        }
    }

    if (!_.isNil(props.order)) {
        resource.order = props.order;
    }

    if (!_.isNil(props.network)) {
        resource.network = props.network;
    }

    if (!_.isNil(props.costToBeneficiary)) {
        let src = props.costToBeneficiary;
        if (!Array.isArray(src)) { src = [src]; }
        resource.costToBeneficiary = [];

        for (let item of src) {
            let _costToBeneficiary = {};

            if (!_.isNil(item.id)) {
                _costToBeneficiary.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _costToBeneficiary.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _costToBeneficiary.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _costToBeneficiary.value = item.value;
            }

            if (!_.isNil(item.exception)) {
                _costToBeneficiary.exception = item.exception;
            }

            resource.costToBeneficiary.push(_costToBeneficiary);
        }
    }

    if (!_.isNil(props.subrogation)) {
        resource.subrogation = props.subrogation;
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
