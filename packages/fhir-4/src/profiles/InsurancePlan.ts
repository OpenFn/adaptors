
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
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
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
            let _contact = {
                ...item
            };

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
            let _coverage = {
                ...item
            };

            resource.coverage.push(_coverage);
        }
    }

    if (!_.isNil(props.plan)) {
        let src = props.plan;
        if (!Array.isArray(src)) { src = [src]; }
        resource.plan = [];

        for (let item of src) {
            let _plan = {
                ...item
            };

            resource.plan.push(_plan);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/InsurancePlan"]
    };

    return resource;
}
