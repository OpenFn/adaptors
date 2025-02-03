
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type AdministrableProductDefinition_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    status?: string;
    formOf?: Reference;
    administrableDoseForm?: CodeableConcept;
    unitOfPresentation?: CodeableConcept;
    producedFrom?: Reference;
    ingredient?: CodeableConcept;
    device?: Reference;
    property?: BackboneElement;
    routeOfAdministration?: BackboneElement;
};

export default function(props: Partial<AdministrableProductDefinition_Props>) {
    const resource = {
        resourceType: "AdministrableProductDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AdministrableProductDefinition</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.formOf)) {
        if (!Array.isArray(props.formOf)) { props.formOf = [props.formOf]; }
        resource.formOf = dt.reference(props.formOf);
    }

    if (!_.isNil(props.producedFrom)) {
        if (!Array.isArray(props.producedFrom)) { props.producedFrom = [props.producedFrom]; }
        resource.producedFrom = dt.reference(props.producedFrom);
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {
                ...item
            };

            resource.property.push(_property);
        }
    }

    if (!_.isNil(props.routeOfAdministration)) {
        let src = props.routeOfAdministration;
        if (!Array.isArray(src)) { src = [src]; }
        resource.routeOfAdministration = [];

        for (let item of src) {
            let _routeOfAdministration = {
                ...item
            };

            resource.routeOfAdministration.push(_routeOfAdministration);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AdministrableProductDefinition"]
    };

    return resource;
}
