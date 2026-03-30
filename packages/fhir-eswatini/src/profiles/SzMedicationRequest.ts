
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type MedicationRequest_SzMedicationRequest_Props = {
    authoredOn?: string;
    basedOn?: FHIR.Reference[];
    category?: FHIR.CodeableConcept[];
    contained?: any[];
    courseOfTherapyType?: FHIR.CodeableConcept;
    detectedIssue?: FHIR.Reference[];
    dispenseRequest?: FHIR.BackboneElement;
    doNotPerform?: boolean;
    dosageInstruction?: FHIR.Dosage[];
    encounter?: FHIR.Reference;
    eventHistory?: FHIR.Reference[];
    extension?: FHIR.Extension[];
    groupIdentifier?: FHIR.Identifier;
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: FHIR.Reference[];
    intent?: string;
    language?: string;
    medication?: "100001" | "100009" | "100014" | "100089" | "100221" | "100238" | "100304" | "100449" | "100460" | "100528" | "100648" | "100651" | "100654" | "100666" | "100686" | "100689" | "100700" | "100706" | "100707" | "100734" | "102263" | "102266" | "102268" | "102272" | "102273" | "102276" | "102277" | "102280" | "102282" | "102304" | "102323" | "102324" | "102327" | "102332" | "102333" | "102341" | "102346" | "102348" | "102443" | "102492" | "102502" | "Cyclophosphamide Tablets 25mg 100" | "Amoxycillin Capsules 500mg 500 CAPS" | "Cefaclor Tablets 375mg 10 TABS" | "Albendazole Tablets 200mg (Chewable) 1000 TABS" | "Cloxacillin Suspension 125mg/5ml 100 ML" | "Cold & Flu Syrup 100 ML" | "Adrenaline Injection 1:1000 10 AMPS" | "Acyclovir Eye Ointment 3% 4.5 G" | "Betamethasone Cream 0.1% 15G" | "Beclomethasone Nasal Spray 27.5mcg/dose (Paeds)Com 1" | "Abacavir 300mg Tablets 60 TABS" | "Atazanavir/Ritonavir 300/100mg Tablets 30" | "Efavirenz 200mg Scored Tablets 90" | "Raltegravir 400mg Tablets 60 TABS" | "Isoniazid 100mg Tablets 100 TABS" | "Saquinavir 200mg Capsules 270 CAPS" | "Flucytosine 500mg 100 TABS" | "Dapsone Tablets 100mg 100" | "Cotrimoxazole/Isoniazid/Pyridoxine 960/300/25mg 30 TABS" | "Bleomycin Injection 15 Units Vial (With Cold Chain 1 AMP" | "Clofazimine Tablets 100mg 100 TABS" | "Delamanid FILM COATED Tablets 50mg 48 TABS" | "Ethambutol FILM COATEDTablets 100mg 100 TABS" | "Ethionamide FILM COATED Capsules 250mg 50 CAPS" | "Isoniazid Tablets 300mg 28 TABS" | "Levofloxacin Tablets 500mg 100 TABS" | "Linezolid FILM COATED Tablets 600mg 60 TABS" | "Moxifloxacillin  FILM COATED Tablets 400mg 100 TABS" | "Pyrazinamide Tablets 500mg 1000 TABS" | "Amikacin 1g 50 VIALS" | "Levonorgestrel 30mcg Tablets 84 TABS" | "Norgestrel 300mcg/Ethinylestradiol 30mcg Tablets 28 TABS" | "Levonorgestrel +Ethinyl Estradiol 150mcg+30mcg Tab 3 TABS" | "Medroxyprogesterone Acetate 150mg/ml Injection 20 VIALS" | "Norethisterone Enanthate + Estradiol Valerate In O 100 VIALS" | "Intra-Uterine Device (Iucd) T380 ( Polymer Film Po 1" | "Strawberry Scented Male Condoms ( natural latex,53mm) 100" | "Water Based Lubricant (SRH) SATCHET" | "Cefazolin 1g; 10 Vial 10 VIAL" | "Paracetamol Tablets 500g (Coloured Green) 100 TABS" | "T Section; 1 Each 1 EACH";
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    performer?: FHIR.Reference;
    performerType?: FHIR.CodeableConcept;
    priorPrescription?: FHIR.Reference;
    priority?: string;
    reasonCode?: FHIR.CodeableConcept[];
    reasonReference?: FHIR.Reference[];
    recorder?: FHIR.Reference;
    reported?: boolean | FHIR.Reference;
    requester?: FHIR.Reference;
    status?: string;
    statusReason?: FHIR.CodeableConcept;
    subject?: FHIR.Reference;
    substitution?: FHIR.BackboneElement;
    supportingInformation?: FHIR.Reference[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<MedicationRequest_SzMedicationRequest_Props>) {
    const resource = {
        resourceType: "MedicationRequest",

        meta: {
            profile: [
                "https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzMedicationRequest"
            ]
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = dt.concept(dt.lookupValue(
            "http://hl7.org/fhir/ValueSet/medicationrequest-status-reason|4.0.1",
            props.statusReason
        ));

        dt.ensureConceptText(resource.statusReason);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }

        resource.category = props.category.map((x) => dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/medicationrequest-category|4.0.1", x)
        ));

        dt.ensureConceptText(resource.category);
    }

    if (!_.isNil(props.reported)) {
        delete resource.reported;
        dt.composite(resource, "reported", props.reported);
    }

    if (!_.isNil(props.medication)) {
        delete resource.medication;
        dt.composite(resource, "medication", props.medication);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = dt.reference(props.supportingInformation);
    }

    if (!_.isNil(props.requester)) {
        resource.requester = dt.reference(props.requester);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/performer-role|4.0.1", props.performerType)
        );

        dt.ensureConceptText(resource.performerType);
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = dt.reference(props.recorder);
    }

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }

        resource.reasonCode = props.reasonCode.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/condition-code|4.0.1", x))
        );

        dt.ensureConceptText(resource.reasonCode);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = dt.identifier(props.groupIdentifier);
    }

    if (!_.isNil(props.courseOfTherapyType)) {
        resource.courseOfTherapyType = dt.concept(dt.lookupValue(
            "http://hl7.org/fhir/ValueSet/medicationrequest-course-of-therapy|4.0.1",
            props.courseOfTherapyType
        ));

        dt.ensureConceptText(resource.courseOfTherapyType);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = dt.reference(props.insurance);
    }

    if (!_.isNil(props.dosageInstruction)) {
        let src = props.dosageInstruction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.dosageInstruction = [];

        for (let item of src) {
            let _dosageInstruction = {
                ...item
            };

            resource.dosageInstruction.push(_dosageInstruction);
        }
    }

    if (!_.isNil(props.dispenseRequest)) {
        let src = props.dispenseRequest;

        let _dispenseRequest = {
            ...src
        };

        resource.dispenseRequest = _dispenseRequest;
    }

    if (!_.isNil(props.substitution)) {
        let src = props.substitution;

        let _substitution = {
            ...src
        };

        resource.substitution = _substitution;
    }

    if (!_.isNil(props.priorPrescription)) {
        resource.priorPrescription = dt.reference(props.priorPrescription);
    }

    if (!_.isNil(props.detectedIssue)) {
        if (!Array.isArray(props.detectedIssue)) { props.detectedIssue = [props.detectedIssue]; }
        resource.detectedIssue = dt.reference(props.detectedIssue);
    }

    if (!_.isNil(props.eventHistory)) {
        if (!Array.isArray(props.eventHistory)) { props.eventHistory = [props.eventHistory]; }
        resource.eventHistory = dt.reference(props.eventHistory);
    }

    resource.text = {
      status: 'generated',
      div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">
      <h2>${resource.resourceType}: ${resource.id || '(anon)'}</h2>
</div>`,
    };
    return resource;
}
