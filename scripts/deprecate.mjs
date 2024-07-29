import util from 'node:util';
import c_p from 'node:child_process';

const exec = util.promisify(c_p.exec);

const DEPRECATION_MESSAGE = `This pre-release adaptor build has been outdated and should no longer be used`;

export default async function deprecate(summary) {
  for (const { name } of summary.publishedPackages) {
    try {
      const { stdout: version } = await exec(`npm info ${name}@next version`);
      console.log(`deprecating ${name}@${version}`);
      if (version) {
        await exec(
          `npm deprecate ${name}@"${version}" "${DEPRECATION_MESSAGE}"`
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
