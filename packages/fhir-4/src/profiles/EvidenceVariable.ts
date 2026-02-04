
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type EvidenceVariable_Props = {
    actual?: boolean;
    author?: FHIR.ContactDetail[];
    category?: FHIR.BackboneElement[];
    characteristic?: FHIR.BackboneElement[];
    characteristicCombination?: string;
    contact?: FHIR.ContactDetail[];
    contained?: any[];
    date?: string;
    description?: FHIR.markdown;
    editor?: FHIR.ContactDetail[];
    endorser?: FHIR.ContactDetail[];
    extension?: FHIR.Extension[];
    handling?: string;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    note?: FHIR.Annotation[];
    publisher?: string;
    relatedArtifact?: FHIR.RelatedArtifact[];
    reviewer?: FHIR.ContactDetail[];
    shortTitle?: string;
    status?: string;
    subtitle?: string;
    text?: FHIR.Narrative;
    title?: string;
    url?: string;
    useContext?: FHIR.UsageContext[];
    version?: string;
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
