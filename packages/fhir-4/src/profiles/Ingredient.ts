
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Ingredient_Props = {
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
    for?: Reference;
    role?: CodeableConcept;
    function?: CodeableConcept;
    allergenicIndicator?: boolean;
    manufacturer?: BackboneElement;
    substance?: BackboneElement;
};

export default function(props: Partial<Ingredient_Props>) {
    const resource = {
        resourceType: "Ingredient",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Ingredient</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Ingredient"]
    };

    return resource;
}
