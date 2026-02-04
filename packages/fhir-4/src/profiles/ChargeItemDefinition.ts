
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ChargeItemDefinition_Props = {
    applicability?: FHIR.BackboneElement[];
    approvalDate?: string;
    code?: string[] | FHIR.CodeableConcept;
    contact?: FHIR.ContactDetail[];
    contained?: any[];
    copyright?: FHIR.markdown;
    date?: string;
    derivedFromUri?: string[];
    description?: FHIR.markdown;
    effectivePeriod?: FHIR.Period;
    experimental?: boolean;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    instance?: MaybeArray<string | FHIR.Reference>;
    jurisdiction?: MaybeArray<string[] | FHIR.CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    partOf?: any[];
    propertyGroup?: FHIR.BackboneElement[];
    publisher?: string;
    replaces?: any[];
    status?: string;
    text?: FHIR.Narrative;
    title?: string;
    url?: string;
    useContext?: FHIR.UsageContext[];
    version?: string;
    [key: string]: any;
};

export default function(props: Partial<ChargeItemDefinition_Props>) {
    const resource = {
        resourceType: "ChargeItemDefinition",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.jurisdiction)) {
        if (!Array.isArray(props.jurisdiction)) { props.jurisdiction = [props.jurisdiction]; }
        resource.jurisdiction = dt.concept(props.jurisdiction);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.instance)) {
        if (!Array.isArray(props.instance)) { props.instance = [props.instance]; }
        resource.instance = dt.reference(props.instance);
    }

    if (!_.isNil(props.applicability)) {
        let src = props.applicability;
        if (!Array.isArray(src)) { src = [src]; }
        resource.applicability = [];

        for (let item of src) {
            let _applicability = {
                ...item
            };

            resource.applicability.push(_applicability);
        }
    }

    if (!_.isNil(props.propertyGroup)) {
        let src = props.propertyGroup;
        if (!Array.isArray(src)) { src = [src]; }
        resource.propertyGroup = [];

        for (let item of src) {
            let _propertyGroup = {
                ...item
            };

            resource.propertyGroup.push(_propertyGroup);
        }
    }

    return resource;
}
