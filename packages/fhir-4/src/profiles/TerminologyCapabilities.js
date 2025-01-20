
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "TerminologyCapabilities",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>TerminologyCapabilities</b></p></div>"
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

        resource.implementation = _implementation;
    }

    if (!_.isNil(props.lockedDate)) {
        resource.lockedDate = props.lockedDate;
    }

    if (!_.isNil(props.codeSystem)) {
        let src = props.codeSystem;
        if (!Array.isArray(src)) { src = [src]; }
        resource.codeSystem = [];

        for (let item of src) {
            let _codeSystem = {};

            if (!_.isNil(item.id)) {
                _codeSystem.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _codeSystem.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.uri)) {
                _codeSystem.uri = item.uri;
            }

            if (!_.isNil(item.version)) {
                _codeSystem.version = item.version;
            }

            if (!_.isNil(item.subsumption)) {
                _codeSystem.subsumption = item.subsumption;
            }

            resource.codeSystem.push(_codeSystem);
        }
    }

    if (!_.isNil(props.expansion)) {
        let src = props.expansion;
        let _expansion = {};

        if (!_.isNil(src.id)) {
            _expansion.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _expansion.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.hierarchical)) {
            _expansion.hierarchical = src.hierarchical;
        }

        if (!_.isNil(src.paging)) {
            _expansion.paging = src.paging;
        }

        if (!_.isNil(src.incomplete)) {
            _expansion.incomplete = src.incomplete;
        }

        if (!_.isNil(src.parameter)) {
            _expansion.parameter = src.parameter;
        }

        if (!_.isNil(src.textFilter)) {
            _expansion.textFilter = src.textFilter;
        }

        resource.expansion = _expansion;
    }

    if (!_.isNil(props.codeSearch)) {
        resource.codeSearch = props.codeSearch;
    }

    if (!_.isNil(props.validateCode)) {
        let src = props.validateCode;
        let _validateCode = {};

        if (!_.isNil(src.id)) {
            _validateCode.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _validateCode.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.translations)) {
            _validateCode.translations = src.translations;
        }

        resource.validateCode = _validateCode;
    }

    if (!_.isNil(props.translation)) {
        let src = props.translation;
        let _translation = {};

        if (!_.isNil(src.id)) {
            _translation.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _translation.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.needsMap)) {
            _translation.needsMap = src.needsMap;
        }

        resource.translation = _translation;
    }

    if (!_.isNil(props.closure)) {
        let src = props.closure;
        let _closure = {};

        if (!_.isNil(src.id)) {
            _closure.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _closure.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.translation)) {
            _closure.translation = src.translation;
        }

        resource.closure = _closure;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/TerminologyCapabilities"]
    };

    return resource;
}
