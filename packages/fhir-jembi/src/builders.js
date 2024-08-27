
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import { builders } from "./Utils.js";

export function encounter(type, props) {
    const mappings = {
        "entry-from-outside-target-facility-encounter": encounter_entry_from_outside_target_facility_encounter,
        "target-facility-encounter": encounter_target_facility_encounter
    };

    return mappings[type](props)
}

function encounter_entry_from_outside_target_facility_encounter(props) {
    const resource = {
        resourceType: "Encounter"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("episodeOfCare" in props) {
        resource.episodeOfCare = props.episodeOfCare;
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("appointment" in props) {
        resource.appointment = props.appointment;
    }

    if ("period" in props) {
        resource.period = props.period;
    }

    if ("reasonReference" in props) {
        resource.reasonReference = props.reasonReference;
    }

    if ("account" in props) {
        resource.account = props.account;
    }

    if ("serviceProvider" in props) {
        resource.serviceProvider = props.serviceProvider;
    } else {
        resource.serviceProvider = {"reference":"Organization/Patient.managingOrganization"};
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/entry-from-outside-target-facility-encounter"
        ]
    };

    return resource;
}

function encounter_target_facility_encounter(props) {
    const resource = {
        resourceType: "Encounter"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, "http://moh.gov.et/fhir/hiv/identifier/encounter");
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("episodeOfCare" in props) {
        resource.episodeOfCare = props.episodeOfCare;
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("appointment" in props) {
        resource.appointment = props.appointment;
    }

    if ("period" in props) {
        resource.period = props.period;
    }

    if ("reasonReference" in props) {
        resource.reasonReference = props.reasonReference;
    }

    if ("account" in props) {
        resource.account = props.account;
    }

    if ("serviceProvider" in props) {
        resource.serviceProvider = props.serviceProvider;
    } else {
        resource.serviceProvider = {"reference":"Organization/Patient.managingOrganization"};
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/target-facility-encounter"]
    };

    return resource;
}

export function patient(type, props) {
    const mappings = {
        "patient": patient_patient
    };

    return mappings[type](props)
}

function patient_patient(props) {
    const resource = {
        resourceType: "Patient"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, "http://moh.gov.et/fhir/hiv/identifier/MRN");
    }

    if ("gender" in props) {
        resource.gender = props.gender;
    }

    if ("generalPractitioner" in props) {
        resource.generalPractitioner = props.generalPractitioner;
    }

    if ("managingOrganization" in props) {
        resource.managingOrganization = props.managingOrganization;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/patient"]
    };

    return resource;
}

export function observation(type, props) {
    const mappings = {
        "active-tb-observation": observation_active_tb_observation,
        "alt-ast-observation": observation_alt_ast_observation,
        "alternate-tb-prophylaxis-type-observation": observation_alternate_tb_prophylaxis_type_observation,
        "alternate-tpt-at-follow-up-observation": observation_alternate_tpt_at_follow_up_observation,
        "art-eligibility-status-observation": observation_art_eligibility_status_observation,
        "art-followup-status-observation": observation_art_followup_status_observation,
        "art-followup-stopped-reasons-observation": observation_art_followup_stopped_reasons_observation,
        "art-not-started-plan-next-step-observation": observation_art_not_started_plan_next_step_observation,
        "arv-adherence-observation": observation_arv_adherence_observation,
        "arv-change-category-type-observation": observation_arv_change_category_type_observation,
        "arv-poor-adherence-reasons-observation": observation_arv_poor_adherence_reasons_observation,
        "arv-regimen-change-reason-observation": observation_arv_regimen_change_reason_observation,
        "arv-regimen-changed-observation": observation_arv_regimen_changed_observation,
        "arv-regimen-side-effects-observation": observation_arv_regimen_side_effects_observation,
        "assessed-for-pain-observation": observation_assessed_for_pain_observation,
        "blood-pressure": observation_blood_pressure,
        "bmi-observation": observation_bmi_observation,
        "breastfeeding-status-observation": observation_breastfeeding_status_observation,
        "cd4-absolute-observation": observation_cd4_absolute_observation,
        "cd4-percentage-observation": observation_cd4_percentage_observation,
        "cervical-cancer-screening-accepted-observation": observation_cervical_cancer_screening_accepted_observation,
        "cervical-cancer-screening-counselling-status-observation": observation_cervical_cancer_screening_counselling_status_observation,
        "cervical-cancer-screening-method-observation": observation_cervical_cancer_screening_method_observation,
        "cervical-cancer-screening-observation": observation_cervical_cancer_screening_observation,
        "cervical-cancer-screening-result-observation": observation_cervical_cancer_screening_result_observation,
        "cervical-cancer-screening-type-observation": observation_cervical_cancer_screening_type_observation,
        "cervical-cancer-treatment-received-observation": observation_cervical_cancer_treatment_received_observation,
        "children-developmental-milestone-observation": observation_children_developmental_milestone_observation,
        "confirmed-hiv-positive-observation": observation_confirmed_hiv_positive_observation,
        "cotrimoxazole-preventive-therapy-adherence-observation": observation_cotrimoxazole_preventive_therapy_adherence_observation,
        "cotrimoxazole-preventive-therapy-observation": observation_cotrimoxazole_preventive_therapy_observation,
        "counseled-for-hiv-observation": observation_counseled_for_hiv_observation,
        "creatine-observation": observation_creatine_observation,
        "current-art-duration-observation": observation_current_art_duration_observation,
        "delivery-mode-observation": observation_delivery_mode_observation,
        "delivery-place-observation": observation_delivery_place_observation,
        "differentiated-service-delivery-observation": observation_differentiated_service_delivery_observation,
        "disclosure-status-observation": observation_disclosure_status_observation,
        "edema-observation": observation_edema_observation,
        "elicited-index-case-contacts-observation": observation_elicited_index_case_contacts_observation,
        "enhanced-adherence-counselling-observation": observation_enhanced_adherence_counselling_observation,
        "estimated-delivery-date-observation": observation_estimated_delivery_date_observation,
        "family-member-hiv-status-observation": observation_family_member_hiv_status_observation,
        "family-planning-method-observation": observation_family_planning_method_observation,
        "fluconazole-preventive-therapy-observation": observation_fluconazole_preventive_therapy_observation,
        "future-pregnancy-plans-observation": observation_future_pregnancy_plans_observation,
        "generic-observation": observation_generic_observation,
        "head-circumference-observation": observation_head_circumference_observation,
        "health-status-observation": observation_health_status_observation,
        "heart-rate-observation": observation_heart_rate_observation,
        "height-observation": observation_height_observation,
        "hgb-observation": observation_hgb_observation,
        "highest-education-observation": observation_highest_education_observation,
        "hiv-prevention-plan-observation": observation_hiv_prevention_plan_observation,
        "hiv-program-final-outcome-known-observation": observation_hiv_program_final_outcome_known_observation,
        "hiv-program-final-outcome-observation": observation_hiv_program_final_outcome_observation,
        "hiv-program-reason-art-not-started-observation": observation_hiv_program_reason_art_not_started_observation,
        "hiv-program-status-observation": observation_hiv_program_status_observation,
        "hiv-status-disclosure-at-enrollment-observation": observation_hiv_status_disclosure_at_enrollment_observation,
        "hiv-test-results-observation": observation_hiv_test_results_observation,
        "hiv-treatment-prior-enrollment-observation": observation_hiv_treatment_prior_enrollment_observation,
        "inh-at-follow-up-observation": observation_inh_at_follow_up_observation,
        "last-menstrual-period-observation": observation_last_menstrual_period_observation,
        "level-of-pain-observation": observation_level_of_pain_observation,
        "maternal-hiv-status-observation": observation_maternal_hiv_status_observation,
        "muac-observation": observation_muac_observation,
        "nutritional-screening-result-observation": observation_nutritional_screening_result_observation,
        "nutritional-status-observation": observation_nutritional_status_observation,
        "nutritional-suppliments-provided-observation": observation_nutritional_suppliments_provided_observation,
        "otz-observation": observation_otz_observation,
        "patient-functional-status-observation": observation_patient_functional_status_observation,
        "patient-occupation-observation": observation_patient_occupation_observation,
        "patient-who-stage-observation": observation_patient_who_stage_observation,
        "physical-examinations-observation": observation_physical_examinations_observation,
        "pregnancy-status-observation": observation_pregnancy_status_observation,
        "presenting-symptom-observation": observation_presenting_symptom_observation,
        "reason-eligible-for-art-observation": observation_reason_eligible_for_art_observation,
        "reason-not-eligbile-for-tpt-observation": observation_reason_not_eligbile_for_tpt_observation,
        "resides-in-catchment-area-observation": observation_resides_in_catchment_area_observation,
        "respiratory-rate-observation": observation_respiratory_rate_observation,
        "screened-for-tb-observation": observation_screened_for_tb_observation,
        "target-population-observation": observation_target_population_observation,
        "tb-diagnostic-test-result-observation": observation_tb_diagnostic_test_result_observation,
        "tb-prophylaxis-type-observation": observation_tb_prophylaxis_type_observation,
        "tb-screening-result-observation": observation_tb_screening_result_observation,
        "tb-treatment-started-observation": observation_tb_treatment_started_observation,
        "tb-treatment-status-observation": observation_tb_treatment_status_observation,
        "temperature-observation": observation_temperature_observation,
        "tested-for-hiv-observation": observation_tested_for_hiv_observation,
        "therapeutic-supplementary-food-observation": observation_therapeutic_supplementary_food_observation,
        "tpt-eligbility-observation": observation_tpt_eligbility_observation,
        "tpt-started-observation": observation_tpt_started_observation,
        "treatment-completed-observation": observation_treatment_completed_observation,
        "treatment-discontinued-observation": observation_treatment_discontinued_observation,
        "viral-load-count-observation": observation_viral_load_count_observation,
        "viral-load-indication-observation": observation_viral_load_indication_observation,
        "viral-load-performed-observation": observation_viral_load_performed_observation,
        "weight-observation": observation_weight_observation
    };

    return mappings[type](props)
}

function observation_active_tb_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/active-tb-observation"]
    };

    return resource;
}

