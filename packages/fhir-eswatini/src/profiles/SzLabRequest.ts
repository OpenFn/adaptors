
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type ServiceRequest_SzLabRequest_Props = {
    asNeeded?: boolean | FHIR.CodeableConcept;
    authoredOn?: string;
    basedOn?: FHIR.Reference[];
    bodySite?: FHIR.CodeableConcept[];
    category?: FHIR.CodeableConcept[];
    code?: "CD4" | "AST" | "CREA" | "HB" | "LFT" | "HIVVL" | "ICUP" | "GGT" | "KFT" | "CARDE" | "ART" | "ELECT" | "GLUCF" | "GLUCR" | "GTT" | "CL" | "K" | "NA" | "CO2" | "UA" | "CREAC" | "TBIL" | "BILI" | "ALP" | "ALT" | "ALB" | "TPROT" | "CK" | "CKMB" | "MYOG" | "TROPI" | "MAG" | "PO4" | "CAL" | "LDH" | "TRIG" | "LDL" | "HDL" | "CHOL" | "AMY" | "LACT" | "CRP" | "LIPAS" | "HBA1C" | "M-TP" | "FBC" | "DIFF" | "ESR" | "RET" | "COOMB" | "SICKL" | "MAL" | "MALPC" | "MALS" | "PT" | "APTT" | "PI" | "BTIME" | "DDIME" | "TFT" | "T3" | "T4" | "TSH" | "LH" | "FSH" | "E2" | "PROG" | "PRL" | "TESTO" | "CORT" | "PTH" | "HCGSU" | "HCGSB" | "ABORH" | "RPR" | "TPHA" | "PSSA" | "BHCG" | "AFP" | "CA153" | "CA125" | "CEA" | "CA199" | "GRAM" | "MCSF" | "CSF" | "CRINK" | "SEMEN" | "HIVR" | "HIVE" | "HIPOC" | "LCRAG" | "TOXO" | "HELIP" | "HEAG" | "HBCAB" | "HEPC" | "QCRPR" | "WIDAL" | "RF" | "ASOT" | "XMAT" | "HLAX" | "ANISC" | "DCT" | "ICT" | "IGGS" | "ZN1" | "CUBFL" | "HIVGE" | "TROPT" | "UCHEM" | "CRAG" | "CRGLF" | "TBLAM" | "17OPH" | "A1ATR" | "ACA" | "ACE" | "ACERA" | "ACLA" | "ACOLA" | "ACTH" | "ADENO" | "ADNA" | "ALDOS" | "AMITA" | "AMYU" | "ANA" | "ANCA" | "ANDRO" | "ANTBG" | "ANTE" | "AUR1" | "AUR2" | "AUR3" | "AUR4" | "BFCC" | "BG" | "BGAS" | "BGRP" | "BHCG2" | "BM" | "BNP" | "BPARA" | "BPARM" | "C/UP" | "C1EST" | "CA724" | "CAERU" | "CALCI" | "CALCT" | "CARB" | "CATS" | "CHLAM" | "CMP" | "CMV" | "CPEPT" | "CPROT" | "CRPS" | "CSFA" | "CSFAG" | "CSFC" | "CUCSF" | "CULFU" | "CULMY" | "CULPU" | "CULSP" | "CUTUP" | "CYTCO" | "DBILI" | "DBSGE" | "DCRT" | "DIFFM" | "DIFFF" | "DRUGR" | "DRUGS" | "E2M" | "EQAM1" | "FDP" | "FE" | "FERR" | "FERRX" | "FGLU" | "FNA" | "FPROT" | "GLOB" | "GLUC" | "GLUCS" | "GNBST" | "GPCST" | "GROUP" | "GTT2" | "GTT4" | "GYN" | "GYNAE" | "HBELE" | "HBSAB" | "HBSAG" | "HELIC" | "HEPAG" | "HEPAM" | "HEPD" | "HEPE" | "HERP" | "HGH" | "HI2DF" | "HISIN" | "HISSU" | "HISTO" | "HISTX" | "HIV48" | "HIVA" | "HIVC" | "HIVCW" | "HIVLD" | "HIVPC" | "HIVP" | "HIVST" | "HIVWB" | "HSAGR" | "HSV" | "HVART" | "HYS" | "ICD10" | "IGE" | "INR" | "IRONX" | "LALB" | "LCHOL" | "LCOT" | "LCREA" | "LESR" | "LFBC" | "LGGT" | "LGLPF" | "LGLPR" | "LGLUF" | "LGLUR" | "LHBA1" | "LHDL" | "LI" | "LIPO" | "LRF" | "LUPUS" | "LUR" | "MALB" | "MBCAT" | "MBCLT" | "MBFAM" | "MBFAS" | "MBFCA" | "MBFL" | "MBFLU" | "MBFPE" | "MBFPL" | "MBFSY" | "MBTRA" | "MBUCT" | "MBUMC" | "MCES" | "MEAS" | "MENDC" | "MEYE" | "MGAS" | "MICBC" | "MICFL" | "MICNS" | "MICSA" | "MICTS" | "MICU" | "MONO" | "MPEN" | "MPT64" | "MPUS" | "MRCSW" | "MSPUT" | "MSTRS" | "MTISS" | "MUMPS" | "MUPS" | "MWUS" | "MYGT" | "MYMIC" | "MYOB" | "NGYN" | "MFOB" | "PARA" | "PBILI" | "PBS" | "PCRAP" | "PCTR" | "PHENB" | "PHENY" | "PHVS" | "PLAT" | "PM" | "POLIO" | "POSTM" | "POSTX" | "PRD" | "PROT" | "PRT24" | "PSA" | "PTT" | "RA" | "RAPI2" | "RCCHE" | "RH" | "ROTA" | "ROTPC" | "RUB" | "SADA" | "SCREA" | "SEICU" | "SENFA" | "SENGN" | "SENGP" | "SENSA" | "SENST" | "SENSU" | "SHBG" | "STDM" | "STOOL" | "TBA1" | "TBA2" | "TBA3" | "TBBA" | "TBCL" | "TBCL1" | "TBCL2" | "TBCL3" | "TBCON" | "TBEQA" | "TBGEN" | "TBHCG" | "TBILI" | "TBINF" | "TBLP1" | "TBLP2" | "TBLP3" | "TBLP" | "TBLPS" | "TBLSF" | "TBPC1" | "TBPC2" | "TBPC3" | "TBRAP" | "TBRP1" | "TBRP2" | "TBRP3" | "TBSF1" | "TBSF2" | "TBSF3" | "TBSFF" | "TBSS" | "TBSS2" | "TBSS3" | "TBSSF" | "TBZ" | "TBZ1" | "TBZ2" | "TBZ3" | "TBZN" | "TBZN1" | "TBZN2" | "TBZN3" | "THCGB" | "TT3" | "TTA" | "LURIC" | "UBHCG" | "UBJP" | "UCREA" | "UCUL" | "UE" | "UECA" | "UECA+" | "UMAC" | "UMIC" | "UPREG" | "UPROT" | "UREA" | "VALPR" | "VDRL" | "VLPOC" | "VMAC" | "VZV" | "WBCP" | "WCC" | "WF" | "YELLO" | "ZN" | "ZN2" | "ZN3" | "TBSF" | "QHCG" | "CVID" | "CVRP" | "MEASL" | "CD4 Test" | "AST (Aspartate Transaminase)" | "Creatinine " | "Haemoglobin" | "Liver Function Tests - Profile" | "HIV Viral Load (Plasma)" | "ICU-  Profile" | "Gamma-Glutamyl Transferase GGT" | "Kidney Function Test - Profile" | "Cardiac Enzymes" | "ART Baseline - Profile" | "Electrolytes - Profile" | "Glucose (Fasting)" | "Glucose (Random)" | "Glucose Tolerance Test" | "S-Chloride" | "S-Potassium" | "S-Sodium" | "S-Carbon Dioxide" | "Uric Acid" | "Creatinine Clearance" | "Total Bilirubin" | "Total and Direct Bilirubin" | "Alkaline Phosphatase" | "ALT (Alanine Aminotransferase)" | "Albumin" | "Total Protein" | "Creatine Kinase (CK)" | "Creatine Kinase (MB-Frac)" | "Myoglobin" | "S-Troponin I" | "S-Magnesium" | "Phosphate" | "S-Calcium" | "Lactate Dehydrogenase (LD)" | "Triglyceride" | "LDL - Cholesterol" | "HDL - Cholesterol" | "Total Cholesterol" | "Serum Amylase" | "Lactate" | "C-Reactive Protein (CRP)" | "Lipase (Serum)" | "Glycated Haemoglobin (HbA1C)" | "Micro Total Protein" | "FBC (Full Blood Count)" | "Differential Count" | "ESR (Westergren)" | "Reticulocyte Studies" | "Coombs Test" | "Sickle Cells Screen" | "Malaria" | "Malaria: PCR" | "Malaria Smear: Parasitemia" | "Prothrombin Time(INR/PI)" | "Partial Thromboplastin Time" | "Prothrombin Time (INR/PI)" | "Bleeding Time" | "D-Dimer" | "Thyroid Function Tests " | "Free Tri-iodothyronine (FT3)" | "Free Thyroxine (T4)" | "Thyroid Stimulating Hormone" | "Luteinising Hormone" | "Follicle Stimulating Hormone" | "17 b Oestradial (E2)" | "Progesterone" | "Prolactin" | "Testosterone" | "Cortisol" | "Parathyroid Hormone" | "Qualitative  -HCG (Urine)" | "Qualitative  -HCG" | "ABO + Rh Group" | "Syphilis RPR" | "TPHA" | "ANTIBIOTIC SENS: PSA" | "Beta-HCG (Pregnancy Test)" | "Alfa Feto Protein" | "CA15-3" | "CA125" | "Carcino-embryonic Antigen" | "CA19-9" | "MICROBIOLOGY : GRAM STAIN" | "MICROBIOLOGY : CSF" | "CSF Chem Profile" | "India Ink Stain" | "Semen Analysis" | "HIV Rapid Test" | "HIV ELISA" | "Point of Care DNA PCR" | "LFA Cryptococal Antigen" | "Toxoplasmosis Test" | "MICROBIOLOGY : H.pylori" | "Hepatitis A IgG" | "Hepatitis B Core Antibodies" | "Hepatitis C Antibodies" | "QC RPR" | "Widal" | "Rheumatoid Factor" | "Anti-Streptolysin O Test" | "Cross Match" | "Grouping/Crossmatch" | "Antibody Screening (^Bbloodban" | "Direct Coombs Test" | "Indirect Coomb's Test" | "IMMUNOGLOBULINS" | "Smear Microscopy 1" | "Culture : Body Fuilds" | "HIV GENE XPERT" | "Troponin-T" | "Biochemistry : Urine (Dipstick)" | "CRAG (CSF)" | "CRAG (LFA)  Blood" | "TB LAM Ag TEST" | "17 Hydroxyprogesterone" | "Alpha-1-antitrypsin" | "Anti-Centromere Antibodies" | "Angiotensin Converting Enzyme" | "Acetylcholine Receptor Ab's" | "Anti-Cardiolipin Antibodies" | "Anti-Collagen Antibodies" | "Adrenocorticotrophic Hormone" | "ADENO" | "Anti-Double Stranded DNA" | "Aldosterone" | "Anti-Mitochondrial Antibodies" | "Urine Amylase" | "Anti-Nuclear Antibodies" | "Anti-Neutrophil Cytoplasmic Ab" | "Androstenedione" | "Blood Group + Rh" | "Antenatal Screening" | "TB Auramine Specimen 1" | "TB Auramine Specimen 2" | "TB Auramine Specimen 3" | "TB Auramine Specimen 4" | "Cell Count : Body Fluid" | "Blood Group + Rh" | "Blood Gases" | "Blood grouping" | "HCG TOTAL BETA 2" | "Bone Marrow Report" | "B-Type Natriuretic Peptide" | "Blood Parasite Investigation" | "Blood Parasites" | "Cutup" | "C1 Esterase Inhibitor Assay" | "CA 72-4" | "Caeruloplasmin" | "Calcitonin" | "1.25 Dihydroxy Vitamin D" | "S-Carbamazepine" | "U-Catecholamines" | "Antibody test for Chlamydia" | "Calcium,Magnesium,PO4" | "CYTOMEGALOVIRUS" | "C-Peptide" | "CSF PROTEIN" | "CRP Serology" | "CSF Analysis" | "BACTERIAL ANTIGEN TESTS" | "Cell Count : CSF" | "CULTURE : CSF" | "MYCOLOGY" | "Mycology Culture" | "Culture : PUS" | "Culture : Sputum" | "Histo Cut Up (Dummy)" | "Gynaecological Detail" | "Conjugated Bilirubin (Direct)" | "Dry Blood Spot Gene Xpert" | "1:20 Diluted CRT" | "Differential Count" | "Diff Micro" | "Drug Resistance Testing" | "DRUG SCREEN" | "Oestradiol" | "Microbiology EQA" | "Fibrinogen Deg. Products (FDP)" | "S-Iron" | "Ferritin" | "S-Ferritin" | "Fluid-Glucose" | "Fine Needle Biopsy" | "F-Total Protein" | "Globulin" | "Glucose" | "Glucose Strip" | "GNB Sensitivity Testing" | "GPC Sensitivity testing" | "Blood Group Serology" | "GTT - 2 hourly" | "GTT Prolonged" | "Gynaecological Cytology" | "MICROSCOPIC EXAMINATION" | "Haemoglobin Electrophoresis" | "Hepatitis B Surface Antibody" | "Hepatitis B Surface Antigen" | "Helicobacter pylori Antibodies" | "Hepatitis A (IgG)(Immunity)" | "Hepatitis A IgM" | "HEPATITIS D INVESTIGATION" | "HEPATITIS E INVESTIGATION" | "Herpes simplex virus" | "Human Growth Hormone" | "HIV Viral Load (DBS)" | "CLINICAL HISTORY" | "Supplementary Report" | "MACROSCOPIC EXAMINATION" | "Histo Extended text" | "CD4 + CD8*" | "HIV ASANTE" | "HIV Ag/Ab Combo" | "Child Welfare Number" | "HIV Viral Load*" | "HIV DNA PCR" | "HIV RAPID TEST" | "HIV EID Information" | "HIV DNA PCR : Whole Blood" | "HepB surface antigen Rapid" | "Herpes simplex Virus" | "ART Number" | "Homocysteine" | "ICD10" | "Total IgE" | "INR" | "S-IRON STUDIES" | "ALBUMIN" | "S-Cholesterol" | "Cotinine ELISA" | "Creatinine" | "ESR (Westergren)" | "Full Blood Count" | "Gamma Glutamyl Transferase" | "P-Glucose (Fasting)" | "P-Glucose (Random)" | "S-Glucose (Fasting)" | "S-Glucose (Random)" | "HbA1C" | "HDL Cholesterol" | "S-Lithium" | "Lipogram" | "Rheumatoid factor" | "Lupus anticoagulant" | "Urea" | "Micro-albumin" | "Microbiology: Catheter Tip" | "Microbiology: Catheter Line Ti" | "MICROBIOLOGY:AMNIOTIC FLUID" | "MICROBIOLOGY : ASCITIC FLUID" | "MICROBIOLOGY:PERICARDIAL FLUID" | "Microbiology:Body Fluid" | "Microbiology:Body Fluid" | "MICROBIOLOGY:PERITONEAL FLUID" | "MICROBIOLOGY:PLEURAL FLUID" | "MICROBIOLOGY:SYNOVIAL FLUID" | "Microbiology: Tracheal Tip" | "Microbiology: Urinary Catheter" | "Microbiology:Umbilical Cathete" | "MICROBIOLOGY : CERVICAL SWAB" | "MICROBIOLOGY : EAR SWAB" | "MICROBIOLOGY:ENDOCERVICAL SWAB" | "MICROBIOLOGY : EYE SWAB" | "MICROBIOLOGY : GASTRIC ASP" | "MICROBIOLOGY: BLOOD CULTURE" | "MICROBIOLOGY : FLUID" | "MICROBIOLOGY : NASAL SWAB" | "Microscopy - Sexual Assault" | "MICROBIOLOGY : THROAT SWAB" | "MICROBIOLOGY: URINE" | "Epstein Barr Ser-Mono Test" | "MICROBIOLOGY : PENILE SWAB" | "MPT64 Rapid" | "MICROBIOLOGY : PUS" | "MICROBIOLOGY : RECTAL SWAB" | "MICROBIOLOGY : SPUTUM" | "MICROBIOLOGY : STOOL CULTURE" | "MICROBIOLOGY : TISSUE" | "Mumps Serology (ELISA)" | "MICROBIOLOGY : URETHRAL SWAB" | "MICROBILOLOGY: Wound Swab" | "Germ Tube Test" | "Microscopy for Fungi" | "Myogloblin (Serum)" | "Non-Gynaecological Cytology" | "Faecal Occult Blood" | "Parasitology:Urine" | "Neonatal Bilirubin" | "Peripheral Blood Smear" | "Factor V Leiden Mutation" | "Procalcitonin" | "Phenobarbitone" | "S-Phenytoin" | "PARASITOLOGY: VAGINAL SWAB" | "Platelets" | "Post-Mortem Examination" | "Polio Neutralisation Serology" | "POST MORTEM REPORT" | "Postmorten Supplement" | "Pregnandiol" | "Total Protein & Albumin" | "Urine Protein (24 hr)" | "Prostate Specific Antigen" | "Part Thromboplastin Time (PTT)" | "RA Latex Test" | "HIV Rapid Repeat" | "Cholinesterase" | "RHESUS FACTOR" | "Rotavirus Antigen EIA Test" | "Rotavirus: PCR" | "Rubella Serology" | "Adenosine Deaminase" | "Creatinine Clearance" | "SENS ICU" | "ANTIBIOTIC SUSCEPTIBILITY" | "ANTIBIOTIC SENS: GN" | "ANTIBIOTIC SENS: GP" | "ANTIBIOTIC SENS: STOOL" | "ANTIBIOTIC SENS: STOOL" | "ANTIBIOTIC SENS: URINE" | "Sex Hormone Binding Globulin" | "Direct Microscopy : Stool" | "Stool Microscopy" | "TB Microscopy Auramine 1" | "TB Microscopy Auramine 2" | "TB Microscopy Specimen 3" | "TB Blood Agar (TB Nat Ref)" | "TB Culture" | "TB Culture 1" | "TB Culture 2" | "TB Culture 3" | "TB Control" | "TB EQA" | "TB Genexpert" | "S-HCG Total Beta" | "S-Total Bilirubin" | "TB Diagnosis Information" | "TB Line Probe SP1" | "TB Line Probe SP2" | "TB Line Probe SP3" | "TB First Line -Line  Probe Assay" | "TB Second Line -Line  Probe Assay" | "2nd Line Probe Assay Final" | "TB PCR Specimen 1" | "TB PCR Specimen 2" | "TB PCR Specimen 3" | "TB Capilia Rapid Test" | "TB Capilia Rapid ID Test SP1" | "TB Capilia Rapid ID Test SP2" | "TB Capilia Rapid ID Test SP3" | "TB First Line Sens 1" | "TB First Line Sens 2" | "TB First Line Sens 3" | "TB First Line Sens Final" | "TB Second Line DST" | "TB Seconde Line Sens 2" | "TB Seconde Line Sens 3" | "TB Second Line Final" | "TBZN TB National Ref Lab" | "TB Direct Microscopy Spec. 1" | "TB Direct Microscopy Spec. 2" | "TB Direct Microscopy Spec. 3" | "TB Smear Microscopy" | "TBZN SP1" | "TBZN SP2" | "TBZN SP3" | "S-TOTAL HCG Beta" | "Total Tri-iodothyronine (TT3)" | "Tetanus Serology" | "Uric Acid" | "Urine Beta-HCG (Preg Test)" | "Urine Bence Jones Protein" | "Creatine Clearance" | "CULTURE : Urine" | "Urea & electrolytes" | "Urea, Electrolytes & Creatinin" | "Urea, Elec, Creat & eGFR" | "MACROSCOPY : Urine" | "MICROSCOPY : Urine" | "Urine Pregnancy Test" | "Total Protein (Urine)" | "Urea" | "S-Valproate" | "VDRL" | "HIV VIRAL LOAD (POC)" | "Vanillylmandelic Acid" | "VARICELLA-ZOSTER SEROLOGY" | "White Cell Count + Platelets" | "White Cell Count" | "WEIL FELIX" | "Yellow Fever" | "TBZN" | "Smear Microscopy 2" | "TBZN Specimen 3" | "TB First Line DST" | "Quantitative Beta-HCG (Blood)" | "PCR SARS-CoV-2" | "COVID-19 Ag Rapid Test" | "Measles";
    contained?: any[];
    doNotPerform?: boolean;
    encounter?: FHIR.Reference;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: FHIR.Reference[];
    intent?: string;
    language?: string;
    locationCode?: FHIR.CodeableConcept[];
    locationReference?: FHIR.Reference[];
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    occurrence?: string | FHIR.Period | FHIR.Timing;
    orderDetail?: FHIR.CodeableConcept[];
    patientInstruction?: string;
    performer?: FHIR.Reference[];
    performerType?: FHIR.CodeableConcept;
    priority?: string;
    quantity?: FHIR.Quantity | FHIR.Ratio | FHIR.Range;
    reasonCode?: FHIR.CodeableConcept[];
    reasonReference?: FHIR.Reference[];
    relevantHistory?: FHIR.Reference[];
    replaces?: FHIR.Reference[];
    requester?: FHIR.Reference;
    requisition?: FHIR.Identifier;
    specimen?: FHIR.Reference[];
    status?: string;
    subject?: FHIR.Reference;
    supportingInfo?: FHIR.Reference[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<ServiceRequest_SzLabRequest_Props>) {
    const resource = {
        resourceType: "ServiceRequest",

        meta: {
            profile: ["http://172.209.216.154:3447/fhir/StructureDefinition/SzLabRequest"]
        },

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

    if (!_.isNil(props.requisition)) {
        resource.requisition = dt.identifier(props.requisition);
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let _category = {
                ...item
            };

            resource.category.push(_category);
        }
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(
            dt.lookupValue("http://172.209.216.154:3447/fhir/ValueSet/SzTestCodeVS", props.code)
        );

        dt.ensureConceptText(resource.code);
    }

    if (!_.isNil(props.orderDetail)) {
        if (!Array.isArray(props.orderDetail)) { props.orderDetail = [props.orderDetail]; }

        resource.orderDetail = dt.concept(dt.lookupValue(
            "http://hl7.org/fhir/ValueSet/servicerequest-orderdetail",
            props.orderDetail
        ));

        dt.ensureConceptText(resource.orderDetail);
    }

    if (!_.isNil(props.quantity)) {
        delete resource.quantity;
        dt.composite(resource, "quantity", props.quantity);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        delete resource.occurrence;
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.asNeeded)) {
        delete resource.asNeeded;
        dt.composite(resource, "asNeeded", props.asNeeded);
    }

    if (!_.isNil(props.requester)) {
        resource.requester = dt.reference(props.requester);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/participant-role", props.performerType)
        );

        dt.ensureConceptText(resource.performerType);
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.locationCode)) {
        if (!Array.isArray(props.locationCode)) { props.locationCode = [props.locationCode]; }

        resource.locationCode = dt.concept(dt.lookupValue(
            "http://terminology.hl7.org/ValueSet/v3-ServiceDeliveryLocationRoleType",
            props.locationCode
        ));

        dt.ensureConceptText(resource.locationCode);
    }

    if (!_.isNil(props.locationReference)) {
        if (!Array.isArray(props.locationReference)) { props.locationReference = [props.locationReference]; }
        resource.locationReference = dt.reference(props.locationReference);
    }

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }

        resource.reasonCode = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/procedure-reason", props.reasonCode)
        );

        dt.ensureConceptText(resource.reasonCode);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = dt.reference(props.insurance);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = dt.reference(props.supportingInfo);
    }

    if (!_.isNil(props.specimen)) {
        if (!Array.isArray(props.specimen)) { props.specimen = [props.specimen]; }
        resource.specimen = dt.reference(props.specimen);
    }

    if (!_.isNil(props.bodySite)) {
        if (!Array.isArray(props.bodySite)) { props.bodySite = [props.bodySite]; }
        resource.bodySite = dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/body-site", props.bodySite));
        dt.ensureConceptText(resource.bodySite);
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = dt.reference(props.relevantHistory);
    }

    return resource;
}
