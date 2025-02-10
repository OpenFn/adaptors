export declare function read(reference: string, options?: object): (state: any) => Promise<any>;
declare type SearchQuery = {
    /** k/v pairs. Can do stuff like given:contains=eve and [parameter]=ge2013-03-14. So the parameter can have criteria   */
    query?: Record<string, string>;
    filter?: Record<string, string>;
    lastUpdated?: string;
    [key: string]: any;
};
export declare function search(resourceType: string, options: SearchQuery): (state: any) => Promise<State>;
export declare function update(reference: string): void;
export declare function patch(reference: string): void;
declare function _delete(reference: string): void;
export { _delete as delete };
export declare function create(): void;
export declare function addToBundle(resources: any[], name?: string): void;
export declare function submitBundle(name?: string): void;
export { dataPath, dataValue, dateFns, cursor, each, field, fields, fn, lastReferenceValue, merge, sourceValue, } from '@openfn/language-common';
