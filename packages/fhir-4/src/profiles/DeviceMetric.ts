
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type DeviceMetric_Props = {
    calibration?: FHIR.BackboneElement[];
    category?: string;
    color?: string;
    contained?: any[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    measurementPeriod?: FHIR.Timing;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    operationalStatus?: string;
    parent?: string | FHIR.Reference;
    source?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    type?: string[] | FHIR.CodeableConcept;
    unit?: string[] | FHIR.CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<DeviceMetric_Props>) {
    const resource = {
        resourceType: "DeviceMetric",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.unit)) {
        resource.unit = dt.concept(props.unit);
    }

    if (!_.isNil(props.source)) {
        resource.source = dt.reference(props.source);
    }

    if (!_.isNil(props.parent)) {
        resource.parent = dt.reference(props.parent);
    }

    if (!_.isNil(props.calibration)) {
        let src = props.calibration;
        if (!Array.isArray(src)) { src = [src]; }
        resource.calibration = [];

        for (let item of src) {
            let _calibration = {
                ...item
            };

            resource.calibration.push(_calibration);
        }
    }

    return resource;
}
