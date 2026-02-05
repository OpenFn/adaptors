
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Account_Props = {
    contained?: any[];
    coverage?: FHIR.BackboneElement[];
    description?: string;
    extension?: FHIR.Extension[];
    guarantor?: FHIR.BackboneElement[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    owner?: string | FHIR.Reference;
    partOf?: string | FHIR.Reference;
    servicePeriod?: FHIR.Period;
    status?: string;
    subject?: MaybeArray<string | FHIR.Reference>;
    text?: FHIR.Narrative;
    type?: string[] | FHIR.CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<Account_Props>) {
    const resource = {
        resourceType: "Account",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = dt.reference(props.subject);
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

    if (!_.isNil(props.owner)) {
        resource.owner = dt.reference(props.owner);
    }

    if (!_.isNil(props.guarantor)) {
        let src = props.guarantor;
        if (!Array.isArray(src)) { src = [src]; }
        resource.guarantor = [];

        for (let item of src) {
            let _guarantor = {
                ...item
            };

            resource.guarantor.push(_guarantor);
        }
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = dt.reference(props.partOf);
    }

    return resource;
}
