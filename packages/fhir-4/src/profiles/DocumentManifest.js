
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "DocumentManifest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DocumentManifest</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.author)) {
        if (!Array.isArray(props.author)) { props.author = [props.author]; }
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.recipient)) {
        if (!Array.isArray(props.recipient)) { props.recipient = [props.recipient]; }
        resource.recipient = util.reference(props.recipient);
    }

    if (!_.isNil(props.source)) {
        resource.source = props.source;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.content)) {
        if (!Array.isArray(props.content)) { props.content = [props.content]; }
        resource.content = util.reference(props.content);
    }

    if (!_.isNil(props.related)) {
        let src = props.related;
        if (!Array.isArray(src)) { src = [src]; }
        resource.related = [];

        for (let item of src) {
            let _related = {};

            if (!_.isNil(item.id)) {
                _related.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _related.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _related.identifier = item.identifier;
            }

            if (!_.isNil(item.ref)) {
                _related.ref = item.ref;
            }

            resource.related.push(_related);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DocumentManifest"]
    };

    return resource;
}
