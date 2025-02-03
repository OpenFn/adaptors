
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type MolecularSequence_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    type?: string;
    coordinateSystem?: number;
    patient?: Reference;
    specimen?: Reference;
    device?: Reference;
    performer?: Reference;
    quantity?: Quantity;
    referenceSeq?: BackboneElement;
    variant?: BackboneElement;
    observedSeq?: string;
    quality?: BackboneElement;
    readCoverage?: number;
    repository?: BackboneElement;
    pointer?: Reference;
    structureVariant?: BackboneElement;
};

export default function(props: Partial<MolecularSequence_Props>) {
    const resource = {
        resourceType: "MolecularSequence",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MolecularSequence</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = dt.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.referenceSeq)) {
        let src = props.referenceSeq;

        let _referenceSeq = {
            ...item
        };

        resource.referenceSeq = _referenceSeq;
    }

    if (!_.isNil(props.variant)) {
        let src = props.variant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.variant = [];

        for (let item of src) {
            let _variant = {
                ...item
            };

            resource.variant.push(_variant);
        }
    }

    if (!_.isNil(props.quality)) {
        let src = props.quality;
        if (!Array.isArray(src)) { src = [src]; }
        resource.quality = [];

        for (let item of src) {
            let _quality = {
                ...item
            };

            resource.quality.push(_quality);
        }
    }

    if (!_.isNil(props.repository)) {
        let src = props.repository;
        if (!Array.isArray(src)) { src = [src]; }
        resource.repository = [];

        for (let item of src) {
            let _repository = {
                ...item
            };

            resource.repository.push(_repository);
        }
    }

    if (!_.isNil(props.pointer)) {
        if (!Array.isArray(props.pointer)) { props.pointer = [props.pointer]; }
        resource.pointer = dt.reference(props.pointer);
    }

    if (!_.isNil(props.structureVariant)) {
        let src = props.structureVariant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.structureVariant = [];

        for (let item of src) {
            let _structureVariant = {
                ...item
            };

            resource.structureVariant.push(_structureVariant);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MolecularSequence"]
    };

    return resource;
}
