
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type PackagedProductDefinition_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    name?: string;
    type?: CodeableConcept;
    packageFor?: Reference;
    status?: CodeableConcept;
    statusDate?: string;
    containedItemQuantity?: Quantity;
    description?: markdown;
    legalStatusOfSupply?: BackboneElement;
    marketingStatus?: MarketingStatus;
    characteristic?: CodeableConcept;
    copackagedIndicator?: boolean;
    manufacturer?: Reference;
    package?: BackboneElement;
};

export default function(props: Partial<PackagedProductDefinition_Props>) {
    const resource = {
        resourceType: "PackagedProductDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PackagedProductDefinition</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/PackagedProductDefinition"]
    };

    return resource;
}
