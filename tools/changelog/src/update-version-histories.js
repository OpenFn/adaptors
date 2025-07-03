import { updateChangelog } from './updateChangelog.js';
import getAdaptorsFromDir from './utils.js';

async function fetchVersions(adaptor) {
  try {
    const url = `https://registry.npmjs.org/${adaptor}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${adaptor}`);
    const data = await response.json();
    const versions = data.versions || {};
    const versionList = Object.keys(versions).map(version => ({
      version,
      date: data.time?.[version] || 'unknown',
    }));
    return { adaptor, versions: versionList };
  } catch (error) {
    console.error(`❌ Error fetching ${adaptor}: ${error.message}`);
    return { adaptor, error: error.message };
  }
}

async function getVersionHistory() {
  const adaptors = getAdaptorsFromDir();
  for (const adaptor of adaptors) {
    const adaptorName = `@openfn/language-${adaptor}`;
    const data = await fetchVersions(adaptorName);
    console.log(`Fetching ${adaptor}`);

    if (!data.error) {
      await updateChangelog(adaptor, data);
    }
  }
}

getVersionHistory();
