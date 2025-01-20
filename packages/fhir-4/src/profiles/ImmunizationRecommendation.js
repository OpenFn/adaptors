
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "ImmunizationRecommendation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ImmunizationRecommendation</b></p></div>"
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

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.authority)) {
        resource.authority = util.reference(props.authority);
    }

    if (!_.isNil(props.recommendation)) {
        let src = props.recommendation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.recommendation = [];

        for (let item of src) {
            let _recommendation = {};

            if (!_.isNil(item.id)) {
                _recommendation.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _recommendation.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.vaccineCode)) {
                _recommendation.vaccineCode = item.vaccineCode;
            }

            if (!_.isNil(item.targetDisease)) {
                _recommendation.targetDisease = item.targetDisease;
            }

            if (!_.isNil(item.contraindicatedVaccineCode)) {
                _recommendation.contraindicatedVaccineCode = item.contraindicatedVaccineCode;
            }

            if (!_.isNil(item.forecastStatus)) {
                _recommendation.forecastStatus = item.forecastStatus;
            }

            if (!_.isNil(item.forecastReason)) {
                _recommendation.forecastReason = item.forecastReason;
            }

            if (!_.isNil(item.dateCriterion)) {
                _recommendation.dateCriterion = item.dateCriterion;
            }

            if (!_.isNil(item.description)) {
                _recommendation.description = item.description;
            }

            if (!_.isNil(item.series)) {
                _recommendation.series = item.series;
            }

            if (!_.isNil(item.doseNumber)) {
                _recommendation.doseNumber = item.doseNumber;
            }

            if (!_.isNil(item.seriesDoses)) {
                _recommendation.seriesDoses = item.seriesDoses;
            }

            if (!_.isNil(item.supportingImmunization)) {
                _recommendation.supportingImmunization = item.supportingImmunization;
            }

            if (!_.isNil(item.supportingPatientInformation)) {
                _recommendation.supportingPatientInformation = item.supportingPatientInformation;
            }

            resource.recommendation.push(_recommendation);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation"]
    };

    return resource;
}
