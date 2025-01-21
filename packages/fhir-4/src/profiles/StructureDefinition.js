
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "StructureDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>StructureDefinition</b></p></div>"
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

    if (!_.isNil(props.keyword)) {
        resource.keyword = props.keyword;
    }

    if (!_.isNil(props.fhirVersion)) {
        resource.fhirVersion = props.fhirVersion;
    }

    if (!_.isNil(props.mapping)) {
        let src = props.mapping;
        if (!Array.isArray(src)) { src = [src]; }
        resource.mapping = [];

        for (let item of src) {
            let _mapping = {};

            if (!_.isNil(item.id)) {
                _mapping.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _mapping.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identity)) {
                _mapping.identity = item.identity;
            }

            if (!_.isNil(item.uri)) {
                _mapping.uri = item.uri;
            }

            if (!_.isNil(item.name)) {
                _mapping.name = item.name;
            }

            if (!_.isNil(item.comment)) {
                _mapping.comment = item.comment;
            }

            resource.mapping.push(_mapping);
        }
    }

    if (!_.isNil(props.kind)) {
        resource.kind = props.kind;
    }

    if (!_.isNil(props.abstract)) {
        resource.abstract = props.abstract;
    }

    if (!_.isNil(props.context)) {
        let src = props.context;
        if (!Array.isArray(src)) { src = [src]; }
        resource.context = [];

        for (let item of src) {
            let _context = {};

            if (!_.isNil(item.id)) {
                _context.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _context.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _context.type = item.type;
            }

            if (!_.isNil(item.expression)) {
                _context.expression = item.expression;
            }

            resource.context.push(_context);
        }
    }

    if (!_.isNil(props.contextInvariant)) {
        resource.contextInvariant = props.contextInvariant;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.baseDefinition)) {
        resource.baseDefinition = props.baseDefinition;
    }

    if (!_.isNil(props.derivation)) {
        resource.derivation = props.derivation;
    }

    if (!_.isNil(props.snapshot)) {
        let src = props.snapshot;
        let _snapshot = {};

        if (!_.isNil(src.id)) {
            _snapshot.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _snapshot.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.element)) {
            _snapshot.element = src.element;
        }

        resource.snapshot = _snapshot;
    }

    if (!_.isNil(props.differential)) {
        let src = props.differential;
        let _differential = {};

        if (!_.isNil(src.id)) {
            _differential.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _differential.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.element)) {
            _differential.element = src.element;
        }

        resource.differential = _differential;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"]
    };

    return resource;
}
