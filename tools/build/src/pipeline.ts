import src from './commands/src';

// common build config
type Config = {
  // the package we're running from
  // eg packages/language-http
  root: string;

  // the folder we output to
  out: string;
};

const run = async (lang: string, tasks: string[]) => {
  console.log('Running pipeline for ', lang);
  // produce a pipeline of build functions
  // run them
  // and we're done!
  const pipeline = [src];

  const promises = pipeline.map(src(lang));
  // Maybe this needs to be serial? Not actually sure it matters...
  return Promise.all(promises);
};

export default run;
