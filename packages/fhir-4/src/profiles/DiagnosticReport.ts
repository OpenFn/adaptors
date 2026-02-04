
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type DiagnosticReport_Props = {
    basedOn?: MaybeArray<string | FHIR.Reference>;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    code?: string[] | FHIR.CodeableConcept;
    conclusion?: string;
    conclusionCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    contained?: any[];
    effective?: string | FHIR.Period;
    encounter?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    imagingStudy?: MaybeArray<string | FHIR.Reference>;
    implicitRules?: string;
    issued?: string;
    language?: string;
    media?: FHIR.BackboneElement[];
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    performer?: MaybeArray<string | FHIR.Reference>;
    presentedForm?: FHIR.Attachment[];
    result?: MaybeArray<string | FHIR.Reference>;
    resultsInterpreter?: MaybeArray<string | FHIR.Reference>;
    specimen?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    subject?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<DiagnosticReport_Props>) {
    const resource = {
        resourceType: "DiagnosticReport",
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

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        delete resource.effective;
        dt.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.resultsInterpreter)) {
        if (!Array.isArray(props.resultsInterpreter)) { props.resultsInterpreter = [props.resultsInterpreter]; }
        resource.resultsInterpreter = dt.reference(props.resultsInterpreter);
    }

    if (!_.isNil(props.specimen)) {
        if (!Array.isArray(props.specimen)) { props.specimen = [props.specimen]; }
        resource.specimen = dt.reference(props.specimen);
    }

    if (!_.isNil(props.result)) {
        if (!Array.isArray(props.result)) { props.result = [props.result]; }
        resource.result = dt.reference(props.result);
    }

    if (!_.isNil(props.imagingStudy)) {
        if (!Array.isArray(props.imagingStudy)) { props.imagingStudy = [props.imagingStudy]; }
        resource.imagingStudy = dt.reference(props.imagingStudy);
    }

    if (!_.isNil(props.media)) {
        let src = props.media;
        if (!Array.isArray(src)) { src = [src]; }
        resource.media = [];

        for (let item of src) {
            let _media = {
                ...item
            };

            resource.media.push(_media);
        }
    }

    if (!_.isNil(props.conclusionCode)) {
        if (!Array.isArray(props.conclusionCode)) { props.conclusionCode = [props.conclusionCode]; }
        resource.conclusionCode = dt.concept(props.conclusionCode);
    }

    return resource;
}
