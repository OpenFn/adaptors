import { remark } from 'remark';
import stringify from 'remark-stringify';
import remarkParse from 'remark-parse';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { writeFile } from 'fs/promises';
import getVersionHistory from './update-version-histories.js';

const packagesDir = '../../packages';
const versionOnlyRegex = /^\d+\.\d+\.\d+$/;

function getAdaptorsFromDir() {
  return fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

async function updateChangelog(adaptorName, adaptorVersionList) {
  const pkgPath = path.join(packagesDir, adaptorName);
  const changelogPath = path.join(pkgPath, 'CHANGELOG.md');

  if (!fs.existsSync(changelogPath)) return;

  let markdownContent = fs.readFileSync(changelogPath, 'utf8');
  const ast = await remark().use(remarkParse).parse(markdownContent);

  const updatedAstChildren = ast.children.map((item, index) => {
    if (item.type === 'heading' && item.depth === 2) {
      const astVersion = item.children[0].value;
      const releasedDate = adaptorVersionList.versions.find(
        version => version.version === astVersion
      );

      if (
        index === 1 &&
        !releasedDate &&
        versionOnlyRegex.test(astVersion.trim())
      ) {
        const convertedDate = format(new Date(), 'dd MMMM yyyy');
        item.children[0].value = `${astVersion} ${convertedDate}`;
      }

      if (releasedDate?.date) {
        const convertedDate = format(
          new Date(releasedDate.date),
          'dd MMMM yyyy'
        );
        item.children[0].value = `${astVersion} ${convertedDate}`;
      }
    }
    return item;
  });

  const updatedAst = {
    type: 'root',
    children: updatedAstChildren,
  };

  const file = await remark().use(stringify).run(updatedAst);

  const updatedMarkdown = String(await remark().use(stringify).stringify(file));

  await writeFile(changelogPath, updatedMarkdown, 'utf8');
  console.log('✔ Changelog updated');
}

export async function updateAllChangelogs() {
  const versionList = await getVersionHistory();
  const adaptors = getAdaptorsFromDir();
  for (const adaptor of adaptors) {
    const adaptorVersionList = versionList.find(
      item => item.adaptor === `@openfn/language-${adaptor}`
    );
    await updateChangelog(adaptor, adaptorVersionList);
  }
}
updateAllChangelogs();
