
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type BiologicallyDerivedProduct_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    productCategory?: string;
    productCode?: CodeableConcept;
    status?: string;
    request?: Reference;
    quantity?: number;
    parent?: Reference;
    collection?: BackboneElement;
    processing?: BackboneElement;
    manipulation?: BackboneElement;
    storage?: BackboneElement;
};

export default function(props: Partial<BiologicallyDerivedProduct_Props>) {
    const resource = {
        resourceType: "BiologicallyDerivedProduct",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>BiologicallyDerivedProduct</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.request)) {
        if (!Array.isArray(props.request)) { props.request = [props.request]; }
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.parent)) {
        if (!Array.isArray(props.parent)) { props.parent = [props.parent]; }
        resource.parent = dt.reference(props.parent);
    }

    if (!_.isNil(props.collection)) {
        let src = props.collection;

        let _collection = {
            ...item
        };

        resource.collection = _collection;
    }

    if (!_.isNil(props.processing)) {
        let src = props.processing;
        if (!Array.isArray(src)) { src = [src]; }
        resource.processing = [];

        for (let item of src) {
            let _processing = {
                ...item
            };

            resource.processing.push(_processing);
        }
    }

    if (!_.isNil(props.manipulation)) {
        let src = props.manipulation;

        let _manipulation = {
            ...item
        };

        resource.manipulation = _manipulation;
    }

    if (!_.isNil(props.storage)) {
        let src = props.storage;
        if (!Array.isArray(src)) { src = [src]; }
        resource.storage = [];

        for (let item of src) {
            let _storage = {
                ...item
            };

            resource.storage.push(_storage);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct"]
    };

    return resource;
}
