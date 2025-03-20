
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ManufacturedItemDefinition_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    status?: string;
    manufacturedDoseForm?: string[] | FHIR.CodeableConcept;
    unitOfPresentation?: string[] | FHIR.CodeableConcept;
    manufacturer?: MaybeArray<string | FHIR.Reference>;
    ingredient?: MaybeArray<string[] | FHIR.CodeableConcept>;
    property?: FHIR.BackboneElement[];
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

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = dt.reference(props.manufacturer);
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
