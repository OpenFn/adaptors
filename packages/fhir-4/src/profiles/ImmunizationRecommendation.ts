
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ImmunizationRecommendation_Props = {
    authority?: string | FHIR.Reference;
    contained?: any[];
    date?: string;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    patient?: string | FHIR.Reference;
    recommendation?: FHIR.BackboneElement[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<ImmunizationRecommendation_Props>) {
    const resource = {
        resourceType: "ImmunizationRecommendation",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.authority)) {
        resource.authority = dt.reference(props.authority);
    }

    if (!_.isNil(props.recommendation)) {
        let src = props.recommendation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.recommendation = [];

        for (let item of src) {
            let _recommendation = {
                ...item
            };

            resource.recommendation.push(_recommendation);
        }
    }

    return resource;
}
