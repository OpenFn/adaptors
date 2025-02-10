export declare function addAuth(options: any): any;
export declare const prepareNextState: (state: any, response: any) => any;
declare type RequestOptions = {
    headers?: Record<string, string>;
    body?: any;
    configuration: {
        apiPath?: string;
        baseUrl?: string;
        username?: string;
        password?: string;
        access_token?: string;
    };
    query?: Record<string, string>;
};
export declare const request: (method: any, path: any, options: RequestOptions) => any;
export {};
