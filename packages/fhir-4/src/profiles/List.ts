
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type List_Props = {
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
    mode?: string;
    title?: string;
    code?: CodeableConcept;
    subject?: Reference;
    encounter?: Reference;
    date?: string;
    source?: Reference;
    orderedBy?: CodeableConcept;
    note?: Annotation;
    entry?: BackboneElement;
    emptyReason?: CodeableConcept;
};

export default function(props: Partial<List_Props>) {
    const resource = {
        resourceType: "List",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>List</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.source)) {
        resource.source = dt.reference(props.source);
    }

    if (!_.isNil(props.entry)) {
        let src = props.entry;
        if (!Array.isArray(src)) { src = [src]; }
        resource.entry = [];

        for (let item of src) {
            let _entry = {
                ...item
            };

            resource.entry.push(_entry);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/List"]
    };

    return resource;
}
