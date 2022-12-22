import craeteBackend from './backend';
import { createModel, createEntity } from './model';

// TODO - hide hidden and system fields
// Maybe just Custom ones? But some standard ones are business stuff, like Account, Contact, Lead
// There's no way to tell a standard ProcessInstanceNode from an Account
// An inclusive model of the backend is likely to be more helpful, but it might be a lot of effort to prodice
// I suppose the UI could say "hdie this field" which could write to config...
// The UI could toggle standard/custom but thats salesforce specific
// ok, we try and hide these:
// deprecatedAndHidden: true
// queryable: false
// searchable: false

const metadata = async (configuration = {}, mock = false) => {
  // load the helper
  const helper = await craeteBackend(configuration, mock);

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
