
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type DeviceMetric_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    type?: CodeableConcept;
    unit?: CodeableConcept;
    source?: Reference;
    parent?: Reference;
    operationalStatus?: string;
    color?: string;
    category?: string;
    measurementPeriod?: Timing;
    calibration?: BackboneElement;
};

export default function(props: Partial<DeviceMetric_Props>) {
    const resource = {
        resourceType: "DeviceMetric",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DeviceMetric</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DeviceMetric"]
    };

    return resource;
}
