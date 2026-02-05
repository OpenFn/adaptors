import addDisclaimer from './disclaimer';
import sortKeys from './sort-keys';
import type { MappingSpec, ProfileSpec, Schema } from '../types';

export { addDisclaimer, sortKeys };

export const getBuilderName = (resourceName: string) =>
  resourceName[0].toLowerCase() + resourceName.slice(1);

export const getTypeName = (profile: ProfileSpec): string =>
  `${profile.type}_${profile.id}`.replace(/-/g, '_');

export const getInterfaceName = (profile: ProfileSpec): string => {
  if (profile.type === profile.id) {
    return `${profile.type}_Props`.replace(/-/g, '_');
  }
  return `${profile.type}_${profile.id}_Props`.replace(/-/g, '_');
};

export const shouldIgnoreProfile = (
  profile: ProfileSpec,
  mappings: MappingSpec,
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
