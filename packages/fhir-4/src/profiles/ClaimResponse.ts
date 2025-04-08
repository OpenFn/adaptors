
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ClaimResponse_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    status?: string;
    type?: string[] | FHIR.CodeableConcept;
    subType?: string[] | FHIR.CodeableConcept;
    use?: string;
    patient?: string | FHIR.Reference;
    created?: string;
    insurer?: string | FHIR.Reference;
    requestor?: string | FHIR.Reference;
    request?: string | FHIR.Reference;
    outcome?: string;
    disposition?: string;
    preAuthRef?: string;
    preAuthPeriod?: FHIR.Period;
    payeeType?: string[] | FHIR.CodeableConcept;
    item?: FHIR.BackboneElement[];
    addItem?: FHIR.BackboneElement[];
    adjudication?: any[];
    total?: FHIR.BackboneElement[];
    payment?: FHIR.BackboneElement;
    fundsReserve?: string[] | FHIR.CodeableConcept;
    formCode?: string[] | FHIR.CodeableConcept;
    form?: FHIR.Attachment;
    processNote?: FHIR.BackboneElement[];
    communicationRequest?: MaybeArray<string | FHIR.Reference>;
    insurance?: FHIR.BackboneElement[];
    error?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<ClaimResponse_Props>) {
    const resource = {
        resourceType: "ClaimResponse",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = dt.reference(props.insurer);
    }

    if (!_.isNil(props.requestor)) {
        resource.requestor = dt.reference(props.requestor);
    }

    if (!_.isNil(props.request)) {
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.item)) {
        let src = props.item;
        if (!Array.isArray(src)) { src = [src]; }
        resource.item = [];

        for (let item of src) {
            let _item = {
                ...item
            };

            resource.item.push(_item);
        }
    }

    if (!_.isNil(props.addItem)) {
        let src = props.addItem;
        if (!Array.isArray(src)) { src = [src]; }
        resource.addItem = [];

        for (let item of src) {
            let _addItem = {
                ...item
            };

            resource.addItem.push(_addItem);
        }
    }

    if (!_.isNil(props.total)) {
        let src = props.total;
        if (!Array.isArray(src)) { src = [src]; }
        resource.total = [];

        for (let item of src) {
            let _total = {
                ...item
            };

            resource.total.push(_total);
        }
    }

    if (!_.isNil(props.payment)) {
        let src = props.payment;

        let _payment = {
            ...item
        };

        resource.payment = _payment;
    }

    if (!_.isNil(props.processNote)) {
        let src = props.processNote;
        if (!Array.isArray(src)) { src = [src]; }
        resource.processNote = [];

        for (let item of src) {
            let _processNote = {
                ...item
            };

            resource.processNote.push(_processNote);
        }
    }

    if (!_.isNil(props.communicationRequest)) {
        if (!Array.isArray(props.communicationRequest)) { props.communicationRequest = [props.communicationRequest]; }
        resource.communicationRequest = dt.reference(props.communicationRequest);
    }

    if (!_.isNil(props.insurance)) {
        let src = props.insurance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.insurance = [];

        for (let item of src) {
            let _insurance = {
                ...item
            };

            resource.insurance.push(_insurance);
        }
    }

    if (!_.isNil(props.error)) {
        let src = props.error;
        if (!Array.isArray(src)) { src = [src]; }
        resource.error = [];

        for (let item of src) {
            let _error = {
                ...item
            };

            resource.error.push(_error);
        }
    }

    return resource;
}
