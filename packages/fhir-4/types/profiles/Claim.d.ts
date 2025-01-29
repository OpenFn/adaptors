import * as dt from "../datatypes.js";
export declare type Claim_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    status?: any;
    type?: any;
    subType?: any;
    use?: any;
    patient?: any;
    billablePeriod?: any;
    created?: any;
    enterer?: any;
    insurer?: any;
    provider?: any;
    priority?: any;
    fundsReserve?: any;
    related?: any;
    prescription?: any;
    originalPrescription?: any;
    payee?: any;
    referral?: any;
    facility?: any;
    careTeam?: any;
    supportingInfo?: any;
    diagnosis?: any;
    procedure?: any;
    insurance?: any;
    accident?: any;
    item?: any;
    total?: any;
};
export default function (props: Partial<Claim_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
