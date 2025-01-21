
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Composition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Composition</b></p></div>"
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
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.author)) {
        if (!Array.isArray(props.author)) { props.author = [props.author]; }
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.confidentiality)) {
        resource.confidentiality = props.confidentiality;
    }

    if (!_.isNil(props.attester)) {
        let src = props.attester;
        if (!Array.isArray(src)) { src = [src]; }
        resource.attester = [];

        for (let item of src) {
            let _attester = {};

            if (!_.isNil(item.id)) {
                _attester.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _attester.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.mode)) {
                _attester.mode = item.mode;
            }

            if (!_.isNil(item.time)) {
                _attester.time = item.time;
            }

            if (!_.isNil(item.party)) {
                _attester.party = item.party;
            }

            resource.attester.push(_attester);
        }
    }

    if (!_.isNil(props.custodian)) {
        resource.custodian = dt.reference(props.custodian);
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

    if (!_.isNil(props.event)) {
        let src = props.event;
        if (!Array.isArray(src)) { src = [src]; }
        resource.event = [];

        for (let item of src) {
            let _event = {};

            if (!_.isNil(item.id)) {
                _event.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _event.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _event.code = item.code;
            }

            if (!_.isNil(item.period)) {
                _event.period = item.period;
            }

            if (!_.isNil(item.detail)) {
                _event.detail = item.detail;
            }

            resource.event.push(_event);
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

            if (!_.isNil(item.code)) {
                _section.code = item.code;
            }

            if (!_.isNil(item.author)) {
                _section.author = item.author;
            }

            if (!_.isNil(item.focus)) {
                _section.focus = item.focus;
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

            if (!_.isNil(item.entry)) {
                _section.entry = item.entry;
            }

            if (!_.isNil(item.emptyReason)) {
                _section.emptyReason = item.emptyReason;
            }

            resource.section.push(_section);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Composition"]
    };

    return resource;
}
