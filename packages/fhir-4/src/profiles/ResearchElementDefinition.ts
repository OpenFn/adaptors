
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type ResearchElementDefinition_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    url?: any;
    identifier?: dt.Identifier;
    version?: any;
    name?: any;
    title?: any;
    shortTitle?: any;
    subtitle?: any;
    status?: any;
    experimental?: any;
    subject?: any;
    date?: any;
    publisher?: any;
    contact?: any;
    description?: any;
    comment?: any;
    useContext?: any;
    jurisdiction?: any;
    purpose?: any;
    usage?: any;
    copyright?: any;
    approvalDate?: any;
    lastReviewDate?: any;
    effectivePeriod?: any;
    topic?: any;
    author?: any;
    editor?: any;
    reviewer?: any;
    endorser?: any;
    relatedArtifact?: any;
    library?: any;
    type?: any;
    variableType?: any;
    characteristic?: any;
};

export default function(props: Partial<ResearchElementDefinition_Props>) {
    const resource = {
        resourceType: "ResearchElementDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ResearchElementDefinition</b></p></div>"
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

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.shortTitle)) {
        resource.shortTitle = props.shortTitle;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.subject)) {
        dt.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
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

    if (!_.isNil(props.library)) {
        resource.library = props.library;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.variableType)) {
        resource.variableType = props.variableType;
    }

    if (!_.isNil(props.characteristic)) {
        let src = props.characteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.characteristic = [];

        for (let item of src) {
            let _characteristic = {};

            if (!_.isNil(item.id)) {
                _characteristic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _characteristic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.definition)) {
                _characteristic.definition = item.definition;
            }

            if (!_.isNil(item.usageContext)) {
                _characteristic.usageContext = item.usageContext;
            }

            if (!_.isNil(item.exclude)) {
                _characteristic.exclude = item.exclude;
            }

            if (!_.isNil(item.unitOfMeasure)) {
                _characteristic.unitOfMeasure = item.unitOfMeasure;
            }

            if (!_.isNil(item.studyEffectiveDescription)) {
                _characteristic.studyEffectiveDescription = item.studyEffectiveDescription;
            }

            if (!_.isNil(item.studyEffective)) {
                _characteristic.studyEffective = item.studyEffective;
            }

            if (!_.isNil(item.studyEffectiveTimeFromStart)) {
                _characteristic.studyEffectiveTimeFromStart = item.studyEffectiveTimeFromStart;
            }

            if (!_.isNil(item.studyEffectiveGroupMeasure)) {
                _characteristic.studyEffectiveGroupMeasure = item.studyEffectiveGroupMeasure;
            }

            if (!_.isNil(item.participantEffectiveDescription)) {
                _characteristic.participantEffectiveDescription = item.participantEffectiveDescription;
            }

            if (!_.isNil(item.participantEffective)) {
                _characteristic.participantEffective = item.participantEffective;
            }

            if (!_.isNil(item.participantEffectiveTimeFromStart)) {
                _characteristic.participantEffectiveTimeFromStart = item.participantEffectiveTimeFromStart;
            }

            if (!_.isNil(item.participantEffectiveGroupMeasure)) {
                _characteristic.participantEffectiveGroupMeasure = item.participantEffectiveGroupMeasure;
            }

            resource.characteristic.push(_characteristic);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ResearchElementDefinition"]
    };

    return resource;
}
