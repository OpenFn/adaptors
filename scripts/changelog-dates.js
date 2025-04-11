import { remark } from 'remark';
import stringify from 'remark-stringify';
import remarkParse from 'remark-parse';
import fs from 'fs';
import path from 'path';
import versionList from './adaptor-versions.json' assert { type: 'json' };
import { format } from 'date-fns';
import { writeFile } from 'fs/promises';

// const adaptorName = process.argv[2];

const packagesDir = './packages';

function getAdaptorsFromDir() {
  return fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}


async function updateChangelog(adaptorName) {
  const pkgPath = path.join(packagesDir, adaptorName);
  const changelogPath = path.join(pkgPath, 'CHANGELOG.md');

  if (!fs.existsSync(changelogPath)) return;

  const adaptorVersionList = versionList.find(
    item => item.adaptor === `@openfn/language-${adaptorName}`
  );

  let markdownContent = fs.readFileSync(changelogPath, 'utf8');
  const ast = await remark().use(remarkParse).parse(markdownContent);

  const updatedAstChildren = ast.children.map(item => {
    if (item.type === 'heading' && item.depth === 2) {
      const astVersion = item.children[0].value;
      const releasedDate = adaptorVersionList.versions.find(
        version => version.version === astVersion
      );

      if (releasedDate?.date) {
        const convertedDate = format(
          new Date(releasedDate.date),
          'yyyy MMMM d'
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

async function updateAllChangelogs() {
    const adaptors = getAdaptorsFromDir();
    for (const adaptor of adaptors) {
      await updateChangelog(adaptor);
    }
  
}
updateAllChangelogs()