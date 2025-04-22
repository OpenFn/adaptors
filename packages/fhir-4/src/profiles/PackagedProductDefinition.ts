
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type PackagedProductDefinition_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    name?: string;
    type?: string[] | FHIR.CodeableConcept;
    packageFor?: MaybeArray<string | FHIR.Reference>;
    status?: string[] | FHIR.CodeableConcept;
    statusDate?: string;
    containedItemQuantity?: FHIR.Quantity[];
    description?: FHIR.markdown;
    legalStatusOfSupply?: FHIR.BackboneElement[];
    marketingStatus?: FHIR.MarketingStatus[];
    characteristic?: MaybeArray<string[] | FHIR.CodeableConcept>;
    copackagedIndicator?: boolean;
    manufacturer?: MaybeArray<string | FHIR.Reference>;
    package?: FHIR.BackboneElement;
    [key: string]: any;
};

export default function(props: Partial<PackagedProductDefinition_Props>) {
    const resource = {
        resourceType: "PackagedProductDefinition",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.packageFor)) {
        if (!Array.isArray(props.packageFor)) { props.packageFor = [props.packageFor]; }
        resource.packageFor = dt.reference(props.packageFor);
    }

    if (!_.isNil(props.legalStatusOfSupply)) {
        let src = props.legalStatusOfSupply;
        if (!Array.isArray(src)) { src = [src]; }
        resource.legalStatusOfSupply = [];

        for (let item of src) {
            let _legalStatusOfSupply = {
                ...item
            };

            resource.legalStatusOfSupply.push(_legalStatusOfSupply);
        }
    }

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.package)) {
        let src = props.package;

        let _package = {
            ...item
        };

        resource.package = _package;
    }

    return resource;
}
