
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type DeviceMetric_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    type?: string[] | FHIR.CodeableConcept;
    unit?: string[] | FHIR.CodeableConcept;
    source?: string | FHIR.Reference;
    parent?: string | FHIR.Reference;
    operationalStatus?: string;
    color?: string;
    category?: string;
    measurementPeriod?: FHIR.Timing;
    calibration?: FHIR.BackboneElement[];
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
