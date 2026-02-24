
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Patient_SzPatient_Props = {
    active?: boolean;
    address?: FHIR.Address[];
    birthDate?: string;
    chiefdom?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50" | "51" | "52" | "53" | "54" | "55" | "56" | "57" | "58" | "59" | "60" | "61" | "62" | "63" | "64" | "65" | "66" | "67" | "68" | "69" | "70" | "71" | "72" | "73" | "74" | "75" | "76" | "77" | "78" | "79" | "80" | "81" | "82" | "83" | "84" | "85" | "86" | "87" | "88" | "89" | "90" | "91" | "92" | "93" | "94" | "95" | "96" | "97" | "98" | "99" | "100" | "101" | "102" | "103" | "104" | "105" | "106" | "107" | "108" | "109" | "110" | "111" | "112" | "113" | "114" | "115" | "116" | "117" | "118" | "119" | "120" | "121" | "122" | "123" | "124" | "125" | "126" | "127" | "128" | "129" | "130" | "131" | "132" | "133" | "134" | "135" | "136" | "137" | "138" | "139" | "140" | "141" | "142" | "143" | "144" | "145" | "146" | "147" | "148" | "149" | "150" | "151" | "152" | "153" | "154" | "155" | "156" | "157" | "158" | "159" | "160" | "161" | "162" | "163" | "164" | "165" | "166" | "167" | "168" | "169" | "170" | "171" | "172" | "173" | "174" | "175" | "176" | "177" | "178" | "179" | "180" | "181" | "182" | "183" | "184" | "185" | "186" | "187" | "188" | "189" | "190" | "191" | "192" | "193" | "194" | "195" | "196" | "197" | "198" | "199" | "200" | "201" | "202" | "203" | "204" | "205" | "206" | "207" | "208" | "209" | "210" | "211" | "212" | "213" | "214" | "215" | "216" | "217" | "218" | "219" | "220" | "221" | "222" | "223" | "224" | "225" | "226" | "227" | "228" | "229" | "230" | "231" | "232" | "233" | "234" | "235" | "236" | "237" | "238" | "239" | "240" | "241" | "242" | "243" | "244" | "245" | "246" | "247" | "248" | "249" | "250" | "251" | "252" | "253" | "254" | "255" | "256" | "257" | "258" | "259" | "260" | "261" | "262" | "263" | "264" | "265" | "266" | "267" | "268" | "269" | "270" | "271" | "272" | "273" | "274" | "275" | "276" | "277" | "278" | "279" | "280" | "281" | "282" | "283" | "284" | "285" | "286" | "287" | "288" | "289" | "290" | "291" | "292" | "293" | "294" | "295" | "296" | "297" | "298" | "299" | "300" | "301" | "302" | "303" | "304" | "305" | "306" | "307" | "308" | "309" | "310" | "311" | "312" | "313" | "314" | "315" | "316" | "317" | "318" | "319" | "320" | "321" | "322" | "323" | "324" | "325" | "326" | "327" | "328" | "329" | "330" | "331" | "332" | "333" | "334" | "335" | "336" | "337" | "338" | "340" | "-99";
    communication?: FHIR.BackboneElement[];
    contact?: FHIR.BackboneElement[];
    contained?: any[];
    deceased?: boolean | string;
    extension?: FHIR.Extension[];
    gender?: string;
    generalPractitioner?: FHIR.Reference[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    inkhundla?: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50" | "51" | "52" | "53" | "54" | "55" | "56" | "57" | "58" | "59" | "60" | "-99";
    language?: string;
    link?: FHIR.BackboneElement[];
    managingOrganization?: FHIR.Reference;
    maritalStatus?: FHIR.CodeableConcept;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    multipleBirth?: boolean | number;
    name?: FHIR.HumanName[];
    nationality?: FHIR.Extension[];
    photo?: FHIR.Attachment[];
    registrationDate?: string[];
    telecom?: FHIR.ContactPoint[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<Patient_SzPatient_Props>) {
    const resource = {
        resourceType: "Patient",
        ...props
    };

    if (!_.isNil(props.nationality)) {
        let src = props.nationality;

        dt.addExtension(
            resource,
            "http://hl7.org/fhir/StructureDefinition/patient-nationality",
            src
        );
    }

    if (!_.isNil(props.inkhundla)) {
        let src = props.inkhundla;
        if (typeof src === 'string') {
          src = dt.lookupValue('http://172.209.216.154:3447/fhir/ValueSet/SzTinkhundlaVS', src);
         }
        src = dt.concept(src);
        dt.ensureConceptText(src);

        dt.addExtension(
            resource,
            "http://172.209.216.154:3447/fhir/StructureDefinition/SzInkhundlaExtension",
            src
        );
    }

    if (!_.isNil(props.chiefdom)) {
        let src = props.chiefdom;
        if (typeof src === 'string') {
          src = dt.lookupValue('http://172.209.216.154:3447/fhir/ValueSet/SzChiefdomVS', src);
         }
        src = dt.concept(src);
        dt.ensureConceptText(src);

        dt.addExtension(
            resource,
            "http://172.209.216.154:3447/fhir/StructureDefinition/SzChiefdomExtension",
            src
        );
    }

    if (!_.isNil(props.registrationDate)) {
        let src = props.registrationDate;

        dt.addExtension(
            resource,
            "http://172.209.216.154:3447/fhir/StructureDefinition/SzRegistrationDate",
            src
        );
    }

    if (!_.isNil(props.identifier)) {
        let src = props.identifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.identifier = [];

        for (let item of src) {
            let _identifier = dt.identifier(item, [], {
                "use": "http://hl7.org/fhir/ValueSet/identifier-use|4.0.1",
                "type": "http://172.209.216.154:3447/fhir/ValueSet/PersonIdentifiersVS"
            });

            _identifier = dt.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (let item of src) {
            let _name = {
                ...item
            };

            resource.name.push(_name);
        }
    }

    if (!_.isNil(props.deceased)) {
        delete resource.deceased;
        dt.composite(resource, "deceased", props.deceased);
    }

    if (!_.isNil(props.address)) {
        let src = props.address;
        if (!Array.isArray(src)) { src = [src]; }
        resource.address = [];

        for (let item of src) {
            let _address = {
                ...item
            };

            resource.address.push(_address);
        }
    }

    if (!_.isNil(props.maritalStatus)) {
        resource.maritalStatus = dt.concept(props.maritalStatus);
    }

    if (!_.isNil(props.multipleBirth)) {
        delete resource.multipleBirth;
        dt.composite(resource, "multipleBirth", props.multipleBirth);
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {
                ...item
            };

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.communication)) {
        let src = props.communication;
        if (!Array.isArray(src)) { src = [src]; }
        resource.communication = [];

        for (let item of src) {
            let _communication = {
                ...item
            };

            resource.communication.push(_communication);
        }
    }

    if (!_.isNil(props.generalPractitioner)) {
        if (!Array.isArray(props.generalPractitioner)) { props.generalPractitioner = [props.generalPractitioner]; }
        resource.generalPractitioner = dt.reference(props.generalPractitioner);
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = dt.reference(props.managingOrganization);
    }

    if (!_.isNil(props.link)) {
        let src = props.link;
        if (!Array.isArray(src)) { src = [src]; }
        resource.link = [];

        for (let item of src) {
            let _link = {
                ...item
            };

            resource.link.push(_link);
        }
    }

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
