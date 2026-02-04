
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Ingredient_Props = {
    allergenicIndicator?: boolean;
    contained?: any[];
    extension?: FHIR.Extension[];
    for?: MaybeArray<string | FHIR.Reference>;
    function?: MaybeArray<string[] | FHIR.CodeableConcept>;
    id?: string;
    identifier?: string | FHIR.Identifier;
    implicitRules?: string;
    language?: string;
    manufacturer?: FHIR.BackboneElement[];
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    role?: string[] | FHIR.CodeableConcept;
    status?: string;
    substance?: FHIR.BackboneElement;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<Ingredient_Props>) {
    const resource = {
        resourceType: "Ingredient",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.for)) {
        if (!Array.isArray(props.for)) { props.for = [props.for]; }
        resource.for = dt.reference(props.for);
    }

    if (!_.isNil(props.role)) {
        resource.role = dt.concept(props.role);
    }

    if (!_.isNil(props.function)) {
        if (!Array.isArray(props.function)) { props.function = [props.function]; }
        resource.function = dt.concept(props.function);
    }

    if (!_.isNil(props.manufacturer)) {
        let src = props.manufacturer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.manufacturer = [];

        for (let item of src) {
            let _manufacturer = {
                ...item
            };

            resource.manufacturer.push(_manufacturer);
        }
    }

    if (!_.isNil(props.substance)) {
        let src = props.substance;

        let _substance = {
            ...item
        };

        resource.substance = _substance;
    }

    return resource;
}
