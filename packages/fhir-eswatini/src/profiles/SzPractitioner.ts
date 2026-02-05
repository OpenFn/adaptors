
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Practitioner_SzPractitioner_Props = {
    active?: boolean;
    address?: FHIR.Address[];
    birthDate?: string;
    communication?: FHIR.CodeableConcept[];
    contained?: any[];
    extension?: FHIR.Extension[];
    gender?: string;
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: FHIR.HumanName[];
    photo?: FHIR.Attachment[];
    qualification?: FHIR.BackboneElement[];
    telecom?: FHIR.ContactPoint[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<Practitioner_SzPractitioner_Props>) {
    const resource = {
        resourceType: "Practitioner",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (let item of src) {
            let _name = {
                ...item
            };

            resource.name.push(_name);
        }
    }

    if (!_.isNil(props.qualification)) {
        let src = props.qualification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.qualification = [];

        for (let item of src) {
            let _qualification = {
                ...item
            };

            resource.qualification.push(_qualification);
        }
    }

    if (!_.isNil(props.communication)) {
        if (!Array.isArray(props.communication)) { props.communication = [props.communication]; }
        resource.communication = dt.concept(props.communication);
    }

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
