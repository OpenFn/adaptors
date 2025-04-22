import fs from 'fs';
const packagesDir = '../../packages';

export default function getAdaptorsFromDir() {
    return fs
      .readdirSync(packagesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  }