
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "ImplementationGuide",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ImplementationGuide</b></p></div>"
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

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.packageId)) {
        resource.packageId = props.packageId;
    }

    if (!_.isNil(props.license)) {
        resource.license = props.license;
    }

    if (!_.isNil(props.fhirVersion)) {
        resource.fhirVersion = props.fhirVersion;
    }

    if (!_.isNil(props.dependsOn)) {
        let src = props.dependsOn;
        if (!Array.isArray(src)) { src = [src]; }
        resource.dependsOn = [];

        for (let item of src) {
            let _dependsOn = {};

            if (!_.isNil(item.id)) {
                _dependsOn.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _dependsOn.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.uri)) {
                _dependsOn.uri = item.uri;
            }

            if (!_.isNil(item.packageId)) {
                _dependsOn.packageId = item.packageId;
            }

            if (!_.isNil(item.version)) {
                _dependsOn.version = item.version;
            }

            resource.dependsOn.push(_dependsOn);
        }
    }

    if (!_.isNil(props.global)) {
        let src = props.global;
        if (!Array.isArray(src)) { src = [src]; }
        resource.global = [];

        for (let item of src) {
            let _global = {};

            if (!_.isNil(item.id)) {
                _global.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _global.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _global.type = item.type;
            }

            if (!_.isNil(item.profile)) {
                _global.profile = item.profile;
            }

            resource.global.push(_global);
        }
    }

    if (!_.isNil(props.definition)) {
        let src = props.definition;
        let _definition = {};

        if (!_.isNil(src.id)) {
            _definition.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _definition.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.grouping)) {
            _definition.grouping = src.grouping;
        }

        if (!_.isNil(src.resource)) {
            _definition.resource = src.resource;
        }

        if (!_.isNil(src.page)) {
            _definition.page = src.page;
        }

        if (!_.isNil(src.parameter)) {
            _definition.parameter = src.parameter;
        }

        if (!_.isNil(src.template)) {
            _definition.template = src.template;
        }

        resource.definition = _definition;
    }

    if (!_.isNil(props.manifest)) {
        let src = props.manifest;
        let _manifest = {};

        if (!_.isNil(src.id)) {
            _manifest.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _manifest.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.rendering)) {
            _manifest.rendering = src.rendering;
        }

        if (!_.isNil(src.resource)) {
            _manifest.resource = src.resource;
        }

        if (!_.isNil(src.page)) {
            _manifest.page = src.page;
        }

        if (!_.isNil(src.image)) {
            _manifest.image = src.image;
        }

        if (!_.isNil(src.other)) {
            _manifest.other = src.other;
        }

        resource.manifest = _manifest;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ImplementationGuide"]
    };

    return resource;
}
