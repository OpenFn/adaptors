
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type EvidenceVariable_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    url?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    version?: string;
    name?: string;
    title?: string;
    shortTitle?: string;
    subtitle?: string;
    status?: string;
    date?: string;
    description?: FHIR.markdown;
    note?: FHIR.Annotation[];
    useContext?: FHIR.UsageContext[];
    publisher?: string;
    contact?: FHIR.ContactDetail[];
    author?: FHIR.ContactDetail[];
    editor?: FHIR.ContactDetail[];
    reviewer?: FHIR.ContactDetail[];
    endorser?: FHIR.ContactDetail[];
    relatedArtifact?: FHIR.RelatedArtifact[];
    actual?: boolean;
    characteristicCombination?: string;
    characteristic?: FHIR.BackboneElement[];
    handling?: string;
    category?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<EvidenceVariable_Props>) {
    const resource = {
        resourceType: "EvidenceVariable",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.characteristic)) {
        let src = props.characteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.characteristic = [];

        for (let item of src) {
            let _characteristic = {
                ...item
            };

            resource.characteristic.push(_characteristic);
        }
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {
                ...item
            };

            resource.category.push(_category);
        }
    }

    return resource;
}
