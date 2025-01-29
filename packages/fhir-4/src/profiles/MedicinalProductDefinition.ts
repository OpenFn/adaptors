
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type MedicinalProductDefinition_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    type?: any;
    domain?: any;
    version?: any;
    status?: any;
    statusDate?: any;
    description?: any;
    combinedPharmaceuticalDoseForm?: any;
    route?: any;
    indication?: any;
    legalStatusOfSupply?: any;
    additionalMonitoringIndicator?: any;
    specialMeasures?: any;
    pediatricUseIndicator?: any;
    classification?: any;
    marketingStatus?: any;
    packagedMedicinalProduct?: any;
    ingredient?: any;
    impurity?: any;
    attachedDocument?: any;
    masterFile?: any;
    contact?: any;
    clinicalTrial?: any;
    code?: any;
    name?: any;
    crossReference?: any;
    operation?: any;
    characteristic?: any;
};

export default function(props: Partial<MedicinalProductDefinition_Props>) {
    const resource = {
        resourceType: "MedicinalProductDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicinalProductDefinition</b></p></div>"
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

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.domain)) {
        resource.domain = props.domain;
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusDate)) {
        resource.statusDate = props.statusDate;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.combinedPharmaceuticalDoseForm)) {
        resource.combinedPharmaceuticalDoseForm = props.combinedPharmaceuticalDoseForm;
    }

    if (!_.isNil(props.route)) {
        resource.route = props.route;
    }

    if (!_.isNil(props.indication)) {
        resource.indication = props.indication;
    }

    if (!_.isNil(props.legalStatusOfSupply)) {
        resource.legalStatusOfSupply = props.legalStatusOfSupply;
    }

    if (!_.isNil(props.additionalMonitoringIndicator)) {
        resource.additionalMonitoringIndicator = props.additionalMonitoringIndicator;
    }

    if (!_.isNil(props.specialMeasures)) {
        resource.specialMeasures = props.specialMeasures;
    }

    if (!_.isNil(props.pediatricUseIndicator)) {
        resource.pediatricUseIndicator = props.pediatricUseIndicator;
    }

    if (!_.isNil(props.classification)) {
        resource.classification = props.classification;
    }

    if (!_.isNil(props.marketingStatus)) {
        resource.marketingStatus = props.marketingStatus;
    }

    if (!_.isNil(props.packagedMedicinalProduct)) {
        resource.packagedMedicinalProduct = props.packagedMedicinalProduct;
    }

    if (!_.isNil(props.ingredient)) {
        resource.ingredient = props.ingredient;
    }

    if (!_.isNil(props.impurity)) {
        resource.impurity = props.impurity;
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
            let _contact = {};

            if (!_.isNil(item.id)) {
                _contact.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _contact.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _contact.type = item.type;
            }

            if (!_.isNil(item.contact)) {
                _contact.contact = item.contact;
            }

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.clinicalTrial)) {
        if (!Array.isArray(props.clinicalTrial)) { props.clinicalTrial = [props.clinicalTrial]; }
        resource.clinicalTrial = dt.reference(props.clinicalTrial);
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (let item of src) {
            let _name = {};

            if (!_.isNil(item.id)) {
                _name.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _name.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.productName)) {
                _name.productName = item.productName;
            }

            if (!_.isNil(item.type)) {
                _name.type = item.type;
            }

            if (!_.isNil(item.namePart)) {
                _name.namePart = item.namePart;
            }

            if (!_.isNil(item.countryLanguage)) {
                _name.countryLanguage = item.countryLanguage;
            }

            resource.name.push(_name);
        }
    }

    if (!_.isNil(props.crossReference)) {
        let src = props.crossReference;
        if (!Array.isArray(src)) { src = [src]; }
        resource.crossReference = [];

        for (let item of src) {
            let _crossReference = {};

            if (!_.isNil(item.id)) {
                _crossReference.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _crossReference.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.product)) {
                _crossReference.product = item.product;
            }

            if (!_.isNil(item.type)) {
                _crossReference.type = item.type;
            }

            resource.crossReference.push(_crossReference);
        }
    }

    if (!_.isNil(props.operation)) {
        let src = props.operation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.operation = [];

        for (let item of src) {
            let _operation = {};

            if (!_.isNil(item.id)) {
                _operation.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _operation.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _operation.type = item.type;
            }

            if (!_.isNil(item.effectiveDate)) {
                _operation.effectiveDate = item.effectiveDate;
            }

            if (!_.isNil(item.organization)) {
                _operation.organization = item.organization;
            }

            if (!_.isNil(item.confidentialityIndicator)) {
                _operation.confidentialityIndicator = item.confidentialityIndicator;
            }

            resource.operation.push(_operation);
        }
    }

    if (!_.isNil(props.characteristic)) {
        let src = props.characteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.characteristic = [];

        for (let item of src) {
            let _characteristic = {};

            if (!_.isNil(item.id)) {
                _characteristic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _characteristic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _characteristic.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _characteristic.value = item.value;
            }

            resource.characteristic.push(_characteristic);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition"]
    };

    return resource;
}
