
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ChargeItemDefinition_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    url?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    version?: string;
    title?: string;
    derivedFromUri?: string[];
    partOf?: any[];
    replaces?: any[];
    status?: string;
    experimental?: boolean;
    date?: string;
    publisher?: string;
    contact?: FHIR.ContactDetail[];
    description?: FHIR.markdown;
    useContext?: FHIR.UsageContext[];
    jurisdiction?: MaybeArray<string[] | FHIR.CodeableConcept>;
    copyright?: FHIR.markdown;
    approvalDate?: string;
    lastReviewDate?: string;
    effectivePeriod?: FHIR.Period;
    code?: string[] | FHIR.CodeableConcept;
    instance?: MaybeArray<string | FHIR.Reference>;
    applicability?: FHIR.BackboneElement[];
    propertyGroup?: FHIR.BackboneElement[];
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
