import { createModel, createEntity } from '@openfn/metadata';
import { stringify } from 'qs';
import dhis2helper from './helper.js';

const metadata = async (configuration = {}, mock = false) => {
  let helper = dhis2helper(configuration);
  if (mock) {
    helper = createMock(helper);
  }

  const model = createModel('dhis2');

  const units = await helper.getOrgUnits();
  const unitModels = units.organisationUnits.map(unit =>
    createEntity(unit.id, 'unitOrg', {
      datatype: 'string',
      label: unit.displayName,
    })
  );
  const unitsRoot = createEntity('orgUnits');
  unitsRoot.entities = unitModels;
  model.addEntity(unitsRoot);
  return model;
};

export default metadata;
