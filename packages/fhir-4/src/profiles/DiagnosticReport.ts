
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type DiagnosticReport_Props = {
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
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    code?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    effective?: string | FHIR.Period;
    issued?: string;
    performer?: MaybeArray<string | FHIR.Reference>;
    resultsInterpreter?: MaybeArray<string | FHIR.Reference>;
    specimen?: MaybeArray<string | FHIR.Reference>;
    result?: MaybeArray<string | FHIR.Reference>;
    imagingStudy?: MaybeArray<string | FHIR.Reference>;
    media?: FHIR.BackboneElement[];
    conclusion?: string;
    conclusionCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    presentedForm?: FHIR.Attachment[];
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

    return resource;
}
