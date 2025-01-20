
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "AllergyIntolerance",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AllergyIntolerance</b></p></div>"
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

    if (!_.isNil(props.clinicalStatus)) {
        resource.clinicalStatus = props.clinicalStatus;
    }

    if (!_.isNil(props.verificationStatus)) {
        resource.verificationStatus = props.verificationStatus;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.criticality)) {
        resource.criticality = props.criticality;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.onset)) {
        util.composite(resource, "onset", props.onset);
    }

    if (!_.isNil(props.recordedDate)) {
        resource.recordedDate = props.recordedDate;
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = util.reference(props.recorder);
    }

    if (!_.isNil(props.asserter)) {
        resource.asserter = util.reference(props.asserter);
    }

    if (!_.isNil(props.lastOccurrence)) {
        resource.lastOccurrence = props.lastOccurrence;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.reaction)) {
        let src = props.reaction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.reaction = [];

        for (let item of src) {
            let _reaction = {};

            if (!_.isNil(item.id)) {
                _reaction.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _reaction.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.substance)) {
                _reaction.substance = item.substance;
            }

            if (!_.isNil(item.manifestation)) {
                _reaction.manifestation = item.manifestation;
            }

            if (!_.isNil(item.description)) {
                _reaction.description = item.description;
            }

            if (!_.isNil(item.onset)) {
                _reaction.onset = item.onset;
            }

            if (!_.isNil(item.severity)) {
                _reaction.severity = item.severity;
            }

            if (!_.isNil(item.exposureRoute)) {
                _reaction.exposureRoute = item.exposureRoute;
            }

            if (!_.isNil(item.note)) {
                _reaction.note = item.note;
            }

            resource.reaction.push(_reaction);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance"]
    };

    return resource;
}
