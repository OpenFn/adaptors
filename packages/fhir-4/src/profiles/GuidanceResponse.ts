
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type GuidanceResponse_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    requestIdentifier?: Identifier;
    identifier?: Identifier;
    module?: string;
    status?: string;
    subject?: Reference;
    encounter?: Reference;
    occurrenceDateTime?: string;
    performer?: Reference;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    note?: Annotation;
    evaluationMessage?: Reference;
    outputParameters?: Reference;
    result?: Reference;
    dataRequirement?: DataRequirement;
};

export default function(props: Partial<GuidanceResponse_Props>) {
    const resource = {
        resourceType: "GuidanceResponse",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>GuidanceResponse</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.implicitRules)) {
        resource.implicitRules = props.implicitRules;
    }

    if (!_.isNil(props.language)) {
        resource.language = props.language;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.contained)) {
        resource.contained = props.contained;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.requestIdentifier)) {
        resource.requestIdentifier = dt.identifier(props.requestIdentifier);
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.module)) {
        dt.composite(resource, "module", props.module);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.occurrenceDateTime)) {
        resource.occurrenceDateTime = props.occurrenceDateTime;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.evaluationMessage)) {
        if (!Array.isArray(props.evaluationMessage)) { props.evaluationMessage = [props.evaluationMessage]; }
        resource.evaluationMessage = dt.reference(props.evaluationMessage);
    }

    if (!_.isNil(props.outputParameters)) {
        resource.outputParameters = dt.reference(props.outputParameters);
    }

    if (!_.isNil(props.result)) {
        resource.result = dt.reference(props.result);
    }

    if (!_.isNil(props.dataRequirement)) {
        resource.dataRequirement = props.dataRequirement;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/GuidanceResponse"]
    };

    return resource;
}
