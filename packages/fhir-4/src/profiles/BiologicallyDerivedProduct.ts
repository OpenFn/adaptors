
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type BiologicallyDerivedProduct_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    productCategory?: any;
    productCode?: any;
    status?: any;
    request?: any;
    quantity?: any;
    parent?: any;
    collection?: any;
    processing?: any;
    manipulation?: any;
    storage?: any;
};

export default function(props: Partial<BiologicallyDerivedProduct_Props>) {
    const resource = {
        resourceType: "BiologicallyDerivedProduct",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>BiologicallyDerivedProduct</b></p></div>"
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

    if (!_.isNil(props.productCategory)) {
        resource.productCategory = props.productCategory;
    }

    if (!_.isNil(props.productCode)) {
        resource.productCode = props.productCode;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.request)) {
        if (!Array.isArray(props.request)) { props.request = [props.request]; }
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.parent)) {
        if (!Array.isArray(props.parent)) { props.parent = [props.parent]; }
        resource.parent = dt.reference(props.parent);
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

        if (!_.isNil(src.source)) {
            _collection.source = src.source;
        }

        if (!_.isNil(src.collected)) {
            _collection.collected = src.collected;
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

    if (!_.isNil(props.manipulation)) {
        let src = props.manipulation;
        let _manipulation = {};

        if (!_.isNil(src.id)) {
            _manipulation.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _manipulation.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.description)) {
            _manipulation.description = src.description;
        }

        if (!_.isNil(src.time)) {
            _manipulation.time = src.time;
        }

        resource.manipulation = _manipulation;
    }

    if (!_.isNil(props.storage)) {
        let src = props.storage;
        if (!Array.isArray(src)) { src = [src]; }
        resource.storage = [];

        for (let item of src) {
            let _storage = {};

            if (!_.isNil(item.id)) {
                _storage.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _storage.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _storage.description = item.description;
            }

            if (!_.isNil(item.temperature)) {
                _storage.temperature = item.temperature;
            }

            if (!_.isNil(item.scale)) {
                _storage.scale = item.scale;
            }

            if (!_.isNil(item.duration)) {
                _storage.duration = item.duration;
            }

            resource.storage.push(_storage);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct"]
    };

    return resource;
}
