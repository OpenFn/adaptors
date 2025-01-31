
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type InsurancePlan_Props = {
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
    name?: string;
    alias?: string;
    period?: Period;
    ownedBy?: Reference;
    administeredBy?: Reference;
    coverageArea?: Reference;
    contact?: BackboneElement;
    endpoint?: Reference;
    network?: Reference;
    coverage?: BackboneElement;
    plan?: BackboneElement;
};

export default function(props: Partial<InsurancePlan_Props>) {
    const resource = {
        resourceType: "InsurancePlan",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>InsurancePlan</b></p></div>"
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

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.alias)) {
        resource.alias = props.alias;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.ownedBy)) {
        resource.ownedBy = dt.reference(props.ownedBy);
    }

    if (!_.isNil(props.administeredBy)) {
        resource.administeredBy = dt.reference(props.administeredBy);
    }

    if (!_.isNil(props.coverageArea)) {
        if (!Array.isArray(props.coverageArea)) { props.coverageArea = [props.coverageArea]; }
        resource.coverageArea = dt.reference(props.coverageArea);
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {};

            if (!_.isNil(item.id)) {
                _contact.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _contact.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.purpose)) {
                _contact.purpose = item.purpose;
            }

            if (!_.isNil(item.name)) {
                _contact.name = item.name;
            }

            if (!_.isNil(item.telecom)) {
                _contact.telecom = item.telecom;
            }

            if (!_.isNil(item.address)) {
                _contact.address = item.address;
            }

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = dt.reference(props.endpoint);
    }

    if (!_.isNil(props.network)) {
        if (!Array.isArray(props.network)) { props.network = [props.network]; }
        resource.network = dt.reference(props.network);
    }

    if (!_.isNil(props.coverage)) {
        let src = props.coverage;
        if (!Array.isArray(src)) { src = [src]; }
        resource.coverage = [];

        for (let item of src) {
            let _coverage = {};

            if (!_.isNil(item.id)) {
                _coverage.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _coverage.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _coverage.type = item.type;
            }

            if (!_.isNil(item.network)) {
                _coverage.network = item.network;
            }

            if (!_.isNil(item.benefit)) {
                _coverage.benefit = item.benefit;
            }

            resource.coverage.push(_coverage);
        }
    }

    if (!_.isNil(props.plan)) {
        let src = props.plan;
        if (!Array.isArray(src)) { src = [src]; }
        resource.plan = [];

        for (let item of src) {
            let _plan = {};

            if (!_.isNil(item.id)) {
                _plan.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _plan.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _plan.identifier = item.identifier;
            }

            if (!_.isNil(item.type)) {
                _plan.type = item.type;
            }

            if (!_.isNil(item.coverageArea)) {
                _plan.coverageArea = item.coverageArea;
            }

            if (!_.isNil(item.network)) {
                _plan.network = item.network;
            }

            if (!_.isNil(item.generalCost)) {
                _plan.generalCost = item.generalCost;
            }

            if (!_.isNil(item.specificCost)) {
                _plan.specificCost = item.specificCost;
            }

            resource.plan.push(_plan);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/InsurancePlan"]
    };

    return resource;
}
