import addDisclaimer from './disclaimer';
export { addDisclaimer };

export const getBuilderName = resourceName =>
  resourceName[0].toLowerCase() + resourceName.slice(1);

export const getTypeName = schema =>
  `${schema.type}_${schema.id}`.replace(/-/g, '_');
