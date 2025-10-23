
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type SpecimenDefinition_Props = {
    collection?: MaybeArray<string[] | FHIR.CodeableConcept>;
    contained?: any[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: string | FHIR.Identifier;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    patientPreparation?: MaybeArray<string[] | FHIR.CodeableConcept>;
    text?: FHIR.Narrative;
    timeAspect?: string;
    typeCollected?: string[] | FHIR.CodeableConcept;
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
