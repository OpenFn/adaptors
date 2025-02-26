
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type InsurancePlan_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    status?: string;
    type?: MaybeArray<string[] | FHIR.CodeableConcept>;
    name?: string;
    alias?: string[];
    period?: FHIR.Period;
    ownedBy?: string | FHIR.Reference;
    administeredBy?: string | FHIR.Reference;
    coverageArea?: MaybeArray<string | FHIR.Reference>;
    contact?: FHIR.BackboneElement[];
    endpoint?: MaybeArray<string | FHIR.Reference>;
    network?: MaybeArray<string | FHIR.Reference>;
    coverage?: FHIR.BackboneElement[];
    plan?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<InsurancePlan_Props>) {
    const resource = {
        resourceType: "InsurancePlan",
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

    return resource;
}
