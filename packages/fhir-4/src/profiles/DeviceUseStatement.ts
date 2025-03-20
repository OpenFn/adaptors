
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type DeviceUseStatement_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    basedOn?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    subject?: string | FHIR.Reference;
    derivedFrom?: MaybeArray<string | FHIR.Reference>;
    timing?: FHIR.Timing | FHIR.Period | string;
    recordedOn?: string;
    source?: string | FHIR.Reference;
    device?: string | FHIR.Reference;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    bodySite?: string[] | FHIR.CodeableConcept;
    note?: FHIR.Annotation[];
    [key: string]: any;
};

export default function(props: Partial<DeviceUseStatement_Props>) {
    const resource = {
        resourceType: "DeviceUseStatement",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = dt.reference(props.derivedFrom);
    }

    if (!_.isNil(props.timing)) {
        delete resource.timing;
        dt.composite(resource, "timing", props.timing);
    }

    if (!_.isNil(props.source)) {
        resource.source = dt.reference(props.source);
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    return resource;
}
