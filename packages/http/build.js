import { build } from 'esbuild';

const commonBuildOptions = {
  bundle: true,
  write: true,
  watch: false,
  format: 'esm',
  target: 'esnext',
  outdir: './dist',
  external: ['vm', 'https'],
  pure: ['console.log', 'console.time', 'console.timeEnd'],
  platform: 'node',
  minify: false,
  sourcemap: 'inline',
};

await build({
  ...commonBuildOptions,
  entryPoints: {
    index: './src/index.js',
  },
  format: 'esm',
});
