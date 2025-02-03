
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type ObservationDefinition_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    category?: CodeableConcept;
    code?: CodeableConcept;
    identifier?: Identifier;
    permittedDataType?: string;
    multipleResultsAllowed?: boolean;
    method?: CodeableConcept;
    preferredReportName?: string;
    quantitativeDetails?: BackboneElement;
    qualifiedInterval?: BackboneElement;
    validCodedValueSet?: Reference;
    normalCodedValueSet?: Reference;
    abnormalCodedValueSet?: Reference;
    criticalCodedValueSet?: Reference;
};

export default function(props: Partial<ObservationDefinition_Props>) {
    const resource = {
        resourceType: "ObservationDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ObservationDefinition</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ObservationDefinition"]
    };

    return resource;
}
