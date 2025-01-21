
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Evidence",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Evidence</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.citeAs)) {
        dt.composite(resource, "citeAs", props.citeAs);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.assertion)) {
        resource.assertion = props.assertion;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.variableDefinition)) {
        let src = props.variableDefinition;
        if (!Array.isArray(src)) { src = [src]; }
        resource.variableDefinition = [];

        for (let item of src) {
            let _variableDefinition = {};

            if (!_.isNil(item.id)) {
                _variableDefinition.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _variableDefinition.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _variableDefinition.description = item.description;
            }

            if (!_.isNil(item.note)) {
                _variableDefinition.note = item.note;
            }

            if (!_.isNil(item.variableRole)) {
                _variableDefinition.variableRole = item.variableRole;
            }

            if (!_.isNil(item.observed)) {
                _variableDefinition.observed = item.observed;
            }

            if (!_.isNil(item.intended)) {
                _variableDefinition.intended = item.intended;
            }

            if (!_.isNil(item.directnessMatch)) {
                _variableDefinition.directnessMatch = item.directnessMatch;
            }

            resource.variableDefinition.push(_variableDefinition);
        }
    }

    if (!_.isNil(props.synthesisType)) {
        resource.synthesisType = props.synthesisType;
    }

    if (!_.isNil(props.studyType)) {
        resource.studyType = props.studyType;
    }

    if (!_.isNil(props.statistic)) {
        let src = props.statistic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statistic = [];

        for (let item of src) {
            let _statistic = {};

            if (!_.isNil(item.id)) {
                _statistic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _statistic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _statistic.description = item.description;
            }

            if (!_.isNil(item.note)) {
                _statistic.note = item.note;
            }

            if (!_.isNil(item.statisticType)) {
                _statistic.statisticType = item.statisticType;
            }

            if (!_.isNil(item.category)) {
                _statistic.category = item.category;
            }

            if (!_.isNil(item.quantity)) {
                _statistic.quantity = item.quantity;
            }

            if (!_.isNil(item.numberOfEvents)) {
                _statistic.numberOfEvents = item.numberOfEvents;
            }

            if (!_.isNil(item.numberAffected)) {
                _statistic.numberAffected = item.numberAffected;
            }

            if (!_.isNil(item.sampleSize)) {
                _statistic.sampleSize = item.sampleSize;
            }

            if (!_.isNil(item.attributeEstimate)) {
                _statistic.attributeEstimate = item.attributeEstimate;
            }

            if (!_.isNil(item.modelCharacteristic)) {
                _statistic.modelCharacteristic = item.modelCharacteristic;
            }

            resource.statistic.push(_statistic);
        }
    }

    if (!_.isNil(props.certainty)) {
        let src = props.certainty;
        if (!Array.isArray(src)) { src = [src]; }
        resource.certainty = [];

        for (let item of src) {
            let _certainty = {};

            if (!_.isNil(item.id)) {
                _certainty.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _certainty.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _certainty.description = item.description;
            }

            if (!_.isNil(item.note)) {
                _certainty.note = item.note;
            }

            if (!_.isNil(item.type)) {
                _certainty.type = item.type;
            }

            if (!_.isNil(item.rating)) {
                _certainty.rating = item.rating;
            }

            if (!_.isNil(item.rater)) {
                _certainty.rater = item.rater;
            }

            resource.certainty.push(_certainty);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Evidence"]
    };

    return resource;
}
