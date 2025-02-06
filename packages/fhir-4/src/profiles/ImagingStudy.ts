
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type ImagingStudy_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    status?: string;
    modality?: FHIR.Coding;
    subject?: FHIR.Reference;
    encounter?: FHIR.Reference;
    started?: string;
    basedOn?: FHIR.Reference;
    referrer?: FHIR.Reference;
    interpreter?: FHIR.Reference;
    endpoint?: FHIR.Reference;
    numberOfSeries?: number;
    numberOfInstances?: number;
    procedureReference?: FHIR.Reference;
    procedureCode?: FHIR.CodeableConcept;
    location?: FHIR.Reference;
    reasonCode?: FHIR.CodeableConcept;
    reasonReference?: FHIR.Reference;
    note?: FHIR.Annotation;
    description?: string;
    series?: FHIR.BackboneElement;
    initialiser?: any;
};

export default function(props: Partial<ImagingStudy_Props>) {
    const resource = {
        resourceType: "ImagingStudy",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.referrer)) {
        resource.referrer = dt.reference(props.referrer);
    }

    if (!_.isNil(props.interpreter)) {
        if (!Array.isArray(props.interpreter)) { props.interpreter = [props.interpreter]; }
        resource.interpreter = dt.reference(props.interpreter);
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = dt.reference(props.endpoint);
    }

    if (!_.isNil(props.procedureReference)) {
        resource.procedureReference = dt.reference(props.procedureReference);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.series)) {
        let src = props.series;
        if (!Array.isArray(src)) { src = [src]; }
        resource.series = [];

        for (let item of src) {
            let _series = {
                ...item
            };

            resource.series.push(_series);
        }
    }

    return resource;
}
