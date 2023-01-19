//import createBackend from './backend';
import salesforceHelper from './helper';
import { createModel, createEntity } from './model';

const metadata = async (configuration = {}, mock = false) => {
  let helper = await salesforceHelper(configuration);
  if (mock) {
    helper = createMock(helper);
  }

  // get the globals
  const globals = await helper.getGlobals();

  const model = createModel('salesforce');

  // build a model of each global sobject
  await Promise.all(
    globals.map(
      ({ name, custom }) =>
        new Promise(async resolve => {
          const e = createEntity(name, 'sobject');
          if (!custom) {
            e.system = true;
          }
          // Model the fields too
          const fields = await helper.getFields(name);
          if (fields) {
            fields.forEach(({ name, type, label, externalId }) => {
              const f = createEntity(name, 'field', {
                datatype: type,
                label,
                externalId,
              });
              e.addEntity(f);

              // Now the field's attributes
            });

            model.addEntity(e);
          }
          resolve();
        })
    )
  );

  return model;
};

export default metadata;
