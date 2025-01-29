export declare type Resource_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
};
export default function (props: Partial<Resource_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
