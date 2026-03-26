
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import { builders } from '@openfn/language-fhir-4';

declare type Appointment_SzAppointment_Props = {
    appointmentType?: builders.CodeableConcept;
    basedOn?: builders.Reference[];
    cancelationReason?: builders.CodeableConcept;
    comment?: string;
    contained?: any[];
    created?: string;
    description?: string;
    end?: string;
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: builders.Meta;
    minutesDuration?: number;
    modifierExtension?: builders.Extension[];
    participant?: builders.BackboneElement[];
    patientInstruction?: string;
    priority?: number;
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    requestedPeriod?: builders.Period[];
    serviceCategory?: builders.CodeableConcept[];
    serviceType?: builders.CodeableConcept[];
    slot?: builders.Reference[];
    specialty?: builders.CodeableConcept[];
    start?: string;
    status?: string;
    supportingInformation?: builders.Reference[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Condition_SzCondition_Props = {
    abatement?: string | builders.Age | builders.Period | builders.Range;
    asserter?: builders.Reference;
    bodySite?: builders.CodeableConcept[];
    category?: builders.CodeableConcept[];
    clinicalStatus?: builders.CodeableConcept;
    code?: builders.CodeableConcept;
    contained?: any[];
    encounter?: builders.Reference;
    evidence?: builders.BackboneElement[];
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    onset?: string;
    recordedDate?: string;
    recorder?: builders.Reference;
    severity?: builders.CodeableConcept;
    stage?: builders.BackboneElement[];
    subject?: builders.Reference;
    text?: builders.Narrative;
    verificationStatus?: builders.CodeableConcept;
    [key: string]: any;
};

declare type Encounter_SzEncounter_Props = {
    account?: builders.Reference[];
    appointment?: builders.Reference[];
    basedOn?: builders.Reference[];
    class?: "OPD" | "IPD" | "CO" | "SO" | "Outpatient Department" | "Inpatient Department" | "Community Outreach" | "Schools Outreach";
    classHistory?: builders.BackboneElement[];
    contained?: any[];
    diagnosis?: builders.BackboneElement[];
    episodeOfCare?: builders.Reference[];
    extension?: builders.Extension[];
    hospitalization?: builders.BackboneElement;
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    length?: builders.Duration;
    location?: builders.BackboneElement[];
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    partOf?: builders.Reference;
    participant?: builders.BackboneElement[];
    period?: builders.Period;
    priority?: builders.CodeableConcept;
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    serviceProvider?: builders.Reference;
    serviceType?: builders.CodeableConcept;
    status?: string;
    statusHistory?: builders.BackboneElement[];
    subject?: builders.Reference;
    text?: builders.Narrative;
    type?: builders.CodeableConcept[];
    [key: string]: any;
};

declare type EpisodeOfCare_SzEpisodeOfCare_Props = {
    account?: builders.Reference[];
    careManager?: builders.Reference;
    contained?: any[];
    diagnosis?: builders.BackboneElement[];
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    managingOrganization?: builders.Reference;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    patient?: builders.Reference;
    period?: builders.Period;
    referralRequest?: builders.Reference[];
    status?: string;
    statusHistory?: builders.BackboneElement[];
    team?: builders.Reference[];
    text?: builders.Narrative;
    type?: "tbds" | "tbdr" | "anc" | "fp" | "art" | "prep" | "TB DS" | "TB DR" | "ANC" | "Family Planning" | "ART" | "PrEP";
    [key: string]: any;
};

declare type Location_SzLocation_Props = {
    address?: builders.Address;
    alias?: string[];
    availabilityExceptions?: string;
    contained?: any[];
    description?: string;
    endpoint?: builders.Reference[];
    extension?: builders.Extension[];
    hoursOfOperation?: builders.BackboneElement[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    managingOrganization?: builders.Reference;
    meta?: builders.Meta;
    mode?: string;
    modifierExtension?: builders.Extension[];
    name?: string;
    operationalStatus?: builders.Coding;
    partOf?: builders.Reference;
    physicalType?: builders.CodeableConcept;
    position?: builders.BackboneElement;
    status?: string;
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    type?: builders.CodeableConcept[];
    [key: string]: any;
};

declare type Medication_SzMedication_Props = {
    amount?: builders.Ratio;
    batch?: builders.BackboneElement;
    code?: "100001" | "100009" | "100014" | "100089" | "100221" | "100238" | "100304" | "100449" | "100460" | "100528" | "100648" | "100651" | "100654" | "100666" | "100686" | "100689" | "100700" | "100706" | "100707" | "100734" | "102263" | "102266" | "102268" | "102272" | "102273" | "102276" | "102277" | "102280" | "102282" | "102304" | "102323" | "102324" | "102327" | "102332" | "102333" | "102341" | "102346" | "102348" | "102443" | "102492" | "102502" | "Cyclophosphamide Tablets 25mg 100" | "Amoxycillin Capsules 500mg 500 CAPS" | "Cefaclor Tablets 375mg 10 TABS" | "Albendazole Tablets 200mg (Chewable) 1000 TABS" | "Cloxacillin Suspension 125mg/5ml 100 ML" | "Cold & Flu Syrup 100 ML" | "Adrenaline Injection 1:1000 10 AMPS" | "Acyclovir Eye Ointment 3% 4.5 G" | "Betamethasone Cream 0.1% 15G" | "Beclomethasone Nasal Spray 27.5mcg/dose (Paeds)Com 1" | "Abacavir 300mg Tablets 60 TABS" | "Atazanavir/Ritonavir 300/100mg Tablets 30" | "Efavirenz 200mg Scored Tablets 90" | "Raltegravir 400mg Tablets 60 TABS" | "Isoniazid 100mg Tablets 100 TABS" | "Saquinavir 200mg Capsules 270 CAPS" | "Flucytosine 500mg 100 TABS" | "Dapsone Tablets 100mg 100" | "Cotrimoxazole/Isoniazid/Pyridoxine 960/300/25mg 30 TABS" | "Bleomycin Injection 15 Units Vial (With Cold Chain 1 AMP" | "Clofazimine Tablets 100mg 100 TABS" | "Delamanid FILM COATED Tablets 50mg 48 TABS" | "Ethambutol FILM COATEDTablets 100mg 100 TABS" | "Ethionamide FILM COATED Capsules 250mg 50 CAPS" | "Isoniazid Tablets 300mg 28 TABS" | "Levofloxacin Tablets 500mg 100 TABS" | "Linezolid FILM COATED Tablets 600mg 60 TABS" | "Moxifloxacillin  FILM COATED Tablets 400mg 100 TABS" | "Pyrazinamide Tablets 500mg 1000 TABS" | "Amikacin 1g 50 VIALS" | "Levonorgestrel 30mcg Tablets 84 TABS" | "Norgestrel 300mcg/Ethinylestradiol 30mcg Tablets 28 TABS" | "Levonorgestrel +Ethinyl Estradiol 150mcg+30mcg Tab 3 TABS" | "Medroxyprogesterone Acetate 150mg/ml Injection 20 VIALS" | "Norethisterone Enanthate + Estradiol Valerate In O 100 VIALS" | "Intra-Uterine Device (Iucd) T380 ( Polymer Film Po 1" | "Strawberry Scented Male Condoms ( natural latex,53mm) 100" | "Water Based Lubricant (SRH) SATCHET" | "Cefazolin 1g; 10 Vial 10 VIAL" | "Paracetamol Tablets 500g (Coloured Green) 100 TABS" | "T Section; 1 Each 1 EACH";
    contained?: any[];
    extension?: builders.Extension[];
    form?: builders.CodeableConcept;
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    ingredient?: builders.BackboneElement[];
    language?: string;
    manufacturer?: builders.Reference;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    status?: string;
    text?: builders.Narrative;
    [key: string]: any;
};

declare type MedicationDispense_SzMedicationDispense_Props = {
    authorizingPrescription?: builders.Reference[];
    category?: builders.CodeableConcept;
    contained?: any[];
    context?: builders.Reference;
    daysSupply?: builders.Quantity;
    destination?: builders.Reference;
    detectedIssue?: builders.Reference[];
    dosageInstruction?: builders.Dosage[];
    eventHistory?: builders.Reference[];
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    location?: builders.Reference;
    medication?: builders.CodeableConcept;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.BackboneElement[];
    quantity?: builders.Quantity;
    receiver?: builders.Reference[];
    status?: string;
    statusReason?: builders.CodeableConcept | builders.Reference;
    subject?: builders.Reference;
    substitution?: builders.BackboneElement;
    supportingInformation?: builders.Reference[];
    text?: builders.Narrative;
    type?: builders.CodeableConcept;
    whenHandedOver?: string;
    whenPrepared?: string;
    [key: string]: any;
};

declare type MedicationRequest_SzMedicationRequest_Props = {
    authoredOn?: string;
    basedOn?: builders.Reference[];
    category?: builders.CodeableConcept[];
    contained?: any[];
    courseOfTherapyType?: builders.CodeableConcept;
    detectedIssue?: builders.Reference[];
    dispenseRequest?: builders.BackboneElement;
    doNotPerform?: boolean;
    dosageInstruction?: builders.Dosage[];
    encounter?: builders.Reference;
    eventHistory?: builders.Reference[];
    extension?: builders.Extension[];
    groupIdentifier?: builders.Identifier;
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: builders.Reference[];
    intent?: string;
    language?: string;
    medication?: "100001" | "100009" | "100014" | "100089" | "100221" | "100238" | "100304" | "100449" | "100460" | "100528" | "100648" | "100651" | "100654" | "100666" | "100686" | "100689" | "100700" | "100706" | "100707" | "100734" | "102263" | "102266" | "102268" | "102272" | "102273" | "102276" | "102277" | "102280" | "102282" | "102304" | "102323" | "102324" | "102327" | "102332" | "102333" | "102341" | "102346" | "102348" | "102443" | "102492" | "102502" | "Cyclophosphamide Tablets 25mg 100" | "Amoxycillin Capsules 500mg 500 CAPS" | "Cefaclor Tablets 375mg 10 TABS" | "Albendazole Tablets 200mg (Chewable) 1000 TABS" | "Cloxacillin Suspension 125mg/5ml 100 ML" | "Cold & Flu Syrup 100 ML" | "Adrenaline Injection 1:1000 10 AMPS" | "Acyclovir Eye Ointment 3% 4.5 G" | "Betamethasone Cream 0.1% 15G" | "Beclomethasone Nasal Spray 27.5mcg/dose (Paeds)Com 1" | "Abacavir 300mg Tablets 60 TABS" | "Atazanavir/Ritonavir 300/100mg Tablets 30" | "Efavirenz 200mg Scored Tablets 90" | "Raltegravir 400mg Tablets 60 TABS" | "Isoniazid 100mg Tablets 100 TABS" | "Saquinavir 200mg Capsules 270 CAPS" | "Flucytosine 500mg 100 TABS" | "Dapsone Tablets 100mg 100" | "Cotrimoxazole/Isoniazid/Pyridoxine 960/300/25mg 30 TABS" | "Bleomycin Injection 15 Units Vial (With Cold Chain 1 AMP" | "Clofazimine Tablets 100mg 100 TABS" | "Delamanid FILM COATED Tablets 50mg 48 TABS" | "Ethambutol FILM COATEDTablets 100mg 100 TABS" | "Ethionamide FILM COATED Capsules 250mg 50 CAPS" | "Isoniazid Tablets 300mg 28 TABS" | "Levofloxacin Tablets 500mg 100 TABS" | "Linezolid FILM COATED Tablets 600mg 60 TABS" | "Moxifloxacillin  FILM COATED Tablets 400mg 100 TABS" | "Pyrazinamide Tablets 500mg 1000 TABS" | "Amikacin 1g 50 VIALS" | "Levonorgestrel 30mcg Tablets 84 TABS" | "Norgestrel 300mcg/Ethinylestradiol 30mcg Tablets 28 TABS" | "Levonorgestrel +Ethinyl Estradiol 150mcg+30mcg Tab 3 TABS" | "Medroxyprogesterone Acetate 150mg/ml Injection 20 VIALS" | "Norethisterone Enanthate + Estradiol Valerate In O 100 VIALS" | "Intra-Uterine Device (Iucd) T380 ( Polymer Film Po 1" | "Strawberry Scented Male Condoms ( natural latex,53mm) 100" | "Water Based Lubricant (SRH) SATCHET" | "Cefazolin 1g; 10 Vial 10 VIAL" | "Paracetamol Tablets 500g (Coloured Green) 100 TABS" | "T Section; 1 Each 1 EACH";
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    performer?: builders.Reference;
    performerType?: builders.CodeableConcept;
    priorPrescription?: builders.Reference;
    priority?: string;
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    recorder?: builders.Reference;
    reported?: boolean | builders.Reference;
    requester?: builders.Reference;
    status?: string;
    statusReason?: builders.CodeableConcept;
    subject?: builders.Reference;
    substitution?: builders.BackboneElement;
    supportingInformation?: builders.Reference[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Observation_SzCauseOfDeath_Props = {
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept;
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    component?: builders.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: builders.CodeableConcept;
    derivedFrom?: builders.Reference[];
    device?: builders.Reference;
    effective?: string | builders.Period | builders.Timing;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focus?: builders.Reference[];
    hasMember?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    interpretation?: builders.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: builders.Meta;
    method?: builders.CodeableConcept;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.Reference[];
    referenceRange?: builders.BackboneElement[];
    specimen?: builders.Reference;
    status?: string;
    subject?: builders.Reference;
    text?: builders.Narrative;
    value?: builders.CodeableConcept;
    [key: string]: any;
};

declare type Observation_SzClinicalObservation_Props = {
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept;
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    component?: builders.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: builders.CodeableConcept;
    derivedFrom?: builders.Reference[];
    device?: builders.Reference;
    effective?: string | builders.Period | builders.Timing;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focus?: builders.Reference[];
    hasMember?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    interpretation?: builders.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: builders.Meta;
    method?: builders.CodeableConcept;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.Reference[];
    referenceRange?: builders.BackboneElement[];
    specimen?: builders.Reference;
    status?: string;
    subject?: builders.Reference;
    text?: builders.Narrative;
    value?: builders.Quantity | builders.CodeableConcept | string | boolean | number | builders.Range | builders.Ratio | builders.SampledData | builders.Period;
    [key: string]: any;
};

declare type Observation_SzLabResult_Props = {
    authorizer?: builders.Reference[];
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept;
    category?: builders.CodeableConcept[];
    code?: "NIT" | "UG" | "UP" | "UPH" | "UBILI" | "UKET" | "ULEST" | "N/A" | "#BAND" | "#BASO" | "#EOS" | "#IG" | "#LYM" | "#META" | "#MONO" | "#MYEL" | "#NEUT" | "#PROM" | "%BJP" | "%BSAT" | "%HBA1" | "%SAT" | "17AHQ" | "1ST" | "2ND" | "A1ATR" | "A1CEL" | "A2CEL" | "ABAC" | "ABNO" | "ABO" | "ABRH" | "ABRH1" | "ABRH2" | "ABRH3" | "ABRH4" | "ACA" | "ACAS" | "ACEA" | "ACEAB" | "ACLA" | "ACLAG" | "ACLAM" | "ACOLA" | "ACTH" | "ACTHI" | "ACTHO" | "ADATE" | "ADENO" | "ADNA" | "ADNAM" | "ADNAR" | "ADNAS" | "AFB" | "AFP" | "AGHT" | "AHE" | "AHEAL" | "AHG" | "AK" | "AK1" | "ALDOQ" | "ALDOS" | "AMC" | "AMIK" | "AMITA" | "AMITT" | "AMOX" | "AMOX1" | "AMP" | "AMPHE" | "AMPIC" | "ANAH" | "ANCN" | "ANCP" | "ANDRS" | "ANION" | "ANTAB" | "ANTIA" | "ANTIB" | "ANTID" | "APCA" | "APP" | "APPEA" | "APPET" | "APPF" | "APPS" | "APTC" | "APTT" | "ARTN" | "ARTTX" | "ARVID" | "ARVO" | "ARVO1" | "ARVO2" | "ARVO3" | "ARVS" | "ARVT1" | "ARVT2" | "ARVT3" | "ASKMA" | "ASL" | "ASMA" | "ASOT" | "ASPR" | "AST" | "AUG" | "AUG1" | "B2GPG" | "B2GPM" | "BACET" | "BACT" | "SALB" | "BAND#" | "BAND%" | "BARB" | "BARES" | "BASA#" | "BASA%" | "BASO#" | "BASO%" | "BAUTO" | "BBCOM" | "BBTXT" | "BCEL" | "BCULT" | "BE" | "BENZO" | "BENZV" | "BG" | "BHCG2" | "BIOCH" | "BIRON" | "BLST#" | "BLST%" | "BMTXT" | "BPH" | "BPROC" | "BREAS" | "BROMS" | "BS1" | "BS2" | "BSA" | "BSCR1" | "BSCR2" | "BSCR3" | "BTFN" | "BTIME" | "BTNP" | "BTYPE" | "BUA" | "BV" | "C125B" | "C15-3" | "C1EI" | "C1ESC" | "C1ESI" | "C3" | "C4" | "C6" | "CA199" | "CA724" | "CABCO" | "CABFL" | "CABVA" | "CACOR" | "CAERU" | "CALCL" | "CALCN" | "CALCO" | "CANN" | "CANNQ" | "CAPIL" | "CAPP" | "CARB" | "CAREH" | "CASTS" | "CATSC" | "CATSO" | "CBAC" | "CCL" | "CCLEA" | "CCNT" | "CCOM" | "CCON" | "CCOO" | "CCREM" | "CCULT" | "CD3" | "CD3L" | "CD4" | "CD45" | "CD4L" | "CD8" | "CD8L" | "CEFAZ" | "CEFO1" | "CEFOT" | "CEFOX" | "CEFTA" | "CEPHA" | "CEPHR" | "CERYT" | "CGLOB" | "CGLU" | "CHEMC" | "CHEMF" | "CHEMH" | "CHEMO" | "CHEMU" | "CHILD" | "CHIST" | "CHLDN" | "CHLET" | "CHLLV" | "CHLO1" | "CHLOG" | "CHLOR" | "CHLPN" | "CHLPS" | "CHLTR" | "CHM" | "CHR" | "CIPR1" | "CIPRO" | "CLAR" | "CLIND" | "CLOD" | "CLODA" | "CLTR" | "CLTRE" | "CLUE" | "CMGFL" | "CMGVA" | "CMMFL" | "CMMVA" | "COCAI" | "COL" | "COLI" | "COLM" | "COM" | "COMAL" | "COMCL" | "CONCE" | "CONSE" | "COOMB" | "CORWC" | "COTR" | "COTR1" | "COTRI" | "COUN" | "COXVI" | "CPEP2" | "CPROT" | "CRES" | "CRINK" | "CRO" | "CROSM" | "CRP" | "CRPS" | "CRPT" | "CRYLF" | "CRYP" | "CRYST" | "CRYTI" | "CSOB" | "CTIME" | "CTITR" | "CTX" | "CTXT" | "CUTC" | "CUTP" | "CUTS" | "CWBC" | "CWTX" | "CYADE" | "CYADH" | "CYBGH" | "CYBGR" | "CYCYT" | "CYINF" | "CYINH" | "CYINT" | "CYNAH" | "CYNAT" | "CYNFH" | "CYNTH" | "CYRCH" | "CYREC" | "CYSS" | "CYSTS" | "CYTC" | "CYTCH" | "CYTLA" | "CYTLM" | "CYTNA" | "CYTPA" | "CYTPR" | "CYTTY" | "CYTXT" | "DATEP" | "DATEQ" | "DATER" | "DATET" | "DCC3" | "DCC3C" | "DCC3T" | "DCEA" | "DCIGA" | "DCIGG" | "DCIGM" | "DCIGT" | "DCOOH" | "DCOOM" | "DCOT" | "DCRT" | "DDATE" | "DDIME" | "DEATH" | "DHEAS" | "DIAMT" | "DIBN" | "DID" | "DIDA" | "DIFCN" | "DIGO2" | "DIGOX" | "DOA" | "DONG" | "DONN" | "DOXY" | "DOXY1" | "DPROT" | "DRSNO" | "DRTH" | "DRUGI" | "DTIME" | "DUR" | "DUVMA" | "E2" | "E2C" | "EBREA" | "ECOTH" | "ECOTR" | "ECURR" | "EDNAP" | "EEC" | "EFAVI" | "EGFRI" | "EIDCM" | "EIDCN" | "EIDCP" | "EIFS" | "EIFY" | "EMTRI" | "ENVPB" | "ENVPS" | "ENZYM" | "EOS#" | "EOS%" | "EOSA#" | "EOSA%" | "EOTHE" | "EPI" | "EPRE" | "EPRED" | "EPRER" | "EPRES" | "EQAC1" | "EQAC2" | "EQAC3" | "EQAC4" | "EQAC5" | "EQAHS" | "EQAHU" | "EQAMT" | "EQAN2" | "EQAN3" | "EQANP" | "EQAR1" | "EQAR2" | "EQAR3" | "EQAR4" | "EQAR5" | "EQAS1" | "EQAS2" | "EQASC" | "EQCAB" | "EQCAC" | "EQCDI" | "EQCLM" | "EQCPC" | "EQHCT" | "EQHGB" | "EQHPC" | "EQHPE" | "EQHPK" | "EQHPM" | "EQHSD" | "EQHST" | "EQMCH" | "EQMCN" | "EQMCV" | "EQMF2" | "EQMF3" | "EQMFA" | "EQMIC" | "EQMPC" | "EQPF" | "EQPLT" | "EQPO" | "EQRBC" | "EQRDW" | "EQSED" | "EQSLN" | "EQSP1" | "EQSP2" | "EQSP3" | "EQSS1" | "EQSS2" | "EQSS3" | "EQSS4" | "EQSS5" | "EQSS6" | "EQST" | "EQSTM" | "EQWB2" | "EQWB3" | "EQWBC" | "EQWC2" | "EQWC3" | "EQWCC" | "EREGA" | "ERSLT" | "ERTP" | "ERY" | "ERY1" | "ERYT" | "ERYTH" | "ESR" | "ESTBR" | "ESTOB" | "ETRAV" | "EXHYS" | "EXPD" | "EXSTD" | "FCLI" | "FEP" | "FERM2" | "FERM3" | "FERR" | "FERRM" | "FERRR" | "FERRX" | "FERX2" | "FHYS" | "FILAG" | "FINR" | "FLN" | "FLQNS" | "FOB" | "FPORI" | "FPORQ" | "FPROT" | "FRF" | "FROTA" | "FSHC" | "F-T3" | "F-T4" | "FUNGI" | "FWBC" | "G6PD" | "G6PDS" | "GCLUE" | "GCPRD" | "GELNO" | "GENO" | "GENT" | "GENT1" | "GENTA" | "GERMT" | "GL120" | "GL150" | "GL180" | "GL210" | "GL240" | "GL270" | "GL30" | "GL300" | "GL360" | "GL480" | "GL60" | "GL90" | "GLOB" | "GLUCS" | "GNB" | "GNC" | "GNCB" | "GNDC" | "GNPB" | "GPB" | "GPBB" | "GPC" | "GPCC" | "GPCCL" | "GPCP" | "GPDC" | "GPFB" | "GRAMS" | "GREPI" | "GRERY" | "GRWC" | "GTBA" | "GTDOS" | "GTXT" | "GVC" | "GVINC" | "GXRIF" | "GXTB" | "GXTBR" | "H2RL" | "H2VRS" | "HAEM" | "HAEMI" | "HAUTO" | "HBA" | "HBA1" | "HBA1C" | "HBA2" | "HBA2D" | "HBF1" | "HBFD" | "HBH" | "HBSB1" | "HBU" | "HCBCO" | "HCBFL" | "HCBVA" | "HCG" | "HCGS" | "HCO3" | "HCOM" | "HCT" | "HEAL" | "HELPV" | "HELPY" | "HEPD" | "HEPE" | "HERG1" | "HERG2" | "HERPG" | "HERPM" | "HFLU" | "HGB" | "HGH" | "HISTD" | "HISTS" | "HISTT" | "HIV-1" | "HIVA" | "HIVAR" | "HIVBL" | "HIVBR" | "HIVCO" | "HIVD" | "HIVE" | "HIVL" | "HIVL2" | "HIVLA" | "HIVLC" | "HIVLL" | "HIVML" | "HIVP" | "HIVPC" | "HIVPL" | "HIVPR" | "HIVQL" | "HIVR" | "HIVRL" | "HIVRT" | "HIVSI" | "HIVTL" | "HIVTM" | "HIVU" | "HIVVA" | "HIVVB" | "HIVVC" | "HIVVD" | "HIVVM" | "HIVVP" | "HIVVQ" | "HIVVR" | "HLAXB" | "HLB27" | "HPRL" | "HSVG" | "HSVM" | "HT" | "HTSTB" | "HTXT" | "HVVRS" | "HYS0H" | "HYS6H" | "HYSIN" | "HYSUH" | "ICD10" | "ICOM" | "ICOOH" | "ICOOM" | "ICT" | "IG#" | "IGA" | "IHYS" | "IMFIX" | "IMI" | "IMMA" | "IMMSP" | "INCLU" | "INJCS" | "INK" | "INR" | "INTXT" | "IPROT" | "IS" | "ISI" | "ITIME" | "ITITR" | "ITXT" | "IV" | "JRF" | "LA1:2" | "LA1NP" | "LA2NP" | "LACTT" | "LAMIV" | "LCHOL" | "LCRYP" | "LEUCO" | "LHC" | "LI" | "LINE0" | "LINE1" | "LISS" | "LJDAT" | "LJDT" | "LJRES" | "LLA1" | "LLA2" | "LN1:2" | "LPRIF" | "LSD" | "LTIME" | "LUPN" | "LUPP" | "LYM#" | "LYM%" | "LYMA%" | "LYMP" | "MAAG" | "MACS" | "MAL" | "MALF" | "MALRT" | "MALTH" | "MAPP" | "MASS" | "MBILH" | "MCEA" | "MCH" | "MCHC" | "MCM2" | "MCOM" | "MCV" | "MEASG" | "MEASM" | "MEM" | "MET" | "META#" | "META%" | "METH" | "METHD" | "METQ" | "MFIL" | "MGMSA" | "MGMSB" | "MGMSC" | "MGMSD" | "MGMSE" | "MGMSF" | "MGSMH" | "MGSRH" | "MGSSA" | "MGSSB" | "MGSSC" | "MGSSD" | "MGSSE" | "MGSSF" | "MHEAD" | "MIC" | "MICH" | "MICIN" | "MICRE" | "MICRO" | "MLDL" | "MLEUD" | "MMACR" | "MOART" | "MON" | "MONA#" | "MONA%" | "MONO" | "MONO#" | "MONO%" | "MONTH" | "MORPH" | "MOTIL" | "MPCR" | "MPROT" | "MPV" | "M-TP" | "MTRIC" | "MTXT" | "MTZ" | "MUCUS" | "MUMPG" | "MUMPM" | "MUP" | "MXD#" | "MXD%" | "MYCH" | "MYCUL" | "MYEAS" | "MYEL#" | "MYEL%" | "MYGIE" | "MYGT" | "MYKIN" | "MYMIC" | "MYOG" | "MYPAS" | "MZNS" | "NALID" | "NEI" | "NEICO" | "NEUA#" | "NEUA%" | "NEUT#" | "NEUT%" | "NEVI" | "NITR" | "NITRO" | "NNRTI" | "NONNU" | "NORM" | "NOS" | "NRBC" | "NRTIR" | "NUCLE" | "OB" | "OCEA" | "OCEL" | "OOCYS" | "OPIAT" | "ORGS" | "ORGSV" | "ORGSW" | "ORGSX" | "ORGSY" | "OSAT" | "OTERM" | "OTHER" | "OTHR#" | "OTHR%" | "OVA" | "OVA1" | "OVA2" | "OWCC" | "OX19" | "OX2" | "OXAC1" | "OXACI" | "OXK" | "P/N" | "PADIS" | "PAN" | "PARAC" | "PARAS" | "PARS" | "PATH" | "PATHH" | "PATT" | "PB/CR" | "PBNP" | "PCO2" | "PCRAP" | "PCRH" | "PCRQ" | "PCRR" | "PCTR" | "PCULT" | "PCV" | "PDBIL" | "PDW" | "PEN" | "PENG" | "PENG1" | "PER" | "PFAL" | "PGRP" | "PH" | "PHB" | "PHD" | "PHENB" | "PHENC" | "PHENY" | "PHN" | "PHT" | "PHTXT" | "PHYS" | "PHYS0" | "PHYS6" | "PHYSU" | "PIPER" | "PLAC" | "PLT" | "PLTAB" | "PMTCH" | "PMTMO" | "PNEUM" | "PO/CR" | "PO2" | "POCVR" | "POLI1" | "POLI2" | "POLI3" | "POLY" | "POLYM" | "PORL" | "PREG" | "PRLC" | "PROGC" | "PROM#" | "PROM%" | "PROTC" | "PROTS" | "PRTCF" | "PSA" | "PSCHE" | "PSHY" | "PSTD0" | "PSTD6" | "PSTDU" | "PT" | "PTBIL" | "PTC" | "PTH" | "PTHA" | "PTHM" | "PTHP" | "PTTR" | "PVIV" | "QBAS%" | "QCD3" | "QCD3L" | "QCD4" | "QCD4L" | "QCD8" | "QCD8L" | "QCWBC" | "QEOS%" | "QHBG" | "QHCG" | "QHRG" | "QLYM%" | "QMCHC" | "QMON%" | "QNEU%" | "QPEHE" | "QRPR1" | "QRPRT" | "QRPRW" | "RAPI2" | "RATIO" | "RBC" | "RBCA" | "RCC" | "RCCHE" | "RCELU" | "RCOM" | "RDW" | "RECR" | "REJCT" | "REM" | "RENIC" | "REQTS" | "RESLT" | "RETA" | "RETIC" | "RETM" | "RF" | "RF13" | "RF14" | "RF2" | "RF3" | "RF4" | "RF8" | "RFQM" | "RFR" | "RFT" | "RG" | "RGLU" | "RH" | "RHAB" | "RHABC" | "RHABI" | "RHABT" | "RHNEG" | "RIFTB" | "RILPI" | "RINHS" | "RJREA" | "RJREM" | "ROTA" | "ROTAG" | "ROTRT" | "RPCR" | "RPI" | "RPR1" | "RPRT" | "RPRW" | "RRF1" | "RRF4" | "RTTBP" | "RUGFL" | "RUGT" | "RUMFL" | "RUMT" | "SABCO" | "SABFL" | "SABNI" | "SABVA" | "SACE" | "SACT2" | "SACTH" | "SADA" | "SAGCO" | "SAGFL" | "SAGVA" | "SALC" | "SALHT" | "SALP" | "SALT" | "SAMY" | "SAPP" | "SAST" | "SIBIL" | "SCHOL" | "SCK2" | "SCKMB" | "SCO2" | "SCORT" | "SCOUN" | "SCRN" | "SCRT" | "SDBIL" | "SERY" | "SGGT" | "SGLU" | "SHDL" | "SIRON" | "SK" | "SLDH" | "SLDL" | "SLGIE" | "SLPAP" | "SMG" | "SMOT2" | "SMOT3" | "SMOT6" | "SMOTI" | "SMYO" | "SNA" | "SNPP" | "SPEM" | "SPH" | "SPO4" | "SRATE" | "SSMEL" | "STACP" | "STBIL" | "STP" | "STRIG" | "SUREA" | "SVISC" | "SVITA" | "SVOL" | "SWBC" | "TBADT" | "TBAMI" | "TBAR1" | "TBAR2" | "TBARM" | "TBBAC" | "TBBCM" | "TBBDT" | "TBC1D" | "TBCLO" | "TBCN1" | "TBETM" | "TBINH" | "TBLEV" | "TBMOF" | "TBODT" | "TBORG" | "TBP-A" | "TBRCM" | "TBRIF" | "TBRP" | "TEST" | "TETRA" | "THSR" | "TMP" | "TPHA" | "TROP" | "TROPI" | "TRYP" | "TS" | "TSH" | "TWBCC" | "TXMFL" | "TZP" | "UAMY" | "UBACT" | "UBL" | "UCRT" | "UHB" | "UMA" | "UMAER" | "UPREG" | "USG" | "UUBGN" | "UVOL" | "VALPR" | "VANCO" | "VCULT" | "VDRLS" | "VDRLT" | "VEPI" | "VGLU" | "VITD" | "VOL" | "VZG" | "WBACT" | "WBC" | "WDU" | "WEPI" | "WERY" | "WET" | "WFH" | "WPSHY" | "WWBC" | "WYST" | "XGLUC" | "YEAST" | "ZIN" | "COV19" | "CVCOM" | "CA15-3" | "SCA" | "SCL" | "XMATC" | "!GXMT" | "SUA" | "SUAA" | "VCRT" | "DLM" | "LZD" | "BDQ" | "TBETH" | "TBISO" | "TBZCM" | "TBZDT" | "TBZH" | "TBZN" | "TBZNI" | "TBLIN" | "WBCA" | "SALTH" | "SALOT" | "LYMA#" | "CVRP" | "CT" | "NG" | "RCHOL" | "DSYTP" | "TBAU" | "TBCM" | "TBRI2" | "TBMOX" | "TBSF" | "TBLP" | "HIVPS" | "PSC2" | "PSCD" | "SCOM" | "Nitrate" | "Glucose" | "Protein" | "pH" | "Bilirubin" | "Ketones" | "Leucocyte Esterase" | "Urobilirubin" | "Band Cells" | "Basophils" | "Eosinophils" | "IG" | "Lymphocytes" | "Metamyelocytes" | "Monocytes" | "Myelocytes" | "Neutrophils" | "Promyelocytes" | "% Bence Jones Protein" | "Transferrin Saturation" | "% HBA1C" | "Transferrin Saturation" | "17 Alpha-hydroxyprogesterone" | "First Line" | "Second Line" | "S-ƒ -1-antitrypsin" | "A1 Cells" | "A2 Cells" | "Abacavir (ABC)" | "%Abnormal" | "Blood Group" | "or Group" | "Donor Unit 1" | "Donor Unit 2" | "Donor Unit 3" | "Donor Unit 4" | "i-Centromere Antibodies" | "Anti-Centromere Antibodies" | "Carcinoembryonic Antigen" | "Acetylcholine Receptor Ab`s" | "i-Cardiolipin Ab (IgG)" | "i-Cardiolipin Ab`s IgG" | "i-Cardiolipin Ab`s IgM" | "i-Collagen Antibodies" | "eno-corticotrophic Hormone" | "eno-corticotrophic Hormone" | "eno-corticotrophic Hormone" | "Autopsy Date" | "Fecal adenovirus" | "i-Double Stranded DNA" | "Anti-Double Stranded DNA (EIA)" | "dsDNA Rule" | "Anti-Double Stranded DNA" | "Zeihl-Neelsen" | "Alpa Feto Protein" | "Anti-human globulin testing" | "ormal Haemoglobin" | "ANC Health Facility" | "i-human globulin" | "Amikacin" | "Amikacin" | "Aldosterone" | "Aldosterone" | "Amoxilin/Clavulanic Acid" | "Amikacin" | "i-Mitochondrial Antibodies/A-Mit Ab" | "Titre" | "Amoxicillin" | "Amoxicillin" | "Ampicillin" | "hetamine" | "Ampicillin" | "i-Nuclear Ab (Hep-2)" | "ANC Number" | "From ANC (Pink) card" | "Androstenedione" | "Anion Gap" | "Anti AB" | "Anti A" | "Anti B" | "Rhesus D" | "i-Parietal Cell Antibodies" | "Appearance" | "Naked Eye Appearance" | "Naked eye appearance" | "Fluid" | "Supernatant Appearance" | "T (Control)" | "T (Patient)" | "ART Number" | "ART Number" | "ARV ID Number" | "Other ARV treatment" | "Other Drugs (1)" | "Other Drugs (2)" | "Other Drugs (3)" | "ARV Programme status" | "ARV treatment (1)" | "ARV treatment (2)" | "ARV treatment (3)" | "i-skeletal muscle Ab`s" | "i-Streptolysin O Latex" | "i-Smooth Muscle Antibodies" | "i-Streptolysin O Titre" | "ASPIRATOR" | "Antimicrobial Sensitivity Test" | "Co-amoxiclav" | "Augmentin" | "Beta-2 Glycoprotein IgG" | "Beta-2 Glycoprotein IgM" | "S-Acetaminophen" | "0rganisms Seen" | "Albumin" | "Band Cells" | "Band Cells" | "Barbiturate" | "Result" | "Basophils" | "Basophils" | "Basoophils" | "Basophils" | "Auto Control" | "Comment:" | "Remarks:" | "B Cells" | "TURE RESULT" | "Base Excess" | "Benzodiazepine" | "BZD Value" | "Blood Group" | "HCG TOTAL BETA (TUMOR MARKER)*" | "BIO-CHEMISTRY (Dipstick)" | "Iron" | "Blasts" | "Blasts" | "Remarks" | "pH" | "Product" | "Breastfeeding" | "Bromelin Screening" | "S1" | "S2" | "y Surface Area" | "Bromelin Screen Cell 1" | "Bromelin Screen Cell 2" | "Bromelin Screen Cell 3" | "Transferrin" | "Bleeding Time" | "B-Type Natriuretic Peptide" | "Bottle Type" | "Uric Acid" | "Interpretation" | "CA125" | "CA15-3" | "C1 Esterase Inhibitor" | "C1 Esterase Inhibitor" | "C1 Esterase Inhibitor" | "Complement Component C3" | "Complement Component C4" | "Complement Component C6" | "CA19-9" | "CA 72-4" | "Cut-off : Core antibodies" | "atitis B core ab (Total)" | "Value : Core antibodies" | "S-Calcium (Corrected)" | "Caeruloplasmin" | "Calculated Clearance" | "Calcitonin" | "cofluor Stain" | "U-Cannabinoids" | "U-Cannabinoids" | "ID Rapid Test" | "Specimen Appearance" | "S-Carbamazepine" | "Caregiver Details" | "Casts" | "U-Catecholamines" | "dU-Catecholamines" | "Control Bead Abs Cnt" | "CSF Chloride" | "Corrected Clearance" | "CELL COUNT" | "COMMENT" | "Conclusion" | "Coomb's control" | "Recommendation" | "CULTURE RESULT" | "CD3 Count" | "CD3%" | "CD4 Count" | "CD45 Count" | "CD4%" | "CD 8 Count" | "CD8%" | "Cefazolin" | "Cefotaxime" | "Cefotaxime/Ceftriazone" | "Cefoxitin" | "Ceftazidime" | "Cephalexin" | "Cephradine" | "Red Blood Cells" | "Globulin" | "CSF Glucose" | "Concentrations" | "CAL RESULTS" | "CSF CHEMISTRY" | "AL URINE OUTPUT" | "NE RESULTS" | "From Child Health Card" | "CLINICAL HISTORY" | "Child No" | "Endemic Trachoma" | "phogranuloma venereum" | "Chloramphenicol" | "Oculo genital" | "Chloramphenicol" | "Chlamydia pneumoniae" | "Chlamydia psittaci" | "Chlamydia trachomatis" | "CHm (Mature RBC HB Content)" | "CHr (Reticulocyte HB Content)" | "Ciprofloxacin" | "Ciprofloxacin" | "Clarity" | "Clindamycin" | "C. difficile Toxin A Test" | "C. difficile Toxin A" | "Pathogen Identified" | "Culture Results" | "CLUE CELLS" | "Cytomegalovirus IgG" | "Value : CMG IgG" | "Cytomegalovirus IgM" | "Value : CMG IgM" | "Cocaine" | "Colour" | "Colistin" | "TBCOL Other Months" | "Comment:" | "Alternate Pathway" | "Classical Pathway" | "Antibiotic Concentrations" | "Consent to Contact" | "Indirect Coomb's Test" | "Comment" | "Cotrimoxazole" | "Cotrimoxazole" | "Co-trimoxazole" | "Count" | "Coxsackie virus IgM" | "C-Peptide" | "CSF Protein" | "Remarks" | "INDIA INK" | "Ceftriaxone" | "Crossmatch" | "CRP Quantitative" | "CRP Serology" | "CRP Titre" | "Cryptococcal LFA" | "Cryptococcal Latex" | "Crystals" | "Cryptococcal Titre" | "Occult Blood" | "Whole blood Clotting Time" | "Titre" | "Cefotaxime" | "Remarks" | "Cutup by" | "Pathologist" | "Cutup sites" | "White Blood cells" | "Child Welfare Number" | "Specimen Adequacy" | "Specimen Adequacy" | "Background" | "Cytology Background" | "SCREENER" | "Cytology Infection" | "Interpretation" | "Interpretation" | "Nature of Specimen" | "Cellular Changes" | "Infection" | "Cellular Changes" | "Recommendation" | "Cytology Recommendation" | "Cytology Special Stains" | "Cysts" | "Contraception" | "CLINICAL HISTORY" | "Last Pregnancy" | "LMP" | "Nature Of Specimen" | "Parity" | "Clinical History" | "Type" | "Remarks" | "Date reported" | "Date Required" | "Date Claim" | "Date Taken" | "C3" | "C3c" | "C3d Titre" | "Carcinoembryonic Antigen" | "IgA" | "IgG" | "IgM" | "IgG Titre" | "Direct Coomb" | "Polyspecific" | "Direct Coomb's Test" | "1:20 DILUTED CRT" | "Expiry" | "D-Dimer" | "Date of Death" | "Dehydroepiandrosterone Sulph" | "Zone Diametre" | "Dibucaine Number" | "Donor ID" | "Didanosine (DDI)" | "DIFFERENTIAL COUNT" | "S-Digoxin" | "S-Digoxin" | "Date of Admission" | "Donor Group" | "Donor Number" | "Doxycycline" | "Doxycycline" | "F-Total Protein" | "DR Survey Number" | "DRUG RESISTANCE TESTING" | "Drug Resistance Interpretation" | "Time of Death" | "Duration of collection" | "dU-Vanillylmandelic Acid" | "Oestradiol" | "Oestrodial" | "Child Breastfed" | "Other" | "Cotrimoxazole(CTX)for infant" | "Current Regimen" | "DNA PCR Test" | "Enteropathogenic E.coli" | "Efavirenz (EFV)" | "MDRD eGFR" | "Caregiver Name" | "Caregiver NRC Number" | "Caregiver Phone Number" | "If stopped why?" | "IF yes which apply" | "Emtricitabine (FTC)" | "NVP for full 6w after birth" | "When did child stop NVP" | "Enzyme" | "Eosinophils" | "Eosinophils" | "Eosinophils" | "Eosinophils" | "Other" | "Epithelial Cells" | "Previous DNA PCR Barcode no" | "Date Previous PCR" | "Pregnancy Regimen" | "Previous PCR Result" | "EQA Unstained 1" | "EQA Unstained 2" | "EQA Unstained 3" | "EQA Unstained 4" | "EQA Unstained 5" | "Stained Slides" | "Unstained Slides" | "Method" | "No Parasites" | "No Parasites" | "No Parasites" | "EQA Result 1" | "EQA Result 2" | "EQA Result 3" | "EQA Result 4" | "EQA Result 5" | "EQA Stain" | "EQA Stain" | "Screener" | "Absolute Count Beads" | "Antibody Combination" | "Instrument" | "Lysing Method" | "Problem Code" | "Haematocrit" | "Haemoglobin" | "Problem Code" | "Processing equipment:" | "Processing Kit/Reagent:" | "Processing Microscope" | "Microscope service date:" | "Stain used:" | "EQMCH" | "Challenge Number" | "EQMCV" | "Final answer (Parasites Count)" | "Final answer (Parasites Count)" | "Final answer (Parasites Count)" | "Microscopy" | "Final Answer" | "Tested by" | "Platelet Count" | "Supervisor" | "Red Blood Cells" | "EQRDW" | "Expiration Date" | "Lot Number" | "Specimen 1" | "Specimen 2" | "Specimen 3" | "HIV PT 1" | "HIV PT 2" | "HIV PT 3" | "HIV PT 4" | "HIV PT 5" | "A-6" | "Person who Stained" | "Test Name" | "No of White Cells" | "No of White Cells" | "No of White Cells" | "No of White Cells" | "No of White Cells" | "White cell count" | "Regimen given after birth" | "Result" | "ERTAPENEM" | "Red Blood Cells" | "Erythromycin" | "Erythrocytes" | "Erythromycin" | "ESR" | "Child still breatfeeding" | "Stopped breastbeeding at" | "Etravirine (ETR)" | "External Standard - Hys Peak" | "Expiry Date" | "External Standard-Int Std Peak" | "Follow-up Clinic" | "CEFEPIME" | "Ferritin" | "Ferritin" | "Ferritin" | "Ferritin" | "Ferritin" | "Ferritin" | "Ferritin" | "Homocysteine Fasting" | "Microfilariae Antigen" | "Final Result" | "Fluoride Number" | "Flouroquinolones" | "Ocult Blood" | "Identification" | "F-Porphyrin" | "F-Total Protein" | "Rheumatoid Factor (Pleural Fl)" | "Rotavirus" | "Follicle Stimulating Hormone" | "S-Free Tri-iodothyronine" | "S-Free Thyroxine (Direct)" | "Fungi" | "White Blood cells" | "G6PD Assay" | "D Screen Test" | "GRAM STAIN :CLUE CELLS" | "Pregnandiol" | "Number" | "Genotyping" | "Gentamicin" | "Gentamycin" | "Gentamicin" | "Result" | "Glucose - 2 Hours" | "Glucose - 2.5 Hours" | "Glucose - 3 Hours" | "Glucose - 3.5 Hours" | "Glucose - 4 Hours" | "Glucose - 4.5 Hours" | "Glucose - 30 mins" | "Glucose - 5 Hours" | "Glucose - 6 hrs" | "Glucose - 8 hr" | "Glucose - 1 Hour" | "Glucose - 1.5 Hours" | "Globulin" | "Glucose (POCT)" | "Gram Negative Bacilli" | "Gram Negative Cocci" | "Gram Negative Coccobacilli" | "Gram Negative Dipplococci" | "GN Pleomorphic Bacilli" | "Gram Positive Bacilli" | "GP Branching Beaded Bacilli" | "Gram Positive Cocci" | "Gram Positive Cocci Chains" | "Gram Positive Cocci Clusters" | "Gram Positive Cocci Pairs" | "Gram Positive Diplococci" | "GP Filamentous Bacilli" | "GRAM STAIN" | "Epithelial Cells" | "Erythrocytes" | "White Blood cells" | "Glucose - Basal" | "Glucose Dose" | "Text" | "Gram Variable Coccobacilli" | "Vincent's Orgnisms" | "Rifampicin" | "PCR result" | "PCR result (raw data)" | "log value" | "HIV: Viral Load (Cap/CTM)" | "Specimen Haemolysed" | "Haemolysis index" | "Please note:" | "Haemoglobin A" | "Average Glucose (calculated)" | "Hb A1c (Glycosylated)" | "Haemoglobin A2" | "Haemoglobin A2" | "Haemoglobin F" | "Haemoglobin F" | "Haemoglobin" | "Hep B surface Antibody Titre" | "Unstable Haemoglobin" | "Cut off : Hepatitis C" | "Hepatitis C Antibodies" | "Value : Hepatitis C" | "Beta HCG" | "Serum ß-HCG Pregnancy Screen" | "Bicarbonate (actual)" | "Comment" | "Haematocrit" | "Health Facility" | "OD Value" | "Helicobacter pylori IgG" | "Hepatitis D Antibodies" | "Hepatitis E Antibodies" | "Herpes simplex Type 1 IgM" | "Herpes simplex Type 2 IgG" | "Herpes simplex virus IgG" | "Herpes simplex virus IgM" | "Haemophilus influenzae" | "Haemoglobin" | "Human Growth Hormone" | "Pathologist" | "Special Stain" | "Specimen" | "HIV-1" | "HIV ASANTE" | "HIV: Viral Load (ART)" | "log value" | "HIV: Viral Load (BIO/CEN)" | "CUT-OFF : HIV" | "HIV Determine" | "HIV Antibodies: ELISA Method" | "HIV: Viral load (LCx)" | "HIV: Viral load (LCx)" | "Log Value" | "HIV: Viral Load (LCx)" | "Log Value" | "Log Value" | "HIV Rapid" | "Infant HIV DNA PCR" | "Log Value" | "HIV: Viral Load (PANTHER)" | "Log Value" | "HIV 1/2 Rapid Screening Test" | "log value" | "HIV-1 resistance" | "Sequence ID" | "Log Value" | "HIV: Viral Load (Taqman)" | "HIV Unigold" | "HIV VALUE" | "HIV: Viral Load" | "HIV : Viral load (low value)" | "HIV: Viral Load" | "HIV : VIRAL LOAD" | "HIV: Viral Load (Ampliprep)" | "HIV : Viral Load (NASBA)" | "HIV: Viral Load (CAP/CTM)" | "Crossmatching B-Cells" | "HLA B27" | "log value" | "HERPES SIMPLEX VIRUS IgG" | "Herpes simplex Virus IgM" | "Patient`s Height" | "Heat Stability Test" | "Haematology Text" | "HIV: Viral Load (CAP/CTM)" | "Homocysteine Fasting" | "Homocysteine 6H Postmethionine" | "Homocysteine Increase" | "Homocysteine Unknown Time" | "ICD10" | "Comment" | "Indirect Coomb" | "Abnormal Antibodies" | "Indirect coomb's test" | "IG" | "Total IgA" | "Homocysteine Increase" | "Immunofixation" | "Imipenem" | "%Immature" | "Immediate Spin" | "Inclusions" | "Injectibles" | "India Ink" | "Int Normalised Ratio (INR)" | "Remarks" | "F-Total Protein" | "Immediate spin" | "ISI" | "Incubation Time" | "Titre" | "Remarks" | "Index Value" | "Rheumatoid Factor- Joint Fluid" | "LA-1:LA-2" | "LA-1 with normal plasma" | "LA-2 with normal plasma" | "Lactate" | "Lamivudine (3TC)" | "Cholesterol" | "LFA Cryptococcal Antigen" | "White Blood Cells" | "Luteinising Hormone (L)" | "Lithium" | "LINE0" | "LINE1" | "LISS-IAT" | "Date" | "LJ Date" | "LJ Result" | "Lupus anticoagulant 1" | "Lupus anticoagulant 2" | "LA-1 NP:LA-2 NP" | "Rifampicin" | "Lysergic Acid Diethylamide" | "Liquefaction time" | "Lupus anticoagulant" | "Lupus anticoagulant (KCT)" | "Lymphocytes" | "Lymphocytes" | "Lymphocytes" | "Lymphocytes" | "Malaria Antigen" | "Macroscopic supernatant" | "Malaria" | "Plasmodium Antigen" | "Malaria: PCR Results" | "Malaria(Thin film prep.)" | "Macroscopic Apprearance" | "Patient`s Mass" | "istosoma haematobium" | "Carcinoembryonic Antigen" | "MCH" | "MCHC" | "Comment" | "Comment" | "MCV" | "Measles IgG" | "Measles IgM" | "MEROPENEM" | "Methicillin" | "Metamyelocytes" | "Metamyelocyte" | "Methicillin" | "Methadone" | "Methaqualone (Mandrax)" | "Microfilariae" | "Slide A" | "Slide B" | "Slide C" | "Slide D" | "Slide E" | "Slide F" | "Microscopic Morphology" | "Microscopic Gram Stain Reactio" | "Slide A" | "Slide B" | "Slide C" | "Slide D" | "Slide E" | "Slide F" | "Morphology and Comment" | "Microscope #" | "Microbiology:" | "Microscopic Examination" | "MICROSCOPIC EXAMINATION" | "Microscope Used" | "LDL Cholesterol" | "Leucocytes" | "MACROSCOPIC" | "Months since starting ARV" | "Monoclonal Band" | "Monocytes" | "Monocytes" | "Epstein Barr Heterophile Ab's" | "Monocytes" | "Monocytes" | "Stopped at month" | "Morphology" | "Motility" | "Malaria: PCR" | "U-Protein" | "Mean Platelet Volume" | "Micro Total Protein" | "TRICHOMONAS VAGINALIS" | "Remarks" | "Metranidazole" | "Mucus Threads" | "Mumps IgG" | "Mumps IgM" | "MUPIROCIN" | "Mixed Cells" | "Mixed Cells" | "Culture" | "Result" | "Yeast Cells" | "Myelocytes" | "Myelocytes" | "Giemsa Stain" | "Germ Tube" | "Kinyoun Stain" | "MICROSCOPIC EXAMINATION" | "MYOGLOBIN" | "PAS Stain" | "MODIFIED ZIELH-NEELSEN STAIN" | "Nalidixic Acid" | "N meningitides A,C,Y,W135" | "N meningitides B/E coli:" | "Neutrophils" | "Neutrophils" | "Neutrophils" | "Neutrophils" | "Nevirapine (NVP)" | "Nitrofurantoin" | "Nitrofurantoin" | "NNRTI Resistance Mutations" | "Non-Nucleoside RTI" | "%Normal" | "Organisms Seen" | "Nucleated Red Cells" | "NRTI Resistance Mutations" | "Nucleoside RTI" | "Stool Occult Blood Test" | "Carcinoembryonic Antigen" | "O Cells" | "Oocysts" | "Opiates" | "Organism Identification" | "Organism" | "Organism" | "Organism" | "Organism" | "Saturation" | "Other Mutations" | "Other" | "Other" | "Other" | "Ova" | "Ova /Cysts" | "Ova/Cysts" | "White Cell Count (Uncorrected)" | "Proteus OX19 antibody" | "Proteus  OX2 antibody" | "Oxacillin" | "Oxacillin" | "Proteus OXK antibody" | "Pos/Neg" | "PRESUMPTIVE TB#/TB REGISTER#" | "PAN Antigen" | "Paracetamol" | "Parasites" | "Parasitemia Count" | "Pathologist" | "Pathologist(s):" | "Type of Pattern" | "Porphobilinogen/Creatinine" | "proBNP" | "pCO2" | "Factor V Leiden Mutation" | "DNA PCR Test Information" | "Quantitative" | "PCR Result" | "Procalcitonin - Rapid Test" | "CULTURE RESULT" | "PCV" | "Conjuagted Bilirubin (Paeds)" | "Platelet Distribution Width" | "Penicillin G" | "Penicillin G" | "Penicillin G" | "Creat. Clearance Period" | "Plasmodium Falciparum Ag" | "Patient Group" | "Ph" | "Phoned by" | "Date Phoned" | "Phenobarbitone" | "Phencyclidine" | "Phenytoin" | "Phoned to" | "Time phoned" | "Message" | "Homocysteine 6H Postmethionine" | "Patient  - Hys Peak 0 hr" | "Patient - Hys Peak 6 hr" | "Patient - Hys Peak Unknown" | "Piperacillin" | "p-Lactic Acid" | "Platelet Count" | "Platelet Antibodies" | "PMTCT Infant" | "PMTCT Mother" | "Streptococcus pneumoniae" | "Porphyrin/Creatinine" | "pO2" | "HIV: Viral Load (GENEX)" | "Poliovirus Type 1 Abs" | "Poliovirus Type 2 Abs" | "Poliovirus Type 3 Abs" | "Polymorphonuclear cells" | "Polymyxin B" | "log value" | "Pregnancy Test" | "Prolactin (PRL)" | "Progesterone" | "Promyelocytes" | "Promyelocytes" | "Protein C (Chromogenic)" | "Protein S (Functional)" | "Protein C" | "Prostate Specific Antigen" | "Pseudocholinesterase" | "Pseudohyphae" | "Patient - Int Std Peak 0 hr" | "Patient - Int Std Peak 6 hr" | "Patient-Int Std Peak Unknown" | "Prothrombin Time (Patient)" | "Total Bilirubin (Paediatric)" | "Prothrombin Time (Control)" | "Parathyroid Hormone" | "Parathyroid Hormone" | "Parathyroid Hormone (mass)" | "p-Parathyroid Hormone" | "PTT Ratio" | "Plasmodium Vivax Ag" | "Basophils" | "CD3 Count" | "CD3%" | "CD4 Count" | "CD4%" | "CD8 Count" | "CD8%" | "Leucocyte Count" | "Eosinophils" | "ABO Blood group" | "Quantitative á-HCG" | "Rhesus status" | "Lymphocytes" | "EQMCHC" | "Monocytes" | "Neutrophils" | "CTROPHORETIC PATTERN" | "RPR" | "RPR titre" | "RPR Titre Wells" | "HIV 1/2 Rapid Repeat" | "RATIOS" | "Erythrocyte Count" | "RBC" | "Erythrocyte Count" | "Red Cell Cholinesterase" | "Red Cell Eluate" | "Red Cell Morphology" | "RDW" | "Recepient Result" | "Specimen Rejected" | "Remarks" | "Renin" | "Test/s requested" | "Mgit Reading (for Controls)" | "Absolute Reticulocyte Count" | "Reticulocyte Count" | "Maturation Time" | "Rheumatoid Factor(Screen)" | "IgE to Peanuts" | "IgE to Soya Bean" | "IgE to Cow`s Milk" | "IgE to Fish (Cod)" | "Rheumatoid Factor Titre" | "to Maize" | "Rheumatoid Factor" | "RF Rule" | "Rheumatoid Factor Titre" | "Rhesus Type" | "Glucose Random" | "Rhesus (D)" | "Atypical Antibodies" | "Anribody Identification" | "Antibody Identification" | "Antibody Titre" | "Negative" | "Rifampicin" | "Rilpivirine (RPV)" | "Inhalant Screen Test" | "Reject Reason" | "Remarks" | "Rotavirus Antigen" | "Rotavirus Antigen" | "Rotavirus PCR Results" | "Rotavirus: PCR" | "Reticulocyte Production Index" | "RPR" | "RPR Titre" | "RPR Titre Wells" | "IgE to Egg White" | "IgE to Wheat" | "Real-time PCR for M tubercul" | "Rubella IgG" | "Rubella IgG Titre" | "Rubella IgM" | "Rubella IgM Titre" | "Cut off : Surface antibody" | "Hepatitis B surface Antibodies" | "Abnormal forms include:" | "Value : Surface antibody" | "Angiotensin Converting Enzyme" | "Adreno-corticotrophic Hormone" | "Adreno-corticotrophic Hormone" | "Adenosine Deaminase" | "Cut off : Surface antigen" | "Hepatitis B Surface Antigen" | "Value : Surface antigen" | "S-Salicylate" | "Salmonella typhi H titre" | "Alkaline Phosphatase (ALP)" | "Alanine Transaminase (ALT)" | "Serum Amylase" | "Appearance (fresh semen)" | "Aspartate Transaminase (AST)" | "Bilirubin (indirect)" | "S-Cholesterol" | "Creatine Kinase (CK)" | "CKMB" | "Carbon dioxide" | "Cortisol" | "Count" | "ABO Screening" | "S-Creatinine" | "Bilirubin (direct)" | "Red Blood Cells" | "g-Glutamyl Transferase (GGT)" | "Glucose" | "S-HDL Cholesterol" | "Iron" | "Potassium" | "Lactate Dehydrogenase (LD)" | "S-LDL Cholesterol" | "Slides GIEMSA Stain" | "Slides PAP Stain" | "S-Magnesium" | "%Progressive motility 2nd hour" | "%Progressive motility 3rd hour" | "%Progressive motility 6th hour" | "Motility Studies" | "S-Myoglobin" | "Sodium" | "S-Acid Phos. Non-Prostatic" | "Spermatozoa" | "Reaction (pH)" | "S-Phosphate Inorganic" | "Rate of forward progression" | "Smell" | "S-Acid Phosphatase (Total)" | "Bilirubin (Total)" | "S-Total Protein" | "S-Triglycerides" | "Blood urea nitrogen" | "Viscosity after liquefaction" | "Vitality after 2 hours" | "Volume of collection" | "White Blood cells" | "Tuberculosis investigation" | "Amikacin (1ug/ml)" | "Result" | "Grading" | "Remarks" | "Mgit Reading" | "Bactec Comment" | "Instrument Date" | "Reprocessed Date" | "Clofazimine (1ug/ml)" | "Reprocessed" | "Ethambutol" | "Isoniazid" | "Levofloxacin (1ug/ml)" | "Moxifloxacin (0.25ug/ml)" | "Date" | "Org Isolated" | "P-Aminosalicylic Acid (4ug/ml)" | "TB Rapid Comment" | "Rifampicin" | "TB Rapid ID" | "Testosterone" | "Tetracycline" | "T H/S Ratio" | "Trimethoprim" | "TPHA" | "Troponin T" | "S-TROPONIN I" | "Trypanosomes" | "Co-trimoxazole" | "S-TSH" | "Total White Blood Cell Count" | "Toxoplasma IgM" | "Piperacillin/Tazobactam" | "Amylase" | "Bacteria" | "Blood" | "U-Creatinine" | "Haemoglobin" | "U-Microalbumin" | "Microalbumin excretion rate" | "Pregnancy Test" | "Specific Gravity" | "Urobilinogen" | "U-Volume" | "S-Valproate" | "Vancomycin" | "CULTURE RESULT" | "VDRL Screen" | "VDRL Titre" | "Epithelial Cells" | "F-Glucose" | "1.25 Dihydroxy Vitamin D" | "Volume of collection" | "Varicella-Zoster IgG" | "0rganisms Seen" | "Leucocyte Count" | "Weak D" | "EPITHELIAL CELLS" | "RED BLOOD CELLS" | "WET PREPARATION" | "FUNGAL HYPHAE" | "PSEUDOHYPHAE" | "WHITE BLOOD CELLS" | "YEAST CELLS" | "P-Glucose (Fasting)" | "Yeast Cells" | "Zinate" | "SARS-CoV-2" | "SARS-CoV-2" | "CA153" | "S-Calcium total" | "Chloride" | "Cross Match Result" | "GeneXpert MTB Rule" | "Uric acid" | "Uric acid" | "Creatinine" | "Delamanid" | "Linezolid" | "Bedaquiline" | "Ethionamide" | "Isoniazid" | "ZN Comment" | "Zn Date" | "ZEIHL-NEELSEN STAIN" | "Ziehl-Neelsen Stain" | "TBZN Internal" | "Linezolid" | "WBC" | "Salmonella typhi H antibodies" | "Salmonella typhi O titre" | "Lymphocytes" | "COVID-19 Ag Rapid Test" | "Chlamydia Trachomatis" | "Neisseria Gonorrhoeae" | "RCHOL-Result" | "Determinate Syphilis TP" | "Auramine Result" | "Auramine Comment" | "Rifampicin (0.5ug/ml)" | "Moxifloxacin (1ug/ml)" | "TB First Line Comment" | "TB Line Probe Comment" | "HIV Viral Load (PSC)" | "Log Value" | "HIV Viral Load" | "Comment";
    component?: builders.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: builders.CodeableConcept;
    derivedFrom?: builders.Reference[];
    device?: builders.Reference;
    effective?: string | builders.Period | builders.Timing;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focus?: builders.Reference[];
    hasMember?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    interpretation?: builders.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: builders.Meta;
    method?: builders.CodeableConcept;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.Reference[];
    referenceRange?: builders.BackboneElement[];
    specimen?: builders.Reference;
    status?: string;
    subject?: builders.Reference;
    testingLaboratory?: builders.Reference[];
    text?: builders.Narrative;
    value?: builders.Quantity | builders.CodeableConcept | string | boolean | number | builders.Range | builders.Ratio | builders.SampledData | builders.Period;
    [key: string]: any;
};

declare type Observation_SzMannerOfDeath_Props = {
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept;
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    component?: builders.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: builders.CodeableConcept;
    derivedFrom?: builders.Reference[];
    device?: builders.Reference;
    effective?: string | builders.Period | builders.Timing;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focus?: builders.Reference[];
    hasMember?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    interpretation?: builders.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: builders.Meta;
    method?: builders.CodeableConcept;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.Reference[];
    referenceRange?: builders.BackboneElement[];
    specimen?: builders.Reference;
    status?: string;
    subject?: builders.Reference;
    text?: builders.Narrative;
    value?: string;
    [key: string]: any;
};

declare type Observation_SzVitalSigns_Props = {
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept;
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    component?: builders.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: builders.CodeableConcept;
    derivedFrom?: builders.Reference[];
    device?: builders.Reference;
    effective?: string | builders.Period;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focus?: builders.Reference[];
    hasMember?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    interpretation?: builders.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: builders.Meta;
    method?: builders.CodeableConcept;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    partOf?: builders.Reference[];
    performer?: builders.Reference[];
    referenceRange?: builders.BackboneElement[];
    specimen?: builders.Reference;
    status?: string;
    subject?: builders.Reference;
    text?: builders.Narrative;
    value?: builders.Quantity;
    [key: string]: any;
};

declare type Organization_SzOrganization_Props = {
    active?: boolean;
    address?: builders.Address[];
    alias?: string[];
    contact?: builders.BackboneElement[];
    contained?: any[];
    endpoint?: builders.Reference[];
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    name?: string;
    partOf?: builders.Reference;
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    type?: builders.CodeableConcept[];
    [key: string]: any;
};

declare type Patient_SzPatient_Props = {
    active?: boolean;
    address?: builders.Address[];
    birthDate?: string;
    chiefdom?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50" | "51" | "52" | "53" | "54" | "55" | "56" | "57" | "58" | "59" | "60" | "61" | "62" | "63" | "64" | "65" | "66" | "67" | "68" | "69" | "70" | "71" | "72" | "73" | "74" | "75" | "76" | "77" | "78" | "79" | "80" | "81" | "82" | "83" | "84" | "85" | "86" | "87" | "88" | "89" | "90" | "91" | "92" | "93" | "94" | "95" | "96" | "97" | "98" | "99" | "100" | "101" | "102" | "103" | "104" | "105" | "106" | "107" | "108" | "109" | "110" | "111" | "112" | "113" | "114" | "115" | "116" | "117" | "118" | "119" | "120" | "121" | "122" | "123" | "124" | "125" | "126" | "127" | "128" | "129" | "130" | "131" | "132" | "133" | "134" | "135" | "136" | "137" | "138" | "139" | "140" | "141" | "142" | "143" | "144" | "145" | "146" | "147" | "148" | "149" | "150" | "151" | "152" | "153" | "154" | "155" | "156" | "157" | "158" | "159" | "160" | "161" | "162" | "163" | "164" | "165" | "166" | "167" | "168" | "169" | "170" | "171" | "172" | "173" | "174" | "175" | "176" | "177" | "178" | "179" | "180" | "181" | "182" | "183" | "184" | "185" | "186" | "187" | "188" | "189" | "190" | "191" | "192" | "193" | "194" | "195" | "196" | "197" | "198" | "199" | "200" | "201" | "202" | "203" | "204" | "205" | "206" | "207" | "208" | "209" | "210" | "211" | "212" | "213" | "214" | "215" | "216" | "217" | "218" | "219" | "220" | "221" | "222" | "223" | "224" | "225" | "226" | "227" | "228" | "229" | "230" | "231" | "232" | "233" | "234" | "235" | "236" | "237" | "238" | "239" | "240" | "241" | "242" | "243" | "244" | "245" | "246" | "247" | "248" | "249" | "250" | "251" | "252" | "253" | "254" | "255" | "256" | "257" | "258" | "259" | "260" | "261" | "262" | "263" | "264" | "265" | "266" | "267" | "268" | "269" | "270" | "271" | "272" | "273" | "274" | "275" | "276" | "277" | "278" | "279" | "280" | "281" | "282" | "283" | "284" | "285" | "286" | "287" | "288" | "289" | "290" | "291" | "292" | "293" | "294" | "295" | "296" | "297" | "298" | "299" | "300" | "301" | "302" | "303" | "304" | "305" | "306" | "307" | "308" | "309" | "310" | "311" | "312" | "313" | "314" | "315" | "316" | "317" | "318" | "319" | "320" | "321" | "322" | "323" | "324" | "325" | "326" | "327" | "328" | "329" | "330" | "331" | "332" | "333" | "334" | "335" | "336" | "337" | "338" | "340" | "-99" | "Lamgabhi " | "Dlangeni" | "Kasiko" | "Sitseni" | "Zulwini" | "ELangeni" | "Lobamba " | "Nkhanini" | "Zabeni" | "Zandondo" | "Gucuka " | "Tfuntini/Buhlebuyeza    " | "Dvokolwako / Ekuphakameni" | "Ekukhulumeni/ Mandlangempisi" | "Nyonyane/ Maguga" | "Mavula" | "Maphalaleni" | "Dlozini" | "Mcengeni" | "Madlolo" | "Nsingweni" | "Mfeni" | "Mkhuzweni" | "Mfasini" | "Mkhweni" | "Mavula" | "Herefords" | "Msunduza" | "Fontein" | "Sidwashini" | "Mdzimba/Lofokati" | "Manzana" | "Nkwalini " | "Mangwaneni " | "Mangweni" | "Ndvwabangeni" | "Nhlanguyavuka" | "Zinyane " | "Emalibeni   " | "Sidvwashini" | "Nyakatfo" | "Mphofu" | "Mgungundlovu" | "Nkamanzi" | "Ludlawini " | "Mvuma" | "Bulandzeni" | "Ndzingeni" | "Kwaliweni" | "Meleti" | "Ntsanjeni" | "Ejubukweni" | "Malanti" | "Nkhaba" | "Kuvinjelweni" | "Vusweni" | "Mshingishingini" | "ka-Hhohho" | "Lomshiyo" | "Emvembili" | "Kandwandwa" | "Hhelehhele" | "Bulembu (Luhhumaneni 1)" | "Luhhumaneni/kaNdeva" | "Luhlangotsini" | "Piggs Peak" | "Nginamadvolo" | "Nsangwini" | "Siphocosini" | "Sigangeni" | "Luhlendlweni" | "Mantabeni" | "Mashobeni North" | "Mvembili" | "Ludzibini" | "Hhohho" | "Hlane" | "Malindza" | "Mdumezulu" | "Njabulweni" | "Ntandweni (Malindza)" | "Etjedze" | "Sigcaweni West" | "Macetjeni (Mabondvweni)" | "Hlutse" | "Macetjeni" | "Vikizijula" | "Bulunga" | "Lomahasha" | "Shewula" | "kaVuma" | "Canter berry" | "Mabantaneni" | "Ntuthwakazi" | "kaLanga" | "Makhewu" | "Mlindazwe" | "Sitsatsaweni" | "Lukhetseni" | "Mambane" | "Maphungwane" | "Tikhuba" | "Mafucula" | "Mhlume" | "Simunye" | "Tambankulu" | "Tshaneni" | "Vuvulane" | "Tsambokhulu" | "kaShoba" | "Mpolonjeni" | "Ndzangu" | "Ngcina" | "Sigcaweni East" | "Crooks Plantations" | "Gamula" | "Lunkuntfu" | "Nkhanini/Lusabeni" | "Illovo/Mayaluka" | "Phafeni" | "Madlenya" | "Maphilingo" | "kaMkhweli" | "Mphumakudze" | "Nceka" | "Ngevini" | "Tambuti" | "Luhlanyeni" | "Mamisa" | "Nkonjwa" | "Nokwane" | "Nyakeni" | "Nkiliji" | "Bhekinkhosi" | "Nswaceni" | "Mkhulamini" | "Maliyaduma" | "Mbeka" | "Kwaluseni" | "Logoba" | "Mhlane" | "Lamgabhi" | "Dvudvusini" | "Luhleko" | "Emhlangeni" | "Nhlulweni" | "Kufinyeni" | "Luyengo" | "Mahlanya" | "Ngwenyameni" | "Mbekelweni" | "Zombodze" | "Lozitha" | "Nkamanzi" | "Kudzeni" | "Ngculwini" | "Ka-Nkhambule" | "Mafutseni" | "Luhlokohla" | "Timbutini" | "Bhudla" | "Mgomfelweni" | "Luzelweni" | "Mambatfweni" | "Nsangwini" | "Mpolonjeni" | "Ludvondvolweni" | "KaZulu" | "Nciniselweni" | "Ndzeleni" | "Sigcineni " | "Bhahwini" | "Mangcongco/Zenukeni" | "Sandlane/Ekuthuleni" | "Mabhukwini" | "Dwalile" | "Makholweni" | "St Pauls" | "Mnyenyweni" | "Manzini Central" | "Dwaleni" | "Mzimnene" | "Mhobodleni" | "Mjingo " | "Moneni" | "Ticancweni" | "Zakhele" | "Ngwane Park" | "Zondwako" | "Lundzi" | "Dingizwe" | "Mlindazwe" | "Mbangave" | "Bhunya" | "Dvokolwako" | "Mbelebeleni" | "Kutsimuleni" | "Khuphuka" | "Likima" | "Gundvwini" | "Gundvwini/Lesibovu" | "Lwandle" | "Ndlandlameni" | "Hlane/Bulunga" | "Dladleni" | "Ngcoseni" | "Bhadzeni 1" | "Velezizweni" | "Macudvulwini" | "Ngonini" | "Njelu" | "Mphankhomo" | "Masundvwini" | "Sibuyeni" | "Vusweni" | "Sigombeni" | "Ntunja" | "Eni" | "Ngcayini" | "Sankolweni" | "Nsenga" | "Nsingweni" | "Ntondozi" | "Ncabaneni" | "Khalangilile" | "Mphini" | "Ndinda" | "Ndlinilembi" | "Gebeni" | "Mgazini" | "Bhadzeni 2" | "Mahhashini" | "Lushikishini" | "Khabonina" | "Dilini" | "KaDinga" | "kaTsambekwako" | "Mashobeni" | "Mhlahlweni " | "Mlindazwe" | "Nshamanti" | "Nsukazi " | "Sidwala" | "Sisingeni" | "Siyendle" | "Bufaneni" | "Hhohho Emuva" | "kaLiba" | "Lushini" | "Manyiseni" | "Nsingizini" | "Ondiyaneni" | "Ezishineni/ Manyeveni" | "Kaphunga" | "KaNdlovu" | "Ngobelweni" | "Nhlalabantfu" | "KaKholwane" | "kaMbhoke" | "kaGwebu" | "Gasa" | "Khamsile" | "Lomfa" | "Mbabane" | "Mbangweni" | "Nkalaneni" | "Nzameya" | "Nkomonye" | "KaDlovunga " | "KaMzizi" | "Masibini" | "Mbilaneni" | "Simemeni " | "Vusweni" | "Bambitje" | "Dinabanye" | "Kwaluseni" | "Nkonka" | "Nsalitje" | "Qomintaba" | "Benezer" | "Bhanganoma" | "Kwendzeni" | "Magele" | "Zenzile" | "KaMbiko" | "KaMhawu" | "KaMshengu" | "Lusitini" | "Mphini" | "Ndushulweni" | "Nokwane" | "Phobane" | "Buseleni" | "Hlobane" | "Kuphumuleni" | "Nkwene" | "kaGwegwe" | "Ezibondeni/Kashiba" | "Nhletjeni" | "Nkhungwini" | "Ngololweni" | "Dumenkhungwini" | "Eposini" | "Hhuhhuma" | "Mabonabulawe" | "Manyandzeni " | "Mchinsweni " | "Zikhotheni " | "Mahlalini" | "Mbabala" | "Mbeka" | "Makhwelela" | "Mpangisweni" | "Mbangweni" | "Mathendele" | "Mkhitsini" | "Sikhotseni" | "Lulakeni" | "Kuphumleni " | "Ndunayithini" | "Nyatsini" | "Ezindwendweni" | "Luhlekweni" | "Maplotini" | "Ntuthwakazi" | "Nsubane" | "Phangweni" | "Vimbizibuko" | "Bulekeni" | "Mampondweni" | "Ngwenyameni " | "Zombodze " | "Nduma" | "Kupheleni" | "Mpolonjeni" | "Nhlalabantfu" | "Mhlangatane" | "Mhawini" | "Unspecified";
    communication?: builders.BackboneElement[];
    contact?: builders.BackboneElement[];
    contained?: any[];
    deceased?: boolean | string;
    extension?: builders.Extension[];
    gender?: string;
    generalPractitioner?: builders.Reference[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    inkhundla?: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50" | "51" | "52" | "53" | "54" | "55" | "56" | "57" | "58" | "59" | "60" | "-99" | "HHUKWINI" | "LOBAMBA" | "MADLANGEMPISI" | "MAPHALALENI" | "MAYIWANE" | "MBABANE EAST" | "MBABANE WEST" | "MHLANGATANE" | "NDZINGENI" | "NKHABA" | "NTFONJENI" | "PIGGS PEAK" | "SIPHOCOSINI" | "TIMPHISINI" | "DVOKODVWENI" | "GILGALI" | "LOMAHASHA" | "LUBULI" | "LUGONGOLWENI" | "MATSANJENI NORTH" | "MHLUME" | "MPOLONJENI" | "NKILONGO" | "SIPHOFANENI" | "SITHOBELA" | "KUKHANYENI" | "KWALUSENI" | "LAMGABHI" | "LOBAMBA LOMDZALA" | "LUDZELUDZE" | "MAFUTSENI" | "MAHLANGATSHA" | "MANGCONGCO" | "MANZINI NORTH" | "MANZINI SOUTH" | "MHLAMBANYATSI" | "MKHIWENI" | "MTFONGWANENI" | "NGWEMPISI" | "NHLAMBENI" | "NKOMIYAHLABA" | "NTONDOZI" | "PHONDO" | "GEGE" | "HOSEA" | "KUBUTA" | "KUMETHULA" | "MASEYISINI" | "MATSANJENI SOUTH" | "MTSAMBAMA" | "NGUDZENI" | "NKWENE" | "SANDLENI" | "SHISELWENI I" | "SHISELWENI II" | "SIGWE" | "SOMNTONGO" | "ZOMBODZE EMUVA" | "MOTSHANE" | "Unspecified";
    language?: string;
    link?: builders.BackboneElement[];
    managingOrganization?: builders.Reference;
    maritalStatus?: builders.CodeableConcept;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    multipleBirth?: boolean | number;
    name?: builders.HumanName[];
    nationality?: builders.Extension[];
    photo?: builders.Attachment[];
    registrationDate?: string[];
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Practitioner_SzPractitioner_Props = {
    active?: boolean;
    address?: builders.Address[];
    birthDate?: string;
    communication?: builders.CodeableConcept[];
    contained?: any[];
    extension?: builders.Extension[];
    gender?: string;
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    name?: builders.HumanName[];
    photo?: builders.Attachment[];
    qualification?: builders.BackboneElement[];
    telecom?: builders.ContactPoint[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Procedure_SzProcedure_Props = {
    asserter?: builders.Reference;
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept[];
    category?: builders.CodeableConcept;
    code?: builders.CodeableConcept;
    complication?: builders.CodeableConcept[];
    complicationDetail?: builders.Reference[];
    contained?: any[];
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    focalDevice?: builders.BackboneElement[];
    followUp?: builders.CodeableConcept[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    language?: string;
    location?: builders.Reference;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    outcome?: builders.CodeableConcept;
    partOf?: builders.Reference[];
    performed?: string | builders.Period | builders.Age | builders.Range;
    performer?: builders.BackboneElement[];
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    recorder?: builders.Reference;
    report?: builders.Reference[];
    status?: string;
    statusReason?: builders.CodeableConcept;
    subject?: builders.Reference;
    text?: builders.Narrative;
    usedCode?: builders.CodeableConcept[];
    usedReference?: builders.Reference[];
    [key: string]: any;
};

declare type ServiceRequest_SzLabRequest_Props = {
    asNeeded?: boolean | builders.CodeableConcept;
    authoredOn?: string;
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept[];
    category?: builders.CodeableConcept[];
    code?: "CD4" | "AST" | "CREA" | "HB" | "LFT" | "HIVVL" | "ICUP" | "GGT" | "KFT" | "CARDE" | "ART" | "ELECT" | "GLUCF" | "GLUCR" | "GTT" | "CL" | "K" | "NA" | "CO2" | "UA" | "CREAC" | "TBIL" | "BILI" | "ALP" | "ALT" | "ALB" | "TPROT" | "CK" | "CKMB" | "MYOG" | "TROPI" | "MAG" | "PO4" | "CAL" | "LDH" | "TRIG" | "LDL" | "HDL" | "CHOL" | "AMY" | "LACT" | "CRP" | "LIPAS" | "HBA1C" | "M-TP" | "FBC" | "DIFF" | "ESR" | "RET" | "COOMB" | "SICKL" | "MAL" | "MALPC" | "MALS" | "PT" | "APTT" | "PI" | "BTIME" | "DDIME" | "TFT" | "T3" | "T4" | "TSH" | "LH" | "FSH" | "E2" | "PROG" | "PRL" | "TESTO" | "CORT" | "PTH" | "HCGSU" | "HCGSB" | "ABORH" | "RPR" | "TPHA" | "PSSA" | "BHCG" | "AFP" | "CA153" | "CA125" | "CEA" | "CA199" | "GRAM" | "MCSF" | "CSF" | "CRINK" | "SEMEN" | "HIVR" | "HIVE" | "HIPOC" | "LCRAG" | "TOXO" | "HELIP" | "HEAG" | "HBCAB" | "HEPC" | "QCRPR" | "WIDAL" | "RF" | "ASOT" | "XMAT" | "HLAX" | "ANISC" | "DCT" | "ICT" | "IGGS" | "ZN1" | "CUBFL" | "HIVGE" | "TROPT" | "UCHEM" | "CRAG" | "CRGLF" | "TBLAM" | "17OPH" | "A1ATR" | "ACA" | "ACE" | "ACERA" | "ACLA" | "ACOLA" | "ACTH" | "ADENO" | "ADNA" | "ALDOS" | "AMITA" | "AMYU" | "ANA" | "ANCA" | "ANDRO" | "ANTBG" | "ANTE" | "AUR1" | "AUR2" | "AUR3" | "AUR4" | "BFCC" | "BG" | "BGAS" | "BGRP" | "BHCG2" | "BM" | "BNP" | "BPARA" | "BPARM" | "C/UP" | "C1EST" | "CA724" | "CAERU" | "CALCI" | "CALCT" | "CARB" | "CATS" | "CHLAM" | "CMP" | "CMV" | "CPEPT" | "CPROT" | "CRPS" | "CSFA" | "CSFAG" | "CSFC" | "CUCSF" | "CULFU" | "CULMY" | "CULPU" | "CULSP" | "CUTUP" | "CYTCO" | "DBILI" | "DBSGE" | "DCRT" | "DIFFM" | "DIFFF" | "DRUGR" | "DRUGS" | "E2M" | "EQAM1" | "FDP" | "FE" | "FERR" | "FERRX" | "FGLU" | "FNA" | "FPROT" | "GLOB" | "GLUC" | "GLUCS" | "GNBST" | "GPCST" | "GROUP" | "GTT2" | "GTT4" | "GYN" | "GYNAE" | "HBELE" | "HBSAB" | "HBSAG" | "HELIC" | "HEPAG" | "HEPAM" | "HEPD" | "HEPE" | "HERP" | "HGH" | "HI2DF" | "HISIN" | "HISSU" | "HISTO" | "HISTX" | "HIV48" | "HIVA" | "HIVC" | "HIVCW" | "HIVLD" | "HIVPC" | "HIVP" | "HIVST" | "HIVWB" | "HSAGR" | "HSV" | "HVART" | "HYS" | "ICD10" | "IGE" | "INR" | "IRONX" | "LALB" | "LCHOL" | "LCOT" | "LCREA" | "LESR" | "LFBC" | "LGGT" | "LGLPF" | "LGLPR" | "LGLUF" | "LGLUR" | "LHBA1" | "LHDL" | "LI" | "LIPO" | "LRF" | "LUPUS" | "LUR" | "MALB" | "MBCAT" | "MBCLT" | "MBFAM" | "MBFAS" | "MBFCA" | "MBFL" | "MBFLU" | "MBFPE" | "MBFPL" | "MBFSY" | "MBTRA" | "MBUCT" | "MBUMC" | "MCES" | "MEAS" | "MENDC" | "MEYE" | "MGAS" | "MICBC" | "MICFL" | "MICNS" | "MICSA" | "MICTS" | "MICU" | "MONO" | "MPEN" | "MPT64" | "MPUS" | "MRCSW" | "MSPUT" | "MSTRS" | "MTISS" | "MUMPS" | "MUPS" | "MWUS" | "MYGT" | "MYMIC" | "MYOB" | "NGYN" | "MFOB" | "PARA" | "PBILI" | "PBS" | "PCRAP" | "PCTR" | "PHENB" | "PHENY" | "PHVS" | "PLAT" | "PM" | "POLIO" | "POSTM" | "POSTX" | "PRD" | "PROT" | "PRT24" | "PSA" | "PTT" | "RA" | "RAPI2" | "RCCHE" | "RH" | "ROTA" | "ROTPC" | "RUB" | "SADA" | "SCREA" | "SEICU" | "SENFA" | "SENGN" | "SENGP" | "SENSA" | "SENST" | "SENSU" | "SHBG" | "STDM" | "STOOL" | "TBA1" | "TBA2" | "TBA3" | "TBBA" | "TBCL" | "TBCL1" | "TBCL2" | "TBCL3" | "TBCON" | "TBEQA" | "TBGEN" | "TBHCG" | "TBILI" | "TBINF" | "TBLP1" | "TBLP2" | "TBLP3" | "TBLP" | "TBLPS" | "TBLSF" | "TBPC1" | "TBPC2" | "TBPC3" | "TBRAP" | "TBRP1" | "TBRP2" | "TBRP3" | "TBSF1" | "TBSF2" | "TBSF3" | "TBSFF" | "TBSS" | "TBSS2" | "TBSS3" | "TBSSF" | "TBZ" | "TBZ1" | "TBZ2" | "TBZ3" | "TBZN" | "TBZN1" | "TBZN2" | "TBZN3" | "THCGB" | "TT3" | "TTA" | "LURIC" | "UBHCG" | "UBJP" | "UCREA" | "UCUL" | "UE" | "UECA" | "UECA+" | "UMAC" | "UMIC" | "UPREG" | "UPROT" | "UREA" | "VALPR" | "VDRL" | "VLPOC" | "VMAC" | "VZV" | "WBCP" | "WCC" | "WF" | "YELLO" | "ZN" | "ZN2" | "ZN3" | "TBSF" | "QHCG" | "CVID" | "CVRP" | "MEASL" | "CD4 Test" | "AST (Aspartate Transaminase)" | "Creatinine " | "Haemoglobin" | "Liver Function Tests - Profile" | "HIV Viral Load (Plasma)" | "ICU-  Profile" | "Gamma-Glutamyl Transferase GGT" | "Kidney Function Test - Profile" | "Cardiac Enzymes" | "ART Baseline - Profile" | "Electrolytes - Profile" | "Glucose (Fasting)" | "Glucose (Random)" | "Glucose Tolerance Test" | "S-Chloride" | "S-Potassium" | "S-Sodium" | "S-Carbon Dioxide" | "Uric Acid" | "Creatinine Clearance" | "Total Bilirubin" | "Total and Direct Bilirubin" | "Alkaline Phosphatase" | "ALT (Alanine Aminotransferase)" | "Albumin" | "Total Protein" | "Creatine Kinase (CK)" | "Creatine Kinase (MB-Frac)" | "Myoglobin" | "S-Troponin I" | "S-Magnesium" | "Phosphate" | "S-Calcium" | "Lactate Dehydrogenase (LD)" | "Triglyceride" | "LDL - Cholesterol" | "HDL - Cholesterol" | "Total Cholesterol" | "Serum Amylase" | "Lactate" | "C-Reactive Protein (CRP)" | "Lipase (Serum)" | "Glycated Haemoglobin (HbA1C)" | "Micro Total Protein" | "FBC (Full Blood Count)" | "Differential Count" | "ESR (Westergren)" | "Reticulocyte Studies" | "Coombs Test" | "Sickle Cells Screen" | "Malaria" | "Malaria: PCR" | "Malaria Smear: Parasitemia" | "Prothrombin Time(INR/PI)" | "Partial Thromboplastin Time" | "Prothrombin Time (INR/PI)" | "Bleeding Time" | "D-Dimer" | "Thyroid Function Tests " | "Free Tri-iodothyronine (FT3)" | "Free Thyroxine (T4)" | "Thyroid Stimulating Hormone" | "Luteinising Hormone" | "Follicle Stimulating Hormone" | "17 b Oestradial (E2)" | "Progesterone" | "Prolactin" | "Testosterone" | "Cortisol" | "Parathyroid Hormone" | "Qualitative  -HCG (Urine)" | "Qualitative  -HCG" | "ABO + Rh Group" | "Syphilis RPR" | "TPHA" | "ANTIBIOTIC SENS: PSA" | "Beta-HCG (Pregnancy Test)" | "Alfa Feto Protein" | "CA15-3" | "CA125" | "Carcino-embryonic Antigen" | "CA19-9" | "MICROBIOLOGY : GRAM STAIN" | "MICROBIOLOGY : CSF" | "CSF Chem Profile" | "India Ink Stain" | "Semen Analysis" | "HIV Rapid Test" | "HIV ELISA" | "Point of Care DNA PCR" | "LFA Cryptococal Antigen" | "Toxoplasmosis Test" | "MICROBIOLOGY : H.pylori" | "Hepatitis A IgG" | "Hepatitis B Core Antibodies" | "Hepatitis C Antibodies" | "QC RPR" | "Widal" | "Rheumatoid Factor" | "Anti-Streptolysin O Test" | "Cross Match" | "Grouping/Crossmatch" | "Antibody Screening (^Bbloodban" | "Direct Coombs Test" | "Indirect Coomb's Test" | "IMMUNOGLOBULINS" | "Smear Microscopy 1" | "Culture : Body Fuilds" | "HIV GENE XPERT" | "Troponin-T" | "Biochemistry : Urine (Dipstick)" | "CRAG (CSF)" | "CRAG (LFA)  Blood" | "TB LAM Ag TEST" | "17 Hydroxyprogesterone" | "Alpha-1-antitrypsin" | "Anti-Centromere Antibodies" | "Angiotensin Converting Enzyme" | "Acetylcholine Receptor Ab's" | "Anti-Cardiolipin Antibodies" | "Anti-Collagen Antibodies" | "Adrenocorticotrophic Hormone" | "ADENO" | "Anti-Double Stranded DNA" | "Aldosterone" | "Anti-Mitochondrial Antibodies" | "Urine Amylase" | "Anti-Nuclear Antibodies" | "Anti-Neutrophil Cytoplasmic Ab" | "Androstenedione" | "Blood Group + Rh" | "Antenatal Screening" | "TB Auramine Specimen 1" | "TB Auramine Specimen 2" | "TB Auramine Specimen 3" | "TB Auramine Specimen 4" | "Cell Count : Body Fluid" | "Blood Group + Rh" | "Blood Gases" | "Blood grouping" | "HCG TOTAL BETA 2" | "Bone Marrow Report" | "B-Type Natriuretic Peptide" | "Blood Parasite Investigation" | "Blood Parasites" | "Cutup" | "C1 Esterase Inhibitor Assay" | "CA 72-4" | "Caeruloplasmin" | "Calcitonin" | "1.25 Dihydroxy Vitamin D" | "S-Carbamazepine" | "U-Catecholamines" | "Antibody test for Chlamydia" | "Calcium,Magnesium,PO4" | "CYTOMEGALOVIRUS" | "C-Peptide" | "CSF PROTEIN" | "CRP Serology" | "CSF Analysis" | "BACTERIAL ANTIGEN TESTS" | "Cell Count : CSF" | "CULTURE : CSF" | "MYCOLOGY" | "Mycology Culture" | "Culture : PUS" | "Culture : Sputum" | "Histo Cut Up (Dummy)" | "Gynaecological Detail" | "Conjugated Bilirubin (Direct)" | "Dry Blood Spot Gene Xpert" | "1:20 Diluted CRT" | "Differential Count" | "Diff Micro" | "Drug Resistance Testing" | "DRUG SCREEN" | "Oestradiol" | "Microbiology EQA" | "Fibrinogen Deg. Products (FDP)" | "S-Iron" | "Ferritin" | "S-Ferritin" | "Fluid-Glucose" | "Fine Needle Biopsy" | "F-Total Protein" | "Globulin" | "Glucose" | "Glucose Strip" | "GNB Sensitivity Testing" | "GPC Sensitivity testing" | "Blood Group Serology" | "GTT - 2 hourly" | "GTT Prolonged" | "Gynaecological Cytology" | "MICROSCOPIC EXAMINATION" | "Haemoglobin Electrophoresis" | "Hepatitis B Surface Antibody" | "Hepatitis B Surface Antigen" | "Helicobacter pylori Antibodies" | "Hepatitis A (IgG)(Immunity)" | "Hepatitis A IgM" | "HEPATITIS D INVESTIGATION" | "HEPATITIS E INVESTIGATION" | "Herpes simplex virus" | "Human Growth Hormone" | "HIV Viral Load (DBS)" | "CLINICAL HISTORY" | "Supplementary Report" | "MACROSCOPIC EXAMINATION" | "Histo Extended text" | "CD4 + CD8*" | "HIV ASANTE" | "HIV Ag/Ab Combo" | "Child Welfare Number" | "HIV Viral Load*" | "HIV DNA PCR" | "HIV RAPID TEST" | "HIV EID Information" | "HIV DNA PCR : Whole Blood" | "HepB surface antigen Rapid" | "Herpes simplex Virus" | "ART Number" | "Homocysteine" | "ICD10" | "Total IgE" | "INR" | "S-IRON STUDIES" | "ALBUMIN" | "S-Cholesterol" | "Cotinine ELISA" | "Creatinine" | "ESR (Westergren)" | "Full Blood Count" | "Gamma Glutamyl Transferase" | "P-Glucose (Fasting)" | "P-Glucose (Random)" | "S-Glucose (Fasting)" | "S-Glucose (Random)" | "HbA1C" | "HDL Cholesterol" | "S-Lithium" | "Lipogram" | "Rheumatoid factor" | "Lupus anticoagulant" | "Urea" | "Micro-albumin" | "Microbiology: Catheter Tip" | "Microbiology: Catheter Line Ti" | "MICROBIOLOGY:AMNIOTIC FLUID" | "MICROBIOLOGY : ASCITIC FLUID" | "MICROBIOLOGY:PERICARDIAL FLUID" | "Microbiology:Body Fluid" | "Microbiology:Body Fluid" | "MICROBIOLOGY:PERITONEAL FLUID" | "MICROBIOLOGY:PLEURAL FLUID" | "MICROBIOLOGY:SYNOVIAL FLUID" | "Microbiology: Tracheal Tip" | "Microbiology: Urinary Catheter" | "Microbiology:Umbilical Cathete" | "MICROBIOLOGY : CERVICAL SWAB" | "MICROBIOLOGY : EAR SWAB" | "MICROBIOLOGY:ENDOCERVICAL SWAB" | "MICROBIOLOGY : EYE SWAB" | "MICROBIOLOGY : GASTRIC ASP" | "MICROBIOLOGY: BLOOD CULTURE" | "MICROBIOLOGY : FLUID" | "MICROBIOLOGY : NASAL SWAB" | "Microscopy - Sexual Assault" | "MICROBIOLOGY : THROAT SWAB" | "MICROBIOLOGY: URINE" | "Epstein Barr Ser-Mono Test" | "MICROBIOLOGY : PENILE SWAB" | "MPT64 Rapid" | "MICROBIOLOGY : PUS" | "MICROBIOLOGY : RECTAL SWAB" | "MICROBIOLOGY : SPUTUM" | "MICROBIOLOGY : STOOL CULTURE" | "MICROBIOLOGY : TISSUE" | "Mumps Serology (ELISA)" | "MICROBIOLOGY : URETHRAL SWAB" | "MICROBILOLOGY: Wound Swab" | "Germ Tube Test" | "Microscopy for Fungi" | "Myogloblin (Serum)" | "Non-Gynaecological Cytology" | "Faecal Occult Blood" | "Parasitology:Urine" | "Neonatal Bilirubin" | "Peripheral Blood Smear" | "Factor V Leiden Mutation" | "Procalcitonin" | "Phenobarbitone" | "S-Phenytoin" | "PARASITOLOGY: VAGINAL SWAB" | "Platelets" | "Post-Mortem Examination" | "Polio Neutralisation Serology" | "POST MORTEM REPORT" | "Postmorten Supplement" | "Pregnandiol" | "Total Protein & Albumin" | "Urine Protein (24 hr)" | "Prostate Specific Antigen" | "Part Thromboplastin Time (PTT)" | "RA Latex Test" | "HIV Rapid Repeat" | "Cholinesterase" | "RHESUS FACTOR" | "Rotavirus Antigen EIA Test" | "Rotavirus: PCR" | "Rubella Serology" | "Adenosine Deaminase" | "Creatinine Clearance" | "SENS ICU" | "ANTIBIOTIC SUSCEPTIBILITY" | "ANTIBIOTIC SENS: GN" | "ANTIBIOTIC SENS: GP" | "ANTIBIOTIC SENS: STOOL" | "ANTIBIOTIC SENS: STOOL" | "ANTIBIOTIC SENS: URINE" | "Sex Hormone Binding Globulin" | "Direct Microscopy : Stool" | "Stool Microscopy" | "TB Microscopy Auramine 1" | "TB Microscopy Auramine 2" | "TB Microscopy Specimen 3" | "TB Blood Agar (TB Nat Ref)" | "TB Culture" | "TB Culture 1" | "TB Culture 2" | "TB Culture 3" | "TB Control" | "TB EQA" | "TB Genexpert" | "S-HCG Total Beta" | "S-Total Bilirubin" | "TB Diagnosis Information" | "TB Line Probe SP1" | "TB Line Probe SP2" | "TB Line Probe SP3" | "TB First Line -Line  Probe Assay" | "TB Second Line -Line  Probe Assay" | "2nd Line Probe Assay Final" | "TB PCR Specimen 1" | "TB PCR Specimen 2" | "TB PCR Specimen 3" | "TB Capilia Rapid Test" | "TB Capilia Rapid ID Test SP1" | "TB Capilia Rapid ID Test SP2" | "TB Capilia Rapid ID Test SP3" | "TB First Line Sens 1" | "TB First Line Sens 2" | "TB First Line Sens 3" | "TB First Line Sens Final" | "TB Second Line DST" | "TB Seconde Line Sens 2" | "TB Seconde Line Sens 3" | "TB Second Line Final" | "TBZN TB National Ref Lab" | "TB Direct Microscopy Spec. 1" | "TB Direct Microscopy Spec. 2" | "TB Direct Microscopy Spec. 3" | "TB Smear Microscopy" | "TBZN SP1" | "TBZN SP2" | "TBZN SP3" | "S-TOTAL HCG Beta" | "Total Tri-iodothyronine (TT3)" | "Tetanus Serology" | "Uric Acid" | "Urine Beta-HCG (Preg Test)" | "Urine Bence Jones Protein" | "Creatine Clearance" | "CULTURE : Urine" | "Urea & electrolytes" | "Urea, Electrolytes & Creatinin" | "Urea, Elec, Creat & eGFR" | "MACROSCOPY : Urine" | "MICROSCOPY : Urine" | "Urine Pregnancy Test" | "Total Protein (Urine)" | "Urea" | "S-Valproate" | "VDRL" | "HIV VIRAL LOAD (POC)" | "Vanillylmandelic Acid" | "VARICELLA-ZOSTER SEROLOGY" | "White Cell Count + Platelets" | "White Cell Count" | "WEIL FELIX" | "Yellow Fever" | "TBZN" | "Smear Microscopy 2" | "TBZN Specimen 3" | "TB First Line DST" | "Quantitative Beta-HCG (Blood)" | "PCR SARS-CoV-2" | "COVID-19 Ag Rapid Test" | "Measles";
    contained?: any[];
    doNotPerform?: boolean;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: builders.Reference[];
    intent?: string;
    language?: string;
    locationCode?: builders.CodeableConcept[];
    locationReference?: builders.Reference[];
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    occurrence?: string | builders.Period | builders.Timing;
    orderDetail?: builders.CodeableConcept[];
    patientInstruction?: string;
    performer?: builders.Reference[];
    performerType?: builders.CodeableConcept;
    priority?: string;
    quantity?: builders.Quantity | builders.Ratio | builders.Range;
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    relevantHistory?: builders.Reference[];
    replaces?: builders.Reference[];
    requester?: builders.Reference;
    requisition?: builders.Identifier;
    specimen?: builders.Reference[];
    status?: string;
    subject?: builders.Reference;
    supportingInfo?: builders.Reference[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type ServiceRequest_SzReferral_Props = {
    asNeeded?: boolean | builders.CodeableConcept;
    authoredOn?: string;
    basedOn?: builders.Reference[];
    bodySite?: builders.CodeableConcept[];
    category?: builders.CodeableConcept[];
    code?: builders.CodeableConcept;
    contained?: any[];
    doNotPerform?: boolean;
    encounter?: builders.Reference;
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: builders.Reference[];
    intent?: string;
    language?: string;
    locationCode?: builders.CodeableConcept[];
    locationReference?: builders.Reference[];
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    occurrence?: string | builders.Period | builders.Timing;
    orderDetail?: builders.CodeableConcept[];
    patientInstruction?: string;
    performer?: builders.Reference[];
    performerType?: builders.CodeableConcept;
    priority?: string;
    quantity?: builders.Quantity | builders.Ratio | builders.Range;
    reasonCode?: builders.CodeableConcept[];
    reasonReference?: builders.Reference[];
    recipient?: any[] | boolean[] | string[] | number[] | builders.Address[] | builders.Age[] | builders.Annotation[] | builders.Attachment[] | builders.CodeableConcept[] | builders.Coding[] | builders.ContactPoint[] | builders.Count[] | builders.Distance[] | builders.Duration[] | builders.HumanName[] | builders.Identifier[] | builders.Money[] | builders.Period[] | builders.Quantity[] | builders.Range[] | builders.Ratio[] | builders.Reference[] | builders.SampledData[] | builders.Signature[] | builders.Timing[] | builders.ContactDetail[] | builders.Contributor[] | builders.DataRequirement[] | builders.Expression[] | builders.ParameterDefinition[] | builders.RelatedArtifact[] | builders.TriggerDefinition[] | builders.UsageContext[] | builders.Dosage[] | builders.Meta[];
    relevantHistory?: builders.Reference[];
    replaces?: builders.Reference[];
    requester?: builders.Reference;
    requisition?: builders.Identifier;
    specimen?: builders.Reference[];
    status?: string;
    subject?: builders.Reference;
    supportingInfo?: builders.Reference[];
    text?: builders.Narrative;
    [key: string]: any;
};

declare type Specimen_SzLabSpecimen_Props = {
    accessionIdentifier?: builders.Identifier;
    collection?: builders.BackboneElement;
    condition?: builders.CodeableConcept[];
    contained?: any[];
    container?: builders.BackboneElement[];
    extension?: builders.Extension[];
    id?: string;
    identifier?: builders.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: builders.Meta;
    modifierExtension?: builders.Extension[];
    note?: builders.Annotation[];
    parent?: builders.Reference[];
    processing?: builders.BackboneElement[];
    receivedTime?: string;
    request?: builders.Reference[];
    status?: string;
    subject?: builders.Reference;
    text?: builders.Narrative;
    type?: builders.CodeableConcept;
    [key: string]: any;
};

declare const addExtension: (resource: any, url: any, value: any) => void;
declare const c: typeof builders.coding;
declare const cc: (codings: (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?]) | (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?])[], extra?: Omit<builders.CodeableConcept, "coding">) => builders.CodeableConcept;
declare const coding: typeof builders.coding;
declare const composite: (object: any, key: any, value: any) => void;
declare const concept: (codings: (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?]) | (builders.Coding | [string, string, Omit<builders.Coding, "system" | "code">?])[], extra?: Omit<builders.CodeableConcept, "coding">) => builders.CodeableConcept;
declare const ext: (url: string, value: any, props?: Omit<builders.Extension, "url">) => {
    extension: ({
        url: string;
    } & Omit<builders.Extension, "url">)[];
};
declare const extendSystemMap: (newMappings: any) => void;
declare const extendValues: (url: any, values: any, type?: string) => void;
declare const extension: (url: string, value: any, props?: Omit<builders.Extension, "url">) => {
    extension: ({
        url: string;
    } & Omit<builders.Extension, "url">)[];
};
declare const findExtension: (obj: any, targetUrl: any, path: any) => any;
declare const id: (id: string | builders.Identifier, ext?: any[], valueHints?: any) => any;
declare const identifier: (id: string | builders.Identifier, ext?: any[], valueHints?: any) => any;
declare const lookupValue: (url: any, code: any) => any;
declare const mapSystems: (obj: any) => any;
declare const mapValues: (obj: any, hints: any) => any;
declare const ref: (ref: any, opts?: {}) => any;
declare const reference: (ref: any, opts?: {}) => any;
declare const setSystemMap: (newMappings: any) => (state: any) => any;
declare const setValues: (url: any, values: any, type?: string) => void;
declare const value: (value: any, system: any, ...extra: any[]) => any;

/**
  * Create a Appointment resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.appointmentType] - The style of appointment or patient that has been booked in the slot (not service type). Accepts all values from http://terminology.hl7.org/ValueSet/v2-0276
  * @param {Reference} [props.basedOn] - The service request this appointment is allocated to assess
  * @param {string} [props.cancelationReason] - The coded reason for the appointment being cancelled. Accepts all values from http://hl7.org/fhir/ValueSet/appointment-cancellation-reason|4.0.1
  * @param {string} [props.comment] - Additional comments
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {dateTime} [props.created] - The date that this appointment was initially created
  * @param {string} [props.description] - Shown on a subject line in a meeting request, or appointment list
  * @param {instant} [props.end] - When appointment is to conclude
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - External Ids for this item
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {number} [props.minutesDuration] - Can be less than start/end (e.g. estimate)
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {BackboneElement} [props.participant] - Participants involved in appointment
  * @param {string} [props.patientInstruction] - Detailed information and instructions for the patient
  * @param {unsignedInt} [props.priority] - Used to make informed decisions if needing to re-prioritize
  * @param {string} [props.reasonCode] - Coded reason this appointment is scheduled. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-reason|4.0.1
  * @param {Reference} [props.reasonReference] - Reason the appointment is to take place (resource)
  * @param {Period} [props.requestedPeriod] - Potential date/time interval(s) requested to allocate the appointment within
  * @param {string} [props.serviceCategory] - A broad categorization of the service that is to be performed during this appointment. Accepts all values from http://hl7.org/fhir/ValueSet/service-category|4.0.1
  * @param {string} [props.serviceType] - The specific service that is to be performed during this appointment. Accepts all values from http://hl7.org/fhir/ValueSet/service-type|4.0.1
  * @param {Reference} [props.slot] - The slots that this appointment is filling
  * @param {string} [props.specialty] - The specialty of a practitioner that would be required to perform the service requested in this appointment. Accepts all values from http://hl7.org/fhir/ValueSet/c80-practice-codes|4.0.1
  * @param {instant} [props.start] - When appointment is to take place
  * @param {string} [props.status] - proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error | checked-in | waitlist. Accepts all values from http://hl7.org/fhir/ValueSet/appointmentstatus|4.0.1
  * @param {Reference} [props.supportingInformation] - Additional information to support the appointment
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  */
declare function appointment(type: "SzAppointment", props: Appointment_SzAppointment_Props): any;
declare function appointment(props: Appointment_SzAppointment_Props): any;
/**
  * Create a Condition resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime|Age|Period|Range|string} [props.abatement] - When in resolution/remission
  * @param {Reference} [props.asserter] - Person who asserts this condition
  * @param {string} [props.bodySite] - Anatomical location, if relevant. Accepts all values from http://hl7.org/fhir/ValueSet/body-site|4.0.1
  * @param {string} [props.category] - problem-list-item | encounter-diagnosis. Accepts all values from http://hl7.org/fhir/ValueSet/condition-category|4.0.1
  * @param {string} [props.clinicalStatus] - active | recurrence | relapse | inactive | remission | resolved. Accepts all values from http://hl7.org/fhir/ValueSet/condition-clinical|4.0.1
  * @param {string} [props.code] - Condition Identification. Accepts all values from http://hl7.org/fhir/ValueSet/condition-code|4.0.1
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {BackboneElement} [props.evidence] - Supporting evidence
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - External Ids for this condition
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Annotation} [props.note] - Additional information about the Condition
  * @param {dateTime} [props.onset] - Diagnosis date
  * @param {dateTime} [props.recordedDate] - Date record was first recorded
  * @param {Reference} [props.recorder] - Who recorded the condition
  * @param {string} [props.severity] - Subjective severity of condition. Accepts all values from http://hl7.org/fhir/ValueSet/condition-severity|4.0.1
  * @param {BackboneElement} [props.stage] - Stage/grade, usually assessed formally
  * @param {Reference} [props.subject] - Who has the condition?
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {string} [props.verificationStatus] - unconfirmed | provisional | differential | confirmed | refuted | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/condition-ver-status|4.0.1
  */
declare function condition(type: "SzCondition", props: Condition_SzCondition_Props): any;
declare function condition(props: Condition_SzCondition_Props): any;
/**
  * Create a Encounter resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.account] - The set of accounts that may be used for billing for this Encounter
  * @param {Reference} [props.appointment] - The appointment that scheduled this encounter
  * @param {Reference} [props.basedOn] - The ServiceRequest that initiated this encounter
  * @param {string} [props.class] - Department in which the encounter took place. Accepts all values from https://hapifhir.eswatinihie.com/fhir/ValueSet/SzEncounterClassificationVS|0.1.0
  * @param {BackboneElement} [props.classHistory] - List of past encounter classes
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {BackboneElement} [props.diagnosis] - The list of diagnosis relevant to this encounter
  * @param {Reference} [props.episodeOfCare] - Episode(s) of care that this encounter should be recorded against
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {BackboneElement} [props.hospitalization] - Details about the admission to a healthcare service
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - Identifier(s) by which this encounter is known
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Duration} [props.length] - Quantity of time the encounter lasted (less time absent)
  * @param {BackboneElement} [props.location] - Encounter location
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Reference} [props.partOf] - Another Encounter this encounter is part of
  * @param {BackboneElement} [props.participant] - List of participants involved in the encounter
  * @param {Period} [props.period] - The start and end time of the encounter
  * @param {string} [props.priority] - Indicates the urgency of the encounter. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ActPriority|3.0.0
  * @param {string} [props.reasonCode] - Coded reason the encounter takes place. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-reason|4.0.1
  * @param {Reference} [props.reasonReference] - Reason the encounter takes place (reference)
  * @param {Reference} [props.serviceProvider] - The organization (facility) responsible for this encounter
  * @param {string} [props.serviceType] - Specific type of service. Accepts all values from http://hl7.org/fhir/ValueSet/service-type|4.0.1
  * @param {string} [props.status] - planned | arrived | triaged | in-progress | onleave | finished | cancelled +. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-status|4.0.1
  * @param {BackboneElement} [props.statusHistory] - List of past encounter statuses
  * @param {Reference} [props.subject] - Patient associated with the encounter
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {string} [props.type] - Specific type of encounter. Accepts all values from http://hl7.org/fhir/ValueSet/encounter-type|4.0.1
  */
declare function encounter(type: "SzEncounter", props: Encounter_SzEncounter_Props): any;
declare function encounter(props: Encounter_SzEncounter_Props): any;
/**
  * Create a EpisodeOfCare resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.account] - The set of accounts that may be used for billing for this EpisodeOfCare
  * @param {Reference} [props.careManager] - Care manager/care coordinator for the patient
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {BackboneElement} [props.diagnosis] - The list of diagnosis relevant to this episode of care
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - Business Identifier(s) relevant for this EpisodeOfCare
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Reference} [props.managingOrganization] - Organization that assumes care
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Reference} [props.patient] - The patient who is the focus of this episode of care
  * @param {Period} [props.period] - Start and end datest of the Episode of care
  * @param {Reference} [props.referralRequest] - Originating Referral Request(s)
  * @param {string} [props.status] - planned | waitlist | active | onhold | finished | cancelled | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/episode-of-care-status|4.0.1
  * @param {BackboneElement} [props.statusHistory] - Past list of status codes (the current status may be included to cover the start date of the status)
  * @param {Reference} [props.team] - Other practitioners facilitating this episode of care
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {string} [props.type] - Episode of care classification. Accepts all values from https://hapifhir.eswatinihie.com/fhir/ValueSet/SzEpisodeOfCareTypeVS
  */
declare function episodeOfCare(type: "SzEpisodeOfCare", props: EpisodeOfCare_SzEpisodeOfCare_Props): any;
declare function episodeOfCare(props: EpisodeOfCare_SzEpisodeOfCare_Props): any;
/**
  * Create a Location resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Address} [props.address] - Physical location
  * @param {string} [props.alias] - A list of alternate names that the location is known as, or was known as, in the past
  * @param {string} [props.availabilityExceptions] - Description of availability exceptions
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {string} [props.description] - Additional details about the location that could be displayed as further information to identify the location beyond its name
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the location
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {BackboneElement} [props.hoursOfOperation] - What days/times during a week is this location usually open
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - Unique code or number identifying the location to its users
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Reference} [props.managingOrganization] - Organization responsible for provisioning and upkeep
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.mode] - instance | kind. Accepts all values from http://hl7.org/fhir/ValueSet/location-mode|4.0.1
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {string} [props.name] - Location Name
  * @param {string} [props.operationalStatus] - The operational status of the location (typically only for a bed/room). Accepts all values from http://terminology.hl7.org/ValueSet/v2-0116|3.0.0
  * @param {Reference} [props.partOf] - Another Location this one is physically a part of
  * @param {string} [props.physicalType] - Physical form of the location. Accepts all values from http://hl7.org/fhir/ValueSet/location-physical-type|4.0.1
  * @param {BackboneElement} [props.position] - The absolute geographic location
  * @param {string} [props.status] - active | suspended | inactive. Accepts all values from http://hl7.org/fhir/ValueSet/location-status|4.0.1
  * @param {ContactPoint} [props.telecom] - Contact details of the location
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {string} [props.type] - Location Type. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ServiceDeliveryLocationRoleType|3.0.0
  */
declare function location(type: "SzLocation", props: Location_SzLocation_Props): any;
declare function location(props: Location_SzLocation_Props): any;
/**
  * Create a Medication resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Ratio} [props.amount] - Amount of drug in package
  * @param {BackboneElement} [props.batch] - Details about packaged medications
  * @param {string} [props.code] - ELMIS Product Code. Accepts all values from https://hapifhir.eswatinihie.com/fhir/ValueSet/SzProductCodeVS
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {string} [props.form] - powder | tablets | capsule +. Accepts all values from http://hl7.org/fhir/ValueSet/medication-form-codes|4.0.1
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - Business identifier for this medication
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {BackboneElement} [props.ingredient] - Active or inactive ingredient
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Reference} [props.manufacturer] - Manufacturer of the item
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {string} [props.status] - active | inactive | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/medication-status|4.0.1
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  */
declare function medication(type: "SzMedication", props: Medication_SzMedication_Props): any;
declare function medication(props: Medication_SzMedication_Props): any;
/**
  * Create a MedicationDispense resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.authorizingPrescription] - Medication order that authorizes the dispense
  * @param {string} [props.category] - Type of medication dispense. Accepts all values from http://hl7.org/fhir/ValueSet/medicationdispense-category|4.0.1
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Reference} [props.context] - Encounter / Episode associated with event
  * @param {Quantity} [props.daysSupply] - Amount of medication expressed as a timing amount
  * @param {Reference} [props.destination] - Where the medication was sent
  * @param {Reference} [props.detectedIssue] - Clinical issue with action
  * @param {Dosage} [props.dosageInstruction] - How the medication is to be used by the patient or administered by the caregiver
  * @param {Reference} [props.eventHistory] - A list of relevant lifecycle events
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - External identifier
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Reference} [props.location] - Where the dispense occurred
  * @param {string} [props.medication] - Supplied Medication. Accepts all values from http://hl7.org/fhir/ValueSet/medication-codes|4.0.1
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Annotation} [props.note] - Information about the dispense
  * @param {Reference} [props.partOf] - Event that dispense is part of
  * @param {BackboneElement} [props.performer] - Dispensing Practitioner
  * @param {Quantity} [props.quantity] - Amount dispensed
  * @param {Reference} [props.receiver] - Who collected the medication
  * @param {string} [props.status] - preparation | in-progress | cancelled | on-hold | completed | entered-in-error | stopped | declined | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/medicationdispense-status|4.0.1
  * @param {string} [props.statusReason] - Why a dispense was not performed. Accepts all values from http://hl7.org/fhir/ValueSet/medicationdispense-status-reason|4.0.1
  * @param {Reference} [props.subject] - Who the dispense is for
  * @param {BackboneElement} [props.substitution] - Whether a substitution was performed on the dispense
  * @param {Reference} [props.supportingInformation] - Information that supports the dispensing of the medication
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {string} [props.type] - Trial fill, partial fill, emergency fill, etc.. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ActPharmacySupplyType
  * @param {dateTime} [props.whenHandedOver] - When product was given out
  * @param {dateTime} [props.whenPrepared] - When product was packaged and reviewed
  */
declare function medicationDispense(type: "SzMedicationDispense", props: MedicationDispense_SzMedicationDispense_Props): any;
declare function medicationDispense(props: MedicationDispense_SzMedicationDispense_Props): any;
/**
  * Create a MedicationRequest resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {dateTime} [props.authoredOn] - Medication Request Date
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {string} [props.category] - Type of medication usage. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-category|4.0.1
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {string} [props.courseOfTherapyType] - Overall pattern of medication administration. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-course-of-therapy|4.0.1
  * @param {Reference} [props.detectedIssue] - Clinical Issue with action
  * @param {BackboneElement} [props.dispenseRequest] - Medication supply authorization
  * @param {boolean} [props.doNotPerform] - True if request is prohibiting action
  * @param {Dosage} [props.dosageInstruction] - Dosage Instruction
  * @param {Reference} [props.encounter] - Encounter created as part of encounter/admission/stay
  * @param {Reference} [props.eventHistory] - A list of events of interest in the lifecycle
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Identifier} [props.groupIdentifier] - Composite request this is part of
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - External ids for this request
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {string} [props.intent] - proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-intent|4.0.1
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {string} [props.medication] - Medication to be taken. Accepts all values from https://hapifhir.eswatinihie.com/fhir/ValueSet/SzProductCodeVS
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Annotation} [props.note] - Information about the prescription
  * @param {Reference} [props.performer] - Intended performer of administration
  * @param {string} [props.performerType] - Desired kind of performer of the medication administration. Accepts all values from http://hl7.org/fhir/ValueSet/performer-role|4.0.1
  * @param {Reference} [props.priorPrescription] - An order/prescription that is being replaced
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.0.1
  * @param {string} [props.reasonCode] - Reason or indication for ordering or not ordering the medication. Accepts all values from http://hl7.org/fhir/ValueSet/condition-code|4.0.1
  * @param {Reference} [props.reasonReference] - Condition or observation that supports why the prescription is being written
  * @param {Reference} [props.recorder] - Person who entered the request
  * @param {boolean|Reference} [props.reported] - Reported rather than primary record
  * @param {Reference} [props.requester] - Who/What requested the Request
  * @param {string} [props.status] - active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-status|4.0.1
  * @param {string} [props.statusReason] - Reason for current status. Accepts all values from http://hl7.org/fhir/ValueSet/medicationrequest-status-reason|4.0.1
  * @param {Reference} [props.subject] - Who or group medication request is for
  * @param {BackboneElement} [props.substitution] - Any restrictions on medication substitution
  * @param {Reference} [props.supportingInformation] - Information to support ordering of the medication
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  */
declare function medicationRequest(type: "SzMedicationRequest", props: MedicationRequest_SzMedicationRequest_Props): any;
declare function medicationRequest(props: MedicationRequest_SzMedicationRequest_Props): any;
/**
  * Create a Observation resource.
  * @public
  * @function
  * @param {string} type - A profile type: one of `SzCauseOfDeath`, `SzClinicalObservation`, `SzLabResult`, `SzMannerOfDeath`, `SzVitalSigns`
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal or order
  * @param {string} [props.bodySite] - Observed body part. Accepts all values from http://hl7.org/fhir/ValueSet/body-site|4.0.1
  * @param {string} [props.category] - Classification of  type of observation. Accepts all values from http://hl7.org/fhir/ValueSet/observation-category|4.0.1
  * @param {string} [props.code] - Cause of death. Accepts all values from http://hl7.org/fhir/ValueSet/observation-codes|4.0.1
  * @param {BackboneElement} [props.component] - Cause of death time interval for Intermediate, Intermediate I, Intermediat II, Underlying
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {string} [props.dataAbsentReason] - Why the result is missing. Accepts all values from http://hl7.org/fhir/ValueSet/data-absent-reason|4.0.1
  * @param {Reference} [props.derivedFrom] - Related measurements the observation is made from
  * @param {Reference} [props.device] - (Measurement) Device
  * @param {dateTime|Period|Timing|instant} [props.effective] - Clinically relevant time/time-period for observation
  * @param {Reference} [props.encounter] - Healthcare event during which this observation is made
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Reference} [props.focus] - What the observation is about, when it is not about the subject of record
  * @param {Reference} [props.hasMember] - Related resource that belongs to the Observation group
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - Business Identifier for observation
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.interpretation] - High, low, normal, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/observation-interpretation|4.0.1
  * @param {instant} [props.issued] - Date/Time this version was made available
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.method] - How it was done. Accepts all values from http://hl7.org/fhir/ValueSet/observation-methods|4.0.1
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Annotation} [props.note] - Comments about the observation
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {Reference} [props.performer] - Cause of death certifier (coroner or medical examiner)
  * @param {BackboneElement} [props.referenceRange] - Provides guide for interpretation
  * @param {Reference} [props.specimen] - Specimen used for this observation
  * @param {string} [props.status] - registered | preliminary | final | amended +. Accepts all values from http://hl7.org/fhir/ValueSet/observation-status|4.0.1
  * @param {Reference} [props.subject] - The decedent
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {CodeableConcept} [props.value] - Actual result
  */
declare function observation(type: "SzCauseOfDeath", props: Observation_SzCauseOfDeath_Props): any;
declare function observation(type: "SzClinicalObservation", props: Observation_SzClinicalObservation_Props): any;
declare function observation(type: "SzLabResult", props: Observation_SzLabResult_Props): any;
declare function observation(type: "SzMannerOfDeath", props: Observation_SzMannerOfDeath_Props): any;
declare function observation(type: "SzVitalSigns", props: Observation_SzVitalSigns_Props): any;
/**
  * Create a Organization resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether the organization's record is still in active use
  * @param {Address} [props.address] - An address for the organization
  * @param {string} [props.alias] - A list of alternate names that the organization is known as, or was known as in the past
  * @param {BackboneElement} [props.contact] - Contact for the organization for a certain purpose
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Reference} [props.endpoint] - Technical endpoints providing access to services operated for the organization
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - Identifies this organization  across multiple systems
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {string} [props.name] - Organization' name
  * @param {Reference} [props.partOf] - The organization of which this organization forms a part
  * @param {ContactPoint} [props.telecom] - A contact detail for the organization
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {string} [props.type] - Organization Type. Accepts all values from http://hl7.org/fhir/ValueSet/organization-type|4.0.1
  */
declare function organization(type: "SzOrganization", props: Organization_SzOrganization_Props): any;
declare function organization(props: Organization_SzOrganization_Props): any;
/**
  * Create a Patient resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether this patient's record is in active use
  * @param {Address} [props.address] - An address for the individual
  * @param {date} [props.birthDate] - Date of birth: YYYY-MM-DD
  * @param {string} [props.chiefdom] - Extention: Eswatini Chiefdom. Accepts all values from https://hapifhir.eswatinihie.com/fhir/ValueSet/SzChiefdomVS|0.1.0
  * @param {BackboneElement} [props.communication] - A language which may be used to communicate with the patient about his or her health
  * @param {BackboneElement} [props.contact] - A contact party (e.g. guardian, partner, friend) for the patient
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {boolean|dateTime} [props.deceased] - Indicates if the individual is deceased or not
  * @param {Extension} [props.extension] - Extension
  * @param {string} [props.gender] - Sex at birth: male | female | other | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/administrative-gender|4.0.1
  * @param {Reference} [props.generalPractitioner] - Patient's nominated primary care provider
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - Patient's Identification Number
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.inkhundla] - Extention: Eswatini Inkhundla. Accepts all values from https://hapifhir.eswatinihie.com/fhir/ValueSet/SzTinkhundlaVS|0.1.0
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {BackboneElement} [props.link] - Link to another patient resource that concerns the same actual person
  * @param {Reference} [props.managingOrganization] - Organization that is the custodian of the patient record
  * @param {string} [props.maritalStatus] - Marital (civil) status of a patient. Accepts all values from http://hl7.org/fhir/ValueSet/marital-status|4.0.1
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {boolean|integer} [props.multipleBirth] - Whether patient is part of a multiple birth
  * @param {HumanName} [props.name] - Patient's name
  * @param {Extension} [props.nationality] - Nationality.
  * @param {Attachment} [props.photo] - Image of the patient
  * @param {dateTime} [props.registrationDate] - Date the patient was registered
  * @param {ContactPoint} [props.telecom] - A contact detail for the individual
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  */
declare function patient(type: "SzPatient", props: Patient_SzPatient_Props): any;
declare function patient(props: Patient_SzPatient_Props): any;
/**
  * Create a Practitioner resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {boolean} [props.active] - Whether this practitioner's record is in active use
  * @param {Address} [props.address] - Address(es) of the practitioner that are not role specific (typically home address)
  * @param {date} [props.birthDate] - The date  on which the practitioner was born
  * @param {string} [props.communication] - A language the practitioner can use in patient communication. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {string} [props.gender] - Sex at birth: male | female | other | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/administrative-gender|4.0.1
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - An identifier for the person as this agent
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {HumanName} [props.name] - Practitioner's name
  * @param {Attachment} [props.photo] - Image of the person
  * @param {BackboneElement} [props.qualification] - Certification, licenses, or training pertaining to the provision of care
  * @param {ContactPoint} [props.telecom] - A contact detail for the practitioner (that apply to all roles)
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  */
declare function practitioner(type: "SzPractitioner", props: Practitioner_SzPractitioner_Props): any;
declare function practitioner(props: Practitioner_SzPractitioner_Props): any;
/**
  * Create a Procedure resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Reference} [props.asserter] - Person who asserts this procedure
  * @param {Reference} [props.basedOn] - A request for this procedure
  * @param {string} [props.bodySite] - Target body sites. Accepts all values from http://hl7.org/fhir/ValueSet/body-site|4.0.1
  * @param {string} [props.category] - Classification of the procedure. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-category|4.0.1
  * @param {string} [props.code] - Procedure Code. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-code|4.0.1
  * @param {string} [props.complication] - Complication following the procedure. Accepts all values from http://hl7.org/fhir/ValueSet/condition-code|4.0.1
  * @param {Reference} [props.complicationDetail] - A condition that is a result of the procedure
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Reference} [props.encounter] - Encounter created as part of
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {BackboneElement} [props.focalDevice] - Manipulated, implanted, or removed device
  * @param {string} [props.followUp] - Instructions for follow up. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-followup|4.0.1
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - External Identifiers for this procedure
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Reference} [props.location] - Where the procedure happened
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Annotation} [props.note] - Additional information about the procedure
  * @param {string} [props.outcome] - The result of procedure. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-outcome|4.0.1
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {dateTime|Period|string|Age|Range} [props.performed] - When the procedure was performed
  * @param {BackboneElement} [props.performer] - The people who performed the procedure
  * @param {string} [props.reasonCode] - Coded reason procedure performed. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-reason|4.0.1
  * @param {Reference} [props.reasonReference] - The justification that the procedure was performed
  * @param {Reference} [props.recorder] - Who recorded the procedure
  * @param {Reference} [props.report] - Any report resulting from the procedure
  * @param {string} [props.status] - preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/event-status|4.0.1
  * @param {string} [props.statusReason] - Reason for current status. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-not-performed-reason|4.0.1
  * @param {Reference} [props.subject] - Who the procedure was performed on
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {string} [props.usedCode] - Coded items used during the procedure. Accepts all values from http://hl7.org/fhir/ValueSet/device-kind|4.0.1
  * @param {Reference} [props.usedReference] - Items used during procedure
  */
declare function procedure(type: "SzProcedure", props: Procedure_SzProcedure_Props): any;
declare function procedure(props: Procedure_SzProcedure_Props): any;
/**
  * Create a ServiceRequest resource.
  * @public
  * @function
  * @param {string} type - A profile type: one of `SzLabRequest`, `SzReferral`
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.asNeeded] - Preconditions for service. Accepts all values from http://hl7.org/fhir/ValueSet/medication-as-needed-reason|4.0.1
  * @param {dateTime} [props.authoredOn] - Date request signed
  * @param {Reference} [props.basedOn] - What request fulfills
  * @param {string} [props.bodySite] - Location on Body. Accepts all values from http://hl7.org/fhir/ValueSet/body-site|4.0.1
  * @param {string} [props.category] - Type of service request. Accepts all values from http://hl7.org/fhir/ValueSet/servicerequest-category|4.0.1
  * @param {string} [props.code] - Local test code. Accepts all values from https://hapifhir.eswatinihie.com/fhir/ValueSet/SzTestCodeVS
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {boolean} [props.doNotPerform] - True if service/procedure should not be performed
  * @param {Reference} [props.encounter] - Encounter information
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - Identifiers assigned to this order
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {canonical} [props.instantiatesCanonical] - Instantiates FHIR protocol or definition
  * @param {string} [props.instantiatesUri] - Instantiates external protocol or definition
  * @param {Reference} [props.insurance] - Associated insurance coverage
  * @param {string} [props.intent] - proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option. Accepts all values from http://hl7.org/fhir/ValueSet/request-intent|4.0.1
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {string} [props.locationCode] - Requested location. Accepts all values from http://terminology.hl7.org/ValueSet/v3-ServiceDeliveryLocationRoleType
  * @param {Reference} [props.locationReference] - Requested location
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Annotation} [props.note] - Comments
  * @param {dateTime|Period|Timing} [props.occurrence] - When service should occur
  * @param {string} [props.orderDetail] - Additional order information. Accepts all values from http://hl7.org/fhir/ValueSet/servicerequest-orderdetail|4.0.1
  * @param {string} [props.patientInstruction] - Patient or consumer-oriented instructions
  * @param {Reference} [props.performer] - Requested performer
  * @param {string} [props.performerType] - Performer role. Accepts all values from http://hl7.org/fhir/ValueSet/participant-role|4.0.1
  * @param {string} [props.priority] - routine | urgent | asap | stat. Accepts all values from http://hl7.org/fhir/ValueSet/request-priority|4.0.1
  * @param {Quantity|Ratio|Range} [props.quantity] - Service amount
  * @param {string} [props.reasonCode] - Explanation/Justification for procedure or service. Accepts all values from http://hl7.org/fhir/ValueSet/procedure-reason|4.0.1
  * @param {Reference} [props.reasonReference] - Explanation/Justification for service or service
  * @param {Reference} [props.relevantHistory] - Request provenance
  * @param {Reference} [props.replaces] - What request replaces
  * @param {Reference} [props.requester] - Who/what is requesting service
  * @param {Identifier} [props.requisition] - Composite Request ID
  * @param {Reference} [props.specimen] - Lab test specimen
  * @param {string} [props.status] - draft | active | on-hold | revoked | completed | entered-in-error | unknown. Accepts all values from http://hl7.org/fhir/ValueSet/request-status|4.0.1
  * @param {Reference} [props.subject] - Patient's information
  * @param {Reference} [props.supportingInfo] - Additional clinical information
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  */
declare function serviceRequest(type: "SzLabRequest", props: ServiceRequest_SzLabRequest_Props): any;
declare function serviceRequest(type: "SzReferral", props: ServiceRequest_SzReferral_Props): any;
/**
  * Create a Specimen resource.
  * @public
  * @function
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {Identifier} [props.accessionIdentifier] - Identifier assigned by the lab
  * @param {BackboneElement} [props.collection] - Specimen collection information
  * @param {string} [props.condition] - State of the specimen. Accepts all values from http://terminology.hl7.org/ValueSet/v2-0493|3.0.0
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {BackboneElement} [props.container] - Direct container of specimen (tube/slide, etc.)
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Identifier} [props.identifier] - External Identifier
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages|4.0.1
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Annotation} [props.note] - Comments
  * @param {Reference} [props.parent] - Specimen from which this specimen originated
  * @param {BackboneElement} [props.processing] - Processing and processing step details
  * @param {dateTime} [props.receivedTime] - The time when specimen was received for processing
  * @param {Reference} [props.request] - Why the specimen was collected
  * @param {string} [props.status] - available | unavailable | unsatisfactory | entered-in-error. Accepts all values from http://hl7.org/fhir/ValueSet/specimen-status|4.0.1
  * @param {Reference} [props.subject] - Patient associated with the specimen being collected
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {string} [props.type] - Type of specimen being collected. Accepts all values from http://terminology.hl7.org/CodeSystem/v2-0487|3.0.0
  */
declare function specimen(type: "SzLabSpecimen", props: Specimen_SzLabSpecimen_Props): any;
declare function specimen(props: Specimen_SzLabSpecimen_Props): any;

export { addExtension, appointment, c, cc, coding, composite, concept, condition, encounter, episodeOfCare, ext, extendSystemMap, extendValues, extension, findExtension, id, identifier, location, lookupValue, mapSystems, mapValues, medication, medicationDispense, medicationRequest, observation, organization, patient, practitioner, procedure, ref, reference, serviceRequest, setSystemMap, setValues, specimen, value };

