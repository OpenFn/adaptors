
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ObservationDefinition_Props = {
    abnormalCodedValueSet?: string | FHIR.Reference;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    code?: string[] | FHIR.CodeableConcept;
    contained?: any[];
    criticalCodedValueSet?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    method?: string[] | FHIR.CodeableConcept;
    modifierExtension?: FHIR.Extension[];
    multipleResultsAllowed?: boolean;
    normalCodedValueSet?: string | FHIR.Reference;
    permittedDataType?: string[];
    preferredReportName?: string;
    qualifiedInterval?: FHIR.BackboneElement[];
    quantitativeDetails?: FHIR.BackboneElement;
    text?: FHIR.Narrative;
    validCodedValueSet?: string | FHIR.Reference;
    [key: string]: any;
};

export default function(props: Partial<ObservationDefinition_Props>) {
    const resource = {
        resourceType: "ObservationDefinition",
        ...props
    };

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.method)) {
        resource.method = dt.concept(props.method);
    }

    if (!_.isNil(props.quantitativeDetails)) {
        let src = props.quantitativeDetails;

        let _quantitativeDetails = {
            ...item
        };

        resource.quantitativeDetails = _quantitativeDetails;
    }

    if (!_.isNil(props.qualifiedInterval)) {
        let src = props.qualifiedInterval;
        if (!Array.isArray(src)) { src = [src]; }
        resource.qualifiedInterval = [];

        for (let item of src) {
            let _qualifiedInterval = {
                ...item
            };

            resource.qualifiedInterval.push(_qualifiedInterval);
        }
    }

    if (!_.isNil(props.validCodedValueSet)) {
        resource.validCodedValueSet = dt.reference(props.validCodedValueSet);
    }

    if (!_.isNil(props.normalCodedValueSet)) {
        resource.normalCodedValueSet = dt.reference(props.normalCodedValueSet);
    }

    if (!_.isNil(props.abnormalCodedValueSet)) {
        resource.abnormalCodedValueSet = dt.reference(props.abnormalCodedValueSet);
    }

    if (!_.isNil(props.criticalCodedValueSet)) {
        resource.criticalCodedValueSet = dt.reference(props.criticalCodedValueSet);
    }

    return resource;
}