function observation_alt_ast_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/alt-ast-observation"]
    };

    return resource;
}

function observation_alternate_tb_prophylaxis_type_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/alternate-tb-prophylaxis-type-observation"
        ]
    };

    return resource;
}

function observation_alternate_tpt_at_follow_up_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/alternate-tpt-at-follow-up-observation"
        ]
    };

    return resource;
}

function observation_art_eligibility_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/art-eligibility-status-observation"
        ]
    };

    return resource;
}

function observation_art_followup_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/art-followup-status-observation"
        ]
    };

    return resource;
}

function observation_art_followup_stopped_reasons_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/art-followup-stopped-reasons-observation"
        ]
    };

    return resource;
}

function observation_art_not_started_plan_next_step_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/art-not-started-plan-next-step-observation"
        ]
    };

    return resource;
}

function observation_arv_adherence_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/arv-adherence-observation"]
    };

    return resource;
}

function observation_arv_change_category_type_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-change-category-type-observation"
        ]
    };

    return resource;
}

function observation_arv_poor_adherence_reasons_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-poor-adherence-reasons-observation"
        ]
    };

    return resource;
}

function observation_arv_regimen_change_reason_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-regimen-change-reason-observation"
        ]
    };

    return resource;
}

function observation_arv_regimen_changed_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-regimen-changed-observation"
        ]
    };

    return resource;
}

