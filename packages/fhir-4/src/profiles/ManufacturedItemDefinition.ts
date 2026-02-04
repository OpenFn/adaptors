
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ManufacturedItemDefinition_Props = {
    contained?: any[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    ingredient?: MaybeArray<string[] | FHIR.CodeableConcept>;
    language?: string;
    manufacturedDoseForm?: string[] | FHIR.CodeableConcept;
    manufacturer?: MaybeArray<string | FHIR.Reference>;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    property?: FHIR.BackboneElement[];
    status?: string;
    text?: FHIR.Narrative;
    unitOfPresentation?: string[] | FHIR.CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<ManufacturedItemDefinition_Props>) {
    const resource = {
        resourceType: "ManufacturedItemDefinition",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.manufacturedDoseForm)) {
        resource.manufacturedDoseForm = dt.concept(props.manufacturedDoseForm);
    }

    if (!_.isNil(props.unitOfPresentation)) {
        resource.unitOfPresentation = dt.concept(props.unitOfPresentation);
    }

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.ingredient)) {
        if (!Array.isArray(props.ingredient)) { props.ingredient = [props.ingredient]; }
        resource.ingredient = dt.concept(props.ingredient);
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {
                ...item
            };

            resource.property.push(_property);
        }
    }

    return resource;
}
