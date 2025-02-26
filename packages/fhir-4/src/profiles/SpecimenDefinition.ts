
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type SpecimenDefinition_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: string | FHIR.Identifier;
    typeCollected?: string[] | FHIR.CodeableConcept;
    patientPreparation?: MaybeArray<string[] | FHIR.CodeableConcept>;
    timeAspect?: string;
    collection?: MaybeArray<string[] | FHIR.CodeableConcept>;
    typeTested?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<SpecimenDefinition_Props>) {
    const resource = {
        resourceType: "SpecimenDefinition",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.typeTested)) {
        let src = props.typeTested;
        if (!Array.isArray(src)) { src = [src]; }
        resource.typeTested = [];

        for (let item of src) {
            let _typeTested = {
                ...item
            };

            resource.typeTested.push(_typeTested);
        }
    }

    return resource;
}
