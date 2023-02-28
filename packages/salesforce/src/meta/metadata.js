import salesforceHelper from './helper.js';
import { createEntity, createMock } from '@openfn/metadata';

const metadata = async (configuration = {}, mock = false) => {
  let helper = await salesforceHelper(configuration);
  if (mock) {
    helper = createMock(helper);
  }

  // get the globals
  const globals = await helper.getGlobals();

  const root = createEntity('salesforce', 'model');

  // build a model of each global sobject
  await Promise.all(
    globals.map(
      ({ name, custom }) =>
        new Promise(async resolve => {
          const props = {};
          if (!custom) {
            props.system = true;
          }
          const e = createEntity(name, 'sobject', props);

          const fields = await helper.getFields(name);
          if (fields) {
            fields.forEach(({ name, type, label, externalId }) => {
              const f = createEntity(name, 'field', {
                datatype: type,
                label,
                externalId,
              });
              e.addChild(f);

              // Now the field's attributes
            });

            root.addChild(e);
          }
          resolve();
        })
    )
  );

  return root;
};

export default metadata;
