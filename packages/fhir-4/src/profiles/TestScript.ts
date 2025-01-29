
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type TestScript_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    url?: any;
    identifier?: dt.Identifier;
    version?: any;
    name?: any;
    title?: any;
    status?: any;
    experimental?: any;
    date?: any;
    publisher?: any;
    contact?: any;
    description?: any;
    useContext?: any;
    jurisdiction?: any;
    purpose?: any;
    copyright?: any;
    origin?: any;
    destination?: any;
    metadata?: any;
    fixture?: any;
    profile?: any;
    variable?: any;
    setup?: any;
    test?: any;
    teardown?: any;
};

export default function(props: Partial<TestScript_Props>) {
    const resource = {
        resourceType: "TestScript",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>TestScript</b></p></div>"
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

    if (!_.isNil(props.origin)) {
        let src = props.origin;
        if (!Array.isArray(src)) { src = [src]; }
        resource.origin = [];

        for (let item of src) {
            let _origin = {};

            if (!_.isNil(item.id)) {
                _origin.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _origin.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.index)) {
                _origin.index = item.index;
            }

            if (!_.isNil(item.profile)) {
                _origin.profile = item.profile;
            }

            resource.origin.push(_origin);
        }
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

            if (!_.isNil(item.index)) {
                _destination.index = item.index;
            }

            if (!_.isNil(item.profile)) {
                _destination.profile = item.profile;
            }

            resource.destination.push(_destination);
        }
    }

    if (!_.isNil(props.metadata)) {
        let src = props.metadata;
        let _metadata = {};

        if (!_.isNil(src.id)) {
            _metadata.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _metadata.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.link)) {
            _metadata.link = src.link;
        }

        if (!_.isNil(src.capability)) {
            _metadata.capability = src.capability;
        }

        resource.metadata = _metadata;
    }

    if (!_.isNil(props.fixture)) {
        let src = props.fixture;
        if (!Array.isArray(src)) { src = [src]; }
        resource.fixture = [];

        for (let item of src) {
            let _fixture = {};

            if (!_.isNil(item.id)) {
                _fixture.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _fixture.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.autocreate)) {
                _fixture.autocreate = item.autocreate;
            }

            if (!_.isNil(item.autodelete)) {
                _fixture.autodelete = item.autodelete;
            }

            if (!_.isNil(item.resource)) {
                _fixture.resource = item.resource;
            }

            resource.fixture.push(_fixture);
        }
    }

    if (!_.isNil(props.profile)) {
        if (!Array.isArray(props.profile)) { props.profile = [props.profile]; }
        resource.profile = dt.reference(props.profile);
    }

    if (!_.isNil(props.variable)) {
        let src = props.variable;
        if (!Array.isArray(src)) { src = [src]; }
        resource.variable = [];

        for (let item of src) {
            let _variable = {};

            if (!_.isNil(item.id)) {
                _variable.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _variable.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _variable.name = item.name;
            }

            if (!_.isNil(item.defaultValue)) {
                _variable.defaultValue = item.defaultValue;
            }

            if (!_.isNil(item.description)) {
                _variable.description = item.description;
            }

            if (!_.isNil(item.expression)) {
                _variable.expression = item.expression;
            }

            if (!_.isNil(item.headerField)) {
                _variable.headerField = item.headerField;
            }

            if (!_.isNil(item.hint)) {
                _variable.hint = item.hint;
            }

            if (!_.isNil(item.path)) {
                _variable.path = item.path;
            }

            if (!_.isNil(item.sourceId)) {
                _variable.sourceId = item.sourceId;
            }

            resource.variable.push(_variable);
        }
    }

    if (!_.isNil(props.setup)) {
        let src = props.setup;
        let _setup = {};

        if (!_.isNil(src.id)) {
            _setup.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _setup.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.action)) {
            _setup.action = src.action;
        }

        resource.setup = _setup;
    }

    if (!_.isNil(props.test)) {
        let src = props.test;
        if (!Array.isArray(src)) { src = [src]; }
        resource.test = [];

        for (let item of src) {
            let _test = {};

            if (!_.isNil(item.id)) {
                _test.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _test.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _test.name = item.name;
            }

            if (!_.isNil(item.description)) {
                _test.description = item.description;
            }

            if (!_.isNil(item.action)) {
                _test.action = item.action;
            }

            resource.test.push(_test);
        }
    }

    if (!_.isNil(props.teardown)) {
        let src = props.teardown;
        let _teardown = {};

        if (!_.isNil(src.id)) {
            _teardown.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _teardown.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.action)) {
            _teardown.action = src.action;
        }

        resource.teardown = _teardown;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/TestScript"]
    };

    return resource;
}
