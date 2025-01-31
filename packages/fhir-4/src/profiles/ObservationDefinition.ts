
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
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.implicitRules)) {
        resource.implicitRules = props.implicitRules;
    }

    if (!_.isNil(props.language)) {
        resource.language = props.language;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.contained)) {
        resource.contained = props.contained;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.permittedDataType)) {
        resource.permittedDataType = props.permittedDataType;
    }

    if (!_.isNil(props.multipleResultsAllowed)) {
        resource.multipleResultsAllowed = props.multipleResultsAllowed;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.preferredReportName)) {
        resource.preferredReportName = props.preferredReportName;
    }

    if (!_.isNil(props.quantitativeDetails)) {
        let src = props.quantitativeDetails;
        let _quantitativeDetails = {};

        if (!_.isNil(src.id)) {
            _quantitativeDetails.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _quantitativeDetails.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.customaryUnit)) {
            _quantitativeDetails.customaryUnit = src.customaryUnit;
        }

        if (!_.isNil(src.unit)) {
            _quantitativeDetails.unit = src.unit;
        }

        if (!_.isNil(src.conversionFactor)) {
            _quantitativeDetails.conversionFactor = src.conversionFactor;
        }

        if (!_.isNil(src.decimalPrecision)) {
            _quantitativeDetails.decimalPrecision = src.decimalPrecision;
        }

        resource.quantitativeDetails = _quantitativeDetails;
    }

    if (!_.isNil(props.qualifiedInterval)) {
        let src = props.qualifiedInterval;
        if (!Array.isArray(src)) { src = [src]; }
        resource.qualifiedInterval = [];

        for (let item of src) {
            let _qualifiedInterval = {};

            if (!_.isNil(item.id)) {
                _qualifiedInterval.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _qualifiedInterval.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.category)) {
                _qualifiedInterval.category = item.category;
            }

            if (!_.isNil(item.range)) {
                _qualifiedInterval.range = item.range;
            }

            if (!_.isNil(item.context)) {
                _qualifiedInterval.context = item.context;
            }

            if (!_.isNil(item.appliesTo)) {
                _qualifiedInterval.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.gender)) {
                _qualifiedInterval.gender = item.gender;
            }

            if (!_.isNil(item.age)) {
                _qualifiedInterval.age = item.age;
            }

            if (!_.isNil(item.gestationalAge)) {
                _qualifiedInterval.gestationalAge = item.gestationalAge;
            }

            if (!_.isNil(item.condition)) {
                _qualifiedInterval.condition = item.condition;
            }

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
