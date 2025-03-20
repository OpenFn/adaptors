
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type SubstanceDefinition_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    version?: string;
    status?: string[] | FHIR.CodeableConcept;
    classification?: MaybeArray<string[] | FHIR.CodeableConcept>;
    domain?: string[] | FHIR.CodeableConcept;
    grade?: MaybeArray<string[] | FHIR.CodeableConcept>;
    description?: FHIR.markdown;
    informationSource?: MaybeArray<string | FHIR.Reference>;
    note?: FHIR.Annotation[];
    manufacturer?: MaybeArray<string | FHIR.Reference>;
    supplier?: MaybeArray<string | FHIR.Reference>;
    moiety?: FHIR.BackboneElement[];
    property?: FHIR.BackboneElement[];
    molecularWeight?: FHIR.BackboneElement[];
    structure?: FHIR.BackboneElement;
    code?: FHIR.BackboneElement[];
    name?: FHIR.BackboneElement[];
    relationship?: FHIR.BackboneElement[];
    sourceMaterial?: FHIR.BackboneElement;
    [key: string]: any;
};

export default function(props: Partial<SubstanceDefinition_Props>) {
    const resource = {
        resourceType: "SubstanceDefinition",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.informationSource)) {
        if (!Array.isArray(props.informationSource)) { props.informationSource = [props.informationSource]; }
        resource.informationSource = dt.reference(props.informationSource);
    }

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.supplier)) {
        if (!Array.isArray(props.supplier)) { props.supplier = [props.supplier]; }
        resource.supplier = dt.reference(props.supplier);
    }

    if (!_.isNil(props.moiety)) {
        let src = props.moiety;
        if (!Array.isArray(src)) { src = [src]; }
        resource.moiety = [];

        for (let item of src) {
            let _moiety = {
                ...item
            };

            resource.moiety.push(_moiety);
        }
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

    if (!_.isNil(props.molecularWeight)) {
        let src = props.molecularWeight;
        if (!Array.isArray(src)) { src = [src]; }
        resource.molecularWeight = [];

        for (let item of src) {
            let _molecularWeight = {
                ...item
            };

            resource.molecularWeight.push(_molecularWeight);
        }
    }

    if (!_.isNil(props.structure)) {
        let src = props.structure;

        let _structure = {
            ...item
        };

        resource.structure = _structure;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        if (!Array.isArray(src)) { src = [src]; }
        resource.code = [];

        for (let item of src) {
            let _code = {
                ...item
            };

            resource.code.push(_code);
        }
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

    if (!_.isNil(props.relationship)) {
        let src = props.relationship;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relationship = [];

        for (let item of src) {
            let _relationship = {
                ...item
            };

            resource.relationship.push(_relationship);
        }
    }

    if (!_.isNil(props.sourceMaterial)) {
        let src = props.sourceMaterial;

        let _sourceMaterial = {
            ...item
        };

        resource.sourceMaterial = _sourceMaterial;
    }

    return resource;
}
