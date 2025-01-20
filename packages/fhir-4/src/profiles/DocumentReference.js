
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "DocumentReference",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DocumentReference</b></p></div>"
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

    if (!_.isNil(props.masterIdentifier)) {
        resource.masterIdentifier = util.identifier(props.masterIdentifier, undefined);
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.docStatus)) {
        resource.docStatus = props.docStatus;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.author)) {
        if (!Array.isArray(props.author)) { props.author = [props.author]; }
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.authenticator)) {
        resource.authenticator = util.reference(props.authenticator);
    }

    if (!_.isNil(props.custodian)) {
        resource.custodian = util.reference(props.custodian);
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

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.securityLabel)) {
        resource.securityLabel = props.securityLabel;
    }

    if (!_.isNil(props.content)) {
        let src = props.content;
        if (!Array.isArray(src)) { src = [src]; }
        resource.content = [];

        for (let item of src) {
            let _content = {};

            if (!_.isNil(item.id)) {
                _content.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _content.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.attachment)) {
                _content.attachment = item.attachment;
            }

            if (!_.isNil(item.format)) {
                _content.format = item.format;
            }

            resource.content.push(_content);
        }
    }

    if (!_.isNil(props.context)) {
        let src = props.context;
        let _context = {};

        if (!_.isNil(src.id)) {
            _context.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _context.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.encounter)) {
            _context.encounter = src.encounter;
        }

        if (!_.isNil(src.event)) {
            _context.event = src.event;
        }

        if (!_.isNil(src.period)) {
            _context.period = src.period;
        }

        if (!_.isNil(src.facilityType)) {
            _context.facilityType = src.facilityType;
        }

        if (!_.isNil(src.practiceSetting)) {
            _context.practiceSetting = src.practiceSetting;
        }

        if (!_.isNil(src.sourcePatientInfo)) {
            _context.sourcePatientInfo = src.sourcePatientInfo;
        }

        if (!_.isNil(src.related)) {
            _context.related = src.related;
        }

        resource.context = _context;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"]
    };

    return resource;
}
