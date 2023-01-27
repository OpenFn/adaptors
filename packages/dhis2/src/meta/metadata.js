import { createEntity } from '@openfn/metadata';
import dhis2helper from './helper.js';

const metadata = async (configuration = {}, mock = false) => {
  let helper = dhis2helper(configuration);
  if (mock) {
    helper = createMock(helper);
  }

  const model = {};

  const units = await helper.getOrgUnits();
  model.orgUnits = units.organisationUnits.map(unit =>
    createEntity(unit.id, 'unitOrg', {
      datatype: 'string',
      label: unit.displayName,
    })
  );

  model.resourceTypes = await helper.getResourceTypes();

  const types = await helper.getTrackedEntityTypes();
  model.trackedEntityTypes = types.trackedEntityTypes.map(type =>
    createEntity(type.id, 'trackedEntityType', {
      datatype: 'string',
      label: type.displayName,
    })
  );

  const attributes = await helper.getAttributes();
  model.attributes = attributes.attributes.map(attr =>
    createEntity(attr.id, 'attribute', {
      datatype: 'string',
      label: attr.displayName,
    })
  );

  return model;
};

export default metadata;
