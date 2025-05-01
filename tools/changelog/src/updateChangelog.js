import { remark } from 'remark';
import stringify from 'remark-stringify';
import remarkParse from 'remark-parse';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { writeFile } from 'fs/promises';

const packagesDir = '../../packages';
const versionOnlyRegex = /^\d+\.\d+\.\d+$/;

export async function updateChangelog(adaptorName, adaptorVersionList = null) {
  const pkgPath = path.join(packagesDir, adaptorName);
  const changelogPath = path.join(pkgPath, 'CHANGELOG.md');

  if (!fs.existsSync(changelogPath)) return;

  let markdownContent = fs.readFileSync(changelogPath, 'utf8');

  const ast = await remark().use(remarkParse).parse(markdownContent);
  const updatedAstChildren = [];

  for (let i = 0; i < ast.children.length; i++) {
    const item = ast.children[i];
    if (item.type === 'heading' && item.depth === 2) {
      const astVersion = item.children[0].value;

      if (i === 1 && versionOnlyRegex.test(astVersion.trim())) {
        const convertedDate = format(new Date(), 'dd MMMM yyyy');
        item.children[0].value = `${astVersion} - ${convertedDate}`;
        console.log(`✔ New release date added for ${adaptorName}`);

        updatedAstChildren.push(item);
        updatedAstChildren.push(...ast.children.slice(i + 1));
        break;
      }

      if (adaptorVersionList) {
        const version = astVersion.trim().match(/^\d+\.\d+\.\d+/)?.[0];

        const releasedDate = adaptorVersionList.versions.find(
          version => version.version === astVersion
        );

        if (releasedDate?.date) {
          const convertedDate = format(
            new Date(releasedDate.date),
            'dd MMMM yyyy'
          );
          item.children[0].value = `${version} - ${convertedDate}`;
          console.log(`✔ Release date updated for ${adaptorName}`);
        }
      }
    }
    updatedAstChildren.push(item);
  }

  const updatedAst = {
    type: 'root',
    children: updatedAstChildren,
  };

  const file = await remark().use(stringify).run(updatedAst);

  const updatedMarkdown = String(
    await remark()
      .use(stringify, {
        bullet: '-',
      })
      .stringify(file)
  );

  await writeFile(changelogPath, updatedMarkdown, 'utf8');
  console.log(`✔ ${adaptorName} changelog updated`);
}
