
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type TestReport_Props = {
    contained?: any[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: string | FHIR.Identifier;
    implicitRules?: string;
    issued?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    participant?: FHIR.BackboneElement[];
    result?: string;
    score?: number;
    setup?: FHIR.BackboneElement;
    status?: string;
    teardown?: FHIR.BackboneElement;
    test?: FHIR.BackboneElement[];
    testScript?: string | FHIR.Reference;
    tester?: string;
    text?: FHIR.Narrative;
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
