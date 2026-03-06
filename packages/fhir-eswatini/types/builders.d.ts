
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import { builders } from '@openfn/language-fhir-4';

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

declare const addExtension: (resource: any, url: any, value: any) => void;
declare const c: typeof builders.coding;
declare const cc: (codings: (builders.Coding | [string, string, Omit<builders.Coding, "code" | "system">?]) | (builders.Coding | [string, string, Omit<builders.Coding, "code" | "system">?])[], extra?: Omit<builders.CodeableConcept, "coding">) => builders.CodeableConcept;
declare const coding: typeof builders.coding;
declare const composite: (object: any, key: any, value: any) => void;
declare const concept: (codings: (builders.Coding | [string, string, Omit<builders.Coding, "code" | "system">?]) | (builders.Coding | [string, string, Omit<builders.Coding, "code" | "system">?])[], extra?: Omit<builders.CodeableConcept, "coding">) => builders.CodeableConcept;
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
  * Create a Observation resource.
  * @public
  * @function
  * @param {string} type - A profile type: one of SzCauseOfDeath,SzClinicalObservation,SzLabResult,SzMannerOfDeath,SzVitalSigns
  * @param {object} props - Properties to apply to the resource (includes common and custom properties).
  * @param {string} [props.id] - Logical id of this artifact
  * @param {Meta} [props.meta] - Metadata about the resource
  * @param {string} [props.implicitRules] - A set of rules under which this content was created
  * @param {string} [props.language] - Language of the resource content. Accepts all values from http://hl7.org/fhir/ValueSet/languages
  * @param {Narrative} [props.text] - Text summary of the resource, for human interpretation
  * @param {Resource} [props.contained] - Contained, inline Resources
  * @param {Extension} [props.extension] - Additional content defined by implementations
  * @param {Extension} [props.modifierExtension] - Extensions that cannot be ignored
  * @param {Identifier} [props.identifier] - Business Identifier for observation
  * @param {Reference} [props.basedOn] - Fulfills plan, proposal or order
  * @param {Reference} [props.partOf] - Part of referenced event
  * @param {string} [props.status] - registered | preliminary | final | amended +. Accepts all values from http://hl7.org/fhir/ValueSet/observation-status|4.0.1
  * @param {string} [props.category] - Classification of  type of observation. Accepts all values from http://hl7.org/fhir/ValueSet/observation-category
  * @param {string} [props.code] - Cause of death. Accepts all values from http://hl7.org/fhir/ValueSet/observation-codes
  * @param {Reference} [props.subject] - The decedent
  * @param {Reference} [props.focus] - What the observation is about, when it is not about the subject of record
  * @param {Reference} [props.encounter] - Healthcare event during which this observation is made
  * @param {dateTime|Period|Timing|instant} [props.effective] - Clinically relevant time/time-period for observation
  * @param {instant} [props.issued] - Date/Time this version was made available
  * @param {Reference} [props.performer] - Cause of death certifier (coroner or medical examiner)
  * @param {CodeableConcept} [props.value] - Actual result
  * @param {string} [props.dataAbsentReason] - Why the result is missing. Accepts all values from http://hl7.org/fhir/ValueSet/data-absent-reason
  * @param {string} [props.interpretation] - High, low, normal, etc.. Accepts all values from http://hl7.org/fhir/ValueSet/observation-interpretation
  * @param {Annotation} [props.note] - Comments about the observation
  * @param {string} [props.bodySite] - Observed body part. Accepts all values from http://hl7.org/fhir/ValueSet/body-site
  * @param {string} [props.method] - How it was done. Accepts all values from http://hl7.org/fhir/ValueSet/observation-methods
  * @param {Reference} [props.specimen] - Specimen used for this observation
  * @param {Reference} [props.device] - (Measurement) Device
  * @param {BackboneElement} [props.referenceRange] - Provides guide for interpretation
  * @param {Reference} [props.hasMember] - Related resource that belongs to the Observation group
  * @param {Reference} [props.derivedFrom] - Related measurements the observation is made from
  * @param {BackboneElement} [props.component] - Cause of death time interval for Intermediate, Intermediate I, Intermediat II, Underlying
  */
declare function observation(type: "SzCauseOfDeath", props: Observation_SzCauseOfDeath_Props): any;
declare function observation(type: "SzClinicalObservation", props: Observation_SzClinicalObservation_Props): any;
declare function observation(type: "SzLabResult", props: Observation_SzLabResult_Props): any;
declare function observation(type: "SzMannerOfDeath", props: Observation_SzMannerOfDeath_Props): any;
declare function observation(type: "SzVitalSigns", props: Observation_SzVitalSigns_Props): any;

export { addExtension, c, cc, coding, composite, concept, ext, extendSystemMap, extendValues, extension, findExtension, id, identifier, lookupValue, mapSystems, mapValues, observation, ref, reference, setSystemMap, setValues, value };

