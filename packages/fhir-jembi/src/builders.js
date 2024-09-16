
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import * as util from "./Utils.js";
import _ from "lodash";

export function carePlan(type, props) {
    const mappings = {
        "art-follow-up-careplan": carePlan_art_follow_up_careplan,
        "cervical-cancer-care-plan": carePlan_cervical_cancer_care_plan,
        "cotrimoxazole-preventive-therapy-careplan": carePlan_cotrimoxazole_preventive_therapy_careplan,
        "tb-treatment-careplan": carePlan_tb_treatment_careplan,
        "tpt-careplan": carePlan_tpt_careplan
    };

    return mappings[type](props)
}

function carePlan_art_follow_up_careplan(props) {
    const resource = {
        resourceType: "CarePlan"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        resource.replaces = util.reference(props.replaces);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let category = {};

            if (!_.isNil(item.id)) {
                category.id = item.id;
            } else
                {}

            if (!_.isNil(item.coding)) {
                category.coding = item.coding;
            } else
                {}

            if (!_.isNil(item.text)) {
                category.text = item.text;
            } else
                {}

            resource.category.push(category);
        }
    } else {
        resource.category = {"coding":[{"system":"http://loinc.org","code":"LP66375-4"}]};
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.contributor)) {
        resource.contributor = util.reference(props.contributor);
    }

    if (!_.isNil(props.careTeam)) {
        resource.careTeam = util.reference(props.careTeam);
    }

    if (!_.isNil(props.addresses)) {
        resource.addresses = util.reference(props.addresses);
    }

    if (!_.isNil(props.supportingInfo)) {
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.goal)) {
        resource.goal = util.reference(props.goal);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/art-follow-up-careplan"]
    };

    return resource;
}

function carePlan_cervical_cancer_care_plan(props) {
    const resource = {
        resourceType: "CarePlan"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        resource.replaces = util.reference(props.replaces);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    } else {
        resource.category = {"coding":[{"system":"http://loinc.org","code":"LP173209-0"}]};
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.contributor)) {
        resource.contributor = util.reference(props.contributor);
    }

    if (!_.isNil(props.careTeam)) {
        resource.careTeam = util.reference(props.careTeam);
    }

    if (!_.isNil(props.addresses)) {
        resource.addresses = util.reference(props.addresses);
    }

    if (!_.isNil(props.supportingInfo)) {
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.goal)) {
        resource.goal = util.reference(props.goal);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/cervical-cancer-care-plan"]
    };

    return resource;
}

function carePlan_cotrimoxazole_preventive_therapy_careplan(props) {
    const resource = {
        resourceType: "CarePlan"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        resource.replaces = util.reference(props.replaces);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let category = {};

            if (!_.isNil(item.id)) {
                category.id = item.id;
            } else
                {}

            if (!_.isNil(item.coding)) {
                category.coding = item.coding;
            } else
                {}

            if (!_.isNil(item.text)) {
                category.text = item.text;
            } else
                {}

            resource.category.push(category);
        }
    } else {
        resource.category = {"coding":[{"system":"http://loinc.org","code":"LP173209-0"}]};
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.contributor)) {
        resource.contributor = util.reference(props.contributor);
    }

    if (!_.isNil(props.careTeam)) {
        resource.careTeam = util.reference(props.careTeam);
    }

    if (!_.isNil(props.addresses)) {
        resource.addresses = util.reference(props.addresses);
    }

    if (!_.isNil(props.supportingInfo)) {
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.goal)) {
        resource.goal = util.reference(props.goal);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/cotrimoxazole-preventive-therapy-careplan"
        ]
    };

    return resource;
}

function carePlan_tb_treatment_careplan(props) {
    const resource = {
        resourceType: "CarePlan"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        resource.replaces = util.reference(props.replaces);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let category = {};

            if (!_.isNil(item.id)) {
                category.id = item.id;
            } else
                {}

            if (!_.isNil(item.coding)) {
                category.coding = item.coding;
            } else
                {}

            if (!_.isNil(item.text)) {
                category.text = item.text;
            } else
                {}

            resource.category.push(category);
        }
    } else {
        resource.category = {"coding":[{"system":"http://loinc.org","code":"LP173209-0"}]};
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.contributor)) {
        resource.contributor = util.reference(props.contributor);
    }

    if (!_.isNil(props.careTeam)) {
        resource.careTeam = util.reference(props.careTeam);
    }

    if (!_.isNil(props.addresses)) {
        resource.addresses = util.reference(props.addresses);
    }

    if (!_.isNil(props.supportingInfo)) {
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.goal)) {
        resource.goal = util.reference(props.goal);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/tb-treatment-careplan"]
    };

    return resource;
}

function carePlan_tpt_careplan(props) {
    const resource = {
        resourceType: "CarePlan"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        resource.replaces = util.reference(props.replaces);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.category)) {
        let src = props.category;
        if (!Array.isArray(src)) { src = [src]; }
        resource.category = [];

        for (let item of src) {
            let category = {};

            if (!_.isNil(item.id)) {
                category.id = item.id;
            } else
                {}

            if (!_.isNil(item.coding)) {
                category.coding = item.coding;
            } else
                {}

            if (!_.isNil(item.text)) {
                category.text = item.text;
            } else
                {}

            resource.category.push(category);
        }
    } else {
        resource.category = {"coding":[{"system":"http://loinc.org","code":"LP173209-0"}]};
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.author)) {
        resource.author = util.reference(props.author);
    }

    if (!_.isNil(props.contributor)) {
        resource.contributor = util.reference(props.contributor);
    }

    if (!_.isNil(props.careTeam)) {
        resource.careTeam = util.reference(props.careTeam);
    }

    if (!_.isNil(props.addresses)) {
        resource.addresses = util.reference(props.addresses);
    }

    if (!_.isNil(props.supportingInfo)) {
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.goal)) {
        resource.goal = util.reference(props.goal);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/tpt-careplan"]
    };

    return resource;
}