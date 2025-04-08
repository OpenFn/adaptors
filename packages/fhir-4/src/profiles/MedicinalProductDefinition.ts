
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type MedicinalProductDefinition_Props = {
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
    domain?: string[] | FHIR.CodeableConcept;
    version?: string;
    status?: string[] | FHIR.CodeableConcept;
    statusDate?: string;
    description?: FHIR.markdown;
    combinedPharmaceuticalDoseForm?: string[] | FHIR.CodeableConcept;
    route?: MaybeArray<string[] | FHIR.CodeableConcept>;
    indication?: FHIR.markdown;
    legalStatusOfSupply?: string[] | FHIR.CodeableConcept;
    additionalMonitoringIndicator?: string[] | FHIR.CodeableConcept;
    specialMeasures?: MaybeArray<string[] | FHIR.CodeableConcept>;
    pediatricUseIndicator?: string[] | FHIR.CodeableConcept;
    classification?: MaybeArray<string[] | FHIR.CodeableConcept>;
    marketingStatus?: FHIR.MarketingStatus[];
    packagedMedicinalProduct?: MaybeArray<string[] | FHIR.CodeableConcept>;
    ingredient?: MaybeArray<string[] | FHIR.CodeableConcept>;
    impurity?: FHIR.CodeableReference[];
    attachedDocument?: MaybeArray<string | FHIR.Reference>;
    masterFile?: MaybeArray<string | FHIR.Reference>;
    contact?: FHIR.BackboneElement[];
    clinicalTrial?: MaybeArray<string | FHIR.Reference>;
    code?: FHIR.Coding[];
    name?: FHIR.BackboneElement[];
    crossReference?: FHIR.BackboneElement[];
    operation?: FHIR.BackboneElement[];
    characteristic?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<MedicinalProductDefinition_Props>) {
    const resource = {
        resourceType: "MedicinalProductDefinition",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.attachedDocument)) {
        if (!Array.isArray(props.attachedDocument)) { props.attachedDocument = [props.attachedDocument]; }
        resource.attachedDocument = dt.reference(props.attachedDocument);
    }

    if (!_.isNil(props.masterFile)) {
        if (!Array.isArray(props.masterFile)) { props.masterFile = [props.masterFile]; }
        resource.masterFile = dt.reference(props.masterFile);
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {
                ...item
            };

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.clinicalTrial)) {
        if (!Array.isArray(props.clinicalTrial)) { props.clinicalTrial = [props.clinicalTrial]; }
        resource.clinicalTrial = dt.reference(props.clinicalTrial);
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (let item of src) {
            let _name = {
                ...item
            };

            resource.name.push(_name);
        }
    }

    if (!_.isNil(props.crossReference)) {
        let src = props.crossReference;
        if (!Array.isArray(src)) { src = [src]; }
        resource.crossReference = [];

        for (let item of src) {
            let _crossReference = {
                ...item
            };

            resource.crossReference.push(_crossReference);
        }
    }

    if (!_.isNil(props.operation)) {
        let src = props.operation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.operation = [];

        for (let item of src) {
            let _operation = {
                ...item
            };

            resource.operation.push(_operation);
        }
    }

    if (!_.isNil(props.characteristic)) {
        let src = props.characteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.characteristic = [];

        for (let item of src) {
            let _characteristic = {
                ...item
            };

            resource.characteristic.push(_characteristic);
        }
    }

    return resource;
}
