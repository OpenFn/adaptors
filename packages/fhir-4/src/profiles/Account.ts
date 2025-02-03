
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Account_Props = {
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
    subject?: Reference;
    servicePeriod?: Period;
    coverage?: BackboneElement;
    owner?: Reference;
    description?: string;
    guarantor?: BackboneElement;
    partOf?: Reference;
};

export default function(props: Partial<Account_Props>) {
    const resource = {
        resourceType: "Account",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Account</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Account"]
    };

    return resource;
}
