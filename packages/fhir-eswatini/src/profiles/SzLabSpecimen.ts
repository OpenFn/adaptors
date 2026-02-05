
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Specimen_SzLabSpecimen_Props = {
    accessionIdentifier?: FHIR.Identifier;
    collection?: FHIR.BackboneElement;
    condition?: FHIR.CodeableConcept[];
    contained?: any[];
    container?: FHIR.BackboneElement[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    parent?: FHIR.Reference[];
    processing?: FHIR.BackboneElement[];
    receivedTime?: string;
    request?: FHIR.Reference[];
    status?: string;
    subject?: FHIR.Reference;
    text?: FHIR.Narrative;
    type?: FHIR.CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<Specimen_SzLabSpecimen_Props>) {
    const resource = {
        resourceType: "Specimen",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.accessionIdentifier)) {
        resource.accessionIdentifier = dt.identifier(props.accessionIdentifier);
    }

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.parent)) {
        if (!Array.isArray(props.parent)) { props.parent = [props.parent]; }
        resource.parent = dt.reference(props.parent);
    }

    if (!_.isNil(props.request)) {
        if (!Array.isArray(props.request)) { props.request = [props.request]; }
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.collection)) {
        let src = props.collection;

        let _collection = {
            ...item
        };

        resource.collection = _collection;
    }

    if (!_.isNil(props.processing)) {
        let src = props.processing;
        if (!Array.isArray(src)) { src = [src]; }
        resource.processing = [];

        for (let item of src) {
            let _processing = {
                ...item
            };

            resource.processing.push(_processing);
        }
    }

    if (!_.isNil(props.container)) {
        let src = props.container;
        if (!Array.isArray(src)) { src = [src]; }
        resource.container = [];

        for (let item of src) {
            let _container = {
                ...item
            };

            resource.container.push(_container);
        }
    }

    if (!_.isNil(props.condition)) {
        if (!Array.isArray(props.condition)) { props.condition = [props.condition]; }
        resource.condition = dt.concept(props.condition);
    }

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
