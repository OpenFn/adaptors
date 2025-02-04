
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type MedicinalProductDefinition_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    type?: FHIR.CodeableConcept;
    domain?: FHIR.CodeableConcept;
    version?: string;
    status?: FHIR.CodeableConcept;
    statusDate?: string;
    description?: FHIR.markdown;
    combinedPharmaceuticalDoseForm?: FHIR.CodeableConcept;
    route?: FHIR.CodeableConcept;
    indication?: FHIR.markdown;
    legalStatusOfSupply?: FHIR.CodeableConcept;
    additionalMonitoringIndicator?: FHIR.CodeableConcept;
    specialMeasures?: FHIR.CodeableConcept;
    pediatricUseIndicator?: FHIR.CodeableConcept;
    classification?: FHIR.CodeableConcept;
    marketingStatus?: FHIR.MarketingStatus;
    packagedMedicinalProduct?: FHIR.CodeableConcept;
    ingredient?: FHIR.CodeableConcept;
    impurity?: FHIR.CodeableReference;
    attachedDocument?: FHIR.Reference;
    masterFile?: FHIR.Reference;
    contact?: FHIR.BackboneElement;
    clinicalTrial?: FHIR.Reference;
    code?: FHIR.Coding;
    name?: FHIR.BackboneElement;
    crossReference?: FHIR.BackboneElement;
    operation?: FHIR.BackboneElement;
    characteristic?: FHIR.BackboneElement;
};

export default function(props: Partial<MedicinalProductDefinition_Props>) {
    const resource = {
        resourceType: "MedicinalProductDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicinalProductDefinition</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition"]
    };

    return resource;
}
