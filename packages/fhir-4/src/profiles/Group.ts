
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Group_Props = {
    active?: boolean;
    actual?: boolean;
    characteristic?: FHIR.BackboneElement[];
    code?: string[] | FHIR.CodeableConcept;
    contained?: any[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    managingEntity?: string | FHIR.Reference;
    member?: FHIR.BackboneElement[];
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    quantity?: number;
    text?: FHIR.Narrative;
    type?: string;
    [key: string]: any;
};

export default function(props: Partial<Group_Props>) {
    const resource = {
        resourceType: "Group",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.managingEntity)) {
        resource.managingEntity = dt.reference(props.managingEntity);
    }

    if (!_.isNil(props.characteristic)) {
        let src = props.characteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.characteristic = [];

        for (let item of src) {
            let _characteristic = {
                ...item
            };

            resource.characteristic.push(_characteristic);
        }
    }

    if (!_.isNil(props.member)) {
        let src = props.member;
        if (!Array.isArray(src)) { src = [src]; }
        resource.member = [];

        for (let item of src) {
            let _member = {
                ...item
            };

            resource.member.push(_member);
        }
    }

    return resource;
}
