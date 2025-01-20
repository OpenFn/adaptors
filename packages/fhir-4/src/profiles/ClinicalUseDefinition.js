
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "ClinicalUseDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ClinicalUseDefinition</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.contraindication)) {
        let src = props.contraindication;
        let _contraindication = {};

        if (!_.isNil(src.id)) {
            _contraindication.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _contraindication.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.diseaseSymptomProcedure)) {
            _contraindication.diseaseSymptomProcedure = src.diseaseSymptomProcedure;
        }

        if (!_.isNil(src.diseaseStatus)) {
            _contraindication.diseaseStatus = src.diseaseStatus;
        }

        if (!_.isNil(src.comorbidity)) {
            _contraindication.comorbidity = src.comorbidity;
        }

        if (!_.isNil(src.indication)) {
            _contraindication.indication = src.indication;
        }

        if (!_.isNil(src.otherTherapy)) {
            _contraindication.otherTherapy = src.otherTherapy;
        }

        resource.contraindication = _contraindication;
    }

    if (!_.isNil(props.indication)) {
        let src = props.indication;
        let _indication = {};

        if (!_.isNil(src.id)) {
            _indication.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _indication.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.diseaseSymptomProcedure)) {
            _indication.diseaseSymptomProcedure = src.diseaseSymptomProcedure;
        }

        if (!_.isNil(src.diseaseStatus)) {
            _indication.diseaseStatus = src.diseaseStatus;
        }

        if (!_.isNil(src.comorbidity)) {
            _indication.comorbidity = src.comorbidity;
        }

        if (!_.isNil(src.intendedEffect)) {
            _indication.intendedEffect = src.intendedEffect;
        }

        if (!_.isNil(src.duration)) {
            _indication.duration = src.duration;
        }

        if (!_.isNil(src.undesirableEffect)) {
            _indication.undesirableEffect = src.undesirableEffect;
        }

        resource.indication = _indication;
    }

    if (!_.isNil(props.interaction)) {
        let src = props.interaction;
        let _interaction = {};

        if (!_.isNil(src.id)) {
            _interaction.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _interaction.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.interactant)) {
            _interaction.interactant = src.interactant;
        }

        if (!_.isNil(src.type)) {
            _interaction.type = src.type;
        }

        if (!_.isNil(src.effect)) {
            _interaction.effect = src.effect;
        }

        if (!_.isNil(src.incidence)) {
            _interaction.incidence = src.incidence;
        }

        if (!_.isNil(src.management)) {
            _interaction.management = src.management;
        }

        resource.interaction = _interaction;
    }

    if (!_.isNil(props.population)) {
        if (!Array.isArray(props.population)) { props.population = [props.population]; }
        resource.population = util.reference(props.population);
    }

    if (!_.isNil(props.undesirableEffect)) {
        let src = props.undesirableEffect;
        let _undesirableEffect = {};

        if (!_.isNil(src.id)) {
            _undesirableEffect.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _undesirableEffect.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.symptomConditionEffect)) {
            _undesirableEffect.symptomConditionEffect = src.symptomConditionEffect;
        }

        if (!_.isNil(src.classification)) {
            _undesirableEffect.classification = src.classification;
        }

        if (!_.isNil(src.frequencyOfOccurrence)) {
            _undesirableEffect.frequencyOfOccurrence = src.frequencyOfOccurrence;
        }

        resource.undesirableEffect = _undesirableEffect;
    }

    if (!_.isNil(props.warning)) {
        let src = props.warning;
        let _warning = {};

        if (!_.isNil(src.id)) {
            _warning.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _warning.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.description)) {
            _warning.description = src.description;
        }

        if (!_.isNil(src.code)) {
            _warning.code = src.code;
        }

        resource.warning = _warning;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ClinicalUseDefinition"]
    };

    return resource;
}
