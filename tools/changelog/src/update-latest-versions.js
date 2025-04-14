import { updateChangelog } from './updateChangelog.js';
import getAdaptorsFromDir from './utils.js';

export async function updateAllChangelogs() {
  const adaptors = getAdaptorsFromDir();
  for (const adaptor of adaptors) {
    await updateChangelog(adaptor);
  }
}
updateAllChangelogs();
