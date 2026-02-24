
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import { builders } from '@openfn/language-fhir-4';

declare type Patient_SzPatient_Props = {
    active?: boolean;
    address?: builders.Address[];
    birthDate?: string;
    chiefdom?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50" | "51" | "52" | "53" | "54" | "55" | "56" | "57" | "58" | "59" | "60" | "61" | "62" | "63" | "64" | "65" | "66" | "67" | "68" | "69" | "70" | "71" | "72" | "73" | "74" | "75" | "76" | "77" | "78" | "79" | "80" | "81" | "82" | "83" | "84" | "85" | "86" | "87" | "88" | "89" | "90" | "91" | "92" | "93" | "94" | "95" | "96" | "97" | "98" | "99" | "100" | "101" | "102" | "103" | "104" | "105" | "106" | "107" | "108" | "109" | "110" | "111" | "112" | "113" | "114" | "115" | "116" | "117" | "118" | "119" | "120" | "121" | "122" | "123" | "124" | "125" | "126" | "127" | "128" | "129" | "130" | "131" | "132" | "133" | "134" | "135" | "136" | "137" | "138" | "139" | "140" | "141" | "142" | "143" | "144" | "145" | "146" | "147" | "148" | "149" | "150" | "151" | "152" | "153" | "154" | "155" | "156" | "157" | "158" | "159" | "160" | "161" | "162" | "163" | "164" | "165" | "166" | "167" | "168" | "169" | "170" | "171" | "172" | "173" | "174" | "175" | "176" | "177" | "178" | "179" | "180" | "181" | "182" | "183" | "184" | "185" | "186" | "187" | "188" | "189" | "190" | "191" | "192" | "193" | "194" | "195" | "196" | "197" | "198" | "199" | "200" | "201" | "202" | "203" | "204" | "205" | "206" | "207" | "208" | "209" | "210" | "211" | "212" | "213" | "214" | "215" | "216" | "217" | "218" | "219" | "220" | "221" | "222" | "223" | "224" | "225" | "226" | "227" | "228" | "229" | "230" | "231" | "232" | "233" | "234" | "235" | "236" | "237" | "238" | "239" | "240" | "241" | "242" | "243" | "244" | "245" | "246" | "247" | "248" | "249" | "250" | "251" | "252" | "253" | "254" | "255" | "256" | "257" | "258" | "259" | "260" | "261" | "262" | "263" | "264" | "265" | "266" | "267" | "268" | "269" | "270" | "271" | "272" | "273" | "274" | "275" | "276" | "277" | "278" | "279" | "280" | "281" | "282" | "283" | "284" | "285" | "286" | "287" | "288" | "289" | "290" | "291" | "292" | "293" | "294" | "295" | "296" | "297" | "298" | "299" | "300" | "301" | "302" | "303" | "304" | "305" | "306" | "307" | "308" | "309" | "310" | "311" | "312" | "313" | "314" | "315" | "316" | "317" | "318" | "319" | "320" | "321" | "322" | "323" | "324" | "325" | "326" | "327" | "328" | "329" | "330" | "331" | "332" | "333" | "334" | "335" | "336" | "337" | "338" | "340" | "-99";
    communication?: builders.BackboneElement[];
    contact?: builders.BackboneElement[];
    contained?: any[];
    deceased?: boolean | string;
    extension?: builders.Extension[];
    gender?: string;
    generalPractitioner?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    inkhundla?: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50" | "51" | "52" | "53" | "54" | "55" | "56" | "57" | "58" | "59" | "60" | "-99";
    language?: string;
    link?: builders.BackboneElement[];
    managingOrganization?: builders.Reference;
    maritalStatus?: builders.CodeableConcept;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    multipleBirth?: boolean | number;
    name?: builders.HumanName[];
    nationality?: builders.Extension[];
    photo?: builders.Attachment[];
    registrationDate?: string[];
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare const addExtension: (resource: any, url: any, value: any) => void;
declare const c: typeof builders.coding;
declare const cc: (codings: (builders.Coding | [string, string, Omit<builders.Coding, "code" | "system">?]) | (builders.Coding | [string, string, Omit<builders.Coding, "code" | "system">?])[], extra?: Omit<builders.CodeableConcept, "coding">) => builders.CodeableConcept;
declare const coding: typeof builders.coding;
declare const composite: (object: any, key: any, value: any) => void;
declare const concept: (codings: (builders.Coding | [string, string, Omit<builders.Coding, "code" | "system">?]) | (builders.Coding | [string, string, Omit<builders.Coding, "code" | "system">?])[], extra?: Omit<builders.CodeableConcept, "coding">) => builders.CodeableConcept;
declare const ext: (url: string, value: any, props?: Omit<builders.Extension, "url">) => {
    extension: ({
        url: string;
    } & Omit<builders.Extension, "url">)[];
};
declare const extendSystemMap: (newMappings: any) => void;
declare const extendValues: (url: any, values: any, type?: string) => void;
declare const extension: (url: string, value: any, props?: Omit<builders.Extension, "url">) => {
    extension: ({
        url: string;
    } & Omit<builders.Extension, "url">)[];
};
declare const findExtension: (obj: any, targetUrl: any, path: any) => any;
declare const id: (id: string | builders.Identifier, ext?: any[], valueHints?: any) => any;
declare const identifier: (id: string | builders.Identifier, ext?: any[], valueHints?: any) => any;
declare const lookupValue: (url: any, code: any) => any;
declare const mapSystems: (obj: any) => any;
declare const mapValues: (obj: any, hints: any) => any;
declare const ref: (ref: any, opts?: {}) => any;
declare const reference: (ref: any, opts?: {}) => any;
declare const setSystemMap: (newMappings: any) => (state: any) => any;
declare const setValues: (url: any, values: any, type?: string) => void;
declare const value: (value: any, system: any, ...extra: any[]) => any;

/**
  * Create a Patient resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Extension
  * @param {Extension} [props.nationality] - Nationality.
  * @param {string} [props.inkhundla] - Extention: Eswatini Inkhundla. Accepts all values from http://172.209.216.154:3447/fhir/ValueSet/SzTinkhundlaVS
  * @param {string} [props.chiefdom] - Extention: Eswatini Chiefdom. Accepts all values from http://172.209.216.154:3447/fhir/ValueSet/SzChiefdomVS
  * @param {dateTime} [props.registrationDate] - Date the patient was registered
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Patient's Identification Number
  * @param {boolean} [props.active] - Whether this patient's record is in active use
  * @param {HumanName} [props.name] - Patient's name
  * @param {ContactPoint} [props.telecom] - A contact detail for the individual
  * @param {string} [props.gender] - Sex at birth: male | female | other | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/administrative-gender|4.0.1
  * @param {date} [props.birthDate] - Date of birth: YYYY-MM-DD
  * @param {boolean|dateTime} [props.deceased] - Indicates if the individual is deceased or not
  * @param {Address} [props.address] - An address for the individual
  * @param {string} [props.maritalStatus] - Marital (civil) status of a patient. Accepts all values from http://hl7.org/fhir/ValueSet/marital-status
  * @param {boolean|integer} [props.multipleBirth] - Whether patient is part of a multiple birth
  * @param {Attachment} [props.photo] - Image of the patient
  * @param {BackboneElement} [props.contact] - A contact party (e.g. guardian, partner, friend) for the patient
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with the patient about his or her health
  * @param {Reference} [props.generalPractitioner] - Patient's nominated primary care provider
  * @param {Reference} [props.managingOrganization] - Organization that is the custodian of the patient record
  * @param {BackboneElement} [props.link] - Link to another patient resource that concerns the same actual person
  */
declare function patient(type: "SzPatient", props: Patient_SzPatient_Props): any;
declare function patient(props: Patient_SzPatient_Props): any;

export { addExtension, c, cc, coding, composite, concept, ext, extendSystemMap, extendValues, extension, findExtension, id, identifier, lookupValue, mapSystems, mapValues, patient, ref, reference, setSystemMap, setValues, value };

