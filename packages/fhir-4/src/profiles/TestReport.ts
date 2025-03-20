
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type TestReport_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: string | FHIR.Identifier;
    name?: string;
    status?: string;
    testScript?: string | FHIR.Reference;
    result?: string;
    score?: number;
    tester?: string;
    issued?: string;
    participant?: FHIR.BackboneElement[];
    setup?: FHIR.BackboneElement;
    test?: FHIR.BackboneElement[];
    teardown?: FHIR.BackboneElement;
    [key: string]: any;
};

export default function(props: Partial<TestReport_Props>) {
    const resource = {
        resourceType: "TestReport",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.testScript)) {
        resource.testScript = dt.reference(props.testScript);
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (let item of src) {
            let _participant = {
                ...item
            };

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.setup)) {
        let src = props.setup;

        let _setup = {
            ...item
        };

        resource.setup = _setup;
    }

    if (!_.isNil(props.test)) {
        let src = props.test;
        if (!Array.isArray(src)) { src = [src]; }
        resource.test = [];

        for (let item of src) {
            let _test = {
                ...item
            };

            resource.test.push(_test);
        }
    }

    if (!_.isNil(props.teardown)) {
        let src = props.teardown;

        let _teardown = {
            ...item
        };

        resource.teardown = _teardown;
    }

    return resource;
}
