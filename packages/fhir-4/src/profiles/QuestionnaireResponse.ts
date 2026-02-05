
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type QuestionnaireResponse_Props = {
    author?: string | FHIR.Reference;
    authored?: string;
    basedOn?: MaybeArray<string | FHIR.Reference>;
    contained?: any[];
    encounter?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: string | FHIR.Identifier;
    implicitRules?: string;
    item?: FHIR.BackboneElement[];
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    partOf?: MaybeArray<string | FHIR.Reference>;
    questionnaire?: any;
    source?: string | FHIR.Reference;
    status?: string;
    subject?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<QuestionnaireResponse_Props>) {
    const resource = {
        resourceType: "QuestionnaireResponse",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.source)) {
        resource.source = dt.reference(props.source);
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
