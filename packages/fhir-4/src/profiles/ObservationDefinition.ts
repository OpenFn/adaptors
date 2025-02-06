
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type ObservationDefinition_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    category?: FHIR.CodeableConcept;
    code?: FHIR.CodeableConcept;
    identifier?: FHIR.Identifier;
    permittedDataType?: string;
    multipleResultsAllowed?: boolean;
    method?: FHIR.CodeableConcept;
    preferredReportName?: string;
    quantitativeDetails?: FHIR.BackboneElement;
    qualifiedInterval?: FHIR.BackboneElement;
    validCodedValueSet?: FHIR.Reference;
    normalCodedValueSet?: FHIR.Reference;
    abnormalCodedValueSet?: FHIR.Reference;
    criticalCodedValueSet?: FHIR.Reference;
    initialiser?: any;
};

export default function(props: Partial<ObservationDefinition_Props>) {
    const resource = {
        resourceType: "ObservationDefinition",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
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
