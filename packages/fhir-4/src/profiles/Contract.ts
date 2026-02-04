
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Contract_Props = {
    alias?: string[];
    applies?: FHIR.Period;
    author?: string | FHIR.Reference;
    authority?: MaybeArray<string | FHIR.Reference>;
    contained?: any[];
    contentDefinition?: FHIR.BackboneElement;
    contentDerivative?: string[] | FHIR.CodeableConcept;
    domain?: MaybeArray<string | FHIR.Reference>;
    expirationType?: string[] | FHIR.CodeableConcept;
    extension?: FHIR.Extension[];
    friendly?: FHIR.BackboneElement[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: string | FHIR.Reference;
    instantiatesUri?: string;
    issued?: string;
    language?: string;
    legal?: FHIR.BackboneElement[];
    legalState?: string[] | FHIR.CodeableConcept;
    legallyBinding?: FHIR.Attachment | string | FHIR.Reference;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    relevantHistory?: MaybeArray<string | FHIR.Reference>;
    rule?: FHIR.BackboneElement[];
    scope?: string[] | FHIR.CodeableConcept;
    signer?: FHIR.BackboneElement[];
    site?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    subType?: MaybeArray<string[] | FHIR.CodeableConcept>;
    subject?: MaybeArray<string | FHIR.Reference>;
    subtitle?: string;
    supportingInfo?: MaybeArray<string | FHIR.Reference>;
    term?: FHIR.BackboneElement[];
    text?: FHIR.Narrative;
    title?: string;
    topic?: string[] | FHIR.CodeableConcept | string | FHIR.Reference;
    type?: string[] | FHIR.CodeableConcept;
    url?: string;
    version?: string;
    [key: string]: any;
};

export default function(props: Partial<Contract_Props>) {
    const resource = {
        resourceType: "Contract",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.legalState)) {
        resource.legalState = dt.concept(props.legalState);
    }

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = dt.reference(props.instantiatesCanonical);
    }

    if (!_.isNil(props.contentDerivative)) {
        resource.contentDerivative = dt.concept(props.contentDerivative);
    }

    if (!_.isNil(props.expirationType)) {
        resource.expirationType = dt.concept(props.expirationType);
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.authority)) {
        if (!Array.isArray(props.authority)) { props.authority = [props.authority]; }
        resource.authority = dt.reference(props.authority);
    }

    if (!_.isNil(props.domain)) {
        if (!Array.isArray(props.domain)) { props.domain = [props.domain]; }
        resource.domain = dt.reference(props.domain);
    }

    if (!_.isNil(props.site)) {
        if (!Array.isArray(props.site)) { props.site = [props.site]; }
        resource.site = dt.reference(props.site);
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.scope)) {
        resource.scope = dt.concept(props.scope);
    }

    if (!_.isNil(props.topic)) {
        delete resource.topic;
        dt.composite(resource, "topic", props.topic);
    }

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.subType)) {
        if (!Array.isArray(props.subType)) { props.subType = [props.subType]; }
        resource.subType = dt.concept(props.subType);
    }

    if (!_.isNil(props.contentDefinition)) {
        let src = props.contentDefinition;

        let _contentDefinition = {
            ...item
        };

        resource.contentDefinition = _contentDefinition;
    }

    if (!_.isNil(props.term)) {
        let src = props.term;
        if (!Array.isArray(src)) { src = [src]; }
        resource.term = [];

        for (let item of src) {
            let _term = {
                ...item
            };

            resource.term.push(_term);
        }
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = dt.reference(props.supportingInfo);
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = dt.reference(props.relevantHistory);
    }

    if (!_.isNil(props.signer)) {
        let src = props.signer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.signer = [];

        for (let item of src) {
            let _signer = {
                ...item
            };

            resource.signer.push(_signer);
        }
    }

    if (!_.isNil(props.friendly)) {
        let src = props.friendly;
        if (!Array.isArray(src)) { src = [src]; }
        resource.friendly = [];

        for (let item of src) {
            let _friendly = {
                ...item
            };

            resource.friendly.push(_friendly);
        }
    }

    if (!_.isNil(props.legal)) {
        let src = props.legal;
        if (!Array.isArray(src)) { src = [src]; }
        resource.legal = [];

        for (let item of src) {
            let _legal = {
                ...item
            };

            resource.legal.push(_legal);
        }
    }

    if (!_.isNil(props.rule)) {
        let src = props.rule;
        if (!Array.isArray(src)) { src = [src]; }
        resource.rule = [];

        for (let item of src) {
            let _rule = {
                ...item
            };

            resource.rule.push(_rule);
        }
    }

    if (!_.isNil(props.legallyBinding)) {
        delete resource.legallyBinding;
        dt.composite(resource, "legallyBinding", props.legallyBinding);
    }

    return resource;
}
