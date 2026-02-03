
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type SubstanceDefinition_Props = {
    classification?: MaybeArray<string[] | FHIR.CodeableConcept>;
    code?: FHIR.BackboneElement[];
    contained?: any[];
    description?: FHIR.markdown;
    domain?: string[] | FHIR.CodeableConcept;
    extension?: FHIR.Extension[];
    grade?: MaybeArray<string[] | FHIR.CodeableConcept>;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    informationSource?: MaybeArray<string | FHIR.Reference>;
    language?: string;
    manufacturer?: MaybeArray<string | FHIR.Reference>;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    moiety?: FHIR.BackboneElement[];
    molecularWeight?: FHIR.BackboneElement[];
    name?: FHIR.BackboneElement[];
    note?: FHIR.Annotation[];
    property?: FHIR.BackboneElement[];
    relationship?: FHIR.BackboneElement[];
    sourceMaterial?: FHIR.BackboneElement;
    status?: string[] | FHIR.CodeableConcept;
    structure?: FHIR.BackboneElement;
    supplier?: MaybeArray<string | FHIR.Reference>;
    text?: FHIR.Narrative;
    version?: string;
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

    if (!_.isNil(props.status)) {
        resource.status = dt.concept(props.status);
    }

    if (!_.isNil(props.classification)) {
        if (!Array.isArray(props.classification)) { props.classification = [props.classification]; }
        resource.classification = dt.concept(props.classification);
    }

    if (!_.isNil(props.domain)) {
        resource.domain = dt.concept(props.domain);
    }

    if (!_.isNil(props.grade)) {
        if (!Array.isArray(props.grade)) { props.grade = [props.grade]; }
        resource.grade = dt.concept(props.grade);
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
