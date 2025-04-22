
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Group_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    active?: boolean;
    type?: string;
    actual?: boolean;
    code?: string[] | FHIR.CodeableConcept;
    name?: string;
    quantity?: number;
    managingEntity?: string | FHIR.Reference;
    characteristic?: FHIR.BackboneElement[];
    member?: FHIR.BackboneElement[];
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
