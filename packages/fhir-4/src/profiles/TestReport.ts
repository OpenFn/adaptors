
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type TestReport_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    name?: any;
    status?: any;
    testScript?: any;
    result?: any;
    score?: any;
    tester?: any;
    issued?: any;
    participant?: any;
    setup?: any;
    test?: any;
    teardown?: any;
};

export default function(props: Partial<TestReport_Props>) {
    const resource = {
        resourceType: "TestReport",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>TestReport</b></p></div>"
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
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.testScript)) {
        resource.testScript = dt.reference(props.testScript);
    }

    if (!_.isNil(props.result)) {
        resource.result = props.result;
    }

    if (!_.isNil(props.score)) {
        resource.score = props.score;
    }

    if (!_.isNil(props.tester)) {
        resource.tester = props.tester;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (let item of src) {
            let _participant = {};

            if (!_.isNil(item.id)) {
                _participant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _participant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _participant.type = item.type;
            }

            if (!_.isNil(item.uri)) {
                _participant.uri = item.uri;
            }

            if (!_.isNil(item.display)) {
                _participant.display = item.display;
            }

            resource.participant.push(_participant);
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
        profile: ["http://hl7.org/fhir/StructureDefinition/TestReport"]
    };

    return resource;
}
