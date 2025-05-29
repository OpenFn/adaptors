
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type BiologicallyDerivedProduct_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    productCategory?: string;
    productCode?: string[] | FHIR.CodeableConcept;
    status?: string;
    request?: MaybeArray<string | FHIR.Reference>;
    quantity?: number;
    parent?: MaybeArray<string | FHIR.Reference>;
    collection?: FHIR.BackboneElement;
    processing?: FHIR.BackboneElement[];
    manipulation?: FHIR.BackboneElement;
    storage?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<BiologicallyDerivedProduct_Props>) {
    const resource = {
        resourceType: "BiologicallyDerivedProduct",
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

    return resource;
}
