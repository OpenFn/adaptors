
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
    description?: string;
    domain?: string[] | FHIR.CodeableConcept;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    impurity?: FHIR.CodeableReference[];
    indication?: string;
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
        resource.type = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/medicinal-product-type", props.type)
        );

        dt.ensureConceptText(resource.type);
    }

    if (!_.isNil(props.domain)) {
        resource.domain = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/medicinal-product-domain", props.domain)
        );

        dt.ensureConceptText(resource.domain);
    }

    if (!_.isNil(props.status)) {
        resource.status = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/publication-status", props.status)
        );

        dt.ensureConceptText(resource.status);
    }

    if (!_.isNil(props.combinedPharmaceuticalDoseForm)) {
        resource.combinedPharmaceuticalDoseForm = dt.concept(dt.lookupValue(
            "http://hl7.org/fhir/ValueSet/combined-dose-form",
            props.combinedPharmaceuticalDoseForm
        ));

        dt.ensureConceptText(resource.combinedPharmaceuticalDoseForm);
    }

    if (!_.isNil(props.route)) {
        if (!Array.isArray(props.route)) { props.route = [props.route]; }

        resource.route = props.route.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/route-codes", x))
        );

        dt.ensureConceptText(resource.route);
    }

    if (!_.isNil(props.legalStatusOfSupply)) {
        resource.legalStatusOfSupply = dt.concept(dt.lookupValue(
            "http://hl7.org/fhir/ValueSet/legal-status-of-supply",
            props.legalStatusOfSupply
        ));

        dt.ensureConceptText(resource.legalStatusOfSupply);
    }

    if (!_.isNil(props.additionalMonitoringIndicator)) {
        resource.additionalMonitoringIndicator = dt.concept(dt.lookupValue(
            "http://hl7.org/fhir/ValueSet/medicinal-product-additional-monitoring",
            props.additionalMonitoringIndicator
        ));

        dt.ensureConceptText(resource.additionalMonitoringIndicator);
    }

    if (!_.isNil(props.specialMeasures)) {
        if (!Array.isArray(props.specialMeasures)) { props.specialMeasures = [props.specialMeasures]; }

        resource.specialMeasures = props.specialMeasures.map((x) => dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/medicinal-product-special-measures", x)
        ));

        dt.ensureConceptText(resource.specialMeasures);
    }

    if (!_.isNil(props.pediatricUseIndicator)) {
        resource.pediatricUseIndicator = dt.concept(dt.lookupValue(
            "http://hl7.org/fhir/ValueSet/medicinal-product-pediatric-use",
            props.pediatricUseIndicator
        ));

        dt.ensureConceptText(resource.pediatricUseIndicator);
    }

    if (!_.isNil(props.classification)) {
        if (!Array.isArray(props.classification)) { props.classification = [props.classification]; }

        resource.classification = props.classification.map((x) => dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/product-classification-codes", x)
        ));

        dt.ensureConceptText(resource.classification);
    }

    if (!_.isNil(props.packagedMedicinalProduct)) {
        if (!Array.isArray(props.packagedMedicinalProduct)) { props.packagedMedicinalProduct = [props.packagedMedicinalProduct]; }

        resource.packagedMedicinalProduct = props.packagedMedicinalProduct.map((x) => dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/medicinal-product-package-type", x)
        ));

        dt.ensureConceptText(resource.packagedMedicinalProduct);
    }

    if (!_.isNil(props.ingredient)) {
        if (!Array.isArray(props.ingredient)) { props.ingredient = [props.ingredient]; }

        resource.ingredient = props.ingredient.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/substance-codes", x))
        );

        dt.ensureConceptText(resource.ingredient);
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

    if (!_.isNil(props.code)) {
        let src = props.code;
        if (typeof src === 'string') {
          src = dt.lookupValue('http://hl7.org/fhir/ValueSet/medication-codes', src);
         }
        resource.code = dt.coding(src);
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
