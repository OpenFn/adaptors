import * as dt from "../datatypes.js";
export declare type TestReport_Props = {
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
export default function (props: Partial<TestReport_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
