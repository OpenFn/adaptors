import util from 'node:util';
import c_p from 'node:child_process';

import summary from '../pnpm-publish-summary.json' assert { type: 'json' };

const exec = util.promisify(c_p.exec);

async function deprecate() {
  for (const { name } of summary.publishedPackages) {
    try {
      const { stdout: version } = await exec(`npm info ${name}@next version`);
      console.log(`deprecating ${name}@${version}`);
      if (version) {
        await exec(
          `npm deprecate ${name}@"${version}" "automatically deprecated outdated pre-release"`
        );
        console.log('... ok!');
      } else {
        console.log(`No @next tag found for ${name}`);
      }
    } catch (e) {
      console.log(`Error deprecating ${name}:`);
      console.log(e);
    }
  }
}

deprecate();
