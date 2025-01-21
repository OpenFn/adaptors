
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "SubstanceDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SubstanceDefinition</b></p></div>"
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
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.classification)) {
        resource.classification = props.classification;
    }

    if (!_.isNil(props.domain)) {
        resource.domain = props.domain;
    }

    if (!_.isNil(props.grade)) {
        resource.grade = props.grade;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.informationSource)) {
        if (!Array.isArray(props.informationSource)) { props.informationSource = [props.informationSource]; }
        resource.informationSource = dt.reference(props.informationSource);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.supplier)) {
        if (!Array.isArray(props.supplier)) { props.supplier = [props.supplier]; }
        resource.supplier = dt.reference(props.supplier);
    }

    if (!_.isNil(props.moiety)) {
        let src = props.moiety;
        if (!Array.isArray(src)) { src = [src]; }
        resource.moiety = [];

        for (let item of src) {
            let _moiety = {};

            if (!_.isNil(item.id)) {
                _moiety.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _moiety.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.role)) {
                _moiety.role = item.role;
            }

            if (!_.isNil(item.identifier)) {
                _moiety.identifier = item.identifier;
            }

            if (!_.isNil(item.name)) {
                _moiety.name = item.name;
            }

            if (!_.isNil(item.stereochemistry)) {
                _moiety.stereochemistry = item.stereochemistry;
            }

            if (!_.isNil(item.opticalActivity)) {
                _moiety.opticalActivity = item.opticalActivity;
            }

            if (!_.isNil(item.molecularFormula)) {
                _moiety.molecularFormula = item.molecularFormula;
            }

            if (!_.isNil(item.amount)) {
                _moiety.amount = item.amount;
            }

            if (!_.isNil(item.measurementType)) {
                _moiety.measurementType = item.measurementType;
            }

            resource.moiety.push(_moiety);
        }
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {};

            if (!_.isNil(item.id)) {
                _property.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _property.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _property.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _property.value = item.value;
            }

            resource.property.push(_property);
        }
    }

    if (!_.isNil(props.molecularWeight)) {
        let src = props.molecularWeight;
        if (!Array.isArray(src)) { src = [src]; }
        resource.molecularWeight = [];

        for (let item of src) {
            let _molecularWeight = {};

            if (!_.isNil(item.id)) {
                _molecularWeight.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _molecularWeight.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.method)) {
                _molecularWeight.method = item.method;
            }

            if (!_.isNil(item.type)) {
                _molecularWeight.type = item.type;
            }

            if (!_.isNil(item.amount)) {
                _molecularWeight.amount = item.amount;
            }

            resource.molecularWeight.push(_molecularWeight);
        }
    }

    if (!_.isNil(props.structure)) {
        let src = props.structure;
        let _structure = {};

        if (!_.isNil(src.id)) {
            _structure.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _structure.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.stereochemistry)) {
            _structure.stereochemistry = src.stereochemistry;
        }

        if (!_.isNil(src.opticalActivity)) {
            _structure.opticalActivity = src.opticalActivity;
        }

        if (!_.isNil(src.molecularFormula)) {
            _structure.molecularFormula = src.molecularFormula;
        }

        if (!_.isNil(src.molecularFormulaByMoiety)) {
            _structure.molecularFormulaByMoiety = src.molecularFormulaByMoiety;
        }

        if (!_.isNil(src.technique)) {
            _structure.technique = src.technique;
        }

        if (!_.isNil(src.sourceDocument)) {
            _structure.sourceDocument = src.sourceDocument;
        }

        if (!_.isNil(src.representation)) {
            _structure.representation = src.representation;
        }

        resource.structure = _structure;
    }

    if (!_.isNil(props.code)) {
        let src = props.code;
        if (!Array.isArray(src)) { src = [src]; }
        resource.code = [];

        for (let item of src) {
            let _code = {};

            if (!_.isNil(item.id)) {
                _code.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _code.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _code.code = item.code;
            }

            if (!_.isNil(item.status)) {
                _code.status = item.status;
            }

            if (!_.isNil(item.statusDate)) {
                _code.statusDate = item.statusDate;
            }

            if (!_.isNil(item.note)) {
                _code.note = item.note;
            }

            if (!_.isNil(item.source)) {
                _code.source = item.source;
            }

            resource.code.push(_code);
        }
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (let item of src) {
            let _name = {};

            if (!_.isNil(item.id)) {
                _name.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _name.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _name.name = item.name;
            }

            if (!_.isNil(item.type)) {
                _name.type = item.type;
            }

            if (!_.isNil(item.status)) {
                _name.status = item.status;
            }

            if (!_.isNil(item.preferred)) {
                _name.preferred = item.preferred;
            }

            if (!_.isNil(item.language)) {
                _name.language = item.language;
            }

            if (!_.isNil(item.domain)) {
                _name.domain = item.domain;
            }

            if (!_.isNil(item.jurisdiction)) {
                _name.jurisdiction = item.jurisdiction;
            }

            if (!_.isNil(item.official)) {
                _name.official = item.official;
            }

            if (!_.isNil(item.source)) {
                _name.source = item.source;
            }

            resource.name.push(_name);
        }
    }

    if (!_.isNil(props.relationship)) {
        let src = props.relationship;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relationship = [];

        for (let item of src) {
            let _relationship = {};

            if (!_.isNil(item.id)) {
                _relationship.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _relationship.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.substanceDefinition)) {
                _relationship.substanceDefinition = item.substanceDefinition;
            }

            if (!_.isNil(item.type)) {
                _relationship.type = item.type;
            }

            if (!_.isNil(item.isDefining)) {
                _relationship.isDefining = item.isDefining;
            }

            if (!_.isNil(item.amount)) {
                _relationship.amount = item.amount;
            }

            if (!_.isNil(item.ratioHighLimitAmount)) {
                _relationship.ratioHighLimitAmount = item.ratioHighLimitAmount;
            }

            if (!_.isNil(item.comparator)) {
                _relationship.comparator = item.comparator;
            }

            if (!_.isNil(item.source)) {
                _relationship.source = item.source;
            }

            resource.relationship.push(_relationship);
        }
    }

    if (!_.isNil(props.sourceMaterial)) {
        let src = props.sourceMaterial;
        let _sourceMaterial = {};

        if (!_.isNil(src.id)) {
            _sourceMaterial.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _sourceMaterial.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _sourceMaterial.type = src.type;
        }

        if (!_.isNil(src.genus)) {
            _sourceMaterial.genus = src.genus;
        }

        if (!_.isNil(src.species)) {
            _sourceMaterial.species = src.species;
        }

        if (!_.isNil(src.part)) {
            _sourceMaterial.part = src.part;
        }

        if (!_.isNil(src.countryOfOrigin)) {
            _sourceMaterial.countryOfOrigin = src.countryOfOrigin;
        }

        resource.sourceMaterial = _sourceMaterial;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"]
    };

    return resource;
}
