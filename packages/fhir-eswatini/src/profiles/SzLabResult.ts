
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Observation_SzLabResult_Props = {
    authorizer?: FHIR.Extension[];
    basedOn?: FHIR.Reference[];
    bodySite?: FHIR.CodeableConcept;
    category?: FHIR.CodeableConcept[];
    code?: "NIT" | "UG" | "UP" | "UPH" | "UBILI" | "UKET" | "ULEST" | "N/A" | "#BAND" | "#BASO" | "#EOS" | "#IG" | "#LYM" | "#META" | "#MONO" | "#MYEL" | "#NEUT" | "#PROM" | "%BJP" | "%BSAT" | "%HBA1" | "%SAT" | "17AHQ" | "1ST" | "2ND" | "A1ATR" | "A1CEL" | "A2CEL" | "ABAC" | "ABNO" | "ABO" | "ABRH" | "ABRH1" | "ABRH2" | "ABRH3" | "ABRH4" | "ACA" | "ACAS" | "ACEA" | "ACEAB" | "ACLA" | "ACLAG" | "ACLAM" | "ACOLA" | "ACTH" | "ACTHI" | "ACTHO" | "ADATE" | "ADENO" | "ADNA" | "ADNAM" | "ADNAR" | "ADNAS" | "AFB" | "AFP" | "AGHT" | "AHE" | "AHEAL" | "AHG" | "AK" | "AK1" | "ALDOQ" | "ALDOS" | "AMC" | "AMIK" | "AMITA" | "AMITT" | "AMOX" | "AMOX1" | "AMP" | "AMPHE" | "AMPIC" | "ANAH" | "ANCN" | "ANCP" | "ANDRS" | "ANION" | "ANTAB" | "ANTIA" | "ANTIB" | "ANTID" | "APCA" | "APP" | "APPEA" | "APPET" | "APPF" | "APPS" | "APTC" | "APTT" | "ARTN" | "ARTTX" | "ARVID" | "ARVO" | "ARVO1" | "ARVO2" | "ARVO3" | "ARVS" | "ARVT1" | "ARVT2" | "ARVT3" | "ASKMA" | "ASL" | "ASMA" | "ASOT" | "ASPR" | "AST" | "AUG" | "AUG1" | "B2GPG" | "B2GPM" | "BACET" | "BACT" | "SALB" | "BAND#" | "BAND%" | "BARB" | "BARES" | "BASA#" | "BASA%" | "BASO#" | "BASO%" | "BAUTO" | "BBCOM" | "BBTXT" | "BCEL" | "BCULT" | "BE" | "BENZO" | "BENZV" | "BG" | "BHCG2" | "BIOCH" | "BIRON" | "BLST#" | "BLST%" | "BMTXT" | "BPH" | "BPROC" | "BREAS" | "BROMS" | "BS1" | "BS2" | "BSA" | "BSCR1" | "BSCR2" | "BSCR3" | "BTFN" | "BTIME" | "BTNP" | "BTYPE" | "BUA" | "BV" | "C125B" | "C15-3" | "C1EI" | "C1ESC" | "C1ESI" | "C3" | "C4" | "C6" | "CA199" | "CA724" | "CABCO" | "CABFL" | "CABVA" | "CACOR" | "CAERU" | "CALCL" | "CALCN" | "CALCO" | "CANN" | "CANNQ" | "CAPIL" | "CAPP" | "CARB" | "CAREH" | "CASTS" | "CATSC" | "CATSO" | "CBAC" | "CCL" | "CCLEA" | "CCNT" | "CCOM" | "CCON" | "CCOO" | "CCREM" | "CCULT" | "CD3" | "CD3L" | "CD4" | "CD45" | "CD4L" | "CD8" | "CD8L" | "CEFAZ" | "CEFO1" | "CEFOT" | "CEFOX" | "CEFTA" | "CEPHA" | "CEPHR" | "CERYT" | "CGLOB" | "CGLU" | "CHEMC" | "CHEMF" | "CHEMH" | "CHEMO" | "CHEMU" | "CHILD" | "CHIST" | "CHLDN" | "CHLET" | "CHLLV" | "CHLO1" | "CHLOG" | "CHLOR" | "CHLPN" | "CHLPS" | "CHLTR" | "CHM" | "CHR" | "CIPR1" | "CIPRO" | "CLAR" | "CLIND" | "CLOD" | "CLODA" | "CLTR" | "CLTRE" | "CLUE" | "CMGFL" | "CMGVA" | "CMMFL" | "CMMVA" | "COCAI" | "COL" | "COLI" | "COLM" | "COM" | "COMAL" | "COMCL" | "CONCE" | "CONSE" | "COOMB" | "CORWC" | "COTR" | "COTR1" | "COTRI" | "COUN" | "COXVI" | "CPEP2" | "CPROT" | "CRES" | "CRINK" | "CRO" | "CROSM" | "CRP" | "CRPS" | "CRPT" | "CRYLF" | "CRYP" | "CRYST" | "CRYTI" | "CSOB" | "CTIME" | "CTITR" | "CTX" | "CTXT" | "CUTC" | "CUTP" | "CUTS" | "CWBC" | "CWTX" | "CYADE" | "CYADH" | "CYBGH" | "CYBGR" | "CYCYT" | "CYINF" | "CYINH" | "CYINT" | "CYNAH" | "CYNAT" | "CYNFH" | "CYNTH" | "CYRCH" | "CYREC" | "CYSS" | "CYSTS" | "CYTC" | "CYTCH" | "CYTLA" | "CYTLM" | "CYTNA" | "CYTPA" | "CYTPR" | "CYTTY" | "CYTXT" | "DATEP" | "DATEQ" | "DATER" | "DATET" | "DCC3" | "DCC3C" | "DCC3T" | "DCEA" | "DCIGA" | "DCIGG" | "DCIGM" | "DCIGT" | "DCOOH" | "DCOOM" | "DCOT" | "DCRT" | "DDATE" | "DDIME" | "DEATH" | "DHEAS" | "DIAMT" | "DIBN" | "DID" | "DIDA" | "DIFCN" | "DIGO2" | "DIGOX" | "DOA" | "DONG" | "DONN" | "DOXY" | "DOXY1" | "DPROT" | "DRSNO" | "DRTH" | "DRUGI" | "DTIME" | "DUR" | "DUVMA" | "E2" | "E2C" | "EBREA" | "ECOTH" | "ECOTR" | "ECURR" | "EDNAP" | "EEC" | "EFAVI" | "EGFRI" | "EIDCM" | "EIDCN" | "EIDCP" | "EIFS" | "EIFY" | "EMTRI" | "ENVPB" | "ENVPS" | "ENZYM" | "EOS#" | "EOS%" | "EOSA#" | "EOSA%" | "EOTHE" | "EPI" | "EPRE" | "EPRED" | "EPRER" | "EPRES" | "EQAC1" | "EQAC2" | "EQAC3" | "EQAC4" | "EQAC5" | "EQAHS" | "EQAHU" | "EQAMT" | "EQAN2" | "EQAN3" | "EQANP" | "EQAR1" | "EQAR2" | "EQAR3" | "EQAR4" | "EQAR5" | "EQAS1" | "EQAS2" | "EQASC" | "EQCAB" | "EQCAC" | "EQCDI" | "EQCLM" | "EQCPC" | "EQHCT" | "EQHGB" | "EQHPC" | "EQHPE" | "EQHPK" | "EQHPM" | "EQHSD" | "EQHST" | "EQMCH" | "EQMCN" | "EQMCV" | "EQMF2" | "EQMF3" | "EQMFA" | "EQMIC" | "EQMPC" | "EQPF" | "EQPLT" | "EQPO" | "EQRBC" | "EQRDW" | "EQSED" | "EQSLN" | "EQSP1" | "EQSP2" | "EQSP3" | "EQSS1" | "EQSS2" | "EQSS3" | "EQSS4" | "EQSS5" | "EQSS6" | "EQST" | "EQSTM" | "EQWB2" | "EQWB3" | "EQWBC" | "EQWC2" | "EQWC3" | "EQWCC" | "EREGA" | "ERSLT" | "ERTP" | "ERY" | "ERY1" | "ERYT" | "ERYTH" | "ESR" | "ESTBR" | "ESTOB" | "ETRAV" | "EXHYS" | "EXPD" | "EXSTD" | "FCLI" | "FEP" | "FERM2" | "FERM3" | "FERR" | "FERRM" | "FERRR" | "FERRX" | "FERX2" | "FHYS" | "FILAG" | "FINR" | "FLN" | "FLQNS" | "FOB" | "FPORI" | "FPORQ" | "FPROT" | "FRF" | "FROTA" | "FSHC" | "F-T3" | "F-T4" | "FUNGI" | "FWBC" | "G6PD" | "G6PDS" | "GCLUE" | "GCPRD" | "GELNO" | "GENO" | "GENT" | "GENT1" | "GENTA" | "GERMT" | "GL120" | "GL150" | "GL180" | "GL210" | "GL240" | "GL270" | "GL30" | "GL300" | "GL360" | "GL480" | "GL60" | "GL90" | "GLOB" | "GLUCS" | "GNB" | "GNC" | "GNCB" | "GNDC" | "GNPB" | "GPB" | "GPBB" | "GPC" | "GPCC" | "GPCCL" | "GPCP" | "GPDC" | "GPFB" | "GRAMS" | "GREPI" | "GRERY" | "GRWC" | "GTBA" | "GTDOS" | "GTXT" | "GVC" | "GVINC" | "GXRIF" | "GXTB" | "GXTBR" | "H2RL" | "H2VRS" | "HAEM" | "HAEMI" | "HAUTO" | "HBA" | "HBA1" | "HBA1C" | "HBA2" | "HBA2D" | "HBF1" | "HBFD" | "HBH" | "HBSB1" | "HBU" | "HCBCO" | "HCBFL" | "HCBVA" | "HCG" | "HCGS" | "HCO3" | "HCOM" | "HCT" | "HEAL" | "HELPV" | "HELPY" | "HEPD" | "HEPE" | "HERG1" | "HERG2" | "HERPG" | "HERPM" | "HFLU" | "HGB" | "HGH" | "HISTD" | "HISTS" | "HISTT" | "HIV-1" | "HIVA" | "HIVAR" | "HIVBL" | "HIVBR" | "HIVCO" | "HIVD" | "HIVE" | "HIVL" | "HIVL2" | "HIVLA" | "HIVLC" | "HIVLL" | "HIVML" | "HIVP" | "HIVPC" | "HIVPL" | "HIVPR" | "HIVQL" | "HIVR" | "HIVRL" | "HIVRT" | "HIVSI" | "HIVTL" | "HIVTM" | "HIVU" | "HIVVA" | "HIVVB" | "HIVVC" | "HIVVD" | "HIVVM" | "HIVVP" | "HIVVQ" | "HIVVR" | "HLAXB" | "HLB27" | "HPRL" | "HSVG" | "HSVM" | "HT" | "HTSTB" | "HTXT" | "HVVRS" | "HYS0H" | "HYS6H" | "HYSIN" | "HYSUH" | "ICD10" | "ICOM" | "ICOOH" | "ICOOM" | "ICT" | "IG#" | "IGA" | "IHYS" | "IMFIX" | "IMI" | "IMMA" | "IMMSP" | "INCLU" | "INJCS" | "INK" | "INR" | "INTXT" | "IPROT" | "IS" | "ISI" | "ITIME" | "ITITR" | "ITXT" | "IV" | "JRF" | "LA1:2" | "LA1NP" | "LA2NP" | "LACTT" | "LAMIV" | "LCHOL" | "LCRYP" | "LEUCO" | "LHC" | "LI" | "LINE0" | "LINE1" | "LISS" | "LJDAT" | "LJDT" | "LJRES" | "LLA1" | "LLA2" | "LN1:2" | "LPRIF" | "LSD" | "LTIME" | "LUPN" | "LUPP" | "LYM#" | "LYM%" | "LYMA%" | "LYMP" | "MAAG" | "MACS" | "MAL" | "MALF" | "MALRT" | "MALTH" | "MAPP" | "MASS" | "MBILH" | "MCEA" | "MCH" | "MCHC" | "MCM2" | "MCOM" | "MCV" | "MEASG" | "MEASM" | "MEM" | "MET" | "META#" | "META%" | "METH" | "METHD" | "METQ" | "MFIL" | "MGMSA" | "MGMSB" | "MGMSC" | "MGMSD" | "MGMSE" | "MGMSF" | "MGSMH" | "MGSRH" | "MGSSA" | "MGSSB" | "MGSSC" | "MGSSD" | "MGSSE" | "MGSSF" | "MHEAD" | "MIC" | "MICH" | "MICIN" | "MICRE" | "MICRO" | "MLDL" | "MLEUD" | "MMACR" | "MOART" | "MON" | "MONA#" | "MONA%" | "MONO" | "MONO#" | "MONO%" | "MONTH" | "MORPH" | "MOTIL" | "MPCR" | "MPROT" | "MPV" | "M-TP" | "MTRIC" | "MTXT" | "MTZ" | "MUCUS" | "MUMPG" | "MUMPM" | "MUP" | "MXD#" | "MXD%" | "MYCH" | "MYCUL" | "MYEAS" | "MYEL#" | "MYEL%" | "MYGIE" | "MYGT" | "MYKIN" | "MYMIC" | "MYOG" | "MYPAS" | "MZNS" | "NALID" | "NEI" | "NEICO" | "NEUA#" | "NEUA%" | "NEUT#" | "NEUT%" | "NEVI" | "NITR" | "NITRO" | "NNRTI" | "NONNU" | "NORM" | "NOS" | "NRBC" | "NRTIR" | "NUCLE" | "OB" | "OCEA" | "OCEL" | "OOCYS" | "OPIAT" | "ORGS" | "ORGSV" | "ORGSW" | "ORGSX" | "ORGSY" | "OSAT" | "OTERM" | "OTHER" | "OTHR#" | "OTHR%" | "OVA" | "OVA1" | "OVA2" | "OWCC" | "OX19" | "OX2" | "OXAC1" | "OXACI" | "OXK" | "P/N" | "PADIS" | "PAN" | "PARAC" | "PARAS" | "PARS" | "PATH" | "PATHH" | "PATT" | "PB/CR" | "PBNP" | "PCO2" | "PCRAP" | "PCRH" | "PCRQ" | "PCRR" | "PCTR" | "PCULT" | "PCV" | "PDBIL" | "PDW" | "PEN" | "PENG" | "PENG1" | "PER" | "PFAL" | "PGRP" | "PH" | "PHB" | "PHD" | "PHENB" | "PHENC" | "PHENY" | "PHN" | "PHT" | "PHTXT" | "PHYS" | "PHYS0" | "PHYS6" | "PHYSU" | "PIPER" | "PLAC" | "PLT" | "PLTAB" | "PMTCH" | "PMTMO" | "PNEUM" | "PO/CR" | "PO2" | "POCVR" | "POLI1" | "POLI2" | "POLI3" | "POLY" | "POLYM" | "PORL" | "PREG" | "PRLC" | "PROGC" | "PROM#" | "PROM%" | "PROTC" | "PROTS" | "PRTCF" | "PSA" | "PSCHE" | "PSHY" | "PSTD0" | "PSTD6" | "PSTDU" | "PT" | "PTBIL" | "PTC" | "PTH" | "PTHA" | "PTHM" | "PTHP" | "PTTR" | "PVIV" | "QBAS%" | "QCD3" | "QCD3L" | "QCD4" | "QCD4L" | "QCD8" | "QCD8L" | "QCWBC" | "QEOS%" | "QHBG" | "QHCG" | "QHRG" | "QLYM%" | "QMCHC" | "QMON%" | "QNEU%" | "QPEHE" | "QRPR1" | "QRPRT" | "QRPRW" | "RAPI2" | "RATIO" | "RBC" | "RBCA" | "RCC" | "RCCHE" | "RCELU" | "RCOM" | "RDW" | "RECR" | "REJCT" | "REM" | "RENIC" | "REQTS" | "RESLT" | "RETA" | "RETIC" | "RETM" | "RF" | "RF13" | "RF14" | "RF2" | "RF3" | "RF4" | "RF8" | "RFQM" | "RFR" | "RFT" | "RG" | "RGLU" | "RH" | "RHAB" | "RHABC" | "RHABI" | "RHABT" | "RHNEG" | "RIFTB" | "RILPI" | "RINHS" | "RJREA" | "RJREM" | "ROTA" | "ROTAG" | "ROTRT" | "RPCR" | "RPI" | "RPR1" | "RPRT" | "RPRW" | "RRF1" | "RRF4" | "RTTBP" | "RUGFL" | "RUGT" | "RUMFL" | "RUMT" | "SABCO" | "SABFL" | "SABNI" | "SABVA" | "SACE" | "SACT2" | "SACTH" | "SADA" | "SAGCO" | "SAGFL" | "SAGVA" | "SALC" | "SALHT" | "SALP" | "SALT" | "SAMY" | "SAPP" | "SAST" | "SIBIL" | "SCHOL" | "SCK2" | "SCKMB" | "SCO2" | "SCORT" | "SCOUN" | "SCRN" | "SCRT" | "SDBIL" | "SERY" | "SGGT" | "SGLU" | "SHDL" | "SIRON" | "SK" | "SLDH" | "SLDL" | "SLGIE" | "SLPAP" | "SMG" | "SMOT2" | "SMOT3" | "SMOT6" | "SMOTI" | "SMYO" | "SNA" | "SNPP" | "SPEM" | "SPH" | "SPO4" | "SRATE" | "SSMEL" | "STACP" | "STBIL" | "STP" | "STRIG" | "SUREA" | "SVISC" | "SVITA" | "SVOL" | "SWBC" | "TBADT" | "TBAMI" | "TBAR1" | "TBAR2" | "TBARM" | "TBBAC" | "TBBCM" | "TBBDT" | "TBC1D" | "TBCLO" | "TBCN1" | "TBETM" | "TBINH" | "TBLEV" | "TBMOF" | "TBODT" | "TBORG" | "TBP-A" | "TBRCM" | "TBRIF" | "TBRP" | "TEST" | "TETRA" | "THSR" | "TMP" | "TPHA" | "TROP" | "TROPI" | "TRYP" | "TS" | "TSH" | "TWBCC" | "TXMFL" | "TZP" | "UAMY" | "UBACT" | "UBL" | "UCRT" | "UHB" | "UMA" | "UMAER" | "UPREG" | "USG" | "UUBGN" | "UVOL" | "VALPR" | "VANCO" | "VCULT" | "VDRLS" | "VDRLT" | "VEPI" | "VGLU" | "VITD" | "VOL" | "VZG" | "WBACT" | "WBC" | "WDU" | "WEPI" | "WERY" | "WET" | "WFH" | "WPSHY" | "WWBC" | "WYST" | "XGLUC" | "YEAST" | "ZIN" | "COV19" | "CVCOM" | "CA15-3" | "SCA" | "SCL" | "XMATC" | "!GXMT" | "SUA" | "SUAA" | "VCRT" | "DLM" | "LZD" | "BDQ" | "TBETH" | "TBISO" | "TBZCM" | "TBZDT" | "TBZH" | "TBZN" | "TBZNI" | "TBLIN" | "WBCA" | "SALTH" | "SALOT" | "LYMA#" | "CVRP" | "CT" | "NG" | "RCHOL" | "DSYTP" | "TBAU" | "TBCM" | "TBRI2" | "TBMOX" | "TBSF" | "TBLP" | "HIVPS" | "PSC2" | "PSCD" | "SCOM";
    component?: FHIR.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: FHIR.CodeableConcept;
    derivedFrom?: FHIR.Reference[];
    device?: FHIR.Reference;
    effective?: string | FHIR.Period | FHIR.Timing;
    encounter?: FHIR.Reference;
    extension?: FHIR.Extension[];
    focus?: FHIR.Reference[];
    hasMember?: FHIR.Reference[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    interpretation?: FHIR.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: FHIR.Meta;
    method?: FHIR.CodeableConcept;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    partOf?: FHIR.Reference[];
    performer?: FHIR.Reference[];
    referenceRange?: FHIR.BackboneElement[];
    specimen?: FHIR.Reference;
    status?: string;
    subject?: FHIR.Reference;
    testingLaboratory?: FHIR.Reference[];
    text?: FHIR.Narrative;
    value?: FHIR.Quantity | FHIR.CodeableConcept | string | boolean | number | FHIR.Range | FHIR.Ratio | FHIR.SampledData | FHIR.Period;
    [key: string]: any;
};

export default function(props: Partial<Observation_SzLabResult_Props>) {
    const resource = {
        resourceType: "Observation",
        ...props
    };

    if (!_.isNil(props.authorizer)) {
        let src = props.authorizer;
        delete resource.authorizer;

        dt.addExtension(
            resource,
            "http://172.209.216.154:3447/fhir/StructureDefinition/SzAuthorizerExtension",
            src
        );
    }

    if (!_.isNil(props.testingLaboratory)) {
        let src = props.testingLaboratory;
        delete resource.testingLaboratory;

        dt.addExtension(
            resource,
            "http://172.209.216.154:3447/fhir/StructureDefinition/SzTestingLabExtension",
            src
        );
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = dt.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        delete resource.effective;
        dt.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        delete resource.value;
        dt.composite(resource, "value", props.value);
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = dt.concept(props.dataAbsentReason);
    }

    if (!_.isNil(props.interpretation)) {
        if (!Array.isArray(props.interpretation)) { props.interpretation = [props.interpretation]; }
        resource.interpretation = dt.concept(props.interpretation);
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = dt.concept(props.bodySite);
    }

    if (!_.isNil(props.method)) {
        resource.method = dt.concept(props.method);
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = dt.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {
                ...item
            };

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = dt.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = dt.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {
                ...item
            };

            resource.component.push(_component);
        }
    }

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
