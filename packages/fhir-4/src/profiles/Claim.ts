
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Claim_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    status?: string;
    type?: FHIR.CodeableConcept;
    subType?: FHIR.CodeableConcept;
    use?: string;
    patient?: FHIR.Reference;
    billablePeriod?: FHIR.Period;
    created?: string;
    enterer?: FHIR.Reference;
    insurer?: FHIR.Reference;
    provider?: FHIR.Reference;
    priority?: FHIR.CodeableConcept;
    fundsReserve?: FHIR.CodeableConcept;
    related?: FHIR.BackboneElement;
    prescription?: FHIR.Reference;
    originalPrescription?: FHIR.Reference;
    payee?: FHIR.BackboneElement;
    referral?: FHIR.Reference;
    facility?: FHIR.Reference;
    careTeam?: FHIR.BackboneElement;
    supportingInfo?: FHIR.BackboneElement;
    diagnosis?: FHIR.BackboneElement;
    procedure?: FHIR.BackboneElement;
    insurance?: FHIR.BackboneElement;
    accident?: FHIR.BackboneElement;
    item?: FHIR.BackboneElement;
    total?: FHIR.Money;
    initialiser?: any;
};

export default function(props: Partial<Claim_Props>) {
    const resource = {
        resourceType: "Claim",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = dt.reference(props.enterer);
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = dt.reference(props.insurer);
    }

    if (!_.isNil(props.provider)) {
        resource.provider = dt.reference(props.provider);
    }

    if (!_.isNil(props.related)) {
        let src = props.related;
        if (!Array.isArray(src)) { src = [src]; }
        resource.related = [];

        for (let item of src) {
            let _related = {
                ...item
            };

            resource.related.push(_related);
        }
    }

    if (!_.isNil(props.prescription)) {
        resource.prescription = dt.reference(props.prescription);
    }

    if (!_.isNil(props.originalPrescription)) {
        resource.originalPrescription = dt.reference(props.originalPrescription);
    }

    if (!_.isNil(props.payee)) {
        let src = props.payee;

        let _payee = {
            ...item
        };

        resource.payee = _payee;
    }

    if (!_.isNil(props.referral)) {
        resource.referral = dt.reference(props.referral);
    }

    if (!_.isNil(props.facility)) {
        resource.facility = dt.reference(props.facility);
    }

    if (!_.isNil(props.careTeam)) {
        let src = props.careTeam;
        if (!Array.isArray(src)) { src = [src]; }
        resource.careTeam = [];

        for (let item of src) {
            let _careTeam = {
                ...item
            };

            resource.careTeam.push(_careTeam);
        }
    }

    if (!_.isNil(props.supportingInfo)) {
        let src = props.supportingInfo;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supportingInfo = [];

        for (let item of src) {
            let _supportingInfo = {
                ...item
            };

            resource.supportingInfo.push(_supportingInfo);
        }
    }

    if (!_.isNil(props.diagnosis)) {
        let src = props.diagnosis;
        if (!Array.isArray(src)) { src = [src]; }
        resource.diagnosis = [];

        for (let item of src) {
            let _diagnosis = {
                ...item
            };

            resource.diagnosis.push(_diagnosis);
        }
    }

    if (!_.isNil(props.procedure)) {
        let src = props.procedure;
        if (!Array.isArray(src)) { src = [src]; }
        resource.procedure = [];

        for (let item of src) {
            let _procedure = {
                ...item
            };

            resource.procedure.push(_procedure);
        }
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

    if (!_.isNil(props.accident)) {
        let src = props.accident;

        let _accident = {
            ...item
        };

        resource.accident = _accident;
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

    return resource;
}
