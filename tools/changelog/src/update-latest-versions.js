import { updateChangelog } from './updateChangelog.js';
import getAdaptorsFromDir from './utils.js';

const adaptors = getAdaptorsFromDir();
for (const adaptor of adaptors) {
  await updateChangelog(adaptor);
}
