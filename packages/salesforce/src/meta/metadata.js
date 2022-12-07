import craeteBackend from './backend';
import { createModel, createEntity } from './model';

const metadata = async (configuration = {}, mock = false) => {
  // load the helper
  const helper = await craeteBackend(configuration, mock);

  // get the globals
  const globals = await helper.getGlobals();

  const model = createModel('salesforce');

  // build a model of each global sobject
  await Promise.all(
    globals.map(
      ({ name }) =>
        new Promise(async resolve => {
          const e = createEntity(name, 'sobject');

          // Model the fields too
          const fields = await helper.getFields(name);
          if (fields) {
            fields.forEach(({ name, type, label }) => {
              const f = createEntity(name, 'field', {
                datatype: type,
                label,
              });
              e.addEntity(f);
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
