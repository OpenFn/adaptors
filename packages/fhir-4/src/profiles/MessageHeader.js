
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "MessageHeader",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MessageHeader</b></p></div>"
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

    if (!_.isNil(props.event)) {
        util.composite(resource, "event", props.event);
    }

    if (!_.isNil(props.destination)) {
        let src = props.destination;
        if (!Array.isArray(src)) { src = [src]; }
        resource.destination = [];

        for (let item of src) {
            let _destination = {};

            if (!_.isNil(item.id)) {
                _destination.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _destination.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _destination.name = item.name;
            }

            if (!_.isNil(item.target)) {
                _destination.target = item.target;
            }

            if (!_.isNil(item.endpoint)) {
                _destination.endpoint = item.endpoint;
            }

            if (!_.isNil(item.receiver)) {
                _destination.receiver = item.receiver;
            }

            resource.destination.push(_destination);
        }
    }

    if (!_.isNil(props.sender)) {
        resource.sender = util.reference(props.sender);
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = util.reference(props.enterer);
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.source)) {
        let src = props.source;
        let _source = {};

        if (!_.isNil(src.id)) {
            _source.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _source.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.name)) {
            _source.name = src.name;
        }

        if (!_.isNil(src.software)) {
            _source.software = src.software;
        }

        if (!_.isNil(src.version)) {
            _source.version = src.version;
        }

        if (!_.isNil(src.contact)) {
            _source.contact = src.contact;
        }

        if (!_.isNil(src.endpoint)) {
            _source.endpoint = src.endpoint;
        }

        resource.source = _source;
    }

    if (!_.isNil(props.responsible)) {
        resource.responsible = util.reference(props.responsible);
    }

    if (!_.isNil(props.reason)) {
        resource.reason = props.reason;
    }

    if (!_.isNil(props.response)) {
        let src = props.response;
        let _response = {};

        if (!_.isNil(src.id)) {
            _response.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _response.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.identifier)) {
            _response.identifier = src.identifier;
        }

        if (!_.isNil(src.code)) {
            _response.code = src.code;
        }

        if (!_.isNil(src.details)) {
            _response.details = src.details;
        }

        resource.response = _response;
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = util.reference(props.focus);
    }

    if (!_.isNil(props.definition)) {
        resource.definition = props.definition;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MessageHeader"]
    };

    return resource;
}
