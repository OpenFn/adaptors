import fs from 'fs';
import path from 'path';

const adaptor = process.argv[2];
if (!adaptor) {
  console.error(
    '❌ Please provide the adaptor name. Usage: node changeset-date.js <adaptor-name>'
  );
  process.exit(1);
}

const pkgPath = path.join('./packages', adaptor);
const pkgJsonPath = path.join(pkgPath, 'package.json');
const changelogPath = path.join(pkgPath, 'CHANGELOG.md');

const formatPrettyDate = (datetime) => {
  const year = datetime.slice(0, 4);
  const month = datetime.slice(4, 6);
  const day = datetime.slice(6, 8);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${year} ${months[parseInt(month) - 1]} ${parseInt(day)}`;
};

const stripDatetime = (versionWithDate) => versionWithDate.replace(/-(\d{14})/, '');


const updatePackageJson = () => {
  if (!fs.existsSync(pkgJsonPath)) return;

  const data = fs.readFileSync(pkgJsonPath, 'utf8');
  const json = JSON.parse(data);
  const originalVersion = json.version;
  const newVersion = stripDatetime(originalVersion);

  if (originalVersion !== newVersion) {
    json.version = newVersion;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(json, null, 2));
    console.log(`✔ Updated version in ${adaptor}/package.json → ${newVersion}`);
  }
};

const updateChangelog = () => {
  if (!fs.existsSync(changelogPath)) return;

  let content = fs.readFileSync(changelogPath, 'utf8');

  const versionDateRegex = /^## (\d+\.\d+\.\d+)-(\d{8})(\d{6})/gm;

  let updated = content.replace(versionDateRegex, (_, version, datePart) => {    
    return `## ${version} ${formatPrettyDate(datePart)}`;
  });

  if (content !== updated) {
    fs.writeFileSync(changelogPath, updated);
    console.log(`✔ Updated ${adaptor}/CHANGELOG.md heading format`);
  }
};


updatePackageJson();
updateChangelog();