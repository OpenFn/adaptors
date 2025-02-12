export function mapSystems(obj: any): any;
export function setSystemMap(newMappings: any): void;
export function identifier(input: any, system?: string): any;
export function id(input: any, system?: string): any;
export function addExtension(resource: any, url: string, value: any): void;
export function findExtension(obj: any, targetUrl: string, path?: string): any;
export function coding(code: string, system: string): {
    code: string;
    system: any;
};
export function concept(text: any, ...codings: any[]): {
    text: string;
    coding: any[];
};
export function cc(text: any, ...codings: any[]): {
    text: string;
    coding: any[];
};
export function reference(ref: any, opts: any): any;
export function ref(ref: any, opts: any): any;
export function composite(object: any, key: string, value: any): void;
