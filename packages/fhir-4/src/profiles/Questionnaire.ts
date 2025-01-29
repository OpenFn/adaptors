
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type Questionnaire_Props = {
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
    derivedFrom?: any;
    status?: any;
    experimental?: any;
    subjectType?: any;
    date?: any;
    publisher?: any;
    contact?: any;
    description?: any;
    useContext?: any;
    jurisdiction?: any;
    purpose?: any;
    copyright?: any;
    approvalDate?: any;
    lastReviewDate?: any;
    effectivePeriod?: any;
    code?: any;
    item?: any;
};

export default function(props: Partial<Questionnaire_Props>) {
    const resource = {
        resourceType: "Questionnaire",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Questionnaire</b></p></div>"
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

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.subjectType)) {
        resource.subjectType = props.subjectType;
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

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
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

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.item)) {
        let src = props.item;
        if (!Array.isArray(src)) { src = [src]; }
        resource.item = [];

        for (let item of src) {
            let _item = {};

            if (!_.isNil(item.id)) {
                _item.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _item.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.linkId)) {
                _item.linkId = item.linkId;
            }

            if (!_.isNil(item.definition)) {
                _item.definition = item.definition;
            }

            if (!_.isNil(item.code)) {
                _item.code = item.code;
            }

            if (!_.isNil(item.prefix)) {
                _item.prefix = item.prefix;
            }

            if (!_.isNil(item.text)) {
                _item.text = item.text;
            }

            if (!_.isNil(item.type)) {
                _item.type = item.type;
            }

            if (!_.isNil(item.enableWhen)) {
                _item.enableWhen = item.enableWhen;
            }

            if (!_.isNil(item.enableBehavior)) {
                _item.enableBehavior = item.enableBehavior;
            }

            if (!_.isNil(item.required)) {
                _item.required = item.required;
            }

            if (!_.isNil(item.repeats)) {
                _item.repeats = item.repeats;
            }

            if (!_.isNil(item.readOnly)) {
                _item.readOnly = item.readOnly;
            }

            if (!_.isNil(item.maxLength)) {
                _item.maxLength = item.maxLength;
            }

            if (!_.isNil(item.answerValueSet)) {
                _item.answerValueSet = item.answerValueSet;
            }

            if (!_.isNil(item.answerOption)) {
                _item.answerOption = item.answerOption;
            }

            if (!_.isNil(item.initial)) {
                _item.initial = item.initial;
            }

            resource.item.push(_item);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Questionnaire"]
    };

    return resource;
}
