
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type AdministrableProductDefinition_Props = {
    administrableDoseForm?: string[] | FHIR.CodeableConcept;
    contained?: any[];
    device?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    formOf?: MaybeArray<string | FHIR.Reference>;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    ingredient?: MaybeArray<string[] | FHIR.CodeableConcept>;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    producedFrom?: MaybeArray<string | FHIR.Reference>;
    property?: FHIR.BackboneElement[];
    routeOfAdministration?: FHIR.BackboneElement[];
    status?: string;
    text?: FHIR.Narrative;
    unitOfPresentation?: string[] | FHIR.CodeableConcept;
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

    if (!_.isNil(props.administrableDoseForm)) {
        resource.administrableDoseForm = dt.concept(props.administrableDoseForm);
    }

    if (!_.isNil(props.unitOfPresentation)) {
        resource.unitOfPresentation = dt.concept(props.unitOfPresentation);
    }

    if (!_.isNil(props.producedFrom)) {
        if (!Array.isArray(props.producedFrom)) { props.producedFrom = [props.producedFrom]; }
        resource.producedFrom = dt.reference(props.producedFrom);
    }

    if (!_.isNil(props.ingredient)) {
        if (!Array.isArray(props.ingredient)) { props.ingredient = [props.ingredient]; }
        resource.ingredient = dt.concept(props.ingredient);
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
