import commands from './commands';

// common build config
type Config = {
  // the package we're running from
  // eg packages/language-http
  root: string;

  // the folder we output to
  out: string;
};

const run = async (lang: string, tasks: string[] = ['src', 'dts']) => {
  console.log('Running pipeline for', lang);

  tasks
    .map(t => commands[t])
    .filter(fn => fn)
    .reduce((p, task) => p.then(() => task(lang)), Promise.resolve());
};

export default run;
