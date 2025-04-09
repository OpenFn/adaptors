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

const formatDate = datetime => {
  const year = datetime.slice(0, 4);
  const month = datetime.slice(4, 6);
  const day = datetime.slice(6, 8);
  return `${year}-${month}-${day}`;
};

const fixVersionInText = text =>
  text.replace(/-(\d{14})/g, (_, dt) => `-${formatDate(dt)}`);

const updateFile = (filePath, label) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = fixVersionInText(content);
    if (content !== updated) {
      fs.writeFileSync(filePath, updated);
      console.log(`✔ Updated ${label}`);
    }
  }
};

const pkgJsonPath = path.join(pkgPath, 'package.json');
if (fs.existsSync(pkgJsonPath)) {
  const json = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  const newVersion = fixVersionInText(json.version);
  if (json.version !== newVersion) {
    json.version = newVersion;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(json, null, 2));
    console.log(`✔ Updated version in ${adaptor}/package.json → ${newVersion}`);
  }
}

updateFile(path.join(pkgPath, 'CHANGELOG.md'), `${adaptor}/CHANGELOG.md`);
