
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "CapabilityStatement",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CapabilityStatement</b></p></div>"
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

    if (!_.isNil(props.kind)) {
        resource.kind = props.kind;
    }

    if (!_.isNil(props.instantiates)) {
        resource.instantiates = props.instantiates;
    }

    if (!_.isNil(props.imports)) {
        resource.imports = props.imports;
    }

    if (!_.isNil(props.software)) {
        let src = props.software;
        let _software = {};

        if (!_.isNil(src.id)) {
            _software.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _software.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.name)) {
            _software.name = src.name;
        }

        if (!_.isNil(src.version)) {
            _software.version = src.version;
        }

        if (!_.isNil(src.releaseDate)) {
            _software.releaseDate = src.releaseDate;
        }

        resource.software = _software;
    }

    if (!_.isNil(props.implementation)) {
        let src = props.implementation;
        let _implementation = {};

        if (!_.isNil(src.id)) {
            _implementation.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _implementation.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.description)) {
            _implementation.description = src.description;
        }

        if (!_.isNil(src.url)) {
            _implementation.url = src.url;
        }

        if (!_.isNil(src.custodian)) {
            _implementation.custodian = src.custodian;
        }

        resource.implementation = _implementation;
    }

    if (!_.isNil(props.fhirVersion)) {
        resource.fhirVersion = props.fhirVersion;
    }

    if (!_.isNil(props.format)) {
        resource.format = props.format;
    }

    if (!_.isNil(props.patchFormat)) {
        resource.patchFormat = props.patchFormat;
    }

    if (!_.isNil(props.implementationGuide)) {
        resource.implementationGuide = props.implementationGuide;
    }

    if (!_.isNil(props.rest)) {
        let src = props.rest;
        if (!Array.isArray(src)) { src = [src]; }
        resource.rest = [];

        for (let item of src) {
            let _rest = {};

            if (!_.isNil(item.id)) {
                _rest.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _rest.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.mode)) {
                _rest.mode = item.mode;
            }

            if (!_.isNil(item.documentation)) {
                _rest.documentation = item.documentation;
            }

            if (!_.isNil(item.security)) {
                _rest.security = item.security;
            }

            if (!_.isNil(item.resource)) {
                _rest.resource = item.resource;
            }

            if (!_.isNil(item.interaction)) {
                _rest.interaction = item.interaction;
            }

            if (!_.isNil(item.compartment)) {
                _rest.compartment = item.compartment;
            }

            resource.rest.push(_rest);
        }
    }

    if (!_.isNil(props.messaging)) {
        let src = props.messaging;
        if (!Array.isArray(src)) { src = [src]; }
        resource.messaging = [];

        for (let item of src) {
            let _messaging = {};

            if (!_.isNil(item.id)) {
                _messaging.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _messaging.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.endpoint)) {
                _messaging.endpoint = item.endpoint;
            }

            if (!_.isNil(item.reliableCache)) {
                _messaging.reliableCache = item.reliableCache;
            }

            if (!_.isNil(item.documentation)) {
                _messaging.documentation = item.documentation;
            }

            if (!_.isNil(item.supportedMessage)) {
                _messaging.supportedMessage = item.supportedMessage;
            }

            resource.messaging.push(_messaging);
        }
    }

    if (!_.isNil(props.document)) {
        let src = props.document;
        if (!Array.isArray(src)) { src = [src]; }
        resource.document = [];

        for (let item of src) {
            let _document = {};

            if (!_.isNil(item.id)) {
                _document.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _document.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.mode)) {
                _document.mode = item.mode;
            }

            if (!_.isNil(item.documentation)) {
                _document.documentation = item.documentation;
            }

            if (!_.isNil(item.profile)) {
                _document.profile = item.profile;
            }

            resource.document.push(_document);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CapabilityStatement"]
    };

    return resource;
}
