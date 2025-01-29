
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type Citation_Props = {
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
    status?: any;
    experimental?: any;
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
    author?: any;
    editor?: any;
    reviewer?: any;
    endorser?: any;
    summary?: any;
    classification?: any;
    note?: any;
    currentState?: any;
    statusDate?: any;
    relatesTo?: any;
    citedArtifact?: any;
};

export default function(props: Partial<Citation_Props>) {
    const resource = {
        resourceType: "Citation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Citation</b></p></div>"
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
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

    if (!_.isNil(props.summary)) {
        let src = props.summary;
        if (!Array.isArray(src)) { src = [src]; }
        resource.summary = [];

        for (let item of src) {
            let _summary = {};

            if (!_.isNil(item.id)) {
                _summary.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _summary.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.style)) {
                _summary.style = item.style;
            }

            if (!_.isNil(item.text)) {
                _summary.text = item.text;
            }

            resource.summary.push(_summary);
        }
    }

    if (!_.isNil(props.classification)) {
        let src = props.classification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.classification = [];

        for (let item of src) {
            let _classification = {};

            if (!_.isNil(item.id)) {
                _classification.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _classification.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _classification.type = item.type;
            }

            if (!_.isNil(item.classifier)) {
                _classification.classifier = item.classifier;
            }

            resource.classification.push(_classification);
        }
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.currentState)) {
        resource.currentState = props.currentState;
    }

    if (!_.isNil(props.statusDate)) {
        let src = props.statusDate;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statusDate = [];

        for (let item of src) {
            let _statusDate = {};

            if (!_.isNil(item.id)) {
                _statusDate.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _statusDate.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.activity)) {
                _statusDate.activity = item.activity;
            }

            if (!_.isNil(item.actual)) {
                _statusDate.actual = item.actual;
            }

            if (!_.isNil(item.period)) {
                _statusDate.period = item.period;
            }

            resource.statusDate.push(_statusDate);
        }
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

            if (!_.isNil(item.relationshipType)) {
                _relatesTo.relationshipType = item.relationshipType;
            }

            if (!_.isNil(item.targetClassifier)) {
                _relatesTo.targetClassifier = item.targetClassifier;
            }

            if (!_.isNil(item.target)) {
                _relatesTo.target = item.target;
            }

            resource.relatesTo.push(_relatesTo);
        }
    }

    if (!_.isNil(props.citedArtifact)) {
        let src = props.citedArtifact;
        let _citedArtifact = {};

        if (!_.isNil(src.id)) {
            _citedArtifact.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _citedArtifact.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.identifier)) {
            _citedArtifact.identifier = src.identifier;
        }

        if (!_.isNil(src.relatedIdentifier)) {
            _citedArtifact.relatedIdentifier = src.relatedIdentifier;
        }

        if (!_.isNil(src.dateAccessed)) {
            _citedArtifact.dateAccessed = src.dateAccessed;
        }

        if (!_.isNil(src.version)) {
            _citedArtifact.version = src.version;
        }

        if (!_.isNil(src.currentState)) {
            _citedArtifact.currentState = src.currentState;
        }

        if (!_.isNil(src.statusDate)) {
            _citedArtifact.statusDate = src.statusDate;
        }

        if (!_.isNil(src.title)) {
            _citedArtifact.title = src.title;
        }

        if (!_.isNil(src.abstract)) {
            _citedArtifact.abstract = src.abstract;
        }

        if (!_.isNil(src.part)) {
            _citedArtifact.part = src.part;
        }

        if (!_.isNil(src.relatesTo)) {
            _citedArtifact.relatesTo = src.relatesTo;
        }

        if (!_.isNil(src.publicationForm)) {
            _citedArtifact.publicationForm = src.publicationForm;
        }

        if (!_.isNil(src.webLocation)) {
            _citedArtifact.webLocation = src.webLocation;
        }

        if (!_.isNil(src.classification)) {
            _citedArtifact.classification = src.classification;
        }

        if (!_.isNil(src.contributorship)) {
            _citedArtifact.contributorship = src.contributorship;
        }

        if (!_.isNil(src.note)) {
            _citedArtifact.note = src.note;
        }

        resource.citedArtifact = _citedArtifact;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Citation"]
    };

    return resource;
}
