
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "EvidenceVariable",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EvidenceVariable</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
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

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
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

    if (!_.isNil(props.actual)) {
        resource.actual = props.actual;
    }

    if (!_.isNil(props.characteristicCombination)) {
        resource.characteristicCombination = props.characteristicCombination;
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

            if (!_.isNil(item.description)) {
                _characteristic.description = item.description;
            }

            if (!_.isNil(item.definition)) {
                _characteristic.definition = item.definition;
            }

            if (!_.isNil(item.method)) {
                _characteristic.method = item.method;
            }

            if (!_.isNil(item.device)) {
                _characteristic.device = item.device;
            }

            if (!_.isNil(item.exclude)) {
                _characteristic.exclude = item.exclude;
            }

            if (!_.isNil(item.timeFromStart)) {
                _characteristic.timeFromStart = item.timeFromStart;
            }

            if (!_.isNil(item.groupMeasure)) {
                _characteristic.groupMeasure = item.groupMeasure;
            }

            resource.characteristic.push(_characteristic);
        }
    }

    if (!_.isNil(props.handling)) {
        resource.handling = props.handling;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {};

            if (!_.isNil(item.id)) {
                _category.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _category.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _category.name = item.name;
            }

            if (!_.isNil(item.value)) {
                _category.value = item.value;
            }

            resource.category.push(_category);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"]
    };

    return resource;
}
