// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from 'lodash';

export type Patient_Props = {
  id?: any;
  meta?: any;
  implicitRules?: any;
  language?: any;
  text?: any;
  contained?: any;
  extension?: any;
  modifierExtension?: any;
  identifier?: Identifier;
  active?: any;
  name?: any;
  telecom?: any;
  gender?: any;
  birthDate?: any;
  deceased?: any;
  address?: any;
  maritalStatus?: any;
  multipleBirth?: any;
  photo?: any;
  contact?: any;
  communication?: any;
  generalPractitioner?: any;
  managingOrganization?: any;
  link?: any;
};

export default function (props: Partial<Patient_Props>) {
  const resource = {
    resourceType: 'Patient',

    text: {
      status: 'generated',
      div: '<div xmlns="http://www.w3.org/1999/xhtml"><p class="res-header-id"><b>Patient</b></p></div>',
    },
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
    if (!Array.isArray(props.identifier)) {
      props.identifier = [props.identifier];
    }
    resource.identifier = dt.identifier(props.identifier);
  }

  if (!_.isNil(props.active)) {
    resource.active = props.active;
  }

  if (!_.isNil(props.name)) {
    resource.name = props.name;
  }

  if (!_.isNil(props.telecom)) {
    resource.telecom = props.telecom;
  }

  if (!_.isNil(props.gender)) {
    resource.gender = props.gender;
  }

  if (!_.isNil(props.birthDate)) {
    resource.birthDate = props.birthDate;
  }

  if (!_.isNil(props.deceased)) {
    dt.composite(resource, 'deceased', props.deceased);
  }

  if (!_.isNil(props.address)) {
    resource.address = props.address;
  }

  if (!_.isNil(props.maritalStatus)) {
    resource.maritalStatus = props.maritalStatus;
  }

  if (!_.isNil(props.multipleBirth)) {
    dt.composite(resource, 'multipleBirth', props.multipleBirth);
  }

  if (!_.isNil(props.photo)) {
    resource.photo = props.photo;
  }

  if (!_.isNil(props.contact)) {
    let src = props.contact;
    if (!Array.isArray(src)) {
      src = [src];
    }
    resource.contact = [];

    for (let item of src) {
      let _contact = {};

      if (!_.isNil(item.id)) {
        _contact.id = item.id;
      }

      if (!_.isNil(item.modifierExtension)) {
        _contact.modifierExtension = item.modifierExtension;
      }

      if (!_.isNil(item.relationship)) {
        _contact.relationship = item.relationship;
      }

      if (!_.isNil(item.name)) {
        _contact.name = item.name;
      }

      if (!_.isNil(item.telecom)) {
        _contact.telecom = item.telecom;
      }

      if (!_.isNil(item.address)) {
        _contact.address = item.address;
      }

      if (!_.isNil(item.gender)) {
        _contact.gender = item.gender;
      }

      if (!_.isNil(item.organization)) {
        _contact.organization = item.organization;
      }

      if (!_.isNil(item.period)) {
        _contact.period = item.period;
      }

      resource.contact.push(_contact);
    }
  }

  if (!_.isNil(props.communication)) {
    let src = props.communication;
    if (!Array.isArray(src)) {
      src = [src];
    }
    resource.communication = [];

    for (let item of src) {
      let _communication = {};

      if (!_.isNil(item.id)) {
        _communication.id = item.id;
      }

      if (!_.isNil(item.modifierExtension)) {
        _communication.modifierExtension = item.modifierExtension;
      }

      if (!_.isNil(item.language)) {
        _communication.language = item.language;
      }

      if (!_.isNil(item.preferred)) {
        _communication.preferred = item.preferred;
      }

      resource.communication.push(_communication);
    }
  }

  if (!_.isNil(props.generalPractitioner)) {
    if (!Array.isArray(props.generalPractitioner)) {
      props.generalPractitioner = [props.generalPractitioner];
    }
    resource.generalPractitioner = dt.reference(props.generalPractitioner);
  }

  if (!_.isNil(props.managingOrganization)) {
    resource.managingOrganization = dt.reference(props.managingOrganization);
  }

  if (!_.isNil(props.link)) {
    let src = props.link;
    if (!Array.isArray(src)) {
      src = [src];
    }
    resource.link = [];

    for (let item of src) {
      let _link = {};

      if (!_.isNil(item.id)) {
        _link.id = item.id;
      }

      if (!_.isNil(item.modifierExtension)) {
        _link.modifierExtension = item.modifierExtension;
      }

      if (!_.isNil(item.other)) {
        _link.other = item.other;
      }

      if (!_.isNil(item.type)) {
        _link.type = item.type;
      }

      resource.link.push(_link);
    }
  }

  resource.meta = {
    profile: ['http://hl7.org/fhir/StructureDefinition/Patient'],
  };

  return resource;
}
