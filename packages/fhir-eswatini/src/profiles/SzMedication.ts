
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Medication_SzMedication_Props = {
    amount?: FHIR.Ratio;
    batch?: FHIR.BackboneElement;
    code?: "100001" | "100009" | "100014" | "100089" | "100221" | "100238" | "100304" | "100449" | "100460" | "100528" | "100648" | "100651" | "100654" | "100666" | "100686" | "100689" | "100700" | "100706" | "100707" | "100734" | "102263" | "102266" | "102268" | "102272" | "102273" | "102276" | "102277" | "102280" | "102282" | "102304" | "102323" | "102324" | "102327" | "102332" | "102333" | "102341" | "102346" | "102348" | "102443" | "102492" | "102502" | "Cyclophosphamide Tablets 25mg 100" | "Amoxycillin Capsules 500mg 500 CAPS" | "Cefaclor Tablets 375mg 10 TABS" | "Albendazole Tablets 200mg (Chewable) 1000 TABS" | "Cloxacillin Suspension 125mg/5ml 100 ML" | "Cold & Flu Syrup 100 ML" | "Adrenaline Injection 1:1000 10 AMPS" | "Acyclovir Eye Ointment 3% 4.5 G" | "Betamethasone Cream 0.1% 15G" | "Beclomethasone Nasal Spray 27.5mcg/dose (Paeds)Com 1" | "Abacavir 300mg Tablets 60 TABS" | "Atazanavir/Ritonavir 300/100mg Tablets 30" | "Efavirenz 200mg Scored Tablets 90" | "Raltegravir 400mg Tablets 60 TABS" | "Isoniazid 100mg Tablets 100 TABS" | "Saquinavir 200mg Capsules 270 CAPS" | "Flucytosine 500mg 100 TABS" | "Dapsone Tablets 100mg 100" | "Cotrimoxazole/Isoniazid/Pyridoxine 960/300/25mg 30 TABS" | "Bleomycin Injection 15 Units Vial (With Cold Chain 1 AMP" | "Clofazimine Tablets 100mg 100 TABS" | "Delamanid FILM COATED Tablets 50mg 48 TABS" | "Ethambutol FILM COATEDTablets 100mg 100 TABS" | "Ethionamide FILM COATED Capsules 250mg 50 CAPS" | "Isoniazid Tablets 300mg 28 TABS" | "Levofloxacin Tablets 500mg 100 TABS" | "Linezolid FILM COATED Tablets 600mg 60 TABS" | "Moxifloxacillin  FILM COATED Tablets 400mg 100 TABS" | "Pyrazinamide Tablets 500mg 1000 TABS" | "Amikacin 1g 50 VIALS" | "Levonorgestrel 30mcg Tablets 84 TABS" | "Norgestrel 300mcg/Ethinylestradiol 30mcg Tablets 28 TABS" | "Levonorgestrel +Ethinyl Estradiol 150mcg+30mcg Tab 3 TABS" | "Medroxyprogesterone Acetate 150mg/ml Injection 20 VIALS" | "Norethisterone Enanthate + Estradiol Valerate In O 100 VIALS" | "Intra-Uterine Device (Iucd) T380 ( Polymer Film Po 1" | "Strawberry Scented Male Condoms ( natural latex,53mm) 100" | "Water Based Lubricant (SRH) SATCHET" | "Cefazolin 1g; 10 Vial 10 VIAL" | "Paracetamol Tablets 500g (Coloured Green) 100 TABS" | "T Section; 1 Each 1 EACH";
    contained?: any[];
    extension?: FHIR.Extension[];
    form?: FHIR.CodeableConcept;
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    ingredient?: FHIR.BackboneElement[];
    language?: string;
    manufacturer?: FHIR.Reference;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    status?: string;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<Medication_SzMedication_Props>) {
    const resource = {
        resourceType: "Medication",

        meta: {
            profile: ["http://172.209.216.154:3447/fhir/StructureDefinition/SzMedication"]
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(
            dt.lookupValue("http://172.209.216.154:3447/fhir/ValueSet/SzProductCodeVS", props.code)
        );

        dt.ensureConceptText(resource.code);
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.form)) {
        resource.form = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/medication-form-codes", props.form)
        );

        dt.ensureConceptText(resource.form);
    }

    if (!_.isNil(props.ingredient)) {
        let src = props.ingredient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.ingredient = [];

        for (let item of src) {
            let _ingredient = {
                ...item
            };

            resource.ingredient.push(_ingredient);
        }
    }

    if (!_.isNil(props.batch)) {
        let src = props.batch;

        let _batch = {
            ...src
        };

        resource.batch = _batch;
    }

    return resource;
}
