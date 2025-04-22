
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type TestScript_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    url?: string;
    identifier?: string | FHIR.Identifier;
    version?: string;
    name?: string;
    title?: string;
    status?: string;
    experimental?: boolean;
    date?: string;
    publisher?: string;
    contact?: FHIR.ContactDetail[];
    description?: FHIR.markdown;
    useContext?: FHIR.UsageContext[];
    jurisdiction?: Array<string[] | FHIR.CodeableConcept>;
    purpose?: FHIR.markdown;
    copyright?: FHIR.markdown;
    origin?: FHIR.BackboneElement[];
    destination?: FHIR.BackboneElement[];
    metadata?: FHIR.BackboneElement;
    fixture?: FHIR.BackboneElement[];
    profile?: Array<string | FHIR.Reference>;
    variable?: FHIR.BackboneElement[];
    setup?: FHIR.BackboneElement;
    test?: FHIR.BackboneElement[];
    teardown?: FHIR.BackboneElement;
    initialiser?: any;
    typeShorthands?: any;
    [key: string]: any;
};

export default function(props: Partial<TestScript_Props>) {
    const resource = {
        resourceType: "TestScript",
        ...props
    };

    if (!_.isNil(props.origin)) {
        let src = props.origin;
        if (!Array.isArray(src)) { src = [src]; }
        resource.origin = [];

        for (let item of src) {
            let _origin = {
                ...item
            };

            resource.origin.push(_origin);
        }
    }

    if (!_.isNil(props.destination)) {
        let src = props.destination;
        if (!Array.isArray(src)) { src = [src]; }
        resource.destination = [];

        for (let item of src) {
            let _destination = {
                ...item
            };

            resource.destination.push(_destination);
        }
    }

    if (!_.isNil(props.metadata)) {
        let src = props.metadata;

        let _metadata = {
            ...item
        };

        resource.metadata = _metadata;
    }

    if (!_.isNil(props.fixture)) {
        let src = props.fixture;
        if (!Array.isArray(src)) { src = [src]; }
        resource.fixture = [];

        for (let item of src) {
            let _fixture = {
                ...item
            };

            resource.fixture.push(_fixture);
        }
    }

    if (!_.isNil(props.variable)) {
        let src = props.variable;
        if (!Array.isArray(src)) { src = [src]; }
        resource.variable = [];

        for (let item of src) {
            let _variable = {
                ...item
            };

            resource.variable.push(_variable);
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
