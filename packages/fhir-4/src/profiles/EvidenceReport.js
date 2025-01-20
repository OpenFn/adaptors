
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "EvidenceReport",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EvidenceReport</b></p></div>"
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.relatedIdentifier)) {
        if (!Array.isArray(props.relatedIdentifier)) { props.relatedIdentifier = [props.relatedIdentifier]; }
        resource.relatedIdentifier = util.identifier(props.relatedIdentifier, undefined);
    }

    if (!_.isNil(props.citeAs)) {
        util.composite(resource, "citeAs", props.citeAs);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.subject)) {
        let src = props.subject;
        let _subject = {};

        if (!_.isNil(src.id)) {
            _subject.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _subject.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.characteristic)) {
            _subject.characteristic = src.characteristic;
        }

        if (!_.isNil(src.note)) {
            _subject.note = src.note;
        }

        resource.subject = _subject;
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

    if (!_.isNil(props.relatesTo)) {
        let src = props.relatesTo;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relatesTo = [];

        for (let item of src) {
            let _relatesTo = {};

            if (!_.isNil(item.id)) {
                _relatesTo.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _relatesTo.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _relatesTo.code = item.code;
            }

            if (!_.isNil(item.target)) {
                _relatesTo.target = item.target;
            }

            resource.relatesTo.push(_relatesTo);
        }
    }

    if (!_.isNil(props.section)) {
        let src = props.section;
        if (!Array.isArray(src)) { src = [src]; }
        resource.section = [];

        for (let item of src) {
            let _section = {};

            if (!_.isNil(item.id)) {
                _section.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _section.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.title)) {
                _section.title = item.title;
            }

            if (!_.isNil(item.focus)) {
                _section.focus = item.focus;
            }

            if (!_.isNil(item.focusReference)) {
                _section.focusReference = item.focusReference;
            }

            if (!_.isNil(item.author)) {
                _section.author = item.author;
            }

            if (!_.isNil(item.text)) {
                _section.text = item.text;
            }

            if (!_.isNil(item.mode)) {
                _section.mode = item.mode;
            }

            if (!_.isNil(item.orderedBy)) {
                _section.orderedBy = item.orderedBy;
            }

            if (!_.isNil(item.entryClassifier)) {
                _section.entryClassifier = item.entryClassifier;
            }

            if (!_.isNil(item.entryReference)) {
                _section.entryReference = item.entryReference;
            }

            if (!_.isNil(item.entryQuantity)) {
                _section.entryQuantity = item.entryQuantity;
            }

            if (!_.isNil(item.emptyReason)) {
                _section.emptyReason = item.emptyReason;
            }

            resource.section.push(_section);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EvidenceReport"]
    };

    return resource;
}
