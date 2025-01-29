export declare type DomainResource_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
};
export default function (props: Partial<DomainResource_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
