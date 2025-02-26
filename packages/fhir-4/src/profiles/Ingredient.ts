
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Ingredient_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: string | FHIR.Identifier;
    status?: string;
    for?: MaybeArray<string | FHIR.Reference>;
    role?: string[] | FHIR.CodeableConcept;
    function?: MaybeArray<string[] | FHIR.CodeableConcept>;
    allergenicIndicator?: boolean;
    manufacturer?: FHIR.BackboneElement[];
    substance?: FHIR.BackboneElement;
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
