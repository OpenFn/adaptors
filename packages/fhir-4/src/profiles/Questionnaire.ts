
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Questionnaire_Props = {
    approvalDate?: string;
    code?: FHIR.Coding[];
    contact?: FHIR.ContactDetail[];
    contained?: any[];
    copyright?: FHIR.markdown;
    date?: string;
    derivedFrom?: any[];
    description?: FHIR.markdown;
    effectivePeriod?: FHIR.Period;
    experimental?: boolean;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    item?: FHIR.BackboneElement[];
    jurisdiction?: MaybeArray<string[] | FHIR.CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    publisher?: string;
    purpose?: FHIR.markdown;
    status?: string;
    subjectType?: string[];
    text?: FHIR.Narrative;
    title?: string;
    url?: string;
    useContext?: FHIR.UsageContext[];
    version?: string;
    [key: string]: any;
};

export default function(props: Partial<Questionnaire_Props>) {
    const resource = {
        resourceType: "Questionnaire",
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

    if (!_.isNil(props.item)) {
        let src = props.item;
        if (!Array.isArray(src)) { src = [src]; }
        resource.item = [];

        for (let item of src) {
            let _item = {
                ...item
            };

            resource.item.push(_item);
        }
    }

    return resource;
}
