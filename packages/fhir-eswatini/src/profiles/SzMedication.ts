
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Medication_SzMedication_Props = {
    amount?: FHIR.Ratio;
    batch?: FHIR.BackboneElement;
    code?: "100001" | "100009" | "100014" | "100089" | "100221" | "100238" | "100304" | "100449" | "100460" | "100528" | "100648" | "100651" | "100654" | "100666" | "100686" | "100689" | "100700" | "100706" | "100707" | "100734" | "102263" | "102266" | "102268" | "102272" | "102273" | "102276" | "102277" | "102280" | "102282" | "102304" | "102323" | "102324" | "102327" | "102332" | "102333" | "102341" | "102346" | "102348" | "102443" | "102492" | "102502";
    contained?: any[];
    extension?: FHIR.Extension[];
    form?: FHIR.CodeableConcept;
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    ingredient?: FHIR.BackboneElement[];
    language?: string;
    manufacturer?: FHIR.Reference;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    status?: string;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<Medication_SzMedication_Props>) {
    const resource = {
        resourceType: "Medication",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.form)) {
        resource.form = dt.concept(props.form);
    }

    if (!_.isNil(props.ingredient)) {
        let src = props.ingredient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.ingredient = [];

        for (let item of src) {
            let _ingredient = {
                ...item
            };

            resource.ingredient.push(_ingredient);
        }
    }

    if (!_.isNil(props.batch)) {
        let src = props.batch;

        let _batch = {
            ...item
        };

        resource.batch = _batch;
    }

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
