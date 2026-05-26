import { builders } from '@openfn/language-fhir-4';
export declare const addExtension: (resource: any, url: any, value: any) => void, c: typeof builders.coding, cc: (codings: (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?]) | (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?])[], extra?: Omit<builders.CodeableConcept, "coding">) => builders.CodeableConcept, coding: typeof builders.coding, composite: (object: any, key: any, value: any) => void, concept: (codings: (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?]) | (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?])[], extra?: Omit<builders.CodeableConcept, "coding">) => builders.CodeableConcept, ext: (url: string, value: any, props?: Omit<builders.Extension, "url">) => {
    extension: ({
        url: string;
    } & Omit<builders.Extension, "url">)[];
}, extendSystemMap: (newMappings: any) => void, extendValues: (url: any, values: any, type?: string) => void, extension: (url: string, value: any, props?: Omit<builders.Extension, "url">) => {
    extension: ({
        url: string;
    } & Omit<builders.Extension, "url">)[];
}, findExtension: (obj: any, targetUrl: any, path: any) => any, id: (id: string | builders.Identifier, ext?: any[], valueHints?: any) => any, identifier: (id: string | builders.Identifier, ext?: any[], valueHints?: any) => any, lookupValue: (url: any, code: any) => any, mapSystems: (obj: any) => any, mapValues: (obj: any, hints: any) => any, ref: (ref: any, opts?: {}) => any, reference: (ref: any, opts?: {}) => any, setSystemMap: (newMappings: any) => (state: any) => any, setValues: (url: any, values: any, type?: string) => void, value: (value: any, system: any, ...extra: any[]) => any;
