import { createModel, createEntity } from '@openfn/metadata';
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
      value: unit.id,
    })
  );

  model.resourceTypes = await helper.getResourceTypes();

  const types = await helper.getTrackedEntityTypes();
  model.trackedEntityTypes = types.trackedEntityTypes.map(type =>
    createEntity(type.id, 'trackedEntityType', {
      datatype: 'string',
      label: type.displayName,
      value: type.id,
    })
  );

  const attributes = await helper.getAttributes();
  model.attributes = attributes.attributes.map(attr =>
    createEntity(attr.id, 'attribute', {
      dataTypes: 'string',
      label: attr.displayName,
      value: attr.id,
    })
  );

  return model;
};

export default metadata;
