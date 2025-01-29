export declare type VerificationResult_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    target?: any;
    targetLocation?: any;
    need?: any;
    status?: any;
    statusDate?: any;
    validationType?: any;
    validationProcess?: any;
    frequency?: any;
    lastPerformed?: any;
    nextScheduled?: any;
    failureAction?: any;
    primarySource?: any;
    attestation?: any;
    validator?: any;
};
export default function (props: Partial<VerificationResult_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
