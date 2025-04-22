import addDisclaimer from './disclaimer';
import sortKeys from './sort-keys';
import type { MappingSpec, ProfileSpec } from '../types';

export { addDisclaimer, sortKeys };

export const getBuilderName = resourceName =>
  resourceName[0].toLowerCase() + resourceName.slice(1);

export const getTypeName = schema =>
  `${schema.type}_${schema.id}`.replace(/-/g, '_');

export const shouldIgnoreProfile = (
  profile: ProfileSpec,
  mappings: MappingSpec
) => {
  if (mappings.exclude?.includes(profile.type)) {
    console.log('ignoring excluded ', profile.id);
    return true;
  }
  if (mappings.include?.length && !mappings.include.includes(profile.type)) {
    console.log('ignoring not included ', profile.id);
    return true;
  }
};