function observation_arv_regimen_side_effects_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-regimen-side-effects-observation"
        ]
    };

    return resource;
}

function observation_assessed_for_pain_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/assessed-for-pain-observation"
        ]
    };

    return resource;
}

function observation_blood_pressure(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/blood-pressure"]
    };

    return resource;
}

function observation_bmi_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/bmi-observation"]
    };

    return resource;
}

function observation_breastfeeding_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/breastfeeding-status-observation"
        ]
    };

    return resource;
}

function observation_cd4_absolute_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/cd4-absolute-observation"]
    };

    return resource;
}

function observation_cd4_percentage_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cd4-percentage-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_accepted_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-accepted-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_counselling_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-counselling-status-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_method_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-method-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_result_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-result-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_screening_type_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-screening-type-observation"
        ]
    };

    return resource;
}

function observation_cervical_cancer_treatment_received_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-treatment-received-observation"
        ]
    };

    return resource;
}

function observation_children_developmental_milestone_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/children-developmental-milestone-observation"
        ]
    };

    return resource;
}

function observation_confirmed_hiv_positive_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/confirmed-hiv-positive-observation"
        ]
    };

    return resource;
}

function observation_cotrimoxazole_preventive_therapy_adherence_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cotrimoxazole-preventive-therapy-adherence-observation"
        ]
    };

    return resource;
}

