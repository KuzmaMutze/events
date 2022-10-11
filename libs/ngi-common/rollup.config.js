import typescript from '@rollup/plugin-typescript';

/**
 *  @type {import('rollup').RollupOptions}
 */

export default {
  input: 'src/index.ts',
  external: ['zod'],
  plugins: [typescript()],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
};
