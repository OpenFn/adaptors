
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Specimen",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Specimen</b></p></div>"
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
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.accessionIdentifier)) {
        resource.accessionIdentifier = dt.identifier(props.accessionIdentifier);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.receivedTime)) {
        resource.receivedTime = props.receivedTime;
    }

    if (!_.isNil(props.parent)) {
        if (!Array.isArray(props.parent)) { props.parent = [props.parent]; }
        resource.parent = dt.reference(props.parent);
    }

    if (!_.isNil(props.request)) {
        if (!Array.isArray(props.request)) { props.request = [props.request]; }
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.collection)) {
        let src = props.collection;
        let _collection = {};

        if (!_.isNil(src.id)) {
            _collection.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _collection.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.collector)) {
            _collection.collector = src.collector;
        }

        if (!_.isNil(src.collected)) {
            _collection.collected = src.collected;
        }

        if (!_.isNil(src.duration)) {
            _collection.duration = src.duration;
        }

        if (!_.isNil(src.quantity)) {
            _collection.quantity = src.quantity;
        }

        if (!_.isNil(src.method)) {
            _collection.method = src.method;
        }

        if (!_.isNil(src.bodySite)) {
            _collection.bodySite = src.bodySite;
        }

        if (!_.isNil(src.fastingStatus)) {
            _collection.fastingStatus = src.fastingStatus;
        }

        resource.collection = _collection;
    }

    if (!_.isNil(props.processing)) {
        let src = props.processing;
        if (!Array.isArray(src)) { src = [src]; }
        resource.processing = [];

        for (let item of src) {
            let _processing = {};

            if (!_.isNil(item.id)) {
                _processing.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _processing.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _processing.description = item.description;
            }

            if (!_.isNil(item.procedure)) {
                _processing.procedure = item.procedure;
            }

            if (!_.isNil(item.additive)) {
                _processing.additive = item.additive;
            }

            if (!_.isNil(item.time)) {
                _processing.time = item.time;
            }

            resource.processing.push(_processing);
        }
    }

    if (!_.isNil(props.container)) {
        let src = props.container;
        if (!Array.isArray(src)) { src = [src]; }
        resource.container = [];

        for (let item of src) {
            let _container = {};

            if (!_.isNil(item.id)) {
                _container.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _container.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _container.identifier = item.identifier;
            }

            if (!_.isNil(item.description)) {
                _container.description = item.description;
            }

            if (!_.isNil(item.type)) {
                _container.type = item.type;
            }

            if (!_.isNil(item.capacity)) {
                _container.capacity = item.capacity;
            }

            if (!_.isNil(item.specimenQuantity)) {
                _container.specimenQuantity = item.specimenQuantity;
            }

            if (!_.isNil(item.additive)) {
                _container.additive = item.additive;
            }

            resource.container.push(_container);
        }
    }

    if (!_.isNil(props.condition)) {
        resource.condition = props.condition;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Specimen"]
    };

    return resource;
}