function observation_cotrimoxazole_preventive_therapy_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cotrimoxazole-preventive-therapy-observation"
        ]
    };

    return resource;
}

function observation_counseled_for_hiv_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/counseled-for-hiv-observation"
        ]
    };

    return resource;
}

function observation_creatine_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/creatine-observation"]
    };

    return resource;
}

function observation_current_art_duration_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/current-art-duration-observation"
        ]
    };

    return resource;
}

function observation_delivery_mode_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/delivery-mode-observation"]
    };

    return resource;
}

function observation_delivery_place_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/delivery-place-observation"
        ]
    };

    return resource;
}

function observation_differentiated_service_delivery_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/differentiated-service-delivery-observation"
        ]
    };

    return resource;
}

function observation_disclosure_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/disclosure-status-observation"
        ]
    };

    return resource;
}

function observation_edema_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/edema-observation"]
    };

    return resource;
}

function observation_elicited_index_case_contacts_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/elicited-index-case-contacts-observation"
        ]
    };

    return resource;
}

function observation_enhanced_adherence_counselling_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/enhanced-adherence-counselling-observation"
        ]
    };

    return resource;
}

function observation_estimated_delivery_date_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/estimated-delivery-date-observation"
        ]
    };

    return resource;
}

function observation_family_member_hiv_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/family-member-hiv-status-observation"
        ]
    };

    return resource;
}

function observation_family_planning_method_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/family-planning-method-observation"
        ]
    };

    return resource;
}

function observation_fluconazole_preventive_therapy_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/fluconazole-preventive-therapy-observation"
        ]
    };

    return resource;
}

function observation_future_pregnancy_plans_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/future-pregnancy-plans-observation"
        ]
    };

    return resource;
}

function observation_generic_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/generic-observation"]
    };

    return resource;
}

function observation_head_circumference_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/head-circumference-observation"
        ]
    };

    return resource;
}

function observation_health_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/health-status-observation"]
    };

    return resource;
}

function observation_heart_rate_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/heart-rate-observation"]
    };

    return resource;
}

function observation_height_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/height-observation"]
    };

    return resource;
}

function observation_hgb_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/hgb-observation"]
    };

    return resource;
}

function observation_highest_education_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/highest-education-observation"
        ]
    };

    return resource;
}

function observation_hiv_prevention_plan_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-prevention-plan-observation"
        ]
    };

    return resource;
}

function observation_hiv_program_final_outcome_known_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-program-final-outcome-known-observation"
        ]
    };

    return resource;
}

function observation_hiv_program_final_outcome_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-program-final-outcome-observation"
        ]
    };

    return resource;
}

function observation_hiv_program_reason_art_not_started_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-program-reason-art-not-started-observation"
        ]
    };

    return resource;
}

function observation_hiv_program_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-program-status-observation"
        ]
    };

    return resource;
}

function observation_hiv_status_disclosure_at_enrollment_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-status-disclosure-at-enrollment-observation"
        ]
    };

    return resource;
}

function observation_hiv_test_results_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-test-results-observation"
        ]
    };

    return resource;
}

function observation_hiv_treatment_prior_enrollment_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/hiv-treatment-prior-enrollment-observation"
        ]
    };

    return resource;
}

function observation_inh_at_follow_up_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/inh-at-follow-up-observation"
        ]
    };

    return resource;
}

function observation_last_menstrual_period_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/last-menstrual-period-observation"
        ]
    };

    return resource;
}

function observation_level_of_pain_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/level-of-pain-observation"]
    };

    return resource;
}

