
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type SubstanceDefinition_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    version?: string;
    status?: CodeableConcept;
    classification?: CodeableConcept;
    domain?: CodeableConcept;
    grade?: CodeableConcept;
    description?: markdown;
    informationSource?: Reference;
    note?: Annotation;
    manufacturer?: Reference;
    supplier?: Reference;
    moiety?: BackboneElement;
    property?: BackboneElement;
    molecularWeight?: BackboneElement;
    structure?: BackboneElement;
    code?: BackboneElement;
    name?: BackboneElement;
    relationship?: BackboneElement;
    sourceMaterial?: BackboneElement;
};

export default function(props: Partial<SubstanceDefinition_Props>) {
    const resource = {
        resourceType: "SubstanceDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SubstanceDefinition</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"]
    };

    return resource;
}
