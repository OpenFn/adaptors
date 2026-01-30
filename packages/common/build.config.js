import { join } from 'node:path';

// override build config with an extra entry point
export default path => ({
  entry: {
    index: join(path, 'src/index.js'),
    metadata: join(path, 'src/metadata.js'),
    util: join(path, 'src/util/index.js'),
  },
  external: ['undici'],
  root: path, // Ensure the root path is correctly set
});
