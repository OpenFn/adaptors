
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Group_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    active?: boolean;
    type?: string;
    actual?: boolean;
    code?: CodeableConcept;
    name?: string;
    quantity?: number;
    managingEntity?: Reference;
    characteristic?: BackboneElement;
    member?: BackboneElement;
};

export default function(props: Partial<Group_Props>) {
    const resource = {
        resourceType: "Group",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Group</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Group"]
    };

    return resource;
}
