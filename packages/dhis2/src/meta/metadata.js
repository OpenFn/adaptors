import { metadata as m } from '@openfn/language-common';
import dhis2helper from './helper.js';

const metadata = async (configuration = {}, helper) => {
  if (!helper) {
    helper = dhis2helper(configuration);
  }

  const children = {};

  const units = await helper.getOrgUnits();
  children.orgUnits = units.organisationUnits.map(unit =>
    m.createEntity(unit.id, 'orgUnit', {
      datatype: 'string',
      label: unit.displayName,
    })
  );

  children.resourceTypes = await helper.getResourceTypes();

  const types = (await helper.getTrackedEntityTypes()) ?? [];
  children.trackedEntityTypes =
    types.trackedEntityTypes?.map(type =>
      m.createEntity(type.id, 'trackedEntityType', {
        datatype: 'string',
        label: type.displayName,
      })
    ) ?? [];

  const attributes = (await helper.getAttributes()) ?? [];
  children.attributes =
    attributes.attributes?.map(attr =>
      m.createEntity(attr.id, 'attribute', {
        datatype: 'string',
        label: attr.displayName,
      })
    ) ?? [];

  return {
    type: 'model',
    name: 'dhis2',
    children,
  };
};

export default metadata;
