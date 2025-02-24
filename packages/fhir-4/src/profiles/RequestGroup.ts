
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type RequestGroup_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: Array<string | FHIR.Identifier>;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    basedOn?: Array<string | FHIR.Reference>;
    replaces?: Array<string | FHIR.Reference>;
    groupIdentifier?: string | FHIR.Identifier;
    status?: string;
    intent?: string;
    priority?: string;
    code?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    authoredOn?: string;
    author?: string | FHIR.Reference;
    reasonCode?: Array<string[] | FHIR.CodeableConcept>;
    reasonReference?: Array<string | FHIR.Reference>;
    note?: FHIR.Annotation[];
    action?: FHIR.BackboneElement[];
    initialiser?: any;
    typeShorthands?: any;
    [key: string]: any;
};

export default function(props: Partial<RequestGroup_Props>) {
    const resource = {
        resourceType: "RequestGroup",
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

    if (!_.isNil(props.replaces)) {
        if (!Array.isArray(props.replaces)) { props.replaces = [props.replaces]; }
        resource.replaces = dt.reference(props.replaces);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = dt.identifier(props.groupIdentifier);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.action)) {
        let src = props.action;
        if (!Array.isArray(src)) { src = [src]; }
        resource.action = [];

        for (let item of src) {
            let _action = {
                ...item
            };

            resource.action.push(_action);
        }
    }

    return resource;
}
