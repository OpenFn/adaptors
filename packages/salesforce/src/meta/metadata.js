import salesforceHelper from './helper.js';
import { createEntity } from '@openfn/language-common/metadata';

const metadata = async (configuration = {}, helper) => {
  if (!helper) {
    // eslint-disable-next-line no-param-reassign
    helper = await salesforceHelper(configuration);
  }

  const globals = await helper.getGlobals();

  const root = createEntity('salesforce', 'model');

  const buildModel = async ({ name, custom }) => {
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

        // TODO Now the field's attributes?
      });

      root.addChild(e);
    }
  };

  // build a model of each global sobject
  await Promise.all(globals.map(buildModel));

  return root;
};

export default metadata;
