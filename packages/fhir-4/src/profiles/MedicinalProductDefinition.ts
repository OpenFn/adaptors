
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type MedicinalProductDefinition_Props = {
    additionalMonitoringIndicator?: string[] | FHIR.CodeableConcept;
    attachedDocument?: MaybeArray<string | FHIR.Reference>;
    characteristic?: FHIR.BackboneElement[];
    classification?: MaybeArray<string[] | FHIR.CodeableConcept>;
    clinicalTrial?: MaybeArray<string | FHIR.Reference>;
    code?: FHIR.Coding[];
    combinedPharmaceuticalDoseForm?: string[] | FHIR.CodeableConcept;
    contact?: FHIR.BackboneElement[];
    contained?: any[];
    crossReference?: FHIR.BackboneElement[];
    description?: FHIR.markdown;
    domain?: string[] | FHIR.CodeableConcept;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    impurity?: FHIR.CodeableReference[];
    indication?: FHIR.markdown;
    ingredient?: MaybeArray<string[] | FHIR.CodeableConcept>;
    language?: string;
    legalStatusOfSupply?: string[] | FHIR.CodeableConcept;
    marketingStatus?: FHIR.MarketingStatus[];
    masterFile?: MaybeArray<string | FHIR.Reference>;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: FHIR.BackboneElement[];
    operation?: FHIR.BackboneElement[];
    packagedMedicinalProduct?: MaybeArray<string[] | FHIR.CodeableConcept>;
    pediatricUseIndicator?: string[] | FHIR.CodeableConcept;
    route?: MaybeArray<string[] | FHIR.CodeableConcept>;
    specialMeasures?: MaybeArray<string[] | FHIR.CodeableConcept>;
    status?: string[] | FHIR.CodeableConcept;
    statusDate?: string;
    text?: FHIR.Narrative;
    type?: string[] | FHIR.CodeableConcept;
    version?: string;
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

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.domain)) {
        resource.domain = dt.concept(props.domain);
    }

    if (!_.isNil(props.status)) {
        resource.status = dt.concept(props.status);
    }

    if (!_.isNil(props.combinedPharmaceuticalDoseForm)) {
        resource.combinedPharmaceuticalDoseForm = dt.concept(props.combinedPharmaceuticalDoseForm);
    }

    if (!_.isNil(props.route)) {
        if (!Array.isArray(props.route)) { props.route = [props.route]; }
        resource.route = dt.concept(props.route);
    }

    if (!_.isNil(props.legalStatusOfSupply)) {
        resource.legalStatusOfSupply = dt.concept(props.legalStatusOfSupply);
    }

    if (!_.isNil(props.additionalMonitoringIndicator)) {
        resource.additionalMonitoringIndicator = dt.concept(props.additionalMonitoringIndicator);
    }

    if (!_.isNil(props.specialMeasures)) {
        if (!Array.isArray(props.specialMeasures)) { props.specialMeasures = [props.specialMeasures]; }
        resource.specialMeasures = dt.concept(props.specialMeasures);
    }

    if (!_.isNil(props.pediatricUseIndicator)) {
        resource.pediatricUseIndicator = dt.concept(props.pediatricUseIndicator);
    }

    if (!_.isNil(props.classification)) {
        if (!Array.isArray(props.classification)) { props.classification = [props.classification]; }
        resource.classification = dt.concept(props.classification);
    }

    if (!_.isNil(props.packagedMedicinalProduct)) {
        if (!Array.isArray(props.packagedMedicinalProduct)) { props.packagedMedicinalProduct = [props.packagedMedicinalProduct]; }
        resource.packagedMedicinalProduct = dt.concept(props.packagedMedicinalProduct);
    }

    if (!_.isNil(props.ingredient)) {
        if (!Array.isArray(props.ingredient)) { props.ingredient = [props.ingredient]; }
        resource.ingredient = dt.concept(props.ingredient);
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
