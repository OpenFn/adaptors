
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Specimen_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    accessionIdentifier?: string | FHIR.Identifier;
    status?: string;
    type?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    receivedTime?: string;
    parent?: MaybeArray<string | FHIR.Reference>;
    request?: MaybeArray<string | FHIR.Reference>;
    collection?: FHIR.BackboneElement;
    processing?: FHIR.BackboneElement[];
    container?: FHIR.BackboneElement[];
    condition?: MaybeArray<string[] | FHIR.CodeableConcept>;
    note?: FHIR.Annotation[];
    [key: string]: any;
};

export default function(props: Partial<Specimen_Props>) {
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

    return resource;
}