function observation_maternal_hiv_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/maternal-hiv-status-observation"
        ]
    };

    return resource;
}

function observation_muac_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/muac-observation"]
    };

    return resource;
}

function observation_nutritional_screening_result_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/nutritional-screening-result-observation"
        ]
    };

    return resource;
}

function observation_nutritional_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/nutritional-status-observation"
        ]
    };

    return resource;
}

function observation_nutritional_suppliments_provided_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/nutritional-suppliments-provided-observation"
        ]
    };

    return resource;
}

function observation_otz_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/otz-observation"]
    };

    return resource;
}

function observation_patient_functional_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/patient-functional-status-observation"
        ]
    };

    return resource;
}

function observation_patient_occupation_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/patient-occupation-observation"
        ]
    };

    return resource;
}

function observation_patient_who_stage_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/patient-who-stage-observation"
        ]
    };

    return resource;
}

function observation_physical_examinations_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/physical-examinations-observation"
        ]
    };

    return resource;
}

function observation_pregnancy_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/pregnancy-status-observation"
        ]
    };

    return resource;
}

function observation_presenting_symptom_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/presenting-symptom-observation"
        ]
    };

    return resource;
}

function observation_reason_eligible_for_art_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/reason-eligible-for-art-observation"
        ]
    };

    return resource;
}

function observation_reason_not_eligbile_for_tpt_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/reason-not-eligbile-for-tpt-observation"
        ]
    };

    return resource;
}

function observation_resides_in_catchment_area_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/resides-in-catchment-area-observation"
        ]
    };

    return resource;
}

function observation_respiratory_rate_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/respiratory-rate-observation"
        ]
    };

    return resource;
}

function observation_screened_for_tb_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/screened-for-tb-observation"
        ]
    };

    return resource;
}

function observation_target_population_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/target-population-observation"
        ]
    };

    return resource;
}

function observation_tb_diagnostic_test_result_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tb-diagnostic-test-result-observation"
        ]
    };

    return resource;
}

function observation_tb_prophylaxis_type_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tb-prophylaxis-type-observation"
        ]
    };

    return resource;
}

function observation_tb_screening_result_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tb-screening-result-observation"
        ]
    };

    return resource;
}

function observation_tb_treatment_started_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tb-treatment-started-observation"
        ]
    };

    return resource;
}

function observation_tb_treatment_status_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tb-treatment-status-observation"
        ]
    };

    return resource;
}

function observation_temperature_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/temperature-observation"]
    };

    return resource;
}

function observation_tested_for_hiv_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tested-for-hiv-observation"
        ]
    };

    return resource;
}

function observation_therapeutic_supplementary_food_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/therapeutic-supplementary-food-observation"
        ]
    };

    return resource;
}

function observation_tpt_eligbility_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/tpt-eligbility-observation"
        ]
    };

    return resource;
}

function observation_tpt_started_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/tpt-started-observation"]
    };

    return resource;
}

function observation_treatment_completed_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/treatment-completed-observation"
        ]
    };

    return resource;
}

function observation_treatment_discontinued_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/treatment-discontinued-observation"
        ]
    };

    return resource;
}

function observation_viral_load_count_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/viral-load-count-observation"
        ]
    };

    return resource;
}

function observation_viral_load_indication_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/viral-load-indication-observation"
        ]
    };

    return resource;
}

function observation_viral_load_performed_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/viral-load-performed-observation"
        ]
    };

    return resource;
}

function observation_weight_observation(props) {
    const resource = {
        resourceType: "Observation"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("focus" in props) {
        resource.focus = props.focus;
    }

    if ("encounter" in props) {
        resource.encounter = props.encounter;
    }

    if ("performer" in props) {
        resource.performer = props.performer;
    }

    if ("specimen" in props) {
        resource.specimen = props.specimen;
    }

    if ("device" in props) {
        resource.device = props.device;
    }

    if ("hasMember" in props) {
        resource.hasMember = props.hasMember;
    }

    if ("derivedFrom" in props) {
        resource.derivedFrom = props.derivedFrom;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/weight-observation"]
    };

    return resource;
}