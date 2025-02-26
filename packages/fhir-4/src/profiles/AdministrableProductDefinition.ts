
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type AdministrableProductDefinition_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    status?: string;
    formOf?: MaybeArray<string | FHIR.Reference>;
    administrableDoseForm?: string[] | FHIR.CodeableConcept;
    unitOfPresentation?: string[] | FHIR.CodeableConcept;
    producedFrom?: MaybeArray<string | FHIR.Reference>;
    ingredient?: MaybeArray<string[] | FHIR.CodeableConcept>;
    device?: string | FHIR.Reference;
    property?: FHIR.BackboneElement[];
    routeOfAdministration?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<AdministrableProductDefinition_Props>) {
    const resource = {
        resourceType: "AdministrableProductDefinition",
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

    return resource;
}
