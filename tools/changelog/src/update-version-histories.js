import fs from 'fs';

const packagesDir = '../../packages';

function getAdaptorsFromDir() {
  return fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

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

export default async function getVersionHistory() {
  const output = [];
  const adaptors = getAdaptorsFromDir();
  for (const adaptor of adaptors) {
    const adaptorName = `@openfn/language-${adaptor}`;
    const data = await fetchVersions(adaptorName);
    output.push(data);
  }

  return output;
}

getVersionHistory();
